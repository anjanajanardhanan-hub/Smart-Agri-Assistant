// Sell Crop Logic - Smart Agri Assistant

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#sellCropForm');
    const successMsg = document.querySelector('#successMsg');
    const listBtn = document.querySelector('#listBtn');
    const fileInput = document.getElementById('cropImage');

    // AOS and Lucide Init (if script is loaded before these, they might not be ready, 
    // but usually they are loaded in the HTML head or before this script)
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        listBtn.textContent = "Processing...";
        listBtn.disabled = true;

        const cropInput = document.getElementById('cropName').value.trim();
        if (!cropInput) {
            alert("Please enter a crop name.");
            listBtn.disabled = false;
            listBtn.textContent = "List Your Crop";
            return;
        }

        // Convert Image to Base64
        let base64Image = await convertToBase64(fileInput.files[0]);
        
        // If no image uploaded, use default logic
        if (!base64Image) {
            let imgName = cropInput.toLowerCase();
            if (imgName === 'corn') imgName = 'crop';
            const knownCrops = ['rice', 'wheat', 'crop'];
            base64Image = '../assets/' + (knownCrops.includes(imgName) ? imgName : 'sell') + '.png';
        }

        const cropData = {
            id: Date.now(),
            farmerName: document.getElementById('farmerName').value,
            name: cropInput,
            quantity: document.getElementById('quantity').value,
            price: document.getElementById('price').value,
            location: document.getElementById('location').value,
            image: base64Image
        };

        // Save to localStorage
        try {
            let sellCrops = JSON.parse(localStorage.getItem('sellCrops')) || [];
            sellCrops.push(cropData);
            localStorage.setItem('sellCrops', JSON.stringify(sellCrops));
        } catch (err) {
            console.error("Storage error:", err);
            alert("Storage limit reached! Try a smaller image.");
            listBtn.disabled = false;
            listBtn.textContent = "List Your Crop";
            return;
        }

        setTimeout(() => {
            successMsg.classList.add('active');
            listBtn.textContent = "List Your Crop";
            listBtn.disabled = false;
            form.reset();
            
            setTimeout(() => {
                successMsg.classList.remove('active');
                window.location.href = 'marketplace.html';
            }, 2000);
        }, 1000);
    });

    function convertToBase64(file) {
        return new Promise((resolve) => {
            if (!file) return resolve(null);
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(file);
        });
    }
});
