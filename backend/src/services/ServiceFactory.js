import { ExternalService } from './ExternalService.js';
import { WeatherService } from './weather/WeatherService.js';
import { SpotifyService } from './music/SpotifyService.js';
import { YouTubeService } from './video/YouTubeService.js';
import { EmailService } from './communication/EmailService.js';
import { PhoneService } from './communication/PhoneService.js';
import { DatabaseService } from './database/DatabaseService.js';



// Instanciation des services individuels
const weatherService = new WeatherService();
const spotifyService = new SpotifyService();
const youtubeService = new YouTubeService();
const emailService = new EmailService();
const phoneService = new PhoneService();
const databaseService = new DatabaseService();


const externalService = new ExternalService(
    weatherService,
    spotifyService,
    youtubeService,
    emailService,
    phoneService,
    databaseService
);

export default externalService;
