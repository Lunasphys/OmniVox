import axios from 'axios';

class SpotifyService {
  constructor() {
    this.clientId = process.env.SPOTIFY_CLIENT_ID;
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    this.accessToken = process.env.SPOTIFY_ACCESS_TOKEN;
  }

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
