const loginForm = document.getElementById('loginForm');
const messageContainer = document.getElementById('messageContainer');

function showMessage(message, isSuccess) {
    messageContainer.textContent = message;
    messageContainer.className = isSuccess ? 'message-container success' : 'message-container error';
    messageContainer.style.display = 'block';
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        showMessage('Please fill in all fields.', false);
        return;
    }

    const data = { username, password };
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    
    // Loading State
    submitBtn.textContent = 'Logging in...';
    submitBtn.disabled = true;

    try {
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            // Save session data to localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', result.name || username);

            showMessage(result.message, true);
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            showMessage(result.message, false);
            submitBtn.textContent = 'Login to Account';
            submitBtn.disabled = false;
        }
    } catch (error) {
        console.error('Error logging in:', error);
        showMessage('Server error. Please try again later.', false);
        submitBtn.textContent = 'Login to Account';
        submitBtn.disabled = false;
    }
});
