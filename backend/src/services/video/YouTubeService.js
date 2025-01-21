import axios from 'axios';

class YouTubeService {
    constructor() {
        this.apiKey = process.env.YOUTUBE_API_KEY;
        console.log('YouTubeService initialized with API key:', this.apiKey);
    }

    /**
     * Searches for a given query on YouTube and constructs a search URL.
     *
     * @param {string} query - The search term or query to look for on YouTube.
     * @return {Promise<string>} A promise that resolves to a YouTube search URL based on the provided query.
     * @throws {Error} Throws an error if the YouTube search URL cannot be constructed.
     */
    async searchAndPlay(query) {
        try {
            console.log(`Constructing YouTube search URL for query: ${query}`);
            const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
            console.log(`Redirecting to YouTube search URL: ${searchUrl}`);
            return `Here is the link to your search: ${searchUrl}`;
        } catch (error) {
            console.error('YouTubeService Error:', error.message);
            throw new Error('Could not perform YouTube search.');
        }
    }

}
export default YouTubeService;
