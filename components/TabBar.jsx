import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import { colors } from "../styles/global";
import PostsIcon from "../assets/icons/grid.svg";
import ProfileIcon from "../assets/icons/user.svg";
import AddIcon from "../assets/icons/plus.svg";

const icons = {
  Posts: PostsIcon,
  Profile: ProfileIcon,
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const isActive = state.index === index;
        const isFocused = state.index === 1 && route.name === "Profile";

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isActive && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isActive ? { selected: true } : {}}
            accessibilityLabel={
              descriptors[route.key].options.tabBarAccessibilityLabel
            }
            onPress={onPress}
            style={[styles.tabButton, isFocused && styles.focusedTab]}
            disabled={isActive}
          >
            {React.createElement(icons[route.name], {
              width: 24,
              height: 24,
              fill: isFocused ? colors.white : colors.black_transparent,
            })}
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => navigation.navigate("Create")}
        style={[styles.tabButton, state.index === 0 && styles.focusedTab]}
      >
        <AddIcon
          width={24}
          height={24}
          fill={state.index === 0 ? colors.white : colors.black_transparent}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 102,
    backgroundColor: colors.white,
    paddingTop: 9,
    paddingBottom: 34,
    borderTopWidth: 0.5,
    borderTopColor: colors.gray_transparent,
  },
  tabButton: {
    paddingHorizontal: 23,
    paddingVertical: 8,
    borderRadius: 20,
  },
  focusedTab: {
    position: "absolute",
    top: 9,
    backgroundColor: colors.orange,
  },
});
