import { WeatherProvider } from './context/WeatherContext';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <WeatherProvider>
      <HomeScreen />
    </WeatherProvider>
  );
};

export default App;
