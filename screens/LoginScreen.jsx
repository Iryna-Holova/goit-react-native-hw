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

export default LoginScreen = () => {
  const navigation = useNavigation();

  const [form, setform] = useState({
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
    console.log(`Email: ${form.email}, Password: ${form.password}`);
    navigation.navigate("Home");
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
            <Button onPress={handleSubmit}>Увійти</Button>
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
});
