import { initNavigation } from './modules/navigation.js';
import { setCurrentYear } from './modules/footer.js';
import { initServicesPage } from './modules/servicesPage.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    setCurrentYear();
    initServicesPage();
});