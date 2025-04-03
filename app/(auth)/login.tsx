import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { login } from "../../services/auth";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    try {
      setIsLoading(true);
      const response = await login(username, password);

      // Stocker le token et les informations de l'utilisateur via le contexte
      await signIn(response.token, response.employee);

      // La redirection sera gérée automatiquement par le contexte
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Erreur", error.message);
      } else {
        Alert.alert("Erreur", "Une erreur est survenue lors de la connexion");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
          <View className="px-6 pt-10 flex-1">
            {/* Logo et en-tête */}
            <View className="items-center mb-8">
              <Image
                source={require("../../assets/images/splash-icon.png")}
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
              />
              <Text className="text-2xl font-bold mt-4 text-blue-500">
                Connexion
              </Text>
              <Text className="text-gray-500 dark:text-gray-400 text-center mt-2">
                Connectez-vous pour accéder à vos interventions
              </Text>
            </View>

            {/* Formulaire */}
            <View className="mt-4">
              {/* Nom d'utilisateur */}
              <View className="mb-4">
                <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Nom d'utilisateur
                </Text>
                <View className="flex-row items-center border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 bg-white dark:bg-gray-800">
                  <FontAwesome name="user" size={18} color="#9ca3af" />
                  <TextInput
                    className="flex-1 ml-3 text-gray-900 dark:text-white"
                    placeholder="Votre nom d'utilisateur"
                    placeholderTextColor="#9ca3af"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Mot de passe */}
              <View className="mb-6">
                <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Mot de passe
                </Text>
                <View className="flex-row items-center border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 bg-white dark:bg-gray-800">
                  <FontAwesome name="lock" size={18} color="#9ca3af" />
                  <TextInput
                    className="flex-1 ml-3 text-gray-900 dark:text-white"
                    placeholder="Votre mot de passe"
                    placeholderTextColor="#9ca3af"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesome
                      name={showPassword ? "eye-slash" : "eye"}
                      size={18}
                      color="#9ca3af"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Mot de passe oublié */}
              <TouchableOpacity className="items-end mb-6">
                <Text className="text-blue-500 dark:text-blue-400">
                  Mot de passe oublié ?
                </Text>
              </TouchableOpacity>

              {/* Bouton de connexion */}
              <TouchableOpacity
                className={`bg-blue-500 py-4 rounded-lg items-center ${
                  isLoading ? "opacity-50" : ""
                }`}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text className="text-white font-bold text-lg">
                  {isLoading ? "Connexion..." : "Connexion"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Lien vers inscription */}
            <View className="flex-row justify-center mt-8">
              <Text className="text-gray-600 dark:text-gray-400">
                Pas encore de compte ?{" "}
              </Text>
              <Link href="/(auth)/signup" asChild>
                <TouchableOpacity>
                  <Text className="text-blue-500 dark:text-blue-400 font-medium">
                    S'inscrire
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
