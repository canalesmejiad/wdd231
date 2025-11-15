const spotlightContainer = document.querySelector("#spotlight-grid");

async function loadSpotlights() {
    try {
        const response = await fetch("./data/members.json");

        if (!response.ok) {
            throw new Error("Error loading members.json");
        }

        const data = await response.json();
        const members = data.members || data; // por si es un array directo

        // Filtrar solo gold y silver
        const eligible = members.filter(member => {
            const level = (member.membership || member.membershipLevel || "").toLowerCase();
            return level === "gold" || level === "silver";
        });

        if (eligible.length === 0) return;

        const selected = getRandomMembers(eligible, 3);

        spotlightContainer.innerHTML = "";

        selected.forEach(member => {
            const card = document.createElement("article");
            card.classList.add("spotlight-card");

            card.innerHTML = `
                <div class="spotlight-header">
                    <img src="${member.image}" alt="${member.name} logo" class="card-logo">
                </div>
                <div class="spotlight-body">
                    <h3>${member.name}</h3>
                    <p class="spotlight-meta">${member.membership || member.membershipLevel} Member</p>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" class="text-link" target="_blank" rel="noopener">
                        Visit website &rarr;
                    </a>
                </div>
            `;

            spotlightContainer.appendChild(card);
        });
    } catch (err) {
        console.error(err);
        spotlightContainer.innerHTML = "<p>Unable to load member spotlights.</p>";
    }
}

function getRandomMembers(list, maxCount) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    const count = Math.min(maxCount, copy.length);
    return copy.slice(0, count);
}

loadSpotlights();