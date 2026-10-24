import { useMemo, useState } from 'react'
import {
  WEEK_STAGES,
  type DossierItem,
  type WeekStageId,
} from '../types/schema'

interface StageDossierDetailProps {
  allDossierItems: Record<WeekStageId, DossierItem[]>
  activeStageId: WeekStageId
  effectiveCurrentStageId: WeekStageId
  studentName: string
  studentCode: string
  enrollmentDate?: string
  onToggleStatus?: (docId: string, stageId: WeekStageId) => void
}

export default function StageDossierDetail({
  allDossierItems,
  activeStageId,
  effectiveCurrentStageId,
  studentName,
  studentCode,
  onToggleStatus,
}: StageDossierDetailProps) {
  const [viewFilter, setViewFilter] = useState<'ALL_STAGES' | WeekStageId>('ALL_STAGES')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'MISSING' | 'COMPLETED'>('ALL')

  // Calculate overall metrics across ALL stages
  const allDocsFlat = useMemo(() => {
    const list: (DossierItem & { parentStageId: WeekStageId })[] = []
    for (const stage of WEEK_STAGES) {
      const items = allDossierItems[stage.id] || []
      for (const item of items) {
        list.push({ ...item, parentStageId: stage.id })
      }
    }
    return list
  }, [allDossierItems])

  const totalOverallCount = allDocsFlat.length
  const totalOverallCompleted = allDocsFlat.filter((i) => i.status === 'COMPLETED').length
  const totalOverallMissing = allDocsFlat.filter((i) => i.status === 'MISSING').length

  // Calculate metrics for the active / focused stage
  const activeStageItems = allDossierItems[activeStageId] || []
  const activeStageTotal = activeStageItems.length
  const activeStageCompleted = activeStageItems.filter((i) => i.status === 'COMPLETED').length
  const activeStagePercent = activeStageTotal > 0 ? Math.round((activeStageCompleted / activeStageTotal) * 100) : 0

  const activeStageDef = WEEK_STAGES.find((s) => s.id === activeStageId) || WEEK_STAGES[0]
  const effectiveStageDef = WEEK_STAGES.find((s) => s.id === effectiveCurrentStageId) || WEEK_STAGES[0]

  // Format category badge
  const getCategoryLabel = (category: DossierItem['category']) => {
    switch (category) {
      case 'GOC':
        return { label: 'Bản gốc', bg: 'bg-slate-100 text-slate-700' }
      case 'CONG_CHUNG':
        return { label: 'Dịch thuật công chứng', bg: 'bg-indigo-100 text-indigo-800' }
      case 'HOP_PHAP_HOA':
        return { label: 'Tem Hợp pháp hóa', bg: 'bg-blue-100 text-blue-800' }
      case 'TAI_CHINH':
        return { label: 'Hồ sơ tài chính', bg: 'bg-amber-100 text-amber-900 border border-amber-300' }
      case 'Y_TE':
        return { label: 'Y tế / Khám lao', bg: 'bg-rose-100 text-rose-800 border border-rose-300' }
      case 'BIEU_MAU':
        return { label: 'Biểu mẫu hồ sơ', bg: 'bg-teal-100 text-teal-800' }
      default:
        return { label: category, bg: 'bg-slate-100 text-slate-700' }
    }
  }

  // Stages to render in the table
  const stagesToRender = useMemo(() => {
    if (viewFilter === 'ALL_STAGES') {
      return WEEK_STAGES
    }
    return WEEK_STAGES.filter((s) => s.id === viewFilter)
  }, [viewFilter])

  return (
    <div className="rounded-2xl border-2 border-indigo-300 bg-white shadow-md overflow-hidden transition-all space-y-0">
      {/* Stage Detail Header Banner */}
      <div className="bg-gradient-to-r from-[#033399] via-indigo-950 to-slate-900 p-5 text-white">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-indigo-500 px-2.5 py-1 text-xs font-black uppercase text-white shadow-xs">
                Toàn bộ hồ sơ
              </span>
              <h4 className="text-base font-bold sm:text-lg">
                Khung Hồ Sơ Chi Tiết: {studentName} ({studentCode})
              </h4>
            </div>
            <p className="mt-1 text-xs text-sky-200">
              Quy tắc tự động: Giấy tờ còn thiếu ("THIẾU") tự động nhảy lên đầu • Hoàn thành 100% tiến độ hiện tại ({effectiveStageDef.weekLabel}) mới chuyển sang tiến độ tiếp theo
            </p>
          </div>

          {/* DÒNG TIẾN ĐỘ THEO YÊU CẦU: DÒNG 1: Tiến độ hồ sơ: X/Y - DÒNG 2: Tiến độ giai đoạn */}
          <div className="rounded-xl bg-white/10 border border-white/20 p-3 text-right space-y-1">
            {/* DÒNG NẰM Ở TRÊN THEO YÊU CẦU */}
            <p className="text-sm font-black text-amber-300 tracking-wide">
              Tiến độ hồ sơ: {totalOverallCompleted}/{totalOverallCount}
            </p>
            {/* DÒNG NẰM Ở DƯỚI THEO YÊU CẦU */}
            <p className="text-xs font-semibold text-sky-100">
              Tiến độ giai đoạn [{activeStageDef.weekLabel}]: {activeStageCompleted}/{activeStageTotal} giấy tờ ({activeStagePercent}%)
            </p>
          </div>
        </div>

        {/* Status Notice about Progression Rule */}
        <div className="mt-3.5 rounded-xl bg-white/10 border border-white/15 p-2.5 text-xs text-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-base">📌</span>
            <span>
              <strong>Tiến độ chính thức hiện tại:</strong>{' '}
              <span className="rounded bg-indigo-500/80 px-2 py-0.5 text-white font-bold">
                [{effectiveStageDef.weekLabel}] {effectiveStageDef.title}
              </span>
              {' '}&bull; Nếu nộp trước giấy tờ ở giai đoạn sau, hệ thống vẫn ghi nhận hoàn thành nhưng tiến độ chỉ chuyển khi giai đoạn hiện tại đủ 100%.
            </span>
          </div>
          {totalOverallMissing > 0 && (
            <span className="rounded-full bg-rose-500 text-white font-black text-[10px] px-2.5 py-1 shrink-0 animate-pulse">
              Tổng cộng còn thiếu {totalOverallMissing} giấy tờ
            </span>
          )}
        </div>

        {/* View Switcher: All stages or specific stage */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-sky-200 font-semibold mr-1">Chế độ xem:</span>
            <button
              type="button"
              onClick={() => setViewFilter('ALL_STAGES')}
              className={`rounded-lg px-2.5 py-1 font-bold transition-all cursor-pointer ${
                viewFilter === 'ALL_STAGES'
                  ? 'bg-white text-[#033399] shadow-xs'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              Show hết toàn bộ 7 giai đoạn ({totalOverallCount} giấy tờ)
            </button>
            {WEEK_STAGES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setViewFilter(s.id)}
                className={`rounded-lg px-2.5 py-1 font-bold transition-all cursor-pointer ${
                  viewFilter === s.id
                    ? 'bg-white text-[#033399] shadow-xs'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                {s.weekLabel}
              </button>
            ))}
          </div>

          {/* Quick Filter: All vs Missing */}
          <div className="flex items-center gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setStatusFilter('ALL')}
              className={`rounded-lg px-2.5 py-1 font-bold transition-all cursor-pointer ${
                statusFilter === 'ALL'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              Tất cả
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('MISSING')}
              className={`rounded-lg px-2.5 py-1 font-bold transition-all cursor-pointer ${
                statusFilter === 'MISSING'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-white/10 text-rose-300 hover:bg-white/20'
              }`}
            >
              Chỉ xem THIẾU ({totalOverallMissing})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('COMPLETED')}
              className={`rounded-lg px-2.5 py-1 font-bold transition-all cursor-pointer ${
                statusFilter === 'COMPLETED'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'bg-white/10 text-emerald-300 hover:bg-white/20'
              }`}
            >
              Đã Hoàn Thành ({totalOverallCompleted})
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BẢNG CHI TIẾT HỒ SƠ: THIẾU NHẢY LÊN ĐẦU • CÓ CỘT DRIVE • CỘT TRẠNG THÁI */}
      {/* ========================================================================= */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-3 w-12 text-center">STT</th>
              <th className="py-3 px-3 min-w-[240px]">Hạng mục Giấy tờ</th>
              <th className="py-3 px-3 min-w-[130px]">Phân loại</th>
              {/* CỘT DRIVE THEO YÊU CẦU */}
              <th className="py-3 px-3 text-center min-w-[100px]">Drive</th>
              {/* CỘT TRẠNG THÁI THEO YÊU CẦU */}
              <th className="py-3 px-3 min-w-[140px]">Trạng thái</th>
              <th className="py-3 px-3 min-w-[120px]">Deadline bổ sung</th>
              <th className="py-3 px-3 min-w-[140px]">Quy định bởi</th>
              <th className="py-3 px-3 min-w-[180px]">Ghi chú & Hướng xử lý</th>
              <th className="py-3 px-3 text-center min-w-[120px]">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {stagesToRender.map((stage) => {
              const rawItems = allDossierItems[stage.id] || []

              // Lọc theo status filter
              const filtered = rawItems.filter((i) => {
                if (statusFilter === 'ALL') return true
                return i.status === statusFilter
              })

              // QUY TẮC: CÁC GIẤY TỜ THIẾU TỰ ĐỘNG NHẢY LÊN ĐẦU TIÊN
              const sortedItems = [...filtered].sort((a, b) => {
                if (a.status === 'MISSING' && b.status !== 'MISSING') return -1
                if (a.status !== 'MISSING' && b.status === 'MISSING') return 1
                if (a.status === 'PENDING' && b.status === 'COMPLETED') return -1
                if (a.status === 'COMPLETED' && b.status === 'PENDING') return 1
                return 0
              })

              if (sortedItems.length === 0 && statusFilter !== 'ALL') return null

              const stageMissingCount = rawItems.filter((i) => i.status === 'MISSING').length
              const isCurrentEffective = stage.id === effectiveCurrentStageId
              const isActiveSelected = stage.id === activeStageId

              return (
                <div key={stage.id} className="contents">
                  {/* Stage Group Header Divider */}
                  <tr
                    id={`stage-section-${stage.id}`}
                    className={`border-t-2 border-b font-bold ${
                      isActiveSelected
                        ? 'bg-blue-50/90 border-blue-300 text-[#033399]'
                        : isCurrentEffective
                        ? 'bg-indigo-50/80 border-indigo-200 text-slate-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <td colSpan={9} className="py-2.5 px-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded px-2 py-0.5 text-[10px] font-black uppercase text-white ${
                              isActiveSelected ? 'bg-[#033399]' : 'bg-slate-700'
                            }`}
                          >
                            {stage.weekLabel}
                          </span>
                          <span className="text-xs font-bold text-slate-900">
                            {stage.title}
                          </span>
                          {isCurrentEffective && (
                            <span className="rounded-full bg-blue-100 text-[#033399] border border-blue-300 px-2 py-0.2 text-[9px] font-bold">
                              ★ TIẾN ĐỘ HIỆN TẠI
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 text-[11px] font-normal text-slate-600">
                          <span>Phụ trách: <strong>{stage.responsibleUnit}</strong></span>
                          <span>&bull;</span>
                          <span>
                            Hoàn thành: <strong>{rawItems.filter((i) => i.status === 'COMPLETED').length}/{rawItems.length}</strong>
                          </span>
                          {stageMissingCount > 0 && (
                            <span className="rounded bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 border border-rose-300 text-[10px]">
                              Thiếu {stageMissingCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Document Items in this stage */}
                  {sortedItems.map((doc, idx) => {
                    const cat = getCategoryLabel(doc.category)
                    const isMissing = doc.status === 'MISSING'
                    const isCompleted = doc.status === 'COMPLETED'

                    return (
                      <tr
                        key={doc.docId}
                        className={`transition-colors ${
                          isMissing
                            ? 'bg-rose-50/50 hover:bg-rose-100/60'
                            : isCompleted
                            ? 'hover:bg-slate-50'
                            : 'bg-amber-50/30 hover:bg-amber-50'
                        }`}
                      >
                        {/* STT */}
                        <td className="py-3 px-3 text-center font-mono font-bold text-slate-500">
                          {idx + 1}
                        </td>

                        {/* Tên giấy tờ */}
                        <td className="py-3 px-3">
                          <p className="font-bold text-slate-900 leading-snug">
                            {doc.name}
                          </p>
                          <span className="font-mono text-[10px] text-slate-400">
                            {doc.docId}
                          </span>
                        </td>

                        {/* Phân loại */}
                        <td className="py-3 px-3">
                          <span
                            className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${cat.bg}`}
                          >
                            {cat.label}
                          </span>
                        </td>

                        {/* CỘT DRIVE THEO YÊU CẦU: NÚT BẤM MỞ FILE */}
                        <td className="py-3 px-3 text-center">
                          <a
                            href={`https://drive.google.com/drive/search?q=${encodeURIComponent(
                              `${studentCode}_${doc.docId}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-[#033399] border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors shadow-2xs cursor-pointer"
                            title={`Mở file ${doc.name} trên Google Drive`}
                          >
                            <span>📁</span>
                            <span>Mở file</span>
                          </a>
                        </td>

                        {/* CỘT TRẠNG THÁI THEO YÊU CẦU:
                            - THIẾU: Hiện chữ 'THIẾU'
                            - ĐÃ NỘP: 'Hoàn Thành' ở hàng trên, ngày nộp ở hàng dưới */}
                        <td className="py-3 px-3">
                          {isMissing ? (
                            <span className="inline-block rounded-md bg-rose-600 px-2.5 py-1 text-xs font-black text-white shadow-2xs animate-pulse">
                              THIẾU
                            </span>
                          ) : isCompleted ? (
                            <div className="flex flex-col items-start leading-tight">
                              <span className="font-bold text-emerald-700 text-xs flex items-center gap-1">
                                <span>✓</span>
                                <span>Hoàn Thành</span>
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                                {doc.completedAt
                                  ? new Date(doc.completedAt).toLocaleDateString('vi-VN')
                                  : 'Đã nộp'}
                              </span>
                            </div>
                          ) : (
                            <span className="inline-block rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-300">
                              Đang xử lý
                            </span>
                          )}
                        </td>

                        {/* Deadline bổ sung */}
                        <td className="py-3 px-3">
                          <div className="font-mono text-xs font-bold">
                            <span
                              className={
                                isMissing
                                  ? 'text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded border border-rose-300 font-black'
                                  : 'text-slate-700'
                              }
                            >
                              {new Date(doc.deadline).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                          {isMissing && (
                            <p className="text-[9px] text-rose-600 font-bold mt-0.5">
                              ⚠️ Cần nộp gấp
                            </p>
                          )}
                        </td>

                        {/* Quy định bởi */}
                        <td className="py-3 px-3">
                          <span className="text-[11px] font-medium text-slate-600">
                            {doc.requiredBy}
                          </span>
                        </td>

                        {/* Ghi chú & Hướng xử lý */}
                        <td className="py-3 px-3">
                          {doc.note ? (
                            <p
                              className={`text-[11px] leading-tight ${
                                isMissing
                                  ? 'font-bold text-rose-900 bg-rose-100/70 p-1.5 rounded border border-rose-200'
                                  : 'text-slate-600'
                              }`}
                            >
                              {doc.note}
                            </p>
                          ) : (
                            <span className="text-slate-400 italic text-[10px]">
                              Quy chuẩn hồ sơ SHD Korea
                            </span>
                          )}
                        </td>

                        {/* Thao tác Toggle trạng thái */}
                        <td className="py-3 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => onToggleStatus?.(doc.docId, stage.id)}
                            className={`rounded-md px-2 py-1 text-[10px] font-bold transition-all cursor-pointer ${
                              isCompleted
                                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs'
                            }`}
                          >
                            {isCompleted ? 'Đổi sang Thiếu' : 'Thu nhận ✓'}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </div>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Rule Note */}
      <div className="bg-slate-50 border-t border-slate-200 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="text-base">💡</span>
          <span>
            Hệ thống tự động đồng bộ liên kết Google Drive theo từng hồ sơ. Mọi giấy tờ thiếu đều được tự động xếp ưu tiên lên đầu.
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-500">
          SHD Korea Document Engine v2.5
        </span>
      </div>
    </div>
  )
}
