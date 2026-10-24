import { useRef, useState } from 'react'
import { Link } from 'react-router'
import type { IntakeFlightPeriod } from '../types/schema'

interface IntakeFlightMonitorProps {
  intakePeriods: IntakeFlightPeriod[]
  selectedPeriodId?: string
  onSelectPeriod?: (periodId: string) => void
}

export default function IntakeFlightMonitor({
  intakePeriods,
  selectedPeriodId,
  onSelectPeriod,
}: IntakeFlightMonitorProps) {
  const [filterPeriod, setFilterPeriod] = useState<string>(selectedPeriodId || 'ALL')
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Sắp xếp theo thứ tự ưu tiên: Kỳ gần nhất và kỳ có cảnh báo xử lý gấp lên trước
  const prioritizedPeriods = [...intakePeriods].sort((a, b) => {
    const aUrgentScore = (a.delayWarnings?.length || 0) * 10
    const bUrgentScore = (b.delayWarnings?.length || 0) * 10
    const timeA = new Date(a.flightEstimatedDate).getTime()
    const timeB = new Date(b.flightEstimatedDate).getTime()
    // Kỳ gần nhất có điểm ưu tiên cao nhất
    return timeA - timeB - (aUrgentScore - bUrgentScore)
  })

  const displayedPeriods =
    filterPeriod === 'ALL'
      ? prioritizedPeriods
      : prioritizedPeriods.filter((p) => p.periodId === filterPeriod)

  // Tổng hợp chỉ tiêu toàn hệ thống
  const totalTargetKPI = intakePeriods.reduce((acc, p) => acc + p.targetKPI, 0)
  const totalActiveStudents = intakePeriods.reduce((acc, p) => acc + p.currentActive, 0)
  const totalWarnings = intakePeriods.reduce(
    (acc, p) => acc + (p.delayWarnings?.length || 0),
    0
  )

  return (
    <section className="space-y-4 w-full max-w-full min-w-0">
      {/* Top Banner / Summary */}
      <div className="rounded-2xl border-2 border-indigo-200 bg-gradient-to-r from-[#033399] via-indigo-900 to-slate-900 p-5 text-white shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 text-base font-bold">
                ✈️
              </span>
              <h2 className="text-lg font-bold md:text-xl">
                Trung Tâm Kiểm Soát Đồng Nhất Tiến Độ Các Kỳ Bay
              </h2>
            </div>
            <p className="mt-1 text-xs text-sky-200">
              Khung trượt ngang từ trái sang phải • Sắp xếp ưu tiên: Kỳ bay gần nhất và hồ sơ cần xử lý gấp đứng đầu
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="rounded-xl bg-white/10 px-3.5 py-2 border border-white/15">
              <span className="text-slate-300 block text-[11px]">Tổng chỉ tiêu hệ thống</span>
              <span className="text-base font-black text-amber-300">
                {totalActiveStudents} / {totalTargetKPI} Học viên
              </span>
            </div>
            <div className="rounded-xl bg-rose-500/20 px-3.5 py-2 border border-rose-400/30">
              <span className="text-rose-200 block text-[11px]">Cảnh báo nguy cơ delay</span>
              <span className="text-base font-black text-rose-300">
                {totalWarnings} Hồ sơ cần xử lý gấp
              </span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-white/10 pt-3">
          <span className="text-xs text-sky-200 font-semibold mr-1">Lọc nhanh:</span>
          <button
            type="button"
            onClick={() => setFilterPeriod('ALL')}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              filterPeriod === 'ALL'
                ? 'bg-white text-[#033399] shadow-xs'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            Tất cả 5 kỳ bay ({intakePeriods.length})
          </button>
          {prioritizedPeriods.map((p, idx) => (
            <button
              key={p.periodId}
              type="button"
              onClick={() => setFilterPeriod(p.periodId)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                filterPeriod === p.periodId
                  ? 'bg-white text-[#033399] shadow-xs'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              {p.name} {idx === 0 ? '🔥' : ''}
              {p.delayWarnings?.length > 0 && (
                <span className="ml-1 rounded-full bg-rose-500 px-1.5 py-0.2 text-[10px] text-white">
                  {p.delayWarnings.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ======================================================================= */}
      {/* KHUNG TRƯỢT NGANG TỪ TRÁI SANG PHẢI GÓI GỌN CÁC KỲ BAY THEO YÊU CẦU    */}
      {/* ======================================================================= */}
      <div className="rounded-2xl border-2 border-indigo-200 bg-slate-100/70 p-4 shadow-inner w-full max-w-full min-w-0 overflow-hidden">
        <div className="flex items-center justify-between mb-3 px-1 text-xs text-slate-600 font-semibold">
          <span className="flex items-center gap-2">
            <span>👉</span>
            <span>Khung hiển thị tuần tự theo mức độ ưu tiên từ gần nhất (Trái) sang kế tiếp (Phải)</span>
          </span>
          <span className="text-[11px] text-slate-500">
            Tổng cộng: {displayedPeriods.length} kỳ bay
          </span>
        </div>

        {/* The horizontal track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth w-full max-w-full scrollbar-thin"
          style={{ overscrollBehaviorX: 'contain' }}
        >
          {displayedPeriods.map((period, index) => {
            const isFirst = index === 0 && filterPeriod === 'ALL'
            const hasUrgent = period.delayWarnings?.some((w) => w.warningType === 'URGENT')
            const percentKPI = Math.min(
              100,
              Math.round((period.currentActive / period.targetKPI) * 100)
            )

            // Dynamic Priority Tag
            let priorityBadge = (
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                Ưu tiên {index + 1}
              </span>
            )
            if (isFirst) {
              priorityBadge = (
                <span className="rounded-md bg-rose-600 px-2.5 py-0.5 text-[10px] font-black uppercase text-white shadow-xs animate-pulse">
                  🔥 ƯU TIÊN SỐ 1 • KỲ GẦN NHẤT & XỬ LÝ GẤP
                </span>
              )
            } else if (hasUrgent) {
              priorityBadge = (
                <span className="rounded-md bg-rose-500 px-2 py-0.5 text-[10px] font-black uppercase text-white shadow-xs">
                  ⚠️ ƯU TIÊN {index + 1} • CẦN XỬ LÝ GẤP
                </span>
              )
            } else if (period.delayWarnings?.length > 0) {
              priorityBadge = (
                <span className="rounded-md bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white shadow-xs">
                  ⚠️ ƯU TIÊN {index + 1} • CÓ CẢNH BÁO
                </span>
              )
            }

            return (
              <div
                key={period.periodId}
                className={`w-[480px] shrink-0 snap-start rounded-2xl border-2 bg-white p-5 shadow-xs transition-all hover:shadow-md ${
                  isFirst
                    ? 'border-indigo-500 ring-2 ring-indigo-200'
                    : 'border-slate-200'
                }`}
              >
                {/* Priority & Period Header */}
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {priorityBadge}
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                          period.isMainIntake
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {period.isMainIntake ? 'Kỳ chính' : 'Kỳ phụ'}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-slate-900 mt-1.5">
                      {period.name}
                    </h3>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                      <span>
                        ✈️ Bay: <strong className="text-slate-800">{new Date(period.flightEstimatedDate).toLocaleDateString('vi-VN')}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        📅 Hạn Visa: <strong className="text-rose-700 font-semibold">{new Date(period.visaDeadline).toLocaleDateString('vi-VN')}</strong>
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/cases?periodId=${period.periodId}`}
                    onClick={() => onSelectPeriod?.(period.periodId)}
                    className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-[#033399] border border-indigo-200 hover:bg-indigo-100 transition-colors cursor-pointer shrink-0"
                  >
                    Xem {period.currentActive} học viên →
                  </Link>
                </div>

                {/* 6 UNIFORM METRICS BOXES (HIỂN THỊ ĐỒNG NHẤT 100% THEO ĐỀ BÀI) */}
                <div className="mt-3.5 grid grid-cols-3 gap-2 text-xs">
                  {/* 1. Chỉ tiêu */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-2.5">
                    <span className="text-[10px] font-bold text-slate-500 block">
                      🎯 1. Chỉ tiêu
                    </span>
                    <p className="mt-1 text-base font-black text-slate-900">
                      {period.currentActive} <span className="text-[11px] font-normal text-slate-500">/ {period.targetKPI}</span>
                    </p>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full bg-[#033399] rounded-full"
                        style={{ width: `${percentKPI}%` }}
                      />
                    </div>
                  </div>

                  {/* 2. Hồ sơ trường 100% */}
                  <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-2.5">
                    <span className="text-[10px] font-bold text-blue-700 block">
                      🏫 2. HS trường 100%
                    </span>
                    <p className="mt-1 text-base font-black text-blue-900">
                      {period.schoolDossier100Count} <span className="text-[11px] font-normal text-blue-600">/ {period.currentActive}</span>
                    </p>
                    <span className="mt-0.5 inline-block text-[9px] text-blue-700 font-semibold">
                      Dịch & HPH xong
                    </span>
                  </div>

                  {/* 3. Đã có Invoice */}
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-2.5">
                    <span className="text-[10px] font-bold text-emerald-800 block">
                      🎓 3. Đã có Invoice
                    </span>
                    <p className="mt-1 text-base font-black text-emerald-700">
                      {period.invoiceReceivedCount} <span className="text-[11px] font-normal text-emerald-600">/ {period.currentActive}</span>
                    </p>
                    <span className="mt-0.5 inline-block text-[9px] text-emerald-700 font-semibold">
                      Thu phí Lần 2 (30M)
                    </span>
                  </div>

                  {/* 4. Hồ sơ Visa 100% */}
                  <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-2.5">
                    <span className="text-[10px] font-bold text-purple-700 block">
                      📑 4. HS Visa 100%
                    </span>
                    <p className="mt-1 text-base font-black text-purple-900">
                      {period.visaDossier100Count} <span className="text-[11px] font-normal text-purple-600">/ {period.currentActive}</span>
                    </p>
                    <span className="mt-0.5 inline-block text-[9px] text-purple-700 font-semibold">
                      Xong trước $\ge$ 3 ngày
                    </span>
                  </div>

                  {/* 5. Đang xin Visa */}
                  <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-2.5">
                    <span className="text-[10px] font-bold text-amber-800 block">
                      ⏳ 5. Đang xin Visa
                    </span>
                    <p className="mt-1 text-base font-black text-amber-700">
                      {period.applyingVisaCount} <span className="text-[11px] font-normal text-amber-600">/ {period.currentActive}</span>
                    </p>
                    <span className="mt-0.5 inline-block text-[9px] text-amber-700 font-semibold">
                      Có mã portal KVAC
                    </span>
                  </div>

                  {/* 6. Đã có Visa */}
                  <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-2.5">
                    <span className="text-[10px] font-bold text-teal-800 block">
                      ✈️ 6. Đã có Visa
                    </span>
                    <p className="mt-1 text-base font-black text-teal-700">
                      {period.visaGrantedCount} <span className="text-[11px] font-normal text-teal-600">/ {period.currentActive}</span>
                    </p>
                    <span className="mt-0.5 inline-block text-[9px] text-teal-700 font-semibold">
                      Thu Lần 3 (65M) & Bay
                    </span>
                  </div>
                </div>

                {/* 7. PHẦN CẢNH BÁO TIẾN ĐỘ CỦA HỌC VIÊN TRONG KỲ BAY */}
                <div className="mt-3.5 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span>🚨</span>
                      <span>7. Cảnh báo tiến độ học viên</span>
                    </span>
                    {period.delayWarnings?.length > 0 ? (
                      <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-800 border border-rose-200">
                        {period.delayWarnings.length} hồ sơ trễ hạn
                      </span>
                    ) : (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                        ✓ Đúng hạn
                      </span>
                    )}
                  </div>

                  {period.delayWarnings?.length > 0 ? (
                    <div className="space-y-2">
                      {period.delayWarnings.map((warning, wIdx) => (
                        <div
                          key={wIdx}
                          className="rounded-xl border border-rose-200 bg-rose-50/70 p-2.5 text-xs text-rose-950"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-1">
                            <p className="font-bold text-rose-900">
                              • {warning.studentName} ({warning.studentCode})
                            </p>
                            <span className="font-mono text-[10px] font-bold text-rose-700 bg-white px-1.5 py-0.2 rounded border border-rose-200">
                              Hạn: {new Date(warning.deadline).toLocaleDateString('vi-VN')}
                            </span>
                          </div>

                          <p className="mt-1 text-[11px] text-rose-900 font-medium leading-tight">
                            {warning.issueDescription}
                          </p>

                          <div className="mt-1 flex flex-wrap items-center gap-1">
                            <span className="text-[10px] font-bold text-rose-700">Thiếu:</span>
                            {warning.missingDocuments.map((doc, dIdx) => (
                              <span
                                key={dIdx}
                                className="rounded bg-rose-200/80 px-1.5 py-0.2 text-[9px] font-bold text-rose-950"
                              >
                                ✗ {doc}
                              </span>
                            ))}
                          </div>

                          <p className="mt-1 text-[10px] text-slate-700 italic border-t border-rose-200/60 pt-1">
                            👉 {warning.suggestedAction}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl bg-slate-50 border border-slate-200 p-2 text-center text-[10px] text-slate-500">
                      Không có cảnh báo. Toàn bộ hồ sơ đang bám sát tiến độ 7 giai đoạn.
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
