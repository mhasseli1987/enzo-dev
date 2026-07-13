import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAMES = Array.from({ length: 12 }, (_, i) =>
  `/images/scroll/frame-${String(i + 1).padStart(2, "0")}.jpg`
);

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setMobile(mq.matches);
    const handler = () => setMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return mobile;
}

export function ScrollVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const useImageSequence = reducedMotion || isMobile;

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const images: HTMLImageElement[] = [];
    let loaded = 0;
    let trigger: ScrollTrigger | null = null;

    const setup = () => {
      if (useImageSequence) {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const draw = (index: number) => {
          const img = images[Math.min(index, images.length - 1)];
          if (!img?.complete) return;
          const ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
          const w = img.width * ratio;
          const h = img.height * ratio;
          const x = (canvas.width - w) / 2;
          const y = (canvas.height - h) / 2;
          ctx.fillStyle = "#07070a";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, x, y, w, h);
        };

        const resize = () => {
          canvas.width = pin.clientWidth;
          canvas.height = pin.clientHeight;
          draw(0);
        };
        resize();
        window.addEventListener("resize", resize);

        trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=220%",
          pin: pin,
          scrub: 1,
          onUpdate: (self) => {
            const idx = Math.floor(self.progress * (images.length - 1));
            draw(idx);
            if (progressRef.current) {
              progressRef.current.textContent = `${Math.round(self.progress * 100)}%`;
            }
          },
        });

        return () => {
          window.removeEventListener("resize", resize);
          trigger?.kill();
        };
      }

      const video = videoRef.current;
      if (!video) return;

      const onMeta = () => {
        trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=220%",
          pin: pin,
          scrub: 1,
          onUpdate: (self) => {
            if (video.duration) {
              video.currentTime = video.duration * self.progress;
            }
            if (progressRef.current) {
              progressRef.current.textContent = `${Math.round(self.progress * 100)}%`;
            }
          },
        });
      };

      if (video.readyState >= 1) onMeta();
      else video.addEventListener("loadedmetadata", onMeta, { once: true });

      return () => {
        video.removeEventListener("loadedmetadata", onMeta);
        trigger?.kill();
      };
    };

    if (useImageSequence) {
      FRAMES.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loaded += 1;
          if (loaded === FRAMES.length) setup();
        };
        images.push(img);
      });
      return () => {
        trigger?.kill();
      };
    }

    return setup();
  }, [useImageSequence]);

  return (
    <section id="showcase" ref={sectionRef} className="relative">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden bg-[#07070a]">
        {useImageSequence ? (
          <canvas ref={canvasRef} className="h-full w-full" />
        ) : (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src="/video/hero-scroll.mp4"
            muted
            playsInline
            preload="auto"
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07070a] via-transparent to-[#07070a]/40" />

        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-3 px-6 pb-10 sm:px-10 lg:px-16">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.3em] text-[#c8ff4d] uppercase" dir="ltr">
            Scroll Experience
          </p>
          <h2 className="max-w-xl text-2xl font-bold text-white sm:text-3xl">
            تجربه‌ای که با اسکرول زنده می‌شود
          </h2>
          <p className="max-w-lg text-sm leading-7 text-[#a8a8b5]">
            همان حس سایت‌های پریمیوم — انیمیشن، عمق بصری و روایت در یک صفحه.
          </p>
          <div className="mt-2 flex items-center gap-3 text-xs text-[#6f6f7d]">
            <span className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
              <span className="block h-full w-full origin-right scale-x-0 rounded-full bg-[#c8ff4d] transition-transform" />
            </span>
            <span dir="ltr">
              <span ref={progressRef}>0</span>%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
