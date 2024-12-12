import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { colors, text } from "../styles/global";

export default AuthInput = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <TextInput
        {...props}
        style={[
          styles.input,
          isFocused && {
            backgroundColor: colors.white,
            borderColor: colors.orange,
          },
        ]}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        placeholderTextColor={colors.text_gray}
        secureTextEntry={props.type === "password" && !isVisible}
      />
      {props.type === "password" && (
        <TouchableOpacity
          onPress={() => setIsVisible(!isVisible)}
          style={styles.showButton}
        >
          <Text style={styles.showButtonText}>
            {isVisible ? "Приховати" : "Показати"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.light_gray,
    borderColor: colors.border_gray,
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 16,
    ...text.main,
  },
  showButton: {
    position: "absolute",
    padding: 16,
    right: 0,
  },
  showButtonText: {
    ...text.main,
    color: colors.blue,
  },
});
