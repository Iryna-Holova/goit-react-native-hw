import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { loginDB } from "../services/auth";
import { validateEmail, validatePassword } from "../utils/validation";
import { colors } from "../styles/global";
import Title from "../components/Title";
import AuthInput from "../components/AuthInput";
import Button from "../components/Button";
import TextButton from "../components/TextButton";

const { height: screenHeight } = Dimensions.get("window");

const topSpace =
  screenHeight * 0.6 > 356
    ? screenHeight * 0.4
    : Math.max(screenHeight - 356, 44);
const keyboardOffset = screenHeight - topSpace - 280;

export default LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setError(null);
    if (field === "email") setEmailError(false);
    if (field === "password") setPasswordError(false);

    setform({
      ...form,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    if (!validateEmail(form.email)) {
      return setEmailError(true);
    }
    if (!validatePassword(form.password)) {
      return setPasswordError(true);
    }

    try {
      setLoading(true);
      await loginDB(form, dispatch);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={-keyboardOffset}
        >
          <View style={styles.content}>
            <Title>Увійти</Title>
            <View style={styles.fields}>
              <AuthInput
                placeholder="Адреса електронної пошти"
                onChangeText={(value) => handleChange("email", value)}
                onSubmitEditing={handleSubmit}
                value={form.email}
                keyboardType="email-address"
                autoCapitalize="none"
                error={emailError}
                errorMessage="Неправильний формат електронної пошти"
              />
              <AuthInput
                placeholder="Пароль"
                onChangeText={(value) => handleChange("password", value)}
                onSubmitEditing={handleSubmit}
                value={form.password}
                type="password"
                autoCapitalize="none"
                error={passwordError}
                errorMessage="Пароль повинен містити не менше 6 символів"
              />
              {error && <Text style={styles.errorMessage}>{error}</Text>}
            </View>
            <Button disabled={loading} onPress={handleSubmit}>
              Увійти
            </Button>
            <TextButton
              text="Немає акаунту?"
              touchableText="Зареєструватися"
              onPress={() => {
                navigation.navigate("Registration");
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
    paddingTop: topSpace,
  },
  content: {
    minHeight: screenHeight - 44,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  fields: {
    gap: 16,
    marginBottom: 43,
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    position: "absolute",
    bottom: -32,
    right: 0,
    left: 0,
  },
});
