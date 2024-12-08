import { useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colors } from "../../styles/global";
import BackGroundImage from "../components/BackGroundImage";
import PhotoInput from "../components/PhotoInput";
import Title from "../components/Title";
import AuthInput from "../components/AuthInput";
import Button from "../components/Button";
import TextButton from "../components/TextButton";

const { height: screenHeight } = Dimensions.get("window");

export default RegistrationScreen = () => {
  const [form, setform] = useState({
    login: "",
    email: "",
    password: "",
  });

  const handleChange = (field, value) => {
    setform({
      ...form,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    console.log(
      `Login: ${form.login}, Email: ${form.email}, Password: ${form.password}`
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <BackGroundImage />
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={
            screenHeight > 639 ? -175 : 639 - screenHeight - 175
          }
        >
          <View style={styles.content}>
            <PhotoInput />
            <Title>Реєстрація</Title>
            <View style={styles.fields}>
              <AuthInput
                placeholder="Логін"
                onChangeText={(value) => handleChange("login", value)}
                value={form.login}
              />
              <AuthInput
                placeholder="Адреса електронної пошти"
                onChangeText={(value) => handleChange("email", value)}
                value={form.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <AuthInput
                placeholder="Пароль"
                onChangeText={(value) => handleChange("password", value)}
                value={form.password}
                type="password"
                autoCapitalize="none"
              />
            </View>
            <Button onPress={handleSubmit}>Зареєструватися</Button>
            <TextButton
              text="Вже є аккаунт?"
              touchableText="Увійти"
              onPress={() => {
                console.log("Login");
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    width: "100%",
    maxHeight: screenHeight - 90,
    paddingTop: 92,
    paddingBottom: 62,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  fields: {
    gap: 16,
    marginBottom: 43,
  },
});
