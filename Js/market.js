// Market & Cart Logic - Smart Agri Assistant

document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('smart_agri_cart')) || [];

    // Initialize UI
    updateCartCount();
    setupEventListeners();
    loadUserCrops(); // NEW: Load user listed crops

    function setupEventListeners() {
        // Global delegate for dynamic items
        document.querySelector('.product-grid').addEventListener('click', (e) => {
            const btn = e.target;
            
            // Add to Cart Logic
            if (btn.classList.contains('add-to-cart')) {
                const product = {
                    name: btn.dataset.name,
                    price: parseInt(btn.dataset.price),
                    image: btn.dataset.image,
                    quantity: 1
                };
                addToCart(product);
            }

            // Buy Now Logic
            if (btn.classList.contains('now')) {
                const name = btn.dataset.name;
                const cropId = btn.dataset.id;
                
                if (cropId) {
                    let userCrops = JSON.parse(localStorage.getItem('sellCrops')) || [];
                    const cropIndex = userCrops.findIndex(c => c.id == cropId);
                    
                    if (cropIndex !== -1 && userCrops[cropIndex].quantity > 0) {
                        userCrops[cropIndex].quantity -= 1;
                        localStorage.setItem('sellCrops', JSON.stringify(userCrops));
                        
                        // Update UI immediately
                        const qtyRef = document.getElementById(`qty-${cropId}`);
                        if (userCrops[cropIndex].quantity <= 0) {
                            if (qtyRef) qtyRef.textContent = 'Out of Stock';
                            btn.disabled = true;
                            // Disable Add to Cart as well if present
                            const addBtn = btn.parentElement.querySelector('.add-to-cart');
                            if (addBtn) addBtn.disabled = true;
                        } else {
                            if (qtyRef) qtyRef.textContent = `Available: ${userCrops[cropIndex].quantity} kg`;
                        }
                    }
                }
                
                showNotification(`✅ Order placed successfully for ${name}`, true);
            }
        });
    }

    function loadUserCrops() {
        const grid = document.querySelector('.product-grid');
        const userCrops = JSON.parse(localStorage.getItem('sellCrops')) || [];
        
        userCrops.forEach((crop, index) => {
            const isOutOfStock = crop.quantity <= 0;
            const stockText = isOutOfStock ? 'Out of Stock' : `Available: ${crop.quantity} kg`;
            const card = document.createElement('article');
            card.className = 'product-card';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-user-crop', 'true');
            card.innerHTML = `
                <img src="${crop.image}" alt="${crop.name}">
                <div class="product-info">
                    <h3>${crop.name} <span class="tag-user">Listed</span></h3>
                    <p class="farmer-ref">By ${crop.farmerName}</p>
                    <p class="location-ref"><i data-lucide="map-pin"></i> ${crop.location}</p>
                    <p class="price">₹${crop.price} / kg</p>
                    <p class="qty-ref" id="qty-${crop.id}"><strong>${stockText}</strong></p>
                    <div class="product-actions">
                        <button class="buy-btn add-to-cart" 
                                data-name="${crop.name}" 
                                data-price="${crop.price}" 
                                data-image="${crop.image}"
                                ${isOutOfStock ? 'disabled' : ''}>Add to Cart</button>
                        <button class="buy-btn now" id="buy-btn-${crop.id}" data-id="${crop.id}" data-name="${crop.name}" data-price="${crop.price}" ${isOutOfStock ? 'disabled' : ''}>Buy Now</button>
                    </div>
                    <button class="delete-btn" onclick="deleteCrop(${crop.id})">Delete Listing</button>
                </div>
            `;
            grid.appendChild(card);
        });
        
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function deleteCrop(id) {
        let userCrops = JSON.parse(localStorage.getItem('sellCrops')) || [];
        userCrops = userCrops.filter(c => c.id !== id);
        localStorage.setItem('sellCrops', JSON.stringify(userCrops));
        
        // Immediate UI Update: Find the card and remove it
        const cards = document.querySelectorAll('[data-user-crop="true"]');
        cards.forEach(card => {
            if (card.querySelector('.delete-btn').getAttribute('onclick').includes(id)) {
                card.remove();
            }
        });
        
        showNotification("🗑️ Listing deleted successfully", true);
    }

    function addToCart(product) {
        const existingItem = cart.find(item => item.name === product.name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(product);
        }

        saveCart();
        updateCartCount();
        showNotification(`🛒 Added ${product.name} to cart`, true);
    }

    function saveCart() {
        localStorage.setItem('smart_agri_cart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        const badge = document.getElementById('cart-count');
        if (badge) badge.textContent = totalItems;
    }

    function toggleCart() {
        const panel = document.getElementById('cart-panel');
        if (!panel) return;
        panel.classList.toggle('active');
        if (panel.classList.contains('active')) {
            renderCartItems();
        }
    }

    function renderCartItems() {
        const container = document.getElementById('cart-items');
        const totalPriceEl = document.getElementById('cart-total-price');
        if (!container || !totalPriceEl) return;
        
        container.innerHTML = '';

        if (cart.length === 0) {
            container.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
            totalPriceEl.textContent = '0';
            return;
        }

        let total = 0;
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>₹${item.price} x ${item.quantity}</p>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">&times;</button>
            `;
            container.appendChild(itemDiv);
        });

        totalPriceEl.textContent = total;
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        saveCart();
        updateCartCount();
        renderCartItems();
    }

    function clearCart() {
        cart = [];
        saveCart();
        updateCartCount();
        renderCartItems();
    }

    function checkout() {
        if (cart.length === 0) {
            showNotification("Your cart is empty!", false);
            return;
        }
        showNotification("🎉 Your order has been placed successfully!", true);
        clearCart();
        toggleCart();
    }

    function showNotification(message, success) {
        const notification = document.getElementById('notification');
        if (!notification) return;
        notification.textContent = message;
        notification.style.display = 'block';
        notification.style.borderColor = success ? '#52b788' : '#ef4444';
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    // Expose functions to window for inline onclick handlers
    window.toggleCart = toggleCart;
    window.removeFromCart = removeFromCart;
    window.clearCart = clearCart;
    window.checkout = checkout;
    window.deleteCrop = deleteCrop; // NEW exposure
});
