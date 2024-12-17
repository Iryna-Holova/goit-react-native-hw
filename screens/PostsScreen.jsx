import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { getPosts, toggleLike } from "../services/firestore";
import { colors } from "../styles/global";
import User from "../components/User";
import Post from "../components/Post";

export default PostsScreen = () => {
  const { login, email, avatar } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const posts = await getPosts();
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

  const handleScroll = (event) => {
    const currentPosition = event.nativeEvent.contentOffset.y;
    if (currentPosition < -200) {
      fetchPosts();
    }
  };

  return (
    <ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <User login={login} email={email} avatar={avatar} />
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.text_gray}
            style={{
              marginTop: 200,
            }}
          />
        ) : (
          posts.map((post) => (
            <Post {...post} key={post.id} onToggleLike={handleToggleLike} />
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 46,
    paddingHorizontal: 16,
    gap: 32,
  },
});
