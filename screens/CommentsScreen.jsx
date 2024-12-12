import { useRoute } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { colors, text } from "../styles/global";
import ArrowTop from "../assets/icons/arrow-top.svg";
import ContentImage from "../components/ContentImage";
import Comment from "../components/Comment";

export default CommentsScreen = () => {
  const {
    params: { image, comments },
  } = useRoute();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 98 : null}
    >
      <ScrollView style={{ flex: 1, flexShrink: 1 }}>
        <View style={styles.container}>
          <ContentImage image={image} />
          <View style={styles.list}>
            {comments.map(({ id, ...data }) => (
              <Comment key={id} {...data} />
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Коментувати..."
          placeholderTextColor={colors.text_gray}
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendButton}>
          <ArrowTop height={24} width={24} fill={colors.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
    gap: 32,
  },
  list: {
    gap: 24,
  },
  inputContainer: {
    padding: 16,
    backgroundColor: colors.white,
    width: "100%",
  },
  input: {
    backgroundColor: colors.gray,
    borderColor: colors.border_gray,
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
    width: "100%",
    paddingLeft: 16,
    ...text.main,
  },
  sendButton: {
    padding: 5,
    backgroundColor: colors.orange,
    borderRadius: 17,
    position: "absolute",
    right: 24,
    top: 24,
  },
});
