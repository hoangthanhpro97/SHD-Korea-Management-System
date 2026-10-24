import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import DemoBadge from '../components/DemoBadge'
import StageDossierDetail from '../components/StageDossierDetail'
import WeeklyTimelineStepper from '../components/WeeklyTimelineStepper'
import {
  CASES_BY_INTAKE_DATA,
  INTAKE_PERIODS_DATA,
  getSimulatedCohortForPeriod,
} from '../mocks/intake_management_mock'
import {
  WEEK_STAGES,
  type CaseByIntake,
  type DossierItem,
  type WeekStageId,
} from '../types/schema'

export default function CasesPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  // =========================================================================
  // 1. QUẢN LÝ KỲ BAY (LEVEL 1)
  // =========================================================================
  const initialPeriodId = searchParams.get('periodId') || INTAKE_PERIODS_DATA[0].periodId
  const [selectedPeriodId, setSelectedPeriodId] = useState<string>(initialPeriodId)

  // Chế độ mô phỏng nhóm 40 học viên theo yêu cầu
  const [useSimulatedCohort, setUseSimulatedCohort] = useState<boolean>(true)

  // Danh sách học viên thuộc kỳ bay đã chọn
  const studentsInSelectedPeriod = useMemo(() => {
    if (useSimulatedCohort) {
      return getSimulatedCohortForPeriod(selectedPeriodId, 40)
    }
    return CASES_BY_INTAKE_DATA.filter((c) => c.periodId === selectedPeriodId)
  }, [selectedPeriodId, useSimulatedCohort])

  // =========================================================================
  // 2. PHÂN TRANG DANH SÁCH HỌC VIÊN: 2 HÀNG x 4 CỘT = 8 HỌC VIÊN / TRANG
  // =========================================================================
  const STUDENTS_PER_PAGE = 8 // 2 hàng x 4 ô
  const [studentPage, setStudentPage] = useState<number>(0)

  const totalPages = Math.max(1, Math.ceil(studentsInSelectedPeriod.length / STUDENTS_PER_PAGE))
  const currentPagedStudents = useMemo(() => {
    const start = studentPage * STUDENTS_PER_PAGE
    return studentsInSelectedPeriod.slice(start, start + STUDENTS_PER_PAGE)
  }, [studentsInSelectedPeriod, studentPage])

  // 3. HỌC VIÊN ĐƯỢC CHỌN (LEVEL 2)
  const initialCaseId = searchParams.get('caseId')
  const defaultCase =
    studentsInSelectedPeriod.find((c) => c.caseId === initialCaseId) ||
    studentsInSelectedPeriod[0] ||
    CASES_BY_INTAKE_DATA[0]

  const [selectedCaseId, setSelectedCaseId] = useState<string>(defaultCase.caseId)

  // Tìm đối tượng học viên hiện tại
  const currentCase: CaseByIntake = useMemo(() => {
    return (
      studentsInSelectedPeriod.find((c) => c.caseId === selectedCaseId) ||
      CASES_BY_INTAKE_DATA.find((c) => c.caseId === selectedCaseId) ||
      studentsInSelectedPeriod[0] ||
      CASES_BY_INTAKE_DATA[0]
    )
  }, [selectedCaseId, studentsInSelectedPeriod])

  // 4. MỐC THỜI GIAN TỰ ĐỘNG THEO NGÀY NHẬP HỌC (THAY VÌ MỐC TUẦN THUẦN TÚY)
  const [enrollmentDates, setEnrollmentDates] = useState<Record<string, string>>({
    [currentCase.caseId]: '2027-01-01',
  })
  const currentEnrollmentDate = enrollmentDates[currentCase.caseId] || '2027-01-01'

  const handleEnrollmentDateChange = (newDate: string) => {
    setEnrollmentDates((prev) => ({
      ...prev,
      [currentCase.caseId]: newDate,
    }))
  }

  // Quản lý trạng thái động của hồ sơ (cho phép toggle thử nghiệm ngay trên UI)
  const [customDossierState, setCustomDossierState] = useState<
    Record<string, Record<WeekStageId, DossierItem[]>>
  >({})

  const currentDossierItems: Record<WeekStageId, DossierItem[]> = useMemo(() => {
    return customDossierState[currentCase.caseId] || currentCase.dossierItems
  }, [customDossierState, currentCase])

  // =========================================================================
  // 5. QUY TẮC NGHIỆP VỤ TỰ ĐỘNG CHUYỂN TIẾN ĐỘ THEO YÊU CẦU:
  // "phải hoàn thành hết các giấy tờ cần thiết ở tiến độ hiện tại đó tự động
  // chuyển sang tiến độ tiếp theo. Nếu học viên nộp trước giấy tờ thuộc tiến độ
  // tiếp theo, vẫn cập nhật hoàn thành giấy tờ đó, nhưng tiến độ không được cập nhật."
  // =========================================================================
  const effectiveCurrentStage: WeekStageId = useMemo(() => {
    for (const stage of WEEK_STAGES) {
      const items = currentDossierItems[stage.id] || []
      // Nếu còn bất kỳ giấy tờ nào trong giai đoạn này chưa hoàn thành -> Giai đoạn chính thức là giai đoạn này!
      const hasIncomplete = items.some((item) => item.status !== 'COMPLETED')
      if (hasIncomplete) {
        return stage.id
      }
    }
    return 'W19_20'
  }, [currentDossierItems])

  const effectiveStageStatus: 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED' = useMemo(() => {
    const items = currentDossierItems[effectiveCurrentStage] || []
    const hasMissing = items.some((i) => i.status === 'MISSING')
    if (hasMissing) return 'BLOCKED'
    if (effectiveCurrentStage === 'W19_20' && items.every((i) => i.status === 'COMPLETED')) {
      return 'COMPLETED'
    }
    return 'IN_PROGRESS'
  }, [currentDossierItems, effectiveCurrentStage])

  // Giai đoạn tuần được click chọn để highlight/xem chi tiết
  const [selectedStageId, setSelectedStageId] = useState<WeekStageId>(
    effectiveCurrentStage || 'W01_02'
  )

  // Xử lý chọn kỳ bay
  const handleSelectPeriod = (periodId: string) => {
    setSelectedPeriodId(periodId)
    setStudentPage(0)
    const list = useSimulatedCohort
      ? getSimulatedCohortForPeriod(periodId, 40)
      : CASES_BY_INTAKE_DATA.filter((c) => c.periodId === periodId)
    const firstInPeriod = list[0]
    if (firstInPeriod) {
      setSelectedCaseId(firstInPeriod.caseId)
      setSelectedStageId(firstInPeriod.currentStageId)
      setSearchParams({ periodId, caseId: firstInPeriod.caseId })
    } else {
      setSearchParams({ periodId })
    }
  }

  // Xử lý chọn học viên
  const handleSelectCase = (caseId: string) => {
    setSelectedCaseId(caseId)
    const targetCase = studentsInSelectedPeriod.find((c) => c.caseId === caseId)
    if (targetCase) {
      setSelectedStageId(targetCase.currentStageId)
      setSearchParams({ periodId: targetCase.periodId, caseId: targetCase.caseId })
    }
  }

  // Toggle trạng thái hoàn thành của 1 giấy tờ
  const handleToggleDocStatus = (docId: string, stageId: WeekStageId) => {
    const studentItems = { ...currentDossierItems }
    const stageItems = [...(studentItems[stageId] || [])]
    const docIdx = stageItems.findIndex((d) => d.docId === docId)

    if (docIdx !== -1) {
      const doc = stageItems[docIdx]
      const newStatus = doc.status === 'COMPLETED' ? 'MISSING' : 'COMPLETED'
      stageItems[docIdx] = {
        ...doc,
        status: newStatus,
        completedAt: newStatus === 'COMPLETED' ? new Date().toISOString().split('T')[0] : undefined,
      }
      studentItems[stageId] = stageItems

      setCustomDossierState((prev) => ({
        ...prev,
        [currentCase.caseId]: studentItems,
      }))
    }
  }

  const selectedPeriodObj =
    INTAKE_PERIODS_DATA.find((p) => p.periodId === selectedPeriodId) ||
    INTAKE_PERIODS_DATA[0]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Quản lý Hồ sơ Du học theo Kỳ bay & 7 Giai đoạn
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Hệ sinh thái tự động: Xét mốc ngày theo ngày nhập học • Khóa tiến độ thông minh • Danh sách tối ưu cho 40–100 học viên (2 hàng x 4 ô)
          </p>
        </div>
        <DemoBadge />
      </div>

      {/* ======================================================== */}
      {/* LEVEL 1: BỘ CHỌN KỲ BAY                                 */}
      {/* ======================================================== */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <span>✈️</span>
            <span>Bước 1: Chọn Kỳ bay quản lý</span>
          </span>
          <span className="text-xs text-slate-500">
            Hiển thị 5 kỳ bay năm 2026–2027
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {INTAKE_PERIODS_DATA.map((period) => {
            const isSelected = period.periodId === selectedPeriodId
            const studentCount = useSimulatedCohort
              ? 40
              : CASES_BY_INTAKE_DATA.filter((c) => c.periodId === period.periodId).length
            const hasWarning = period.delayWarnings && period.delayWarnings.length > 0

            return (
              <button
                key={period.periodId}
                type="button"
                onClick={() => handleSelectPeriod(period.periodId)}
                className={`relative rounded-2xl p-4 text-left transition-all cursor-pointer border-2 shadow-2xs ${
                  isSelected
                    ? 'border-[#033399] bg-white ring-4 ring-indigo-100 shadow-md scale-[1.02]'
                    : 'border-slate-200 bg-white/80 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                      period.isMainIntake
                        ? 'bg-blue-100 text-[#033399]'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {period.isMainIntake ? 'Kỳ chính' : 'Kỳ phụ'}
                  </span>
                  {hasWarning && (
                    <span className="rounded-full bg-rose-500 px-1.5 py-0.2 text-[10px] font-bold text-white animate-pulse">
                      ! Cảnh báo
                    </span>
                  )}
                </div>

                <h3 className="mt-2 text-sm font-black text-slate-900 leading-tight">
                  {period.name}
                </h3>

                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">Học viên:</span>
                  <span className="font-bold text-[#033399] text-sm">
                    {studentCount} Học viên
                  </span>
                </div>

                <div className="mt-1.5 border-t border-slate-100 pt-1.5 text-[10px] text-slate-500 space-y-0.5">
                  <p>
                    Bay: <strong>{new Date(period.flightEstimatedDate).toLocaleDateString('vi-VN')}</strong>
                  </p>
                  <p>
                    Hạn Visa: <strong className="text-rose-600">{new Date(period.visaDeadline).toLocaleDateString('vi-VN')}</strong>
                  </p>
                </div>

                {isSelected && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#033399] rotate-45 transform" />
                )}
              </button>
            )
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* LEVEL 2: DANH SÁCH HỌC VIÊN TRƯỢT NGANG (2 HÀNG x 4 Ô = 8 Ô / TRANG)     */}
      {/* ========================================================================= */}
      <section className="rounded-2xl border-2 border-indigo-200 bg-white p-4 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#033399] text-white font-bold text-xs">
              👥
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Bước 2: Danh sách học viên {selectedPeriodObj.name} ({studentsInSelectedPeriod.length} học viên)
              </h2>
              <p className="text-[11px] text-slate-500">
                Khung hiển thị dạng 2 hàng x 4 ô (8 học viên/trang) — Tối ưu cho quy mô 40 đến 100 học viên
              </p>
            </div>
          </div>

          {/* Controls: Pagination for the 2x4 grid & Cohort mode */}
          <div className="flex items-center gap-3 text-xs">
            {/* Toggle Cohort size */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setUseSimulatedCohort(true)
                  setStudentPage(0)
                }}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                  useSimulatedCohort ? 'bg-white text-[#033399] shadow-xs' : 'text-slate-600'
                }`}
              >
                Mô phỏng 40 HV (5 trang)
              </button>
              <button
                type="button"
                onClick={() => {
                  setUseSimulatedCohort(false)
                  setStudentPage(0)
                }}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                  !useSimulatedCohort ? 'bg-white text-[#033399] shadow-xs' : 'text-slate-600'
                }`}
              >
                Dữ liệu gốc ({CASES_BY_INTAKE_DATA.filter((c) => c.periodId === selectedPeriodId).length} HV)
              </button>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={studentPage === 0}
                onClick={() => setStudentPage((p) => Math.max(0, p - 1))}
                className={`flex h-8 w-8 items-center justify-center rounded-lg border font-bold transition-all ${
                  studentPage === 0
                    ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer'
                }`}
                title="Trang trước"
              >
                ◀
              </button>

              <span className="font-mono text-xs font-bold text-slate-700 px-2">
                Trang {studentPage + 1}/{totalPages}
              </span>

              <button
                type="button"
                disabled={studentPage >= totalPages - 1}
                onClick={() => setStudentPage((p) => Math.min(totalPages - 1, p + 1))}
                className={`flex h-8 w-8 items-center justify-center rounded-lg border font-bold transition-all ${
                  studentPage >= totalPages - 1
                    ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer'
                }`}
                title="Trang sau"
              >
                ▶
              </button>
            </div>
          </div>
        </div>

        {/* 2 ROWS x 4 COLUMNS GRID = 8 TILES PER VIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {currentPagedStudents.map((student) => {
            const isSelected = student.caseId === currentCase.caseId
            const stageDef = WEEK_STAGES.find((s) => s.id === student.currentStageId)
            const isBlocked = student.stageStatus === 'BLOCKED'

            return (
              <button
                key={student.caseId}
                type="button"
                onClick={() => handleSelectCase(student.caseId)}
                className={`rounded-xl p-3 text-left transition-all cursor-pointer border-2 ${
                  isSelected
                    ? 'border-[#033399] bg-blue-50/60 ring-3 ring-blue-100 shadow-sm scale-[1.01]'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="truncate">
                    <span className="font-mono text-[10px] font-bold text-[#033399] bg-white px-1.5 py-0.2 rounded border border-blue-200">
                      {student.studentCode}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 mt-1 truncate">
                      {student.studentName}
                    </h4>
                  </div>

                  {isBlocked ? (
                    <span className="rounded-full bg-rose-100 text-rose-800 text-[9px] font-bold px-1.5 py-0.2 border border-rose-300 animate-pulse shrink-0">
                      ⚠️ Cảnh báo
                    </span>
                  ) : student.currentStageId === 'W19_20' ? (
                    <span className="rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 shrink-0">
                      ✓ Xuất cảnh
                    </span>
                  ) : (
                    <span className="rounded-full bg-blue-100 text-[#033399] text-[9px] font-bold px-1.5 py-0.2 shrink-0">
                      Đang xử lý
                    </span>
                  )}
                </div>

                <p className="mt-1.5 text-[11px] font-semibold text-slate-700 truncate">
                  {student.targetSchool}
                </p>
                <p className="text-[10px] text-slate-500 truncate">
                  {student.targetMajor}
                </p>

                <div className="mt-2 border-t border-slate-100 pt-1.5 flex items-center justify-between text-[10px]">
                  <span className="text-slate-500">Mốc:</span>
                  <span className="font-bold text-[#033399]">
                    [{stageDef?.weekLabel}]
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Page Jump Pills */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 pt-2 border-t border-slate-100 text-xs">
            <span className="text-[11px] text-slate-500 mr-1">Chuyển trang:</span>
            {Array.from({ length: totalPages }).map((_, pIdx) => (
              <button
                key={pIdx}
                type="button"
                onClick={() => setStudentPage(pIdx)}
                className={`h-6 w-6 rounded-md font-mono text-xs font-bold transition-all cursor-pointer ${
                  studentPage === pIdx
                    ? 'bg-[#033399] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {pIdx + 1}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* BANNER THÔNG TIN HỌC VIÊN & LỆNH TỰ ĐỘNG XÉT MỐC THỜI GIAN */}
      {/* ======================================================== */}
      <section className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#033399] text-white font-black text-lg shadow-sm">
              {currentCase.studentName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs font-bold text-slate-700">
                  {currentCase.studentCode}
                </span>
                <h2 className="text-lg font-bold text-slate-900 md:text-xl">
                  {currentCase.studentName}
                </h2>
                <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-[#033399] border border-indigo-200">
                  {currentCase.intakeName}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-600">
                Trường mục tiêu: <strong className="text-slate-900">{currentCase.targetSchool}</strong> ({currentCase.targetMajor}) • SĐT: {currentCase.phone}
              </p>
            </div>
          </div>

          {/* LỆNH TỰ ĐỘNG XÉT MỐC THỜI GIAN THEO NGÀY NHẬP HỌC THEO YÊU CẦU */}
          <div className="rounded-xl border-2 border-indigo-200 bg-indigo-50/60 p-3 text-xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-[#033399]">
              <span>📅</span>
              <span>Lệnh tự động xét mốc thời gian:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label htmlFor="enrollment-date-input" className="text-slate-600 font-semibold">
                Ngày nhập học:
              </label>
              <input
                id="enrollment-date-input"
                type="date"
                value={currentEnrollmentDate}
                onChange={(e) => handleEnrollmentDateChange(e.target.value)}
                className="rounded-lg border border-indigo-300 bg-white px-2 py-1 font-mono font-bold text-[#033399] focus:outline-hidden"
              />
              <div className="flex items-center gap-1 text-[10px]">
                <button
                  type="button"
                  onClick={() => handleEnrollmentDateChange('2027-01-01')}
                  className="rounded bg-white border border-slate-200 px-1.5 py-0.5 font-mono font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  01/01/2027
                </button>
                <button
                  type="button"
                  onClick={() => handleEnrollmentDateChange('2026-09-01')}
                  className="rounded bg-white border border-slate-200 px-1.5 py-0.5 font-mono font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  01/09/2026
                </button>
              </div>
            </div>
            <p className="text-[10px] text-slate-500">
              👉 Khi thay đổi ngày, mốc ngày hoàn thành các tuần tiếp theo sẽ tự động được cập nhật.
            </p>
          </div>
        </div>

        {/* THÔNG TIN PHỤ HUYNH & NGƯỜI BẢO TRỢ TÀI CHÍNH */}
        {currentCase.parents && currentCase.parents.length > 0 && (
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span>👨‍👩‍👧</span>
                <span>Thông tin Phụ huynh & Bảo trợ tài chính:</span>
              </span>
              <span className="text-[11px] text-slate-500">
                Đầu mối liên hệ giải quyết hồ sơ & học phí gia đình
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentCase.parents.map((p) => (
                <div
                  key={p.parentId}
                  className="rounded-lg bg-white p-2.5 border border-slate-200 shadow-2xs space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`rounded px-1.5 py-0.2 text-[10px] font-bold ${
                          p.relationship === 'BO'
                            ? 'bg-blue-100 text-[#033399]'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {p.relationLabel}
                      </span>
                      <strong className="text-slate-900">{p.fullName}</strong>
                      <span className="text-slate-500 text-[11px]">({p.yearOfBirth})</span>
                    </div>

                    {p.isFinancialSponsor && (
                      <span className="rounded bg-emerald-50 border border-emerald-300 px-1.5 py-0.2 text-[9px] font-bold text-emerald-800">
                        ⭐ Bảo trợ chính
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-slate-600">
                    <span>
                      SĐT:{' '}
                      <a
                        href={`tel:${p.phone.replace(/\s+/g, '')}`}
                        className="font-mono font-bold text-[#033399] hover:underline"
                        title="Bấm để gọi"
                      >
                        {p.phone}
                      </a>
                    </span>
                    <span>•</span>
                    <span>Nghề: {p.job}</span>
                  </div>

                  {p.notes && (
                    <p
                      className={`text-[10px] mt-0.5 ${
                        p.notes.includes('⚠️') || p.notes.includes('đôn đốc')
                          ? 'text-rose-700 font-semibold bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200'
                          : 'text-slate-500 italic'
                      }`}
                    >
                      {p.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* LEVEL 3: KHUNG TIẾN ĐỘ 7 GIAI ĐOẠN THEO MỐC THỜI GIAN     */}
        {/* ======================================================== */}
        <WeeklyTimelineStepper
          currentStageId={effectiveCurrentStage}
          selectedStageId={selectedStageId}
          onSelectStage={(stageId) => setSelectedStageId(stageId)}
          stageStatus={effectiveStageStatus}
          dossierItems={currentDossierItems}
          enrollmentDate={currentEnrollmentDate}
        />
      </section>

      {/* ======================================================== */}
      {/* LEVEL 4: KHUNG HỒ SƠ CHI TIẾT (SHOW TOÀN BỘ GIẤY TỜ)     */}
      {/* ======================================================== */}
      <section className="space-y-2">
        <StageDossierDetail
          allDossierItems={currentDossierItems}
          activeStageId={selectedStageId}
          effectiveCurrentStageId={effectiveCurrentStage}
          studentName={currentCase.studentName}
          studentCode={currentCase.studentCode}
          enrollmentDate={currentEnrollmentDate}
          onToggleStatus={handleToggleDocStatus}
        />
      </section>
    </div>
  )
}
