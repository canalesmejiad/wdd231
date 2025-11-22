document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.getElementById("timestamp");
    timestampField.value = new Date().toISOString();

    const infoButtons = document.querySelectorAll(".info-btn");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close-modal");

    infoButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const modalId = btn.dataset.modal;
            const modal = document.getElementById(modalId);
            modal.classList.add("open");
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest(".modal").classList.remove("open");
        });
    });

    modals.forEach(modal => {
        modal.addEventListener("click", e => {
            if (e.target === modal) {
                modal.classList.remove("open");
            }
        });
    });
});