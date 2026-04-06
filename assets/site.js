const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const currentPath = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("[data-nav-link], .nav-priority a").forEach((link) => {
  const target = link.getAttribute("href");
  if (target === currentPath) {
    link.setAttribute("aria-current", "page");
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

document.querySelectorAll("[data-consultant-select]").forEach((select) => {
  const targetId = select.getAttribute("data-other-target");
  const target = targetId ? document.getElementById(targetId) : null;
  const input = target ? target.querySelector("input") : null;

  if (!target || !input) {
    return;
  }

  const syncOtherField = () => {
    const showOther = select.value === "Other";
    target.classList.toggle("is-hidden", !showOther);
    target.setAttribute("aria-hidden", String(!showOther));
    input.disabled = !showOther;
    input.required = showOther;

    if (!showOther) {
      input.value = "";
    }
  };

  syncOtherField();
  select.addEventListener("change", syncOtherField);
});

document.querySelectorAll("[data-payment-switch]").forEach((switcher) => {
  const buttons = switcher.querySelectorAll("[data-payment-target]");
  const panels = document.querySelectorAll("[data-payment-panel]");

  if (!buttons.length || !panels.length) {
    return;
  }

  const setActive = (targetId) => {
    buttons.forEach((button) => {
      const active = button.getAttribute("data-payment-target") === targetId;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });

    panels.forEach((panel) => {
      const active = panel.id === targetId;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => setActive(button.getAttribute("data-payment-target")));
  });

  const initialTarget = switcher.getAttribute("data-payment-default") || buttons[0].getAttribute("data-payment-target");
  setActive(initialTarget);
});
