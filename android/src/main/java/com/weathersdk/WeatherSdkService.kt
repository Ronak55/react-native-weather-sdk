package com.weathersdk

import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Query

// Retrofit interface that defines how to fetch weather data from OpenWeatherMap API
interface WeatherSdkService {

    // Fetch weather data by city name
    @GET("weather")
    fun getWeatherByCity(
        @Query("q") city: String,       // City name, e.g. "London"
        @Query("appid") apiKey: String = WeatherSdkConfig.OPEN_WEATHER_API_KEY
        @Query("units") units: String = "metric"
    ): Call<WeatherSdkResponse>

    // Fetch weather data by geographic coordinates (latitude & longitude)
    @GET("weather")
    fun getWeatherByCoordinates(
        @Query("lat") lat: Double,      // Latitude value, e.g. 35.0
        @Query("lon") lon: Double,      // Longitude value, e.g. 139.0
        @Query("appid") apiKey: String = WeatherSdkConfig.OPEN_WEATHER_API_KEY
        @Query("units") units: String = "metric"
    ): Call<WeatherSdkResponse>
}
