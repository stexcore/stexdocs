// public/scripts.js
document.addEventListener("DOMContentLoaded", () => {
  // Acordeón
  document
    .querySelectorAll(".page-doc__header")
    .forEach((header) => {
      header.addEventListener("click", () => {
        const doc = header.closest(".page-doc");
        doc.classList.toggle("collapsed");
      });
    });

  // Copiar contenido de <pre>
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
});

// Tabs de respuestas
document.querySelectorAll('.response-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const status = tab.dataset.status;
    const parent = tab.closest('.page-doc__responses');

    // desactivar todas las tabs y contenidos
    parent.querySelectorAll('.response-tab').forEach(t => t.classList.remove('active'));
    parent.querySelectorAll('.response-content').forEach(rc => rc.classList.remove('active'));

    // activar la elegida
    tab.classList.add('active');
    parent
      .querySelector(`.response-content[data-status="${status}"]`)
      .classList.add('active');
  });
});
