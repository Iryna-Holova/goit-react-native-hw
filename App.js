import "react-native-gesture-handler";
import { useEffect } from "react";
import { ActivityIndicator, ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import StackNavigation from "./navigation/StackNavigation";
import bg from "./assets/images/background.png";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Regular: require("./assets/fonts/Roboto-Regular.ttf"),
    Medium: require("./assets/fonts/Roboto-Medium.ttf"),
    Bold: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ImageBackground style={{ flex: 1 }} source={bg}>
      <NavigationContainer>
        <StackNavigation />
        <StatusBar style="dark" />
      </NavigationContainer>
    </ImageBackground>
  );
}
