import { Image, StyleSheet, Text, View } from "react-native";

import { colors, text } from "../styles/global";
import UserIcon from "../assets/icons/user.svg";

export default User = ({ login, email, avatar }) => {
  return (
    <View style={styles.container}>
      {!avatar ? (
        <View style={[styles.avatar, styles.avatarPlaceholder]}>
          <UserIcon
            style={{ transform: [{ scale: 1.5 }] }}
            width={24}
            height={24}
            fill={colors.text_gray}
          />
        </View>
      ) : (
        <Image
          source={{ uri: avatar }}
          resizeMode="cover"
          style={styles.avatar}
        />
      )}
      <View>
        <Text style={text.small_bold}>{login}</Text>
        <Text style={text.smaller}>{email}</Text>
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
  avatarPlaceholder: {
    backgroundColor: colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
});
