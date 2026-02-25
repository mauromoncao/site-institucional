# Auditoria de Dependências Manus

## Arquivos com referências a serviços Manus

### 1. Arquivos legados (não fazem parte do app React - podem ser removidos)
- `api-proxy.php` — arquivo PHP legado
- `drben-embed.js` — embed do Dr. Ben (projeto separado)
- `final_drben_embed.js` — embed do Dr. Ben (projeto separado)
- `final_index.html` — HTML legado
- `github_upload_index.html` — HTML legado
- `index.html` (raiz) — HTML legado do site estático antigo
- `assets/index-BeaFMEKL.js` — bundle JS legado
- `assets/index-CPgpPKv8.css` — bundle CSS legado
- `assets/index-Bxhcf0mU.js` — bundle JS legado (contém LP Enquadramento Hospitalar)

### 2. Arquivos do app React que precisam ser modificados
- `client/index.html` — referência VITE_ANALYTICS_ENDPOINT
- `client/src/const.ts` — VITE_OAUTH_PORTAL_URL, VITE_APP_ID (Manus OAuth)
- `client/src/components/Map.tsx` — VITE_FRONTEND_FORGE_API_KEY, VITE_FRONTEND_FORGE_API_URL
- `vite.config.ts` — allowedHosts com domínios manus
- `manifest.json` — ícones no manuscdn.com

### 3. Arquivos server/_core (framework Manus)
- `server/_core/oauth.ts` — Manus OAuth
- `server/_core/env.ts` — variáveis de ambiente Manus
- `server/_core/context.ts` — contexto de autenticação
- `server/_core/llm.ts` — API LLM Manus
- `server/_core/notification.ts` — notificações Manus
- `server/_core/imageGeneration.ts` — geração de imagens Manus
- `server/_core/map.ts` — proxy de mapas Manus

### 4. Imagens no CDN Manus (files.manuscdn.com)
- Favicons (16x16, 32x32, 48x48, 192x192)
- Apple touch icon (180x180)
- Ícones do manifest (192x192, 512x512)
- Imagens das landing pages

## Plano de Migração

### Fase 1: Remover arquivos legados
Remover todos os arquivos que não fazem parte do app React.

### Fase 2: Autenticação
Substituir Manus OAuth por autenticação local com bcrypt + JWT.

### Fase 3: Storage/Imagens
Baixar imagens do manuscdn.com e servir localmente via /public.

### Fase 4: Remover APIs Manus
- LLM: não usado nas features atuais
- Notification: substituir por email ou remover
- Image Generation: não usado
- Map: não usado

### Fase 5: Configuração Vercel
- Adaptar vite.config.ts
- Criar vercel.json
- Documentar variáveis de ambiente
