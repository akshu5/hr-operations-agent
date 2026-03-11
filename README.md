# 🤖 HR Operations Agent

A smart HR ticket assistant powered by Claude AI. Understands employee queries, creates structured tickets, and routes them to the correct HR team via email.

## Features

- 💬 **AI Chat** — Understands leave, payroll, policy, benefits, grievance queries
- 🎫 **Smart Tickets** — Auto-creates structured tickets when action is needed
- 📧 **Email Routing** — Notifies the correct HR team instantly
- 📊 **Ticket Tracker** — Track resolution status per ticket
- 🔁 **Mock Mode** — Works without Resend (logs emails to console)

---

## 🚀 Deploy to Vercel (5 minutes)

### Step 1 — Prerequisites
- Node.js 18+ installed
- A [Vercel account](https://vercel.com) (free)
- Your Anthropic API key from [console.anthropic.com](https://console.anthropic.com)

### Step 2 — Install dependencies
```bash
npm install
```

### Step 3 — Set up environment variables
```bash
cp .env.local.example .env.local
```
Open `.env.local` and add your Anthropic API key:
```
ANTHROPIC_API_KEY=sk-ant-...your-key-here...
```

### Step 4 — Test locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Step 5 — Deploy to Vercel
```bash
# Install Vercel CLI (one time)
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - What's your project name? hr-operations-agent
# - Which directory? ./  (press enter)
# - Override settings? No
```

### Step 6 — Add environment variables on Vercel
```bash
vercel env add ANTHROPIC_API_KEY
# Paste your key when prompted
# Select: Production, Preview, Development

vercel --prod
```

Your app is now live! Vercel gives you a URL like:
`https://hr-operations-agent.vercel.app`

---

## 📧 Enable Real Email Routing (Optional)

1. Sign up at [resend.com](https://resend.com) — free tier = 100 emails/day
2. Get your API key
3. Add to Vercel:
```bash
vercel env add RESEND_API_KEY
vercel env add FROM_EMAIL   # e.g. hr-agent@yourcompany.com
vercel --prod
```

That's it — emails will now go to real HR team inboxes!

---

## 🏗️ Project Structure

```
hr-agent/
├── app/
│   ├── page.tsx              ← Entry point
│   ├── layout.tsx            ← Root layout
│   ├── globals.css           ← Global styles
│   └── api/
│       ├── chat/route.ts     ← Claude AI endpoint
│       └── tickets/route.ts  ← Email routing endpoint
├── components/
│   ├── HRAgent.tsx           ← Main app shell
│   ├── ChatPanel.tsx         ← Chat UI
│   ├── TicketPanel.tsx       ← Ticket list + detail
│   ├── EmailLog.tsx          ← Email audit log
│   └── EmailToast.tsx        ← Toast notification
├── lib/
│   └── hrConfig.ts           ← HR teams, types, config
├── .env.local.example        ← Environment template
└── README.md
```

---

## 👥 Customize HR Teams

Edit `lib/hrConfig.ts` to add your real team members and email addresses:

```typescript
payroll: {
  contact: "Your Payroll Manager Name",
  email:   "payroll@yourcompany.com",
  team:    "Payroll Team",
  // ...
}
```

---

## Tech Stack

- **Next.js 14** — Framework
- **Claude Sonnet** — AI engine  
- **Resend** — Email delivery (optional)
- **Vercel** — Hosting
