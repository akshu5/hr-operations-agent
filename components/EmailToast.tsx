"use client";
import { useState, useEffect } from "react";
import type { EmailEntry } from "@/lib/hrConfig";
import { HR_TEAMS } from "@/lib/hrConfig";

export default function EmailToast({ entry, onDismiss }: { entry: EmailEntry; onDismiss: () => void }) {
  const [visible, setVisible] = useState(false);
  const cat = HR_TEAMS[entry.category] || HR_TEAMS.general;

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
    const t = setTimeout(() => { setVisible(false); setTimeout(onDismiss, 400); }, 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, width: 340, zIndex: 1000,
      transform: visible ? "translateY(0)" : "translateY(120px)",
      opacity: visible ? 1 : 0,
      transition: "all .4s cubic-bezier(.175,.885,.32,1.275)",
    }}>
      <div style={{ background: "#1a1a2e", border: `1px solid ${cat.color}40`, borderLeft: `4px solid ${cat.color}`, borderRadius: 14, padding: "14px 16px", boxShadow: "0 20px 60px rgba(0,0,0,.6)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: `${cat.color}20`, color: cat.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>📧</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#e2e8f0" }}>{entry.mock ? "Email Logged (Mock)" : "Email Sent ✓"}</div>
              <div style={{ fontSize: 10, color: "#475569" }}>Routing notification</div>
            </div>
          </div>
          <button onClick={() => { setVisible(false); setTimeout(onDismiss, 400); }} style={{ background: "transparent", border: "none", color: "#475569", cursor: "pointer", fontSize: 18, lineHeight: 1, padding: 0 }}>×</button>
        </div>

        <div style={{ background: "#0f0f1a", borderRadius: 10, padding: "10px 12px", border: "1px solid #1e293b" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "center" }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: `${cat.color}25`, color: cat.color, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{cat.avatar}</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#cbd5e1" }}>{cat.contact}</div>
              <div style={{ fontSize: 10, color: "#475569" }}>{cat.email}</div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: "#64748b", borderTop: "1px solid #1e293b", paddingTop: 6, marginTop: 4 }}>
            <span style={{ color: "#94a3b8", fontWeight: 500 }}>Subject: </span>
            <span>[{entry.id}] {entry.title}</span>
          </div>
          <div style={{ marginTop: 4, fontSize: 10, color: "#475569" }}>
            Priority: <span style={{ color: entry.priority === "Urgent" ? "#ef4444" : entry.priority === "High" ? "#f59e0b" : "#22c55e", fontWeight: 600 }}>{entry.priority}</span>
            &nbsp;·&nbsp;Team: <span style={{ color: cat.color }}>{cat.team}</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
          <div style={{ flex: 1, height: 3, borderRadius: 2, background: `${cat.color}30`, overflow: "hidden" }}>
            <div style={{ height: "100%", background: cat.color, borderRadius: 2, animation: "progress 6s linear forwards" }} />
          </div>
          <span style={{ fontSize: 9, color: "#334155" }}>auto-dismiss</span>
        </div>
      </div>
    </div>
  );
}
