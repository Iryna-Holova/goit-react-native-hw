import { useRef } from "react";
import { Animated, ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { colors, text } from "../styles/global";
import LogOutButton from "../components/LogOutButton";
import PhotoInput from "../components/PhotoInput";
import Post from "../components/Post";
import data from "../data/posts.json";

export default ProfileScreen = () => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;

  const buttonPosition = scrollY.interpolate({
    inputRange: [100, 175],
    outputRange: [6, 81],
    extrapolate: "clamp",
  });

  const titleSize = scrollY.interpolate({
    inputRange: [100, 175],
    outputRange: [30, 17],
    extrapolate: "clamp",
  });

  const handleScroll = (event) => {
    const currentPosition = event.nativeEvent.contentOffset.y;
    navigation.setOptions({ headerShown: currentPosition > 175 });
    scrollY.setValue(currentPosition);
  };

  return (
    <ScrollView
      onScroll={(event) => {
        handleScroll(event);
      }}
      scrollEventThrottle={16}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <Animated.View
          style={[styles.logOutContainer, { top: buttonPosition }]}
        >
          <LogOutButton />
        </Animated.View>

        <PhotoInput />
        <Animated.Text style={[styles.title, { fontSize: titleSize }]}>
          Natali Romanova
        </Animated.Text>

        <View style={styles.list}>
          {data.map((post) => (
            <Post {...post} key={post.id} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 147,
    paddingTop: 92,
    paddingBottom: 446,
    paddingHorizontal: 16,
    marginBottom: -400,
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  logOutContainer: {
    position: "absolute",
    right: 0,
    top: 6,
  },
  title: {
    ...text.title,
    marginBottom: 33,
  },
  list: {
    gap: 32,
  },
});
