export const handleSpotifyCommand = (command) => {
    const musicMatch = command.match(/(?:search|play|find) (.+) on spotify/i);
    if (musicMatch) {
        const searchQuery = encodeURIComponent(musicMatch[1]);
        const spotifyUrl = `https://open.spotify.com/search/${searchQuery}`;
        window.open(spotifyUrl, '_blank');
        return `Opened Spotify search for "${musicMatch[1]}".`;
    }
    return 'Please specify what to search on Spotify.';
};
