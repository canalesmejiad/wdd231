import { initNavigation } from './modules/navigation.js';
import { setCurrentYear } from './modules/footer.js';
import { initServicesPage } from './modules/servicesPage.js';
import { initFormSummary } from './modules/formSummary.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    setCurrentYear();
    initServicesPage();
    initFormSummary();
});