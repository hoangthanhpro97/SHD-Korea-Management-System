import { useState } from 'react'
import DemoBadge from '../components/DemoBadge'
import mockData from '../mocks/synthetic_demo_cases.json'
import type { Task } from '../types/schema'

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockData.tasks as Task[])
  const [filterPriority, setFilterPriority] = useState<string>('ALL')

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.taskId === taskId
          ? {
              ...t,
              status: t.status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED',
            }
          : t
      )
    )
  }

  const filteredTasks = tasks.filter(
    (t) => filterPriority === 'ALL' || t.priority === filterPriority
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Quản trị công việc (Tasks & Action Items)
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Phân công công việc theo từng giai đoạn hồ sơ, kiểm tra chéo và theo dõi hạn xử lý
          </p>
        </div>
        <DemoBadge />
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
        <span className="text-xs font-semibold text-slate-600">Độ ưu tiên:</span>
        <div className="flex gap-1.5">
          {['ALL', 'URGENT', 'HIGH', 'MEDIUM'].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setFilterPriority(p)}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                filterPriority === p
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {p === 'ALL' ? 'Tất cả' : p}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map((t) => {
          const isDone = t.status === 'COMPLETED'
          return (
            <div
              key={t.taskId}
              className={`rounded-xl border p-4 transition-all bg-white ${
                isDone
                  ? 'border-emerald-200 bg-emerald-50/30 opacity-75'
                  : 'border-slate-200 shadow-2xs hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => toggleTaskStatus(t.taskId)}
                    className="mt-1 h-4 w-4 rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                        {t.stageCode}
                      </span>
                      <h3
                        className={`text-sm font-bold ${
                          isDone ? 'line-through text-slate-400' : 'text-slate-900'
                        }`}
                      >
                        {t.title}
                      </h3>
                    </div>
                    {t.description && (
                      <p className="mt-1 text-xs text-slate-600">{t.description}</p>
                    )}
                    {t.studentName && (
                      <p className="mt-1 text-[11px] text-slate-500">
                        Gắn với hồ sơ: <strong className="text-slate-700">{t.studentName}</strong>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                      t.priority === 'URGENT'
                        ? 'bg-rose-100 text-rose-700'
                        : t.priority === 'HIGH'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {t.priority}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Hạn: {new Date(t.dueAt).toLocaleDateString('vi-VN')}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Phụ trách: {t.assigneeName}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
