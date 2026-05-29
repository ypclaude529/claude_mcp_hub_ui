import { useState } from "react";
import { INITIAL_ROUTES } from "../../data/mockData";
import Badge from "../ui/Badge";
import Icon from "../ui/Icon";

export default function RoutingView() {
  const [routes, setRoutes] = useState(INITIAL_ROUTES);
  const [saved, setSaved] = useState(false);

  const toggle = (id) => {
    setRoutes((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, target: r.target === "claude" ? "on-premise" : "claude" }
          : r
      )
    );
    setSaved(false);
  };

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div className="section-title" style={{ marginBottom: 0 }}>路由規則設定</div>
        <button className={`save-btn ${saved ? "saved" : ""}`} onClick={save}>
          {saved ? "✓ 已儲存" : "儲存變更"}
        </button>
      </div>

      <div className="warn-box">
        <Icon name="warning" size={15} style={{ flexShrink: 0, marginTop: 1 }} />
        變更路由規則前請與資安團隊確認。Security A/B 建議維持地端模型。
      </div>

      {routes.map((route) => (
        <div key={route.id} className="route-row">
          <div className="route-left">
            <Badge label={`Security ${route.level}`} level={route.level} />
            <span style={{ fontSize: 13, color: "#555" }}>{route.desc}</span>
          </div>
          <div className="route-right">
            <span className={route.target === "claude" ? "route-target-claude" : "route-target-op"}>
              {route.target === "claude" ? "☁️ Claude" : "🏢 地端模型"}
            </span>
            <button
              className="toggle"
              style={{ background: route.target === "claude" ? "#4f46e5" : "#ea580c" }}
              onClick={() => toggle(route.id)}
              aria-label={`切換 Security ${route.level} 路由目標`}
            >
              <div
                className="toggle-thumb"
                style={{ transform: `translateX(${route.target === "claude" ? "24" : "4"}px)` }}
              />
            </button>
          </div>
        </div>
      ))}

      <div className="route-note">
        <span className="route-note-title">路由邏輯說明</span>
        1. 請求進入 Gateway 後，取 tool 的安全等級標籤<br />
        2. 對照以上規則，決定路由至 Claude 或地端模型<br />
        3. 每次路由決策都寫入稽核 Log
      </div>
    </div>
  );
}
