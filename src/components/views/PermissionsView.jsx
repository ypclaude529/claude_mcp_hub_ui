import { useState } from "react";
import { SUITES, ROLES, SUITE_PERMISSIONS, SERVERS } from "../../data/mockData";
import Badge from "../ui/Badge";
import Icon from "../ui/Icon";

export default function PermissionsView() {
  const [selectedSuiteId, setSelectedSuiteId] = useState("HCM");
  const [permissions, setPermissions] = useState(
    Object.fromEntries(
      Object.entries(SUITE_PERMISSIONS).map(([k, v]) => [k, { enabled: [...v.enabled] }])
    )
  );
  const [saved, setSaved] = useState(false);

  const suite = SUITES.find((s) => s.id === selectedSuiteId);
  const perm = permissions[selectedSuiteId];
  const suiteServers = SERVERS.filter((s) => s.suite === selectedSuiteId);
  const suiteTools = suiteServers.flatMap((s) =>
    s.tools.map((t) => ({ ...t, serverName: s.name }))
  );

  const toggleRole = (role) => {
    setPermissions((prev) => {
      const current = prev[selectedSuiteId].enabled;
      const newEnabled = current.includes(role)
        ? current.filter((r) => r !== role)
        : [...current, role];
      return { ...prev, [selectedSuiteId]: { enabled: newEnabled } };
    });
    setSaved(false);
  };

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="tools-grid">
      {/* Left: suite list */}
      <div className="tool-list">
        <div className="section-title">Product Suites</div>
        {SUITES.map((s) => {
          const count = permissions[s.id].enabled.length;
          const serverCount = SERVERS.filter((sv) => sv.suite === s.id).length;
          return (
            <div
              key={s.id}
              className={`tool-item ${selectedSuiteId === s.id ? "selected" : ""}`}
              onClick={() => { setSelectedSuiteId(s.id); setSaved(false); }}
            >
              <div className="tool-item-name">
                <span className={`suite-badge suite-${s.id}`}>{s.id}</span>
              </div>
              <div className="tool-item-server" style={{ marginTop: 5 }}>{s.desc}</div>
              <div style={{ fontSize: 11, color: "#aaa", marginTop: 4 }}>
                {serverCount} server · {count} 個角色已授權
              </div>
            </div>
          );
        })}
      </div>

      {/* Right: detail panel */}
      <div className="detail-panel">
        <div className="detail-header">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className={`suite-badge suite-${suite.id}`} style={{ fontSize: 13, padding: "3px 12px" }}>{suite.id}</span>
            <span style={{ fontSize: 14, color: "#555" }}>{suite.desc}</span>
          </div>
          <button className={`save-btn ${saved ? "saved" : ""}`} onClick={save}>
            {saved ? "✓ 已儲存" : "儲存變更"}
          </button>
        </div>

        <div className="warn-box" style={{ marginBottom: 18 }}>
          <Icon name="shield" size={14} style={{ flexShrink: 0, marginTop: 1 }} />
          變更角色授權前請與資安團隊確認。異動將於下次登入後生效。
        </div>

        <div className="section-title">角色授權</div>
        <div className="perm-grid">
          {ROLES.map((role) => {
            const enabled = perm.enabled.includes(role);
            return (
              <div key={role} className="perm-row">
                <span className="perm-role">{role}</span>
                <button
                  className="toggle"
                  style={{ background: enabled ? "#4f46e5" : "#d1d5db" }}
                  onClick={() => toggleRole(role)}
                  aria-label={`切換 ${role} 存取 ${suite.id}`}
                >
                  <div
                    className="toggle-thumb"
                    style={{ transform: `translateX(${enabled ? "24" : "4"}px)` }}
                  />
                </button>
              </div>
            );
          })}
        </div>

        <div className="section-title" style={{ marginTop: 22 }}>已掛載 Tools</div>
        {suiteTools.length === 0 ? (
          <div style={{ color: "#aaa", fontSize: 13 }}>此 Suite 尚無掛載 Tool</div>
        ) : (
          <div className="suite-tools-list">
            {suiteTools.map((tool) => (
              <div key={`${tool.serverName}-${tool.name}`} className="suite-tool-row">
                <span className="mono" style={{ fontWeight: 700, fontSize: 12 }}>{tool.name}</span>
                <span style={{ fontSize: 11, color: "#999" }}>{tool.serverName}</span>
                <Badge label={`Sec ${tool.securityLevel}`} level={tool.securityLevel} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
