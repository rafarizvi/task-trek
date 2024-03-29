const registerFormHandler = async (e) => {
    e.preventDefault();

    const username = document.querySelector('#username-reg').value.trim();
    const email = document.querySelector('#email-reg').value.trim();
    const password = document.querySelector('#password-reg').value.trim();
   

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/tasks');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#registration-form').addEventListener('submit', registerFormHandler);