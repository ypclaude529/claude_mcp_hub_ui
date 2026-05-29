export const SERVERS = [
  {
    id: "freequery-mcp",
    name: "freequery MCP",
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
    description: "知識庫 RAG 搜尋（統一 API）",
    status: "online",
    lastPing: "1s ago",
    tools: [
      { name: "search_km", securityLevel: "C", calls: 308, description: "搜尋 KM 知識庫，回傳相關文件片段" },
      { name: "get_km_document", securityLevel: "C", calls: 87, description: "根據 ID 取得完整 KM 文件" },
    ],
  },
  {
    id: "excel-ai-mcp",
    name: "Excel AI MCP",
    description: "Excel 數據分析工具",
    status: "online",
    lastPing: "5s ago",
    tools: [
      { name: "upload_excel", securityLevel: "B", calls: 54, description: "上傳 Excel 至公司 DB 暫存" },
      { name: "analyze_excel", securityLevel: "B", calls: 51, description: "AI 數據分析，地端模型執行" },
    ],
  },
  {
    id: "faq-mcp",
    name: "FAQ MCP",
    description: "報案 QA / KM FAQ 自動產出",
    status: "offline",
    lastPing: "3m ago",
    tools: [
      { name: "generate_faq", securityLevel: "A", calls: 23, description: "地端模型產出結構化 FAQ" },
    ],
  },
];

export const LOGS = [
  { id: "r1", time: "10:42:31", tool: "search_km",      caller: "claude",     sec: "C", status: "success", ms: 312 },
  { id: "r2", time: "10:42:28", tool: "query_database", caller: "claude",     sec: "C", status: "success", ms: 891 },
  { id: "r3", time: "10:41:55", tool: "analyze_excel",  caller: "claude",     sec: "B", status: "success", ms: 2340 },
  { id: "r4", time: "10:41:30", tool: "generate_faq",   caller: "on-premise", sec: "A", status: "error",   ms: 30001 },
  { id: "r5", time: "10:40:12", tool: "search_km",      caller: "claude",     sec: "C", status: "success", ms: 278 },
  { id: "r6", time: "10:39:48", tool: "upload_excel",   caller: "claude",     sec: "B", status: "success", ms: 445 },
  { id: "r7", time: "10:38:20", tool: "query_database", caller: "on-premise", sec: "C", status: "success", ms: 1102 },
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
