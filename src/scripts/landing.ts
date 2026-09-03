import Lenis from "lenis";

const PHONE = "33636376596";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const DESKTOP_SMOOTH_SCROLL = "(min-width: 1024px) and (pointer: fine)";

document.documentElement.classList.add("js");

function setupSmoothScroll() {
  const desktopMedia = window.matchMedia(DESKTOP_SMOOTH_SCROLL);
  const reducedMotionMedia = window.matchMedia(REDUCED_MOTION);
  let lenis: Lenis | null = null;
  let frame = 0;

  const stop = () => {
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
    lenis?.destroy();
    lenis = null;
  };

  const start = () => {
    if (lenis || !desktopMedia.matches || reducedMotionMedia.matches) return;

    lenis = new Lenis({
      duration: 1.15,
      easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
      smoothWheel: true,
      syncTouch: true,
      touchInertiaExponent: 1.35,
    });

    const animate = (time: number) => {
      lenis?.raf(time);
      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);
  };

  const update = () => {
    if (desktopMedia.matches && !reducedMotionMedia.matches) start();
    else stop();
  };

  update();
  desktopMedia.addEventListener("change", update);
  reducedMotionMedia.addEventListener("change", update);
}

function setupHeader() {
  const header = document.querySelector<HTMLElement>("[data-header]");
  const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const nav = document.querySelector<HTMLElement>("[data-nav]");
  if (!header || !toggle || !nav) return;

  const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 90);
  const closeMenu = () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Ouvrir le menu");
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    document.body.classList.toggle("menu-open", isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
}

function setupHero() {
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  const slides = Array.from(document.querySelectorAll<HTMLElement>("[data-hero-slide]"));
  const dots = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-hero-dot]"));
  const previous = document.querySelector<HTMLButtonElement>("[data-hero-prev]");
  const next = document.querySelector<HTMLButtonElement>("[data-hero-next]");
  if (!hero || slides.length < 2) return;

  let activeIndex = 0;
  let timer = 0;
  let transitionTimer = 0;
  const reduceMotion = window.matchMedia(REDUCED_MOTION).matches;

  const showSlide = (index: number) => {
    const nextIndex = (index + slides.length) % slides.length;
    if (nextIndex === activeIndex) return;

    const previousSlide = slides[activeIndex];
    const nextSlide = slides[nextIndex];
    window.clearTimeout(transitionTimer);
    slides.forEach((slide) => slide.classList.remove("leaving"));

    previousSlide.classList.remove("active");
    previousSlide.classList.add("leaving");
    previousSlide.setAttribute("aria-hidden", "true");

    nextSlide.classList.remove("active");
    void nextSlide.offsetWidth;
    nextSlide.classList.add("active");
    nextSlide.setAttribute("aria-hidden", "false");

    activeIndex = nextIndex;
    dots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === activeIndex));
    transitionTimer = window.setTimeout(() => previousSlide.classList.remove("leaving"), 680);
  };

  const stop = () => window.clearInterval(timer);
  const start = () => {
    stop();
    if (!reduceMotion) timer = window.setInterval(() => showSlide(activeIndex + 1), 6500);
  };

  previous?.addEventListener("click", () => { showSlide(activeIndex - 1); start(); });
  next?.addEventListener("click", () => { showSlide(activeIndex + 1); start(); });
  dots.forEach((dot, index) => dot.addEventListener("click", () => { showSlide(index); start(); }));
  hero.addEventListener("mouseenter", stop);
  hero.addEventListener("mouseleave", start);
  hero.addEventListener("focusin", stop);
  hero.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
  start();
}

function setupReveals() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
  if (!elements.length) return;

  if (window.matchMedia(REDUCED_MOTION).matches || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -10%", threshold: 0.12 });

  elements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 3, 2) * 70}ms`;
    observer.observe(element);
  });
}

function setupBookingForm() {
  const form = document.querySelector<HTMLFormElement>("[data-booking-form]");
  if (!form) return;

  const dateInput = form.elements.namedItem("date") as HTMLInputElement | null;
  if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const message = [
      "Bonjour Taxi by Atassi, je souhaite réserver une course.",
      "",
      `Nom : ${data.get("name")}`,
      `Téléphone : ${data.get("phone")}`,
      `Passagers : ${data.get("passengers")}`,
      `Départ : ${data.get("departure")}`,
      `Arrivée : ${data.get("arrival")}`,
      `Date : ${data.get("date")}`,
      `Heure : ${data.get("time")}`,
    ].join("\n");

    const note = form.querySelector<HTMLElement>("[data-form-note]");
    if (note) note.textContent = "Ouverture de WhatsApp…";
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });
}

function setupBackToTop() {
  const button = document.querySelector<HTMLButtonElement>("[data-back-to-top]");
  if (!button) return;

  const update = () => button.classList.toggle("visible", window.scrollY > 700);
  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: window.matchMedia(REDUCED_MOTION).matches ? "auto" : "smooth" }));
  window.addEventListener("scroll", update, { passive: true });
  update();
}

setupHeader();
setupSmoothScroll();
setupHero();
setupReveals();
setupBookingForm();
setupBackToTop();
