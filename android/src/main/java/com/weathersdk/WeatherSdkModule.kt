package com.weathersdk

import com.facebook.react.bridge.*
import com.weathersdk.NativeWeatherSdkSpec
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class WeatherSdkModule(reactContext: ReactApplicationContext) : NativeWeatherSdkSpec(reactContext) {

    companion object {
        const val NAME = "WeatherSdk"
    }

    override fun getName() = NAME

    override fun fetchWeatherByCity(city: String, promise: Promise) {
        val call = WeatherSdkApi.retrofitService.getWeatherByCity(city)

        call.enqueue(object : Callback<WeatherSdkResponse> {
            override fun onResponse(call: Call<WeatherSdkResponse>, response: Response<WeatherSdkResponse>) {
                if (response.isSuccessful && response.body() != null) {
                    promise.resolve(mapResponseToWritableMap(response.body()!!))
                } else {
                    val errorCode = when (response.code()) {
                        401 -> "INVALID_API_KEY"
                        404 -> "CITY_NOT_FOUND"
                        else -> "API_ERROR"
                    }
                    val errorMessage = response.errorBody()?.string()
                        ?: when (errorCode) {
                            "INVALID_API_KEY" -> "Invalid API key. Please check your configuration."
                            "CITY_NOT_FOUND" -> "City not found. Please check the city name."
                            else -> "No weather data received from server."
                        }
                    promise.reject(errorCode, errorMessage)
                }
            }

            override fun onFailure(call: Call<WeatherSdkResponse>, t: Throwable) {
                promise.reject("NETWORK_ERROR", t.message ?: "Unable to connect. Please check your internet connection.")
            }
        })
    }

    override fun fetchWeatherByCoordinates(lat: Double, lon: Double, promise: Promise) {
        val call = WeatherSdkApi.retrofitService.getWeatherByCoordinates(lat, lon)

        call.enqueue(object : Callback<WeatherSdkResponse> {
            override fun onResponse(call: Call<WeatherSdkResponse>, response: Response<WeatherSdkResponse>) {
                if (response.isSuccessful && response.body() != null) {
                    promise.resolve(mapResponseToWritableMap(response.body()!!))
                } else {
                    val errorCode = when (response.code()) {
                        401 -> "INVALID_API_KEY"
                        404 -> "LOCATION_NOT_FOUND"
                        else -> "API_ERROR"
                    }
                    val errorMessage = response.errorBody()?.string()
                        ?: when (errorCode) {
                            "INVALID_API_KEY" -> "Invalid API key. Please check your configuration."
                            "LOCATION_NOT_FOUND" -> "Weather data for the given coordinates could not be found."
                            else -> "No weather data received from server."
                        }
                    promise.reject(errorCode, errorMessage)
                }
            }

            override fun onFailure(call: Call<WeatherSdkResponse>, t: Throwable) {
                promise.reject("NETWORK_ERROR", t.message ?: "Unable to connect. Please check your internet connection.")
            }
        })
    }

    private fun mapResponseToWritableMap(response: WeatherSdkResponse): WritableMap {
        val map = Arguments.createMap()
        map.putString("city", response.name)
        map.putDouble("temperature", response.main.temp)
        map.putString("description", response.weather.firstOrNull()?.description ?: "")
        map.putString("icon", "https://openweathermap.org/img/wn/${response.weather.firstOrNull()?.icon}@2x.png")
        map.putInt("humidity", response.main.humidity)
        map.putDouble("windSpeed", response.wind.speed)
        return map
    }
}