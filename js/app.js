/* ENZO.DEV — scroll-driven frame sequence */
const FRAME_COUNT = 241;
const FRAME_SPEED = 2.0;
const IMAGE_SCALE = 0.85;
const FRAME_PATH = (i) => `frames/frame_${String(i + 1).padStart(4, "0")}.webp`;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWrap = document.getElementById("canvas-wrap");
const scrollContainer = document.getElementById("scroll-container");
const heroSection = document.getElementById("hero");
const loader = document.getElementById("loader");
const loaderFill = document.getElementById("loader-fill");
const loaderPercent = document.getElementById("loader-percent");

const frames = [];
let currentFrame = -1;
let bgColor = "#f5f3f0";

gsap.registerPlugin(ScrollTrigger);

/* ── Lenis ── */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

/* ── Canvas sizing ── */
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (currentFrame >= 0) drawFrame(currentFrame);
}
window.addEventListener("resize", resizeCanvas);

/* ── Background color sampling ── */
function sampleBgColor(img) {
  const tmp = document.createElement("canvas");
  tmp.width = tmp.height = 1;
  const tctx = tmp.getContext("2d");
  tctx.drawImage(img, 0, 0, 1, 1);
  const [r, g, b] = tctx.getImageData(0, 0, 1, 1).data;
  return `rgb(${r},${g},${b})`;
}

/* ── Draw frame (padded cover) ── */
function drawFrame(index) {
  const img = frames[index];
  if (!img || !img.complete) return;
  const cw = window.innerWidth;
  const ch = window.innerHeight;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const scale = Math.max(cw / iw, ch / ih) * IMAGE_SCALE;
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = (cw - dw) / 2;
  const dy = (ch - dh) / 2;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, cw, ch);
  ctx.drawImage(img, dx, dy, dw, dh);
}

/* ── Two-phase frame preloader ── */
function loadFrame(index) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = FRAME_PATH(index);
    img.onload = () => {
      frames[index] = img;
      if (index === 0) bgColor = sampleBgColor(img);
      if (index % 20 === 0 && frames[index]) bgColor = sampleBgColor(img);
      resolve();
    };
    img.onerror = () => resolve();
  });
}

async function preloadFrames() {
  const firstBatch = Math.min(10, FRAME_COUNT);
  for (let i = 0; i < firstBatch; i++) await loadFrame(i);
  updateLoader(firstBatch / FRAME_COUNT);

  const promises = [];
  for (let i = firstBatch; i < FRAME_COUNT; i++) {
    promises.push(
      loadFrame(i).then(() => updateLoader(frames.filter(Boolean).length / FRAME_COUNT))
    );
  }
  await Promise.all(promises);
  updateLoader(1);
  loader.classList.add("hidden");
  init();
}

function updateLoader(progress) {
  const pct = Math.round(progress * 100);
  loaderFill.style.width = pct + "%";
  loaderPercent.textContent = pct + "%";
}

/* ── Position sections at midpoint of enter/leave ── */
function positionSections() {
  document.querySelectorAll(".scroll-section").forEach((section) => {
    const enter = parseFloat(section.dataset.enter) / 100;
    const leave = parseFloat(section.dataset.leave) / 100;
    const mid = (enter + leave) / 2;
    section.style.top = mid * 100 + "%";
    section.style.transform = "translateY(-50%)";
  });
}

