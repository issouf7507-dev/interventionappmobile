import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

const Home = () => {
  useEffect(() => {
    // Masquer l'écran de démarrage après un délai pour garantir que l'utilisateur le voit
    const hideSplash = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync();
    };

    hideSplash();
  }, []);

  return <Redirect href="/(auth)/welcome" />;
};

export default Home;

const styles = StyleSheet.create({});
// tec
