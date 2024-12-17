import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { addComment, getCommentsByPostId } from "../services/firestore";
import { colors, text } from "../styles/global";
import ArrowTop from "../assets/icons/arrow-top.svg";
import ContentImage from "../components/ContentImage";
import Comment from "../components/Comment";

export default CommentsScreen = ({ navigation, route }) => {
  const { image, postId } = route.params;

  const [inputText, setInputText] = useState("");
  const [comments, setComments] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const containerRef = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Коментарі (${comments.length})`,
    });
  }, [comments.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const comments = await getCommentsByPostId(postId);
        setComments(comments);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSendComment = async () => {
    try {
      setIsSending(true);
      const comment = await addComment(postId, inputText);
      setComments([...comments, comment]);
      setInputText("");
      inputRef.current.blur();
      containerRef.current.scrollToEnd({ animated: true });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 98 : null}
    >
      <ScrollView style={{ flex: 1, flexShrink: 1 }} ref={containerRef}>
        <View style={styles.container}>
          <ContentImage image={image} />
          <View style={styles.list}>
            {loading ? (
              <ActivityIndicator
                size="large"
                color={colors.text_gray}
                style={{
                  marginTop: 100,
                }}
              />
            ) : (
              comments.map(({ id, ...data }) => <Comment key={id} {...data} />)
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          placeholder="Коментувати..."
          placeholderTextColor={colors.text_gray}
          style={styles.input}
          value={inputText}
          onChangeText={(value) => setInputText(value)}
        />
        <TouchableOpacity
          disabled={!inputText || isSending}
          onPress={handleSendComment}
          style={styles.sendButton}
        >
          {!isSending ? (
            <ArrowTop height={24} width={24} fill={colors.white} />
          ) : (
            <ActivityIndicator size="small" color={colors.white} />
          )}
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
