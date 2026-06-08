export default function ContactSection() {
  return (
    <section className="rounded-2xl border border-surface-border bg-gradient-to-br from-white to-brand-50 p-10 shadow-card sm:p-14">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">Get in touch</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">Let's collaborate</h2>
          <p className="mt-4 text-slate-600">Whether you're interested in our research, want to explore partnerships, or have questions about our products, we'd love to hear from you.</p>
        </div>
        <div className="flex flex-col justify-end gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Email</p>
            <a href="mailto:hello@mycodx.com" className="mt-2 text-lg font-semibold text-brand-600 hover:text-brand-700">
              hello@mycodx.com
            </a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Website</p>
            <a href="https://mycodx.com" target="_blank" rel="noopener noreferrer" className="mt-2 text-lg font-semibold text-brand-600 hover:text-brand-700">
              mycodx.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
