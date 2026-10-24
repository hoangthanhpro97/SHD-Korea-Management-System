import type { SyncPointStatus } from '../types/schema'

interface GatingSyncPointsProps {
  syncPoints: SyncPointStatus
}

export default function GatingSyncPoints({ syncPoints }: GatingSyncPointsProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Điểm kiểm soát hội tụ (Gating Sync Points)
          </h3>
          <p className="text-xs text-slate-500">
            Cơ chế chặn tự động: Hệ thống chỉ cho phép chuyển sang giai đoạn nộp Visa và xuất cảnh khi các luồng song song cùng tích xanh hợp lệ
          </p>
        </div>
        <span className="rounded-md bg-purple-50 px-2.5 py-1 text-xs font-bold text-purple-700 border border-purple-200">
          Chống đốt cháy giai đoạn
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* POINT 1: HỘI TỤ INVOICE */}
        <div
          className={`rounded-xl border p-4 transition-all ${
            syncPoints.sync1InvoiceReady
              ? 'border-emerald-300 bg-emerald-50/50 shadow-2xs'
              : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
              CỬA KIỂM SOÁT 1
            </span>
            <span
              className={`text-xs font-bold ${
                syncPoints.sync1InvoiceReady ? 'text-emerald-700' : 'text-slate-400'
              }`}
            >
              {syncPoints.sync1InvoiceReady ? '✓ HỘI TỤ ĐẠT' : '○ CHƯA ĐỦ ĐIỀU KIỆN'}
            </span>
          </div>

          <h4 className="font-bold text-slate-900 text-sm">
            Điều kiện Đỗ trường & Nhận Invoice
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5 mb-3">
            Hồ sơ trường bắt buộc hoàn thành 100% khi có kết quả
          </p>

          <ul className="space-y-1.5 text-xs text-slate-700">
            <li className="flex items-center gap-2">
              <span className={syncPoints.sync1Checklist.interviewPassed ? 'text-emerald-600 font-bold' : 'text-slate-300'}>
                {syncPoints.sync1Checklist.interviewPassed ? '✓' : '○'}
              </span>
              <span>Đậu phỏng vấn trường đối tác</span>
            </li>
            <li className="flex items-center gap-2">
              <span className={syncPoints.sync1Checklist.schoolDossier100 ? 'text-emerald-600 font-bold' : 'text-rose-500 font-bold'}>
                {syncPoints.sync1Checklist.schoolDossier100 ? '✓' : '!'}
              </span>
              <span className="font-medium">Hồ sơ trường hoàn thành 100%</span>
            </li>
            <li className="flex items-center gap-2">
              <span className={syncPoints.sync1Checklist.paymentPhase2Collected ? 'text-emerald-600 font-bold' : 'text-slate-300'}>
                {syncPoints.sync1Checklist.paymentPhase2Collected ? '✓' : '○'}
              </span>
              <span>Kế toán thu phí Lần 2 (30.000.000đ)</span>
            </li>
          </ul>
        </div>

        {/* POINT 2: HỘI TỤ NỘP VISA */}
        <div
          className={`rounded-xl border p-4 transition-all ${
            syncPoints.sync2VisaReady
              ? 'border-emerald-300 bg-emerald-50/50 shadow-2xs'
              : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="rounded bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-800">
              CỬA KIỂM SOÁT 2
            </span>
            <span
              className={`text-xs font-bold ${
                syncPoints.sync2VisaReady ? 'text-emerald-700' : 'text-slate-400'
              }`}
            >
              {syncPoints.sync2VisaReady ? '✓ HỘI TỤ ĐẠT' : '○ CHƯA ĐỦ ĐIỀU KIỆN'}
            </span>
          </div>

          <h4 className="font-bold text-slate-900 text-sm">
            Điều kiện Nộp Visa Lãnh sự / KVAC
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5 mb-3">
            Hồ sơ lãnh sự bắt buộc hoàn thành trước 3 ngày
          </p>

          <ul className="space-y-1.5 text-xs text-slate-700">
            <li className="flex items-center gap-2">
              <span className={syncPoints.sync2Checklist.consularDossier3DaysReady ? 'text-emerald-600 font-bold' : 'text-amber-500 font-bold'}>
                {syncPoints.sync2Checklist.consularDossier3DaysReady ? '✓' : '○'}
              </span>
              <span className="font-medium">Hồ sơ lãnh sự xong trước $\ge$ 3 ngày</span>
            </li>
            <li className="flex items-center gap-2">
              <span className={syncPoints.sync2Checklist.financialDocsVerified ? 'text-emerald-600 font-bold' : 'text-slate-300'}>
                {syncPoints.sync2Checklist.financialDocsVerified ? '✓' : '○'}
              </span>
              <span>Phòng Hồ sơ duyệt sổ đỏ/ĐKKD/thuế</span>
            </li>
            <li className="flex items-center gap-2">
              <span className={syncPoints.sync2Checklist.invoicePaidToKorea ? 'text-emerald-600 font-bold' : 'text-slate-300'}>
                {syncPoints.sync2Checklist.invoicePaidToKorea ? '✓' : '○'}
              </span>
              <span>Đã thanh toán Invoice sang trường</span>
            </li>
            <li className="flex items-center gap-2">
              <span className={syncPoints.sync2Checklist.kStudyDepositOpened ? 'text-emerald-600 font-bold' : 'text-slate-300'}>
                {syncPoints.sync2Checklist.kStudyDepositOpened ? '✓' : '○'}
              </span>
              <span>Mở sổ đóng băng K-Study 10.000 USD</span>
            </li>
          </ul>
        </div>

        {/* POINT 3: HỘI TỤ XUẤT CẢNH */}
        <div
          className={`rounded-xl border p-4 transition-all ${
            syncPoints.sync3DepartureReady
              ? 'border-emerald-300 bg-emerald-50/50 shadow-2xs'
              : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
              CỬA KIỂM SOÁT 3
            </span>
            <span
              className={`text-xs font-bold ${
                syncPoints.sync3DepartureReady ? 'text-emerald-700' : 'text-slate-400'
              }`}
            >
              {syncPoints.sync3DepartureReady ? '✓ HỘI TỤ ĐẠT' : '○ CHƯA ĐỦ ĐIỀU KIỆN'}
            </span>
          </div>

          <h4 className="font-bold text-slate-900 text-sm">
            Điều kiện Xuất cảnh & Bàn giao
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5 mb-3">
            Quyết toán tài chính và bảo đảm an toàn nhập cảnh
          </p>

          <ul className="space-y-1.5 text-xs text-slate-700">
            <li className="flex items-center gap-2">
              <span className={syncPoints.sync3Checklist.visaGranted ? 'text-emerald-600 font-bold' : 'text-slate-300'}>
                {syncPoints.sync3Checklist.visaGranted ? '✓' : '○'}
              </span>
              <span>Đã cấp Visa / Tư cách lưu trú</span>
            </li>
            <li className="flex items-center gap-2">
              <span className={syncPoints.sync3Checklist.paymentPhase3Collected ? 'text-emerald-600 font-bold' : 'text-slate-300'}>
                {syncPoints.sync3Checklist.paymentPhase3Collected ? '✓' : '○'}
              </span>
              <span>Kế toán thu phí Lần 3 (65.000.000đ)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className={syncPoints.sync3Checklist.flightBooked ? 'text-emerald-600 font-bold' : 'text-slate-300'}>
                {syncPoints.sync3Checklist.flightBooked ? '✓' : '○'}
              </span>
              <span>Vé máy bay & Đưa đón sân bay Incheon</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
