document.addEventListener("DOMContentLoaded", () => {
  initAllThemeSelectors(),
  initAccordions()
  initResponseTabs();
  initCopyButtons();
});

function initAllThemeSelectors() {
  const selects = document.querySelectorAll(".stx-theme-select");

  const savedTheme = getCookie("stexdoc-theme");

  selects.forEach((select) => {
    const currentTheme = savedTheme || select.value;

    document.documentElement.setAttribute("data-theme", currentTheme);
    select.value = currentTheme;

    select.addEventListener("change", (e) => {
      const selected = e.target.value;
      document.documentElement.setAttribute("data-theme", selected);
      setCookie("stexdoc-theme", selected, 365);
    });
  });
}

// 📁 Acordeón de secciones
function initAccordions() {
  document.querySelectorAll(".stx-route-doc__header").forEach((header) => {
    header.addEventListener("click", () => {
      const doc = header.closest(".stx-route-doc");
      doc.classList.toggle("collapsed");
    });
  });
}

// 🧩 Tabs de respuestas
function initResponseTabs() {
  document.querySelectorAll(".stx-response-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const status = tab.dataset.status;
      const parent = tab.closest(".stx-route-doc__responses");

      parent.querySelectorAll(".stx-response-tab").forEach((t) => t.classList.remove("active"));
      parent.querySelectorAll(".stx-response-content").forEach((rc) => rc.classList.remove("active"));

      tab.classList.add("active");
      parent.querySelector(`.stx-response-content[data-status="${status}"]`)?.classList.add("active");
    });
  });
}

// 📋 Botón de copiar contenido
function initCopyButtons() {
  document.querySelectorAll(".stx-copy-btn").forEach((btn) => {
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