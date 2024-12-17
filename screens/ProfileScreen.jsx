import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ActivityIndicator,
  Animated,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { getPosts, toggleLike } from "../services/firestore";
import { updateUserAvatar } from "../services/auth";
import { colors, text } from "../styles/global";
import LogOutButton from "../components/LogOutButton";
import PhotoInput from "../components/PhotoInput";
import Post from "../components/Post";

export default ProfileScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { uid, login, avatar } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [uid])
  );

  useEffect(() => {
    navigation.setOptions({ headerTitle: login });
  }, [login]);

  useEffect(() => {
    if (route.params?.photoUri) {
      uploadAvatar(route.params.photoUri);
    }
  }, [route.params?.photoUri]);

  const uploadAvatar = async (photoUri) => {
    try {
      setAvatarLoading(true);
      await updateUserAvatar(photoUri, dispatch);
    } catch (error) {
      console.error(error.message);
    } finally {
      setAvatarLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const posts = await getPosts(uid);
      setPosts(posts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleLike = async (postId, isLiked, user) => {
    await toggleLike(postId, isLiked);

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: isLiked
                ? post.likes.filter((id) => id !== user)
                : [...(post.likes || []), user],
            }
          : post
      )
    );
  };

  const handleAddAvatar = () => {
    navigation.navigate("Camera", {
      isPortrait: true,
      parentScreen: "Profile",
    });
  };

  const handleResetAvatar = () => {
    uploadAvatar(null);
  };

  const handleScroll = (event) => {
    const currentPosition = event.nativeEvent.contentOffset.y;
    navigation.setOptions({ headerShown: currentPosition > 175 });
    scrollY.setValue(currentPosition);
    if (currentPosition < -200) {
      fetchPosts();
    }
  };

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

  return (
    <ScrollView
      onScroll={(event) => {
        handleScroll(event);
      }}
      scrollEventThrottle={16}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.View
          style={[styles.logOutContainer, { top: buttonPosition }]}
        >
          <LogOutButton />
        </Animated.View>

        <PhotoInput
          loading={avatarLoading}
          photoUri={avatar}
          onAddAvatar={handleAddAvatar}
          onResetAvatar={handleResetAvatar}
        />
        <Animated.Text style={[styles.title, { fontSize: titleSize }]}>
          {login}
        </Animated.Text>

        <View style={styles.list}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={colors.gray_transparent}
              style={{
                marginTop: 100,
              }}
            />
          ) : (
            posts.map((post) => (
              <Post {...post} key={post.id} onToggleLike={handleToggleLike} />
            ))
          )}
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
    minHeight: "100%",
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
