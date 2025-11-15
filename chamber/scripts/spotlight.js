const spotlightContainer = document.querySelector("#spotlight-grid");

async function loadSpotlights() {
    try {
        const res = await fetch("./data/members.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const members = data.members || data;

        const eligible = members.filter(m => {
            const level = (m.membership || "").toLowerCase();
            return level === "gold" || level === "silver";
        });

        if (eligible.length === 0) {
            spotlightContainer.innerHTML = "<p>No spotlight members found.</p>";
            return;
        }

        const shuffled = [...eligible];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        const selected = shuffled.slice(0, 3);

        spotlightContainer.innerHTML = "";

        selected.forEach(m => {
            const card = document.createElement("article");
            card.classList.add("spotlight-card");

            const src = `./images/${m.image}`;

            card.innerHTML = `
                <div class="spotlight-logo-wrap">
                    <img class="spotlight-logo" src="${src}" alt="${m.name} logo">
                </div>
                <div class="spotlight-body">
                    <h3>${m.name}</h3>
                    <p class="spotlight-tagline">${m.membership} Member</p>
                    <p>Vancouver, WA</p>
                    <p>${m.phone || ""}</p>
                    <p>
                        <a href="${m.website}" target="_blank" rel="noopener">
                            Visit website →
                        </a>
                    </p>
                </div>
            `;

            const img = card.querySelector("img");
            img.onerror = () => { img.src = "./images/placeholder-logo.png"; };

            spotlightContainer.appendChild(card);
        });
    } catch (err) {
        console.error(err);
        spotlightContainer.innerHTML = "<p>Unable to load member spotlights.</p>";
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadSpotlights);
} else {
    loadSpotlights();
}