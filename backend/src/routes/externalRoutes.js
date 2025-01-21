import express from 'express';
import externalService from '../services/ServiceFactory.js';

const router = express.Router();

router.get('/weather', async (req, res) => {
    const { city } = req.query;
    console.log(`Weather request received for city: ${city}`); // Débogage

    if (!city) {
        return res.status(400).json({ error: 'City parameter is required.' });
    }

    try {
        const weatherData = await externalService.getWeather(city);
        console.log('Weather data fetched successfully:', weatherData); // Débogage

        res.json({ message: weatherData });
    } catch (error) {
        console.error('Error in /weather route:', error.message); // Débogage
        res.status(500).json({ error: 'Failed to fetch weather data.' });
    }
});

router.get('/spotify', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'La requête est requise.' });
    }

    try {
        const spotifyData = await externalService.searchSpotify({ query });
        res.json({ message: spotifyData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/youtube', (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'The query parameter is required.' });
    }

    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    console.log(`Redirecting to YouTube search URL: ${searchUrl}`);
    res.redirect(searchUrl);
});

router.post('/database', async (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ error: 'Le nom d\'utilisateur et l\'email sont requis.' });
    }

    try {
        const insertId = await externalService.addUser(username, email);
        res.status(201).json({ message: 'Utilisateur ajouté avec succès.', insertId: insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/email', async (req, res) => {
    const { to, subject, message } = req.body;
    if (!to || !subject || !message) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    try {
        const emailResponse = await externalService.sendEmail(to, subject, message);
        res.json({ message: emailResponse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/phone', (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        return res.status(400).json({ error: 'Le numéro de téléphone est requis.' });
    }

    try {
        const callResponse = externalService.makePhoneCall(phoneNumber);
        res.json({ message: callResponse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
