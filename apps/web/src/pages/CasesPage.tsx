function DemoBadge() {
  return (
    <span className="rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-semibold tracking-wide text-amber-900">
      DEMO — DỮ LIỆU GIẢ LẬP
    </span>
  )
}

export default function CasesPage() {
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Hồ sơ du học</h1>
        <DemoBadge />
      </div>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-slate-600">Chức năng đang được xây dựng</p>
      </section>
    </>
  )
}
