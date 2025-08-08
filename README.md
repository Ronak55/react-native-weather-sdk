# react-native-weather-sdk

A cross-platform React Native SDK to fetch weather data using native Android and iOS integrations. Supports fetching by **city name** or **latitude/longitude**.

## 📋 Features
✅ Cross-platform support (Android & iOS)  
✅ Native integration for better performance  
✅ Easy-to-use API for fetching weather data  
✅ Works with both city names and coordinates  

---

## 📦 Installation

```bash
# Using npm
npm install react-native-weather-sdk

# Using yarn
yarn add react-native-weather-sdk

# Using pnpm
pnpm add react-native-weather-sdk
```
---
## ⚙️ Setup

#### 1. Android

Open android/app/build.gradle and ensure the minimum SDK version is set:

```js
android {
    defaultConfig {
        minSdkVersion 21
    }
}
```
#### 2. iOS

Navigate to the ios folder and install pods:

```bash
cd ios
pod install
```
## 🚀 Usage Examples

#### 1. Fetch Weather by City

```js
import WeatherSDK from 'react-native-weather-sdk';

async function getWeatherByCity() {
  try {
    const weather = await WeatherSDK.fetchWeatherByCity('London');
    console.log(weather);
  } catch (error) {
    console.error(error);
  }
}
```
#### 2. Fetch Weather by Coordinates

```js
import WeatherSDK from 'react-native-weather-sdk';

async function getWeatherByCoordinates() {
  try {
    const weather = await WeatherSDK.fetchWeatherByCoordinates(51.5074, -0.1278);
    console.log(weather);
  } catch (error) {
    console.error(error);
  }
}
```
## 📂 Example Project

An example React Native app using this SDK is available in the examples/ folder. It demonstrates:

✅ State management  
✅ API integration  
✅ UI display of weather data

Run this code:

```bash
cd examples
npm install
npm run android   # for Android
npm run ios       # for iOS
```
## 🛠 API Reference

#### 1. Fetches data for the given city
```js
WeatherSDK.fetchWeatherByCity(cityName: string): Promise<object>
```
#### 2. Fetches weather data for the given latitude and longitude.
```js
WeatherSDK.fetchWeatherByCoordinates(lat: number, lon: number): Promise<object>
```
## 👨‍💻 Maintainers

This module is developed and maintained by [Ronak Bothra](https://github.com/Ronak55)

If you need any help with this module, or anything else, feel free to email me at [rj.rjain567@gmail.com](mailto:rj.rjain567@gmail.com) 🙏🏻

## 📄 License
MIT License © 2025