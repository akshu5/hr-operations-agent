"use client";
import { useRef, useEffect } from "react";
import type { Message } from "./HRAgent";
import type { Ticket } from "@/lib/hrConfig";

interface Props {
  messages: Message[];
  loading: boolean;
  input: string;
  setInput: (v: string) => void;
  sendMessage: () => void;
  onViewTicket: (t: Ticket) => void;
}

function md(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");
}

function fmtTime(d: Date) {
  return new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const QUICK = [
  "Apply for 3 days annual leave",
  "My salary was wrong this month",
  "What is the WFH policy?",
  "I want to raise a grievance",
];

export default function ChatPanel({ messages, loading, input, setInput, sendMessage, onViewTicket }: Props) {
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        {messages.map((msg, i) => (
          <div key={i} className="msg-fade" style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", gap: 10, alignItems: "flex-start" }}>
            {msg.role === "assistant" && (
              <div style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🤖</div>
            )}
            <div style={{ maxWidth: "70%", display: "flex", flexDirection: "column", gap: 8 }}>
              <div
                style={{
                  padding: "11px 15px",
                  background: msg.role === "user" ? "linear-gradient(135deg,#6366f1,#4f46e5)" : "#16161f",
                  borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  border: msg.role === "assistant" ? "1px solid #1e293b" : "none",
                  fontSize: 13.5, lineHeight: 1.65, color: msg.role === "user" ? "#fff" : "#cbd5e1",
                }}
                dangerouslySetInnerHTML={{ __html: md(msg.content) }}
              />

              {/* Ticket chip */}
              {msg.ticket && (
                <div className="slide-up" style={{
                  background: "#12121e", border: `1px solid ${msg.ticket.categoryMeta.color}35`,
                  borderLeft: `3px solid ${msg.ticket.categoryMeta.color}`, borderRadius: 12, padding: "11px 14px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 15 }}>{msg.ticket.categoryMeta.icon}</span>
                    <span style={{ fontWeight: 600, fontSize: 12, color: "#e2e8f0" }}>Ticket Created & Routed</span>
                    <span style={{
                      marginLeft: "auto", background: `${msg.ticket.categoryMeta.color}20`,
                      color: msg.ticket.categoryMeta.color, padding: "2px 8px",
                      borderRadius: 6, fontSize: 10, fontWeight: 700, fontFamily: "monospace",
                    }}>{msg.ticket.id}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#cbd5e1", fontWeight: 500, marginBottom: 8 }}>{msg.ticket.title}</div>
                  {/* Email row */}
                  <div style={{ background: "#0a0a14", border: "1px solid #1e293b", borderRadius: 8, padding: "8px 10px", display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 7, background: `${msg.ticket.categoryMeta.color}20`, color: msg.ticket.categoryMeta.color, fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {msg.ticket.categoryMeta.avatar}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: "#94a3b8" }}>{msg.ticket.categoryMeta.contact}</div>
                      <div style={{ fontSize: 9, color: "#475569", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{msg.ticket.categoryMeta.email}</div>
                    </div>
                    <div style={{ fontSize: 9, fontWeight: 600, padding: "2px 7px", borderRadius: 5, background: "#22c55e15", color: "#22c55e", border: "1px solid #22c55e30", flexShrink: 0 }}>✓ Sent</div>
                  </div>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    <span style={{ background: "#0f0f1a", color: "#64748b", padding: "3px 8px", borderRadius: 6, fontSize: 10, border: "1px solid #1e293b" }}>📍 {msg.ticket.categoryMeta.team}</span>
                    <span style={{ padding: "3px 8px", borderRadius: 6, fontSize: 10, border: "1px solid #1e293b", background: msg.ticket.priority === "Urgent" ? "#ef444415" : "#0f0f1a", color: msg.ticket.priority === "Urgent" ? "#ef4444" : "#64748b" }}>⚡ {msg.ticket.priority}</span>
                    <button onClick={() => onViewTicket(msg.ticket!)} style={{ background: `${msg.ticket.categoryMeta.color}15`, color: msg.ticket.categoryMeta.color, padding: "3px 9px", borderRadius: 6, fontSize: 10, border: `1px solid ${msg.ticket.categoryMeta.color}35`, cursor: "pointer" }}>View →</button>
                  </div>
                </div>
              )}
              <div style={{ fontSize: 10, color: "#334155", textAlign: msg.role === "user" ? "right" : "left" }}>{fmtTime(msg.timestamp)}</div>
            </div>
            {msg.role === "user" && (
              <div style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0, background: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>👤</div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🤖</div>
            <div style={{ background: "#16161f", border: "1px solid #1e293b", borderRadius: "18px 18px 18px 4px", padding: "13px 16px", display: "flex", gap: 5 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#6366f1", animation: "bounce 1.2s infinite", animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick prompts */}
      {messages.length <= 1 && (
        <div style={{ padding: "0 24px 10px", display: "flex", gap: 7, flexWrap: "wrap" }}>
          {QUICK.map((p, i) => (
            <button key={i} onClick={() => setInput(p)} style={{ background: "rgba(99,102,241,.08)", border: "1px solid #1e293b", color: "#94a3b8", padding: "6px 13px", borderRadius: 20, fontSize: 12, cursor: "pointer", transition: "all .2s" }}>{p}</button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ padding: "10px 24px 18px", borderTop: "1px solid #0f0f1a", background: "#0a0a10" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-end", background: "#16161f", border: "1px solid #1e293b", borderRadius: 14, padding: "10px 14px" }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Ask about leave, payroll, policies, benefits..."
            rows={1}
            style={{ flex: 1, background: "transparent", border: "none", resize: "none", color: "#e2e8f0", fontSize: 13.5, lineHeight: 1.5, fontFamily: "'DM Sans',sans-serif", maxHeight: 100, outline: "none" }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            style={{ width: 34, height: 34, borderRadius: 9, border: "none", background: loading || !input.trim() ? "#1e293b" : "#6366f1", color: "#fff", fontSize: 15, cursor: loading || !input.trim() ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background .2s" }}
          >↑</button>
        </div>
        <div style={{ fontSize: 10, color: "#1e293b", textAlign: "center", marginTop: 7 }}>Enter to send · Shift+Enter for new line</div>
      </div>
    </div>
  );
}
