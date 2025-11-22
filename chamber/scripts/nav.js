document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");

    if (btn && nav) {
        btn.addEventListener("click", () => {
            const open = nav.classList.toggle("open");
            btn.setAttribute("aria-expanded", open ? "true" : "false");
        });
    }

    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const lastmodEl = document.getElementById("lastmod");
    if (lastmodEl) {
        const modifiedString = document.lastModified;
        const modifiedDate = new Date(modifiedString);
        if (!isNaN(modifiedDate.getTime())) {
            lastmodEl.textContent = modifiedDate.toLocaleString();
            lastmodEl.dateTime = modifiedDate.toISOString();
        } else {
            lastmodEl.textContent = modifiedString;
        }
    }
});