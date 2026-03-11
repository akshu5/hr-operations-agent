"use client";
import type { Ticket } from "@/lib/hrConfig";
import { STATUS_FLOW } from "@/lib/hrConfig";

interface Props {
  tickets: Ticket[];
  selectedTicket: Ticket | null;
  setSelectedTicket: (t: Ticket | null) => void;
  updateStatus: (id: string, si: number) => void;
  onGoToChat: () => void;
}

const fmtDate = (d: Date) => new Date(d).toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

export default function TicketPanel({ tickets, selectedTicket, setSelectedTicket, updateStatus, onGoToChat }: Props) {
  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      {/* List */}
      <div style={{ width: selectedTicket ? 340 : "100%", borderRight: selectedTicket ? "1px solid #1e293b" : "none", overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>All Tickets ({tickets.length})</div>
        {tickets.length === 0 ? (
          <div style={{ textAlign: "center", color: "#334155", padding: "60px 20px", fontSize: 13, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 38 }}>🎫</div>
            No tickets yet.<br />Start a conversation to create one.
            <button onClick={onGoToChat} style={{ background: "rgba(99,102,241,.12)", color: "#a5b4fc", border: "1px solid #6366f130", padding: "7px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer", marginTop: 4 }}>Go to Chat →</button>
          </div>
        ) : tickets.map((t) => (
          <div key={t.id} onClick={() => setSelectedTicket(t)} style={{
            background: selectedTicket?.id === t.id ? "#1a1a28" : "#111118",
            border: `1px solid ${selectedTicket?.id === t.id ? t.categoryMeta.color + "40" : "#1e293b"}`,
            borderLeft: `3px solid ${t.categoryMeta.color}`,
            borderRadius: 12, padding: "11px 13px", cursor: "pointer", transition: "all .2s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
              <span style={{ fontFamily: "monospace", fontSize: 10, color: t.categoryMeta.color, fontWeight: 600 }}>{t.id}</span>
              <span style={{ fontSize: 9, fontWeight: 600, padding: "2px 7px", borderRadius: 5, background: t.status === "Resolved" ? "#22c55e20" : t.status === "Open" ? "#f59e0b20" : "#6366f120", color: t.status === "Resolved" ? "#22c55e" : t.status === "Open" ? "#f59e0b" : "#a5b4fc" }}>{t.status}</span>
            </div>
            <div style={{ fontWeight: 500, fontSize: 12.5, color: "#e2e8f0", marginBottom: 5, lineHeight: 1.4 }}>{t.title}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 10, color: "#475569" }}>{t.categoryMeta.icon} {t.categoryMeta.team}</span>
              <span style={{ fontSize: 9, color: "#334155", marginLeft: "auto" }}>{fmtDate(t.createdAt)}</span>
            </div>
            <div style={{ display: "flex", gap: 2 }}>
              {STATUS_FLOW.map((_, si) => (
                <div key={si} style={{ flex: 1, height: 2.5, borderRadius: 2, background: si <= t.statusIndex ? t.categoryMeta.color : "#1e293b", transition: "background .3s" }} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detail */}
      {selectedTicket && (
        <div style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setSelectedTicket(null)} style={{ background: "transparent", border: "1px solid #1e293b", color: "#64748b", padding: "5px 10px", borderRadius: 7, fontSize: 12, cursor: "pointer" }}>← Back</button>
            <span style={{ fontFamily: "monospace", color: selectedTicket.categoryMeta.color, fontWeight: 600 }}>{selectedTicket.id}</span>
            <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 6, background: selectedTicket.priority === "Urgent" ? "#ef444420" : "#1e293b", color: selectedTicket.priority === "Urgent" ? "#ef4444" : "#64748b", border: "1px solid #1e293b" }}>⚡ {selectedTicket.priority}</span>
          </div>

          <div>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#f1f5f9", lineHeight: 1.3 }}>{selectedTicket.title}</h2>
            <div style={{ display: "flex", gap: 7, marginTop: 8, flexWrap: "wrap" }}>
              <span style={{ background: `${selectedTicket.categoryMeta.color}15`, color: selectedTicket.categoryMeta.color, padding: "4px 10px", borderRadius: 6, fontSize: 11 }}>{selectedTicket.categoryMeta.icon} {selectedTicket.categoryMeta.label}</span>
            </div>
          </div>

          {/* Routing info */}
          <div style={{ background: "#12121e", border: "1px solid #22c55e30", borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#22c55e", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>📧 Email Routing — Notification Sent</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#0a0a14", border: "1px solid #1e293b", borderRadius: 9, padding: "10px 12px" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${selectedTicket.categoryMeta.color}20`, color: selectedTicket.categoryMeta.color, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{selectedTicket.categoryMeta.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>{selectedTicket.categoryMeta.contact}</div>
                <div style={{ fontSize: 11, color: "#475569" }}>{selectedTicket.categoryMeta.email}</div>
                <div style={{ fontSize: 10, color: "#334155", marginTop: 2 }}>Team: {selectedTicket.categoryMeta.team}</div>
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, padding: "4px 10px", borderRadius: 7, background: "#22c55e15", color: "#22c55e", border: "1px solid #22c55e30", flexShrink: 0 }}>✓ Delivered</div>
            </div>
          </div>

          {/* Status tracker */}
          <div style={{ background: "#12121e", border: "1px solid #1e293b", borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#64748b", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.5px" }}>Resolution Progress</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {STATUS_FLOW.map((status, si) => (
                <div key={status} style={{ flex: 1, display: "flex", alignItems: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                    <button onClick={() => updateStatus(selectedTicket.id, si)} style={{ width: 30, height: 30, borderRadius: "50%", border: "2px solid", borderColor: si <= selectedTicket.statusIndex ? selectedTicket.categoryMeta.color : "#1e293b", background: si <= selectedTicket.statusIndex ? `${selectedTicket.categoryMeta.color}20` : "#0a0a10", color: si <= selectedTicket.statusIndex ? selectedTicket.categoryMeta.color : "#334155", fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all .2s" }}>
                      {si < selectedTicket.statusIndex ? "✓" : si + 1}
                    </button>
                    <span style={{ fontSize: 8, color: si <= selectedTicket.statusIndex ? "#94a3b8" : "#334155", textAlign: "center", maxWidth: 55 }}>{status}</span>
                  </div>
                  {si < STATUS_FLOW.length - 1 && <div style={{ flex: 1, height: 2, marginBottom: 14, background: si < selectedTicket.statusIndex ? selectedTicket.categoryMeta.color : "#1e293b", transition: "background .3s" }} />}
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div style={{ background: "#12121e", border: "1px solid #1e293b", borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>Issue Summary</div>
            <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>{selectedTicket.summary}</p>
          </div>

          {/* Actions */}
          {selectedTicket.suggestedActions.length > 0 && (
            <div style={{ background: "#12121e", border: "1px solid #1e293b", borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#64748b", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.5px" }}>Suggested Actions</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {selectedTicket.suggestedActions.map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                    <div style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0, background: `${selectedTicket.categoryMeta.color}20`, color: selectedTicket.categoryMeta.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700 }}>{i + 1}</div>
                    <span style={{ fontSize: 12.5, color: "#94a3b8", lineHeight: 1.5 }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{ fontSize: 10, color: "#1e293b", paddingBottom: 8 }}>Created {fmtDate(selectedTicket.createdAt)} · Updated {fmtDate(selectedTicket.updatedAt)}</div>
        </div>
      )}
    </div>
  );
}
