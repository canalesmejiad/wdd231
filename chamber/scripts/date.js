function setFooterDates() {
    const year = document.querySelector("#year");
    const lastmod = document.querySelector("#lastmod");
    const nowYear = new Date().getFullYear();
    const modified = new Date(document.lastModified);

    if (year) year.textContent = nowYear;

    if (lastmod) {
        lastmod.textContent = modified.toLocaleString();
        lastmod.setAttribute("datetime", modified.toISOString());
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setFooterDates);
} else {
    setFooterDates();
}