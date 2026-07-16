// Dashboard Simulation Logic - Smart Agri Assistant

// 1. Session Protection
if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'login.html';
}

// 2. Global State for Simulation
let soilHealth = 94.0;
let harvestDays = 14;
let lastUptime = Date.now();

document.addEventListener('DOMContentLoaded', () => {
    // Get and display username
    const username = localStorage.getItem('username');
    const nameSpan = document.querySelector('.farmer-name');
    
    if (username && nameSpan) {
        nameSpan.textContent = `${username} 🌱`;
    }

    // Handle logout
    const logoutBtn = document.querySelector('.logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            window.location.href = 'login.html';
        });
    }

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Start Simulation
    updateSimulation(); // Initial call
    setInterval(updateSimulation, 5000); // Update every 5 seconds
});

function updateSimulation() {
    const now = new Date();
    const hour = now.getHours();
    
    // a. Generate Temperature based on Time
    let temp;
    let condition = "Clear Sky";
    
    if (hour >= 6 && hour < 12) {
        // Morning (6-11 AM): 22–28°C
        temp = 22 + Math.random() * 6;
        condition = "Refreshing Morning";
    } else if (hour >= 12 && hour < 17) {
        // Afternoon (12-4 PM): 28–35°C
        temp = 28 + Math.random() * 7;
        condition = "Sunny Afternoon";
    } else {
        // Evening/Night: 20–26°C
        temp = 20 + Math.random() * 6;
        condition = "Calm Evening";
    }

    // b. Generate Humidity (Inversely related to Temp)
    // Range approx 30% to 70%
    let humidity = Math.max(30, Math.min(80, 100 - (temp * 1.8)));
    
    // c. Wind Speed (5-15 km/h)
    let wind = 5 + Math.random() * 10;

    // d. Farm Growth Logic
    if (temp > 34) {
        soilHealth -= 0.05; // Heat stress
    } else if (temp < 30 && humidity > 40) {
        soilHealth += 0.02; // Optimal growth
    }
    soilHealth = Math.max(0, Math.min(100, soilHealth));

    // Harvest days decrease logic (every ~10 simulation cycles = 50s for demo effect)
    // In real life this would be much slower, but for a project demo we can make it visible
    const timeDiff = (Date.now() - lastUptime) / 1000;
    if (timeDiff > 60) { // decrease day every minute for demo
        harvestDays = Math.max(0, harvestDays - 1);
        lastUptime = Date.now();
    }

    // e. Update UI
    updateUI(temp, humidity, wind, condition);
}

function updateUI(temp, humidity, wind, condition) {
    // 1. Weather Card
    const tempData = document.querySelector('.main-data');
    const condData = document.querySelector('.sub-data');
    const stats = document.querySelectorAll('.stat');

    if (tempData) tempData.textContent = `${temp.toFixed(1)}°C`;
    if (condData) condData.textContent = condition;

    stats.forEach(stat => {
        if (stat.innerHTML.includes('droplets')) {
            stat.innerHTML = `<i data-lucide="droplets"></i> Humidity: ${Math.round(humidity)}%`;
        } else if (stat.innerHTML.includes('wind')) {
            stat.innerHTML = `<i data-lucide="wind"></i> Wind: ${wind.toFixed(1)}km/h`;
        }
    });

    // 2. Insight Card
    const highlights = document.querySelectorAll('.insight-item .highlight');
    highlights.forEach(h => {
        const parentText = h.parentElement.textContent;
        if (parentText.includes('Soil Health')) {
            h.textContent = `${soilHealth.toFixed(1)}%`;
        } else if (parentText.includes('Next Harvest')) {
            h.textContent = `${harvestDays} Days`;
        }
    });

    // 3. Re-init icons for the stats we updated via innerHTML
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
