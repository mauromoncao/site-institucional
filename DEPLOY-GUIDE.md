# 🚀 Guia de Deploy — Mauro Monção Advogados

> **Tempo estimado:** 30–45 minutos para o site estar no ar com tudo funcionando.
>
> **Pré-requisito:** Conta Google `mauromoncaoestudos@gmail.com` (já usada no GitHub e Vercel).

---

## Visão Geral

```
GitHub (código) → Vercel (hosting) → PlanetScale (banco MySQL)
                                   → Google AI Studio (Dr. Ben IA)
                                   → Resend (e-mails de leads)
```

Todos os serviços têm **plano gratuito** suficiente para começar.

---

## ETAPA 1 — Banco de Dados MySQL (PlanetScale)

> **Por quê PlanetScale?** MySQL gerenciado, gratuito até 5 GB, integra com Vercel em 1 clique, SSL automático.

1. Acesse **https://planetscale.com** e faça login com sua conta Google
2. Clique em **"Create a new database"**
   - Name: `mauro-moncao`
   - Region: `AWS us-east-1` (Virginia) — melhor latência com Vercel
   - Plan: **Hobby (Free)**
3. Aguarde criar (~30s) e clique em **"Connect"**
4. Em "Connect with": selecione **"Node.js"**
5. Copie a `DATABASE_URL` — será assim:
   ```
   mysql://usuario:senha@host.us-east-1.psdb.cloud/mauro-moncao?ssl={"rejectUnauthorized":true}
   ```
6. **Guarde essa string** — vai precisar nos próximos passos

---

## ETAPA 2 — Chave da IA (Google AI Studio)

> O Dr. Ben usa Gemini 2.5 Flash. Plano gratuito: 1.500 req/dia.

1. Acesse **https://aistudio.google.com/apikey** com sua conta Google
2. Clique em **"Create API key"**
3. Selecione o projeto ou crie um novo: `mauro-moncao`
4. Copie a chave — começa com `AIzaSy...`
5. **Guarde essa chave**

---

## ETAPA 3 — E-mail de Leads (Resend)

> Notificação automática quando alguém preenche formulário no site.

1. Acesse **https://resend.com** → Sign up com sua conta Google
2. Vá em **API Keys** → **"Create API Key"**
   - Name: `mauro-moncao-site`
   - Permission: Sending access
3. Copie a chave — começa com `re_...`
4. *(Opcional mas recomendado)* Em **Domains**, adicione `mauromoncao.adv.br` e configure os registros DNS

---

## ETAPA 4 — Deploy na Vercel

> O repositório GitHub já está conectado à Vercel. É só configurar as variáveis.

### 4.1 — Acessar o projeto na Vercel

1. Acesse **https://vercel.com** → login com `mauromoncaoestudos@gmail.com`
2. Clique no projeto **`site-institucional`**
3. Vá em **Settings → Environment Variables**

### 4.2 — Adicionar as variáveis de ambiente

Clique em **"Add"** para cada uma:

| Nome | Valor | Environment |
|------|-------|-------------|
| `DATABASE_URL` | `mysql://...` (copiada na Etapa 1) | Production |
| `JWT_SECRET` | Gere em: https://generate-secret.vercel.app/32 | Production |
| `ADMIN_EMAIL` | `mauromoncaofilho@gmail.com` | Production |
| `OPENAI_API_KEY` | `AIzaSy...` (copiada na Etapa 2) | Production |
| `OPENAI_API_URL` | `https://generativelanguage.googleapis.com/v1beta/openai/` | Production |
| `RESEND_API_KEY` | `re_...` (copiada na Etapa 3) | Production |
| `GOOGLE_CLIENT_ID` | `xxx.apps.googleusercontent.com` (opcional — login Google) | Production |
| `GOOGLE_CLIENT_SECRET` | `GOCSPX-...` (opcional) | Production |
| `VITE_GOOGLE_CLIENT_ID` | **Mesmo valor** do `GOOGLE_CLIENT_ID` (habilita botão na tela de login) | Production |
| `NODE_ENV` | `production` | Production |

