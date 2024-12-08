import { Image, StyleSheet } from "react-native";
import bgImage from "../../assets/images/background.png";

export default BackGroundImage = () => {
  return <Image source={bgImage} resizeMode="cover" style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    top: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
  },
});
