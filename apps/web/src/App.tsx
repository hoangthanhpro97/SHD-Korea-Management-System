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
    <div className="min-h-screen bg-slate-100 text-slate-800 md:flex">
      <aside className="w-full shrink-0 bg-[#0b1f3a] text-white md:min-h-screen md:w-64">
        <div className="border-b border-white/10 px-5 py-5">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-sky-200">
            SHD KOREA
          </p>
          <p className="mt-1 text-sm font-bold leading-snug md:text-base">
            MANAGEMENT SYSTEM
          </p>
        </div>

        <nav
          aria-label="Menu chính"
          className="flex gap-1 overflow-x-auto px-3 py-3 md:flex-col md:overflow-visible md:px-3 md:py-5"
        >
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={'end' in item ? item.end : false}
              className={({ isActive }) =>
                isActive
                  ? 'flex shrink-0 items-center gap-2 rounded-lg bg-white/15 px-3 py-2 text-sm font-semibold whitespace-nowrap'
                  : 'flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-200 whitespace-nowrap'
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
      </aside>

      <main className="flex-1 p-5 md:p-8">
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
