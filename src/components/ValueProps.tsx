const values = [
  {
    num: "01",
    title: "طراحی اختصاصی",
    desc: "نه قالب آماده — هر پروژه با هویت بصری منحصربه‌فرد شما ساخته می‌شود.",
  },
  {
    num: "02",
    title: "سرعت و عملکرد",
    desc: "بهینه برای موبایل و سئو؛ سایت سریع = اعتماد بیشتر مشتری.",
  },
  {
    num: "03",
    title: "تجربه سینمایی",
    desc: "انیمیشن اسکرول، تعامل هوشمند و روایت بصری برای ماندگاری در ذهن.",
  },
];

export function ValueProps() {
  return (
    <section className="border-y border-white/8 bg-[#0c0c10] px-6 py-24 sm:px-10 lg:px-16">
      <div className="mb-12">
        <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.3em] text-[#c8ff4d] uppercase" dir="ltr">
          Why ENZO.DEV
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">چرا با من کار کنید؟</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {values.map((v) => (
          <div
            key={v.num}
            className="rounded-2xl border border-white/8 bg-[#111116] p-6 transition hover:border-[#c8ff4d]/30"
          >
            <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#c8ff4d]/40" dir="ltr">
              {v.num}
            </span>
            <h3 className="mt-4 text-xl font-bold text-white">{v.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#a8a8b5]">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
