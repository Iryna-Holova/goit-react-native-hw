import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { colors } from "../styles/global";
import { headerStyles } from "../styles/header";
import PostsScreen from "../screens/PostsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CustomTabBar from "../components/TabBar";
import LogOutButton from "../components/LogOutButton";

const Tabs = createBottomTabNavigator();

export default TabNavigation = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      tabBar={CustomTabBar}
      screenOptions={{
        ...headerStyles,
      }}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          sceneStyle: { backgroundColor: colors.white },
          headerTitle: "Публікації",
          headerRight: () => <LogOutButton />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        title="Профіль"
        component={ProfileScreen}
        options={{
          headerShown: false,
          sceneStyle: { backgroundColor: "transparent", opacity: 1 },
          headerTitle: "Natali Romanova",
          headerTransparent: true,
          headerRight: () => <LogOutButton />,
        }}
      />
    </Tabs.Navigator>
  );
};
