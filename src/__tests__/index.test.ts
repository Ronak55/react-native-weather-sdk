// index.test.ts
import WeatherSdk from '../index';
import NativeWeatherSdk from '../NativeWeatherSdk';
import type { WeatherData } from '../types';

import '@jest/globals';

jest.mock('../NativeWeatherSdk', () => ({
  fetchWeatherByCity: jest.fn(),
  fetchWeatherByCoordinates: jest.fn(),
}));

describe('WeatherSdk JavaScript Bridge', () => {
  const mockWeatherData: WeatherData = {
    cityName: 'London',
    temperature: 20,
    description: 'Cloudy',
    iconUrl: 'http://example.com/icon.png',
    humidity: 50,
    windSpeed: 10,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchWeatherByCity', () => {
    it('should return weather data when native call succeeds', async () => {
      (NativeWeatherSdk.fetchWeatherByCity as jest.Mock).mockResolvedValue(mockWeatherData);

      const result = await WeatherSdk.fetchWeatherByCity('London');

      expect(NativeWeatherSdk.fetchWeatherByCity).toHaveBeenCalledWith('London');
      expect(result).toEqual(mockWeatherData);
    });

    it('should throw an error when native call fails', async () => {
      (NativeWeatherSdk.fetchWeatherByCity as jest.Mock).mockRejectedValue(new Error('Native error'));

      await expect(WeatherSdk.fetchWeatherByCity('London')).rejects.toThrow(
        'Native error'
      );
    });
  });

  describe('fetchWeatherByCoordinates', () => {
    it('should return weather data when native call succeeds', async () => {
      (NativeWeatherSdk.fetchWeatherByCoordinates as jest.Mock).mockResolvedValue(mockWeatherData);

      const result = await WeatherSdk.fetchWeatherByCoordinates(51.5074, -0.1278);

      expect(NativeWeatherSdk.fetchWeatherByCoordinates).toHaveBeenCalledWith(51.5074, -0.1278);
      expect(result).toEqual(mockWeatherData);
    });

    it('should throw an error when native call fails', async () => {
      (NativeWeatherSdk.fetchWeatherByCoordinates as jest.Mock).mockRejectedValue(new Error('Native error'));

      await expect(WeatherSdk.fetchWeatherByCoordinates(51.5074, -0.1278)).rejects.toThrow(
        'Native error'
      );
    });
  });
});
