import { Image, StyleSheet, Text, View } from "react-native";

import { text } from "../styles/global";
import avatar from "../assets/images/avatar.png";

export default User = () => {
  return (
    <View style={styles.container}>
      <Image source={avatar} resizeMode="cover" style={styles.avatar} />
      <View>
        <Text style={text.small_bold}>Natali Romanova</Text>
        <Text style={text.smaller}>email@example.com</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
});
