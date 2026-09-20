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

document.querySelectorAll(".impact-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--card-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--card-y", `${event.clientY - rect.top}px`);
  });
  card.addEventListener("click", () => card.classList.toggle("is-active"));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      card.classList.toggle("is-active");
    }
  });
});

if (!reduceMotion && matchMedia("(pointer:fine)").matches) {
  const orb = document.querySelector(".cursor-orb");
  addEventListener("pointermove", (event) => {
    orb.style.left = event.clientX + "px";
    orb.style.top = event.clientY + "px";
  });
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      card.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${y * -7}deg)`;
    });
    card.addEventListener("pointerleave", () => card.style.transform = "");
  });
}
