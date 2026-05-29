export const SUITES = [
  { id: "HCM",     label: "HCM",     desc: "Human Capital Management",        color: "#7c3aed" },
  { id: "SCM",     label: "SCM",     desc: "Supply Chain Management",          color: "#1d4ed8" },
  { id: "FCM",     label: "FCM",     desc: "Financial Capital Management",     color: "#b45309" },
  { id: "CRM",     label: "CRM",     desc: "Customer Relationship Management", color: "#0f766e" },
  { id: "BLM",     label: "BLM",     desc: "Business Lifecycle Management",    color: "#9f1239" },
  { id: "General", label: "General", desc: "通用",                             color: "#374151" },
];

export const ROLES = [
  "IT Admin",
  "HR Admin", "HR User",
  "Finance Admin", "Accountant",
  "Sales Manager", "Sales Rep",
  "SCM Manager", "Warehouse Staff",
  "BizDev", "Management",
  "All Users",
];

export const SUITE_PERMISSIONS = {
  HCM:     { enabled: ["IT Admin", "HR Admin", "HR User"] },
  SCM:     { enabled: ["IT Admin", "SCM Manager", "Warehouse Staff"] },
  FCM:     { enabled: ["IT Admin", "Finance Admin", "Accountant"] },
  CRM:     { enabled: ["IT Admin", "Sales Manager", "Sales Rep"] },
  BLM:     { enabled: ["IT Admin", "BizDev", "Management"] },
  General: { enabled: ["All Users"] },
};

export const SERVERS = [
  {
    id: "hr-mcp",
    name: "HR MCP",
    suite: "HCM",
    description: "員工資料查詢與人事管理",
    status: "online",
    lastPing: "3s ago",
    tools: [
      { name: "query_employee", securityLevel: "B", calls: 98,  description: "查詢員工基本資料與人事記錄" },
      { name: "get_org_chart",  securityLevel: "C", calls: 45,  description: "取得組織架構圖" },
    ],
  },
  {
    id: "inventory-mcp",
    name: "Inventory MCP",
    suite: "SCM",
    description: "庫存與供應鏈即時查詢",
    status: "online",
    lastPing: "4s ago",
    tools: [
      { name: "query_inventory", securityLevel: "C", calls: 76, description: "查詢即時庫存水位" },
      { name: "get_supplier",    securityLevel: "C", calls: 33, description: "取得供應商資料" },
    ],
  },
  {
    id: "excel-ai-mcp",
    name: "Excel AI MCP",
    suite: "FCM",
    description: "Excel 數據分析工具",
    status: "online",
    lastPing: "5s ago",
    tools: [
      { name: "upload_excel",  securityLevel: "B", calls: 54, description: "上傳 Excel 至公司 DB 暫存" },
      { name: "analyze_excel", securityLevel: "B", calls: 51, description: "AI 數據分析，地端模型執行" },
    ],
  },
  {
    id: "faq-mcp",
    name: "FAQ MCP",
    suite: "CRM",
    description: "報案 QA / KM FAQ 自動產出",
    status: "offline",
    lastPing: "3m ago",
    tools: [
      { name: "generate_faq", securityLevel: "A", calls: 23, description: "地端模型產出結構化 FAQ" },
    ],
  },
  {
    id: "contract-mcp",
    name: "Contract MCP",
    suite: "BLM",
    description: "合約生命週期管理",
    status: "online",
    lastPing: "8s ago",
    tools: [
      { name: "query_contract", securityLevel: "B", calls: 41, description: "查詢合約條款與狀態" },
      { name: "draft_contract", securityLevel: "A", calls: 12, description: "AI 輔助合約草稿（地端模型）" },
    ],
  },
  {
    id: "freequery-mcp",
    name: "FreeQuery MCP",
    suite: "General",
    description: "自然語言查詢公司內部資料庫",
    status: "online",
    lastPing: "2s ago",
    tools: [
      { name: "query_database", securityLevel: "C", calls: 142, description: "自然語言查詢資料庫結構化資料" },
    ],
  },
  {
    id: "km-mcp",
    name: "KM MCP",
    suite: "General",
    description: "知識庫 RAG 搜尋（統一 API）",
    status: "online",
    lastPing: "1s ago",
    tools: [
      { name: "search_km",       securityLevel: "C", calls: 308, description: "搜尋 KM 知識庫，回傳相關文件片段" },
      { name: "get_km_document", securityLevel: "C", calls: 87,  description: "根據 ID 取得完整 KM 文件" },
    ],
  },
];

export const LOGS = [
  { id: "r1", time: "10:42:31", tool: "search_km",       caller: "claude",     sec: "C", status: "success", ms: 312 },
  { id: "r2", time: "10:42:28", tool: "query_database",  caller: "claude",     sec: "C", status: "success", ms: 891 },
  { id: "r3", time: "10:41:55", tool: "analyze_excel",   caller: "claude",     sec: "B", status: "success", ms: 2340 },
  { id: "r4", time: "10:41:30", tool: "generate_faq",    caller: "on-premise", sec: "A", status: "error",   ms: 30001 },
  { id: "r5", time: "10:40:12", tool: "search_km",       caller: "claude",     sec: "C", status: "success", ms: 278 },
  { id: "r6", time: "10:39:48", tool: "upload_excel",    caller: "claude",     sec: "B", status: "success", ms: 445 },
  { id: "r7", time: "10:38:20", tool: "query_database",  caller: "on-premise", sec: "C", status: "success", ms: 1102 },
  { id: "r8", time: "10:37:10", tool: "query_employee",  caller: "on-premise", sec: "B", status: "success", ms: 654 },
  { id: "r9", time: "10:36:55", tool: "query_inventory", caller: "claude",     sec: "C", status: "success", ms: 421 },
];

export const INITIAL_ROUTES = [
  { id: 1, level: "A", desc: "最高敏感（報案、個資）",  target: "on-premise" },
  { id: 2, level: "B", desc: "高敏感（財務、人事）",    target: "on-premise" },
  { id: 3, level: "C", desc: "中敏感（業務資料）",      target: "claude" },
  { id: 4, level: "D", desc: "低敏感（公開資料）",      target: "claude" },
];

export const SEC_INFO = {
  A: "最高敏感：含個資、報案資料，禁止離開防火牆，強制走地端模型。",
  B: "高敏感：含財務、人事資料，強制走地端模型。",
  C: "中敏感：業務資料，可路由至 Claude。",
  D: "低敏感：公開或非機密資料，可路由至 Claude。",
};
