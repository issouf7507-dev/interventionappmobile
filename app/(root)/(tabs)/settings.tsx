import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "../../../contexts/AuthContext";

const Settings = () => {
  const { employee, signOut } = useAuth();

  const handleLogout = async () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Déconnexion",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut();
          } catch (error) {
            Alert.alert(
              "Erreur",
              "Une erreur est survenue lors de la déconnexion"
            );
          }
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <View className="p-4">
        {/* En-tête avec les informations de l'utilisateur */}
        <View className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full items-center justify-center">
              <FontAwesome name="user" size={24} color="#3b82f6" />
            </View>
            <View className="ml-4">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                {employee?.firstName} {employee?.lastName}
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                {employee?.email}
              </Text>
            </View>
          </View>
        </View>

        {/* Section Paramètres */}
        <View className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            Paramètres
          </Text>

          {/* Notifications */}
          <TouchableOpacity className="flex-row items-center px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <FontAwesome name="bell" size={20} color="#6b7280" />
            <Text className="ml-3 text-gray-700 dark:text-gray-300">
              Notifications
            </Text>
            <View className="ml-auto">
              <FontAwesome name="chevron-right" size={14} color="#9ca3af" />
            </View>
          </TouchableOpacity>

          {/* Thème */}
          <TouchableOpacity className="flex-row items-center px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <FontAwesome name="moon-o" size={20} color="#6b7280" />
            <Text className="ml-3 text-gray-700 dark:text-gray-300">
              Thème sombre
            </Text>
            <View className="ml-auto">
              <FontAwesome name="chevron-right" size={14} color="#9ca3af" />
            </View>
          </TouchableOpacity>

          {/* Langue */}
          <TouchableOpacity className="flex-row items-center px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <FontAwesome name="language" size={20} color="#6b7280" />
            <Text className="ml-3 text-gray-700 dark:text-gray-300">
              Langue
            </Text>
            <View className="ml-auto">
              <FontAwesome name="chevron-right" size={14} color="#9ca3af" />
            </View>
          </TouchableOpacity>

          {/* À propos */}
          <TouchableOpacity className="flex-row items-center px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <FontAwesome name="info-circle" size={20} color="#6b7280" />
            <Text className="ml-3 text-gray-700 dark:text-gray-300">
              À propos
            </Text>
            <View className="ml-auto">
              <FontAwesome name="chevron-right" size={14} color="#9ca3af" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Bouton de déconnexion */}
        <TouchableOpacity
          className="mt-6 bg-red-50 dark:bg-red-900/20 rounded-lg p-4 flex-row items-center justify-center"
          onPress={handleLogout}
        >
          <FontAwesome name="sign-out" size={20} color="#ef4444" />
          <Text className="ml-2 text-red-600 dark:text-red-400 font-medium">
            Se déconnecter
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
