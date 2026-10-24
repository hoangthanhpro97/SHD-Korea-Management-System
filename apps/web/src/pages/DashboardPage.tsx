import DemoBadge from '../components/DemoBadge'
import GatingSyncPoints from '../components/GatingSyncPoints'
import IntakeFlightMonitor from '../components/IntakeFlightMonitor'
import ParallelSwimlanes from '../components/ParallelSwimlanes'
import { INTAKE_PERIODS_DATA } from '../mocks/intake_management_mock'
import mockData from '../mocks/synthetic_demo_cases.json'
import type { ParallelCase } from '../types/schema'

export default function DashboardPage() {
  const parallelCases: ParallelCase[] = (mockData.parallelCases || []) as unknown as ParallelCase[]
  const intakePeriods = INTAKE_PERIODS_DATA

  // KPI computations across the 4 departments
  const totalStudents = intakePeriods.reduce((acc, p) => acc + p.currentActive, 0)
  const totalSchoolDone = intakePeriods.reduce((acc, p) => acc + p.schoolDossier100Count, 0)
  const totalInvoices = intakePeriods.reduce((acc, p) => acc + p.invoiceReceivedCount, 0)
  const totalVisaGranted = intakePeriods.reduce((acc, p) => acc + p.visaGrantedCount, 0)

  const spotlightCase = parallelCases[0]

  return (
    <div className="space-y-6 w-full max-w-full min-w-0 overflow-x-hidden">
      {/* Top Badge */}
      <div className="flex justify-end">
        <DemoBadge />
      </div>

      {/* CORE FEATURE 1: BẢNG KIỂM SOÁT ĐỒNG NHẤT TIẾN ĐỘ CÁC KỲ BAY THEO ĐỀ BÀI */}
      <IntakeFlightMonitor intakePeriods={intakePeriods} />

      {/* KPI Cards across 4 Departments */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {/* Bộ phận Hồ sơ & Đào tạo */}
        <div className="rounded-xl border border-blue-200 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-700">Hồ sơ & Đào tạo</span>
            <span className="text-base">📁</span>
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">{totalStudents} Học viên</p>
          <span className="mt-1 inline-block text-[11px] text-slate-500">
            Đang đào tạo tiếng Hàn & xử lý hồ sơ
          </span>
        </div>

        {/* Điểm hoàn tất hồ sơ trường */}
        <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-800">Hồ sơ trường 100%</span>
            <span className="text-base">🏫</span>
          </div>
          <p className="mt-2 text-2xl font-black text-blue-700">{totalSchoolDone} Bộ hồ sơ</p>
          <span className="mt-1 inline-block text-[11px] font-semibold text-blue-700">
            Hợp pháp hóa BNG & ĐSQ hoàn tất
          </span>
        </div>

        {/* Bộ phận Đối ngoại & Invoice */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-800">Trúng tuyển & Invoice</span>
            <span className="text-base">🎓</span>
          </div>
          <p className="mt-2 text-2xl font-black text-emerald-600">{totalInvoices} Học viên</p>
          <span className="mt-1 inline-block text-[11px] font-semibold text-emerald-700">
            Đỗ trường & thu phí Lần 2 (30M)
          </span>
        </div>

        {/* Bộ phận Kế toán & Xuất cảnh */}
        <div className="rounded-xl border border-purple-200 bg-purple-50/40 p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-700">Đã cấp Visa HQ</span>
            <span className="text-base">✈️</span>
          </div>
          <p className="mt-2 text-2xl font-black text-purple-600">{totalVisaGranted} Đã có Visa</p>
          <span className="mt-1 inline-block text-[11px] text-purple-600 font-semibold">
            Thu phí Lần 3 (65M) & Sẵn sàng bay
          </span>
        </div>
      </div>

      {/* Rules Notice Card according to SHD documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quyết định phân công 4 bộ phận */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs text-xs space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            <span>🏛️</span>
            <span>Phân công trách nhiệm 4 bộ phận cốt lõi</span>
          </div>
          <ul className="space-y-1.5 text-slate-600">
            <li>
              <strong className="text-blue-700">• Bộ phận Hồ sơ:</strong> Trục theo sát nhất từ đầu đến cuối; thẩm định toàn bộ giấy tờ tài chính học viên (sổ đỏ, thu nhập, sổ tiết kiệm); chịu trách nhiệm 2 loại hồ sơ (Hồ sơ trường & Hồ sơ lãnh sự).
            </li>
            <li>
              <strong className="text-emerald-700">• Bộ phận Đào tạo:</strong> Giảng dạy tiếng Hàn sơ cấp 1, ký túc xá, luyện phỏng vấn song song.
            </li>
            <li>
              <strong className="text-indigo-700">• Bộ phận Đối ngoại:</strong> Xem xét GPA, số ngày nghỉ cấp 3, nguyện vọng để làm việc với trường $\rightarrow$ Nhận lịch phỏng vấn $\rightarrow$ Nhận Invoice.
            </li>
            <li>
              <strong className="text-amber-700">• Bộ phận Kế toán:</strong> Thu đúng lộ trình phí trọn gói 115 triệu theo Thông báo số 43/2026/TB-SHD và lưu trữ hợp đồng dịch vụ.
            </li>
          </ul>
        </div>

        {/* Quy định 2 loại hồ sơ & Điểm chặn */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs text-xs space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            <span>📋</span>
            <span>Quy chuẩn 2 loại hồ sơ & Hạn chót nghiêm ngặt</span>
          </div>
          <div className="space-y-2.5 text-slate-700">
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-2.5">
              <strong className="text-blue-900">1. Hồ sơ Trường:</strong>
              <p className="mt-0.5 text-[11px] text-blue-950">
                Bắt buộc phải <strong>hoàn thành 100%</strong> ngay khi đối ngoại nhận được thông báo trúng tuyển / Invoice từ trường đối tác Hàn Quốc.
              </p>
            </div>
            <div className="rounded-lg bg-purple-50 border border-purple-200 p-2.5">
              <strong className="text-purple-900">2. Hồ sơ Lãnh sự:</strong>
              <p className="mt-0.5 text-[11px] text-purple-950">
                Bắt buộc phải <strong>hoàn thành trước tối thiểu 3 ngày</strong> khi có lịch nộp hồ sơ xin Visa tại KVAC / Lãnh sự quán Hàn Quốc.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spotlight Case Swimlanes */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Mô hình Phối hợp 4 Bộ phận: {spotlightCase.studentName} ({spotlightCase.studentCode})
            </h2>
            <p className="text-xs text-slate-500">
              Trực quan hóa 4 luồng công việc đang chạy song song và điểm kiểm soát hội tụ (Gating Sync Points)
            </p>
          </div>
          <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
            {spotlightCase.targetIntake}
          </span>
        </div>

        <ParallelSwimlanes currentCase={spotlightCase} />

        <div className="mt-4">
          <GatingSyncPoints syncPoints={spotlightCase.syncPoints} />
        </div>
      </section>
    </div>
  )
}
