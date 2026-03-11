"use client";
import type { EmailEntry } from "@/lib/hrConfig";
import { HR_TEAMS } from "@/lib/hrConfig";

const fmtDate = (d: Date) => new Date(d).toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

export default function EmailLog({ emails }: { emails: EmailEntry[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>
        Email Routing Log ({emails.length})
      </div>
      {emails.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#334155", fontSize: 13, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 38 }}>📭</div>
          No emails sent yet.<br />Create a ticket to trigger routing.
        </div>
      ) : emails.map((e, i) => {
        const cat = HR_TEAMS[e.category] || HR_TEAMS.general;
        return (
          <div key={i} style={{ background: "#141420", border: "1px solid #1e293b", borderLeft: `3px solid ${cat.color}`, borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontFamily: "monospace", fontSize: 10, color: cat.color, fontWeight: 600 }}>{e.id}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {e.mock && <span style={{ fontSize: 9, color: "#475569", background: "#1e293b", padding: "1px 6px", borderRadius: 4 }}>Mock</span>}
                <span style={{ fontSize: 10, color: "#334155" }}>{fmtDate(e.sentAt)}</span>
              </div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#e2e8f0", marginBottom: 8 }}>{e.title}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#0f0f1a", border: "1px solid #1e293b", borderRadius: 8, padding: "4px 10px" }}>
                <div style={{ width: 20, height: 20, borderRadius: 5, background: `${cat.color}20`, color: cat.color, fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{cat.avatar}</div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: "#94a3b8" }}>{e.contact}</div>
                  <div style={{ fontSize: 9, color: "#475569" }}>{e.to}</div>
                </div>
              </div>
              <span style={{ padding: "4px 10px", borderRadius: 8, fontSize: 10, fontWeight: 600, background: e.priority === "Urgent" ? "#ef444420" : e.priority === "High" ? "#f59e0b20" : "#22c55e20", color: e.priority === "Urgent" ? "#ef4444" : e.priority === "High" ? "#f59e0b" : "#22c55e", border: "1px solid #1e293b", display: "flex", alignItems: "center" }}>⚡ {e.priority}</span>
              <span style={{ padding: "4px 10px", borderRadius: 8, fontSize: 10, background: `${cat.color}15`, color: cat.color, border: `1px solid ${cat.color}30`, display: "flex", alignItems: "center" }}>{cat.icon} {cat.team}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
