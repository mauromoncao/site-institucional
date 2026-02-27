import { COOKIE_NAME, ADMIN_COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as db from "./db";
import * as adminAuth from "./adminAuth";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";
import { invokeLLM } from "./_core/llm";
import { parse as parseCookieHeader } from "cookie";
import {
  STATIC_PRACTICE_AREAS,
  STATIC_LANDING_PAGES,
  STATIC_BLOG_POSTS,
  STATIC_FAQ_ITEMS,
} from "./staticData";

function getAdminTokenFromReq(req: any): string | null {
  // Try cookies first
  const cookieHeader = req.headers?.cookie;
  if (cookieHeader) {
    const cookies = parseCookieHeader(cookieHeader);
    if (cookies[ADMIN_COOKIE_NAME]) return cookies[ADMIN_COOKIE_NAME];
  }
  // Try Authorization header
  const authHeader = req.headers?.authorization;
  if (authHeader?.startsWith("Bearer ")) return authHeader.slice(7);
  return null;
}

// ─── Admin middleware ───
const adminMiddleware = publicProcedure.use(async ({ ctx, next }) => {
  const token = getAdminTokenFromReq(ctx.req);

  if (!token) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Admin login required" });
  }

  const admin = await adminAuth.verifyAdminToken(token);
  if (!admin) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid or expired token" });
  }

  return next({ ctx: { ...ctx, admin } });
});

// ─── Admin Auth Router ───
const adminAuthRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      const result = await adminAuth.loginWithPassword(input.email, input.password);
      if (!result) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "E-mail ou senha inválidos" });
      }
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(ADMIN_COOKIE_NAME, result.token, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
      return { success: true, user: { id: result.user.id, email: result.user.email, name: result.user.name, role: result.user.role } };
    }),

  loginWithGoogle: publicProcedure
    .input(z.object({ idToken: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const result = await adminAuth.loginWithGoogle(input.idToken);
      if (!result) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Login Google não autorizado" });
      }
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(ADMIN_COOKIE_NAME, result.token, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
      return { success: true, user: { id: result.user.id, email: result.user.email, name: result.user.name, role: result.user.role } };
    }),

  me: publicProcedure.query(async ({ ctx }) => {
    const token = getAdminTokenFromReq(ctx.req);
    if (!token) return null;
    const admin = await adminAuth.verifyAdminToken(token);
    if (!admin) return null;
    return admin;
  }),

  logout: publicProcedure.mutation(({ ctx }) => {
    const cookieOptions = getSessionCookieOptions(ctx.req);
    ctx.res.clearCookie(ADMIN_COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
    return { success: true };
  }),

  setupAdmin: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(6), name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const existing = await adminAuth.getAdminByEmail(input.email);
      if (existing) {
        throw new TRPCError({ code: "CONFLICT", message: "Admin já existe" });
      }
      await adminAuth.createAdmin({ email: input.email, password: input.password, name: input.name });
      return { success: true };
    }),
});

// ─── Pages Router ───
const pagesRouter = router({
  list: adminMiddleware.query(() => db.getAllPages()),
  listPublic: publicProcedure.query(() => db.getAllPages()),
  getBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(({ input }) => db.getPageBySlug(input.slug)),
  getById: adminMiddleware.input(z.object({ id: z.number() })).query(({ input }) => db.getPageById(input.id)),
  upsert: adminMiddleware
    .input(z.object({
      id: z.number().optional(),
      slug: z.string(),
      title: z.string(),
      content: z.string().optional().nullable(),
      metaTitle: z.string().optional().nullable(),
      metaDescription: z.string().optional().nullable(),
      metaKeywords: z.string().optional().nullable(),
      ogTitle: z.string().optional().nullable(),
      ogDescription: z.string().optional().nullable(),
      ogImage: z.string().optional().nullable(),
      canonical: z.string().optional().nullable(),
      isPublished: z.boolean().optional(),
      sortOrder: z.number().optional(),
    }))
    .mutation(({ input }) => db.upsertPage(input)),
  delete: adminMiddleware.input(z.object({ id: z.number() })).mutation(({ input }) => db.deletePage(input.id)),
});

