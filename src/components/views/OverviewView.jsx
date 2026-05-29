import { SERVERS, SUITES } from "../../data/mockData";
import Badge from "../ui/Badge";

export default function OverviewView({ onNavigate }) {
  const online = SERVERS.filter((s) => s.status === "online").length;
  const totalTools = SERVERS.reduce((acc, s) => acc + s.tools.length, 0);
  const totalCalls = SERVERS.reduce(
    (acc, s) => acc + s.tools.reduce((a, t) => a + t.calls, 0),
    0
  );

  const suiteGroups = SUITES.map((suite) => ({
    ...suite,
    servers: SERVERS.filter((s) => s.suite === suite.id),
  })).filter((g) => g.servers.length > 0);

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">MCP Servers</div>
          <div className="stat-value" style={{ color: "#16a34a" }}>{online} / {SERVERS.length}</div>
          <div className="stat-sub">上線中</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Tools</div>
          <div className="stat-value" style={{ color: "#4f46e5" }}>{totalTools}</div>
          <div className="stat-sub">已註冊</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">今日 Calls</div>
          <div className="stat-value">{totalCalls.toLocaleString()}</div>
          <div className="stat-sub">累計呼叫</div>
        </div>
      </div>

      {suiteGroups.map((group) => (
        <div key={group.id} className="suite-group">
          <div className="suite-group-header">
            <span className={`suite-badge suite-${group.id}`}>{group.id}</span>
            <span className="suite-group-desc">{group.desc}</span>
            <span className="suite-group-count">{group.servers.length} server{group.servers.length > 1 ? "s" : ""}</span>
          </div>

          {group.servers.map((server) => (
            <div
              key={server.id}
              className="server-row"
              onClick={() => onNavigate("tools")}
            >
              <div className="server-row-left">
                <span className={`dot ${server.status === "online" ? "green" : "red"}`} />
                <div>
                  <div className="server-row-name">{server.name}</div>
                  <div className="server-row-desc">{server.description}</div>
                </div>
              </div>
              <div className="server-row-right">
                <span>{server.tools.length} tool{server.tools.length > 1 ? "s" : ""}</span>
                <span>ping {server.lastPing}</span>
                <Badge label={server.status} level={server.status} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
