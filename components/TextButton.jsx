import { Pressable, StyleSheet, Text } from "react-native";

import { colors, text } from "../styles/global";

export default TextButton = ({ text, touchableText, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.textButton}>
        {text} <Text style={styles.touchableText}>{touchableText}</Text>
      </Text>
    </Pressable>
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
