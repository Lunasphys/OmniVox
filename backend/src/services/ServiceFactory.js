import WeatherService from './weather/WeatherService.js';
import SpotifyService from './music/SpotifyService.js';
import YouTubeService from './video/YouTubeService.js';
import DatabaseService from './database/DatabaseService.js';
import ExternalService from './ExternalService.js';

const weatherService = new WeatherService();
const spotifyService = new SpotifyService();
const youtubeService = new YouTubeService();
const databaseService = new DatabaseService();

const externalService = new ExternalService(
    weatherService,
    spotifyService,
    youtubeService,
    databaseService
);

export default externalService;
