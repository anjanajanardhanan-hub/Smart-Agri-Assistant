// Bangalore coordinates
const lat = 12.97;
const lon = 77.59;

async function getWeather() {
    try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m`)

        const data = await res.json();

        const temp = Math.round(data.current_weather.temperature);
        const wind = Math.round(data.current_weather.windspeed);
        const humidity = data.hourly.relativehumidity_2m[0];
        const code = data.current_weather.weathercode;

        const condition = getCondition(code);

        // Update UI
        document.getElementById("temp").textContent = temp + "°C";
        document.getElementById("condition").textContent = condition;
        document.getElementById("humidity").textContent = humidity;
        document.getElementById("wind").textContent = wind;

        updateIcon(condition);

    } catch (error) {
        console.error("Weather error:", error);
    }
}

// Convert weather codes
function getCondition(code) {
    if (code === 0) return "Clear Sky";
    if (code <= 3) return "Cloudy";
    if (code <= 48) return "Fog";
    if (code <= 67) return "Rain";
    return "Storm";
}

// Update SVG icon dynamically
function updateIcon(condition) {
    const sun = document.getElementById("sun");
    const cloud = document.getElementById("cloud");

    if (condition.includes("Clear")) {
        sun.style.display = "block";
        cloud.style.opacity = "0.2";
    } 
    else if (condition.includes("Cloud")) {
        sun.style.display = "block";
        cloud.style.opacity = "1";
    } 
    else if (condition.includes("Rain")) {
        sun.style.display = "none";
        cloud.style.opacity = "1";
    }
}

// Run on load + refresh every 10 mins
getWeather();
setInterval(getWeather, 600000);