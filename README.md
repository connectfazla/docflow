<div align="center">

<img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Zustand-5-orange?style=for-the-badge" />
<img src="https://img.shields.io/badge/Tiptap-3-6366F1?style=for-the-badge" />

<br /><br />

<img width="80" src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/pen-tool.svg" />

# DocFlow Pro

### The modern document automation platform — create, send, track & sign documents in minutes.

*A full-featured PandaDoc-inspired SaaS built with Next.js 14, TypeScript & Tailwind CSS.*

<br />

[✨ Features](#-features) · [🚀 Quick Start](#-quick-start) · [🗂 Project Structure](#-project-structure) · [🛠 Tech Stack](#-tech-stack) · [📸 Screenshots](#-screenshots)

<br />

---

</div>

## ✨ Features

### 📄 Document Management
- **Rich-text editor** powered by Tiptap v3 — bold, italic, tables, alignment, colors, highlights, links
- **List & Grid views** with search, status filters, bulk select, and sort
- **One-click duplicate** — copies a document and drops you straight into the editor
- **Delete with confirmation** modal to prevent accidents
- **Document detail page** — signing progress bar, recipients list, and full audit trail

### ✍️ E-Signature Workflow
- **Send via Email** — add multiple recipients with roles (Signer / Viewer / Approver)
- **Copy shareable link** — auto-generated signing URL with optional expiry and password
- **Recipient signing page** — fully standalone (no login required)
  - **Draw** your signature on a canvas
  - **Type** your name in 4 different font styles
  - **Upload** an image of your signature
- **ESIGN / eIDAS compliant** — legal agreement checkbox, audit ID, compliance messaging

### 📊 Dashboard & Analytics
- Live stats — total docs, awaiting signature, completed, completion rate
- **Area chart** — document activity over time (sent / signed / completed)
- **Donut chart** — real-time pipeline status breakdown
- Activity feed and "Needs Attention" banner
- Stats driven by live Zustand store, update instantly on any action

### ⚙️ Settings (6 tabs)
| Tab | What's inside |
|-----|--------------|
| **Profile** | Name, email, bio, phone, timezone, avatar, signature style |
| **Workspace** | Name, URL slug, company size, default toggles, danger zone |
| **Branding** | Logo upload, brand colors, email preview, white-label toggle |
| **Notifications** | Per-event toggles — viewed, signed, expiring, digest, SMS |
| **Security** | Change password, 2FA toggle, active sessions with revoke |
| **Billing** | Current plan, usage bars, payment method, invoice history |

### 👥 Team Management
- Member table — avatar, role badge, docs sent, last active, status
- Role system: **Owner · Admin · Manager · Member · Viewer**
- Permissions matrix with per-role capability cards
- Invite modal with role selector and live permissions preview

### 🔗 Integrations
9 built-in integrations across 5 categories:

| Category | Integrations |
|----------|-------------|
| CRM | HubSpot, Salesforce, Pipedrive |
| Payments | Stripe |
| Automation | Zapier |
| Notifications | Slack, Microsoft Teams |
| Storage | Google Drive |
| Finance | QuickBooks |

Connect / disconnect with loading states, configure modal for connected tools, REST API key card.

### 🎨 UI / UX
- Toast notification system (success · error · warning · info) — auto-dismiss after 4s
- Accessible modal system with Escape-to-close and backdrop click
- Sidebar live search with instant document results
- Animated page transitions, skeleton states, hover effects
- Fully responsive layout

---

## 🚀 Quick Start

### Prerequisites
- Node.js **18+**
- npm or yarn

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/connectfazla/docflow.git
cd docflow

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you're in. No environment variables needed to run locally.

### Other commands

```bash
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🗂 Project Structure

```
docflow/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx        # Login page
│   │   │   └── register/page.tsx     # 2-step registration + plan picker
│   │   ├── dashboard/page.tsx        # Live stats, charts, activity
│   │   ├── documents/
│   │   │   ├── page.tsx              # List/grid with CRUD actions
│   │   │   └── [id]/page.tsx         # Document detail + audit trail
│   │   ├── editor/[id]/page.tsx      # Tiptap rich-text editor
│   │   ├── sign/[token]/page.tsx     # Public signing page (no auth)
│   │   ├── analytics/page.tsx        # Charts, metrics, conversion
│   │   ├── templates/page.tsx        # Template library
│   │   ├── team/page.tsx             # Member management
│   │   ├── integrations/page.tsx     # 9 integrations
│   │   ├── settings/page.tsx         # 6-tab settings panel
│   │   └── layout.tsx                # Root layout + toast container
│   │
│   ├── components/
│   │   ├── layout/sidebar.tsx        # Sidebar + AppLayout + live search
│   │   ├── dialogs/send-dialog.tsx   # Email + link share dialog
│   │   ├── editor/toolbar.tsx        # Tiptap editor toolbar
│   │   └── ui/
│   │       ├── button.tsx            # Button with variants + loading
│   │       ├── card.tsx              # Card + StatCard
│   │       ├── badge.tsx             # StatusBadge
│   │       ├── input.tsx             # Input, Textarea, Select
│   │       ├── modal.tsx             # Modal, ModalBody, ModalFooter
│   │       └── toast.tsx             # ToastContainer
│   │
│   ├── store/index.ts                # Zustand store (persisted)
│   ├── lib/
│   │   ├── mock-data.ts              # Seed documents, templates, activity
│   │   └── utils.ts                  # cn(), formatRelative(), getInitials()
│   └── types/index.ts                # Shared TypeScript types
│
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 14](https://nextjs.org) — App Router, file-based routing |
| **Language** | [TypeScript 5](https://www.typescriptlang.org) — strict mode |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com) — utility-first |
| **Editor** | [Tiptap v3](https://tiptap.dev) — headless rich-text |
| **State** | [Zustand 5](https://zustand-demo.pmnd.rs) with `persist` middleware |
| **Charts** | [Recharts 3](https://recharts.org) — AreaChart, BarChart, PieChart |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Fonts** | Inter (Google Fonts) |

---

## 📸 Screenshots

| Dashboard | Documents | Editor |
|-----------|-----------|--------|
| Live stats, charts, activity feed | List & grid with search + filters | Tiptap editor with toolbar |

| Sign Page | Settings | Team |
|-----------|----------|------|
| Draw / type / upload signature | 6-tab settings panel | Role management + invite |

---

## 🗺 Roadmap

- [ ] Real authentication (NextAuth.js or Clerk)
- [ ] Database integration (PostgreSQL + Prisma)
- [ ] PDF export with react-pdf
- [ ] Real-time collaboration (WebSockets)
- [ ] Email delivery (Resend / SendGrid)
- [ ] Stripe billing integration
- [ ] Mobile app (React Native)

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

<div align="center">

**Created by [Fazla Rabbi](https://github.com/connectfazla)**

*Built with ❤️ using Next.js, TypeScript & Tailwind CSS*

<br />

⭐ **Star this repo if you find it useful!**

</div>
