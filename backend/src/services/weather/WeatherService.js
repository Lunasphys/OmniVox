import axios from 'axios';

class WeatherService {
  constructor() {
    this.apiKey = process.env.WEATHER_API_KEY;
    this.baseWeatherUrl = 'https://api.weatherapi.com/v1/current.json';
    console.log('Weather API Key:', this.apiKey);
  }

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

      return `À ${city}, il fait ${temp_c}°C (ressenti ${feelslike_c}°C). ${description}. Humidité: ${humidity}%, Vent: ${wind_kph} km/h.`;
    } catch (error) {
      console.error('WeatherService Error:', error.response?.data || error.message); // Débogage
      throw new Error('Could not fetch weather data.');
    }
  }
}

export default WeatherService;
