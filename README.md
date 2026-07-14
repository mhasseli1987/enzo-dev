# ENZO.DEV — Scroll-Driven Demo

لندینگ تک‌صفحه‌ای با **اسکرول-ویدیو** (۲۴۱ فریم از کلیپ ۸ ثانیه‌ای).

## لوکال

```bash
npx serve . -l 3456
```

http://localhost:3456

## ویدیو

کلیپ را بگذارید در: `source/hero.mp4`

استخراج فریم‌ها:
```bash
ffmpeg -i source/hero.mp4 -vf "fps=30,scale=1920:-1" -c:v libwebp -quality 80 frames/frame_%04d.webp
```

## Netlify

- Publish: `.` (ریشه پروژه)
- بدون build command

## تماس

- LinkedIn: https://www.linkedin.com/in/mohammad-hasseli-59a624362/
- GitHub: https://github.com/mhasseli1987
