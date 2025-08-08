import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  fetchWeatherByCity(city: string): Promise<any>;
  fetchWeatherByCoordinates(lat: number, lon: number): Promise<any>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('WeatherSdk');
