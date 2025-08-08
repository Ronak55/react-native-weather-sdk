export type WeatherData = {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
};

export type WeatherContextType = {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  getWeatherByCity: (city: string) => Promise<void>;
  getWeatherByCoordinates: (lat: number, lon: number) => Promise<void>;
};
