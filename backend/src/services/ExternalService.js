const WeatherService = require('./weather/WeatherService.js');
const SpotifyService = require('./music/SpotifyService.js');
const YouTubeService = require('./video/YouTubeService.js');

const DatabaseService = require('./database/DatabaseService.js');

class ExternalService {
  constructor(
      weatherService,
      spotifyService,
      youtubeService,
      databaseService
  ) {
    this.weatherService = weatherService;
    this.spotifyService = spotifyService;
    this.youtubeService = youtubeService;
    this.databaseService = databaseService;
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

  // Ajouter la gestion des utilisateurs via DatabaseService
  async addUser(username, email) {
    return await this.databaseService.addUser(username, email);
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

module.exports = ExternalService;
