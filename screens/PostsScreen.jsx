import { ScrollView, StyleSheet, View } from "react-native";

import posts from "../data/posts.json";
import Post from "../components/Post";
import User from "../components/User";

export default PostsScreen = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <User />
        {posts.map(({ id, ...props }) => (
          <Post key={id} {...props} />
        ))}
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
