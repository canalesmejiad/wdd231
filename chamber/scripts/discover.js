// chamber/scripts/discover.js
import { places } from "../data/discover.mjs";

// =======================
// 1. Construir las cards
// =======================
const grid = document.querySelector("#discover-grid");

places.forEach((place) => {
    const card = document.createElement("article");
    card.classList.add("discover-card");

    const title = document.createElement("h2");
    title.textContent = place.name;

    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = place.image;
    img.alt = place.name;

    const figCaption = document.createElement("figcaption");
    figCaption.textContent = place.name;

    figure.appendChild(img);
    figure.appendChild(figCaption);

    const address = document.createElement("address");
    address.textContent = place.address;

    const desc = document.createElement("p");
    desc.textContent = place.description;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Learn more";

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(desc);
    card.appendChild(button);

    grid.appendChild(card);
});

// ==================================================
// 2. Mensaje de última visita usando localStorage
// ==================================================
const visitMessage = document.querySelector("#visit-message");
const LAST_VISIT_KEY = "discoverLastVisit";

const now = Date.now();
const lastVisit = Number(localStorage.getItem(LAST_VISIT_KEY));

if (!lastVisit) {
    // Primera visita
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const msDifference = now - lastVisit;
    const daysDifference = Math.floor(msDifference / (1000 * 60 * 60 * 24));

    if (daysDifference < 1) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysDifference === 1) {
        visitMessage.textContent = "You last visited 1 day ago.";
    } else {
        visitMessage.textContent = `You last visited ${daysDifference} days ago.`;
    }
}

// Guardar la fecha actual para la próxima visita
localStorage.setItem(LAST_VISIT_KEY, now);

// ===============================
// 3. Año actual en el footer (op)
// ===============================
const yearSpan = document.querySelector("#year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}