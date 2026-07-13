const LINKEDIN = "https://www.linkedin.com/in/mohammad-hasseli-59a624362/";
const GITHUB = "https://github.com/mhasseli1987";

export function ContactCTA() {
  return (
    <section id="contact" className="px-6 py-24 sm:px-10 lg:px-16">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111116] px-6 py-14 sm:px-10 sm:py-16">
        <div className="absolute -left-10 top-0 h-48 w-48 rounded-full bg-[#c8ff4d]/10 blur-[80px]" />
        <div className="relative z-10 max-w-2xl">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.3em] text-[#c8ff4d] uppercase" dir="ltr">
            ENZO.DEV
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            پروژه بعدی‌تان را بسازیم
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#a8a8b5] sm:text-base">
            برای مشاوره، قیمت‌گذاری یا شروع طراحی سایت — از طریق لینکدین یا
            گیت‌هاب در تماس باشید.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#c8ff4d] px-7 py-3.5 text-sm font-bold text-[#07070a] transition hover:bg-[#d8ff7a]"
            >
              LinkedIn
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/5"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      <footer className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-8 text-xs text-[#6f6f7d] sm:flex-row">
        <span dir="ltr" className="font-[family-name:var(--font-display)] font-semibold tracking-wider text-white/50">
          ENZO.DEV
        </span>
        <span>© {new Date().getFullYear()} — طراحی و توسعه وب</span>
      </footer>
    </section>
  );
}
