import { ExternalService } from './ExternalService.ts';
import { WeatherService } from './weather/WeatherService.ts';
import { SpotifyService } from './music/SpotifyService.ts';
import { YouTubeService } from './video/YouTubeService.ts';
import { EmailService } from './communication/EmailService.ts';
import { PhoneService } from './communication/PhoneService.ts';
import { DatabaseService } from './database/DatabaseService.ts';

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
