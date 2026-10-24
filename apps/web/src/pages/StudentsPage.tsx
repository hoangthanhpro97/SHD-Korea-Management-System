import { useState } from 'react'
import { Link } from 'react-router'
import DemoBadge from '../components/DemoBadge'
import { CASES_BY_INTAKE_DATA, INTAKE_PERIODS_DATA } from '../mocks/intake_management_mock'
import { WEEK_STAGES, type CaseByIntake, type WeekStageId } from '../types/schema'

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [periodFilter, setPeriodFilter] = useState('ALL')
  const [stageFilter, setStageFilter] = useState('ALL')
  const [topikFilter, setTopikFilter] = useState('ALL')
  const [selectedStudent, setSelectedStudent] = useState<CaseByIntake | null>(null)

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
            Quản lý Học viên & Tiến độ Đào tạo
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Theo dõi song song: Quy trình xử lý hồ sơ (7 mốc tuần) + Tiến độ đào tạo tiếng Hàn, TOPIK, Luyện PV trường & Lãnh sự
          </p>
        </div>
        <DemoBadge />
      </div>

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
              <option value="HAS_TOPIK">Đã có TOPIK (1, 2, 3)</option>
              <option value="NO_TOPIK">Chưa có chứng chỉ</option>
            </select>
          </div>
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Tìm theo tên học viên, mã SHD, trường..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Comprehensive Student Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-3 min-w-[150px]">Học viên</th>
                <th className="py-3.5 px-3 min-w-[200px]">Kỳ bay & Nguyện vọng</th>
                <th className="py-3.5 px-3 min-w-[220px]">Tiến độ hồ sơ</th>
                <th className="py-3.5 px-3 min-w-[130px]">Đang học tiếng</th>
                <th className="py-3.5 px-3 min-w-[120px]">Chứng chỉ</th>
                <th className="py-3.5 px-3 min-w-[130px]">Luyện PV Trường</th>
                <th className="py-3.5 px-3 min-w-[130px]">Luyện PV Lãnh sự</th>
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
                      {/* Cột 1: Thông tin học viên (Hàng 1: Tên, Hàng 2: Mã, Hàng 3: SĐT) */}
                      <td className="py-3 px-3">
                        <div className="space-y-0.5">
                          <button
                            type="button"
                            onClick={() => setSelectedStudent(s)}
                            className="font-bold text-slate-900 text-xs text-left hover:text-[#033399] transition-colors cursor-pointer"
                            title="Xem phiếu thông tin đào tạo"
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

      {/* MODAL: PHIẾU ĐÁNH GIÁ ĐÀO TẠO & HỒ SƠ CHI TIẾT */}
      {selectedStudent && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
        >
          <div className="max-w-2xl w-full rounded-2xl bg-white p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {selectedStudent.studentCode}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {selectedStudent.studentName}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedStudent.intakeName} • Mục tiêu: {selectedStudent.targetSchool} ({selectedStudent.targetMajor})
                </p>
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
