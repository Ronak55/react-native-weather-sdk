import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useWeather } from '../hooks/useWeather';
import { getCurrentLocation } from '../service/locationService';

const HomeScreen = () => {
  const [city, setCity] = useState('');
  const { data, loading, error, getWeatherByCoordinates, getWeatherByCity } = useWeather();

  const handleFetchByCity = async () => {
    if (!city.trim()) return;
    getWeatherByCity(city.trim());
  };

  const handleFetchByLocation = async () => {
    try {
      const { lat, lon } = await getCurrentLocation();
      getWeatherByCoordinates(lat, lon);
    } catch (err) {
      console.warn(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter city name"
        style={styles.input}
        value={city}
        onChangeText={setCity}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleFetchByCity}>
          <Text style={styles.buttonText}>Get Weather by City</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleFetchByLocation}>
          <Text style={styles.buttonText}>Use My Location</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {data && (
        <View style={styles.card}>
          <Text style={styles.city}>{data.city}</Text>
          <Text style={styles.temp}>{data.temperature}°C</Text>
          <Text style={styles.description}>{data.description}</Text>
          {data.icon && (
            <Image
              source={{ uri: data.icon }}
              style={styles.icon}
              resizeMode="contain"
            />
          )}
          <View style={styles.details}>
            <Text style={styles.detailText}>🌬 Wind: {data.windSpeed} km/h</Text>
            <Text style={styles.detailText}>💧 Humidity: {data.humidity}%</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    marginTop: 20,
    color: '#ff3b30',
    fontSize: 14,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
  },
  city: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  description: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 10,
  },
  icon: {
    width: 80,
    height: 80,
    marginVertical: 10,
  },
  details: {
    width: '100%',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5,
  },
});
