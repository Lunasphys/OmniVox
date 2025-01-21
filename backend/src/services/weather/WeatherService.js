import axios from 'axios';

class WeatherService {
  constructor() {
    this.apiKey = process.env.WEATHER_API_KEY;
    this.baseWeatherUrl = 'https://api.weatherapi.com/v1/current.json';
    console.log('Weather API Key:', this.apiKey);
  }

  /**
   * Fetches and returns the current weather information for a given city.
   *
   * @param {string} city - The name of the city for which the weather data is requested.
   * @return {Promise<string>} A promise that resolves to a string describing the weather information, including temperature, humidity, wind speed, and condition.
   * @throws {Error} Throws an error if the weather data cannot be fetched or if it is unavailable for the given city.
   */
  async getWeather(city) {
    try {
      console.log(`Fetching weather for city: ${city}`); // Débogage

      const response = await axios.get(this.baseWeatherUrl, {
        params: {
          key: this.apiKey,
          q: city,
          aqi: 'no',
        },
      });

      console.log('Weather API Response:', response.data); // Débogage

      if (!response.data || !response.data.current) {
        throw new Error(`Weather data not found for city: ${city}`);
      }

      const { temp_c, feelslike_c, humidity, wind_kph, condition } = response.data.current;
      const description = condition.text;

      return `In ${city}, it's ${temp_c}°C (feels like ${feelslike_c}°C). ${description}. Humidity: ${humidity}%, Wind: ${wind_kph} km/h.`;
    } catch (error) {
      console.error('WeatherService Error:', error.response?.data || error.message);
      throw new Error('Could not fetch weather data.');
    }
  }
}

export default WeatherService;
