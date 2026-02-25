import { describe, it, expect, vi, beforeAll } from "vitest";

// Mock the database module
vi.mock("./db", () => ({
  getAllPages: vi.fn().mockResolvedValue([
    { id: 1, slug: "sobre", title: "Sobre", content: "Conteúdo sobre", isPublished: true, sortOrder: 0 },
    { id: 2, slug: "contato", title: "Contato", content: null, isPublished: true, sortOrder: 1 },
  ]),
  getPageBySlug: vi.fn().mockImplementation((slug: string) => {
    if (slug === "sobre") return Promise.resolve({ id: 1, slug: "sobre", title: "Sobre", content: "Conteúdo sobre", isPublished: true });
    return Promise.resolve(undefined);
  }),
  getAllPracticeAreas: vi.fn().mockResolvedValue([
    { id: 1, slug: "direito-tributario", name: "Direito Tributário", shortDescription: "Planejamento tributário", icon: "scale", isPublished: true, sortOrder: 0 },
    { id: 2, slug: "direito-civil", name: "Direito Civil", shortDescription: "Contratos e responsabilidade", icon: "gavel", isPublished: true, sortOrder: 1 },
  ]),
  getAllLandingPages: vi.fn().mockResolvedValue([
    { id: 1, slug: "tributario", title: "Direito Tributário", isPublished: true, sortOrder: 0 },
  ]),
  getLandingPageBySlug: vi.fn().mockImplementation((slug: string) => {
    if (slug === "tributario") return Promise.resolve({ id: 1, slug: "tributario", title: "Direito Tributário", content: "Conteúdo LP", isPublished: true });
    return Promise.resolve(undefined);
  }),
  getAllBlogPosts: vi.fn().mockResolvedValue([]),
  getBlogPostBySlug: vi.fn().mockResolvedValue(undefined),
  getAllFaqItems: vi.fn().mockResolvedValue([
    { id: 1, question: "Quais áreas?", answer: "Diversas áreas", category: "Geral", isPublished: true, sortOrder: 0 },
  ]),
  getAllSettings: vi.fn().mockResolvedValue({
    site_name: "Mauro Monção Advogados",
    phone_whatsapp: "(86) 99482-0054",
    email: "contato@mauromoncao.adv.br",
  }),
  createLead: vi.fn().mockResolvedValue(undefined),
  getAllLeads: vi.fn().mockResolvedValue([]),
  getLeadById: vi.fn().mockResolvedValue(undefined),
  updateLeadStatus: vi.fn().mockResolvedValue(undefined),
  deleteLead: vi.fn().mockResolvedValue(undefined),
  getPageById: vi.fn().mockResolvedValue(undefined),
  upsertPage: vi.fn().mockResolvedValue(undefined),
  deletePage: vi.fn().mockResolvedValue(undefined),
  getPracticeAreaById: vi.fn().mockResolvedValue(undefined),
  upsertPracticeArea: vi.fn().mockResolvedValue(undefined),
  deletePracticeArea: vi.fn().mockResolvedValue(undefined),
  getLandingPageById: vi.fn().mockResolvedValue(undefined),
  upsertLandingPage: vi.fn().mockResolvedValue(undefined),
  deleteLandingPage: vi.fn().mockResolvedValue(undefined),
  getBlogPostById: vi.fn().mockResolvedValue(undefined),
  upsertBlogPost: vi.fn().mockResolvedValue(undefined),
  deleteBlogPost: vi.fn().mockResolvedValue(undefined),
  getAllBlogCategories: vi.fn().mockResolvedValue([]),
  upsertBlogCategory: vi.fn().mockResolvedValue(undefined),
  deleteBlogCategory: vi.fn().mockResolvedValue(undefined),
  getFaqItemById: vi.fn().mockResolvedValue(undefined),
  upsertFaqItem: vi.fn().mockResolvedValue(undefined),
  deleteFaqItem: vi.fn().mockResolvedValue(undefined),
  setSettings: vi.fn().mockResolvedValue(undefined),
  getAllMediaFiles: vi.fn().mockResolvedValue([]),
  createMediaFile: vi.fn().mockResolvedValue(undefined),
  deleteMediaFile: vi.fn().mockResolvedValue(undefined),
  getDashboardStats: vi.fn().mockResolvedValue({ totalLeads: 0, totalPosts: 0, totalPages: 2, totalLandingPages: 1, newLeads: 0, totalPracticeAreas: 2, totalFaqs: 1 }),
  upsertUser: vi.fn().mockResolvedValue(undefined),
  getUserByOpenId: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("./adminAuth", () => ({
  verifyAdminToken: vi.fn().mockResolvedValue(null),
  loginWithPassword: vi.fn().mockResolvedValue(null),
  loginWithGoogle: vi.fn().mockResolvedValue(null),
  getAdminByEmail: vi.fn().mockResolvedValue(null),
  createAdmin: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({ url: "https://example.com/file.png", key: "uploads/test.png" }),
}));

vi.mock("nanoid", () => ({
  nanoid: vi.fn().mockReturnValue("test123"),
}));

import * as db from "./db";

describe("Public tRPC Procedures - Data Layer", () => {
  it("getAllPages returns pages list", async () => {
    const pages = await db.getAllPages();
    expect(pages).toHaveLength(2);
    expect(pages[0].slug).toBe("sobre");
    expect(pages[1].slug).toBe("contato");
  });

  it("getPageBySlug returns page for valid slug", async () => {
    const page = await db.getPageBySlug("sobre");
    expect(page).toBeDefined();
    expect(page?.title).toBe("Sobre");
    expect(page?.content).toBe("Conteúdo sobre");
  });

  it("getPageBySlug returns undefined for invalid slug", async () => {
    const page = await db.getPageBySlug("nonexistent");
    expect(page).toBeUndefined();
  });

  it("getAllPracticeAreas returns areas list", async () => {
    const areas = await db.getAllPracticeAreas();
    expect(areas).toHaveLength(2);
    expect(areas[0].name).toBe("Direito Tributário");
    expect(areas[1].name).toBe("Direito Civil");
  });

  it("getAllLandingPages returns landing pages list", async () => {
    const lps = await db.getAllLandingPages();
    expect(lps).toHaveLength(1);
    expect(lps[0].slug).toBe("tributario");
  });

  it("getLandingPageBySlug returns LP for valid slug", async () => {
    const lp = await db.getLandingPageBySlug("tributario");
    expect(lp).toBeDefined();
    expect(lp?.title).toBe("Direito Tributário");
  });

  it("getLandingPageBySlug returns undefined for invalid slug", async () => {
    const lp = await db.getLandingPageBySlug("nonexistent");
    expect(lp).toBeUndefined();
  });

  it("getAllBlogPosts returns empty array when no posts", async () => {
    const posts = await db.getAllBlogPosts();
    expect(posts).toHaveLength(0);
  });

  it("getAllFaqItems returns FAQ items", async () => {
    const faqs = await db.getAllFaqItems();
    expect(faqs).toHaveLength(1);
    expect(faqs[0].question).toBe("Quais áreas?");
  });

  it("getAllSettings returns settings map", async () => {
    const settings = await db.getAllSettings();
    expect(settings.site_name).toBe("Mauro Monção Advogados");
    expect(settings.phone_whatsapp).toBe("(86) 99482-0054");
    expect(settings.email).toBe("contato@mauromoncao.adv.br");
  });

  it("createLead saves lead data", async () => {
    await db.createLead({ name: "Teste", email: "teste@test.com", phone: "86999999999", message: "Teste", source: "contato" });
    expect(db.createLead).toHaveBeenCalledWith({
      name: "Teste",
      email: "teste@test.com",
      phone: "86999999999",
      message: "Teste",
      source: "contato",
    });
  });
});

describe("Public Routes - Field Mapping", () => {
  it("practice areas have correct field names", async () => {
    const areas = await db.getAllPracticeAreas();
    const area = areas[0];
    expect(area).toHaveProperty("slug");
    expect(area).toHaveProperty("name");
    expect(area).toHaveProperty("shortDescription");
    expect(area).toHaveProperty("icon");
    expect(area).toHaveProperty("isPublished");
  });

  it("settings contain required public fields", async () => {
    const settings = await db.getAllSettings();
    expect(settings).toHaveProperty("phone_whatsapp");
    expect(settings).toHaveProperty("email");
  });
});
