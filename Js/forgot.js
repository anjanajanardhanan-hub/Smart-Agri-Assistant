const forgotForm = document.getElementById('forgotForm');
const messageContainer = document.getElementById('messageContainer');

function showMessage(message, isSuccess) {
    messageContainer.textContent = message;
    messageContainer.className = isSuccess ? 'message-container success' : 'message-container error';
    messageContainer.style.display = 'block';
}

forgotForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('email').value;
    const newPassword = document.getElementById('newPassword').value;

    if (!username || !newPassword) {
        showMessage('Please fill in all fields.', false);
        return;
    }

    const data = { username, newPassword };
    const submitBtn = forgotForm.querySelector('button[type="submit"]');
    
    // Loading State
    submitBtn.textContent = 'Resetting...';
    submitBtn.disabled = true;

    try {
        const response = await fetch('http://127.0.0.1:5000/reset_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            showMessage(result.message, true);
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        } else {
            showMessage(result.message, false);
            submitBtn.textContent = 'Reset Password';
            submitBtn.disabled = false;
        }
    } catch (error) {
        console.error('Error resetting password:', error);
        showMessage('Server error. Please try again later.', false);
        submitBtn.textContent = 'Reset Password';
        submitBtn.disabled = false;
    }
});
