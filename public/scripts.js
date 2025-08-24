document.addEventListener("DOMContentLoaded", () => {
  initAccordion();
  initCopyButtons();
  initResponseTabs();
  ThemeSelector.initAll();
});

// 📁 Acordeón de secciones
function initAccordion() {
  document.querySelectorAll(".page-doc__header").forEach((header) => {
    header.addEventListener("click", () => {
      const doc = header.closest(".page-doc");
      doc.classList.toggle("collapsed");
    });
  });
}

// 📋 Botón de copiar contenido
function initCopyButtons() {
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const pre = btn.nextElementSibling;
      if (!pre) return;
      try {
        await navigator.clipboard.writeText(pre.textContent);
        btn.textContent = "Copied!";
        setTimeout(() => (btn.textContent = "Copy"), 1000);
      } catch {
        btn.textContent = "Error";
        setTimeout(() => (btn.textContent = "Copy"), 1000);
      }
    });
  });
}

// 🧩 Tabs de respuestas
function initResponseTabs() {
  document.querySelectorAll(".response-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const status = tab.dataset.status;
      const parent = tab.closest(".page-doc__responses");

      parent.querySelectorAll(".response-tab").forEach((t) => t.classList.remove("active"));
      parent.querySelectorAll(".response-content").forEach((rc) => rc.classList.remove("active"));

      tab.classList.add("active");
      parent.querySelector(`.response-content[data-status="${status}"]`)?.classList.add("active");
    });
  });
}

// 🎨 Selector de tema visual
class ThemeSelector {
  constructor(selectEl) {
    this.selectEl = selectEl;
    this.init();
  }

  init() {
    const savedTheme = ThemeSelector.getCookie("stexdoc-theme");
    const currentTheme = savedTheme || this.selectEl.value;

    document.documentElement.setAttribute("data-theme", currentTheme);
    this.selectEl.value = currentTheme;

    this.selectEl.addEventListener("change", (e) => {
      const selected = e.target.value;
      document.documentElement.setAttribute("data-theme", selected);
      ThemeSelector.setCookie("stexdoc-theme", selected, 365);
    });
  }

  static initAll() {
    document.querySelectorAll("[data-theme-selector]").forEach((el) => {
      new ThemeSelector(el);
    });
  }

  static setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }

  static getCookie(name) {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  }
}