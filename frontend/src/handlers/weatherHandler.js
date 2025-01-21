import fetchWithErrorHandling from '../utils/fetchWithErrorHandling.js';

export const handleWeatherCommand = async (command) => {
    const cityMatch = command.match(/weather (?:in|at|for)? (.+)/i);
    if (cityMatch) {
        const res = await fetchWithErrorHandling(`http://localhost:3000/api/weather?city=${cityMatch[1]}`);
        return res.message || 'Weather data unavailable.';
    }
    return 'Please specify a city for weather information.';
};
