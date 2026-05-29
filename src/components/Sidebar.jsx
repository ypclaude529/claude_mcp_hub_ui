import Icon from "./ui/Icon";

const NAV_ITEMS = [
  { id: "overview",     icon: "server",    label: "Server 總覽" },
  { id: "tools",        icon: "tool",      label: "Tools 管理" },
  { id: "logs",         icon: "clipboard", label: "稽核 Log" },
  { id: "routing",      icon: "route",     label: "路由規則" },
  { id: "permissions",  icon: "shield",    label: "權限管理" },
];

export default function Sidebar({ activeTab, onTabChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-label">Enterprise AI OS</div>
        <div className="sidebar-header-title">MCP Hub 管理後台</div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? "active" : ""}`}
            onClick={() => onTabChange(item.id)}
          >
            <Icon name={item.icon} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span className="dot green" />
        Hub v0.1 &nbsp;·&nbsp; 3 / 4 servers online
      </div>
    </aside>
  );
}
