import { Image, StyleSheet } from "react-native";
import { colors } from "../styles/global";

export default ContentImage = ({ image }) => {
  return (
    <Image source={{ uri: image }} resizeMode="cover" style={styles.image} />
  );
};

const styles = StyleSheet.create({
  image: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    backgroundColor: colors.gray,
  },
});
