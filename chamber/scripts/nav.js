document.addEventListener("DOMContentLoaded", () => {
    const lastmod = document.getElementById("lastmod");
    const modDate = new Date(document.lastModified);

    lastmod.textContent = modDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    lastmod.setAttribute("datetime", modDate.toISOString());
});