// backend/src/routes/externalRoutes.ts
import express from 'express';
import externalService from '../services/ServiceFactory';

const router = express.Router();

// Route pour obtenir la météo
router.get('/weather', async (req, res) => {
    const { city } = req.query;
    if (!city) {
        return res.status(400).json({ error: 'La ville est requise.' });
    }

    try {
        const weatherData = await externalService.getWeather(city as string);
        res.json({ message: weatherData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour rechercher sur Spotify
router.get('/spotify', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'La requête est requise.' });
    }

    try {
        const spotifyData = await externalService.searchSpotify(query as string);
        res.json({ message: spotifyData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour rechercher sur YouTube
router.get('/youtube', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'La requête est requise.' });
    }

    try {
        const youtubeData = await externalService.searchYouTube(query as string);
        res.json({ message: youtubeData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour envoyer un email
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

// Route pour passer un appel téléphonique
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
