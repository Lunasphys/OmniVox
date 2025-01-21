/**
 * Processes a user command to search or play a video on YouTube.
 *
 * This function parses a user command string and determines if it includes
 * a request to search or play content on YouTube. If a match is found, it
 * generates a YouTube search URL for the specified content, opens the URL
 * in a new browser tab, and returns a success message. If no match is found,
 * it returns a prompt asking for a specific search term.
 *
 * @param {string} command - The user-provided command string that may contain a directive to search or play videos on YouTube.
 * @returns {string} A message indicating the result of the operation. If successful, it includes the search term; otherwise, it prompts for clarity.
 */
export const handleYouTubeCommand = (command) => {
    const videoMatch = command.match(/(?:search|play|find) (.+) on youtube/i);
    if (videoMatch) {
        const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(videoMatch[1])}`;
        window.open(searchUrl, '_blank');
        return `Opened YouTube search for "${videoMatch[1]}".`;
    }
    return 'Please specify what to search on YouTube.';
};
