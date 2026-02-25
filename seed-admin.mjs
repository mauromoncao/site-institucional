import "dotenv/config";
import bcrypt from "bcryptjs";
import { drizzle } from "drizzle-orm/mysql2";
import { adminUsers, siteSettings, practiceAreas, pages, faqItems } from "./drizzle/schema.ts";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL);

async function seed() {
  console.log("🌱 Seeding database...");

  // 1. Create admin user
  const email = "mauromoncaofilho@gmail.com";
  const existing = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
  
  if (existing.length === 0) {
    const passwordHash = await bcrypt.hash("Admin@2024!", 12);
    await db.insert(adminUsers).values({
      email,
      name: "Dr. Mauro Monção",
      passwordHash,
      role: "admin",
      isActive: true,
    });
    console.log("✅ Admin user created:", email);
  } else {
    console.log("ℹ️ Admin user already exists:", email);
  }

  // 2. Site Settings
  const settingsData = {
    site_name: "Mauro Monção Advogados Associados",
    contact_email: "contato@mauromoncao.adv.br",
    phone_personal: "(86) 99948-4761",
    phone_office: "(86) 99519-8919",
    whatsapp_cta: "5586994820054",
    whatsapp_message: "Olá! Gostaria de mais informações sobre os serviços jurídicos.",
    instagram: "https://www.instagram.com/mauromoncao.adv/",
    facebook: "",
    linkedin: "",
    youtube: "",
    tiktok: "",
    address_main: "R. Des. Freitas, 1000 - Sala 1208, Centro (Sul), Teresina - PI, 64001-200",
    address_secondary: "",
    maps_url: "",
    gtm_id: "GTM-MMKSHTQV",
    ga_id: "",
    logo_url: "",
    favicon_url: "",
  };

  for (const [key, value] of Object.entries(settingsData)) {
    const existing = await db.select().from(siteSettings).where(eq(siteSettings.settingKey, key)).limit(1);
    if (existing.length === 0) {
      await db.insert(siteSettings).values({ settingKey: key, settingValue: value });
    }
  }
  console.log("✅ Site settings seeded");

  // 3. Practice Areas
  const areas = [
    { slug: "direito-previdenciario", name: "Direito Previdenciário", shortDescription: "Aposentadorias, benefícios do INSS, revisões e planejamento previdenciário.", icon: "Shield", isPublished: true, sortOrder: 1 },
    { slug: "direito-do-consumidor", name: "Direito do Consumidor", shortDescription: "Defesa dos direitos do consumidor, ações contra empresas e indenizações.", icon: "Users", isPublished: true, sortOrder: 2 },
    { slug: "direito-bancario", name: "Direito Bancário", shortDescription: "Proteção contra juros abusivos, revisão de contratos e defesa contra bancos.", icon: "Building", isPublished: true, sortOrder: 3 },
    { slug: "direito-tributario", name: "Direito Tributário", shortDescription: "Planejamento tributário, defesas fiscais e consultoria para empresas.", icon: "Calculator", isPublished: true, sortOrder: 4 },
    { slug: "direito-administrativo", name: "Direito Administrativo", shortDescription: "Consultoria e assessoria jurídica para administrações públicas municipais.", icon: "Landmark", isPublished: true, sortOrder: 5 },
    { slug: "planejamento-sucessorio", name: "Planejamento Sucessório", shortDescription: "Planejamento patrimonial, inventários, testamentos e holding familiar.", icon: "FileText", isPublished: true, sortOrder: 6 },
    { slug: "direito-eleitoral", name: "Direito Eleitoral", shortDescription: "Assessoria jurídica eleitoral, registro de candidaturas e defesas.", icon: "Vote", isPublished: true, sortOrder: 7 },
    { slug: "direito-civil", name: "Direito Civil", shortDescription: "Contratos, responsabilidade civil, família e sucessões.", icon: "Scale", isPublished: true, sortOrder: 8 },
    { slug: "irpf-educacao-autista", name: "IRPF - Educação Autista", shortDescription: "Recupere valores do Imposto de Renda gastos com educação de filhos autistas.", icon: "Heart", isPublished: true, sortOrder: 9 },
  ];

  for (const area of areas) {
    const existing = await db.select().from(practiceAreas).where(eq(practiceAreas.slug, area.slug)).limit(1);
    if (existing.length === 0) {
      await db.insert(practiceAreas).values(area);
    }
  }
  console.log("✅ Practice areas seeded");

  // 4. Pages
  const pagesData = [
    { slug: "home", title: "Início", content: "", metaTitle: "Mauro Monção Advogados | Escritório de Advocacia em Teresina-PI", metaDescription: "Escritório de advocacia com mais de 15 anos de experiência em Direito Previdenciário, Tributário, Bancário e Administrativo. Atuação no Ceará, Piauí e Maranhão.", isPublished: true, sortOrder: 1 },
    { slug: "sobre", title: "Sobre", content: "", metaTitle: "Sobre | Mauro Monção Advogados", metaDescription: "Conheça o Dr. Mauro Monção, advogado com mais de 15 anos de experiência jurídica.", isPublished: true, sortOrder: 2 },
    { slug: "contato", title: "Contato", content: "", metaTitle: "Contato | Mauro Monção Advogados", metaDescription: "Entre em contato com o escritório Mauro Monção Advogados.", isPublished: true, sortOrder: 3 },
    { slug: "blog", title: "Blog", content: "", metaTitle: "Blog | Mauro Monção Advogados", metaDescription: "Artigos e notícias sobre direito.", isPublished: true, sortOrder: 4 },
    { slug: "faq", title: "FAQ", content: "", metaTitle: "Perguntas Frequentes | Mauro Monção Advogados", metaDescription: "Perguntas frequentes sobre nossos serviços jurídicos.", isPublished: true, sortOrder: 5 },
  ];

  for (const page of pagesData) {
    const existing = await db.select().from(pages).where(eq(pages.slug, page.slug)).limit(1);
    if (existing.length === 0) {
      await db.insert(pages).values(page);
    }
  }
  console.log("✅ Pages seeded");

  // 5. FAQ Items
  const faqData = [
    { question: "Quais áreas do direito o escritório atende?", answer: "Atuamos em Direito Previdenciário, Direito do Consumidor, Direito Bancário, Direito Tributário, Direito Administrativo, Planejamento Sucessório, Direito Eleitoral, Direito Civil e IRPF para Educação Autista.", category: "Geral", isPublished: true, sortOrder: 1 },
    { question: "Em quais estados o escritório atua?", answer: "Atuamos nos estados do Ceará, Piauí e Maranhão, com sede em Teresina-PI.", category: "Geral", isPublished: true, sortOrder: 2 },
    { question: "Como posso agendar uma consulta?", answer: "Você pode entrar em contato pelo WhatsApp (86) 99482-0054, pelo e-mail contato@mauromoncao.adv.br ou pelo formulário de contato do site.", category: "Atendimento", isPublished: true, sortOrder: 3 },
    { question: "O escritório oferece atendimento online?", answer: "Sim, oferecemos atendimento 24 horas através do nosso assistente jurídico virtual Dr. Ben, disponível pelo WhatsApp.", category: "Atendimento", isPublished: true, sortOrder: 4 },
  ];

  for (const faq of faqData) {
    const existing = await db.select().from(faqItems).where(eq(faqItems.question, faq.question)).limit(1);
    if (existing.length === 0) {
      await db.insert(faqItems).values(faq);
    }
  }
  console.log("✅ FAQ items seeded");

  console.log("🎉 Seed completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
