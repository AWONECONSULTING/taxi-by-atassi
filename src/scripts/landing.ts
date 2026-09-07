import Lenis from "lenis";

const PHONE = "33636376596";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const DESKTOP_SMOOTH_SCROLL = "(min-width: 1024px) and (pointer: fine)";
const TABLET = "(min-width: 561px) and (max-width: 840px)";
const MOBILE = "(max-width: 840px)";

document.documentElement.classList.add("js");

const pageScroll = document.querySelector<HTMLElement>("[data-page-scroll]");
const scrollSource: Window | HTMLElement = window.matchMedia(MOBILE).matches && pageScroll ? pageScroll : window;
const getScrollTop = () => scrollSource instanceof Window ? window.scrollY : scrollSource.scrollTop;
const listenToScroll = (listener: EventListener) => scrollSource.addEventListener("scroll", listener, { passive: true });

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
  const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const nav = document.querySelector<HTMLElement>("[data-nav]");
  const servicesToggle = document.querySelector<HTMLButtonElement>("[data-services-toggle]");
  const servicesGroup = servicesToggle?.closest<HTMLElement>(".nav-services-group");
  if (!toggle || !nav) return;
  const closeServices = () => {
    servicesGroup?.classList.remove("open");
    servicesToggle?.setAttribute("aria-expanded", "false");
    servicesToggle?.setAttribute("aria-label", "Afficher les sous-menus de Nos services");
  };
  const closeMenu = () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Ouvrir le menu");
    document.body.classList.remove("menu-open");
    closeServices();
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    document.body.classList.toggle("menu-open", isOpen);
  });

  servicesToggle?.addEventListener("click", () => {
    const isOpen = servicesGroup?.classList.toggle("open") ?? false;
    servicesToggle.setAttribute("aria-expanded", String(isOpen));
    servicesToggle.setAttribute("aria-label", `${isOpen ? "Masquer" : "Afficher"} les sous-menus de Nos services`);
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
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
  hero.addEventListener("focusin", stop);
  hero.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
  start();
}

function setupHeroParallax() {
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  if (!hero) return;

  const reducedMotionMedia = window.matchMedia(REDUCED_MOTION);
  const compactMedia = window.matchMedia("(max-width: 840px)");
  let frame = 0;

  const render = () => {
    frame = 0;

    if (reducedMotionMedia.matches) {
      hero.style.removeProperty("--hero-parallax-y");
      hero.style.removeProperty("--hero-parallax-scale");
      hero.style.removeProperty("--hero-content-opacity");
      return;
    }

    const bounds = hero.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, -bounds.top / bounds.height));
    const parallaxDistance = Math.min(bounds.height * 0.2, 220);
    const parallaxScale = compactMedia.matches
      ? 1.08 + progress * 0.12
      : 1.24 + progress * 0.24;
    const fadeProgress = Math.min(1, progress / 0.5);
    const contentOpacity = (1 - fadeProgress) ** 1.35;

    hero.style.setProperty("--hero-parallax-y", `${progress * parallaxDistance}px`);
    hero.style.setProperty("--hero-parallax-scale", parallaxScale.toFixed(3));
    hero.style.setProperty("--hero-content-opacity", contentOpacity.toFixed(3));
  };

  const requestRender = () => {
    if (!frame) frame = window.requestAnimationFrame(render);
  };

  listenToScroll(requestRender);
  window.addEventListener("resize", requestRender, { passive: true });
  reducedMotionMedia.addEventListener("change", requestRender);
  compactMedia.addEventListener("change", requestRender);
  render();
}

