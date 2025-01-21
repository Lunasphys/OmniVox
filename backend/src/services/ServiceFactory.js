import WeatherService from './weather/WeatherService.js';
import SpotifyService from './music/SpotifyService.js';
import YouTubeService from './video/YouTubeService.js';
import DatabaseService from './database/DatabaseService.js';
import EmailService from './communication/EmailService.js';
import ExternalService from './ExternalService.js';
import dotenv from 'dotenv';

dotenv.config();

const weatherService = new WeatherService();
const spotifyService = new SpotifyService();
const youtubeService = new YouTubeService();
const databaseService = new DatabaseService();
const emailService = new EmailService();

const externalService = new ExternalService(
    weatherService,
    spotifyService,
    youtubeService,
    databaseService,
    emailService
);

export default externalService;