### 4.3 — Fazer o deploy

1. Vá em **Deployments**
2. Clique em **"Redeploy"** no deploy mais recente
   - OU: faça um push no GitHub — o deploy acontece automaticamente
3. Aguarde ~2 minutos
4. Clique no link gerado (algo como `site-institucional-xxx.vercel.app`)

---

## ETAPA 5 — Configurar o Banco (rodar setup)

Após o deploy, você precisa criar as tabelas e o usuário admin.

### Opção A — Via terminal local (recomendado)

```bash
# Clone o projeto (se não tiver)
git clone https://github.com/mauromoncao/site-institucional.git
cd site-institucional

# Crie o .env com sua DATABASE_URL
echo 'DATABASE_URL=sua_string_aqui' > .env

# Instale dependências
npm install

# Rode o setup (cria tabelas + usuário admin)
node setup-production.mjs
```

### Opção B — Via Vercel Functions (sem terminal)

Acesse no browser após o deploy:
```
https://seu-site.vercel.app/api/trpc/system.health
```
*(confirma que o servidor está rodando)*

Depois peça ao desenvolvedor para rodar `node setup-production.mjs` com a DATABASE_URL.

---

## ETAPA 6 — Domínio `mauromoncao.adv.br`

1. Na Vercel: **Settings → Domains** → **"Add Domain"**
2. Digite: `mauromoncao.adv.br`
3. Vercel mostrará registros DNS para configurar
4. No painel do seu registrador de domínio (onde comprou o `.adv.br`):
   - Adicione um registro **A** ou **CNAME** conforme a Vercel indicar
5. Aguarde propagação (até 24h, geralmente ~15 min)
6. SSL (HTTPS) é configurado automaticamente pela Vercel ✅

---

## ETAPA 7 — Primeiro Acesso ao Admin

1. Acesse: `https://mauromoncao.adv.br/admin`
2. Login:
   - **E-mail:** `mauromoncaofilho@gmail.com`
   - **Senha:** `MauroMoncao@2025!`
3. **⚠️ IMEDIATAMENTE** troque a senha em Configurações
4. Verifique o Dr. Ben em `/admin/dr-ben`

---

## ETAPA 8 — Google Search Console (SEO)

1. Acesse **https://search.google.com/search-console**
2. Clique em **"Adicionar propriedade"** → `https://mauromoncao.adv.br`
3. Verifique com o método "HTML tag" (Vercel injeta facilmente)
4. Vá em **Sitemaps** → adicione: `https://mauromoncao.adv.br/sitemap.xml`
5. O Google começa a indexar em 24–72h

---

## Checklist Final

- [ ] PlanetScale criado e `DATABASE_URL` copiada
- [ ] Google AI Studio chave gerada (`AIzaSy...`)
- [ ] Resend conta criada e chave gerada (`re_...`)
- [ ] Variáveis adicionadas na Vercel
- [ ] Deploy rodado com sucesso
- [ ] `node setup-production.mjs` executado (tabelas criadas)
- [ ] Login no admin funcionando
- [ ] Senha trocada
- [ ] Domínio apontado
- [ ] Search Console configurado

---

## Suporte Rápido

| Problema | Solução |
|----------|---------|
| Admin não loga | Verifique se rodou `setup-production.mjs` |
| Dr. Ben não responde | Verifique `OPENAI_API_KEY` e `OPENAI_API_URL` nas variáveis da Vercel |
| Leads não chegam por e-mail | Verifique `RESEND_API_KEY` e domínio verificado no Resend |
| Site fora do ar | Verifique logs na Vercel em Deployments → Functions |
| Banco não conecta | Verifique `DATABASE_URL` e se o PlanetScale está no plano ativo |
