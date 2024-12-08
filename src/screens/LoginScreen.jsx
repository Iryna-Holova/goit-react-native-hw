import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colors } from "../../styles/global";
import BackGroundImage from "../components/BackGroundImage";
import Title from "../components/Title";
import AuthInput from "../components/AuthInput";
import Button from "../components/Button";
import TextButton from "../components/TextButton";

export default LoginScreen = () => {
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
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <BackGroundImage />
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-241}>
          <View style={styles.content}>
            <Title>Увійти</Title>
            <View style={styles.fields}>
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
            <Button onPress={handleSubmit}>Увійти</Button>
            <TextButton
              text="Немає акаунту?"
              touchableText="Зареєструватися"
              onPress={() => {
                console.log("Registration");
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
    paddingTop: 32,
    paddingBottom: 128,
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
