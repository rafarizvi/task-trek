const { google } = require('googleapis');
require('dotenv').config();

const exchangeAuthCodeForToken = async (authCode) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const { tokens } = await oauth2Client.getToken(authCode);
  oauth2Client.setCredentials(tokens);

  const userInfo = await google.oauth2('v2').userinfo.get({ auth: oauth2Client });
  return {
    email: userInfo.data.email,
    // Other user data as needed
  };
};

module.exports = exchangeAuthCodeForToken;