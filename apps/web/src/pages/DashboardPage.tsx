function DemoBadge() {
  return (
    <span className="rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-semibold tracking-wide text-amber-900">
      DEMO — DỮ LIỆU GIẢ LẬP
    </span>
  )
}

export default function DashboardPage() {
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Tổng quan</h1>
        <DemoBadge />
      </div>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-lg text-slate-700 md:text-xl">
          Chào mừng đến SHD Korea Management System
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
          Đây là khung giao diện demo chạy trên máy của bạn. Chọn mục menu để xem
          từng trang. Chưa có số liệu hồ sơ hay dữ liệu nghiệp vụ.
        </p>
      </section>
    </>
  )
}
