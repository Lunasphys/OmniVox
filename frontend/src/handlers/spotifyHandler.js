/**
 * Handles a command to search or play music on Spotify.
 *
 * This function parses a command string that includes phrases such as
 * "search", "play", or "find", followed by the music title or query.
 * If a match is found, it constructs a Spotify search URL and opens it
 * in a new browser tab. If no valid query is provided, returns a
 * message indicating the command format.
 *
 * @param {string} command - The string input containing the desired action
 *                           and music query.
 * @returns {string} A message indicating the result of the command, such
 *                   as opening Spotify or requesting proper input.
 */
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
