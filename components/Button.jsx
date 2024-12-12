import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { colors, text } from "../styles/global";

export default Button = (props) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        props.disabled && { backgroundColor: colors.gray },
      ]}
      {...props}
    >
      <Text
        style={[
          styles.buttonText,
          props.disabled && { color: colors.text_gray },
        ]}
      >
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.orange,
    paddingVertical: 16,
    borderRadius: 100,
  },
  buttonText: {
    ...text.main,
    color: colors.white,
    textAlign: "center",
  },
});
