package com.weathersdk

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

/**
 * Singleton object that provides a Retrofit service instance for accessing
 * the OpenWeatherMap API.
 */
object WeatherSdkApi {

    // Base URL for the OpenWeatherMap API
    private const val BASE_URL = "https://api.openweathermap.org/data/2.5/"

    /**
     * Lazily initialized Retrofit service instance.
     *
     * This uses the BASE_URL and configures Retrofit to automatically
     * convert JSON responses using Gson.
     */
    val retrofitService: WeatherSdkService by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL) // Set the base API endpoint
            .addConverterFactory(GsonConverterFactory.create()) // Use Gson to parse JSON
            .build()
            .create(WeatherSdkService::class.java) // Create an implementation of the API interface
    }
}
