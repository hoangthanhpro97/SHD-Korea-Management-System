import type { ParallelCase, SchoolApplication, PaymentInstallment } from '../types/schema'

interface ParallelSwimlanesProps {
  currentCase: ParallelCase
}

export default function ParallelSwimlanes({ currentCase }: ParallelSwimlanesProps) {
  const { trainingTrack, documentTrack, externalTrack, paymentTrack } = currentCase

  return (
    <div className="space-y-4">
      {/* Overview Notice */}
      <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 text-xs text-blue-900 shadow-2xs">
        <div className="flex items-start gap-3">
          <span className="text-xl">🏢</span>
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-blue-950">
              Quy trình Đa làn Song song (4 Bộ phận phối hợp — SHD Korea)
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Bộ phận Hồ sơ theo sát xuyên suốt lộ trình. Đào tạo tiếng Hàn diễn ra song song.
              Đối ngoại khớp trường & nhận Invoice. Kế toán thu phí dịch vụ trọn gói 115 triệu theo 3 giai đoạn.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Swimlanes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* SWIMLANE 1: BỘ PHẬN HỒ SƠ (LEAD) */}
        <div className="rounded-2xl border-2 border-blue-300 bg-white p-4 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs">
                📁
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Bộ phận Hồ sơ (Trục chính lộ trình)
                </h4>
                <p className="text-[11px] text-slate-500">
                  Xử lý 2 loại hồ sơ & Thẩm định tài chính học viên
                </p>
              </div>
            </div>
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-200">
              Chủ trì
            </span>
          </div>

          <div className="mt-3.5 space-y-3.5 text-xs">
            {/* 1. Hồ sơ trường */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">
                  1. Hồ sơ Trường (Bắt buộc xong 100% khi có Invoice)
                </span>
                <span
                  className={`font-mono font-bold text-xs ${
                    documentTrack.schoolDossierProgress === 100
                      ? 'text-emerald-600'
                      : 'text-amber-600'
                  }`}
                >
                  {documentTrack.schoolDossierProgress}%
                </span>
              </div>
              {/* Progress Bar */}
              <div className="mt-2 h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    documentTrack.schoolDossierProgress === 100
                      ? 'bg-emerald-500'
                      : 'bg-blue-600'
                  }`}
                  style={{ width: `${documentTrack.schoolDossierProgress}%` }}
                />
              </div>
              <p className="mt-1.5 text-[11px] text-slate-500">
                {documentTrack.schoolDossierProgress === 100
                  ? '✓ Đã hoàn thiện toàn bộ bản dịch thuật, công chứng, tem gửi trường.'
                  : '⏳ Đang dịch thuật công chứng và hoàn thiện Study Plan.'}
              </p>
            </div>

            {/* 2. Hồ sơ lãnh sự */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">
                  2. Hồ sơ Lãnh sự (Bắt buộc xong trước 3 ngày nộp Visa)
                </span>
                <span
                  className={`font-mono font-bold text-xs ${
                    documentTrack.consularDossierStatus === 'READY_FOR_VISA'
                      ? 'text-emerald-600'
                      : 'text-slate-600'
                  }`}
                >
                  {documentTrack.consularDossierProgress}%
                </span>
              </div>
              <div className="mt-2 h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    documentTrack.consularDossierStatus === 'READY_FOR_VISA'
                      ? 'bg-emerald-500'
                      : 'bg-purple-600'
                  }`}
                  style={{ width: `${documentTrack.consularDossierProgress}%` }}
                />
              </div>
              <p className="mt-1.5 text-[11px] text-slate-500">
                Thời hạn: Hoàn thành trước{' '}
                <strong className="text-purple-700">
                  {documentTrack.consularDaysBeforeVisa} ngày
                </strong>{' '}
                khi có lịch xin Visa (Yêu cầu tối thiểu $\ge$ 3 ngày).
              </p>
            </div>

            {/* 3. Thẩm định tài chính học viên do phòng hồ sơ xử lý */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3">
              <div className="flex items-center justify-between font-bold text-amber-900 mb-2">
                <span>🛡️ Xác minh tài chính gia đình (Bộ phận Hồ sơ)</span>
                <span className="text-[10px] font-normal text-slate-500">
                  {documentTrack.financialVerification.verifiedBy}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                <div
                  className={`rounded p-1.5 text-center font-medium border ${
                    documentTrack.financialVerification.landCertificateVerified
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-rose-50 border-rose-300 text-rose-800'
                  }`}
                >
                  {documentTrack.financialVerification.landCertificateVerified
                    ? '✓ Sổ đỏ/Nhà đất'
                    : '✗ Thiếu Sổ đỏ'}
                </div>
                <div
                  className={`rounded p-1.5 text-center font-medium border ${
                    documentTrack.financialVerification.familyBusinessVerified
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-rose-50 border-rose-300 text-rose-800'
                  }`}
                >
                  {documentTrack.financialVerification.familyBusinessVerified
                    ? '✓ ĐKKD/Thuế'
                    : '✗ Thiếu ĐKKD'}
                </div>
                <div
                  className={`rounded p-1.5 text-center font-medium border ${
                    documentTrack.financialVerification.savingsBookVerified
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-rose-50 border-rose-300 text-rose-800'
                  }`}
                >
                  {documentTrack.financialVerification.savingsBookVerified
                    ? '✓ Sổ tiết kiệm'
                    : '✗ Thiếu sổ TK'}
                </div>
              </div>
              {documentTrack.financialVerification.note && (
                <p className="mt-2 text-[10px] text-amber-950 italic">
                  Ghi chú: {documentTrack.financialVerification.note}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SWIMLANE 2: BỘ PHẬN ĐỐI NGOẠI */}
        <div className="rounded-2xl border-2 border-indigo-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs">
                🌏
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Bộ phận Đối ngoại
                </h4>
                <p className="text-[11px] text-slate-500">
                  Khớp tiêu chí trường $\rightarrow$ Lịch phỏng vấn $\rightarrow$ Nhận Invoice
                </p>
              </div>
            </div>
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700 border border-indigo-200">
              Đối tác Hàn Quốc
            </span>
          </div>

          <div className="mt-3.5 space-y-3 text-xs">
            {/* Tiêu chí đầu vào nhận từ phòng hồ sơ */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-[11px]">
              <span className="font-bold text-slate-700">Thông tin đầu vào xem xét: </span>
              <span className="text-slate-600">
                GPA: <strong>{externalTrack.studentCriteria.gpa}</strong> • Số ngày nghỉ cấp 3:{' '}
                <strong>{externalTrack.studentCriteria.missedDaysHighSchool} buổi</strong> • Khu vực:{' '}
                <strong>{externalTrack.studentCriteria.preferredRegion}</strong> • Ngành:{' '}
                <strong>{externalTrack.studentCriteria.preferredMajor}</strong>
              </span>
            </div>

            {/* Danh sách trường ứng tuyển (NV1 & NV2) */}
            <div className="space-y-2.5">
              {externalTrack.applications.map((app: SchoolApplication) => (
                <div
                  key={app.id}
                  className="rounded-xl border border-indigo-100 bg-white p-3 shadow-2xs hover:border-indigo-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold text-indigo-800">
                          NV{app.priority}
                        </span>
                        <h5 className="font-bold text-slate-800 text-xs">
                          {app.schoolName}
                        </h5>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Khu vực: {app.region} • Chuyên ngành: {app.major}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        app.status === 'INVOICE_RECEIVED'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : app.status === 'INTERVIEW_PASSED'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {app.status === 'INVOICE_RECEIVED'
                        ? '🎉 Đã nhận Invoice'
                        : app.status === 'INTERVIEW_PASSED'
                        ? 'Đậu phỏng vấn'
                        : app.status === 'INTERVIEW_SCHEDULED'
                        ? 'Đã có lịch phỏng vấn'
                        : 'Đang xét hồ sơ'}
                    </span>
                  </div>

                  {app.invoiceAmountKRW && (
                    <div className="mt-2 flex items-center justify-between rounded-lg bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] text-emerald-900 font-semibold">
                      <span>Invoice học phí & KTX Hàn Quốc:</span>
                      <span className="font-mono font-bold text-emerald-700">
                        {app.invoiceAmountKRW.toLocaleString('vi-VN')} KRW
                      </span>
                    </div>
                  )}

                  {app.interviewResultNote && (
                    <p className="mt-1.5 text-[10px] text-slate-500 italic">
                      💬 {app.interviewResultNote}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SWIMLANE 3: BỘ PHẬN ĐÀO TẠO */}
        <div className="rounded-2xl border-2 border-emerald-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-xs">
                🎓
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Bộ phận Đào tạo
                </h4>
                <p className="text-[11px] text-slate-500">
                  Tiếng Hàn sơ cấp 1, điểm danh & luyện phỏng vấn trường song song
                </p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
              Song song
            </span>
          </div>

          <div className="mt-3.5 space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5">
                <span className="text-slate-500">Lớp học hiện tại:</span>
                <p className="font-bold text-slate-800 mt-0.5">{trainingTrack.classCode}</p>
                <p className="text-[10px] text-emerald-700 font-semibold mt-1">
                  {trainingTrack.koreanLevel}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5">
                <span className="text-slate-500">Tỷ lệ chuyên cần:</span>
                <p className="font-bold text-slate-800 mt-0.5">
                  {trainingTrack.attendanceRate}% (Nghỉ {trainingTrack.missedDays} buổi)
                </p>
                <p className="text-[10px] text-slate-500 mt-1">
                  Mục tiêu: {trainingTrack.topikGoal}
                </p>
              </div>
            </div>

            {/* Luyện phỏng vấn song song cùng hồ sơ */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
              <div className="flex items-center justify-between font-bold text-emerald-950">
                <span>🗣️ Luyện phỏng vấn trường (Mock Interview)</span>
                <span className="rounded bg-emerald-200 px-2 py-0.5 text-[11px] font-mono text-emerald-900">
                  {trainingTrack.mockInterviewScore
                    ? `${trainingTrack.mockInterviewScore}/10 điểm`
                    : 'Đang ôn luyện'}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-600">
                Đào tạo phối hợp với Hồ sơ tổ chức ôn luyện phỏng vấn trực tiếp theo bộ câu hỏi chuẩn của từng trường Hàn Quốc.
              </p>
            </div>
          </div>
        </div>

        {/* SWIMLANE 4: BỘ PHẬN KẾ TOÁN */}
        <div className="rounded-2xl border-2 border-amber-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-600 text-white font-bold text-xs">
                💰
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Bộ phận Kế toán (Chi phí & Hợp đồng)
                </h4>
                <p className="text-[11px] text-slate-500">
                  Theo Thông báo số 43/2026/TB-SHD (Trọn gói 115 triệu VNĐ)
                </p>
              </div>
            </div>
            <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200">
              3 Giai đoạn
            </span>
          </div>

          <div className="mt-3.5 space-y-2.5 text-xs">
            {paymentTrack.installments.map((inst: PaymentInstallment, idx: number) => (
              <div
                key={inst.phase}
                className={`rounded-xl border p-2.5 transition-all ${
                  inst.status === 'PAID'
                    ? 'border-emerald-200 bg-emerald-50/60'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-800">{inst.name}</span>
                    {inst.contractStored && idx === 0 && (
                      <span className="rounded bg-sky-100 px-1.5 py-0.2 text-[9px] font-semibold text-sky-800">
                        Đã lưu HĐ dịch vụ
                      </span>
                    )}
                  </div>
                  <span className="font-mono font-bold text-xs text-slate-900">
                    {inst.amount.toLocaleString('vi-VN')} VNĐ
                  </span>
                </div>

                <div className="mt-1 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">{inst.triggerDescription}</span>
                  <span
                    className={`font-semibold ${
                      inst.status === 'PAID' ? 'text-emerald-700' : 'text-amber-700'
                    }`}
                  >
                    {inst.status === 'PAID'
                      ? `✓ Đã thu (${inst.receiptNo})`
                      : '○ Chờ thu (trong 3 ngày)'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
