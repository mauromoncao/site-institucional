import postgres from "postgres";
import bcrypt from "bcrypt";

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) { console.error("DATABASE_URL not set"); process.exit(1); }

const sql = postgres(DB_URL, { ssl: "require", max: 1 });

async function run() {
  console.log("🔧 Criando enums...");
  await sql.unsafe(`DO $$ BEGIN
    CREATE TYPE role AS ENUM ('admin','editor'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;`);
  await sql.unsafe(`DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('user','admin'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;`);
  await sql.unsafe(`DO $$ BEGIN
    CREATE TYPE lead_status AS ENUM ('new','contacted','converted','archived'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;`);
  await sql.unsafe(`DO $$ BEGIN
    CREATE TYPE urgency_level AS ENUM ('low','medium','high','critical'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;`);
  await sql.unsafe(`DO $$ BEGIN
    CREATE TYPE conv_status AS ENUM ('open','qualified','transferred','closed'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;`);
  await sql.unsafe(`DO $$ BEGIN
    CREATE TYPE msg_role AS ENUM ('user','assistant'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;`);
  console.log("✅ Enums OK");

  console.log("🔧 Criando tabelas...");
  await sql.unsafe(`CREATE TABLE IF NOT EXISTS admin_users (id SERIAL PRIMARY KEY, email VARCHAR(320) NOT NULL UNIQUE, "passwordHash" VARCHAR(255), "googleId" VARCHAR(128), name VARCHAR(255) NOT NULL, role role DEFAULT 'admin' NOT NULL, "isActive" BOOLEAN DEFAULT true NOT NULL, "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL, "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL, "lastSignedIn" TIMESTAMP)`);
  await sql.unsafe(`CREATE TABLE IF NOT EXISTS site_settings (id SERIAL PRIMARY KEY, "settingKey" VARCHAR(128) NOT NULL UNIQUE, "settingValue" TEXT, "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL)`);
  await sql.unsafe(`CREATE TABLE IF NOT EXISTS pages (id SERIAL PRIMARY KEY, slug VARCHAR(255) NOT NULL UNIQUE, title VARCHAR(255) NOT NULL, content TEXT, "metaTitle" VARCHAR(255), "metaDescription" TEXT, "metaKeywords" VARCHAR(500), "ogTitle" VARCHAR(255), "ogDescription" TEXT, "ogImage" VARCHAR(500), canonical VARCHAR(500), "isPublished" BOOLEAN DEFAULT true NOT NULL, "sortOrder" INTEGER DEFAULT 0 NOT NULL, "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL, "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL)`);
  await sql.unsafe(`CREATE TABLE IF NOT EXISTS practice_areas (id SERIAL PRIMARY KEY, slug VARCHAR(255) NOT NULL UNIQUE, name VARCHAR(255) NOT NULL, "shortDescription" TEXT, icon VARCHAR(128), "landingPageId" INTEGER, "externalLandingUrl" VARCHAR(500), "isPublished" BOOLEAN DEFAULT true NOT NULL, "sortOrder" INTEGER DEFAULT 0 NOT NULL, "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL, "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL)`);
  await sql.unsafe(`CREATE TABLE IF NOT EXISTS landing_pages (id SERIAL PRIMARY KEY, slug VARCHAR(255) NOT NULL UNIQUE, title VARCHAR(255) NOT NULL, subtitle TEXT, "heroImage" VARCHAR(500), "heroVideoUrl" VARCHAR(500), content TEXT, "ctaText" VARCHAR(255), "ctaWhatsapp" VARCHAR(20), features JSON, testimonials JSON, "metaTitle" VARCHAR(255), "metaDescription" TEXT, "metaKeywords" VARCHAR(500), "ogTitle" VARCHAR(255), "ogDescription" TEXT, "ogImage" VARCHAR(500), canonical VARCHAR(500), "externalUrl" VARCHAR(500), "isExternal" BOOLEAN DEFAULT false NOT NULL, "isPublished" BOOLEAN DEFAULT true NOT NULL, "practiceAreaId" INTEGER, "sortOrder" INTEGER DEFAULT 0 NOT NULL, "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL, "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL)`);
  await sql.unsafe(`CREATE TABLE IF NOT EXISTS blog_categories (id SERIAL PRIMARY KEY, slug VARCHAR(255) NOT NULL UNIQUE, name VARCHAR(255) NOT NULL, description TEXT, "sortOrder" INTEGER DEFAULT 0 NOT NULL, "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL)`);
  await sql.unsafe(`CREATE TABLE IF NOT EXISTS blog_posts (id SERIAL PRIMARY KEY, slug VARCHAR(255) NOT NULL UNIQUE, title VARCHAR(255) NOT NULL, excerpt TEXT, content TEXT, "coverImage" VARCHAR(500), "authorName" VARCHAR(255), "categoryId" INTEGER, tags VARCHAR(500), "metaTitle" VARCHAR(255), "metaDescription" TEXT, "ogTitle" VARCHAR(255), "ogDescription" TEXT, "ogImage" VARCHAR(500), "isPublished" BOOLEAN DEFAULT false NOT NULL, "publishedAt" TIMESTAMP, "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL, "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL)`);
  await sql.unsafe(`CREATE TABLE IF NOT EXISTS faq_items (id SERIAL PRIMARY KEY, question TEXT NOT NULL, answer TEXT NOT NULL, category VARCHAR(128), "isPublished" BOOLEAN DEFAULT true NOT NULL, "sortOrder" INTEGER DEFAULT 0 NOT NULL, "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL, "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL)`);
  await sql.unsafe(`CREATE TABLE IF NOT EXISTS leads (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(320), phone VARCHAR(20), message TEXT, source VARCHAR(128), "landingPageId" INTEGER, status lead_status DEFAULT 'new' NOT NULL, "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL, "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL)`);
  await sql.unsafe(`CREATE TABLE IF NOT EXISTS media_files (id SERIAL PRIMARY KEY, filename VARCHAR(255) NOT NULL, "originalName" VARCHAR(255) NOT NULL, "mimeType" VARCHAR(128) NOT NULL, size INTEGER NOT NULL, url VARCHAR(500) NOT NULL, "fileKey" VARCHAR(500) NOT NULL, alt VARCHAR(255), "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL)`);
  await sql.unsafe(`CREATE TABLE IF NOT EXISTS chat_conversations (id SERIAL PRIMARY KEY, "sessionId" VARCHAR(64) NOT NULL UNIQUE, "visitorName" VARCHAR(255), "visitorPhone" VARCHAR(20), "visitorEmail" VARCHAR(320), "legalArea" VARCHAR(128), "urgencyLevel" urgency_level DEFAULT 'low', status conv_status DEFAULT 'open' NOT NULL, "leadId" INTEGER, "messageCount" INTEGER DEFAULT 0 NOT NULL, summary TEXT, "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL, "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL)`);
  await sql.unsafe(`CREATE TABLE IF NOT EXISTS chat_messages (id SERIAL PRIMARY KEY, "conversationId" INTEGER NOT NULL, role msg_role NOT NULL, content TEXT NOT NULL, "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL)`);
  await sql.unsafe(`CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, "openId" VARCHAR(64) NOT NULL UNIQUE, name TEXT, email VARCHAR(320), "loginMethod" VARCHAR(64), role user_role DEFAULT 'user' NOT NULL, "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL, "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL, "lastSignedIn" TIMESTAMP DEFAULT NOW() NOT NULL)`);
  console.log("✅ Tabelas criadas!");

  console.log("👤 Criando admin...");
  const hash = await bcrypt.hash("Admin@2024!", 12);
  await sql.unsafe(`INSERT INTO admin_users (email, "passwordHash", name, role, "isActive") VALUES ('mauromoncaoadv.escritorio@gmail.com', '${hash}', 'Dr. Mauro Monção', 'admin', true) ON CONFLICT (email) DO NOTHING`);
  console.log("✅ Admin: mauromoncaoadv.escritorio@gmail.com / Admin@2024!");

  console.log("⚙️  Inserindo configurações...");
  const settings = [
    ["site_name", "Mauro Monção Advogados Associados"],
    ["contact_email", "contato@mauromoncao.adv.br"],
    ["phone_personal", "(86) 99948-4761"],
    ["phone_office", "(86) 99519-8919"],
    ["whatsapp_cta", "5586994820054"],
    ["whatsapp_message", "Olá! Gostaria de mais informações sobre os serviços jurídicos."],
    ["instagram", "https://www.instagram.com/mauromoncao.adv/"],
    ["address", "Teresina - PI"],
    ["gtm_id", "GTM-MMKSHTQV"],
  ];
  for (const [k, v] of settings) {
    await sql.unsafe(`INSERT INTO site_settings ("settingKey","settingValue") VALUES ('${k}','${v.replace(/'/g,"''")}') ON CONFLICT ("settingKey") DO UPDATE SET "settingValue"=EXCLUDED."settingValue"`);
  }
  console.log("✅ Configurações inseridas!");

  console.log("📋 Inserindo FAQ...");
  const faqs = [
    ["Quais áreas do direito o escritório atende?", "Atendemos Direito Tributário, Previdenciário, Bancário, do Consumidor, Civil, Eleitoral, Administrativo e Planejamento Sucessório.", 1],
    ["O escritório atende em outros estados?", "Sim, atendemos clientes em todo o Brasil com atendimento online via videoconferência.", 2],
    ["Como agendar uma consulta?", "Entre em contato pelo WhatsApp (86) 99482-0054 ou pelo formulário do site. Respondemos em até 24h úteis.", 3],
    ["Vocês oferecem consulta online?", "Sim! Realizamos consultas por videoconferência com a mesma qualidade do atendimento presencial.", 4],
  ];
  for (const [q, a, order] of faqs) {
    const qStr = String(q).replace(/'/g,"''");
    const aStr = String(a).replace(/'/g,"''");
    await sql.unsafe(`INSERT INTO faq_items (question, answer, "isPublished", "sortOrder") VALUES ('${qStr}','${aStr}',true,${order}) ON CONFLICT DO NOTHING`);
  }
  console.log("✅ FAQ inserido!");

  console.log("\n🎉 BANCO INICIALIZADO COM SUCESSO!");
  console.log("   Login admin: mauromoncaoadv.escritorio@gmail.com");
  console.log("   Senha: Admin@2024!");
  await sql.end();
}

run().catch(e => { console.error("❌ ERRO:", e.message); sql.end(); process.exit(1); });
