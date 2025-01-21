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

  /**
   * Retrieves the weather information for a given city.
   *
   * @param {string} city - The name of the city to fetch the weather for.
   * @return {Promise<Object>} A promise that resolves to an object containing the weather data for the specified city.
   */
  async getWeather(city) {
    return await this.weatherService.getWeather(city);
  }

  /**
   * Searches for a song, artist, or playlist on Spotify using a provided query string
   * and initiates playback for the resulting match.
   *
   * @param {string} query - The search term used to find a song, artist, or playlist on Spotify.
   * @return {Promise<Object>} A promise that resolves to the result of the Spotify search and playback operation.
   */
  async searchSpotify(query) {
    return this.spotifyService.searchAndPlay(query);
  }

  /**
   * Searches for a video or media using the given query and plays it through the YouTube service.
   *
   * @param {string} query - The search query to find the desired video or media.
   * @return {Promise<void>} A promise that resolves when the search and play operation is complete.
   */
  async searchAndPlay(query) {
    return this.youtubeService.searchAndPlay(query);
  }

  /**
   * Adds a new user to the database with the specified username and email.
   *
   * @param {string} username - The username of the user to be added.
   * @param {string} email - The email address of the user to be added.
   * @return {Promise<object>} A promise that resolves to the newly added user object.
   */
  async addUser(username, email) {
    return await this.databaseService.addUser(username, email);
  }

  /**
   * Sends an email using the specified email service.
   *
   * @param {string} to - The recipient's email address.
   * @param {string} subject - The subject of the email.
   * @param {string} message - The content of the email.
   * @return {Promise<any>} A promise that resolves when the email is successfully sent, or rejects with an error.
   */
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
