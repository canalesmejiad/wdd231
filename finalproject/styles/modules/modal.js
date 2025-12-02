let modalElement;
let modalTitle;
let modalCategory;
let modalPrice;
let modalDuration;
let modalDescription;
let modalCloseButton;
let modalBackdrop;

export function initModal() {
    modalElement = document.querySelector('#service-modal');
    modalTitle = document.querySelector('#modal-title');
    modalCategory = document.querySelector('#modal-category');
    modalPrice = document.querySelector('#modal-price');
    modalDuration = document.querySelector('#modal-duration');
    modalDescription = document.querySelector('#modal-description');
    modalCloseButton = document.querySelector('#modal-close');
    modalBackdrop = document.querySelector('.modal-backdrop');

    if (!modalElement) return;

    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', closeModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

export function openModal(service) {
    if (!modalElement) return;
    modalTitle.textContent = service.name;
    modalCategory.textContent = 'Category: ' + service.category;
    modalPrice.textContent = 'Price: ' + service.price;
    modalDuration.textContent = 'Typical duration: ' + service.duration;
    modalDescription.textContent = service.description;
    modalElement.setAttribute('aria-hidden', 'false');
    modalElement.classList.add('open');
}

export function closeModal() {
    if (!modalElement) return;
    modalElement.setAttribute('aria-hidden', 'true');
    modalElement.classList.remove('open');
}