import { useState } from "react";
import { LOGS } from "../../data/mockData";
import Badge from "../ui/Badge";

const FILTERS = [
  { key: "all",     label: "全部" },
  { key: "success", label: "成功" },
  { key: "error",   label: "錯誤" },
];

export default function LogsView() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? LOGS : LOGS.filter((l) => l.status === filter);

  return (
    <div>
      <div className="log-toolbar">
        <div className="section-title" style={{ marginBottom: 0 }}>稽核 Log</div>
        <div className="filter-btns">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`filter-btn ${filter === f.key ? "active" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="log-wrap">
        <table className="log-table">
          <thead>
            <tr>
              <th>時間</th>
              <th>Tool</th>
              <th>呼叫方</th>
              <th>安全等級</th>
              <th>狀態</th>
              <th>回應時間</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log) => (
              <tr key={log.id}>
                <td className="mono text-muted">{log.time}</td>
                <td className="mono" style={{ fontWeight: 600 }}>{log.tool}</td>
                <td className={log.caller === "claude" ? "caller-claude" : "caller-op"}>
                  {log.caller === "claude" ? "☁️ Claude" : "🏢 地端"}
                </td>
                <td><Badge label={`Sec ${log.sec}`} level={log.sec} /></td>
                <td className={log.status === "success" ? "status-ok" : "status-err"}>
                  {log.status === "success" ? "✓ 成功" : "✗ 錯誤"}
                </td>
                <td className={`mono ${log.ms > 5000 ? "ms-slow" : ""}`}>
                  {log.ms.toLocaleString()} ms
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
