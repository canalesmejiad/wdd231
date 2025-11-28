// chamber/scripts/discover.js
import { places } from "../data/discover.mjs";

// ==== 1. Construir las 8 cards ====
const grid = document.querySelector("#discover-grid");

places.forEach((place, index) => {
    const card = document.createElement("article");
    card.classList.add("discover-card");
    card.classList.add(`card${index + 1}`); // card1, card2, ... para grid-template-areas

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

    const description = document.createElement("p");
    description.textContent = place.description;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Learn more";

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);

    grid.appendChild(card);
});

// ==== 2. Mensaje de última visita con localStorage ====
const visitMessage = document.querySelector("#visit-message");
const key = "discoverLastVisit";
const now = Date.now();
const lastVisit = Number(window.localStorage.getItem(key));

if (!lastVisit) {
    // primera visita
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysBetween = Math.floor((now - lastVisit) / msPerDay);

    if (daysBetween < 1) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
        visitMessage.textContent = "You last visited 1 day ago.";
    } else {
        visitMessage.textContent = `You last visited ${daysBetween} days ago.`;
    }
}

// guardar la fecha actual para la próxima visita
window.localStorage.setItem(key, now);