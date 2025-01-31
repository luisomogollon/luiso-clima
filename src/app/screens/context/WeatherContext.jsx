import React, { createContext, useState } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);

  return (
    <WeatherContext.Provider
      value={{ weatherData, setWeatherData, airQualityData, setAirQualityData }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
