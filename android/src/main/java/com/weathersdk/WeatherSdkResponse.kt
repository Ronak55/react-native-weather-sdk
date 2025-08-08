package com.weathersdk

// Top-level response from the OpenWeatherMap API
data class WeatherSdkResponse(
    val name: String,           // City name
    val main: Main,             // Main weather data like temperature and humidity
    val weather: List<Weather>, // List of weather conditions (usually contains 1 item)
    val wind: Wind              // Wind details such as speed
)

// Nested object representing main weather measurements
data class Main(
    val temp: Double,           // Temperature in Celsius (if units=metric)
    val humidity: Int           // Humidity as a percentage
)

// Nested object representing weather condition details
data class Weather(
    val description: String,    // Weather description, e.g. "clear sky"
    val icon: String            // Weather icon code, e.g. "01d"
)

// Nested object representing wind-related data
data class Wind(
    val speed: Double           // Wind speed in meters per second
)
