const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

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

const harnessSteps = document.querySelectorAll(".harness-steps > li");
if (harnessSteps.length) {
  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-active");
    });
  }, { threshold: 0.45, rootMargin: "0px 0px -8% 0px" });
  harnessSteps.forEach((li) => stepObserver.observe(li));
}

document.querySelectorAll('.harness-steps a[href^="#p-"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    target.classList.remove("flash-highlight");
    void target.offsetWidth;
    target.classList.add("flash-highlight");
    setTimeout(() => target.classList.remove("flash-highlight"), 1300);
  });
});
