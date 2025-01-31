import axios from 'axios';

// Configuración de la URL base y la clave API
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = 'e15e112d162043c23eefe4a577f8e027';  // Reemplaza esto con tu clave API real

// Función para obtener el clima de una ciudad
export const getWeatherByCity = async (city) => {
  try {
    // Haciendo la solicitud para obtener el clima de la ciudad
    const response = await axios.get(`${BASE_URL}weather`, {
      params: {
        q: city,  // Ciudad a consultar
        appid: API_KEY,  // Tu clave API
        units: 'metric',  // Para obtener la temperatura en grados Celsius
        lang: 'es',  // Para obtener la respuesta en español
      },
    });

    return response.data; // Retorna los datos del clima obtenidos
  } catch (error) {
    console.error('Error al obtener el clima:', error);
    throw error; // Lanza un error si la solicitud falla
  }
};
