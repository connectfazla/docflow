# DocFlow Pro

A high-end SaaS document automation platform — prepare, send, and e-sign
business documents with a clean Apple-inspired UI. Backed by PostgreSQL,
NextAuth, and a full super-admin console for SMTP, AI, payments and plans.

## Stack

- **Next.js 14** (App Router, standalone output)
- **PostgreSQL 16** via **Prisma 5**
- **NextAuth v4** (JWT, Credentials provider, role-gated routes)
- **Tiptap 3** rich-text editor
- **Stripe** + **Ziina** payment providers (toggleable, free-tier by default)
- **OpenAI / Anthropic** AI content generation (API key managed in admin console)
- **Nodemailer** SMTP (configured from admin console, dev console fallback)
- **Tailwind CSS** + Apple design tokens (see `DESIGN.md`)
- **Zustand** client state with API hydration

## Port

The app runs on **port 3219** (not 3000). This is baked into the dev/start
scripts, `.env.local`, Docker compose, and VS Code launch config.

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Start local Postgres (any of)
#    - brew services start postgresql@16
#    - docker compose up -d postgres

# 3. Configure env
cp .env.example .env.local
# Edit DATABASE_URL, NEXTAUTH_SECRET, APP_ENCRYPTION_KEY, ADMIN_EMAIL, ADMIN_PASSWORD

# 4. Push schema + seed templates & plans
set -a && source .env.local && set +a
npx prisma db push
npm run db:seed

# 5. Run
npm run dev
# → http://localhost:3219
```

## Required environment variables

| Key | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string |
| `NEXTAUTH_SECRET` | JWT signing secret |
| `NEXTAUTH_URL` | Public URL (e.g. `http://localhost:3219`) |
| `APP_ENCRYPTION_KEY` | AES-256-GCM key for settings-at-rest (32+ chars) |
| `ADMIN_EMAIL` | Super-admin email (upserted on every boot) |
| `ADMIN_PASSWORD` | Super-admin password |
| `ADMIN_NAME` | Display name for the super admin |

## Super-admin console

Visit `/admin` while signed in as super-admin. Modules:

- **Overview** — at-a-glance integration readiness
- **SMTP** — host/port/user/password + Send test email
- **AI** — provider (openai/anthropic), API key, default model
- **Payments** — active provider toggle (free/stripe/ziina) + credentials
- **Plans** — CRUD pricing plans (price, features, doc/team limits, Stripe price ID)
- **Users** — role + plan management, delete
- **Branding** — company name, support email

All secrets are AES-256-GCM encrypted at rest; API responses mask the value
with `••••1234` so forms never round-trip the plaintext.

## Document flow

1. Create a doc from a **template** (`/templates` — 50+ prebuilt) or from blank
2. Edit in Tiptap; autosaves every 2 s to Postgres
3. Click **Share** — add recipients, send link, email delivered via SMTP
4. Recipient opens `/sign/{token}`, draws signature, submits
5. When all recipients sign, document status flips to `COMPLETED`

## Security posture

- Passwords hashed with bcryptjs (12 rounds)
- Settings encrypted (AES-256-GCM) via `APP_ENCRYPTION_KEY`
- HTML sanitized server-side with DOMPurify before rendering `/sign` content
- Stripe webhook signature verified via official SDK
- Ziina webhook HMAC-SHA256 verified
- Rate limiting on `/api/auth/register` (5/hr/IP) and `/api/share/[token]` POST (10/min/IP)
- Security headers: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- Role-gated middleware on `/admin/*` (super-admin only)
- Signature submissions validated for data URL shape and size (≤ ~2 MB)
- Audit log (IP + user-agent) on sensitive actions

## Docker

```bash
docker compose up -d
```

Spins up postgres:16 and the app container on port 3219.

## Scripts

- `npm run dev` — dev server on :3219
- `npm run build` — Prisma generate + Next build
- `npm run start` — production server on :3219
- `npm run db:push` — sync schema to DB
- `npm run db:studio` — Prisma Studio
- `npm run db:seed` — seed plans + 50+ templates

## Project layout

```
prisma/schema.prisma         # DB schema
prisma/seed.ts               # Plans + templates
src/app/                     # App Router pages + API routes
src/app/admin/*              # Super-admin console
src/app/api/admin/*          # Admin APIs
src/app/api/documents/*      # Document CRUD + share
src/app/api/share/[token]    # Public sign endpoint
src/app/api/webhooks/*       # Stripe + Ziina webhooks
src/lib/db.ts                # Prisma client
src/lib/auth.ts              # NextAuth config + role guards
src/lib/crypto.ts            # AES-256-GCM helpers
src/lib/settings.ts          # Encrypted settings store
src/lib/mailer.ts            # Nodemailer from DB settings
src/lib/payments.ts          # Stripe + Ziina providers
src/lib/sanitize.ts          # DOMPurify wrapper
src/lib/rate-limit.ts        # In-memory rate limiter
src/lib/audit.ts             # AuditLog writer
```

See `progress.md` for a detailed changelog of the SaaS-grade upgrade work.
