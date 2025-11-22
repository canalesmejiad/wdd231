const btn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (btn && nav) {
    btn.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
}

const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

const lastmod = document.getElementById('lastmod');
if (lastmod) {
    const lm = new Date(document.lastModified);
    const formatted = lm.toISOString().split('T')[0];
    lastmod.setAttribute("datetime", formatted);
    lastmod.textContent = formatted;
}