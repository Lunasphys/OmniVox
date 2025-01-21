import axios from 'axios';

class WeatherService {
  constructor() {
    this.apiKey = process.env.WEATHER_API_KEY;
    this.baseWeatherUrl = 'https://api.weatherapi.com/v1/current.json';
  }

  async getWeather(city) {
    try {
      const weatherResponse = await axios.get(this.baseWeatherUrl, {
        params: {
          key: this.apiKey,
          q: city,
          lang: 'fr',
        },
      });

      if (!weatherResponse.data || !weatherResponse.data.current) {
        throw new Error(`City "${city}" not found.`);
      }

      const { temp_c, feelslike_c, humidity, wind_kph, condition } = weatherResponse.data.current;
      const description = condition.text;

      return `À ${city}, il fait ${Math.round(temp_c)}°C (ressenti ${Math.round(feelslike_c)}°C). ${description}. Humidité: ${humidity}%, Vent: ${Math.round(wind_kph)} km/h.`;
    } catch (error) {
      console.error('WeatherService Error:', error);
      throw new Error('Could not fetch weather data.');
    }
  }
}

export default WeatherService;
