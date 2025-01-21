import fetchWithErrorHandling from '../utils/fetchWithErrorHandling.js';

/**
 * Handles a weather-related command by extracting the city name,
 * fetching weather data for that city, and returning a response message.
 *
 * @async
 * @function handleWeatherCommand
 * @param {string} command - The input command containing a request for weather information,
 * typically including a city name.
 * @returns {Promise<string>} A promise that resolves to a message containing weather information
 * for the specified city, or an error message if the information is unavailable or the input
 * format is invalid.
 */
export const handleWeatherCommand = async (command) => {
    const cityMatch = command.match(/weather (?:in|at|for)? (.+)/i);
    if (cityMatch) {
        const res = await fetchWithErrorHandling(`http://localhost:3000/api/weather?city=${cityMatch[1]}`);
        return res.message || 'Weather data unavailable.';
    }
    return 'Please specify a city for weather information.';
};