// ─── Practice Areas Router ───
const practiceAreasRouter = router({
  list: adminMiddleware.query(() => db.getAllPracticeAreas()),
  listPublic: publicProcedure.query(async () => {
    const rows = await db.getAllPracticeAreas();
    if (rows.length === 0) return STATIC_PRACTICE_AREAS as any[];
    return rows;
  }),
  getById: adminMiddleware.input(z.object({ id: z.number() })).query(({ input }) => db.getPracticeAreaById(input.id)),
  upsert: adminMiddleware
    .input(z.object({
      id: z.number().optional(),
      slug: z.string(),
      name: z.string(),
      shortDescription: z.string().optional().nullable(),
      icon: z.string().optional().nullable(),
      landingPageId: z.number().optional().nullable(),
      externalLandingUrl: z.string().optional().nullable(),
      isPublished: z.boolean().optional(),
      sortOrder: z.number().optional(),
    }))
    .mutation(({ input }) => db.upsertPracticeArea(input)),
  delete: adminMiddleware.input(z.object({ id: z.number() })).mutation(({ input }) => db.deletePracticeArea(input.id)),
});

// ─── Landing Pages Router ───
const landingPagesRouter = router({
  list: adminMiddleware.query(() => db.getAllLandingPages()),
  listPublic: publicProcedure.query(async () => {
    const rows = await db.getAllLandingPages();
    if (rows.length === 0) return STATIC_LANDING_PAGES as any[];
    return rows;
  }),
  getBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
    const row = await db.getLandingPageBySlug(input.slug);
    if (!row) return STATIC_LANDING_PAGES.find((lp) => lp.slug === input.slug) as any ?? null;
    return row;
  }),
  getById: adminMiddleware.input(z.object({ id: z.number() })).query(({ input }) => db.getLandingPageById(input.id)),
  upsert: adminMiddleware
    .input(z.object({
      id: z.number().optional(),
      slug: z.string(),
      title: z.string(),
      subtitle: z.string().optional().nullable(),
      heroImage: z.string().optional().nullable(),
      heroVideoUrl: z.string().optional().nullable(),
      content: z.string().optional().nullable(),
      ctaText: z.string().optional().nullable(),
      ctaWhatsapp: z.string().optional().nullable(),
      features: z.any().optional().nullable(),
      testimonials: z.any().optional().nullable(),
      metaTitle: z.string().optional().nullable(),
      metaDescription: z.string().optional().nullable(),
      metaKeywords: z.string().optional().nullable(),
      ogTitle: z.string().optional().nullable(),
      ogDescription: z.string().optional().nullable(),
      ogImage: z.string().optional().nullable(),
      canonical: z.string().optional().nullable(),
      externalUrl: z.string().optional().nullable(),
      isExternal: z.boolean().optional(),
      isPublished: z.boolean().optional(),
      practiceAreaId: z.number().optional().nullable(),
      sortOrder: z.number().optional(),
    }))
    .mutation(({ input }) => db.upsertLandingPage(input)),
  delete: adminMiddleware.input(z.object({ id: z.number() })).mutation(({ input }) => db.deleteLandingPage(input.id)),
});

