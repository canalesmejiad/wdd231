import { fetchServices } from './fetchData.js';
import { initModal, openModal } from './modal.js';
import { loadViewMode, saveViewMode } from './storage.js';

let services = [];

export async function initServicesPage() {
    const container = document.querySelector('#services-container');
    if (!container) return;

    const filterSelect = document.querySelector('#service-filter');
    const gridButton = document.querySelector('#view-grid');
    const listButton = document.querySelector('#view-list');

    initModal();
    services = await fetchServices();

    const initialMode = loadViewMode();
    applyViewMode(initialMode, container, gridButton, listButton);
    renderServices(container, services, filterSelect ? filterSelect.value : 'all', initialMode);

    if (filterSelect) {
        filterSelect.addEventListener('change', () => {
            const currentMode = getCurrentMode(gridButton, listButton);
            renderServices(container, services, filterSelect.value, currentMode);
        });
    }

    if (gridButton) {
        gridButton.addEventListener('click', () => {
            applyViewMode('grid', container, gridButton, listButton);
            saveViewMode('grid');
            const currentFilter = filterSelect ? filterSelect.value : 'all';
            renderServices(container, services, currentFilter, 'grid');
        });
    }

    if (listButton) {
        listButton.addEventListener('click', () => {
            applyViewMode('list', container, gridButton, listButton);
            saveViewMode('list');
            const currentFilter = filterSelect ? filterSelect.value : 'all';
            renderServices(container, services, currentFilter, 'list');
        });
    }
}

function applyViewMode(mode, container, gridButton, listButton) {
    if (!container) return;
    container.classList.remove('list-view', 'grid-view');
    if (mode === 'list') {
        container.classList.add('list-view');
    } else {
        container.classList.add('grid-view');
    }

    if (gridButton && listButton) {
        if (mode === 'list') {
            listButton.classList.add('active');
            gridButton.classList.remove('active');
        } else {
            gridButton.classList.add('active');
            listButton.classList.remove('active');
        }
    }
}

function getCurrentMode(gridButton, listButton) {
    if (listButton && listButton.classList.contains('active')) {
        return 'list';
    }
    return 'grid';
}

function renderServices(container, allServices, filterValue, viewMode) {
    if (!container) return;

    let filtered = allServices;
    if (filterValue && filterValue !== 'all') {
        filtered = allServices.filter((service) => service.category === filterValue);
    }

    container.innerHTML = '';

    filtered.forEach((service) => {
        const card = document.createElement('article');
        card.classList.add('card');
        card.classList.add('service-card');

        const content = `
      <h3>${service.name}</h3>
      <p class="service-category">${service.category}</p>
      <p class="service-price">${service.price}</p>
      <p class="service-duration">${service.duration}</p>
      <button type="button" class="btn-details">More details</button>
    `;

        card.innerHTML = content;

        const button = card.querySelector('.btn-details');
        if (button) {
            button.addEventListener('click', () => {
                openModal(service);
            });
        }

        container.appendChild(card);
    });
}