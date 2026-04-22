<div align="center">

<img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/NextAuth.js-4-purple?style=for-the-badge" />
<img src="https://img.shields.io/badge/Docker-ready-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
<img src="https://img.shields.io/badge/Vercel-ready-black?style=for-the-badge&logo=vercel&logoColor=white" />

<br /><br />

# 🖊 DocFlow Pro

### The all-in-one document automation platform — create, send, track & e-sign documents.

*Production-ready · NextAuth super admin · Vercel & Docker deploy · Zero demo data*

<br />

[🚀 Quick Start](#-quick-start) · [🔐 Super Admin](#-super-admin) · [☁️ Deploy to Vercel](#️-deploy-to-vercel) · [🐳 Deploy with Docker](#-deploy-with-docker) · [✨ Features](#-features)

<br />

---

</div>

## 🚀 Quick Start

### Prerequisites
- Node.js **18+**
- npm or yarn

```bash
# 1. Clone the repo
git clone https://github.com/connectfazla/docflow.git
cd docflow

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials (see Super Admin section)

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll see the landing page.  
Sign in at [http://localhost:3000/login](http://localhost:3000/login) with your admin credentials.

---

## 🔐 Super Admin

All admin credentials are configured via **environment variables** — no hardcoded passwords, no database needed.

### Required `.env.local`

```env
# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET=your-super-secret-key-here

NEXTAUTH_URL=http://localhost:3000    # Change to your domain in production

ADMIN_EMAIL=admin@docflow.pro         # Admin login email
ADMIN_NAME=Super Admin                # Admin display name
ADMIN_PASSWORD=Admin@DocFlow2024!     # Admin password (dev)
```

### Secure Password Hash (Production recommended)

For production, use a bcrypt hash instead of a plain password:

```bash
# Generate a hash
node -e "const b=require('bcryptjs'); b.hash('YourStrongPassword!',12).then(console.log)"

# Add to .env.local
ADMIN_PASSWORD_HASH=$2a$12$...your-hash-here...
# Remove ADMIN_PASSWORD when using hash
```

### Default Dev Credentials
| Field | Value |
|-------|-------|
| Email | `admin@docflow.pro` |
| Password | `Admin@DocFlow2024!` |

> ⚠️ **Change these immediately in any production deployment.**

---

## ☁️ Deploy to Vercel

The easiest deployment option — one click and you're live.

### Option A: Vercel CLI

```bash
npm install -g vercel
vercel --prod
```

### Option B: Vercel Dashboard

1. Push this repo to GitHub *(already done)*
2. Go to [vercel.com/new](https://vercel.com/new) → Import from GitHub
3. Select `connectfazla/docflow`
4. Add environment variables in the Vercel dashboard:

| Variable | Value |
|----------|-------|
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` output |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` |
| `ADMIN_EMAIL` | your admin email |
| `ADMIN_NAME` | your name |
| `ADMIN_PASSWORD` | strong password (or use `ADMIN_PASSWORD_HASH`) |

5. Click **Deploy** ✓

---

## 🐳 Deploy with Docker

### Quick start

```bash
# Copy and configure env
cp .env.example .env.local
nano .env.local   # Set your credentials

# Build and run
docker-compose up -d

# App is live at http://localhost:3000
```

### Manual Docker build

```bash
# Build the image
docker build -t docflow-pro .

# Run with env vars
docker run -d \
  -p 3000:3000 \
  -e NEXTAUTH_SECRET="your-secret" \
  -e NEXTAUTH_URL="http://localhost:3000" \
  -e ADMIN_EMAIL="admin@docflow.pro" \
  -e ADMIN_PASSWORD="Admin@DocFlow2024!" \
  --name docflow \
  docflow-pro
```

### With Nginx reverse proxy

Uncomment the nginx service in `docker-compose.yml` and add your SSL certs.

---

## ✨ Features

### 🏠 Landing Page
- Modern marketing page with hero, features, pricing, testimonials
- Animated gradients and responsive layout
- Built-in CTAs linking to the login / sign-up flow
- "Created by Fazla Rabbi" in the footer

### 🔐 Authentication
- **NextAuth.js** JWT authentication — session-based, no database required
- **Super admin** account seeded from environment variables
- Bcrypt password hashing support for production
- Protected routes via Next.js middleware
- Sign out from the sidebar

### 📄 Document Management
- Rich-text editor (Tiptap v3) — bold, italic, tables, colors, links
- List & grid views with search and status filters
- One-click duplicate → opens straight in editor
- Delete with confirmation modal
- Document detail with recipients, signing progress, audit trail

### ✍️ E-Signature Workflow
- Send via email with recipient roles (Signer / Viewer / Approver)
- Shareable link with optional expiry and password
- Public signing page — no login required for recipients
  - **Draw** on canvas
  - **Type** in 4 font styles
  - **Upload** signature image
- ESIGN / eIDAS compliant with legal agreement checkbox

### 📊 Dashboard & Analytics
- Live stats pulled from Zustand store
- Area chart (document activity), donut chart (pipeline status)
- Activity feed, "needs attention" banner

### ⚙️ Settings
6 complete tabs: Profile · Workspace · Branding · Notifications · Security · Billing

### 👥 Team Management
- Member table with roles, status, docs sent
- Role permissions matrix (Owner · Admin · Manager · Member · Viewer)
- Invite modal with live permissions preview

### 🔗 Integrations
9 integrations: HubSpot, Stripe, Slack, Salesforce, Zapier, Google Drive, Pipedrive, Teams, QuickBooks

---

## 🗂 Project Structure

```
docflow/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx         # NextAuth login
│   │   │   └── register/page.tsx      # 2-step registration
│   │   ├── api/auth/[...nextauth]/    # NextAuth API route
│   │   ├── page.tsx                   # Landing page
│   │   ├── dashboard/page.tsx
│   │   ├── documents/
│   │   ├── editor/[id]/page.tsx
│   │   ├── sign/[token]/page.tsx      # Public signing (no auth)
│   │   ├── analytics/page.tsx
│   │   ├── templates/page.tsx
│   │   ├── team/page.tsx
│   │   ├── integrations/page.tsx
│   │   └── settings/page.tsx
│   │
│   ├── components/
│   │   ├── providers.tsx              # SessionProvider wrapper
│   │   ├── layout/sidebar.tsx         # Sidebar + sign out
│   │   ├── dialogs/send-dialog.tsx
│   │   └── ui/                        # button, card, modal, toast, input
│   │
│   ├── lib/
│   │   ├── auth.ts                    # NextAuth options + super admin
│   │   └── mock-data.ts               # Chart seed data only
│   ├── middleware.ts                   # Route protection
│   └── store/index.ts                 # Zustand (starts empty)
│
├── .env.example                       # Template for env vars
├── Dockerfile                         # Multi-stage production build
├── docker-compose.yml
├── vercel.json
└── next.config.js                     # Standalone output for Docker
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 3 |
| Auth | NextAuth.js 4 (JWT + Credentials) |
| Editor | Tiptap v3 |
| State | Zustand 5 (persisted) |
| Charts | Recharts 3 |
| Icons | Lucide React |
| Crypto | bcryptjs |

---

## 🗺 Roadmap

- [ ] PostgreSQL + Prisma (replace localStorage)
- [ ] Multi-user support (invite-based registration)
- [ ] Real email delivery (Resend / SendGrid)
- [ ] PDF export (react-pdf)
- [ ] Stripe billing integration
- [ ] Real-time notifications (WebSockets)
- [ ] OAuth providers (Google, GitHub)
- [ ] Mobile app (React Native)

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

<div align="center">

**Created by [Fazla Rabbi](https://github.com/connectfazla)**

*Built with ❤️ using Next.js, TypeScript, Tailwind CSS & NextAuth.js*

⭐ **Star this repo if you find it useful!**

</div>