function setupFinalCtaParallax() {
  const section = document.querySelector<HTMLElement>("[data-final-cta]");
  if (!section) return;

  const reducedMotionMedia = window.matchMedia(REDUCED_MOTION);
  let frame = 0;

  const render = () => {
    frame = 0;

    if (reducedMotionMedia.matches) {
      section.style.removeProperty("--final-cta-parallax-scale");
      return;
    }

    const bounds = section.getBoundingClientRect();
    const start = window.innerHeight * 1.05;
    const end = window.innerHeight * 0.18;
    const progress = Math.min(1, Math.max(0, (start - bounds.top) / (start - end)));
    const easedProgress = progress * progress * (3 - 2 * progress);
    const scale = 1.07 - easedProgress * 0.07;

    section.style.setProperty("--final-cta-parallax-scale", scale.toFixed(3));
  };

  const requestRender = () => {
    if (!frame) frame = window.requestAnimationFrame(render);
  };

  listenToScroll(requestRender);
  window.addEventListener("resize", requestRender, { passive: true });
  reducedMotionMedia.addEventListener("change", requestRender);
  render();
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
      const element = entry.target as HTMLElement;
      const clearRevealDelay = (event: TransitionEvent) => {
        if (event.target !== element || (event.propertyName !== "opacity" && event.propertyName !== "transform")) return;
        element.style.removeProperty("transition-delay");
        element.removeEventListener("transitionend", clearRevealDelay);
      };

      element.addEventListener("transitionend", clearRevealDelay);
      element.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -10%", threshold: 0.12 });

  elements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 3, 2) * 70}ms`;
    observer.observe(element);
  });
}

function setupFigureCounters() {
  const section = document.querySelector<HTMLElement>(".figures");
  const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-counter]"));
  if (!section || !counters.length) return;

  const setFinalValues = () => {
    counters.forEach((counter) => {
      counter.textContent = counter.dataset.counterValue ?? "0";
    });
  };

  if (window.matchMedia(REDUCED_MOTION).matches || !("IntersectionObserver" in window)) {
    setFinalValues();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();

    window.setTimeout(() => {
      const duration = 2000;
      const start = performance.now();

      const animate = (time: number) => {
        const progress = Math.min(1, (time - start) / duration);
        const easedProgress = 1 - (1 - progress) ** 3;

        counters.forEach((counter) => {
          const target = Number(counter.dataset.counterValue ?? 0);
          counter.textContent = String(Math.round(target * easedProgress));
        });

        if (progress < 1) window.requestAnimationFrame(animate);
        else setFinalValues();
      };

      window.requestAnimationFrame(animate);
    }, 300);
  }, { rootMargin: "0px 0px -12%", threshold: 0.25 });

  observer.observe(section);
}

function setupServicesPanel() {
  const panel = document.querySelector<HTMLElement>(".services");
  const reservation = document.querySelector<HTMLElement>(".reservation");
  if (!panel || !reservation) return;

  const reducedMotionMedia = window.matchMedia(REDUCED_MOTION);
  let frame = 0;

  const render = () => {
    frame = 0;

    if (reducedMotionMedia.matches) {
      panel.style.removeProperty("--services-panel-y");
      return;
    }

    const radiusParts = window.getComputedStyle(panel).borderTopLeftRadius.split(/\s+/);
    const curveDepth = Number.parseFloat(radiusParts[1] ?? radiusParts[0]) || 0;
    const restingTop = reservation.getBoundingClientRect().bottom - curveDepth;
    const start = window.innerHeight * 0.93;
    const end = window.innerHeight * 0.48;
    const progress = Math.min(1, Math.max(0, (start - restingTop) / (start - end)));
    const travel = Math.min(220, Math.max(110, window.innerHeight * 0.2));

    panel.style.setProperty("--services-panel-y", `${(1 - progress) * travel}px`);
  };

  const requestRender = () => {
    if (!frame) frame = window.requestAnimationFrame(render);
  };

  listenToScroll(requestRender);
  window.addEventListener("resize", requestRender, { passive: true });
  reducedMotionMedia.addEventListener("change", requestRender);
  render();
}

function setupDetailMediaMotion() {
  const rows = Array.from(document.querySelectorAll<HTMLElement>(".detail-row"));
  if (!rows.length) return;

  const reducedMotionMedia = window.matchMedia(REDUCED_MOTION);
  const compactMedia = window.matchMedia(MOBILE);
  let frame = 0;

  const render = () => {
    frame = 0;

    rows.forEach((row) => {
      const media = row.querySelector<HTMLElement>(".detail-media");
      const card = row.querySelector<HTMLElement>(".detail-copy");
      if (!media) return;

      if (reducedMotionMedia.matches) {
        media.style.removeProperty("--detail-image-x");
        media.style.removeProperty("--detail-image-y");
        media.style.removeProperty("--detail-parallax-y");
        media.style.removeProperty("--detail-index-x");
        media.style.removeProperty("--detail-index-opacity");
        media.style.removeProperty("--detail-index-scale");
        card?.style.removeProperty("--detail-card-x");
        card?.style.removeProperty("--detail-card-opacity");
        return;
      }

      const top = media.getBoundingClientRect().top;
      const mediaHeight = media.offsetHeight;
      const imageStart = window.innerHeight * 0.66;
      const imageEnd = window.innerHeight * 0.22;
      const imageProgress = Math.min(1, Math.max(0, (imageStart - top) / (imageStart - imageEnd)));
      const indexDelay = row.id === "vsl" ? -0.08 : 0;
      const indexStart = window.innerHeight * (0.3 - indexDelay);
      const indexEnd = window.innerHeight * (0.04 - indexDelay);
      const rawIndexProgress = Math.min(1, Math.max(0, (indexStart - top) / (indexStart - indexEnd)));
      const indexProgress = rawIndexProgress * rawIndexProgress * (3 - 2 * rawIndexProgress);
      const parallaxProgress = Math.min(1, Math.max(0, (window.innerHeight - top) / (window.innerHeight + mediaHeight)));
      const isReverse = row.classList.contains("reverse");
      const frameOffset = isReverse ? -24 : 24;
      const indexOffset = isReverse ? -38 : 38;

      media.style.setProperty("--detail-image-x", `${(1 - imageProgress) * frameOffset}px`);
      media.style.setProperty("--detail-image-y", `${(1 - imageProgress) * 24}px`);
      media.style.setProperty("--detail-parallax-y", `${150 - parallaxProgress * 300}px`);
      media.style.setProperty("--detail-index-x", `${(1 - indexProgress) * indexOffset}px`);
      media.style.setProperty("--detail-index-opacity", indexProgress.toFixed(3));
      media.style.setProperty("--detail-index-scale", (0.9 + indexProgress * 0.1).toFixed(3));

      if (card && compactMedia.matches) {
        const cardTop = card.getBoundingClientRect().top;
        const cardStart = window.innerHeight * 0.8;
        const cardEnd = window.innerHeight * 0.48;
        const rawCardProgress = Math.min(1, Math.max(0, (cardStart - cardTop) / (cardStart - cardEnd)));
        const cardProgress = rawCardProgress * rawCardProgress * (3 - 2 * rawCardProgress);
        const cardDirection = isReverse ? 1 : -1;

        card.style.setProperty("--detail-card-x", `${(1 - cardProgress) * cardDirection * 42}px`);
        card.style.setProperty("--detail-card-opacity", cardProgress.toFixed(3));
      } else {
        card?.style.removeProperty("--detail-card-x");
        card?.style.removeProperty("--detail-card-opacity");
      }
    });
  };

  const requestRender = () => {
    if (!frame) frame = window.requestAnimationFrame(render);
  };

  listenToScroll(requestRender);
  window.addEventListener("resize", requestRender, { passive: true });
  reducedMotionMedia.addEventListener("change", requestRender);
  compactMedia.addEventListener("change", requestRender);
  render();
}

function setupSectionBridgeMotion() {
  const bridge = document.querySelector<HTMLElement>(".section-bridge");
  if (!bridge) return;

  const reducedMotionMedia = window.matchMedia(REDUCED_MOTION);
  const tabletMedia = window.matchMedia(TABLET);
  let frame = 0;

  const render = () => {
    frame = 0;

    if (reducedMotionMedia.matches) {
      bridge.style.removeProperty("--bridge-line-progress");
      bridge.style.removeProperty("--bridge-outline-progress");
      bridge.style.removeProperty("--bridge-depth-z");
      bridge.style.removeProperty("--bridge-float-up");
      bridge.style.removeProperty("--bridge-float-radius");
      bridge.style.removeProperty("--bridge-float-left");
      bridge.style.removeProperty("--bridge-float-diagonal");
      bridge.style.removeProperty("--bridge-float-diagonal-left");
      bridge.style.removeProperty("--bridge-float-diagonal-up");
      bridge.style.removeProperty("--bridge-shadow-y");
      bridge.style.removeProperty("--bridge-shadow-blur");
      bridge.style.removeProperty("--bridge-shadow-alpha");
      return;
    }

    const center = bridge.getBoundingClientRect().top;
    const start = window.innerHeight * (tabletMedia.matches ? 0.8 : 0.96);
    const end = window.innerHeight * (tabletMedia.matches ? 0.34 : 0.42);
    const progress = Math.min(1, Math.max(0, (start - center) / (start - end)));
    const lineProgress = Math.min(1, progress / 0.58);
    const rawOutlineProgress = Math.min(1, Math.max(0, (progress - 0.58) / 0.24));
    const outlineProgress = rawOutlineProgress * rawOutlineProgress * (3 - 2 * rawOutlineProgress);
    const rawDepthProgress = Math.min(1, Math.max(0, (progress - 0.82) / 0.18));
    const depthProgress = rawDepthProgress * rawDepthProgress * (3 - 2 * rawDepthProgress);

    bridge.style.setProperty("--bridge-line-progress", lineProgress.toFixed(3));
    bridge.style.setProperty("--bridge-outline-progress", outlineProgress.toFixed(3));
    bridge.style.setProperty("--bridge-depth-z", `${(34 * depthProgress).toFixed(2)}px`);
    bridge.style.setProperty("--bridge-float-radius", `${(6 * depthProgress).toFixed(2)}px`);
    bridge.style.setProperty("--bridge-float-left", `${(-6 * depthProgress).toFixed(2)}px`);
    bridge.style.setProperty("--bridge-float-up", `${(-6 * depthProgress).toFixed(2)}px`);
    bridge.style.setProperty("--bridge-float-diagonal", `${(4.24 * depthProgress).toFixed(2)}px`);
    bridge.style.setProperty("--bridge-float-diagonal-left", `${(-4.24 * depthProgress).toFixed(2)}px`);
    bridge.style.setProperty("--bridge-float-diagonal-up", `${(-4.24 * depthProgress).toFixed(2)}px`);
    bridge.style.setProperty("--bridge-shadow-y", `${(18 + depthProgress * 12).toFixed(2)}px`);
    bridge.style.setProperty("--bridge-shadow-blur", `${(45 + depthProgress * 18).toFixed(2)}px`);
    bridge.style.setProperty("--bridge-shadow-alpha", (0.24 + depthProgress * 0.16).toFixed(3));
  };

  const requestRender = () => {
    if (!frame) frame = window.requestAnimationFrame(render);
  };

  listenToScroll(requestRender);
  window.addEventListener("resize", requestRender, { passive: true });
  reducedMotionMedia.addEventListener("change", requestRender);
  tabletMedia.addEventListener("change", requestRender);
  render();
}

function setupPartnerMarquee() {
  const marquee = document.querySelector<HTMLElement>("[data-marquee]");
  const track = marquee?.querySelector<HTMLElement>(".partner-track");
  if (!marquee || !track) return;

  const reducedMotionMedia = window.matchMedia(REDUCED_MOTION);
  let dragging = false;
  let pointerId = -1;
  let position = 0;
  let previousX = 0;
  let previousTime = 0;
  let velocity = 0;
  let inertiaFrame = 0;

  const loopPosition = (value: number) => {
    const loopWidth = track.scrollWidth / 2;
    if (!loopWidth) return value;
    return ((value % loopWidth) - loopWidth) % loopWidth;
  };

  const renderPosition = () => {
    position = loopPosition(position);
    track.style.setProperty("--partner-offset", `${position}px`);
  };

  const getAnimatedPosition = () => {
    const transform = window.getComputedStyle(track).transform;
    if (transform === "none") return position;

    try {
      return new DOMMatrixReadOnly(transform).m41;
    } catch {
      return position;
    }
  };

  const stopInertia = () => {
    if (inertiaFrame) window.cancelAnimationFrame(inertiaFrame);
    inertiaFrame = 0;
    marquee.classList.remove("is-gliding");
  };

  const resumeAutomaticScroll = () => {
    inertiaFrame = 0;
    marquee.classList.remove("is-gliding");
  };

  const startInertia = () => {
    if (reducedMotionMedia.matches || Math.abs(velocity) < 0.04) {
      resumeAutomaticScroll();
      return;
    }

    marquee.classList.add("is-gliding");
    let lastFrameTime = performance.now();

    const glide = (time: number) => {
      const elapsed = Math.min(time - lastFrameTime, 32);
      lastFrameTime = time;
      position += velocity * elapsed;
      velocity *= 0.94 ** (elapsed / 16.67);
      renderPosition();

      if (Math.abs(velocity) < 0.02) {
        resumeAutomaticScroll();
        return;
      }

      inertiaFrame = window.requestAnimationFrame(glide);
    };

    inertiaFrame = window.requestAnimationFrame(glide);
  };

  marquee.addEventListener("pointerdown", (event) => {
    if (reducedMotionMedia.matches || event.button !== 0 || !event.isPrimary) return;

    stopInertia();
    position = getAnimatedPosition();
    dragging = true;
    pointerId = event.pointerId;
    previousX = event.clientX;
    previousTime = performance.now();
    velocity = 0;
    marquee.classList.add("is-dragging");
    renderPosition();
    marquee.setPointerCapture(pointerId);
  });

  marquee.addEventListener("pointermove", (event) => {
    if (!dragging || event.pointerId !== pointerId) return;

    const time = performance.now();
    const elapsed = Math.max(time - previousTime, 1);
    const distance = event.clientX - previousX;
    position += distance;
    velocity = Math.max(-2.5, Math.min(2.5, velocity * 0.65 + (distance / elapsed) * 0.35));
    previousX = event.clientX;
    previousTime = time;
    renderPosition();
  });

  const release = (event: PointerEvent) => {
    if (!dragging || event.pointerId !== pointerId) return;

    dragging = false;
    marquee.classList.remove("is-dragging");
    if (marquee.hasPointerCapture(pointerId)) marquee.releasePointerCapture(pointerId);
    pointerId = -1;
    startInertia();
  };

  marquee.addEventListener("pointerup", release);
  marquee.addEventListener("pointercancel", release);
  marquee.addEventListener("dragstart", (event) => event.preventDefault());
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
    const name = String(data.get("name"));
    const date = String(data.get("date")).split("-").reverse().join("/");
    const message = [
      "Bonjour,",
      "",
      "Voici ma demande de réservation 😊 :",
      "",
      `📛 *Nom* : ${name}`,
      `📞 *Téléphone* : ${data.get("phone")}`,
      `👥 *Nombre de passagers* : ${data.get("passengers")}`,
      `📍 *Départ* : ${data.get("departure")}`,
      `🏁 *Arrivée* : ${data.get("arrival")}`,
      `📅 *Date* : ${date}`,
      `⏰ *Heure* : ${data.get("time")}`,
      "",
      "Merci,",
      name,
    ].join("\n");

    const note = form.querySelector<HTMLElement>("[data-form-note]");
    if (note) note.textContent = "Ouverture de WhatsApp…";
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });
}

function setupBackToTop() {
  const button = document.querySelector<HTMLButtonElement>("[data-back-to-top]");
  if (!button) return;

  const update = () => button.classList.toggle("visible", getScrollTop() > 700);
  button.addEventListener("click", () => scrollSource.scrollTo({ top: 0, behavior: window.matchMedia(REDUCED_MOTION).matches ? "auto" : "smooth" }));
  listenToScroll(update);
  update();
}

setupHeader();
setupSmoothScroll();
setupHero();
setupHeroParallax();
setupFinalCtaParallax();
setupServicesPanel();
setupDetailMediaMotion();
setupSectionBridgeMotion();
setupReveals();
setupFigureCounters();
setupPartnerMarquee();
setupBookingForm();
setupBackToTop();
