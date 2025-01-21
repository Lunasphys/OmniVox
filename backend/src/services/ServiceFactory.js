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

/**
 * Represents an instance of ExternalService comprising various service clients.
 *
 * This variable is initialized with service clients for weather, Spotify,
 * YouTube, database, and email functionalities. It combines these services
 * to provide a unified interface for their access.
 *
 * Dependencies:
 * - weatherService: Handles weather-related data and operations.
 * - spotifyService: Provides integration with Spotify's API.
 * - youtubeService: Facilitates YouTube-related operations and data.
 * - databaseService: Manages data persistence and retrieval.
 * - emailService: Manages email sending and related functionalities.
 *
 * Usage:
 * This variable acts as a centralized hub allowing interaction with multiple
 * external services, simplifying integration within the application.
 */
const externalService = new ExternalService(
    weatherService,
    spotifyService,
    youtubeService,
    databaseService,
    emailService
);

export default externalService;
