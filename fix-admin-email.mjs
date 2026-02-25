import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import { adminUsers } from './drizzle/schema.ts';

const db = drizzle(process.env.DATABASE_URL);

// First check current admin
const allAdmins = await db.select().from(adminUsers);
console.log("Current admins:", JSON.stringify(allAdmins.map(a => ({ id: a.id, email: a.email, name: a.name })), null, 2));

// Update all admin emails to the correct one
if (allAdmins.length > 0) {
  const { eq } = await import('drizzle-orm');
  for (const admin of allAdmins) {
    await db.update(adminUsers)
      .set({ email: 'mauromoncaoadv.escritorio@gmail.com' })
      .where(eq(adminUsers.id, admin.id));
    console.log(`Updated admin ${admin.id} email from ${admin.email} to mauromoncaoadv.escritorio@gmail.com`);
  }
}

// Verify
const updated = await db.select().from(adminUsers);
console.log("Updated admins:", JSON.stringify(updated.map(a => ({ id: a.id, email: a.email, name: a.name })), null, 2));

process.exit(0);
