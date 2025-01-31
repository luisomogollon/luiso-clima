import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "react-native-vector-icons";

const WeatherSearch = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapRegion, setMapRegion] = useState(null); // Para las coordenadas del mapa

  const apiKey = "e15e112d162043c23eefe4a577f8e027";

  const getWeatherByCity = async () => {
    if (!city) return;

    setLoading(true);
    setError(null);
    setWeatherData(null);
    setForecastData([]);
    setMapRegion(null); // Limpiar el mapa

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      getWeatherForecast(response.data.coord.lat, response.data.coord.lon);
      setMapRegion({
        latitude: response.data.coord.lat,
        longitude: response.data.coord.lon,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (err) {
      setError("No se pudo obtener los datos del clima");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherForecast = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&cnt=3`
      );
      setForecastData(response.data.list);
    } catch (err) {
      setError("No se pudo obtener el pronóstico del clima.");
    }
  };

  const getWeatherByCoords = async (latitude, longitude) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    setForecastData([]);
    setMapRegion(null); // Limpiar el mapa

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      getWeatherForecast(response.data.coord.lat, response.data.coord.lon);
      setMapRegion({
        latitude: response.data.coord.lat,
        longitude: response.data.coord.lon,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (err) {
      setError("No se pudo obtener el clima en tu ubicación.");
    } finally {
      setLoading(false);
    }
  };

  const getLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permiso de ubicación denegado");
        setLoading(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      getWeatherByCoords(location.coords.latitude, location.coords.longitude);
    } catch (err) {
      setError("Error al obtener la ubicación");
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View className="flex-1 justify-center items-center p-1 bg-gray-900">
      <TextInput
        className="w-full h-15 border border-gray-300 bg-white p-2 mb-4 rounded-lg text-lg focus:outline-none focus:border-blue-500"
        placeholder="Nombre de la Ciudad"
        value={city}
        onChangeText={setCity}
      />
      <View className="flex-row">
        <TouchableOpacity
          className="bg-blue-900 p-2 rounded  flex-1 items-center mr-4"
          onPress={getWeatherByCity}
        >
          <Text className="text-white rounded shadow font-semibold">
            Buscar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-blue-400  p-2 rounded  flex-1 justify-center items-center"
          onPress={getLocation}
        >
          <Ionicons name="location-sharp" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {loading && (
        <ActivityIndicator size="large" color="#0000ff" className="mt-4" />
      )}
      {error && (
        <Text className="text-red-500 mt-2 font-semibold">{error}</Text>
      )}

      {weatherData && (
        <View className="mt-5 bg-gray-800 rounded-lg shadow-lg p-4 w-full items-center">
          <Text className="mt-4 pt-2 text-lg text-gray-200">
            {new Date(weatherData.dt * 1000).toLocaleString("es-ES", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </Text>
          <Text className="text-3xl font-bold text-gray-200">
            {weatherData.name}, {weatherData.sys.country}
          </Text>
          <Image
            source={{
              uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
            }}
            className="w-24 shadow h-24 mt-4 rounded-full border-2 border-blue-900"
          />
          <Text className="mt-4 text-xl text-gray-200">
            Temperatura: {weatherData.main.temp}°C
          </Text>
          <Text className="mt-2 text-lg text-gray-200">
            Condición: {weatherData.weather[0].description}
          </Text>
          <Text className="mt-2 text-lg text-gray-500">
            Humedad: {weatherData.main.humidity}%
          </Text>
          <Text className="mt-2 text-lg text-gray-500">
            Viento: {weatherData.wind.speed} m/s
          </Text>
        </View>
      )}

      {forecastData.length > 0 && (
        <View className="mt-6 w-full">
          <Text className="text-2xl font-semibold text-white">Pronóstico</Text>

          <View className=" flex justify-center items-center">
            {forecastData.map((forecast, index) => (
              <View
                key={index}
                className="bg-gray-800 rounded-lg shadow-lg p-2 w-full my-2 flex flex-row items-center"
              >
                {/* Icono y texto en fila */}
                <Image
                  source={{
                    uri: `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`,
                  }}
                  className="w-16 flex mr-2 h-16"
                />
                <View>
                  <Text className="text-lg text-gray-200">
                    {new Date(forecast.dt * 1000).toLocaleString("es-ES", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                    })}
                  </Text>
                  <Text className="text-lg text-gray-100">
                    {forecast.main.temp}°C
                  </Text>
                  <Text className="text-sm text-gray-400">
                    {forecast.weather[0].description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {mapRegion && (
        <MapView
          style={{ width: "100%", height: 150, marginTop: 20 }}
          region={mapRegion}
        >
          <Marker coordinate={mapRegion} />
        </MapView>
      )}
    </View>
  );
};

export default WeatherSearch;
