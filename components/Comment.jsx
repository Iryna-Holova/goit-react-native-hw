import { Image, StyleSheet, Text, View } from "react-native";

import { formatDate } from "../utils/formatDate";
import { colors, text as textStyle } from "../styles/global";

export default Comment = ({ date, text, user }) => {
  return (
    <View style={user.id === 2 ? styles.containerRight : styles.containerLeft}>
      <Image
        source={{ uri: user.avatar }}
        resizeMode="cover"
        style={styles.avatar}
      />
      <View
        style={[
          styles.body,
          user.id === 2 ? styles.bodyRight : styles.bodyLeft,
        ]}
      >
        <Text style={textStyle.small}>{text}</Text>
        <Text style={[textStyle.tiny, user.id !== 2 && { textAlign: "right" }]}>
          {formatDate(date)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerLeft: {
    flexDirection: "row",
    gap: 16,
  },
  containerRight: {
    flexDirection: "row-reverse",
    gap: 16,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  body: {
    width: "100%",
    flexShrink: 1,
    padding: 16,
    gap: 8,
    backgroundColor: colors.light_gray,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  bodyLeft: {
    borderTopRightRadius: 6,
  },
  bodyRight: {
    borderTopLeftRadius: 6,
  },
});
