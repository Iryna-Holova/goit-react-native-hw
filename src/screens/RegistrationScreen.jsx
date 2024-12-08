import { useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AuthInput from "../components/AuthInput";
import bgImage from "../../assets/images/registration-bg.jpg";
import { colors, text } from "../../styles/global";
import Button from "../components/Button";

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

  return (
    <ImageBackground source={bgImage} style={styles.background}>
      <View style={styles.content}>
        <Pressable style={styles.photoBox}>
          <Pressable style={styles.photoButton}></Pressable>
        </Pressable>
        <Text style={styles.title}>Реєстрація</Text>
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
        <Button onPress={() => console.log(form)}>Зареєструватися</Button>
        <TouchableOpacity style={styles.textButton}>
          <Text style={styles.touchableText}>Вже є акаунт? Увійти</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    objectFit: "cover",
    justifyContent: "flex-end",
  },
  content: {
    paddingTop: 92,
    paddingBottom: 62,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  photoBox: {
    width: 120,
    height: 120,
    backgroundColor: colors.light_gray,
    borderRadius: 16,
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],
  },
  photoButton: {
    position: "absolute",
    bottom: 14,
    right: -12,
    height: 25,
    width: 25,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.orange,
    borderRadius: 16,
  },
  title: {
    ...text.title,
    marginBottom: 33,
  },
  fields: {
    gap: 16,
    marginBottom: 43,
  },
  textButton: {
    paddingVertical: 16,
  },
  touchableText: {
    ...text.main,
    color: colors.blue,
    textAlign: "center",
  },
});
