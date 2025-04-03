import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const Welcome = () => {
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
      }}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1 bg-black bg-opacity-50">
        <SafeAreaView className="flex-1">
          <View className="flex-1 px-6 justify-between py-10">
            {/* Logo et en-tête */}
            <View className="items-center mt-10">
              <Image
                source={require("../../assets/images/splash-icon.png")}
                style={{ width: 120, height: 120 }}
                resizeMode="contain"
              />
              <Text className="text-3xl font-bold mt-4 text-white">
                GD Tech
              </Text>
              <Text className="text-white text-center mt-2 text-lg">
                Gestion des interventions techniques
              </Text>
            </View>

            {/* Description */}
            <View className="items-center mb-8">
              <Text className="text-white text-center mb-8 text-lg">
                Gérez vos interventions, suivez vos techniciens et optimisez
                votre efficacité sur le terrain.
              </Text>

              {/* Points clés */}
              <View className="w-full mb-8">
                <View className="flex-row items-center mb-4">
                  <View className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center mr-3">
                    <FontAwesome
                      name="calendar-check-o"
                      size={20}
                      color="white"
                    />
                  </View>
                  <Text className="text-white flex-1">
                    Planifiez vos interventions efficacement
                  </Text>
                </View>

                <View className="flex-row items-center mb-4">
                  <View className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center mr-3">
                    <FontAwesome name="map-marker" size={20} color="white" />
                  </View>
                  <Text className="text-white flex-1">
                    Suivez vos techniciens en temps réel
                  </Text>
                </View>

                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center mr-3">
                    <FontAwesome name="file-text-o" size={20} color="white" />
                  </View>
                  <Text className="text-white flex-1">
                    Rapports d'intervention instantanés
                  </Text>
                </View>
              </View>
            </View>

            {/* Boutons */}
            <View className="mb-10">
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity className="bg-blue-500 py-4 rounded-lg items-center mb-4">
                  <Text className="text-white font-bold text-lg">
                    Connexion
                  </Text>
                </TouchableOpacity>
              </Link>

              <Link href="/(auth)/signup" asChild>
                <TouchableOpacity className="border border-white py-4 rounded-lg items-center">
                  <Text className="text-white font-bold text-lg">
                    Créer un compte
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
