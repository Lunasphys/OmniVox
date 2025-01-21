import WeatherService from './weather/WeatherService.js';
import SpotifyService from './music/SpotifyService.js';
import YouTubeService from './video/YouTubeService.js';
import DatabaseService from './database/DatabaseService.js';
import EmailService from "./communication/EmailService.js";

class ExternalService {
  constructor(weatherService, spotifyService, youtubeService, databaseService, emailService) {
    this.weatherService = weatherService;
    this.spotifyService = spotifyService;
    this.youtubeService = youtubeService;
    this.databaseService = databaseService;
    this.emailService = emailService;
  }

  async getWeather(city) {
    return await this.weatherService.getWeather(city);
  }

  async searchSpotify(query) {
    return this.spotifyService.searchAndPlay(query);
  }

  async searchYouTube(query) {
    return this.youtubeService.searchAndPlay(query);
  }

  async addUser(username, email) {
    return await this.databaseService.addUser(username, email);
  }

  async sendEmail(to, subject, message) {
    try {
      return await this.emailService.sendEmail(to, subject, message);
    } catch (error) {
      console.error('Error in ExternalService sendEmail:', error.message);
      throw error;
    }
  }

  async getUsers() {
    return await this.databaseService.getUsers();
  }

  async logCommand(userId, commandText, commandType, responseText) {
    return await this.databaseService.logCommand(userId, commandText, commandType, responseText);
  }

  async getCommandHistory(userId) {
    return await this.databaseService.getCommandHistory(userId);
  }

  async setUserPreference(userId, key, value) {
    return await this.databaseService.setUserPreference(userId, key, value);
  }

  async getUserPreference(userId, key) {
    return await this.databaseService.getUserPreference(userId, key);
  }

  getDataBase() {
    return this.databaseService;
  }
}

export default ExternalService;
