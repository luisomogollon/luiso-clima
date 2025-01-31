import React from 'react';
import "../global.css";
import { Slot } from "expo-router";
import { NetworkProvider } from '../app/contexts/NetworkContext';
import { ThemeProvider } from '../app/contexts/ThemeContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';  // Importa GestureHandlerRootView

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>  {/* Envuelve todo con GestureHandlerRootView */}
      <NetworkProvider>
        <ThemeProvider>
          <Slot />
        </ThemeProvider>
      </NetworkProvider>
    </GestureHandlerRootView>
  );
}
