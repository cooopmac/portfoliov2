   // server.js
   const express = require('express');
   const axios = require('axios');
   require('dotenv').config();

   const app = express();
   const port = process.env.PORT || 3000;

   // Enable CORS for your frontend
   app.use((req, res, next) => {
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
     next();
   });

   app.get('/login', (req, res) => {
     const scopes = 'user-read-currently-playing';
     const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
     const clientId = process.env.SPOTIFY_CLIENT_ID;
     const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=code`;
     res.redirect(authUrl);
   });

   app.get('/callback', async (req, res) => {
     const { code } = req.query;
     console.log('Authorization Code:', code);

     if (!code) {
       return res.status(400).send('Authorization code is missing.');
     }

     const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
     const clientId = process.env.SPOTIFY_CLIENT_ID;
     const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

     try {
       const response = await axios.post('https://accounts.spotify.com/api/token', null, {
         params: {
           grant_type: 'authorization_code',
           code,
           redirect_uri: redirectUri,
         },
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
         },
       });

       const { access_token, refresh_token } = response.data;
       console.log('Access Token:', access_token);
       console.log('Refresh Token:', refresh_token);

       // Store the refresh token (you should store this securely)
       // process.env.SPOTIFY_REFRESH_TOKEN = refresh_token;

       res.send('Authentication successful! You can close this window.');
     } catch (error) {
       console.error('Error exchanging code for token:', error);
       res.status(500).send('Authentication failed.');
     }
   });

   // Endpoint to get currently playing track
   app.get('/api/currently-playing', async (req, res) => {
     try {
       const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
         headers: {
           Authorization: `Bearer ${await getAccessToken()}`,
         },
       });
       res.json(response.data);
     } catch (error) {
       console.error('Error fetching currently playing track:', error);
       res.status(500).json({ error: 'Failed to fetch currently playing track' });
     }
   });

   // Function to get a new access token using the refresh token
   async function getAccessToken() {
     try {
       const response = await axios.post('https://accounts.spotify.com/api/token', null, {
         params: {
           grant_type: 'refresh_token',
           refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
         },
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
         },
       });
       return response.data.access_token;
     } catch (error) {
       console.error('Error refreshing token:', error);
       throw error;
     }
   }

   app.listen(port, () => {
     console.log(`Server running on port ${port}`);
   });
