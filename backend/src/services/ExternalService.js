import { WeatherService } from './weather/WeatherService.js';
import { SpotifyService } from './music/SpotifyService.js';
import { YouTubeService } from './video/YouTubeService.js';
import { EmailService } from './communication/EmailService.js';
import { PhoneService } from './communication/PhoneService.js';
import { DatabaseService } from "./database/DatabaseService.js";

export class ExternalService {
  private weatherService: WeatherService;
  private spotifyService: SpotifyService;
  private youtubeService: YouTubeService;
  private emailService: EmailService;
  private phoneService: PhoneService;
  private readonly databaseService: DatabaseService;

  constructor(
      weatherService: WeatherService,
      spotifyService: SpotifyService,
      youtubeService: YouTubeService,
      emailService: EmailService,
      phoneService: PhoneService,
      databaseService: DatabaseService
  ) {
    this.weatherService = weatherService;
    this.spotifyService = spotifyService;
    this.youtubeService = youtubeService;
    this.emailService = emailService;
    this.phoneService = phoneService;
    this.databaseService = databaseService;
  }
  async getWeather(city: string): Promise<string> {
    return this.weatherService.getWeather(city);
  }

  async searchSpotify(query: string): Promise<string> {
    return this.spotifyService.searchAndPlay(query);
  }

  async searchYouTube(query: string): Promise<string> {
    return this.youtubeService.searchAndPlay(query);
  }

  async sendEmail(to: string, subject: string, message: string): Promise<string> {
    return this.emailService.sendEmail(to, subject, message);
  }

  makePhoneCall(phoneNumber: string): string {
    return this.phoneService.makePhoneCall(phoneNumber);
  }

  getDataBase(): DatabaseService {
    return this.databaseService;
  }
}

