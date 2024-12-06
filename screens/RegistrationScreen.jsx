import { useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import bgImage from "../assets/images/registration-bg.jpg";

export default function RegistrationScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <ImageBackground source={bgImage} style={styles.background}>
      <View style={styles.content}>
        <Pressable style={styles.photoBox}>
          <Pressable style={styles.photoButton}></Pressable>
        </Pressable>
        <Text style={styles.title}>Реєстрація</Text>
        <View style={styles.fields}>
          <TextInput
            style={[styles.input, styles.text]}
            placeholder="Логін"
            placeholderTextColor="#BDBDBD"
          />
          <TextInput
            style={[styles.input, styles.text]}
            placeholder="Адреса електронної пошти"
            placeholderTextColor="#BDBDBD"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, styles.text]}
              placeholder="Пароль"
              placeholderTextColor="#BDBDBD"
              secureTextEntry={!isPasswordVisible}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.showButton}
            >
              <Text style={[styles.text, styles.touchableText]}>
                {isPasswordVisible ? "Приховати" : "Показати"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Зареєстуватися</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textButton}>
          <Text style={[styles.text, styles.touchableText]}>
            Вже є акаунт? Увійти
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

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
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  photoBox: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
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
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 16,
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.03,
    marginBottom: 33,
  },
  text: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  touchableText: {
    color: "#1B4371",
    textAlign: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  fields: {
    gap: 16,
    marginBottom: 43,
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    paddingHorizontal: 16,
  },
  showButton: {
    position: "absolute",
    padding: 16,
    right: 0,
  },
  button: {
    backgroundColor: "#FF6C00",
    paddingVertical: 16,
    borderRadius: 100,
  },
  textButton: {
    paddingVertical: 16,
  },
});
