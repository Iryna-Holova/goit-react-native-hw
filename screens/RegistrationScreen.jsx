import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
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

import { registerDB } from "../services/auth";
import {
  validateEmail,
  validateLogin,
  validatePassword,
} from "../utils/validation";
import { colors } from "../styles/global";
import PhotoInput from "../components/PhotoInput";
import Title from "../components/Title";
import AuthInput from "../components/AuthInput";
import Button from "../components/Button";
import TextButton from "../components/TextButton";

const { height: screenHeight } = Dimensions.get("window");

const topSpace =
  screenHeight * 0.68 > 487
    ? screenHeight * 0.32
    : Math.max(screenHeight - 487, 104);

export default RegistrationScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [form, setform] = useState({
    login: "",
    email: "",
    password: "",
  });
  const [photoUri, setPhotoUri] = useState(null);
  const [error, setError] = useState(null);
  const [loginError, setLoginError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setError(null);
    if (field === "login") setLoginError(false);
    if (field === "email") setEmailError(false);
    if (field === "password") setPasswordError(false);

    setform({
      ...form,
      [field]: value,
    });
  };

  useFocusEffect(() => {
    if (route.params?.photoUri) {
      setPhotoUri(route.params.photoUri);
      navigation.setParams({ photoUri: null });
    }
  });

  const handleAddAvatar = () => {
    navigation.navigate("Camera", {
      isPortrait: true,
      parentScreen: "Registration",
    });
  };

  const handleResetAvatar = () => {
    setPhotoUri(null);
  };

  const handleSubmit = async () => {
    if (!validateLogin(form.login)) {
      return setLoginError(true);
    }
    if (!validateEmail(form.email)) {
      return setEmailError(true);
    }
    if (!validatePassword(form.password)) {
      return setPasswordError(true);
    }

    try {
      setLoading(true);
      await registerDB(form, photoUri, dispatch);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-113}>
          <View style={styles.content}>
            <PhotoInput
              photoUri={photoUri}
              onAddAvatar={handleAddAvatar}
              onResetAvatar={handleResetAvatar}
            />
            <Title>Реєстрація</Title>
            <View style={styles.fields}>
              <AuthInput
                placeholder="Логін"
                onChangeText={(value) => handleChange("login", value)}
                onSubmitEditing={handleSubmit}
                value={form.login}
                error={loginError}
                errorMessage="Логін повинен містити не менше 3 символів"
              />
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
              Зареєструватися
            </Button>
            <TextButton
              text="Вже є аккаунт?"
              touchableText="Увійти"
              onPress={() => navigation.navigate("Login")}
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
    minHeight: screenHeight - 104,
    paddingTop: 92,
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
    left: 0,
    right: 0,
  },
});
