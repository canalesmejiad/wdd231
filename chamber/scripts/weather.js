const apiKey = "e79e1f9cc7e88835f4807ae6a7716d6c"; 
const lat = 45.6387; // Vancouver, WA
const lon = -122.6615;
const units = "imperial"; // °F

const tempEl = document.querySelector("#weather-temp");
const descEl = document.querySelector("#weather-desc");
const forecastEl = document.querySelector("#forecast");

async function getWeather() {
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

    const [currentResponse, forecastResponse] = await Promise.all([
        fetch(currentUrl),
        fetch(forecastUrl)
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
        tempEl.textContent = "N/A";
        descEl.textContent = "Weather unavailable";
        return;
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    const temp = Math.round(currentData.main.temp);
    const description = currentData.weather[0].description;

    tempEl.textContent = `${temp}°F`;
    descEl.textContent = description.charAt(0).toUpperCase() + description.slice(1);

    buildForecast(forecastData.list);
}

function buildForecast(list) {
    forecastEl.innerHTML = "";

    // tomar las lecturas alrededor de las 12:00 para los próximos 3 días
    const middayEntries = list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    middayEntries.forEach(item => {
        const date = new Date(item.dt_txt);
        const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
        const temp = Math.round(item.main.temp);

        const card = document.createElement("div");
        card.classList.add("forecast-day");

        card.innerHTML = `
            <p class="forecast-label">${weekday}</p>
            <p class="forecast-temp">${temp}°F</p>
        `;

        forecastEl.appendChild(card);
    });
}

getWeather();