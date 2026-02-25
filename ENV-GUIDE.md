# Variáveis de Ambiente — Mauro Monção Advogados

> Copie `.env.example` para `.env` e preencha os valores.

---

## 🔴 Obrigatórias

| Variável | Descrição | Como obter |
|---|---|---|
| `DATABASE_URL` | String de conexão MySQL | [PlanetScale](https://planetscale.com) (grátis) ou [Railway](https://railway.app) |
| `JWT_SECRET` | Chave secreta para JWT | `openssl rand -hex 32` |
| `ADMIN_EMAIL` | E-mail do admin principal | `mauromoncaofilho@gmail.com` |

---

## 🤖 Dr. Ben — IA (obrigatória para o agente funcionar)

| Variável | Valor | Como obter |
|---|---|---|
| `OPENAI_API_KEY` | `AIzaSy...` | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) → Create API key |
| `OPENAI_API_URL` | `https://generativelanguage.googleapis.com/v1beta/openai/` | Fixo — não altere |

**Sem estas variáveis**, o Dr. Ben exibe uma mensagem de fallback com o WhatsApp do escritório.  
**Plano gratuito do AI Studio**: 1.500 req/dia com Gemini 2.5 Flash — suficiente para o escritório.

---

## 📧 E-mail de Leads (recomendado)

| Variável | Descrição | Como obter |
|---|---|---|
| `RESEND_API_KEY` | Notificações de novos leads | [resend.com](https://resend.com) (3.000 emails/mês grátis) |

---

## 🔐 Login Google no Admin (opcional)

| Variável | Descrição |
|---|---|
| `GOOGLE_CLIENT_ID` | OAuth 2.0 Client ID |
| `GOOGLE_CLIENT_SECRET` | OAuth 2.0 Client Secret |
| `VITE_GOOGLE_CLIENT_ID` | **Mesmo valor** do `GOOGLE_CLIENT_ID` — habilita botão "Entrar com Google" na tela de login |

**Como configurar:**
1. [console.cloud.google.com](https://console.cloud.google.com)
2. Novo projeto → APIs & Services → Credentials → Create OAuth 2.0 Client ID
3. Tipo: **Web Application**
4. Authorized redirect URI: `https://mauromoncao.adv.br/api/auth/google/callback`
5. Copie Client ID e Secret

---

## 🗂️ Storage S3 — Upload de mídia (opcional)

| Variável | Descrição |
|---|---|
| `S3_ACCESS_KEY_ID` | Access Key |
| `S3_SECRET_ACCESS_KEY` | Secret Key |
| `S3_BUCKET` | Nome do bucket |
| `S3_REGION` | Região (padrão: `us-east-1`) |
| `S3_ENDPOINT` | Endpoint customizado (Cloudflare R2, DigitalOcean, etc.) |

**Opções recomendadas:**
- **Cloudflare R2**: gratuito até 10 GB/mês — melhor custo-benefício
- **AWS S3**: padrão, pago por uso
- **DigitalOcean Spaces**: $5/mês, simples

---

## ⚙️ Servidor

| Variável | Padrão | Descrição |
|---|---|---|
| `PORT` | `3000` | Porta do servidor Node.js |
| `NODE_ENV` | `production` | Ambiente de execução |
