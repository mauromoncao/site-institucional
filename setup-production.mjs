/**
 * setup-production.mjs
 * ─────────────────────────────────────────────────────────────
 * Script único de setup para produção — rode UMA VEZ após deploy.
 *
 * O que faz, em ordem:
 *   1. Verifica variáveis de ambiente obrigatórias
 *   2. Roda todas as migrations SQL (cria/atualiza as tabelas)
 *   3. Cria o usuário admin (mauromoncaoadv.escritorio@gmail.com)
 *   4. Popula configurações iniciais do site (settings)
 *
 * Como usar:
 *   node setup-production.mjs
 *
 * Pré-requisito:
 *   DATABASE_URL deve estar definida no .env ou no ambiente do servidor.
 * ─────────────────────────────────────────────────────────────
 */

import "dotenv/config";
import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import {
  adminUsers,
  siteSettings,
} from "./drizzle/schema.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── 1. Verificação de ambiente ─────────────────────────────────
const REQUIRED_VARS = ["DATABASE_URL"];
const missing = REQUIRED_VARS.filter((v) => !process.env[v]);
if (missing.length > 0) {
  console.error("❌ Variáveis obrigatórias ausentes:", missing.join(", "));
  console.error("   Crie um arquivo .env baseado no .env.example e tente novamente.");
  process.exit(1);
}

console.log("🚀 Mauro Monção — Setup de Produção");
console.log("════════════════════════════════════\n");

// ── 2. Conexão direta ao MySQL para rodar migrations ──────────
const conn = await mysql.createConnection(process.env.DATABASE_URL);

async function runMigrations() {
  console.log("📦 Rodando migrations SQL...");

  // Pega todos os .sql na pasta /drizzle, em ordem
  const migrationsDir = join(__dirname, "drizzle");
  const sqlFiles = readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of sqlFiles) {
    const filePath = join(migrationsDir, file);
    const sql = readFileSync(filePath, "utf-8");

    // Drizzle Kit usa "--> statement-breakpoint" como separador
    const statements = sql
      .split("--> statement-breakpoint")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const statement of statements) {
      try {
        await conn.execute(statement);
      } catch (err) {
        // Ignora erros de "já existe" — idempotente
        const msg = err.message || "";
        if (
          msg.includes("already exists") ||
          msg.includes("Duplicate column") ||
          msg.includes("Can't create table") && msg.includes("errno: 1050")
        ) {
          // Silencioso — tabela/coluna já existia
        } else {
          console.warn(`   ⚠️  ${file}: ${msg.slice(0, 120)}`);
        }
      }
    }
    console.log(`   ✅ ${file}`);
  }
  console.log("✅ Migrations concluídas\n");
}

// ── 3. Drizzle ORM para seed de dados ─────────────────────────
const db = drizzle(process.env.DATABASE_URL);

async function seedAdmin() {
  console.log("👤 Criando usuário admin...");

  const email = "mauromoncaoadv.escritorio@gmail.com";
  const existing = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email))
    .limit(1);

  if (existing.length === 0) {
    // Senha padrão — TROQUE após o primeiro login em /admin/settings
    const passwordHash = await bcrypt.hash("MauroMoncao@2025!", 12);
    await db.insert(adminUsers).values({
      email,
      name: "Dr. Mauro Monção",
      passwordHash,
      role: "admin",
      isActive: true,
    });
    console.log("   ✅ Admin criado:", email);
    console.log("   🔑 Senha inicial: MauroMoncao@2025!");
    console.log("   ⚠️  TROQUE a senha após o primeiro acesso!\n");
  } else {
    console.log("   ℹ️  Admin já existe:", email, "\n");
  }
}

async function seedSettings() {
  console.log("⚙️  Configurando settings do site...");

  const settings = {
    site_name: "Mauro Monção Advogados Associados",
    contact_email: "contato@mauromoncao.adv.br",
    phone_personal: "(86) 99948-4761",
    phone_office: "(86) 99519-8919",
    phone_drben: "(86) 99482-0054",
    whatsapp_cta: "5586994820054",
    whatsapp_drben: "5586994820054",
    whatsapp_message: "Olá! Gostaria de mais informações sobre os serviços jurídicos.",
    instagram: "https://www.instagram.com/mauromoncao.adv/",
    facebook: "",
    linkedin: "",
    youtube: "",
    tiktok: "",
    address_main: "Parnaíba - PI",
    address_secondary: "",
    maps_url: "",
    gtm_id: "GTM-MMKSHTQV",
    ga_id: "",
    logo_url: "/logo-brand-gold.png",
    favicon_url: "/favicon.ico",
    drben_wa: "5586994820054",
  };

  let count = 0;
  for (const [key, value] of Object.entries(settings)) {
    const existing = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.settingKey, key))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(siteSettings).values({ settingKey: key, settingValue: value });
      count++;
    }
  }
  console.log(`   ✅ ${count} configurações adicionadas (existentes mantidas)\n`);
}

// ── 4. Sumário final ───────────────────────────────────────────
function printSummary() {
  console.log("════════════════════════════════════");
  console.log("🎉 Setup concluído com sucesso!\n");
  console.log("📋 Próximos passos:");
  console.log("   1. Acesse /admin e faça login com:");
  console.log("      E-mail: mauromoncaoadv.escritorio@gmail.com");
  console.log("      Senha:  MauroMoncao@2025!");
  console.log("   2. TROQUE a senha imediatamente após o login");
  console.log("   3. Vincule seu login Google em Configurações → Conta");
  console.log("   4. Verifique as configurações do site em /admin/settings");
  console.log("");
  console.log("🤖 Dr. Ben:");
  console.log("   • Certifique-se que OPENAI_API_KEY está definida no servidor");
  console.log("   • URL: OPENAI_API_URL=https://generativelanguage.googleapis.com/v1beta/openai/");
  console.log("   • Conversas aparecem em /admin/dr-ben");
  console.log("════════════════════════════════════\n");
}

// ── Execução ──────────────────────────────────────────────────
try {
  await runMigrations();
  await seedAdmin();
  await seedSettings();
  printSummary();
  await conn.end();
  process.exit(0);
} catch (err) {
  console.error("\n❌ Erro durante o setup:", err);
  await conn.end().catch(() => {});
  process.exit(1);
}
