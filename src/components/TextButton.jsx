import { StyleSheet, Text } from "react-native";
import { colors, text } from "../../styles/global";

export default TextButton = ({ text, touchableText, onPress }) => {
  return (
    <Text style={styles.textButton} onPress={onPress}>
      {text} <Text style={styles.touchableText}>{touchableText}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  textButton: {
    ...text.main,
    color: colors.blue,
    textAlign: "center",
    paddingVertical: 16,
  },
  touchableText: {
    textDecorationLine: "underline",
  },
});
