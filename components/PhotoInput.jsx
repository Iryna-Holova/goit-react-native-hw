import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import { colors } from "../styles/global";
import Plus from "../assets/icons/plus.svg";

export default PhotoInput = ({
  photoUri,
  onAddAvatar,
  onResetAvatar,
  loading,
}) => {
  return (
    <Pressable disabled={loading} onPress={onAddAvatar} style={styles.photoBox}>
      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
      {loading && <ActivityIndicator size="large" color={colors.orange} />}
      <Pressable
        disabled={loading}
        onPress={photoUri ? onResetAvatar : onAddAvatar}
        style={styles.photoButton}
      >
        <View
          style={[
            styles.iconContainer,
            { borderColor: photoUri ? colors.border_gray : colors.orange },
          ]}
        >
          <Plus
            width={24}
            height={24}
            fill={photoUri ? colors.text_gray : colors.orange}
            style={{ transform: [{ rotate: photoUri ? "45deg" : "0deg" }] }}
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
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    position: "absolute",
  },
  photoButton: {
    position: "absolute",
    bottom: 0,
    right: -26,
    padding: 14,
  },
  iconContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 16,
  },
});
