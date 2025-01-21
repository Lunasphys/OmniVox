export const handleYouTubeCommand = (command) => {
    const videoMatch = command.match(/(?:search|play|find) (.+) on youtube/i);
    if (videoMatch) {
        const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(videoMatch[1])}`;
        window.open(searchUrl, '_blank');
        return `Opened YouTube search for "${videoMatch[1]}".`;
    }
    return 'Please specify what to search on YouTube.';
};
