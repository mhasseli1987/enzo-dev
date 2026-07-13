export function Hero() {
  return (
    <header className="relative min-h-[92vh] flex flex-col justify-end px-6 pb-16 pt-28 sm:px-10 lg:px-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#c8ff4d]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-indigo-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl">
        <p
          className="mb-4 font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.35em] text-[#c8ff4d] uppercase"
          dir="ltr"
        >
          ENZO.DEV
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.15] text-white sm:text-5xl lg:text-6xl">
          طراحی سایت‌هایی که
          <span className="block text-[#c8ff4d]">مشتری را نگه می‌دارند</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-[#a8a8b5] sm:text-lg">
          لندینگ، فروشگاه، برندینگ — با تجربه بصری سینمایی، سرعت بالا و
          طراحی اختصاصی برای کسب‌وکار شما.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-[#c8ff4d] px-7 py-3.5 text-sm font-bold text-[#07070a] transition hover:scale-[1.02] hover:bg-[#d8ff7a]"
          >
            شروع پروژه
          </a>
          <a
            href="#showcase"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/5"
          >
            مشاهده نمونه‌کار
          </a>
        </div>
      </div>

      <div className="relative z-10 mt-16 flex items-center gap-3 text-xs text-[#6f6f7d]">
        <span className="h-px w-10 bg-white/15" />
        <span>اسکرول کنید</span>
      </div>
    </header>
  );
}
