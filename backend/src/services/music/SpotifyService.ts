import axios from 'axios';

export class SpotifyService {
  private clientId: string = 'YOUR_SPOTIFY_CLIENT_ID';
  private clientSecret: string = 'YOUR_SPOTIFY_CLIENT_SECRET';
  private accessToken: string | null = null;

  private async getAccessToken(): Promise<string> {
    if (this.accessToken) return this.accessToken;

    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({
          grant_type: 'client_credentials'
        }),
        {
          headers: {
            'Authorization': `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      this.accessToken = response.data.access_token;
      return this.accessToken;
    } catch (error) {
      console.error('Spotify authentication error:', error);
      throw new Error('Could not authenticate with Spotify');
    }
  }

  async searchAndPlay(query: string): Promise<string> {
    try {
      const token = await this.getAccessToken();
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const track = response.data.tracks.items[0];
      if (!track) {
        throw new Error('No tracks found');
      }

      return `Playing ${track.name} by ${track.artists[0].name}`;
    } catch (error) {
      console.error('Spotify API error:', error);
      throw new Error('Could not play music');
    }
  }
}