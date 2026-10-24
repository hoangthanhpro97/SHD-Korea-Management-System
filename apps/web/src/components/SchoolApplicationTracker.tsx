import type { SchoolApplication } from '../types/schema'

interface SchoolApplicationTrackerProps {
  applications: SchoolApplication[]
}

const STEPS = [
  { key: 'INTERNAL_HANDOVER', label: 'Bàn giao Đối ngoại', icon: '📤' },
  { key: 'SENT_TO_SCHOOL', label: 'Đã gửi Trường', icon: '✈️' },
  { key: 'RECEIVED_BY_SCHOOL', label: 'Trường đã nhận', icon: '📥' },
  { key: 'INVOICE_ISSUED', label: 'Invoice / Đỗ trường', icon: '🎓' },
]

export default function SchoolApplicationTracker({
  applications,
}: SchoolApplicationTrackerProps) {
  const getStepStatus = (
    currentStatus: SchoolApplication['status'],
    stepKey: string
  ) => {
    const statusOrder = [
      'DRAFTED',
      'INTERNAL_HANDOVER',
      'SENT_TO_SCHOOL',
      'RECEIVED_BY_SCHOOL',
      'INTERVIEW_SCHEDULED',
      'INTERVIEW_PASSED',
      'INVOICE_ISSUED',
    ]
    const currentIndex = statusOrder.indexOf(currentStatus)
    const stepIndex = statusOrder.indexOf(stepKey)

    if (currentIndex >= stepIndex) return 'COMPLETED'
    return 'PENDING'
  }

  return (
    <div className="space-y-4">
      {/* Notice alert */}
      <div className="rounded-lg border border-sky-200 bg-sky-50 p-3 text-xs text-sky-900 flex items-start gap-2">
        <span className="text-base">💡</span>
        <div>
          <span className="font-semibold">Quy tắc nghiệp vụ cốt lõi: </span>
          <span>
            Hệ thống phân biệt rạch ròi 4 mốc độc lập: <strong>Bàn giao Đối ngoại</strong> ≠{' '}
            <strong>Đã gửi Trường</strong> ≠ <strong>Trường xác nhận nhận</strong> ≠{' '}
            <strong>Trường cấp Invoice/Nhận học</strong>. Không tính gộp học viên và phải có minh chứng riêng cho từng sự kiện.
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {applications.map((app) => (
          <div
            key={app.applicationId}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-slate-300 transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  {app.schoolName}
                </span>
                <h4 className="text-sm font-bold text-slate-800">
                  {app.studentName} — Chuyên ngành: {app.major}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                {app.invoiceAmountKRW && (
                  <span className="rounded-md bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-bold text-emerald-700">
                    Invoice: {app.invoiceAmountKRW.toLocaleString('vi-VN')} KRW
                  </span>
                )}
                {app.trackingCode && (
                  <span className="rounded-md bg-slate-100 border border-slate-200 px-2 py-0.5 text-[11px] font-mono text-slate-600">
                    Mã EMS: {app.trackingCode}
                  </span>
                )}
              </div>
            </div>

            {/* Stepper for 4 key milestones */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {STEPS.map((step) => {
                const status = getStepStatus(app.status, step.key)
                const isPassed = status === 'COMPLETED'
                return (
                  <div
                    key={step.key}
                    className={`flex items-center gap-2 rounded-lg border p-2.5 text-xs transition-colors ${
                      isPassed
                        ? 'border-emerald-200 bg-emerald-50/70 text-emerald-900'
                        : 'border-slate-200 bg-slate-50 text-slate-400'
                    }`}
                  >
                    <span className="text-base">{step.icon}</span>
                    <div className="truncate">
                      <p className="font-semibold truncate">{step.label}</p>
                      <p className="text-[10px] mt-0.5">
                        {isPassed ? '✓ Đã xác thực' : '○ Chờ cập nhật'}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {app.evidenceId && (
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 px-3 py-1.5 rounded-md">
                <span>Minh chứng xác thực: <code className="font-mono text-slate-700">{app.evidenceId}</code></span>
                <span className="text-emerald-600 font-medium">Đã kiểm tra chéo</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
