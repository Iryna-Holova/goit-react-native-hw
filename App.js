import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import RegistrationScreen from "./src/screens/RegistrationScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    Regular: require("./assets/fonts/Roboto-Regular.ttf"),
    Medium: require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <RegistrationScreen />;
}
