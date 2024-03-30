
const logout = async () => {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      // Redirect to the desired page
      window.location.replace('/');
    } else {
      // Handle error
      alert(response.statusText);
    }
    console.log(response)
  } catch (error) {
    console.error('Error logging out:', error);
  }
};


document.querySelector('#logout').addEventListener('click', logout);
