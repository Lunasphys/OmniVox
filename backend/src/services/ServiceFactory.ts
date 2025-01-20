import { ExternalService } from './ExternalService';
import { WeatherService } from './weather/WeatherService';
import { SpotifyService } from './music/SpotifyService';
import { YouTubeService } from './video/YouTubeService';
import { EmailService } from './communication/EmailService';
import { PhoneService } from './communication/PhoneService';
import { DatabaseService } from './database/DatabaseService';



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
