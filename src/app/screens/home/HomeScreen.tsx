import React from 'react';
import { View, ScrollView, RefreshControl, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeHeader } from '../../components/organisms/HomeHeader';

import { useTheme } from '../../contexts/ThemeContext';
import { 
  Bell, 
  Settings, 
  Palette,
  HelpCircle
} from 'lucide-react-native';
import { FeatureModal } from '../../components/molecules/FeatureModal';
import { FEATURES } from '../../constants/featureDescriptions';
import WeatherSearch from '../api/WeatherSearch';

/**
 * QuickAccessCard Component
 * 
 * @description Individual card component for quick access items
 */
interface QuickAccessCardProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  onPress: () => void;
  testID?: string;
}

function QuickAccessCard({ icon: Icon, title, subtitle, onPress, testID }: QuickAccessCardProps) {
  const { accentColor } = useTheme();
  
  return (
    <Pressable 
      onPress={onPress}
      testID={testID}
      className="flex-1 p-4 rounded-2xl shadow-sm bg-gray-800/90"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1 space-y-1">
          <Text className="text-base font-semibold text-gray-100">
            {title}
          </Text>
          <Text className="text-sm text-gray-400">
            {subtitle}
          </Text>
        </View>
        <View className="ml-4 p-3 rounded-xl bg-gray-800">
          <Icon size={24} color={accentColor} strokeWidth={2} />
        </View>
      </View>
    </Pressable>
  );
}

/**
 * HomeScreen Component
 * 
 * @description Main home screen of the application that displays Expo template features
 * @returns {React.ReactElement} Rendered HomeScreen component
 */
export function HomeScreen(): React.ReactElement {
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const { accentColor } = useTheme();
  const [selectedFeature, setSelectedFeature] = React.useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);

  const onRefresh = React.useCallback(async (): Promise<void> => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleQuickAction = (action: string) => {
    setSelectedFeature(action);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedFeature(null);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="flex-1 bg-gray-900">
      <HomeHeader testID="home-header" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1, 
          paddingBottom: 70,  // Agregado espacio en la parte inferior
        }}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            colors={['#ffffff']} 
            tintColor="#ffffff"
          />
        }
      >
        <View className="p-4 bg-gray-900">
          {/* WeatherSearch Component aquí */}
          <WeatherSearch />

          <View className="mt-8 mb-6">
            <Text className="text-2xl font-bold mb-2 text-gray-100">
              Quick Access...
            </Text>
            <Text className="text-sm mb-6 text-gray-400">
              Explore key features and functionalities
            </Text>

            <View className="gap-4">
              <View className="flex-row gap-4">
                <QuickAccessCard
                  icon={Bell}
                  title="Pronóstico por hora"
                  subtitle="Check your alerts"
                  onPress={() => handleQuickAction('notifications')}
                  testID="notifications-quick-access"
                />
                <QuickAccessCard
                  icon={Settings}
                  title="Clima por ubicación"
                  subtitle="App preferences"
                  onPress={() => handleQuickAction('settings')}
                  testID="settings-quick-access"
                />
              </View>

              <View className="flex-row gap-4">
                <QuickAccessCard
                  icon={Settings}
                  title="Calidad Del Aire"
                  subtitle="Customize look"
                  onPress={() => handleQuickAction('theme')}
                  testID="theme-quick-access"
                />
                <QuickAccessCard
                  icon={HelpCircle}
                  title="Help"
                  subtitle="Clima marino"
                  onPress={() => handleQuickAction('help')}
                  testID="help-quick-access"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <FeatureModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        feature={selectedFeature ? FEATURES[selectedFeature] : null}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;

