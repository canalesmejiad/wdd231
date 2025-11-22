const timestampField = document.getElementById("timestamp");
timestampField.value = new Date().toISOString();

const infoButtons = document.querySelectorAll(".info-btn");
const modals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".close-modal");

infoButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modalId = button.dataset.modal;
        const modal = document.getElementById(modalId);
        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");
    });
});

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = button.closest(".modal");
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
    });
});

window.addEventListener("click", e => {
    if (e.target.classList.contains("modal")) {
        e.target.style.display = "none";
        e.target.setAttribute("aria-hidden", "true");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".membership-cards .card");
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add("show");
        }, index * 200);
    });
});