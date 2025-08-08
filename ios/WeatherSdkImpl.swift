import Foundation

@objc(WeatherSdkImpl)
public class WeatherSdkImpl: NSObject {
    
  @objc public func fetchWeatherByCity(_ city: String,
                                       resolver resolve: @escaping RCTPromiseResolveBlock,
                                       rejecter reject: @escaping RCTPromiseRejectBlock) {
    let apiKey = WeatherSdkConfig.OPEN_WEATHER_API_KEY
    guard let encoded = city.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed),
          let url = URL(string: "https://api.openweathermap.org/data/2.5/weather?q=\(encoded)&appid=\(apiKey)&units=metric")
    else {
      return reject("INVALID_CITY", "Invalid city name", nil)
    }

    URLSession.shared.dataTask(with: url) { data, response, err in
      if let err = err {
        return reject("NETWORK_ERROR", err.localizedDescription, err)
      }
      guard let httpResponse = response as? HTTPURLResponse else {
        return reject("NO_RESPONSE", "No response from server", nil)
      }
      guard let data = data else {
        return reject("NO_DATA", "No data received", nil)
      }
      
      // Handle HTTP error codes
      if !(200...299).contains(httpResponse.statusCode) {
        let errorCode: String
        let fallbackMessage: String
        switch httpResponse.statusCode {
          case 401:
            errorCode = "INVALID_API_KEY"
            fallbackMessage = "Invalid API key. Please check your configuration."
          case 404:
            errorCode = "CITY_NOT_FOUND"
            fallbackMessage = "City not found. Please check the city name."
          default:
            errorCode = "API_ERROR"
            fallbackMessage = "Weather service returned an error."
        }
        
        // Try to read API error body if available
        let serverMessage = String(data: data, encoding: .utf8) ?? fallbackMessage
        return reject(errorCode, serverMessage, nil)
      }

      do {
        let resp = try JSONDecoder().decode(WeatherSdkResponse.self, from: data)
        let weather = resp.weather.first
        let result: [String: Any] = [
          "city": resp.name,
          "temperature": resp.main.temp,
          "description": weather?.description ?? "",
          "icon": "https://openweathermap.org/img/wn/\(weather?.icon ?? "01d")@2x.png",
          "humidity": resp.main.humidity,
          "windSpeed": resp.wind.speed
        ]
        resolve(result)
      } catch {
        reject("PARSE_ERROR", error.localizedDescription, error)
      }
    }.resume()
  }
  
  @objc public func fetchWeatherByCoordinates(_ lat: Double,
                                              lon: Double,
                                              resolver resolve: @escaping RCTPromiseResolveBlock,
                                              rejecter reject: @escaping RCTPromiseRejectBlock) {
    let apiKey = WeatherSdkConfig.OPEN_WEATHER_API_KEY
    guard let url = URL(string: "https://api.openweathermap.org/data/2.5/weather?lat=\(lat)&lon=\(lon)&appid=\(apiKey)&units=metric")
    else {
      return reject("INVALID_COORDINATES", "Invalid coordinates", nil)
    }

    URLSession.shared.dataTask(with: url) { data, response, err in
      if let err = err {
        return reject("NETWORK_ERROR", err.localizedDescription, err)
      }
      guard let httpResponse = response as? HTTPURLResponse else {
        return reject("NO_RESPONSE", "No response from server", nil)
      }
      guard let data = data else {
        return reject("NO_DATA", "No data received", nil)
      }

      // Handle HTTP error codes
      if !(200...299).contains(httpResponse.statusCode) {
        let errorCode: String
        let fallbackMessage: String
        switch httpResponse.statusCode {
          case 401:
            errorCode = "INVALID_API_KEY"
            fallbackMessage = "Invalid API key. Please check your configuration."
          case 404:
            errorCode = "LOCATION_NOT_FOUND"
            fallbackMessage = "Weather data for the given coordinates could not be found."
          default:
            errorCode = "API_ERROR"
            fallbackMessage = "Weather service returned an error."
        }
        
        let serverMessage = String(data: data, encoding: .utf8) ?? fallbackMessage
        return reject(errorCode, serverMessage, nil)
      }

      do {
        let resp = try JSONDecoder().decode(WeatherSdkResponse.self, from: data)
        let weather = resp.weather.first
        let result: [String: Any] = [
          "city": resp.name,
          "temperature": resp.main.temp,
          "description": weather?.description ?? "",
          "icon": "https://openweathermap.org/img/wn/\(weather?.icon ?? "01d")@2x.png",
          "humidity": resp.main.humidity,
          "windSpeed": resp.wind.speed
        ]
        resolve(result)
      } catch {
        reject("PARSE_ERROR", error.localizedDescription, error)
      }
    }.resume()
  }
}
