import React, { useState } from "react";
import {
  ScrollView,
  Alert,
  Share,
  TouchableOpacity,
  Text,
  Modal,
  View,
  TextInput,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProfileHeader } from "../../components/organisms/ProfileHeader";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native"; // Importa useNavigation
import Icon from "react-native-vector-icons/MaterialIcons"; // Importa el icono

/**
 * ProfileScreen Component
 *
 * @description Profile screen that displays user information and actions
 * @returns {React.ReactElement} Profile screen component
 */
export function ProfileScreen(): React.ReactElement {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation(); // Obtén el hook de navegación

  // Estado para el modal y los datos del formulario
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("John Doe");
  const [title, setTitle] = useState("Software Developer");
  const [bio, setBio] = useState(
    "Passionate about building great mobile apps with React Native. Love to explore new technologies and share knowledge with the community."
  );

  const handleEdit = () => {
    setIsModalVisible(true); // Muestra el modal al hacer clic en "Editar"
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: "Check out my profile!",
        title: "Share Profile",
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share profile");
    }
  };

  const handleGoHome = () => {
    navigation.goBack();
  };

  const handleSaveChanges = () => {
    // Aquí puedes agregar la lógica para guardar los cambios (por ejemplo, enviar a un servidor)
    setIsModalVisible(false); // Cierra el modal después de guardar
    Alert.alert("Profile Updated", "Your profile has been updated.");
  };

  return (
    <SafeAreaView
      className={`flex-1 bg-gray-900`}
    >
      <ScrollView className="flex-1">
        <TouchableOpacity
          onPress={handleGoHome}
          style={{
            position: "absolute",
            top: 20,
            right: 10,
            zIndex: 1,
            flexDirection: "row",
            alignItems: "center",
            padding: 5,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 15,
              marginRight: 12,
            }}
          >
            Go back
          </Text>
        </TouchableOpacity>

        <ProfileHeader
          name={name}
          title={title}
          bio={bio}
          onEdit={handleEdit}
          onShare={handleShare}
          testID="profile-header"
        />
      </ScrollView>

      {/* Modal para editar el perfil */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              width: 300,
              padding: 20,
              backgroundColor: "#0f172a",
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "white",
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Nombre
            </Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Name"
              style={{
                height: 40,
                borderColor: "white",
                color: "white",
                borderWidth: 1,
                marginBottom: 10,
                paddingLeft: 8,
              }}
            />
            <Text
              style={{
                fontSize: 14,
                color: "white",
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Titulo
            </Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Title"
              style={{
                height: 40,
                color: "white",
                borderColor: "white",
                borderWidth: 1,
                marginBottom: 10,
                paddingLeft: 8,
              }}
            />
            <Text
              style={{
                fontSize: 14,
                color: "white",
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Biografia
            </Text>
            <TextInput
              value={bio}
              onChangeText={setBio}
              placeholder="Bio"
              style={{
                height: 100,
                borderColor: "white",
                borderWidth: 1,
                marginBottom: 20,
                paddingLeft: 8,
                textAlignVertical: "top",
                color: "white", // Cambia el color del texto a blanco
              }}
              multiline
            />

            <Button
              title="Save Changes"
              onPress={handleSaveChanges}
              color="#1e3a8a"  // Azul oscuro
            />

            <Button
              title="Cancel"
              onPress={() => setIsModalVisible(false)}
              color="gray"
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default ProfileScreen;
