import axios from 'axios';

export class WeatherService {
  private apiKey: string = process.env.WEATHER_API_KEY;
  private baseGeoUrl = 'https://api.openweathermap.org/geo/1.0/direct';
  private baseWeatherUrl = 'https://api.openweathermap.org/data/3.0/onecall';


  async getWeather(city: string): Promise<string> {
    try {
      // Obtenez les coordonnées géographiques
      const geoResponse = await axios.get(this.baseGeoUrl, {
        params: {
          q: city,
          limit: 1,
          appid: this.apiKey,
        },
      });

      if (!geoResponse.data || geoResponse.data.length === 0) {
        throw new Error(`City "${city}" not found.`);
      }

      const { lat, lon } = geoResponse.data[0];

      // Obtenez les données météo
      const weatherResponse = await axios.get(this.baseWeatherUrl, {
        params: {
          lat,
          lon,
          exclude: 'minutely,hourly,daily,alerts',
          units: 'metric',
          lang: 'fr',
          appid: this.apiKey,
        },
      });

      const { temp, feels_like, humidity, wind_speed, weather } = weatherResponse.data.current;
      const description = weather[0].description;

      return `À ${city}, il fait ${Math.round(temp)}°C (ressenti ${Math.round(feels_like)}°C). ${description}. Humidité: ${humidity}%, Vent: ${Math.round(wind_speed * 3.6)} km/h.`;
    } catch (error: any) {
      console.error('WeatherService Error:', error);
      throw new Error('Could not fetch weather data.');
    }
  }
}
