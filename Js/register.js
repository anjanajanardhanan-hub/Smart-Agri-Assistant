// const registerForm = document.getElementById('registerForm');
// const messageContainer = document.getElementById('messageContainer');

// function showMessage(message, isSuccess) {
//     messageContainer.textContent = message;
//     messageContainer.className = isSuccess ? 'message-container success' : 'message-container error';
//     messageContainer.style.display = 'block';
// }

// registerForm.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const fullName = document.getElementById('full-name').value;
//     const username = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const confirmPassword = document.getElementById('confirm-password').value;
//     const location = document.getElementById('location').value;

//     if (!fullName || !username || !password || !confirmPassword || !location) {
//         showMessage('Please fill in all fields.', false);
//         return;
//     }

//     if (password !== confirmPassword) {
//         showMessage("Passwords do not match!", false);
//         return;
//     }

//     const data = { username, password, name: fullName, location };
//     const submitBtn = registerForm.querySelector('button[type="submit"]');

//     // Loading State
//     submitBtn.textContent = 'Registering...';
//     submitBtn.disabled = true;

//     try {
//         const response = await fetch('http://127.0.0.1:5000/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         });

//         const result = await response.json();

//         if (result.success) {
//             showMessage(result.message, true);
//             window.location.href = "login.html";
//         } else {
//             showMessage(result.message, false);
//             submitBtn.textContent = 'Register Account';
//             submitBtn.disabled = false;
//         }
//     } catch (error) {
//         console.error('Error registering:', error);
//         showMessage('Server error. Please try again later.', false);
//         submitBtn.textContent = 'Register Account';
//         submitBtn.disabled = false;
//     }
// });

const registerForm = document.getElementById('registerForm');
const messageContainer = document.getElementById('messageContainer');

function showMessage(message, isSuccess) {
    messageContainer.textContent = message;
    messageContainer.className = isSuccess 
        ? 'message-container success' 
        : 'message-container error';
    messageContainer.style.display = 'block';
}

// ✅ Validation functions
function isValidName(name) {
    return /^[A-Za-z\s]{3,50}$/.test(name);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(password) {
    // Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);
}

function isValidLocation(location) {
    return location.length >= 3;
}

// 🚀 Submit handler
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = document.getElementById('full-name').value.trim();
    const username = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();
    const location = document.getElementById('location').value.trim();

    // ✅ Required check
    if (!fullName || !username || !password || !confirmPassword || !location) {
        showMessage('All fields are required.', false);
        return;
    }

    // ✅ Name validation
    if (!isValidName(fullName)) {
        showMessage('Name should be 3–50 characters and contain only letters.', false);
        return;
    }

    // ✅ Email validation
    if (!isValidEmail(username)) {
        showMessage('Enter a valid email address.', false);
        return;
    }

    // ✅ Password strength
    if (!isStrongPassword(password)) {
        showMessage(
            'Password must be 8+ chars, include uppercase, lowercase, number & special character.',
            false
        );
        return;
    }

    // ✅ Confirm password
    if (password !== confirmPassword) {
        showMessage('Passwords do not match!', false);
        return;
    }

    // ✅ Location validation
    if (!isValidLocation(location)) {
        showMessage('Enter a valid location.', false);
        return;
    }

    const data = { username, password, name: fullName, location };
    const submitBtn = registerForm.querySelector('button[type="submit"]');

    // Loading state
    submitBtn.textContent = 'Registering...';
    submitBtn.disabled = true;

    try {
        const response = await fetch('http://127.0.0.1:5000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            showMessage(result.message, true);
            window.location.href = "login.html";
        } else {
            showMessage(result.message, false);
            submitBtn.textContent = 'Register Account';
            submitBtn.disabled = false;
        }

    } catch (error) {
        console.error('Error:', error);
        showMessage('Server error. Please try again later.', false);
        submitBtn.textContent = 'Register Account';
        submitBtn.disabled = false;
    }
});