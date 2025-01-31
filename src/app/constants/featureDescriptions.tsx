// Definir el objeto FEATURES con un array vacío en `details` para las notificaciones
export const FEATURES = {
  notifications: {
    title: 'Pronóstico por hora',
    description: 'Configure push notifications and daily reminders to stay updated with important information.',
    details: [] // Inicializamos el array vacío para las notificaciones
  },
  settings: {
    title: 'Settings',
    description: 'Access app settings and debug tools to customize your experience.',
    details: [
      {
        title: 'App Configuration',
        content: 'Manage core app settings including notifications, theme preferences, and debug options.'
      },
      {
        title: 'Debug Menu',
        content: 'Access developer tools and debug features to test app functionality and storage.'
      },
      {
        title: 'Storage Management',
        content: 'View and manage app storage through the debug menu when enabled.'
      }
    ]
  },
  theme: {
    title: 'Theme',
    description: 'Customize the app\'s appearance with dark mode and custom color palettes.',
    details: [
      {
        title: 'Dark Mode',
        content: 'Toggle between light and dark themes to match your preference and reduce eye strain.'
      },
      {
        title: 'Color Palette',
        content: 'Choose from pre-defined accent colors or create your own custom colors to personalize the app\'s appearance.'
      },
      {
        title: 'Custom Colors',
        content: 'Add your own hex color codes to create a unique color palette that matches your style.'
      }
    ]
  },
  help: {
    title: 'Help & Support',
    description: 'Find help resources and access app documentation.',
    details: [
      {
        title: 'App Documentation',
        content: 'Access guides and documentation about app features, including theme customization and notification settings.'
      },
      {
        title: 'Settings Guide',
        content: 'Learn how to configure app settings, manage notifications, and customize themes.'
      },
      {
        title: 'Debug Support',
        content: 'Access debug tools and storage information when troubleshooting is needed.'
      }
    ]
  }
};

// API Key y ciudad
const API_KEY = 'e15e112d162043c23eefe4a577f8e027';
const CITY = 'New York'; // Cambia esto por la ciudad que desees
const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&cnt=48&appid=${API_KEY}`;

// Función para obtener el pronóstico por hora
async function fetchWeatherData() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    const hourlyForecast = data.list;

    // Limpiar los detalles previos de las notificaciones
    FEATURES.notifications.details = [];

    // Iterar sobre las primeras 5 horas del pronóstico (por ejemplo)
    hourlyForecast.slice(0, 5).forEach(forecast => {
      const time = new Date(forecast.dt * 1000).toLocaleTimeString();  // Hora legible
      const temperature = forecast.main.temp;  // Temperatura
      const description = forecast.weather[0].description;  // Descripción del clima
      const humidity = forecast.main.humidity;  // Humedad
      const windSpeed = forecast.wind.speed;  // Velocidad del viento

      // Actualizar el objeto FEATURES con cada hora
      FEATURES.notifications.details.push({
        title: `Pronóstico a las ${time}`,
        content: `A las ${time}, la temperatura será de ${temperature}°C con condiciones de ${description}. Humedad: ${humidity}% y viento a ${windSpeed} m/s.`
      });
    });

    // Mostrar el resultado en la consola
    console.log(FEATURES.notifications.details);

  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Llamar a la función para actualizar el pronóstico
fetchWeatherData();

// Exportar FEATURES con las notificaciones actualizadas
export default FEATURES;

