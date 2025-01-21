import axios from 'axios';

class YouTubeService {
    constructor() {
        this.apiKey = 'AIzaSyCPG6obeaKKoR6OFYhfapnyRxe5vGezStc';
    }

    async searchAndPlay(query) {
        try {
            // Effectuer une recherche sur YouTube
            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${this.apiKey}&maxResults=1&type=video`
            );

            const video = response.data.items[0];
            if (!video) {
                throw new Error('No videos found');
            }

            // Construire l'URL de la vidéo YouTube
            const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;

            // Ouvrir la vidéo dans un nouvel onglet
            window.open(videoUrl, '_blank');

            // Retourner un message de confirmation
            return `Opening YouTube video: ${video.snippet.title}`;
        } catch (error) {
            console.error('YouTube API error:', error);
            throw new Error('Could not find YouTube video');
        }
    }
}

export default YouTubeService;
