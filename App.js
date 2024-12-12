import "react-native-gesture-handler";
import { useEffect } from "react";
import { ActivityIndicator, ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { colors } from "./styles/global";
import { headerStyles } from "./styles/header";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import HomeScreen from "./screens/HomeScreen";
import CreatePostsScreen from "./screens/CreatePostsScreen";
import CommentsScreen from "./screens/CommentsScreen";
import MapScreen from "./screens/MapScreen";
import BackButton from "./components/BackButton";
import bg from "./assets/images/background.png";

SplashScreen.preventAutoHideAsync();
const MainStack = createStackNavigator();

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
        <MainStack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "transparent" },
            ...headerStyles,
          }}
        >
          <MainStack.Screen name="Login" component={LoginScreen} />
          <MainStack.Screen
            name="Registration"
            component={RegistrationScreen}
          />
          <MainStack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              gestureEnabled: false,
              presentation: "card",
            }}
          />
          <MainStack.Screen
            name="Create"
            component={CreatePostsScreen}
            options={{
              cardStyle: { backgroundColor: colors.white },
              headerShown: true,
              headerTitle: "Створити публікацію",
              headerLeft: () => <BackButton />,
              presentation: "modal",
              animation: "slide_from_right",
            }}
          />
          <MainStack.Screen
            name="Comments"
            component={CommentsScreen}
            options={{
              cardStyle: { backgroundColor: colors.white },
              headerShown: true,
              headerTitle: "Коментарі",
              headerLeft: () => <BackButton />,
              presentation: "modal",
              animation: "slide_from_right",
            }}
          />
          <MainStack.Screen
            name="Map"
            component={MapScreen}
            options={{
              cardStyle: { backgroundColor: colors.white },
              headerShown: true,
              headerTitle: "Карта",
              headerLeft: () => <BackButton />,
              presentation: "modal",
              animation: "slide_from_right",
            }}
          />
        </MainStack.Navigator>
        <StatusBar style="dark" />
      </NavigationContainer>
    </ImageBackground>
  );
}
