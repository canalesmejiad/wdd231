// chamber/scripts/discover.js
import { places } from "../data/discover.mjs";

const grid = document.querySelector("#discover-grid");
const visitMessage = document.querySelector("#visit-message");

// ======= Construir las 8 tarjetas =======
places.forEach((place, index) => {
    const card = document.createElement("article");
    card.classList.add("discover-card", `card${index + 1}`);

    const title = document.createElement("h2");
    title.textContent = place.name;

    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = place.imageUrl;
    img.alt = place.imageAlt;
    img.loading = "lazy";

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = place.name;

    figure.appendChild(img);
    figure.appendChild(figcaption);

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

// ======= Mensaje de visitas usando localStorage =======
const LAST_VISIT_KEY = "discover-last-visit";

function updateVisitMessage() {
    if (!visitMessage) return;

    const now = Date.now();
    const lastVisit = Number(localStorage.getItem(LAST_VISIT_KEY));

    if (!lastVisit) {
        // Primera visita
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const msInDay = 1000 * 60 * 60 * 24;
        const diffDays = Math.floor((now - lastVisit) / msInDay);

        if (diffDays < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (diffDays === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${diffDays} days ago.`;
        }
    }

    // Guardar la fecha actual como la última visita
    localStorage.setItem(LAST_VISIT_KEY, now.toString());
}

updateVisitMessage();