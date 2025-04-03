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
  ScrollView,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignup = () => {
    // Ici vous intégrerez votre logique d'inscription
    // Pour l'instant, on simule une inscription réussie
    router.replace("/(auth)/login");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <SafeAreaView className="flex-1 bg-white">
          <ScrollView className="flex-1 px-6 pt-10">
            {/* Logo et en-tête */}
            <View className="items-center mb-8">
              <Image
                source={require("../../assets/images/splash-icon.png")}
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
              />
              <Text className="text-2xl font-bold mt-4 text-blue-500">
                Créer un compte
              </Text>
              <Text className="text-gray-500 text-center mt-2">
                Inscrivez-vous pour commencer à gérer vos interventions
              </Text>
            </View>

            {/* Formulaire */}
            <View className="mt-4">
              {/* Nom et prénom */}
              <View className="mb-4">
                <Text className="text-gray-700 mb-2 font-medium">
                  Nom et prénom
                </Text>
                <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3">
                  <FontAwesome name="user" size={18} color="#9ca3af" />
                  <TextInput
                    className="flex-1 ml-3"
                    placeholder="Votre nom complet"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              {/* Email */}
              <View className="mb-4">
                <Text className="text-gray-700 mb-2 font-medium">Email</Text>
                <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3">
                  <FontAwesome name="envelope-o" size={18} color="#9ca3af" />
                  <TextInput
                    className="flex-1 ml-3"
                    placeholder="Votre email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Mot de passe */}
              <View className="mb-4">
                <Text className="text-gray-700 mb-2 font-medium">
                  Mot de passe
                </Text>
                <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3">
                  <FontAwesome name="lock" size={18} color="#9ca3af" />
                  <TextInput
                    className="flex-1 ml-3"
                    placeholder="Votre mot de passe"
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

              {/* Confirmer mot de passe */}
              <View className="mb-6">
                <Text className="text-gray-700 mb-2 font-medium">
                  Confirmer le mot de passe
                </Text>
                <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3">
                  <FontAwesome name="lock" size={18} color="#9ca3af" />
                  <TextInput
                    className="flex-1 ml-3"
                    placeholder="Confirmer votre mot de passe"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Bouton d'inscription */}
              <TouchableOpacity
                className="bg-blue-500 py-4 rounded-lg items-center mb-4"
                onPress={handleSignup}
              >
                <Text className="text-white font-bold text-lg">S'inscrire</Text>
              </TouchableOpacity>
            </View>

            {/* Lien vers connexion */}
            <View className="flex-row justify-center my-8">
              <Text className="text-gray-600">Déjà un compte ? </Text>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <Text className="text-blue-500 font-medium">
                    Se connecter
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Signup;
