const router = require('express').Router();
const { User } = require('../../../google/task-management/models');
require('dotenv').config();
const exchangeAuthCodeForToken = require('../../../google/task-management/utils/googleAuth');

router.get('/auth/google', (req, res) => {
    try {
        const redirectUrl = 'https://accounts.google.com/o/oauth2/auth' +
        '?response_type=code' +
        '&client_id=441631015949-b21bhnq089cdv1be4pejj6s8hdm2opns.apps.googleusercontent.com' + // Replace with your Google client ID
        '&redirect_uri=http://localhost:3001/auth/google/callback' +
        '&scope=email%20profile';
        res.redirect(redirectUrl);
    } catch (error) {
        console.error('Error redirecting to Google OAuth:', error);
        res.status(500).send('Internal Server Error');
    }
});



router.get('/auth/google/callback', async (req, res) => {
    try {
        const authCode = req.query.code; // Extract the 'code' parameter from the request query

        console.log('Received auth code:', authCode); // Log the received auth code

        // Ensure that the 'code' parameter is present
        if (!authCode) {
            throw new Error('Authorization code not found');
        }

        // Call the exchangeAuthCodeForToken function to exchange the auth code for tokens
        const userData = await exchangeAuthCodeForToken(authCode);

        // Proceed with user authentication and redirection
        // Your authentication logic goes here...

        // Send a success response
        res.status(200).send('Authentication successful');
    } catch (error) {
        // Handle errors
        console.error('Error handling Google OAuth callback:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/auth/google/callback', async (req, res) => {
    try {
        const { name, email } = req.body; 
        
        
        let user = await User.findOne({ where: { email } });

        if (!user) {
            
            user = await User.create({ email });

            
        }

        req.session.user = user; 

        res.redirect('/'); 
    } catch (error) {
        console.error('Error during Google sign-in:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;