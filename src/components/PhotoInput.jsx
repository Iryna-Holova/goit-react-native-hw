import { Pressable, StyleSheet } from "react-native";
import { colors } from "../../styles/global";

export default PhotoInput = () => {
  return (
    <Pressable style={styles.photoBox}>
      <Pressable style={styles.photoButton}></Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  photoBox: {
    width: 120,
    height: 120,
    backgroundColor: colors.light_gray,
    borderRadius: 16,
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],
  },
  photoButton: {
    position: "absolute",
    bottom: 14,
    right: -12,
    height: 25,
    width: 25,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.orange,
    borderRadius: 16,
  },
});
