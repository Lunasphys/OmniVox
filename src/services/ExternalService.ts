import { WeatherService } from './weather/WeatherService';
import { SpotifyService } from './music/SpotifyService';
import { YouTubeService } from './video/YouTubeService';
import { EmailService } from './communication/EmailService';
import { PhoneService } from './communication/PhoneService';
import { DatabaseService } from "./database/DatabaseService.ts";

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

