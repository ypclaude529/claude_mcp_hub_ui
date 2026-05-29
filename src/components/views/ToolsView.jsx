import { useState } from "react";
import { SERVERS, SUITES, SEC_INFO } from "../../data/mockData";
import Badge from "../ui/Badge";

const ALL_TOOLS = SERVERS.flatMap((s) =>
  s.tools.map((t) => ({ ...t, serverName: s.name, serverId: s.id, suite: s.suite }))
);

export default function ToolsView() {
  const [selectedSuite, setSelectedSuite] = useState("ALL");
  const [selected, setSelected] = useState(ALL_TOOLS[0]);

  const filteredTools = selectedSuite === "ALL"
    ? ALL_TOOLS
    : ALL_TOOLS.filter((t) => t.suite === selectedSuite);

  const displaySelected = filteredTools.includes(selected) ? selected : filteredTools[0] ?? null;

  return (
    <div>
      <div className="suite-filter-bar">
        <button
          className={`suite-chip ${selectedSuite === "ALL" ? "active" : ""}`}
          onClick={() => setSelectedSuite("ALL")}
        >
          全部
        </button>
        {SUITES.map((s) => (
          <button
            key={s.id}
            className={`suite-chip suite-chip-${s.id} ${selectedSuite === s.id ? "active" : ""}`}
            onClick={() => setSelectedSuite(s.id)}
          >
            {s.id}
          </button>
        ))}
      </div>

      <div className="tools-grid">
        <div className="tool-list">
          <div className="section-title">
            {selectedSuite === "ALL" ? "所有 Tools" : `${selectedSuite} Tools`}
          </div>
          {filteredTools.map((tool) => (
            <div
              key={`${tool.serverId}-${tool.name}`}
              className={`tool-item ${displaySelected?.name === tool.name && displaySelected?.serverId === tool.serverId ? "selected" : ""}`}
              onClick={() => setSelected(tool)}
            >
              <div className="tool-item-name">
                {tool.name}
                <Badge label={`Sec ${tool.securityLevel}`} level={tool.securityLevel} />
              </div>
              <div className="tool-item-server">{tool.serverName}</div>
              <span className={`suite-badge suite-${tool.suite}`} style={{ marginTop: 4, fontSize: 10 }}>{tool.suite}</span>
            </div>
          ))}
        </div>

        <div className="detail-panel">
          {displaySelected ? (
            <>
              <div className="detail-header">
                <span className="detail-name">{displaySelected.name}</span>
                <Badge label={`Security ${displaySelected.securityLevel}`} level={displaySelected.securityLevel} />
              </div>
              <div className="kv"><span className="kv-key">Server</span><span>{displaySelected.serverName}</span></div>
              <div className="kv">
                <span className="kv-key">Suite</span>
                <span className={`suite-badge suite-${displaySelected.suite}`}>{displaySelected.suite}</span>
              </div>
              <div className="kv"><span className="kv-key">說明</span><span>{displaySelected.description}</span></div>
              <div className="kv"><span className="kv-key">累計呼叫</span><strong>{displaySelected.calls} 次</strong></div>
              <div className="kv">
                <span className="kv-key">路由目標</span>
                {["A", "B"].includes(displaySelected.securityLevel) ? (
                  <span className="route-target-op">🏢 地端模型</span>
                ) : (
                  <span className="route-target-claude">☁️ Claude</span>
                )}
              </div>
              <div className="info-box">{SEC_INFO[displaySelected.securityLevel]}</div>
            </>
          ) : (
            <div style={{ color: "#aaa", fontSize: 13 }}>← 選擇一個 Tool 查看詳情</div>
          )}
        </div>
      </div>
    </div>
  );
}
