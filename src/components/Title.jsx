import { StyleSheet, Text } from "react-native";
import { text } from "../../styles/global";

export default Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    ...text.title,
    marginBottom: 33,
  },
});
