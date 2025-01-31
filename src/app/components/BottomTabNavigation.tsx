import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeIcon,
  UserIcon,
  SettingsIcon,
  CameraIcon,
  QrCodeIcon,
} from "lucide-react-native"; // Agregar ícono de QR
import { HomeScreen } from "../screens/home/HomeScreen";
import { SettingsScreen } from "../screens/settings/SettingsScreen";
import { ProfileScreen } from "../screens/profile/ProfileScreen";
import { useTheme } from "../contexts/ThemeContext";
import QrScreen from "../screens/qr/QrScreen";

type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: {
    bottomMenuEnabled?: boolean;
    onBottomMenuToggle?: (value: boolean) => void;
  };
  Camera: undefined;
  QR: undefined;
  Clima: undefined; // Añadir Clima como nueva pantalla
};

interface BottomTabNavigationProps {
  bottomMenuEnabled: boolean;
  onBottomMenuToggle: (value: boolean) => void;
}

export function BottomTabNavigation({
  bottomMenuEnabled,
  onBottomMenuToggle,
}: BottomTabNavigationProps) {
  const Tab = createBottomTabNavigator<BottomTabParamList>();
  const { isDarkMode, accentColor } = useTheme();

  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case "Home":
              return <HomeIcon color={color} size={size} />;
            case "Profile":
              return <UserIcon color={color} size={size} />;
            case "Settings":
              return <SettingsIcon color={color} size={size} />;
            case "Camera":
              return <CameraIcon color={color} size={size} />;
            case "QR":
              return <QrCodeIcon color={color} size={size} />;
            default:
              return null;
          }
        },
        tabBarActiveTintColor: accentColor,
        tabBarInactiveTintColor: "#9CA3AF", // Solo para el modo oscuro
        tabBarStyle: {
          backgroundColor: "#1F2937", // Solo para el modo oscuro
          borderTopWidth: 1,
          borderTopColor: "#374151", // Solo para el modo oscuro
          height: 90,
          paddingBottom: 10,
          paddingTop: 10,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          color: "#D1D5DB", // Solo para el modo oscuro
        },
        animationEnabled: true, // Habilitar animaciones
        animationTypeForReplace: "push", // Tipo de animación al reemplazar una pantalla
        gestureEnabled: true, // Habilitar gestos para navegar
        gestureDirection: "horizontal", // Dirección de los gestos
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        initialParams={{
          bottomMenuEnabled,
          onBottomMenuToggle,
        }}
        options={{
          title: "Settings",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="QR"
        component={QrScreen}
        options={{
          title: "QR",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