/* ── Section animation system ── */
function setupSectionAnimation(section) {
  const type = section.dataset.animation;
  const persist = section.dataset.persist === "true";
  const enter = parseFloat(section.dataset.enter) / 100;
  const leave = parseFloat(section.dataset.leave) / 100;
  const children = section.querySelectorAll(
    ".section-label, .section-heading, .section-body, .section-note, .cta-button, .cta-buttons, .stat"
  );

  const tl = gsap.timeline({ paused: true });

  switch (type) {
    case "fade-up":
      tl.from(children, { y: 50, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" });
      break;
    case "slide-left":
      tl.from(children, { x: -80, opacity: 0, stagger: 0.14, duration: 0.9, ease: "power3.out" });
      break;
    case "slide-right":
      tl.from(children, { x: 80, opacity: 0, stagger: 0.14, duration: 0.9, ease: "power3.out" });
      break;
    case "scale-up":
      tl.from(children, { scale: 0.85, opacity: 0, stagger: 0.12, duration: 1.0, ease: "power2.out" });
      break;
    case "rotate-in":
      tl.from(children, { y: 40, rotation: 3, opacity: 0, stagger: 0.1, duration: 0.9, ease: "power3.out" });
      break;
    case "stagger-up":
      tl.from(children, { y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" });
      break;
    case "clip-reveal":
      tl.from(children, { clipPath: "inset(100% 0 0 0)", opacity: 0, stagger: 0.15, duration: 1.2, ease: "power4.inOut" });
      break;
  }

  let played = false;

  ScrollTrigger.create({
    trigger: scrollContainer,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      const p = self.progress;
      if (p >= enter && p <= leave) {
        if (!played) {
          played = true;
          section.classList.add("visible");
          gsap.set(section, { opacity: 1 });
          tl.play();
        }
      } else if (!persist && played) {
        if (p < enter || p > leave) {
          played = false;
          section.classList.remove("visible");
          tl.reverse();
          gsap.set(section, { opacity: 0 });
        }
      }
    },
  });
}

/* ── Counter animations ── */
function initCounters() {
  const statsSection = document.querySelector(".section-stats");
  if (!statsSection) return;
  const enter = parseFloat(statsSection.dataset.enter) / 100;
  const counters = [];

  document.querySelectorAll(".stat-number").forEach((el) => {
    counters.push({
      el,
      target: parseFloat(el.dataset.value),
      decimals: parseInt(el.dataset.decimals || "0"),
      obj: { val: 0 },
    });
  });

  let counted = false;

  ScrollTrigger.create({
    trigger: scrollContainer,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      if (self.progress >= enter && !counted) {
        counted = true;
        counters.forEach(({ el, target, decimals, obj }) => {
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: "power1.out",
            onUpdate: () => {
              el.textContent = decimals === 0 ? Math.round(obj.val) : obj.val.toFixed(decimals);
            },
          });
        });
      } else if (self.progress < enter - 0.05 && counted) {
        counted = false;
        counters.forEach(({ el, obj }) => {
          obj.val = 0;
          el.textContent = "0";
        });
      }
    },
  });
}

/* ── Marquee ── */
function initMarquees() {
  document.querySelectorAll(".marquee-wrap").forEach((el) => {
    const speed = parseFloat(el.dataset.scrollSpeed) || -25;
    const enter = parseFloat(el.dataset.enter) / 100;
    const leave = parseFloat(el.dataset.leave) / 100;
    const text = el.querySelector(".marquee-text");

    gsap.to(text, {
      xPercent: speed,
      ease: "none",
      scrollTrigger: {
        trigger: scrollContainer,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    ScrollTrigger.create({
      trigger: scrollContainer,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;
        if (p >= enter - 0.04 && p <= leave + 0.04) {
          gsap.to(el, { opacity: 0.35, duration: 0.3 });
        } else {
          gsap.to(el, { opacity: 0, duration: 0.3 });
        }
      },
    });
  });
}

/* ── Dark overlay for stats ── */
function initDarkOverlay(enterPct, leavePct) {
  const overlay = document.getElementById("dark-overlay");
  const enter = enterPct / 100;
  const leave = leavePct / 100;
  const fadeRange = 0.04;

  ScrollTrigger.create({
    trigger: scrollContainer,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress;
      let opacity = 0;
      if (p >= enter - fadeRange && p <= enter) opacity = (p - (enter - fadeRange)) / fadeRange;
      else if (p > enter && p < leave) opacity = 0.9;
      else if (p >= leave && p <= leave + fadeRange) opacity = 0.9 * (1 - (p - leave) / fadeRange);
      overlay.style.opacity = opacity;
    },
  });
}

/* ── Circle-wipe hero reveal ── */
function initHeroTransition() {
  ScrollTrigger.create({
    trigger: scrollContainer,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress;
      heroSection.style.opacity = Math.max(0, 1 - p * 15);
      const wipeProgress = Math.min(1, Math.max(0, (p - 0.01) / 0.06));
      const radius = wipeProgress * 75;
      canvasWrap.style.clipPath = `circle(${radius}% at 50% 50%)`;
    },
  });
}

/* ── Frame-to-scroll binding ── */
function initFrameScroll() {
  ScrollTrigger.create({
    trigger: scrollContainer,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
      const accelerated = Math.min(self.progress * FRAME_SPEED, 1);
      const index = Math.min(Math.floor(accelerated * (FRAME_COUNT - 1)), FRAME_COUNT - 1);
      if (index !== currentFrame) {
        currentFrame = index;
        requestAnimationFrame(() => drawFrame(currentFrame));
      }
    },
  });
}

/* ── Init all ── */
function init() {
  resizeCanvas();
  positionSections();
  drawFrame(0);

  initFrameScroll();
  initHeroTransition();
  initDarkOverlay(54, 72);
  initMarquees();

  document.querySelectorAll(".scroll-section").forEach(setupSectionAnimation);
  initCounters();

  gsap.from(".hero-heading .word", {
    y: 80, opacity: 0, stagger: 0.15, duration: 1.2, ease: "power3.out", delay: 0.3,
  });
  gsap.from(".hero-tagline", { y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 0.8 });
}

preloadFrames();
