import { eq, desc, asc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  InsertUser, users,
  pages, type InsertPage,
  practiceAreas, type InsertPracticeArea,
  landingPages, type InsertLandingPage,
  blogPosts, type InsertBlogPost,
  blogCategories,
  faqItems, type InsertFaqItem,
  leads, type InsertLead,
  siteSettings,
  mediaFiles, type InsertMediaFile,
  chatConversations, type InsertChatConversation,
  chatMessages, type InsertChatMessage,
} from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const client = postgres(process.env.DATABASE_URL, { ssl: "require", max: 5 });
      _db = drizzle(client);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── Legacy user helpers (kept for compatibility) ───
export async function upsertUser(user: InsertUser): Promise<void> {
  const db = getDb();
  if (!db || !user.openId) return;
  const values: InsertUser = {
    openId: user.openId,
    name: user.name,
    email: user.email,
    loginMethod: user.loginMethod,
    lastSignedIn: new Date(),
  };
  await db.insert(users).values(values)
    .onConflictDoUpdate({ target: users.openId, set: { name: user.name, email: user.email, lastSignedIn: new Date() } });
}

export async function getUserByOpenId(openId: string) {
  const db = getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

// ─── Pages ───
export async function getAllPages() {
  const db = getDb();
  if (!db) return [];
  return db.select().from(pages).orderBy(asc(pages.sortOrder));
}

export async function getPageBySlug(slug: string) {
  const db = getDb();
  if (!db) return undefined;
  const result = await db.select().from(pages).where(eq(pages.slug, slug)).limit(1);
  return result[0];
}

export async function getPageById(id: number) {
  const db = getDb();
  if (!db) return undefined;
  const result = await db.select().from(pages).where(eq(pages.id, id)).limit(1);
  return result[0];
}

export async function upsertPage(data: InsertPage) {
  const db = getDb();
  if (!db) return;
  if (data.id) {
    await db.update(pages).set({ ...data, updatedAt: new Date() }).where(eq(pages.id, data.id));
  } else {
    await db.insert(pages).values(data);
  }
}

export async function deletePage(id: number) {
  const db = getDb();
  if (!db) return;
  await db.delete(pages).where(eq(pages.id, id));
}

// ─── Practice Areas ───
export async function getAllPracticeAreas() {
  const db = getDb();
  if (!db) return [];
  return db.select().from(practiceAreas).orderBy(asc(practiceAreas.sortOrder));
}

export async function getPracticeAreaById(id: number) {
  const db = getDb();
  if (!db) return undefined;
  const result = await db.select().from(practiceAreas).where(eq(practiceAreas.id, id)).limit(1);
  return result[0];
}

export async function upsertPracticeArea(data: InsertPracticeArea) {
  const db = getDb();
  if (!db) return;
  if (data.id) {
    await db.update(practiceAreas).set({ ...data, updatedAt: new Date() }).where(eq(practiceAreas.id, data.id));
  } else {
    await db.insert(practiceAreas).values(data);
  }
}

export async function deletePracticeArea(id: number) {
  const db = getDb();
  if (!db) return;
  await db.delete(practiceAreas).where(eq(practiceAreas.id, id));
}

// ─── Landing Pages ───
export async function getAllLandingPages() {
  const db = getDb();
  if (!db) return [];
  return db.select().from(landingPages).orderBy(asc(landingPages.sortOrder));
}

export async function getLandingPageBySlug(slug: string) {
  const db = getDb();
  if (!db) return undefined;
  const result = await db.select().from(landingPages).where(eq(landingPages.slug, slug)).limit(1);
  return result[0];
}

export async function getLandingPageById(id: number) {
  const db = getDb();
  if (!db) return undefined;
  const result = await db.select().from(landingPages).where(eq(landingPages.id, id)).limit(1);
  return result[0];
}

export async function upsertLandingPage(data: InsertLandingPage) {
  const db = getDb();
  if (!db) return;
  if (data.id) {
    await db.update(landingPages).set({ ...data, updatedAt: new Date() }).where(eq(landingPages.id, data.id));
  } else {
    await db.insert(landingPages).values(data);
  }
}

export async function deleteLandingPage(id: number) {
  const db = getDb();
  if (!db) return;
  await db.delete(landingPages).where(eq(landingPages.id, id));
}

// ─── Blog Posts ───
export async function getAllBlogPosts(publishedOnly = false) {
  const db = getDb();
  if (!db) return [];
  if (publishedOnly) {
    return db.select().from(blogPosts).where(eq(blogPosts.isPublished, true)).orderBy(desc(blogPosts.publishedAt));
  }
  return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
}

export async function getBlogPostBySlug(slug: string) {
  const db = getDb();
  if (!db) return undefined;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result[0];
}

export async function getBlogPostById(id: number) {
  const db = getDb();
  if (!db) return undefined;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  return result[0];
}

export async function upsertBlogPost(data: InsertBlogPost) {
  const db = getDb();
  if (!db) return;
  if (data.id) {
    await db.update(blogPosts).set({ ...data, updatedAt: new Date() }).where(eq(blogPosts.id, data.id));
  } else {
    await db.insert(blogPosts).values(data);
  }
}

export async function deleteBlogPost(id: number) {
  const db = getDb();
  if (!db) return;
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}

// ─── Blog Categories ───
export async function getAllBlogCategories() {
  const db = getDb();
  if (!db) return [];
  return db.select().from(blogCategories).orderBy(asc(blogCategories.sortOrder));
}

export async function upsertBlogCategory(data: { id?: number; slug: string; name: string; description?: string | null; sortOrder?: number }) {
  const db = getDb();
  if (!db) return;
  if (data.id) {
    await db.update(blogCategories).set(data).where(eq(blogCategories.id, data.id));
  } else {
    await db.insert(blogCategories).values(data);
  }
}

export async function deleteBlogCategory(id: number) {
  const db = getDb();
  if (!db) return;
  await db.delete(blogCategories).where(eq(blogCategories.id, id));
}

// ─── FAQ ───
export async function getAllFaqItems(publishedOnly = false) {
  const db = getDb();
  if (!db) return [];
  if (publishedOnly) {
    return db.select().from(faqItems).where(eq(faqItems.isPublished, true)).orderBy(asc(faqItems.sortOrder));
  }
  return db.select().from(faqItems).orderBy(asc(faqItems.sortOrder));
}

export async function getFaqItemById(id: number) {
  const db = getDb();
  if (!db) return undefined;
  const result = await db.select().from(faqItems).where(eq(faqItems.id, id)).limit(1);
  return result[0];
}

export async function upsertFaqItem(data: InsertFaqItem) {
  const db = getDb();
  if (!db) return;
  if (data.id) {
    await db.update(faqItems).set({ ...data, updatedAt: new Date() }).where(eq(faqItems.id, data.id));
  } else {
    await db.insert(faqItems).values(data);
  }
}

export async function deleteFaqItem(id: number) {
  const db = getDb();
  if (!db) return;
  await db.delete(faqItems).where(eq(faqItems.id, id));
}

// ─── Leads ───
export async function getAllLeads() {
  const db = getDb();
  if (!db) return [];
  return db.select().from(leads).orderBy(desc(leads.createdAt));
}

export async function getLeadById(id: number) {
  const db = getDb();
  if (!db) return undefined;
  const result = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  return result[0];
}

export async function createLead(data: InsertLead) {
  const db = getDb();
  if (!db) return;
  await db.insert(leads).values(data);
}

export async function updateLeadStatus(id: number, status: "new" | "contacted" | "converted" | "archived") {
  const db = getDb();
  if (!db) return;
  await db.update(leads).set({ status, updatedAt: new Date() }).where(eq(leads.id, id));
}

export async function deleteLead(id: number) {
  const db = getDb();
  if (!db) return;
  await db.delete(leads).where(eq(leads.id, id));
}

// ─── Site Settings ───
export async function getSetting(key: string): Promise<string | null> {
  const db = getDb();
  if (!db) return null;
  const result = await db.select().from(siteSettings).where(eq(siteSettings.settingKey, key)).limit(1);
  return result[0]?.settingValue ?? null;
}

export async function getAllSettings(): Promise<Record<string, string>> {
  const db = getDb();
  if (!db) return {};
  const rows = await db.select().from(siteSettings);
  const map: Record<string, string> = {};
  for (const row of rows) {
    if (row.settingValue) map[row.settingKey] = row.settingValue;
  }
  return map;
}

export async function setSetting(key: string, value: string) {
  const db = getDb();
  if (!db) return;
  await db.insert(siteSettings)
    .values({ settingKey: key, settingValue: value, updatedAt: new Date() })
    .onConflictDoUpdate({ target: siteSettings.settingKey, set: { settingValue: value, updatedAt: new Date() } });
}

export async function setSettings(settings: Record<string, string>) {
  for (const [key, value] of Object.entries(settings)) {
    await setSetting(key, value);
  }
}

// ─── Media Files ───
export async function getAllMediaFiles() {
  const db = getDb();
  if (!db) return [];
  return db.select().from(mediaFiles).orderBy(desc(mediaFiles.createdAt));
}

export async function createMediaFile(data: InsertMediaFile) {
  const db = getDb();
  if (!db) return;
  await db.insert(mediaFiles).values(data);
}

export async function deleteMediaFile(id: number) {
  const db = getDb();
  if (!db) return;
  await db.delete(mediaFiles).where(eq(mediaFiles.id, id));
}

// ─── Dr. Ben Chat ───
export async function createChatConversation(sessionId: string) {
  const db = getDb();
  if (!db) return null;
  await db.insert(chatConversations).values({ sessionId, status: "open", messageCount: 0 });
  const result = await db.select().from(chatConversations).where(eq(chatConversations.sessionId, sessionId)).limit(1);
  return result[0] ?? null;
}

export async function getChatConversation(sessionId: string) {
  const db = getDb();
  if (!db) return null;
  const result = await db.select().from(chatConversations).where(eq(chatConversations.sessionId, sessionId)).limit(1);
  return result[0] ?? null;
}

export async function getChatConversationById(id: number) {
  const db = getDb();
  if (!db) return null;
  const result = await db.select().from(chatConversations).where(eq(chatConversations.id, id)).limit(1);
  return result[0] ?? null;
}

export async function getAllChatConversations() {
  const db = getDb();
  if (!db) return [];
  return db.select().from(chatConversations).orderBy(desc(chatConversations.updatedAt));
}

export async function updateChatConversation(sessionId: string, data: Partial<InsertChatConversation>) {
  const db = getDb();
  if (!db) return;
  await db.update(chatConversations).set({ ...data, updatedAt: new Date() }).where(eq(chatConversations.sessionId, sessionId));
}

export async function addChatMessage(data: InsertChatMessage) {
  const db = getDb();
  if (!db) return;
  await db.insert(chatMessages).values(data);
}

export async function getChatMessages(conversationId: number) {
  const db = getDb();
  if (!db) return [];
  return db.select().from(chatMessages)
    .where(eq(chatMessages.conversationId, conversationId))
    .orderBy(asc(chatMessages.createdAt));
}

export async function deleteChatConversation(id: number) {
  const db = getDb();
  if (!db) return;
  await db.delete(chatMessages).where(eq(chatMessages.conversationId, id));
  await db.delete(chatConversations).where(eq(chatConversations.id, id));
}

// ─── Dashboard Stats ───
export async function getDashboardStats() {
  const db = getDb();
  if (!db) return { totalLeads: 0, totalPosts: 0, totalPages: 0, totalLandingPages: 0, newLeads: 0, totalPracticeAreas: 0, totalFaqs: 0 };

  const [leadsCount] = await db.select({ count: sql<number>`cast(count(*) as int)` }).from(leads);
  const [newLeadsCount] = await db.select({ count: sql<number>`cast(count(*) as int)` }).from(leads).where(eq(leads.status, "new"));
  const [postsCount] = await db.select({ count: sql<number>`cast(count(*) as int)` }).from(blogPosts);
  const [pagesCount] = await db.select({ count: sql<number>`cast(count(*) as int)` }).from(pages);
  const [lpCount] = await db.select({ count: sql<number>`cast(count(*) as int)` }).from(landingPages);
  const [paCount] = await db.select({ count: sql<number>`cast(count(*) as int)` }).from(practiceAreas);
  const [faqCount] = await db.select({ count: sql<number>`cast(count(*) as int)` }).from(faqItems);

  return {
    totalLeads: leadsCount?.count ?? 0,
    newLeads: newLeadsCount?.count ?? 0,
    totalPosts: postsCount?.count ?? 0,
    totalPages: pagesCount?.count ?? 0,
    totalLandingPages: lpCount?.count ?? 0,
    totalPracticeAreas: paCount?.count ?? 0,
    totalFaqs: faqCount?.count ?? 0,
  };
}

// Default export for compatibility
export default { getDb, upsertUser, getUserByOpenId, getAllPages, getPageBySlug, getPageById, upsertPage, deletePage, getAllPracticeAreas, getPracticeAreaById, upsertPracticeArea, deletePracticeArea, getAllLandingPages, getLandingPageBySlug, getLandingPageById, upsertLandingPage, deleteLandingPage, getAllBlogPosts, getBlogPostBySlug, getBlogPostById, upsertBlogPost, deleteBlogPost, getAllBlogCategories, upsertBlogCategory, deleteBlogCategory, getAllFaqItems, getFaqItemById, upsertFaqItem, deleteFaqItem, getAllLeads, getLeadById, createLead, updateLeadStatus, deleteLead, getSetting, getAllSettings, setSetting, setSettings, getAllMediaFiles, createMediaFile, deleteMediaFile, createChatConversation, getChatConversation, getChatConversationById, getAllChatConversations, updateChatConversation, addChatMessage, getChatMessages, deleteChatConversation, getDashboardStats };
