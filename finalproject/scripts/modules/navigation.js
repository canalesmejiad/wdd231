export function initNavigation() {
    const menuButton = document.querySelector('#menu-toggle');
    const nav = document.querySelector('#primary-nav');
  
    if (!menuButton || !nav) return;
  
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }