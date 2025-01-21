import axios from 'axios';

class SpotifyService {
  constructor() {
    this.clientId = process.env.SPOTIFY_CLIENT_ID;
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    this.accessToken = process.env.SPOTIFY_ACCESS_TOKEN;
  }

  /**
   * Retrieves an access token for Spotify API.
   * If a valid access token already exists, it returns the existing token.
   * Otherwise, it requests a new access token using client credentials.
   *
   * @return {Promise<string>} A promise that resolves to the access token string.
   * @throws {Error} If there is an issue with the authentication process.
   */
  async getAccessToken() {
    if (this.accessToken) return this.accessToken;

    try {
      const response = await axios.post(
          'https://accounts.spotify.com/api/token',
          new URLSearchParams({
            grant_type: 'client_credentials',
          }),
          {
            headers: {
              'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
      );

      this.accessToken = response.data.access_token;
      return this.accessToken;
    } catch (error) {
      console.error('Spotify authentication error:', error);
      throw new Error('Could not authenticate with Spotify');
    }
  }

  /**
   * Searches for a track on Spotify using the provided query and plays the first result by opening its Spotify page in a new tab.
   *
   * @param {string} query The search query for the desired track.
   * @return {Promise<string>} A promise that resolves to a message indicating the track being played, or rejects with an error if the process fails.
   */
  async searchAndPlay(query) {
    try {
      const token = await this.getAccessToken();
      const response = await axios.get(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
      );

      const track = response.data.tracks.items[0];
      if (!track) {
        throw new Error('No tracks found');
      }

      // Ouvrir la page Spotify de la piste dans un nouvel onglet
      const trackUrl = track.external_urls.spotify;
      window.open(trackUrl, '_blank'); // Ouvre l'URL dans un nouvel onglet

      return `Playing ${track.name} by ${track.artists[0].name}`;
    } catch (error) {
      console.error('Spotify API error:', error);
      throw new Error('Could not play music');
    }
  }
}

export default SpotifyService;
