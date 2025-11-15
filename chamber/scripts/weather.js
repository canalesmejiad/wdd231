const apiKey = "e79e1f9cc7e88835f4807ae6a7716d6c";
const lat = 45.6387;
const lon = -122.6615;
const units = "imperial";

const tempEl = document.getElementById("weather-temp");
const descEl = document.getElementById("weather-desc");
const iconEl = document.getElementById("weather-icon");
const forecastEl = document.getElementById("forecast");

async function getCurrentWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Weather error");
    return await res.json();
}

async function getForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Forecast error");
    return await res.json();
}

function renderCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description || "";
    const iconCode = data.weather[0].icon;

    const unitLabel = units === "metric" ? "°C" : "°F";
    tempEl.textContent = `${temp}${unitLabel}`;
    descEl.textContent = desc.replace(/\b\w/g, c => c.toUpperCase());

    if (iconCode && iconEl) {
        const src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        iconEl.src = src;
        iconEl.alt = `${desc} icon`;
    }
}

function renderForecast(data) {
    if (!forecastEl) return;
    forecastEl.innerHTML = "";

    const byDay = {};
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const key = date.toISOString().slice(0, 10);
        const hour = date.getHours();
        if (!byDay[key] || Math.abs(hour - 12) < Math.abs(byDay[key].hour - 12)) {
            byDay[key] = { item, hour };
        }
    });

    const keys = Object.keys(byDay).slice(1, 4);

    keys.forEach(key => {
        const entry = byDay[key].item;
        const date = new Date(entry.dt * 1000);
        const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
        const temp = Math.round(entry.main.temp);
        const unitLabel = units === "metric" ? "°C" : "°F";

        const div = document.createElement("div");
        div.className = "forecast-day";
        div.innerHTML = `
            <span>${weekday}</span>
            <span>${temp}${unitLabel}</span>
        `;
        forecastEl.appendChild(div);
    });
}

async function initWeather() {
    try {
        const [current, forecast] = await Promise.all([
            getCurrentWeather(),
            getForecast()
        ]);
        renderCurrentWeather(current);
        renderForecast(forecast);
    } catch (err) {
        if (descEl) descEl.textContent = "Unable to load weather.";
        console.error(err);
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWeather);
} else {
    initWeather();
}