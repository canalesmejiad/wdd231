const menuBtn = document.getElementById('menu');
const nav = document.getElementById('primary-nav');

if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        menuBtn.textContent = isOpen ? '✕' : '☰';
    });

    nav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.textContent = '☰';
            }
        });
    });

    const current = location.pathname.split('/').pop() || 'index.html';
    nav.querySelectorAll('a').forEach(a => {
        const href = a.getAttribute('href');
        a.classList.toggle('active', href === current || (current === 'index.html' && href === 'index.html'));
    });
}