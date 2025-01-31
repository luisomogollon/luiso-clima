import React, { useState } from 'react';
import { Image, View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from 'react-native-vector-icons';

interface AvatarProps {
  size?: number;
}

export function Avatar({ size = 80 }: AvatarProps) {
  const [localImage, setLocalImage] = useState<string | null>(null);

  // Solicitar permisos y abrir la cámara para capturar una imagen
  const handleCaptureImage = async () => {
    // Solicitar permiso para la cámara
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Se necesita acceso a la cámara para capturar una imagen.');
      return;
    }

    // Abrir la cámara para capturar una imagen
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true, // Permite recortar la imagen
      aspect: [1, 1], // Relación de aspecto cuadrada
      quality: 1, // Alta calidad
    });

    if (!result.canceled) {
      // Guardar la URI de la imagen capturada como avatar
      setLocalImage(result.assets[0]?.uri || null);
    } else {
      Alert.alert('Cancelado', 'No se capturó ninguna imagen.');
    }
  };

  // Solicitar permisos y abrir la galería para seleccionar una imagen
  const handlePickFromGallery = async () => {
    // Solicitar permiso para la galería
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Se necesita acceso a la galería para seleccionar una imagen.');
      return;
    }

    // Abrir la galería para seleccionar una imagen
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, // Permite recortar la imagen
      aspect: [1, 1], // Relación de aspecto cuadrada
      quality: 1, // Alta calidad
    });

    if (!result.canceled) {
      // Guardar la URI de la imagen seleccionada como avatar
      setLocalImage(result.assets[0]?.uri || null);
    } else {
      Alert.alert('Cancelado', 'No se seleccionó ninguna imagen.');
    }
  };

  const placeholderImageUrl = localImage
    ? localImage
    : `https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff&size=256`;

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <View
        style={[
          styles.avatarContainer,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      >
        <Image
          source={{ uri: placeholderImageUrl }}
          style={{ width: '100%', height: '100%', borderRadius: size / 2 }}
          resizeMode="cover"
        />
      </View>

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={handleCaptureImage}
        >
          <Ionicons name="camera" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.galleryButton}
          onPress={handlePickFromGallery}
        >
          <Ionicons name="image" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  avatarContainer: {
    overflow: 'hidden',
    backgroundColor: '#2d3748', // Color de fondo oscuro
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cameraButton: {
    backgroundColor: '#1e3a8a', // Azul oscuro
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
    flex: 1,
  },
  galleryButton: {
    backgroundColor: '#4b5563', // Gris oscuro
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
});

export default Avatar;
