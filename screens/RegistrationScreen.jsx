import { useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

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

export default RegistrationScreen = () => {
  const navigation = useNavigation();

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
    navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-113}>
          <View style={styles.content}>
            <PhotoInput />
            <Title>Реєстрація</Title>
            <View style={styles.fields}>
              <AuthInput
                placeholder="Логін"
                onChangeText={(value) => handleChange("login", value)}
                onSubmitEditing={handleSubmit}
                value={form.login}
              />
              <AuthInput
                placeholder="Адреса електронної пошти"
                onChangeText={(value) => handleChange("email", value)}
                onSubmitEditing={handleSubmit}
                value={form.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <AuthInput
                placeholder="Пароль"
                onChangeText={(value) => handleChange("password", value)}
                onSubmitEditing={handleSubmit}
                value={form.password}
                type="password"
                autoCapitalize="none"
              />
            </View>
            <Button onPress={handleSubmit}>Зареєструватися</Button>
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
});