// ─── Blog Router ───
const blogRouter = router({
  list: adminMiddleware.query(() => db.getAllBlogPosts()),
  listPublic: publicProcedure.query(async () => {
    const rows = await db.getAllBlogPosts(true);
    if (rows.length === 0) return STATIC_BLOG_POSTS as any[];
    return rows;
  }),
  getBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
    const row = await db.getBlogPostBySlug(input.slug);
    if (!row) return STATIC_BLOG_POSTS.find((p) => p.slug === input.slug) as any ?? null;
    return row;
  }),
  getById: adminMiddleware.input(z.object({ id: z.number() })).query(({ input }) => db.getBlogPostById(input.id)),
  upsert: adminMiddleware
    .input(z.object({
      id: z.number().optional(),
      slug: z.string(),
      title: z.string(),
      subtitle: z.string().optional().nullable(),
      excerpt: z.string().optional().nullable(),
      content: z.string().optional().nullable(),
      coverImage: z.string().optional().nullable(),
      coverImageAlt: z.string().optional().nullable(),
      videoUrl: z.string().optional().nullable(),
      authorName: z.string().optional().nullable(),
      categoryId: z.number().optional().nullable(),
      category: z.string().optional().nullable(),
      tags: z.string().optional().nullable(),
      metaTitle: z.string().optional().nullable(),
      metaDescription: z.string().optional().nullable(),
      metaKeywords: z.string().optional().nullable(),
      ogTitle: z.string().optional().nullable(),
      ogDescription: z.string().optional().nullable(),
      ogImage: z.string().optional().nullable(),
      ctaText: z.string().optional().nullable(),
      ctaUrl: z.string().optional().nullable(),
      status: z.enum(["draft", "published", "scheduled", "archived"]).optional(),
      isFeatured: z.boolean().optional(),
      isPublished: z.boolean().optional(),
      publishedAt: z.string().optional().nullable(),
      scheduledAt: z.string().optional().nullable(),
    }))
    .mutation(({ input }) => {
      const data: any = { ...input };
      if (typeof input.publishedAt === "string") data.publishedAt = new Date(input.publishedAt);
      if (typeof input.scheduledAt === "string") data.scheduledAt = new Date(input.scheduledAt);
      if (input.status === "published") { data.isPublished = true; if (!data.publishedAt) data.publishedAt = new Date(); }
      if (input.status === "draft" || input.status === "archived") data.isPublished = false;
      if (input.status === "scheduled") data.isPublished = false;
      return db.upsertBlogPost(data);
    }),
  delete: adminMiddleware.input(z.object({ id: z.number() })).mutation(({ input }) => db.deleteBlogPost(input.id)),
  categories: router({
    list: publicProcedure.query(() => db.getAllBlogCategories()),
    upsert: adminMiddleware
      .input(z.object({ id: z.number().optional(), slug: z.string(), name: z.string(), description: z.string().optional().nullable(), sortOrder: z.number().optional() }))
      .mutation(({ input }) => db.upsertBlogCategory(input)),
    delete: adminMiddleware.input(z.object({ id: z.number() })).mutation(({ input }) => db.deleteBlogCategory(input.id)),
  }),
});

// ─── FAQ Router ───
const faqRouter = router({
  list: adminMiddleware.query(() => db.getAllFaqItems()),
  listPublic: publicProcedure.query(async () => {
    const rows = await db.getAllFaqItems(true);
    if (rows.length === 0) return STATIC_FAQ_ITEMS as any[];
    return rows;
  }),
  getById: adminMiddleware.input(z.object({ id: z.number() })).query(({ input }) => db.getFaqItemById(input.id)),
  upsert: adminMiddleware
    .input(z.object({
      id: z.number().optional(),
      question: z.string(),
      answer: z.string(),
      category: z.string().optional().nullable(),
      isPublished: z.boolean().optional(),
      sortOrder: z.number().optional(),
    }))
    .mutation(({ input }) => db.upsertFaqItem(input)),
  delete: adminMiddleware.input(z.object({ id: z.number() })).mutation(({ input }) => db.deleteFaqItem(input.id)),
});

