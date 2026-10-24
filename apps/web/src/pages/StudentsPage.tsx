import { useState } from 'react'
import { Link } from 'react-router'
import DemoBadge from '../components/DemoBadge'
import PhotoAvatar from '../components/PhotoAvatar'
import { CASES_BY_INTAKE_DATA, INTAKE_PERIODS_DATA } from '../mocks/intake_management_mock'
import { WEEK_STAGES, type CaseByIntake, type WeekStageId, type ParentInfo } from '../types/schema'

export default function StudentsPage() {
  const [activeTab, setActiveTab] = useState<'STUDENTS' | 'PARENTS'>('STUDENTS')
  const [searchTerm, setSearchTerm] = useState('')
  const [periodFilter, setPeriodFilter] = useState('ALL')
  const [stageFilter, setStageFilter] = useState('ALL')
  const [topikFilter, setTopikFilter] = useState('ALL')
  const [parentRoleFilter, setParentRoleFilter] = useState<'ALL' | 'BO' | 'ME' | 'SPONSOR'>('ALL')
  const [selectedStudent, setSelectedStudent] = useState<CaseByIntake | null>(null)
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null)

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone)
    setCopiedPhone(phone)
    setTimeout(() => setCopiedPhone(null), 2000)
  }

  // Filter students
  const filteredStudents = CASES_BY_INTAKE_DATA.filter((s) => {
    const matchesSearch =
      s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.targetSchool.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPeriod = periodFilter === 'ALL' || s.periodId === periodFilter
    const matchesStage = stageFilter === 'ALL' || s.currentStageId === stageFilter
    const matchesTopik =
      topikFilter === 'ALL' ||
      (topikFilter === 'HAS_TOPIK' ? s.training.topikStatus.hasTopik : !s.training.topikStatus.hasTopik)

    return matchesSearch && matchesPeriod && matchesStage && matchesTopik
  })

  // Summary statistics for Training Progress
  const totalStudents = CASES_BY_INTAKE_DATA.length
  const hasTopikCount = CASES_BY_INTAKE_DATA.filter((s) => s.training.topikStatus.hasTopik).length
  const readySchoolInterviewCount = CASES_BY_INTAKE_DATA.filter(
    (s) => s.training.schoolInterviewPrep.status === 'DA_SAN_SANG'
  ).length
  const readyConsularInterviewCount = CASES_BY_INTAKE_DATA.filter(
    (s) => s.training.consularInterviewPrep.status === 'DA_SAN_SANG'
  ).length
  const avgAttendance = Math.round(
    CASES_BY_INTAKE_DATA.reduce((acc, s) => acc + s.training.attendanceRate, 0) /
      totalStudents
  )

  // Flatten parents list for the Parents Tab
  interface ParentItemRow {
    student: CaseByIntake
    parent: ParentInfo
  }

  const allParentRows: ParentItemRow[] = CASES_BY_INTAKE_DATA.flatMap((s) =>
    (s.parents || []).map((p) => ({
      student: s,
      parent: p
    }))
  )

  const filteredParents = allParentRows.filter(({ student, parent }) => {
    const matchesSearch =
      parent.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.phone.includes(searchTerm) ||
      (parent.idCard && parent.idCard.includes(searchTerm)) ||
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (parent.workplace && parent.workplace.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesPeriod = periodFilter === 'ALL' || student.periodId === periodFilter

    const matchesRole =
      parentRoleFilter === 'ALL'
        ? true
        : parentRoleFilter === 'SPONSOR'
        ? parent.isFinancialSponsor
        : parent.relationship === parentRoleFilter

    return matchesSearch && matchesPeriod && matchesRole
  })

  // Parent statistics
  const totalParents = allParentRows.length
  const totalSponsors = allParentRows.filter((r) => r.parent.isFinancialSponsor).length
  const totalFathers = allParentRows.filter((r) => r.parent.relationship === 'BO').length
  const totalMothers = allParentRows.filter((r) => r.parent.relationship === 'ME').length

  // Helper mapping stageId to title and step index
  const getStageInfo = (stageId: WeekStageId) => {
    const stage = WEEK_STAGES.find((ws) => ws.id === stageId)
    const index = WEEK_STAGES.findIndex((ws) => ws.id === stageId)
    return { stage, index }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Quản lý Học viên & Phụ huynh
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Theo dõi song song: Tiến độ hồ sơ du học, ảnh thẻ 3x4, đào tạo tiếng Hàn, và hồ sơ phụ huynh bảo lãnh
          </p>
        </div>
        <DemoBadge />
      </div>

      {/* Tab Switcher: Danh sách Học viên vs Danh sách Phụ huynh */}
      <div className="flex items-center gap-3 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('STUDENTS')}
          className={`flex items-center gap-2 border-b-2 py-3 px-4 text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'STUDENTS'
              ? 'border-[#033399] text-[#033399]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>👨‍🎓</span>
          <span>Danh sách Học viên ({totalStudents})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('PARENTS')}
          className={`flex items-center gap-2 border-b-2 py-3 px-4 text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'PARENTS'
              ? 'border-[#033399] text-[#033399]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>👨‍👩‍👧</span>
          <span>Danh sách Phụ huynh ({totalParents})</span>
          <span className="rounded-full bg-indigo-100 text-[#033399] px-2 py-0.5 text-[10px] font-bold">
            Mới
          </span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: DANH SÁCH HỌC VIÊN                                */}
      {/* ======================================================== */}
      {activeTab === 'STUDENTS' && (
        <div className="space-y-6">
          {/* 5 Stats Cards for Training Progress & Dossier Flow */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-500 block">Tổng học viên</span>
              <p className="mt-1 text-2xl font-black text-slate-900">{totalStudents}</p>
              <span className="mt-0.5 inline-block text-[10px] text-slate-500">
                Qua 5 kỳ bay 2026–2027
              </span>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3.5 shadow-2xs">
              <span className="text-[11px] font-bold text-blue-800 block">Chuyên cần học tiếng</span>
              <p className="mt-1 text-2xl font-black text-blue-900">{avgAttendance}%</p>
              <span className="mt-0.5 inline-block text-[10px] text-blue-700">
                Trung bình toàn khoá học
              </span>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3.5 shadow-2xs">
              <span className="text-[11px] font-bold text-emerald-800 block">Đã có TOPIK</span>
              <p className="mt-1 text-2xl font-black text-emerald-700">
                {hasTopikCount} <span className="text-xs font-normal text-slate-500">/ {totalStudents}</span>
              </p>
              <span className="mt-0.5 inline-block text-[10px] text-emerald-700 font-semibold">
                {Math.round((hasTopikCount / totalStudents) * 100)}% đạt chứng chỉ
              </span>
            </div>

            <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-3.5 shadow-2xs">
              <span className="text-[11px] font-bold text-indigo-800 block">Sẵn sàng PV Trường</span>
              <p className="mt-1 text-2xl font-black text-indigo-700">
                {readySchoolInterviewCount} <span className="text-xs font-normal text-slate-500">HV</span>
              </p>
              <span className="mt-0.5 inline-block text-[10px] text-indigo-700 font-semibold">
                Mock interview ≥ 8.0/10
              </span>
            </div>

            <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-3.5 shadow-2xs">
              <span className="text-[11px] font-bold text-purple-800 block">Sẵn sàng PV Lãnh sự</span>
              <p className="mt-1 text-2xl font-black text-purple-700">
                {readyConsularInterviewCount} <span className="text-xs font-normal text-slate-500">HV</span>
              </p>
              <span className="mt-0.5 inline-block text-[10px] text-purple-700 font-semibold">
                Hoàn thành mô phỏng Lãnh sự
              </span>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
            <div className="flex flex-wrap items-center gap-2">
              {/* Lọc Kỳ bay */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-600">Kỳ bay:</span>
                <select
                  value={periodFilter}
                  onChange={(e) => setPeriodFilter(e.target.value)}
                  className="rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:outline-hidden"
                >
                  <option value="ALL">Tất cả kỳ bay ({totalStudents})</option>
                  {INTAKE_PERIODS_DATA.map((p) => (
                    <option key={p.periodId} value={p.periodId}>
                      {p.name} ({p.currentActive} HV)
                    </option>
                  ))}
                </select>
              </div>

              {/* Lọc Tiến độ hồ sơ */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-600">Tiến độ hồ sơ:</span>
                <select
                  value={stageFilter}
                  onChange={(e) => setStageFilter(e.target.value)}
                  className="rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:outline-hidden"
                >
                  <option value="ALL">Tất cả 7 mốc tuần</option>
                  {WEEK_STAGES.map((ws) => (
                    <option key={ws.id} value={ws.id}>
                      [{ws.weekLabel}] {ws.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lọc TOPIK */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-600">Chứng chỉ:</span>
                <select
                  value={topikFilter}
                  onChange={(e) => setTopikFilter(e.target.value)}
                  className="rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:outline-hidden"
                >
                  <option value="ALL">Tất cả</option>
                  <option value="HAS_TOPIK">Đã có TOPIK ({hasTopikCount})</option>
                  <option value="NO_TOPIK">Chưa có ({totalStudents - hasTopikCount})</option>
                </select>
              </div>
            </div>

            {/* Tìm kiếm */}
            <div className="relative min-w-[240px] flex-1 sm:max-w-xs">
              <input
                type="text"
                placeholder="Tìm tên HV, mã số, SĐT, trường..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-hidden"
              />
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                🔍
              </span>
            </div>
          </div>

          {/* Table: Danh sách Học viên */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[980px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    <th className="py-3 px-3">Học viên (Ảnh thẻ 3x4)</th>
                    <th className="py-3 px-3">Kỳ bay & Nguyện vọng</th>
                    <th className="py-3 px-3">Tiến độ hồ sơ</th>
                    <th className="py-3 px-3">Đang học tiếng</th>
                    <th className="py-3 px-3">Chứng chỉ</th>
                    <th className="py-3 px-3">Đang luyện PV Trường</th>
                    <th className="py-3 px-3">Đang luyện PV Lãnh sự</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-500">
                        Không tìm thấy học viên phù hợp với bộ lọc.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((s) => {
                      const { stage } = getStageInfo(s.currentStageId)
                      const isBlocked = s.stageStatus === 'BLOCKED'

                      return (
                        <tr
                          key={s.caseId}
                          className="hover:bg-slate-50/80 transition-colors"
                        >
                          {/* Cột 1: Thông tin học viên (Ảnh thẻ 3x4 + Tên ở Hàng 1, Mã ở Hàng 2, SĐT ở Hàng 3) */}
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2.5">
                              {/* Ảnh thẻ 3x4 */}
                              <PhotoAvatar
                                src={s.photoUrl}
                                alt={s.studentName}
                                aspectRatio="3:4"
                                size="sm"
                                show3x4Badge
                                rounded="md"
                                fallbackType="student"
                                className="border border-slate-300 shadow-2xs shrink-0"
                              />

                              <div className="space-y-0.5">
                                <button
                                  type="button"
                                  onClick={() => setSelectedStudent(s)}
                                  className="font-bold text-slate-900 text-xs text-left hover:text-[#033399] transition-colors cursor-pointer"
                                  title="Xem phiếu thông tin đào tạo & phụ huynh"
                                >
                                  {s.studentName}
                                </button>
                                <p className="font-mono text-[11px] font-bold text-[#033399]">
                                  {s.studentCode}
                                </p>
                                <p className="text-[11px] text-slate-500">
                                  {s.phone}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Cột 2: Kỳ bay & Nguyện vọng trường (thể hiện đầy đủ không rút gọn) */}
                          <td className="py-3 px-3">
                            <span className="inline-block rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-[#033399] border border-indigo-200">
                              {s.intakeName}
                            </span>
                            <p className="font-bold text-slate-900 text-xs mt-1">
                              {s.targetSchool}
                            </p>
                            <p className="text-[11px] text-slate-600 mt-0.5">
                              Ngành: {s.targetMajor}
                            </p>
                          </td>

                          {/* Cột 3: Tiến độ hồ sơ (click nhảy sang hồ sơ chi tiết ở trang Hồ sơ du học) */}
                          <td className="py-3 px-3">
                            <Link
                              to={`/cases?periodId=${s.periodId}&caseId=${s.caseId}`}
                              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all hover:shadow-xs hover:scale-[1.02] cursor-pointer ${
                                isBlocked
                                  ? 'bg-rose-50 text-rose-800 border border-rose-300 hover:bg-rose-100'
                                  : s.currentStageId === 'W19_20'
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                                  : 'bg-blue-50 text-[#033399] border border-blue-200 hover:bg-blue-100'
                              }`}
                              title="Bấm để mở hồ sơ chi tiết tại trang Hồ sơ du học"
                            >
                              <span>{isBlocked ? '⚠️' : s.currentStageId === 'W19_20' ? '✓' : '📁'}</span>
                              <span className="underline decoration-dotted">{stage?.title}</span>
                              <span className="text-[10px] opacity-75">→</span>
                            </Link>
                          </td>

                          {/* Cột 4: Đang học tiếng */}
                          <td className="py-3 px-3">
                            <div>
                              <span
                                className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold ${
                                  s.training.koreanStudyStatus === 'HOAN_THANH_SO_CAP_2'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : s.training.koreanStudyStatus === 'HOAN_THANH_SO_CAP_1'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {s.training.koreanStudyStatus === 'HOAN_THANH_SO_CAP_2'
                                  ? 'Xong Sơ cấp 2'
                                  : s.training.koreanStudyStatus === 'HOAN_THANH_SO_CAP_1'
                                  ? 'Xong Sơ cấp 1'
                                  : 'Đang học'}
                              </span>
                              <p className="text-[10px] text-slate-500 mt-1">
                                {s.training.currentClass}
                              </p>
                              <div className="flex items-center gap-1 mt-0.5 text-[10px] text-slate-600">
                                <span className="font-semibold text-blue-700">
                                  CC: {s.training.attendanceRate}%
                                </span>
                                <span>•</span>
                                <span className={s.training.missedDays > 2 ? 'text-rose-600 font-bold' : ''}>
                                  Nghỉ {s.training.missedDays}b
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Cột 5: Chứng chỉ */}
                          <td className="py-3 px-3">
                            {s.training.topikStatus.hasTopik ? (
                              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-1.5">
                                <div className="flex items-center gap-1 text-emerald-800 font-bold text-[11px]">
                                  <span>✓</span>
                                  <span>{s.training.topikStatus.level}</span>
                                </div>
                                <p className="text-[10px] text-emerald-700 mt-0.5">
                                  Điểm: <strong>{s.training.topikStatus.score}</strong>
                                </p>
                              </div>
                            ) : (
                              <div className="rounded-lg bg-slate-50 border border-slate-200 p-1.5">
                                <span className="text-[10px] font-semibold text-slate-500 block">
                                  Chưa có chứng chỉ
                                </span>
                                <span className="text-[9px] text-slate-400">
                                  Mục tiêu: {s.training.topikStatus.targetGoal}
                                </span>
                              </div>
                            )}
                          </td>

                          {/* Cột 6: Đang luyện PV Trường */}
                          <td className="py-3 px-3">
                            <div>
                              <span
                                className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold ${
                                  s.training.schoolInterviewPrep.status === 'DA_SAN_SANG'
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                    : s.training.schoolInterviewPrep.status === 'DANG_LUYEN'
                                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {s.training.schoolInterviewPrep.status === 'DA_SAN_SANG'
                                  ? '✓ Đã sẵn sàng'
                                  : s.training.schoolInterviewPrep.status === 'DANG_LUYEN'
                                  ? '⏳ Đang luyện'
                                  : 'Chưa luyện'}
                              </span>
                              {s.training.schoolInterviewPrep.mockInterviewScore && (
                                <p className="text-[10px] text-slate-700 font-semibold mt-1">
                                  Điểm mock: {s.training.schoolInterviewPrep.mockInterviewScore}/10
                                </p>
                              )}
                              {s.training.schoolInterviewPrep.teacherAssessment && (
                                <p className="text-[9px] text-slate-500 italic mt-0.5" title={s.training.schoolInterviewPrep.teacherAssessment}>
                                  {s.training.schoolInterviewPrep.teacherAssessment}
                                </p>
                              )}
                            </div>
                          </td>

                          {/* Cột 7: Đang luyện PV Lãnh sự */}
                          <td className="py-3 px-3">
                            <div>
                              <span
                                className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold ${
                                  s.training.consularInterviewPrep.status === 'DA_SAN_SANG'
                                    ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                    : s.training.consularInterviewPrep.status === 'DANG_LUYEN'
                                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {s.training.consularInterviewPrep.status === 'DA_SAN_SANG'
                                  ? '✓ Đã sẵn sàng'
                                  : s.training.consularInterviewPrep.status === 'DANG_LUYEN'
                                  ? '⏳ Đang luyện'
                                  : 'Chưa luyện'}
                              </span>
                              {s.training.consularInterviewPrep.assessment && (
                                <p className="text-[9px] text-slate-500 italic mt-1" title={s.training.consularInterviewPrep.assessment}>
                                  {s.training.consularInterviewPrep.assessment}
                                </p>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: DANH SÁCH PHỤ HUYNH & NGƯỜI BẢO TRỢ TÀI CHÍNH      */}
      {/* ======================================================== */}
      {activeTab === 'PARENTS' && (
        <div className="space-y-6">
          {/* 4 Stats Cards for Parents */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-500 block">Tổng số Phụ huynh</span>
              <p className="mt-1 text-2xl font-black text-slate-900">{totalParents}</p>
              <span className="mt-0.5 inline-block text-[10px] text-slate-500">
                Bảo lãnh {totalStudents} học viên
              </span>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3.5 shadow-2xs">
              <span className="text-[11px] font-bold text-emerald-800 block">Bảo trợ tài chính chính</span>
              <p className="mt-1 text-2xl font-black text-emerald-700">{totalSponsors}</p>
              <span className="mt-0.5 inline-block text-[10px] text-emerald-700 font-semibold">
                Đứng tên sổ tiết kiệm & sổ đỏ
              </span>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3.5 shadow-2xs">
              <span className="text-[11px] font-bold text-blue-800 block">Bố học viên</span>
              <p className="mt-1 text-2xl font-black text-blue-900">{totalFathers}</p>
              <span className="mt-0.5 inline-block text-[10px] text-blue-700">
                Đầy đủ CCCD & giấy khai sinh
              </span>
            </div>

            <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-3.5 shadow-2xs">
              <span className="text-[11px] font-bold text-purple-800 block">Mẹ học viên</span>
              <p className="mt-1 text-2xl font-black text-purple-700">{totalMothers}</p>
              <span className="mt-0.5 inline-block text-[10px] text-purple-700">
                Đầy đủ xác nhận cư trú CT07
              </span>
            </div>
          </div>

          {/* Filter Bar for Parents */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
            <div className="flex flex-wrap items-center gap-2">
              {/* Lọc Kỳ bay */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-600">Kỳ bay:</span>
                <select
                  value={periodFilter}
                  onChange={(e) => setPeriodFilter(e.target.value)}
                  className="rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:outline-hidden"
                >
                  <option value="ALL">Tất cả kỳ bay</option>
                  {INTAKE_PERIODS_DATA.map((p) => (
                    <option key={p.periodId} value={p.periodId}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lọc Vai trò */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-600">Vai trò / Quan hệ:</span>
                <select
                  value={parentRoleFilter}
                  onChange={(e) => setParentRoleFilter(e.target.value as 'ALL' | 'BO' | 'ME' | 'SPONSOR')}
                  className="rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:outline-hidden"
                >
                  <option value="ALL">Tất cả vai trò ({totalParents})</option>
                  <option value="SPONSOR">⭐ Người bảo trợ chính ({totalSponsors})</option>
                  <option value="BO">👨 Bố ({totalFathers})</option>
                  <option value="ME">👩 Mẹ ({totalMothers})</option>
                </select>
              </div>
            </div>

            {/* Tìm kiếm Phụ huynh */}
            <div className="relative min-w-[260px] flex-1 sm:max-w-md">
              <input
                type="text"
                placeholder="Tìm tên phụ huynh, SĐT, CCCD, tên học viên, mã HV..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-hidden"
              />
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                🔍
              </span>
            </div>
          </div>

          {/* Table: Danh sách Phụ huynh */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1050px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    <th className="py-3 px-3">Học viên liên quan</th>
                    <th className="py-3 px-3">Phụ huynh & Quan hệ</th>
                    <th className="py-3 px-3">Số điện thoại liên hệ</th>
                    <th className="py-3 px-3">Năm sinh & CCCD</th>
                    <th className="py-3 px-3">Nghề nghiệp & Đơn vị công tác</th>
                    <th className="py-3 px-3">Vai trò tài chính</th>
                    <th className="py-3 px-3">Thường trú & Ghi chú đôn đốc</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredParents.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-500">
                        Không tìm thấy phụ huynh phù hợp với bộ lọc tìm kiếm.
                      </td>
                    </tr>
                  ) : (
                    filteredParents.map(({ student, parent }) => (
                      <tr
                        key={`${student.caseId}_${parent.parentId}`}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        {/* Cột 1: Thông tin học viên (kèm ảnh thẻ 3x4 nhỏ) */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <PhotoAvatar
                              src={student.photoUrl}
                              alt={student.studentName}
                              aspectRatio="3:4"
                              size="xs"
                              rounded="sm"
                              fallbackType="student"
                              className="border border-slate-200 shrink-0"
                            />
                            <div className="space-y-0.5">
                              <Link
                                to={`/cases?periodId=${student.periodId}&caseId=${student.caseId}`}
                                className="font-bold text-slate-900 text-xs hover:text-[#033399] transition-colors"
                                title="Bấm để mở hồ sơ học viên này"
                              >
                                {student.studentName}
                              </Link>
                              <p className="font-mono text-[11px] font-bold text-[#033399]">
                                {student.studentCode}
                              </p>
                              <span className="inline-block rounded bg-indigo-50 px-1.5 py-0.2 text-[10px] font-semibold text-[#033399] border border-indigo-200">
                                {student.intakeName}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Cột 2: Phụ huynh & Vai trò (kèm ảnh chân dung phụ huynh) */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <PhotoAvatar
                              src={parent.photoUrl}
                              alt={parent.fullName}
                              aspectRatio="1:1"
                              size="sm"
                              rounded="lg"
                              fallbackType={parent.relationship === 'BO' ? 'father' : 'mother'}
                              className="border border-slate-300 shadow-2xs shrink-0"
                            />
                            <div>
                              <p className="font-bold text-slate-900 text-xs">
                                {parent.fullName}
                              </p>
                              <span
                                className={`inline-block rounded px-1.5 py-0.2 text-[10px] font-bold mt-0.5 ${
                                  parent.relationship === 'BO'
                                    ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                                }`}
                              >
                                {parent.relationLabel}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Cột 3: Số điện thoại */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <a
                              href={`tel:${parent.phone.replace(/\s+/g, '')}`}
                              className="font-mono font-bold text-xs text-[#033399] hover:underline"
                              title="Bấm để gọi điện"
                            >
                              {parent.phone}
                            </a>
                            <button
                              type="button"
                              onClick={() => handleCopyPhone(parent.phone)}
                              className="rounded px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-slate-100 hover:bg-slate-200 cursor-pointer"
                              title="Sao chép SĐT"
                            >
                              {copiedPhone === parent.phone ? '✓ Đã chép' : 'Sao chép'}
                            </button>
                          </div>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            Gọi nhanh phụ huynh
                          </span>
                        </td>

                        {/* Cột 4: Năm sinh & CCCD */}
                        <td className="py-3 px-3">
                          <p className="font-semibold text-slate-800 text-xs">
                            Sinh năm {parent.yearOfBirth}
                          </p>
                          <p className="font-mono text-[11px] text-slate-500 mt-0.5">
                            CCCD: {parent.idCard || 'Đang cập nhật'}
                          </p>
                        </td>

                        {/* Cột 5: Nghề nghiệp & Đơn vị công tác */}
                        <td className="py-3 px-3">
                          <p className="font-semibold text-slate-900 text-xs">
                            {parent.job}
                          </p>
                          {parent.workplace && (
                            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1" title={parent.workplace}>
                              {parent.workplace}
                            </p>
                          )}
                        </td>

                        {/* Cột 6: Vai trò tài chính */}
                        <td className="py-3 px-3">
                          {parent.isFinancialSponsor ? (
                            <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 border border-emerald-300 px-2 py-1 text-[11px] font-bold text-emerald-800">
                              <span>⭐</span>
                              <span>Bảo trợ tài chính chính</span>
                            </span>
                          ) : (
                            <span className="inline-block rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                              Đồng hành hồ sơ
                            </span>
                          )}
                        </td>

                        {/* Cột 7: Thường trú & Ghi chú đôn đốc */}
                        <td className="py-3 px-3">
                          <p className="text-xs text-slate-700 font-medium">
                            {parent.address || 'Hải Dương / Hà Nội'}
                          </p>
                          {parent.notes && (
                            <p
                              className={`text-[10px] mt-0.5 line-clamp-2 ${
                                parent.notes.includes('⚠️') || parent.notes.includes('đôn đốc')
                                  ? 'text-rose-700 font-semibold bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200'
                                  : 'text-slate-500 italic'
                              }`}
                              title={parent.notes}
                            >
                              {parent.notes}
                            </p>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PHIẾU ĐÁNH GIÁ ĐÀO TẠO & HỒ SƠ CHI TIẾT */}
      {selectedStudent && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
        >
          <div className="max-w-2xl w-full rounded-2xl bg-white p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Header Modal kèm Ảnh thẻ 3x4 của học viên */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3.5">
                <PhotoAvatar
                  src={selectedStudent.photoUrl}
                  alt={selectedStudent.studentName}
                  aspectRatio="3:4"
                  size="lg"
                  show3x4Badge
                  rounded="md"
                  fallbackType="student"
                  className="border-2 border-white shadow-md ring-1 ring-slate-200 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {selectedStudent.studentCode}
                    </span>
                    <span className="rounded bg-slate-100 text-slate-600 px-1.5 py-0.2 text-[10px] font-bold">
                      Ảnh thẻ 3x4
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    {selectedStudent.studentName}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedStudent.intakeName} • Mục tiêu: {selectedStudent.targetSchool} ({selectedStudent.targetMajor})
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Chi tiết tiến độ đào tạo */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span>🎓</span>
                <span>Hồ sơ năng lực đào tạo tiếng Hàn & Kỹ năng phỏng vấn</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* 1. Học tiếng */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-1">
                  <span className="font-bold text-slate-700">1. Tiến độ học tiếng Hàn:</span>
                  <p className="text-slate-900 font-semibold">
                    {selectedStudent.training.currentClass}
                  </p>
                  <p className="text-slate-600">
                    Chuyên cần: <strong>{selectedStudent.training.attendanceRate}%</strong> (Nghỉ {selectedStudent.training.missedDays} buổi)
                  </p>
                  <span className="inline-block rounded bg-blue-100 text-blue-800 px-2 py-0.5 text-[10px] font-bold mt-1">
                    Trạng thái: {selectedStudent.training.koreanStudyStatus}
                  </span>
                </div>

                {/* 2. TOPIK */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-1">
                  <span className="font-bold text-slate-700">2. Chứng chỉ TOPIK:</span>
                  {selectedStudent.training.topikStatus.hasTopik ? (
                    <>
                      <p className="font-bold text-emerald-700 text-sm">
                        ✓ {selectedStudent.training.topikStatus.level} (Điểm: {selectedStudent.training.topikStatus.score})
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Ngày thi: {selectedStudent.training.topikStatus.examDate}
                      </p>
                    </>
                  ) : (
                    <p className="text-slate-600">
                      Chưa có bằng chính thức. Mục tiêu khoá học: <strong>{selectedStudent.training.topikStatus.targetGoal}</strong>
                    </p>
                  )}
                </div>

                {/* 3. Phỏng vấn trường */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-1">
                  <span className="font-bold text-slate-700">3. Luyện phỏng vấn trường Hàn Quốc:</span>
                  <p className="font-semibold text-slate-900">
                    Trạng thái: {selectedStudent.training.schoolInterviewPrep.status}
                  </p>
                  {selectedStudent.training.schoolInterviewPrep.mockInterviewScore && (
                    <p className="text-blue-700 font-bold">
                      Điểm thi thử: {selectedStudent.training.schoolInterviewPrep.mockInterviewScore}/10
                    </p>
                  )}
                  {selectedStudent.training.schoolInterviewPrep.teacherAssessment && (
                    <p className="text-slate-600 italic">
                      "{selectedStudent.training.schoolInterviewPrep.teacherAssessment}"
                    </p>
                  )}
                </div>

                {/* 4. Phỏng vấn lãnh sự */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-1">
                  <span className="font-bold text-slate-700">4. Luyện phỏng vấn Lãnh sự:</span>
                  <p className="font-semibold text-slate-900">
                    Trạng thái: {selectedStudent.training.consularInterviewPrep.status}
                  </p>
                  {selectedStudent.training.consularInterviewPrep.assessment && (
                    <p className="text-slate-600 italic">
                      "{selectedStudent.training.consularInterviewPrep.assessment}"
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Chi tiết Phụ huynh & Người bảo lãnh (kèm ảnh phụ huynh) */}
            {selectedStudent.parents && selectedStudent.parents.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span>👨‍👩‍👧</span>
                  <span>Thông tin Phụ huynh & Người bảo lãnh tài chính</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {selectedStudent.parents.map((p) => (
                    <div
                      key={p.parentId}
                      className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-3 flex items-start gap-3"
                    >
                      {/* Ảnh phụ huynh */}
                      <PhotoAvatar
                        src={p.photoUrl}
                        alt={p.fullName}
                        aspectRatio="1:1"
                        size="md"
                        rounded="lg"
                        fallbackType={p.relationship === 'BO' ? 'father' : 'mother'}
                        className="border border-slate-200 shadow-2xs shrink-0 mt-0.5"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <strong className="text-slate-900 text-sm">{p.fullName}</strong>
                          <span
                            className={`rounded px-1.5 py-0.2 text-[10px] font-bold ${
                              p.relationship === 'BO'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {p.relationLabel}
                          </span>
                        </div>
                        <p className="text-slate-600">
                          Năm sinh: <strong>{p.yearOfBirth}</strong> • CCCD: <span className="font-mono">{p.idCard || 'Đang cập nhật'}</span>
                        </p>
                        <p className="text-slate-700">
                          SĐT: <strong className="font-mono text-[#033399]">{p.phone}</strong>
                        </p>
                        <p className="text-slate-600">
                          Nghề nghiệp: <strong>{p.job}</strong>
                        </p>
                        {p.workplace && (
                          <p className="text-slate-500 text-[11px]">
                            Nơi làm việc: {p.workplace}
                          </p>
                        )}
                        {p.isFinancialSponsor && (
                          <span className="inline-block rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold mt-1">
                            ✓ Người bảo trợ tài chính chính
                          </span>
                        )}
                        {p.notes && (
                          <p className="text-[11px] text-slate-500 italic mt-1 border-t border-indigo-100/60 pt-1">
                            {p.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chi tiết học phí */}
            <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs space-y-1.5">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>Lộ trình thanh toán phí dịch vụ (TB 43/2026/TB-SHD):</span>
                <span className="text-blue-700 font-mono">115.000.000 VNĐ</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className={`p-2 rounded border ${selectedStudent.paymentPhases.phase1Paid ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                  <p className="font-bold">Lần 1: 20M</p>
                  <p className="text-[10px]">{selectedStudent.paymentPhases.phase1Paid ? '✓ Đã thu khi nhập học' : 'Chưa thu'}</p>
                </div>
                <div className={`p-2 rounded border ${selectedStudent.paymentPhases.phase2Paid ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                  <p className="font-bold">Lần 2: 30M</p>
                  <p className="text-[10px]">{selectedStudent.paymentPhases.phase2Paid ? '✓ Đã thu khi có Invoice' : 'Chưa thu'}</p>
                </div>
                <div className={`p-2 rounded border ${selectedStudent.paymentPhases.phase3Paid ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                  <p className="font-bold">Lần 3: 65M</p>
                  <p className="text-[10px]">{selectedStudent.paymentPhases.phase3Paid ? '✓ Đã thu khi có Visa' : 'Chưa thu'}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Đóng
              </button>
              <Link
                to={`/cases?periodId=${selectedStudent.periodId}&caseId=${selectedStudent.caseId}`}
                className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 cursor-pointer shadow-xs"
              >
                Chuyển sang Khung Hồ sơ 7 mốc tuần →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}