import axios from 'axios';

class YouTubeService {
  constructor() {
    this.apiKey = 'YOUR_YOUTUBE_API_KEY';
  }

  async searchAndPlay(query) {
    try {
      const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${this.apiKey}&maxResults=1&type=video`
      );

      const video = response.data.items[0];
      if (!video) {
        throw new Error('No videos found');
      }

      const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;

      console.log(`Opening YouTube video: ${video.snippet.title}`);
      console.log(`Video URL: ${videoUrl}`);

      return `Opening YouTube video: ${video.snippet.title}`;
    } catch (error) {
      console.error('YouTube API error:', error);
      throw new Error('Could not find YouTube video');
    }
  }
}

export default YouTubeService;
