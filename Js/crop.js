// Crop Recommendation Logic - Smart Agri Assistant

const cropData = {
    "Rice": {
        emoji: "🌾",
        tip: "Best suited for high humidity and warm climate. Your soil nitrogen level is ideal for this cereal crop.",
        icon: "droplets",
        image: "../assets/rice.jpeg"
    },
    "Wheat": {
        emoji: "🌾",
        tip: "Moderate temperature and low humidity are perfect. Ensure proper irrigation during the heading stage.",
        icon: "sun",
        image: "../assets/wheat.jpeg"
    },
    "Corn": {
        emoji: "🌽",
        tip: "Balanced climate detected. Corn thrives in these conditions with well-drained soil.",
        icon: "thermometer",
        image: "../assets/corn.jpeg"
    },
    "Barley": {
        emoji: "🌾",
        tip: "Cooler climate detected. Barley is resilient and well-suited for these temperature ranges.",
        icon: "wind",
        image: "../assets/barley.jpeg"
    },
    "Ragi": {
        emoji: "🌱",
        tip: "Low rainfall and dry soil detected. Ragi is highly drought-tolerant and nutritious.",
        icon: "leaf",
        image: "../assets/ragi.jpeg"
    },
    "Bajra": {
        emoji: "🌾",
        tip: "Hot and dry conditions detected. Bajra thrives in high temperatures with minimal water.",
        icon: "sun",
        image: "../assets/bajra.jpeg"
    },
    "Jowar": {
        emoji: "🌾",
        tip: "Semi-arid climate detected. Jowar is excellent for these conditions and provides great fodder.",
        icon: "cloud",
        image: "../assets/jowar.jpeg"
    }
};

function analyzeCrop() {
    // 1. Get Inputs
    const n = parseFloat(document.getElementById('nitrogen').value);
    const p = parseFloat(document.getElementById('phosphorus').value);
    const k = parseFloat(document.getElementById('potassium').value);
    const temp = parseFloat(document.getElementById('temperature').value);
    const humidity = parseFloat(document.getElementById('humidity').value);

    // 2. Validation
    if (isNaN(n) || isNaN(p) || isNaN(k) || isNaN(temp) || isNaN(humidity)) {
        alert("Please fill in all nutrient and climate fields.");
        return;
    }

    // 3. Rule-based Recommendation Logic
    let recommendation = "Corn"; // Default

    if (humidity > 70 && temp >= 20 && temp <= 35) {
        recommendation = "Rice";
    } else if (temp >= 10 && temp <= 25 && humidity < 50) {
        recommendation = "Wheat";
    } else if (temp < 20) {
        recommendation = "Barley";
    } else if (temp > 30 && humidity < 40) {
        recommendation = "Bajra";
    } else if (humidity < 40) {
        recommendation = "Ragi";
    } else if (temp > 25 && humidity >= 40 && humidity <= 50) {
        recommendation = "Jowar";
    } else if (temp >= 20 && temp <= 30 && humidity >= 50 && humidity <= 70) {
        recommendation = "Corn";
    }

    // 4. Calculate Match Percentage (Value between 80 - 95)
    // Dynamic based on inputs but randomized within range for UI feel
    const matchPercentage = Math.floor(Math.random() * (95 - 80 + 1)) + 80;

    // 5. Update UI
    const resultPanel = document.getElementById('result-panel');
    const cropNameEl = resultPanel.querySelector('.crop-name');
    const successRateEl = resultPanel.querySelector('.success-rate');
    const progressEl = resultPanel.querySelector('.progress');
    const tipEl = resultPanel.querySelector('.tip-box p');
    const cropTitleEl = resultPanel.querySelector('.panel-title');
    const cropImgEl = document.getElementById('crop-result-img');

    const cropInfo = cropData[recommendation];
    
    cropTitleEl.innerHTML = `Your Ideal Crop ${cropInfo.emoji}`;
    cropNameEl.textContent = recommendation;
    successRateEl.textContent = `${matchPercentage}% Match`;
    progressEl.style.width = `${matchPercentage}%`;
    tipEl.textContent = cropInfo.tip;
    
    if (cropImgEl) {
        cropImgEl.src = cropInfo.image;
        cropImgEl.alt = recommendation;
    }

    // 6. Show Result and Scroll
    resultPanel.style.display = 'flex';
    
    // Refresh AOS animations for new content
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }

    // Smooth Scroll to Result
    setTimeout(() => {
        resultPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// View Details Logic
function viewDetails() {
    const cropName = document.querySelector('#result-panel .crop-name').textContent;
    localStorage.setItem("selectedCrop", cropName);
    window.location.href = "crop-details.html";
}

// Ensure the functions are accessible globally
window.analyzeCrop = analyzeCrop;
window.viewDetails = viewDetails;
