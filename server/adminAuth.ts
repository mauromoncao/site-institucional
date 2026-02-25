import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { adminUsers, type AdminUser, type InsertAdminUser } from "../drizzle/schema";
import { ENV } from "./_core/env";

const JWT_SECRET_KEY = new TextEncoder().encode(ENV.cookieSecret || "fallback-secret-change-me");
const TOKEN_EXPIRY = "7d";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createAdminToken(user: AdminUser): Promise<string> {
  return new SignJWT({
    sub: String(user.id),
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET_KEY);
}

export async function verifyAdminToken(token: string): Promise<{ id: number; email: string; name: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET_KEY);
    return {
      id: Number(payload.sub),
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

export async function getAdminByEmail(email: string): Promise<AdminUser | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
  return result[0];
}

export async function getAdminById(id: number): Promise<AdminUser | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(adminUsers).where(eq(adminUsers.id, id)).limit(1);
  return result[0];
}

export async function createAdmin(data: { email: string; password?: string; googleId?: string; name: string }): Promise<AdminUser> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const values: InsertAdminUser = {
    email: data.email,
    name: data.name,
    role: "admin",
    isActive: true,
  };

  if (data.password) {
    values.passwordHash = await hashPassword(data.password);
  }
  if (data.googleId) {
    values.googleId = data.googleId;
  }

  await db.insert(adminUsers).values(values);
  const created = await getAdminByEmail(data.email);
  if (!created) throw new Error("Failed to create admin user");
  return created;
}

export async function updateAdminLastLogin(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(adminUsers).set({ lastSignedIn: new Date() }).where(eq(adminUsers.id, id));
}

export async function updateAdminGoogleId(id: number, googleId: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(adminUsers).set({ googleId }).where(eq(adminUsers.id, id));
}

export async function getAdminByGoogleId(googleId: string): Promise<AdminUser | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(adminUsers).where(eq(adminUsers.googleId, googleId)).limit(1);
  return result[0];
}

export async function loginWithPassword(email: string, password: string): Promise<{ token: string; user: AdminUser } | null> {
  const user = await getAdminByEmail(email);
  if (!user || !user.passwordHash || !user.isActive) return null;

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return null;

  await updateAdminLastLogin(user.id);
  const token = await createAdminToken(user);
  return { token, user };
}

export async function loginWithGoogle(googleIdToken: string): Promise<{ token: string; user: AdminUser } | null> {
  try {
    const { OAuth2Client } = await import("google-auth-library");
    const client = new OAuth2Client(ENV.googleClientId);

    const ticket = await client.verifyIdToken({
      idToken: googleIdToken,
      audience: ENV.googleClientId,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) return null;

    // Check if user exists by Google ID
    let user = await getAdminByGoogleId(payload.sub);

    if (!user) {
      // Check if user exists by email
      user = await getAdminByEmail(payload.email);
      if (user) {
        // Link Google account to existing user
        await updateAdminGoogleId(user.id, payload.sub);
      } else {
        // Only allow pre-authorized emails
        const allowedEmail = ENV.adminEmail;
        if (payload.email !== allowedEmail) {
          return null;
        }
        // Create new admin user
        user = await createAdmin({
          email: payload.email,
          googleId: payload.sub,
          name: payload.name || payload.email,
        });
      }
    }

    if (!user.isActive) return null;

    await updateAdminLastLogin(user.id);
    const token = await createAdminToken(user);
    return { token, user };
  } catch (error) {
    console.error("[AdminAuth] Google login error:", error);
    return null;
  }
}
