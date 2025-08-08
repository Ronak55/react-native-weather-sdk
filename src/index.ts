import NativeWeatherSdk from './NativeWeatherSdk';
import { type WeatherData } from './types'

/**
 * Fetch weather data by city name
 */
async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  try {
    return await NativeWeatherSdk.fetchWeatherByCity(city);
  } catch (err: any) {
    throw new Error(err?.message || 'Failed to fetch weather by city');
  }
}

/**
 * Fetch weather data by coordinates (latitude, longitude)
 */
async function fetchWeatherByCoordinates(lat: number, lon: number): Promise<WeatherData> {
  try {
    return await NativeWeatherSdk.fetchWeatherByCoordinates(lat, lon);
  } catch (err: any) {
    throw new Error(err?.message || 'Failed to fetch weather by coordinates');
  }
}

export default {
  fetchWeatherByCity,
  fetchWeatherByCoordinates,
};
