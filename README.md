# SHD Korea Management System

Hệ thống quản lý quy trình hồ sơ du học Hàn Quốc (SHD Korea — SHD Corp).

## Cấu trúc dự án trong Antigravity

```
SHD-Korea-Management-System/
├── apps/
│   └── web/                   # Ứng dụng web React 19 + TypeScript + Vite + Tailwind CSS v4
│       ├── src/
│       │   ├── components/    # WorkflowTimeline, SchoolApplicationTracker, DemoBadge...
│       │   ├── pages/         # DashboardPage, CasesPage, StudentsPage, TasksPage...
│       │   ├── mocks/         # Dữ liệu giả lập 100% synthetic_demo_cases.json
│       │   └── types/         # Định nghĩa kiểu dữ liệu chuẩn (schema.ts)
├── docs/
│   └── architecture-v1.0/     # Bộ tài liệu kiến trúc kỹ thuật chi tiết (SOP01/SOP02, RBAC, ERD)
├── .agents/
│   └── rules/                 # Quy tắc dự án dành cho Antigravity AI Agent
├── .vscode/                   # Cấu hình IDE & các tác vụ (Tasks) tự động
├── AGENTS.md                  # Hướng dẫn và nguyên tắc cốt lõi cho AI Agent
└── package.json               # Scripts quản lý toàn bộ dự án
```

## Các lệnh phát triển

- **Chạy máy chủ phát triển (Dev server):**
  ```bash
  npm run dev
  ```
  Truy cập tại: `http://localhost:5173/`

- **Kiểm tra biên dịch (Typecheck & Build):**
  ```bash
  npm run build
  ```

- **Kiểm tra linter (ESLint):**
  ```bash
  npm run lint
  ```