// ─── Leads Router ───
const leadsRouter = router({
  list: adminMiddleware.query(() => db.getAllLeads()),
  getById: adminMiddleware.input(z.object({ id: z.number() })).query(({ input }) => db.getLeadById(input.id)),
  create: publicProcedure
    .input(z.object({
      name: z.string(),
      email: z.string().optional(),
      phone: z.string().optional(),
      message: z.string().optional(),
      source: z.string().optional(),
      landingPageId: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      // Save to DB (if available)
      await db.createLead(input);

      // Send email notification via Resend (if API key is configured)
      const resendApiKey = process.env.RESEND_API_KEY;
      if (resendApiKey) {
        try {
          const emailBody = {
            from: "site@mauromoncao.adv.br",
            to: ["contato@mauromoncao.adv.br"],
            subject: `Novo contato via site: ${input.name}`,
            html: `
              <h2>Novo lead recebido pelo site</h2>
              <p><strong>Nome:</strong> ${input.name}</p>
              ${input.email ? `<p><strong>E-mail:</strong> <a href="mailto:${input.email}">${input.email}</a></p>` : ""}
              ${input.phone ? `<p><strong>Telefone:</strong> ${input.phone}</p>` : ""}
              ${input.message ? `<p><strong>Mensagem:</strong></p><p style="background:#f5f5f5;padding:12px;border-radius:6px;">${input.message}</p>` : ""}
              <p><strong>Origem:</strong> ${input.source || "site"}</p>
              <hr/>
              <p style="color:#888;font-size:12px;">Mauro Monção Advogados – Sistema de Captação de Leads</p>
            `,
          };
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${resendApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(emailBody),
          });
        } catch (err) {
          // Email failure should not block lead creation
          console.error("[Resend] Failed to send email notification:", err);
        }
      }

      return { success: true };
    }),
  updateStatus: adminMiddleware
    .input(z.object({ id: z.number(), status: z.enum(["new", "contacted", "converted", "archived"]) }))
    .mutation(({ input }) => db.updateLeadStatus(input.id, input.status)),
  delete: adminMiddleware.input(z.object({ id: z.number() })).mutation(({ input }) => db.deleteLead(input.id)),
});

// ─── Settings Router ───
const settingsRouter = router({
  getAll: adminMiddleware.query(() => db.getAllSettings()),
  getAllPublic: publicProcedure.query(() => db.getAllSettings()),
  set: adminMiddleware
    .input(z.object({ settings: z.record(z.string(), z.string()) }))
    .mutation(({ input }) => db.setSettings(input.settings as Record<string, string>)),
});

