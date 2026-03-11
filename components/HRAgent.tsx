"use client";
import { useState, useRef, useEffect } from "react";
import { HR_TEAMS, STATUS_FLOW, generateTicketId } from "@/lib/hrConfig";
import type { Ticket, EmailEntry } from "@/lib/hrConfig";
import ChatPanel from "./ChatPanel";
import TicketPanel from "./TicketPanel";
import EmailLog from "./EmailLog";
import EmailToast from "./EmailToast";

export interface Message {
  role: "user" | "assistant";
  content: string;
  ticket?: Ticket;
  timestamp: Date;
}

export default function HRAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! 👋 I'm your **HR Operations Assistant**.\n\nI can help with leave, payroll, policies, benefits, and more. When your query needs action, I'll create a ticket and **automatically notify the right HR team**.\n\nWhat can I help you with today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [emailLog, setEmailLog] = useState<EmailEntry[]>([]);
  const [activeTab, setActiveTab] = useState<"chat" | "tickets" | "email">("chat");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [toast, setToast] = useState<EmailEntry | null>(null);
  const convRef = useRef<{ role: string; content: string }[]>([]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");

    const newMsg: Message = { role: "user", content: userMsg, timestamp: new Date() };
    setMessages((p) => [...p, newMsg]);
    convRef.current = [...convRef.current, { role: "user", content: userMsg }];
    setLoading(true);

    try {
      // 1. Get AI response
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: convRef.current }),
      });
      const data = await res.json();
      const fullText: string = data.content || "Sorry, I couldn't process that. Please try again.";

      // 2. Parse ticket
      let cleanText = fullText;
      let ticketData: Ticket | undefined;

      const match = fullText.match(/<TICKET>([\s\S]*?)<\/TICKET>/);
      if (match) {
        try {
          const parsed = JSON.parse(match[1].trim());
          if (parsed.shouldCreate) {
            const cat = HR_TEAMS[parsed.category] || HR_TEAMS.general;
            const id = generateTicketId();
            ticketData = {
              id,
              category: parsed.category,
              priority: parsed.priority,
              title: parsed.title,
              summary: parsed.summary,
              suggestedActions: parsed.suggestedActions || [],
              categoryMeta: cat,
              status: "Open",
              statusIndex: 0,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            setTickets((p) => [ticketData!, ...p]);

            // 3. Send routing email
            const emailRes = await fetch("/api/tickets", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ticket: ticketData }),
            });
            const emailData = await emailRes.json();

            const entry: EmailEntry = {
              id,
              title: parsed.title,
              category: parsed.category,
              priority: parsed.priority,
              sentAt: new Date(),
              to: cat.email,
              contact: cat.contact,
              team: cat.team,
              mock: emailData.mock ?? true,
            };
            setEmailLog((p) => [entry, ...p]);
            setToast(entry);
          }
          cleanText = fullText.replace(/<TICKET>[\s\S]*?<\/TICKET>/, "").trim();
        } catch {
          cleanText = fullText.replace(/<TICKET>[\s\S]*?<\/TICKET>/, "").trim();
        }
      }

      convRef.current = [...convRef.current, { role: "assistant", content: fullText }];
      setMessages((p) => [...p, { role: "assistant", content: cleanText, ticket: ticketData, timestamp: new Date() }]);
    } catch {
      setMessages((p) => [...p, { role: "assistant", content: "⚠️ Something went wrong. Please try again.", timestamp: new Date() }]);
    } finally {
      setLoading(false);
    }
  }

  function updateStatus(ticketId: string, si: number) {
    setTickets((p) =>
      p.map((t) =>
        t.id === ticketId ? { ...t, statusIndex: si, status: STATUS_FLOW[si], updatedAt: new Date() } : t
      )
    );
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket((p) => p ? { ...p, statusIndex: si, status: STATUS_FLOW[si], updatedAt: new Date() } : p);
    }
  }

  const tabs = [
    { id: "chat" as const, label: "Chat", icon: "💬" },
    { id: "tickets" as const, label: `Tickets${tickets.length ? ` (${tickets.length})` : ""}`, icon: "🎫" },
    { id: "email" as const, label: `Email Log${emailLog.length ? ` (${emailLog.length})` : ""}`, icon: "📧" },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: "#0a0a10", height: "100vh", color: "#e2e8f0", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: "#0f0f1a", borderBottom: "1px solid #1e293b", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🤖</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-0.3px" }}>HR Operations Agent</div>
            <div style={{ fontSize: 11, color: "#22c55e", display: "flex", alignItems: "center", gap: 5 }}>
              <div className="dot-pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
              Smart Ticket & Routing Assistant
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: "7px 14px", borderRadius: 8, border: "1px solid",
              borderColor: activeTab === t.id ? "#6366f1" : "#1e293b",
              background: activeTab === t.id ? "rgba(99,102,241,.18)" : "transparent",
              color: activeTab === t.id ? "#a5b4fc" : "#64748b",
              fontSize: 12, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 5,
              transition: "all .2s"
            }}>{t.icon} {t.label}</button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>
        {activeTab === "chat" && (
          <ChatPanel
            messages={messages}
            loading={loading}
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
            onViewTicket={(ticket) => { setSelectedTicket(ticket); setActiveTab("tickets"); }}
          />
        )}
        {activeTab === "tickets" && (
          <TicketPanel
            tickets={tickets}
            selectedTicket={selectedTicket}
            setSelectedTicket={setSelectedTicket}
            updateStatus={updateStatus}
            onGoToChat={() => setActiveTab("chat")}
          />
        )}
        {activeTab === "email" && (
          <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
            <EmailLog emails={emailLog} />
          </div>
        )}
      </div>

      {toast && <EmailToast entry={toast} onDismiss={() => setToast(null)} />}
    </div>
  );
}
