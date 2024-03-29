const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        // Handle non-OK responses (e.g., display error message)
        const responseData = await response.json();
        alert(responseData.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle other errors (e.g., network issues)
      alert('An error occurred while trying to log in.');
    }
  } else {
    // Handle case where email or password is empty
    alert('Please enter both email and password.');
  }
};

document.querySelector('form').addEventListener('submit', loginFormHandler);

