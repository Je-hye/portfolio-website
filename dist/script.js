const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    const count = entry.target.querySelector("[data-count]");
    if (count && !reduceMotion) {
      const target = Number(count.dataset.count);
      let value = 0;
      const timer = setInterval(() => {
        value += 1;
        count.textContent = value;
        if (value >= target) clearInterval(timer);
      }, 14);
    }
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
