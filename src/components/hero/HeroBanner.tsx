import { Link } from 'react-router-dom'

export default function HeroBanner() {
  return (
    <section className="space-y-6 rounded-2xl border border-surface-border bg-gradient-to-br from-white via-blue-50 to-white p-10 shadow-card sm:p-14 lg:p-16">
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">Welcome to MycoDx Lab</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Transforming TB diagnosis with AI and innovation
          </h1>
        </div>
        <p className="max-w-2xl text-lg text-slate-600">
          We're developing intelligent diagnostic solutions that combine artificial intelligence, clinical expertise, and digital health technology to improve tuberculosis detection and patient outcomes globally.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <Link
            to="/research/areas"
            className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 shadow-soft"
          >
            Explore Research
          </Link>
          <Link
            to="/product"
            className="inline-flex items-center justify-center rounded-full border border-brand-300 bg-white px-6 py-3 text-sm font-semibold text-brand-600 transition hover:bg-brand-50"
          >
            View Products
          </Link>
        </div>
      </div>
    </section>
  )
}
