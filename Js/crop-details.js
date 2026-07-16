const cropDetails = {
    "Wheat": {
        image: "../assets/hwheat.jpeg",
        about: "Wheat is one of the most important cereal crops in the world and serves as a staple food for millions of people. It grows best in cool climates and requires well-balanced soil nutrients and proper irrigation. Wheat is mainly cultivated during the Rabi season and is highly sensitive to high temperatures during the grain filling stage. It is widely used for making flour, bread, chapati, and bakery products. Proper timing of sowing and harvesting plays a crucial role in achieving high yield and good grain quality.",
        season: "Rabi (Oct–Dec sowing, Mar–Apr harvest)",
        soil: "Well-drained loamy soil (pH 6.0–7.5)",
        temperature: "10–25°C",
        harvest: "100–120 days",
        water: "Moderate irrigation (4–6 times)"
    },
    "Rice": {
        image: "../assets/hrice.jpeg",
        about: "Rice is a staple food crop for more than half of the world's population. It is typically grown in water-rich environments such as paddy fields and requires high humidity and standing water during most of its growth period. Rice is mainly cultivated during the Kharif season and thrives in warm temperatures. It is highly labor-intensive and requires proper water management.Rice is used for direct consumption and also processed into various food products like rice flour, puffed rice, and beverages.",
        season: "Kharif (June–July sowing, Oct–Nov harvest)",
        soil: "Clayey soil (high water retention, pH 5.5–7)",
        temperature: "25–35°C with high humidity (70–90%)",
        harvest: "90–120 days",
        water: "Very high (standing water 2–5 cm)"
    },
    "Corn": {
        image: "../assets/hcorn.jpeg",
        about: "Corn, also known as maize, is a versatile crop widely used for human consumption, animal feed, and industrial purposes. It grows well in warm climates with plenty of sunlight and moderate rainfall. Corn can be cultivated in multiple seasons and adapts well to different soil types. It is rich in carbohydrates and is used in products like corn flour, popcorn, corn oil, and biofuels. Proper fertilization and irrigation help in achieving better yield.",
        season: "Kharif (june–july sowing)",
        soil: "Fertile well-drained loamy soil (pH 5.5–7.5)",
        temperature: "20–30°C (sensitive to frost)",
        harvest: "60–100 days",
        water: "Moderate (critical at tasseling stage)"
    },
    "Barley": {
        image: "../assets/hbarley.jpeg",
        about: "Barley is a hardy cereal crop known for its ability to grow in dry and cooler climates. It requires less water compared to other grains and is often cultivated in regions with limited rainfall. Barley is mainly grown during the Rabi season and is tolerant to salinity and poor soil conditions. It is widely used in animal feed, malt production, and health foods due to its high fiber content. Its short growing duration makes it suitable for crop rotation.",
        season: "Rabi (Oct–Nov sowing)",
        soil: "Sandy to loamy soil (pH 6–8, tolerant to salinity)",
        temperature: "12–25°C",
        harvest: "90–100 days",
        water: "Low (2–3 irrigations)"
    },
    "Ragi": {
        image: "../assets/hragi.jpeg",
        about: "Ragi is a highly nutritious millet crop rich in calcium, fiber, and iron. It is well-suited for dry and semi-arid regions and requires very little water for cultivation. Ragi is mainly grown during the Kharif season and is highly resistant to drought conditions. It is commonly used to prepare traditional foods like ragi mudde, porridge, and flour-based dishes. Due to its health benefits, it is gaining popularity as a superfood",
        season: "Kharif (also Rabi in some regions)",
        soil: "Red soil / sandy soil (pH 5–7)",
        temperature: "20–30°C",
        harvest: "90–110 days",
        water: "Low to moderate (drought tolerant)"
    },
    "Bajra": {
        image: "../assets/hbajra.jpeg",
        about: "Bajra is a drought-resistant crop that thrives in hot and arid regions with sandy soil. It requires minimal water and can grow in harsh climatic conditions where other crops may fail. Bajra is mainly cultivated during the Kharif season and is rich in protein, fiber, and essential minerals. It is commonly used to make rotis and traditional foods. Its ability to grow in poor soil makes it an important crop for farmers in dry regions.",
        season: "Kharif (June–July sowing)",
        soil: "Sandy dry soil (pH 5–7.5)",
        temperature: "25–35°C (tolerates extreme heat)",
        harvest: "75–90 days",
        water: "Very low (200–500 mm rainfall)"
    },
    "Jowar": {
        image: "../assets/hjowar.jpeg",
        about: "Jowar is a versatile cereal crop grown in both dry and semi-arid regions. It can be cultivated in both Kharif and Rabi seasons depending on climatic conditions. Jowar is highly drought-tolerant and requires less water, making it suitable for areas with limited rainfall. It is used for human consumption, animal fodder, and industrial purposes. Jowar is rich in nutrients and is a good alternative to wheat and rice.",
        season: "Kharif and Rabi",
        soil: "Loamy or sandy soil (pH 6–7.5)",
        temperature: "25–32°C",
        harvest: "90–120 days",
        water: "Low (400–600 mm rainfall)"
    }
};


document.addEventListener('DOMContentLoaded', () => {
    const crop = localStorage.getItem("selectedCrop") || "Rice";
    const data = cropDetails[crop];

    if (data) {
        document.getElementById("crop-name").textContent = crop;
        document.getElementById("crop-image").src = data.image;
        document.getElementById("crop-image").alt = crop;
    
        
        document.getElementById("about").textContent = data.about;
        document.getElementById("season").textContent = data.season;
        document.getElementById("soil").textContent = data.soil;
        document.getElementById("temperature").textContent = data.temperature;
        document.getElementById("harvest").textContent = data.harvest;
        document.getElementById("water").textContent = data.water;
    } else {
        document.getElementById("crop-name").textContent = "Crop Not Found";
    }
});