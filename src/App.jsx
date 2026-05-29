import { useState } from "react";
import Sidebar from "./components/Sidebar";
import OverviewView from "./components/views/OverviewView";
import ToolsView from "./components/views/ToolsView";
import LogsView from "./components/views/LogsView";
import RoutingView from "./components/views/RoutingView";
import PermissionsView from "./components/views/PermissionsView";

const VIEWS = {
  overview:    OverviewView,
  tools:       ToolsView,
  logs:        LogsView,
  routing:     RoutingView,
  permissions: PermissionsView,
};

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");

  const ActiveView = VIEWS[activeTab];

  return (
    <div className="layout">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="main-content">
        <ActiveView onNavigate={setActiveTab} />
      </main>
    </div>
  );
}
