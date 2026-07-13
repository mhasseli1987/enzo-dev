const items = [
  {
    title: "فروشگاه آنلاین",
    tag: "E-Commerce",
    image: "/images/portfolio/01.jpg",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    title: "لندینگ برند",
    tag: "Brand",
    image: "/images/portfolio/02.jpg",
    span: "",
  },
  {
    title: "پنل مدیریت",
    tag: "Dashboard",
    image: "/images/portfolio/03.jpg",
    span: "",
  },
  {
    title: "سایت شرکتی",
    tag: "Corporate",
    image: "/images/portfolio/04.jpg",
    span: "sm:col-span-2",
  },
  {
    title: "پورتفولیو خلاق",
    tag: "Creative",
    image: "/images/portfolio/05.jpg",
    span: "",
  },
  {
    title: "اپ لندینگ",
    tag: "App",
    image: "/images/portfolio/06.jpg",
    span: "",
  },
];

export function PortfolioGrid() {
  return (
    <section className="px-6 py-24 sm:px-10 lg:px-16">
      <div className="mb-12 max-w-2xl">
        <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.3em] text-[#c8ff4d] uppercase" dir="ltr">
          Selected Work
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">نمونه‌کارهای بصری</h2>
        <p className="mt-4 text-sm leading-7 text-[#a8a8b5] sm:text-base">
          ترکیبی از طراحی مدرن، تایپوگرافی قوی و تجربه کاربری روان — برای جذب
          و تبدیل مخاطب.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:auto-rows-[220px]">
        {items.map((item) => (
          <article
            key={item.title}
            className={`group relative overflow-hidden rounded-2xl border border-white/8 bg-[#111116] ${item.span}`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-[family-name:var(--font-display)] text-[10px] tracking-[0.25em] text-[#c8ff4d] uppercase" dir="ltr">
                {item.tag}
              </p>
              <h3 className="mt-1 text-lg font-bold text-white">{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
