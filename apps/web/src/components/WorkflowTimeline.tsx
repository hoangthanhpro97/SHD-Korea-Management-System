import { useState } from 'react'
import {
  STAGE_DEFINITIONS,
  type StageCode,
  type StageStatus,
} from '../types/schema'

interface WorkflowTimelineProps {
  currentStage: StageCode
  stageStatus: StageStatus
  interactive?: boolean
  selectedStage?: StageCode
  onSelectStage?: (stage: StageCode) => void
}

const STAGE_CODES: StageCode[] = [
  'ST01',
  'ST02',
  'ST03',
  'ST04',
  'ST05',
  'ST06',
  'ST07',
]

export default function WorkflowTimeline({
  currentStage,
  stageStatus,
  interactive = true,
  selectedStage: externalSelected,
  onSelectStage,
}: WorkflowTimelineProps) {
  const [internalSelected, setInternalSelected] = useState<StageCode>(currentStage)
  const activeView = externalSelected || internalSelected

  const currentIndex = STAGE_CODES.indexOf(currentStage)

  const handleStageClick = (code: StageCode) => {
    if (!interactive) return
    setInternalSelected(code)
    onSelectStage?.(code)
  }

  const selectedDef = STAGE_DEFINITIONS[activeView]

  return (
    <div className="w-full">
      {/* Visual Stepper */}
      <div className="relative flex items-center justify-between overflow-x-auto pb-4 pt-2">
        <div className="absolute left-6 right-6 top-6 h-1 -translate-y-1/2 bg-slate-200 hidden sm:block" />

        <div className="flex w-full min-w-[620px] justify-between gap-2 sm:gap-0">
          {STAGE_CODES.map((code, index) => {
            const def = STAGE_DEFINITIONS[code]
            const isCompleted = index < currentIndex
            const isCurrent = index === currentIndex
            const isSelected = activeView === code

            let circleClass = 'bg-slate-100 text-slate-400 border-2 border-slate-300'
            let statusLabel = 'Chưa bắt đầu'

            if (isCompleted) {
              circleClass = 'bg-emerald-600 text-white border-2 border-emerald-600 shadow-xs'
              statusLabel = 'Đã hoàn tất'
            } else if (isCurrent) {
              if (stageStatus === 'BLOCKED') {
                circleClass = 'bg-rose-500 text-white border-4 border-rose-200 ring-2 ring-rose-400 shadow-md'
                statusLabel = 'Điểm chặn'
              } else if (stageStatus === 'READY_FOR_REVIEW') {
                circleClass = 'bg-amber-500 text-white border-4 border-amber-200 ring-2 ring-amber-400 shadow-md'
                statusLabel = 'Chờ duyệt'
              } else {
                circleClass = 'bg-blue-600 text-white border-4 border-blue-200 ring-2 ring-blue-500 shadow-md animate-pulse'
                statusLabel = 'Đang xử lý'
              }
            }

            return (
              <button
                key={code}
                type="button"
                onClick={() => handleStageClick(code)}
                className={`group relative z-10 flex flex-col items-center focus:outline-hidden transition-all ${
                  interactive ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-xs font-bold transition-all transform ${circleClass} ${
                    isSelected ? 'scale-115 ring-3 ring-sky-500' : 'hover:scale-105'
                  }`}
                >
                  {isCompleted ? (
                    <span className="text-sm">✓</span>
                  ) : isCurrent && stageStatus === 'BLOCKED' ? (
                    <span className="text-sm">!</span>
                  ) : (
                    <span>{def.number}</span>
                  )}
                </div>

                <div className="mt-2 text-center max-w-[85px]">
                  <p
                    className={`text-xs font-bold truncate ${
                      isCurrent
                        ? 'text-blue-700 font-extrabold'
                        : isCompleted
                        ? 'text-slate-800'
                        : 'text-slate-500'
                    }`}
                  >
                    {code}
                  </p>
                  <p
                    className="text-[11px] leading-tight text-slate-600 line-clamp-2 mt-0.5"
                    title={def.title}
                  >
                    {def.title}
                  </p>
                  {isCurrent && (
                    <span
                      className={`inline-block mt-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${
                        stageStatus === 'BLOCKED'
                          ? 'bg-rose-100 text-rose-700'
                          : stageStatus === 'READY_FOR_REVIEW'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {statusLabel}
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Expanded Stage Information Drawer */}
      {selectedDef && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 transition-all">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-bold text-white">
                {selectedDef.code}
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900 sm:text-base">
                  Giai đoạn {selectedDef.number}: {selectedDef.title}
                </h4>
                <p className="text-xs text-slate-500">{selectedDef.subTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-medium text-slate-500">Đơn vị chủ trì:</span>
              <span className="rounded-md bg-white px-2 py-0.5 font-semibold text-slate-700 border border-slate-200 shadow-2xs">
                {selectedDef.responsibleUnit}
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Gating Rules (Điểm chặn kỹ thuật) */}
            <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-3.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-2">
                <span>🛡️</span>
                <span>Điểm chặn kỹ thuật (Gating Rules — SOP01/SOP02)</span>
              </div>
              <ul className="space-y-1.5 text-slate-700">
                {selectedDef.gatingRules.map((rule: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Checklist (Hồ sơ & Danh mục kiểm tra) */}
            <div className="rounded-lg border border-blue-200 bg-blue-50/60 p-3.5">
              <div className="flex items-center gap-1.5 font-bold text-blue-900 mb-2">
                <span>📋</span>
                <span>Danh mục hồ sơ & công việc chuẩn</span>
              </div>
              <ul className="space-y-1.5 text-slate-700">
                {selectedDef.keyChecklist.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
