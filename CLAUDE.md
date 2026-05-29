# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start dev server (Vite, default http://localhost:5173)
npm run build      # production build to dist/
npm run preview    # preview the production build
```

There are no tests or linters configured in this project.

## Architecture

This is a single-page React 18 + Vite admin dashboard for managing enterprise MCP (Model Context Protocol) servers. The UI is in Traditional Chinese (zh-TW) and represents an "Enterprise AI OS" management console.

**Navigation model**: `App.jsx` owns a single `activeTab` string and maps it to a view component via a `VIEWS` object — no router library. Views receive an `onNavigate` prop to switch tabs programmatically (e.g., clicking a server row in `OverviewView` navigates to `ToolsView`).

**Data layer**: All data lives in `src/data/mockData.js` as static exports (`SERVERS`, `LOGS`, `INITIAL_ROUTES`, `SEC_INFO`). There are no API calls. To wire up a real backend, replace these exports with fetched data.

**State**: Component-local `useState` only — no global state manager. `RoutingView` manages toggle state locally; `save` is a UI-only operation (no persistence).

**Styling**: A single flat CSS file (`src/styles/index.css`) with BEM-like class names. No CSS modules, no Tailwind, no CSS-in-JS. All layout uses flexbox and CSS Grid.

**UI primitives**:
- `src/components/ui/Icon.jsx` — renders inline SVG icons. To add an icon, add a named entry to the `PATHS` object and reference it by name via `<Icon name="..." />`.
- `src/components/ui/Badge.jsx` — color-coded badge using `className={badge ${level}}`. Levels `A`/`B`/`C`/`D` map to CSS classes for security tiers; `online`/`offline` map to status colors.

## Security tier model

Tools carry a `securityLevel` of `A`, `B`, `C`, or `D`:

| Level | Sensitivity | Default routing |
|-------|-------------|-----------------|
| A | 最高敏感 (個資、報案) | on-premise only |
| B | 高敏感 (財務、人事) | on-premise only |
| C | 中敏感 (業務資料) | Claude (cloud) |
| D | 低敏感 (公開資料) | Claude (cloud) |

`RoutingView` lets users toggle per-level routing between `claude` and `on-premise`. `ToolsView` derives the routing target from `securityLevel` directly (A/B → on-premise, C/D → Claude). `SEC_INFO` in `mockData.js` holds the human-readable description for each level.
