import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { colors } from "../styles/global";
import Plus from "../assets/icons/plus.svg";
import tempAvatar from "../assets/images/avatar.png";

export default PhotoInput = () => {
  const [avatar, setAvatar] = useState(null);

  const addAvatar = () => {
    setAvatar(tempAvatar);
  };

  const removeAvatar = () => {
    setAvatar(null);
  };

  return (
    <Pressable style={styles.photoBox} onPress={addAvatar}>
      {avatar && <Image style={styles.image} source={avatar} />}
      <Pressable
        style={styles.photoButton}
        onPress={avatar ? removeAvatar : addAvatar}
      >
        <View
          style={[
            styles.icon,
            {
              borderColor: avatar ? colors.border_gray : colors.orange,
              transform: [{ rotate: avatar ? "45deg" : "0deg" }],
            },
          ]}
        >
          <Plus
            width={24}
            height={24}
            fill={avatar ? colors.text_gray : colors.orange}
          />
        </View>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  photoBox: {
    width: 120,
    height: 120,
    backgroundColor: colors.gray,
    borderRadius: 16,
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  photoButton: {
    position: "absolute",
    bottom: 0,
    right: -26,
    padding: 14,
  },
  icon: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 16,
  },
});
