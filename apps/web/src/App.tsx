import { BrowserRouter, NavLink, Route, Routes } from 'react-router'
import CasesPage from './pages/CasesPage'
import DashboardPage from './pages/DashboardPage'
import NotFoundPage from './pages/NotFoundPage'
import ReportsPage from './pages/ReportsPage'
import SettingsPage from './pages/SettingsPage'
import StudentsPage from './pages/StudentsPage'
import TasksPage from './pages/TasksPage'

const menuItems = [
  { to: '/', label: 'Tổng quan', end: true },
  { to: '/students', label: 'Học viên' },
  { to: '/cases', label: 'Hồ sơ du học' },
  { to: '/tasks', label: 'Công việc' },
  { to: '/reports', label: 'Báo cáo' },
  { to: '/settings', label: 'Cài đặt' },
] as const

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* ======================================================== */}
      {/* DESKTOP SIDEBAR: KHÓA CỐ ĐỊNH 100% BẰNG FIXED POSITION   */}
      {/* Không bao giờ cuộn hay trượt theo trang theo cả 2 trục  */}
      {/* ======================================================== */}
      <aside className="hidden md:flex fixed top-0 left-0 bottom-0 w-64 h-screen bg-[#033399] text-white z-50 shadow-2xl flex-col justify-between overflow-y-auto">
        <div>
          <div className="border-b border-white/10 px-5 py-5">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-sky-200">
              SHD KOREA
            </p>
            <p className="mt-1 text-sm font-bold leading-snug md:text-base">
              MANAGEMENT SYSTEM
            </p>
          </div>

          <nav
            aria-label="Menu chính Desktop"
            className="flex flex-col gap-1 px-3 py-5"
          >
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={'end' in item ? item.end : false}
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center gap-2 rounded-lg bg-white/20 text-white px-3 py-2.5 text-sm font-bold shadow-xs'
                    : 'flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-200 hover:bg-white/10 transition-colors'
                }
              >
                {({ isActive }) => (
                  <>
                    <span aria-hidden="true" className="text-xs text-sky-200">
                      {isActive ? '■' : '○'}
                    </span>
                    {item.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer info in Sidebar */}
        <div className="p-4 border-t border-white/10 text-[11px] text-sky-200">
          <p className="font-semibold text-white">SHD Korea v2.5</p>
          <p className="text-slate-300 text-[10px] mt-0.5">Hệ thống điều hành 4 phòng ban</p>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* MOBILE TOP BAR: CỐ ĐỊNH Ở ĐẦU TRANG                      */}
      {/* ======================================================== */}
      <header className="md:hidden sticky top-0 left-0 right-0 bg-[#033399] text-white z-50 shadow-lg">
        <div className="border-b border-white/10 px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold tracking-wider text-sky-200">
              SHD KOREA
            </p>
            <p className="text-xs font-bold leading-tight">
              MANAGEMENT SYSTEM
            </p>
          </div>
          <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-bold text-sky-200">
            MENU
          </span>
        </div>

        <nav
          aria-label="Menu Mobile"
          className="flex gap-1 overflow-x-auto px-3 py-2 scrollbar-none"
        >
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={'end' in item ? item.end : false}
              className={({ isActive }) =>
                isActive
                  ? 'flex shrink-0 items-center gap-1.5 rounded-lg bg-white/20 px-3 py-1.5 text-xs font-bold text-white shadow-xs whitespace-nowrap'
                  : 'flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-slate-200 hover:bg-white/10 whitespace-nowrap'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* ======================================================== */}
      {/* MAIN CONTENT AREA: CÓ PADDING TRÁI md:pl-64 CHO SIDEBAR   */}
      {/* ======================================================== */}
      <div className="md:pl-64 min-h-screen flex flex-col w-full min-w-0">
        <main className="flex-1 p-5 md:p-8 min-w-0">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
