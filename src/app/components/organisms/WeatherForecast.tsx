import React from "react";
import { View, Text, Image } from "react-native";

const WeatherForecast = ({ forecastData }) => {
  return (
    <View className="mt-5 bg-gray-800 rounded-lg shadow-lg p-4 w-4/5 items-center">
      {forecastData.map((day, index) => (
        <View key={index} className="mb-3">
          <Text className="text-xl text-gray-200">
            {new Date(day.dt * 1000).toLocaleDateString("es-ES", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </Text>
          <Image
            source={{
              uri: `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`,
            }}
            className="w-24 h-24 mt-4 rounded-full"
          />
          <Text className="mt-2 text-lg text-gray-200">
            Temp: {day.temp.day}°C
          </Text>
          <Text className="mt-1 text-lg text-gray-200">
            {day.weather[0].description}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default WeatherForecast;
