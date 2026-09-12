const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const count = document.querySelector("[data-count]");
if (count) {
  const target = Number(count.dataset.count);
  const countContainer = count.closest("article") || count;
  let animationFrame;
  const renderCount = (value) => { count.textContent = String(Math.round(value)); };
  const playCount = () => {
    cancelAnimationFrame(animationFrame);
    if (reduceMotion) {
      renderCount(target);
      return;
    }
    const duration = 1650;
    const startedAt = performance.now();
    renderCount(0);
    const tick = (now) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      renderCount(target * eased);
      if (progress < 1) animationFrame = requestAnimationFrame(tick);
    };
    animationFrame = requestAnimationFrame(tick);
  };
  const countObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && entry.intersectionRatio >= .55) {
      if (countContainer.dataset.countState !== "playing") {
        countContainer.dataset.countState = "playing";
        playCount();
      }
    } else if (!entry.isIntersecting) {
      countContainer.dataset.countState = "idle";
      if (!reduceMotion) renderCount(0);
    }
  }, { threshold: [0, .55] });
  countObserver.observe(countContainer);
}

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", open);
  menu.textContent = open ? (menu.dataset.closeLabel || "Close") : (menu.dataset.openLabel || "Menu");
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
  menu.textContent = menu.dataset.openLabel || "Menu";
}));

if (!reduceMotion) {
  const orb = document.querySelector(".cursor-orb");
  if (matchMedia("(pointer:fine)").matches) addEventListener("pointermove", (event) => {
    orb.style.left = event.clientX + "px";
    orb.style.top = event.clientY + "px";
  });
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    const portrait = card.querySelector(".portrait-card");
    const tape = card.querySelector(".tape");
    const stickerA = card.querySelector(".sticker-a");
    const stickerB = card.querySelector(".sticker-b");
    const orbit = card.querySelector(".orbit-label");
    const move = (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      const strength = event.pointerType === "touch" ? 9 : 14;
      card.classList.add("is-interacting");
      card.style.transform = `perspective(780px) rotateY(${x * strength}deg) rotateX(${y * -strength}deg) scale(1.035)`;
      if (portrait) portrait.style.transform = `rotate(2deg) translate3d(${x * 18}px, ${y * 14}px, 32px)`;
      if (tape) tape.style.transform = `rotate(${-5 + x * 8}deg) translate3d(${x * 12}px, ${y * 8}px, 58px)`;
      if (stickerA) stickerA.style.transform = `translate3d(${x * 28}px, ${y * 22}px, 72px) rotate(${x * 7}deg)`;
      if (stickerB) stickerB.style.transform = `translate3d(${x * -24}px, ${y * -20}px, 68px) rotate(${-10 - x * 7}deg)`;
      if (orbit) orbit.style.transform = `translate3d(${x * 16}px, ${y * 12}px, 46px) rotate(${-5 + x * 4}deg)`;
    };
    const reset = () => {
      card.classList.remove("is-interacting");
      card.style.transform = "";
      [portrait, tape, stickerA, stickerB, orbit].forEach((element) => { if (element) element.style.transform = ""; });
    };
    card.addEventListener("pointerdown", (event) => { card.setPointerCapture?.(event.pointerId); move(event); });
    card.addEventListener("pointermove", (event) => { if (event.pointerType === "mouse" || card.hasPointerCapture?.(event.pointerId)) move(event); });
    card.addEventListener("pointerup", reset);
    card.addEventListener("pointercancel", reset);
    card.addEventListener("pointerleave", reset);
    card.addEventListener("blur", reset);
  });
}
