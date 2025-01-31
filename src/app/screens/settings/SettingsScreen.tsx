import React, { useCallback, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useNotifications } from '../../hooks/useNotifications';
import { useTheme } from '../../contexts/ThemeContext';
import { SectionTitle } from '../../components/atoms/SectionTitle';
import { NotificationsSection } from '../../components/organisms/NotificationsSection';
import { BottomMenuSection } from '../../components/organisms/BottomMenuSection';
import { ThemeSettingsSection } from '../../components/organisms/ThemeSettingsSection';
import { DebugStorageSection } from '../../components/primitives/debug/DebugStorageSection';
import { useNavigation } from '@react-navigation/native'; // Para navegación

type SettingsScreenRouteProp = RouteProp<{
  params: { 
    bottomMenuEnabled?: boolean; 
    onBottomMenuToggle?: (value: boolean) => void;
  }
}, 'params'>;

export function SettingsScreen() {
  const route = useRoute<SettingsScreenRouteProp>();
  const [bottomMenuEnabled, setBottomMenuEnabled] = useState(route.params?.bottomMenuEnabled || false);
  
  const { 
    pushEnabled, 
    reminderEnabled, 
    handlePushToggle, 
    setReminderEnabled,
    configureNotifications
  } = useNotifications();

  // Force dark mode
  const isDarkMode = true; // Set dark mode to always be true

  const navigation = useNavigation(); // Para navegación

  const onBottomMenuToggle = route.params?.onBottomMenuToggle || (() => {});

  const handleBottomMenuToggle = useCallback((value: boolean) => {
    setBottomMenuEnabled(value);
    onBottomMenuToggle(value);
  }, [onBottomMenuToggle]);

  const getSectionClassName = (isDark: boolean) => `rounded-xl shadow-sm border overflow-visible 
    ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} 
    mt-4 max-w-md w-full mx-auto`;

  const handleGoBack = () => {
    navigation.goBack(); // Vuelve a la pantalla anterior
  };

  return (
    <ScrollView contentContainerStyle={{
      flexGrow: 1, 
      paddingBottom: 90,  // Agregado espacio en la parte inferior
    }} 
      className="flex-1 bg-gray-900" // Dark mode background
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 min-h-screen justify-center p-4 space-y-6">
        {!bottomMenuEnabled && (
          <>
            <View className={getSectionClassName(isDarkMode)}>
              <View className="px-4 py-3 flex-row justify-between items-center">
                <SectionTitle>Notifications</SectionTitle>
                <TouchableOpacity onPress={handleGoBack}>
                  <Text style={{ color: isDarkMode ? 'white' : 'black', fontSize: 14 }}>
                    Go Back
                  </Text>
                </TouchableOpacity>
              </View>
              <NotificationsSection
                pushEnabled={pushEnabled}
                onPushChange={handlePushToggle}
                reminderEnabled={reminderEnabled}
                onReminderChange={setReminderEnabled}
                configureNotifications={configureNotifications}
              />
            </View>

            <View className={getSectionClassName(isDarkMode)}>
              <View className="px-4 py-3">
                <SectionTitle>Theme Settings</SectionTitle>
              </View>
              <ThemeSettingsSection />
            </View>
          </>
        )}

        <View className={`${getSectionClassName(isDarkMode)} mb-10`}>
          <View className="px-4 py-3">
            <SectionTitle>Debug Menu</SectionTitle>
          </View>
          <BottomMenuSection
            bottomMenuEnabled={bottomMenuEnabled}
            onBottomMenuChange={handleBottomMenuToggle}
          />
        </View>

        {bottomMenuEnabled && (
          <View className={getSectionClassName(isDarkMode)}>
            <View className="px-4 py-3">
              <SectionTitle>Debug: AsyncStorage</SectionTitle>
            </View>
            <DebugStorageSection />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default SettingsScreen;
