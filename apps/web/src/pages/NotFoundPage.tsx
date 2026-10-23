import { Link } from 'react-router'

function DemoBadge() {
  return (
    <span className="rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-semibold tracking-wide text-amber-900">
      DEMO — DỮ LIỆU GIẢ LẬP
    </span>
  )
}

export default function NotFoundPage() {
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Không tìm thấy trang
        </h1>
        <DemoBadge />
      </div>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-slate-600">Đường dẫn này không tồn tại trong bản demo.</p>
        <Link
          to="/"
          className="mt-4 inline-block text-sm font-semibold text-sky-800 underline"
        >
          Về Tổng quan
        </Link>
      </section>
    </>
  )
}
