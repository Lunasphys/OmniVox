const WeatherService = require('./weather/WeatherService.js');
const SpotifyService = require('./music/SpotifyService.js');
const YouTubeService = require('./video/YouTubeService.js');
const DatabaseService = require('./database/DatabaseService.js');
const ExternalService = require('./ExternalService.js');

// Instancier les services
const weatherService = new WeatherService();
const spotifyService = new SpotifyService();
const youtubeService = new YouTubeService();
const databaseService = new DatabaseService();

// Créer et exporter l'instance d'ExternalService
const externalService = new ExternalService(
    weatherService,
    spotifyService,
    youtubeService,
    databaseService
);

module.exports = { externalService };
