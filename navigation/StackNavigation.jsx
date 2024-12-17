import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import { colors } from "../styles/global";
import { headerStyles } from "../styles/header";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import TabNavigation from "./TabNavigation";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import CommentsScreen from "../screens/CommentsScreen";
import MapScreen from "../screens/MapScreen";
import CameraScreen from "../screens/CameraScreen";
import BackButton from "../components/BackButton";

const MainStack = createStackNavigator();

export default StackNavigation = () => {
  const isAuth = useSelector((state) => state.user.isAuth);

  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "transparent" },
        ...headerStyles,
      }}
    >
      {!isAuth ? (
        <>
          <MainStack.Screen name="Login" component={LoginScreen} />
          <MainStack.Screen
            name="Registration"
            component={RegistrationScreen}
          />
        </>
      ) : (
        <>
          <MainStack.Screen
            name="Home"
            component={TabNavigation}
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
        </>
      )}
      <MainStack.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "Камера",
          headerTitleStyle: { color: colors.white },
          headerStyle: {
            backgroundColor: colors.gray_transparent,
            borderBottomWidth: 0,
          },
          headerLeft: () => <BackButton dark />,
          presentation: "modal",
          animation: "slide_from_right",
        }}
      />
    </MainStack.Navigator>
  );
};
