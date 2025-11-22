function initTimestamp() {
    const ts = document.getElementById("timestamp");
    if (ts) {
        const now = new Date();
        ts.value = now.toISOString();
    }
}

function openModalById(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add("open");
        modal.removeAttribute("aria-hidden");
    }
}

function closeModal(modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
}

function initModals() {
    const infoButtons = document.querySelectorAll(".info-btn");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".modal .close-modal");

    infoButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const modalId = btn.dataset.modal;
            openModalById(modalId);
        });
    });

    closeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const modal = btn.closest(".modal");
            if (modal) {
                closeModal(modal);
            }
        });
    });

    modals.forEach((modal) => {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });
}

function main() {
    initTimestamp();
    initModals();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
} else {
    main();
}