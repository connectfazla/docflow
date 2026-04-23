# DocFlow Pro — Progress Log

Tracks the SaaS-grade upgrade of DocFlow Pro. Newest entries on top.

## 2026-04-23 — SaaS upgrade milestone

### Platform

- Migrated all user + document persistence from in-memory / Zustand-persist to
  **PostgreSQL 16 + Prisma 5**.
- Added `prisma/schema.prisma` with User, Document, Recipient, Template,
  ActivityItem, AuditLog, AppSetting, Plan, Subscription.
- Dev + production port standardised to **3219** (package scripts, `.env.local`,
  docker-compose, VS Code launch.json).
- Standalone Next.js output for cleaner Docker image.

### Auth & users

- NextAuth v4 Credentials provider backed by Postgres.
- `ensureSuperAdmin()` upserts the env-configured super admin on every boot.
- Added `src/types/next-auth.d.ts` to extend Session/JWT with `id` + `role`.
- Middleware gates `/admin/*` to super-admin; redirects otherwise.
- bcryptjs 12-round password hashing.

### Super-admin console

New module at `/admin` with screens for:

- Overview with integration readiness
- SMTP (with "Send test email" button)
- AI (OpenAI / Anthropic provider, API key, default model)
- Payments (Free / Stripe / Ziina provider toggle + credential forms)
- Plans (full CRUD — price, features, limits, `stripePriceId`, popular flag)
- Users (role + plan management, delete)
- Branding (company name, support email)

Backed by `/api/admin/*` endpoints. Secrets AES-256-GCM encrypted at rest via
`APP_ENCRYPTION_KEY`; API responses mask them as `••••1234` so the UI never
round-trips plaintext.

### Documents

- `/api/documents` GET/POST, `/api/documents/[id]` GET/PATCH/DELETE.
- `/api/documents/[id]/share` generates a `shareToken`, stores recipients,
  emails each one, flips status to `SENT`.
- `/api/templates` + `/api/templates/[id]/use` clones template into a doc.
- `/api/share/[token]` public GET (sanitized) + POST for signatures; auto
  completes doc when all recipients have signed.
- Editor autosaves every 2 s, AI dialog wired to `/api/ai/generate`.

### Templates

- Seeded **54** business/marketing templates across Legal, Sales,
  Marketing Agency, HR, Real Estate, Tech, Finance — NDAs, retainers, SOWs,
  SEO/PPC/influencer contracts, employment letters, leases, DPAs, etc.

### Payments

- Provider abstraction in `src/lib/payments.ts` — free by default, configurable
  to Stripe or Ziina from the admin console.
- Stripe SDK + checkout session endpoint.
- Ziina REST checkout (AED/fils, Bearer auth).
- `/api/webhooks/stripe` — official SDK signature verification.
- `/api/webhooks/ziina` — HMAC-SHA256 signature verification.

### AI

- `/api/ai/generate` supports OpenAI and Anthropic; provider, model and API
  key are editable from `/admin/ai`.

### Email

- Nodemailer transport built from DB settings with a dev console fallback
  when SMTP is unconfigured.

### Design

- Installed Apple design reference via `npx getdesign@latest add apple` →
  `DESIGN.md`. Editor + sign page restyled with glassy headers, Apple-flavored
  buttons/forms, `#f5f5f7` background.

### Security hardening

- DOMPurify sanitization on server for public `/sign` content.
- Rate limiting (`src/lib/rate-limit.ts`) on `/api/auth/register`
  (5/hr/IP) and `/api/share/[token]` POST (10/min/IP).
- Security headers: HSTS, X-Frame-Options, X-Content-Type-Options,
  Referrer-Policy, Permissions-Policy, X-XSS-Protection.
- Signature payload validation (data URL shape + ≤ 2 MB cap).
- Audit log (IP + user-agent) on sensitive actions (`src/lib/audit.ts`).
- Replaced deprecated `export const config` with
  `export const runtime = 'nodejs'; export const dynamic = 'force-dynamic'`
  on webhook routes.

### Tooling

- `postinstall: prisma generate` so Vercel / CI builds never miss the client.
- `db:push`, `db:studio`, `db:seed` scripts.
- Docker compose with postgres:16-alpine + app service on 3219.

## Future ideas

- Swap in-memory rate-limiter for Upstash Redis for multi-instance deploys.
- Add zod validation across all API bodies.
- Content Security Policy (once an asset inventory is nailed down).
- 2FA (TOTP) for admins.
- Email templates (MJML / react-email) for share invites.
- Bulk import recipients from CSV.
- Team workspaces + roles beyond USER/ADMIN/SUPERADMIN.
- Audit log viewer in admin console.
- Template marketplace with per-user analytics.
- Webhook delivery for completed documents (for Zapier / Make integrations).
