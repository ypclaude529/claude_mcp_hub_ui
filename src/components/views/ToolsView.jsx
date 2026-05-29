import { useState } from "react";
import { SERVERS, SEC_INFO } from "../../data/mockData";
import Badge from "../ui/Badge";

const ALL_TOOLS = SERVERS.flatMap((s) =>
  s.tools.map((t) => ({ ...t, serverName: s.name, serverId: s.id }))
);

export default function ToolsView() {
  const [selected, setSelected] = useState(ALL_TOOLS[0]);

  return (
    <div className="tools-grid">
      <div className="tool-list">
        <div className="section-title">所有 Tools</div>
        {ALL_TOOLS.map((tool) => (
          <div
            key={`${tool.serverId}-${tool.name}`}
            className={`tool-item ${selected?.name === tool.name && selected?.serverId === tool.serverId ? "selected" : ""}`}
            onClick={() => setSelected(tool)}
          >
            <div className="tool-item-name">
              {tool.name}
              <Badge label={`Sec ${tool.securityLevel}`} level={tool.securityLevel} />
            </div>
            <div className="tool-item-server">{tool.serverName}</div>
          </div>
        ))}
      </div>

      <div className="detail-panel">
        {selected ? (
          <>
            <div className="detail-header">
              <span className="detail-name">{selected.name}</span>
              <Badge label={`Security ${selected.securityLevel}`} level={selected.securityLevel} />
            </div>
            <div className="kv"><span className="kv-key">Server</span><span>{selected.serverName}</span></div>
            <div className="kv"><span className="kv-key">說明</span><span>{selected.description}</span></div>
            <div className="kv"><span className="kv-key">累計呼叫</span><strong>{selected.calls} 次</strong></div>
            <div className="kv">
              <span className="kv-key">路由目標</span>
              {["A", "B"].includes(selected.securityLevel) ? (
                <span className="route-target-op">🏢 地端模型</span>
              ) : (
                <span className="route-target-claude">☁️ Claude</span>
              )}
            </div>
            <div className="info-box">{SEC_INFO[selected.securityLevel]}</div>
          </>
        ) : (
          <div style={{ color: "#aaa", fontSize: 13 }}>← 選擇一個 Tool 查看詳情</div>
        )}
      </div>
    </div>
  );
}
