import { WEEK_STAGES, type WeekStageId, type DossierItem } from '../types/schema'
import { calculateStageSchedule } from '../utils/timelineCalculator'

interface WeeklyTimelineStepperProps {
  currentStageId: WeekStageId
  selectedStageId: WeekStageId
  onSelectStage: (stageId: WeekStageId) => void
  stageStatus: 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED'
  dossierItems?: Record<WeekStageId, DossierItem[]>
  enrollmentDate?: string
}

export default function WeeklyTimelineStepper({
  currentStageId,
  selectedStageId,
  onSelectStage,
  stageStatus,
  dossierItems,
  enrollmentDate = '2027-01-01',
}: WeeklyTimelineStepperProps) {
  const currentIdx = WEEK_STAGES.findIndex((s) => s.id === currentStageId)
  const schedule = calculateStageSchedule(enrollmentDate)

  return (
    <div className="w-full space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>⏱️</span>
            <span>Khung Tiến Độ 7 Giai Đoạn (Tự động cập nhật mốc ngày theo Ngày nhập học)</span>
          </h3>
          <p className="text-xs text-slate-500">
            Hệ thống tự động tính toán các mốc ngày hoàn thành theo chuẩn tuần • Click vào từng giai đoạn để chuyển vùng xem hồ sơ chi tiết
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-600">Mốc nhập học:</span>
          <span className="rounded bg-indigo-50 border border-indigo-200 px-2 py-0.5 font-mono font-bold text-[#033399]">
            {new Date(enrollmentDate).toLocaleDateString('vi-VN')}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-[11px] font-semibold text-slate-500">
            Tiến độ thực tế: <strong className="text-blue-700">{WEEK_STAGES[currentIdx]?.weekLabel}</strong>
          </span>
        </div>
      </div>

      {/* Stepper Scroll Container */}
      <div className="relative overflow-x-auto pb-5 pt-6 px-3">
        {/* Connecting horizontal line */}
        <div className="absolute left-8 right-8 top-[46px] h-1 -translate-y-1/2 bg-slate-200 hidden md:block" />

        <div className="flex min-w-[780px] items-start justify-between gap-2">
          {WEEK_STAGES.map((stage, idx) => {
            const isCompleted = idx < currentIdx
            const isCurrent = idx === currentIdx
            const isSelected = selectedStageId === stage.id
            const sched = schedule[stage.id]

            // Check if this stage has missing items
            const stageItems = dossierItems?.[stage.id] || []
            const missingCount = stageItems.filter((i) => i.status === 'MISSING').length
            const isBlockedStage = isCurrent && (stageStatus === 'BLOCKED' || missingCount > 0)

            let circleClass = isSelected
              ? 'bg-slate-100 text-slate-700 border-2 border-white ring-4 ring-slate-400 ring-offset-2 shadow-md'
              : 'bg-slate-100 text-slate-500 border-2 border-slate-300'
            let statusBadge = (
              <span className="rounded bg-slate-100 px-1.5 py-0.2 text-[9px] font-semibold text-slate-500">
                Chưa đến
              </span>
            )

            if (isCompleted) {
              circleClass = isSelected
                ? 'bg-emerald-600 text-white border-2 border-white ring-4 ring-emerald-500 ring-offset-2 shadow-lg'
                : 'bg-emerald-600 text-white border-2 border-emerald-500 shadow-xs'
              statusBadge = (
                <span className="rounded bg-emerald-100 px-1.5 py-0.2 text-[9px] font-bold text-emerald-800">
                  ✓ Hoàn tất
                </span>
              )
            } else if (isCurrent) {
              if (isBlockedStage) {
                circleClass = isSelected
                  ? 'bg-rose-600 text-white border-2 border-white ring-4 ring-rose-500 ring-offset-2 shadow-lg animate-pulse'
                  : 'bg-rose-600 text-white border-2 border-rose-200 ring-2 ring-rose-500 shadow-md animate-pulse'
                statusBadge = (
                  <span className="rounded bg-rose-100 px-1.5 py-0.2 text-[9px] font-bold text-rose-800">
                    ⚠️ Điểm nghẽn
                  </span>
                )
              } else {
                circleClass = isSelected
                  ? 'bg-[#033399] text-white border-2 border-white ring-4 ring-blue-500 ring-offset-2 shadow-lg'
                  : 'bg-[#033399] text-white border-2 border-blue-200 ring-2 ring-blue-500 shadow-md'
                statusBadge = (
                  <span className="rounded bg-blue-100 px-1.5 py-0.2 text-[9px] font-bold text-blue-800">
                    Đang xử lý
                  </span>
                )
              }
            }

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => onSelectStage(stage.id)}
                className="group relative z-10 flex flex-1 flex-col items-center text-center transition-all cursor-pointer focus:outline-hidden hover:opacity-95"
              >
                {/* Stage Circle */}
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-xs font-black transition-all ${circleClass}`}
                >
                  {isCompleted ? (
                    <span className="text-base">✓</span>
                  ) : isBlockedStage ? (
                    <span className="text-base">!</span>
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                {/* Week Label Tag */}
                <span
                  className={`mt-2 rounded px-2 py-0.5 text-[10px] font-bold ${
                    isSelected
                      ? 'bg-[#033399] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {stage.weekLabel}
                </span>

                {/* Dynamic Calculated Date Milestone */}
                <span className="mt-0.5 font-mono text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200">
                  {sched?.targetDateFormatted}
                </span>

                {/* Title */}
                <p
                  className={`mt-1 text-[11px] font-bold leading-tight line-clamp-2 max-w-[105px] ${
                    isCurrent
                      ? 'text-blue-950 font-extrabold'
                      : isCompleted
                      ? 'text-slate-800'
                      : 'text-slate-500'
                  }`}
                >
                  {stage.title}
                </p>

                {/* Status Badge */}
                <div className="mt-1">{statusBadge}</div>

                {/* Missing docs alert tag if any */}
                {missingCount > 0 && (
                  <span className="mt-1 rounded-full bg-rose-50 border border-rose-200 px-1.5 py-0.2 text-[9px] font-bold text-rose-700">
                    Thiếu {missingCount} giấy tờ
                  </span>
                )}

                {/* Active arrow pointer when selected */}
                {isSelected && (
                  <div className="mt-1.5 h-0 w-0 border-x-6 border-x-transparent border-b-6 border-b-[#033399]" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