// ─── Media Router ───
const mediaRouter = router({
  list: adminMiddleware.query(() => db.getAllMediaFiles()),
  upload: adminMiddleware
    .input(z.object({
      filename: z.string(),
      mimeType: z.string(),
      base64Data: z.string(),
      alt: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const buffer = Buffer.from(input.base64Data, "base64");
      const ext = input.filename.split(".").pop() || "bin";
      const fileKey = `uploads/${nanoid()}.${ext}`;

      const { url } = await storagePut(fileKey, buffer, input.mimeType);

      await db.createMediaFile({
        filename: `${nanoid()}.${ext}`,
        originalName: input.filename,
        mimeType: input.mimeType,
        size: buffer.length,
        url,
        fileKey,
        alt: input.alt,
      });

      return { url, fileKey };
    }),
  delete: adminMiddleware.input(z.object({ id: z.number() })).mutation(({ input }) => db.deleteMediaFile(input.id)),
});

// ─── Dr. Ben AI Agent Router ───
const DR_BEN_SYSTEM_PROMPT = `Você é o Dr. Ben, assistente jurídico digital do escritório Mauro Monção Advogados Associados (OAB/PI · CE · MA), com sede em Parnaíba-PI.

Sua missão é realizar a triagem inicial do visitante, entender o problema jurídico e encaminhar para o advogado especialista correto. Você NÃO emite pareceres, NÃO representa o cliente e NÃO promete resultados.

## FLUXO OBRIGATÓRIO (siga esta ordem):

**ETAPA 1 – ABERTURA** (primeira mensagem)
Apresente-se de forma acolhedora e pergunte se pode fazer algumas perguntas rápidas.

**ETAPA 2 – IDENTIFICAÇÃO**
Pergunte:
- O atendimento é para você mesmo(a) ou para empresa/terceiro?
- Você já é cliente do escritório ou é o primeiro contato?

**ETAPA 3 – COLETA DA DEMANDA**
Pergunte: "Em poucas palavras, qual é o problema jurídico que você está enfrentando hoje?"
Ouça sem opinar. Não faça análise jurídica.

**ETAPA 4 – CLASSIFICAÇÃO DA ÁREA**
Com base no relato, infira a área: Tributário | Previdenciário | Bancário | Imobiliário | Família e Sucessões | Advocacia Pública | Trabalhista | Consumidor | Outros.
Confirme com o usuário: "Pelo que você descreveu, isso parece estar ligado a [ÁREA]. Confere?"

**ETAPA 5 – URGÊNCIA**
Pergunte: "Existe prazo próximo, risco imediato ou alguma situação urgente acontecendo agora?"
Classifique internamente: low | medium | high | critical.

**ETAPA 6 – COLETA DE CONTATO**
Diga: "Para encaminharmos seu caso ao advogado especialista, preciso do seu nome e WhatsApp."
Colete nome e telefone (WhatsApp).

**ETAPA 7 – ENCAMINHAMENTO**
Confirme o recebimento, agradeça e informe que a equipe jurídica entrará em contato em breve.
Encerre gentilmente.

## REGRAS ABSOLUTAS:
- NUNCA solicite CPF, CNPJ, RG, número de processo ou arquivos
- NUNCA emita parecer, opinião jurídica ou análise do caso
- NUNCA prometa resultados, prazos ou êxito
- NUNCA recuse ou descarte um atendimento
- Responda SEMPRE em português brasileiro
- Seja cordial, profissional e objetivo
- Mensagens curtas (máx. 3 parágrafos por resposta)
- Quando coletar nome e telefone, inclua no final da resposta o marcador JSON: [CONTACT:{"name":"...","phone":"..."}]
- Quando identificar a área jurídica com certeza, inclua: [AREA:tributario|previdenciario|bancario|imobiliario|familia|publico|trabalhista|consumidor|outros]
- Quando avaliar urgência, inclua: [URGENCY:low|medium|high|critical]`;

const drBenRouter = router({
  // Start or continue a conversation
  chat: publicProcedure
    .input(z.object({
      sessionId: z.string(),
      message: z.string().min(1).max(2000),
    }))
    .mutation(async ({ input }) => {
      const { sessionId, message } = input;

      // ── In-memory fallback when DB is not available ──────────────
      // Keeps conversation context alive for the current server process
      type MemMsg = { role: "user" | "assistant"; content: string };
      const memStore = (globalThis as any).__drbenMemStore as Map<string, { msgs: MemMsg[]; meta: Record<string,any> }> | undefined;
      if (!(globalThis as any).__drbenMemStore) {
        (globalThis as any).__drbenMemStore = new Map<string, { msgs: MemMsg[]; meta: Record<string,any> }>();
      }
      const mem = (globalThis as any).__drbenMemStore as Map<string, { msgs: MemMsg[]; meta: Record<string,any> }>;

      // Try DB first; fall back to memory
      let conv = await db.getChatConversation(sessionId).catch(() => null);
      let useMemory = false;

      if (!conv) {
        conv = await db.createChatConversation(sessionId).catch(() => null);
        if (!conv) {
          // No DB — use in-memory mode
          useMemory = true;
          if (!mem.has(sessionId)) mem.set(sessionId, { msgs: [], meta: {} });
        }
      }

      // Build history for LLM
      let history: MemMsg[] = [];
      if (useMemory) {
        history = mem.get(sessionId)!.msgs;
        history.push({ role: "user", content: message });
      } else {
        await db.addChatMessage({ conversationId: conv!.id, role: "user", content: message }).catch(() => {});
        const dbHistory = await db.getChatMessages(conv!.id).catch(() => []);
        history = dbHistory.map(m => ({ role: m.role as "user" | "assistant", content: m.content }));
      }

      const llmMessages = [
        { role: "system" as const, content: DR_BEN_SYSTEM_PROMPT },
        ...history.slice(0, -1).map(m => ({ role: m.role, content: m.content })),
        { role: "user" as const, content: message },
      ];

      // Call AI
      let aiText = "Desculpe, estou com uma instabilidade técnica no momento. Por favor, fale diretamente com nossa equipe pelo WhatsApp: (86) 99482-0054";
      try {
        const result = await invokeLLM({ messages: llmMessages, maxTokens: 512 });
        const raw = result.choices[0]?.message?.content;
        aiText = typeof raw === "string" ? raw : Array.isArray(raw) ? raw.map((p: any) => p.text ?? "").join("") : aiText;
      } catch (err) {
        console.error("[DrBen] LLM error:", err);
      }

      // Save assistant reply
      if (useMemory) {
        mem.get(sessionId)!.msgs.push({ role: "assistant", content: aiText });
      } else {
        await db.addChatMessage({ conversationId: conv!.id, role: "assistant", content: aiText }).catch(() => {});
      }

      // Extract markers from AI response
      const contactMatch = aiText.match(/\[CONTACT:(\{[^}]+\})\]/);
      const areaMatch = aiText.match(/\[AREA:([\w]+)\]/);
      const urgencyMatch = aiText.match(/\[URGENCY:(low|medium|high|critical)\]/);

      if (!useMemory && conv) {
        const updates: Record<string, any> = { messageCount: history.length + 1 };
        if (areaMatch) updates.legalArea = areaMatch[1];
        if (urgencyMatch) updates.urgencyLevel = urgencyMatch[1];

        if (contactMatch) {
          try {
            const contact = JSON.parse(contactMatch[1]);
            if (contact.name) updates.visitorName = contact.name;
            if (contact.phone) updates.visitorPhone = contact.phone;
            if (!conv.leadId && contact.name && (contact.phone || conv.visitorPhone)) {
              await db.createLead({
                name: contact.name || conv.visitorName || "Visitante Dr. Ben",
                phone: contact.phone || conv.visitorPhone || undefined,
                email: conv.visitorEmail || undefined,
                source: "dr-ben-chat",
                message: `Atendimento Dr. Ben – Área: ${updates.legalArea || conv.legalArea || "a identificar"} | Urgência: ${updates.urgencyLevel || conv.urgencyLevel || "a avaliar"}`,
              }).catch(() => {});
              updates.status = "qualified";
            }
          } catch (_) {}
        }
        await db.updateChatConversation(sessionId, updates).catch(() => {});
      }

      // Strip markers from response shown to user
      const cleanResponse = aiText
        .replace(/\[CONTACT:\{[^}]+\}\]/g, "")
        .replace(/\[AREA:[\w]+\]/g, "")
        .replace(/\[URGENCY:[\w]+\]/g, "")
        .trim();

      return { reply: cleanResponse, conversationId: conv?.id ?? 0 };
    }),

  // Get conversation history (public – by sessionId only)
  getHistory: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      const conv = await db.getChatConversation(input.sessionId);
      if (!conv) return { messages: [], conversationId: null };
      const messages = await db.getChatMessages(conv.id);
      return { messages: messages.map(m => ({ role: m.role, content: m.content, createdAt: m.createdAt })), conversationId: conv.id };
    }),

  // Admin: list all conversations
  listConversations: adminMiddleware.query(() => db.getAllChatConversations()),

  // Admin: get full conversation with messages
  getConversation: adminMiddleware
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const conv = await db.getChatConversationById(input.id);
      if (!conv) throw new TRPCError({ code: "NOT_FOUND" });
      const messages = await db.getChatMessages(conv.id);
      return { ...conv, messages };
    }),

  // Admin: delete conversation
  deleteConversation: adminMiddleware
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => db.deleteChatConversation(input.id)),
});

// ─── Dashboard Router ───
const dashboardRouter = router({
  stats: adminMiddleware.query(() => db.getDashboardStats()),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  adminAuth: adminAuthRouter,
  pages: pagesRouter,
  practiceAreas: practiceAreasRouter,
  landingPages: landingPagesRouter,
  blog: blogRouter,
  faq: faqRouter,
  leads: leadsRouter,
  settings: settingsRouter,
  media: mediaRouter,
  drBen: drBenRouter,
  dashboard: dashboardRouter,
});

export type AppRouter = typeof appRouter;
