import axios from 'axios';

class YouTubeService {
    constructor() {
        this.apiKey = process.env.YOUTUBE_API_KEY;
        console.log('YouTubeService initialized with API key:', this.apiKey); // Debug
    }

    async searchAndPlay(query) {
        try {
            console.log(`Searching YouTube for query: ${query}`); // Log de la requête

            const response = await axios.get(
                'https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        part: 'snippet',
                        q: query,
                        key: this.apiKey,
                        maxResults: 1,
                        type: 'video',
                    },
                }
            );

            console.log('YouTube API response:', response.data);

            const video = response.data.items[0];
            if (!video) {
                throw new Error('No videos found for the query.');
            }

            const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;
            return `Playing ${video.snippet.title}: ${videoUrl}`;
        } catch (error) {
            console.error('YouTubeService Error:', error.response?.data || error.message); // Log détaillé
            throw new Error('Could not find YouTube video.');
        }
    }
}

export default YouTubeService;
