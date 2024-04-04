function loadGoogleAuth() {
  gapi.load('auth2', function() {
    auth2 = gapi.auth2.init({
      client_id: '441631015949-b21bhnq089cdv1be4pejj6s8hdm2opns.apps.googleusercontent.com',
      // Scopes to request in addition to 'profile' and 'email'
      // scope: 'additional_scope'
    });
  });
}

// Call the loadGoogleAuth function when the window has finished loading
window.onload = function() {
  loadGoogleAuth();
};

fetch('/api/google-client-id')
.then(response => {
  if(!response.ok){
      throw new Error('Network response was not ok')
  }
 return response.json()
})
.then(data => {
  const clientId = data.clientId;

  console.log('Google Client ID:', clientId);

  const signInButton = document.getElementById('signinButton');
  signInButton.addEventListener('click', function() {
      window.location.href = '/auth/google'; 
    auth2.grantOfflineAccess().then(signInCallback);
  });
  function signInCallback(authResult){
      if(authResult['code']) {
          const authCode = authResult['code'];

          fetch('api/google-authenticate', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ code: authCode })
          })
          .then(response => {
              if(response.ok) {
                  console.log('Authentication successful');
              } else {
                  console.error('Authentication failed');
              }
          })
          .catch(err => {
              console.error('Error during authentication:', err);
          });
      } else{
          console.error('Error during authentication:', authResult['error']);
      }
  }

})
.catch(error => {
  console.error('Error fetching Google Client ID:', error);
});