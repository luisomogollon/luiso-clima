import React, { useState, useEffect } from 'react';
import { Camera, useCameraPermissions, CameraView } from 'expo-camera';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importar el icono
import { useNavigation } from '@react-navigation/native'; // Importar la navegación

type Prop = {
  type: string;
  data: string;
};

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation(); // Para navegación

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        alert('Lo sentimos, necesitamos permiso para usar la cámara para que esto funcione.');
      }
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: Prop) => {
    setScanned(true);
    Alert.alert(
      `Código ${type} Escaneado`,
      `Datos: ${data}`,
      [
        {
          text: 'Aceptar',
          onPress: () => setScanned(false),
        }
      ],
      { cancelable: false }
    );
  };

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Permiso de cámara no concedido.</Text>
        <Button title="Solicitar Permiso" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <CameraView
      style={styles.camera}
      onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
    >
      <View style={styles.layerContainer}>
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} />
      </View>

      {/* Icono de X para volver al HomeScreen */}
      <Ionicons
        name="close-circle" // Icono de X
        size={34}
        color="gray"
        style={styles.closeIcon}
        onPress={() => navigation.goBack()} // Navegar al HomeScreen
      />
    </CameraView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  permissionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  layerContainer: {
    flex: 1,
  },
  layerTop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  layerCenter: {
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  focused: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#00FF00',
  },
  layerRight: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  layerBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
});
