import { useState } from "react";
import { useSelector } from "react-redux";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { colors, text } from "../styles/global";
import ContentImage from "./ContentImage";
import Comments from "../assets/icons/message.svg";
import Likes from "../assets/icons/thumbs-up.svg";
import Location from "../assets/icons/map-pin.svg";

export default Post = ({
  id,
  image,
  title,
  commentsCount,
  likes,
  location,
  onToggleLike,
}) => {
  const user = useSelector((state) => state.user.uid);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    try {
      setLoading(true);
      await onToggleLike(id, likes && likes.includes(user), user);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ContentImage image={image} />
      <Text style={text.main_bold}>{title}</Text>
      <View style={styles.info}>
        <View style={styles.stats}>
          <TouchableOpacity
            style={styles.statItem}
            onPress={() =>
              navigation.navigate("Comments", { image, postId: id })
            }
          >
            <Comments width={24} height={24} fill={colors.orange} />
            <Text style={styles.statText}>{commentsCount || 0}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLike} style={styles.statItem}>
            {!loading ? (
              <Likes
                width={24}
                height={24}
                fill={
                  likes && likes.includes(user) ? colors.orange : colors.white
                }
                stroke={colors.orange}
              />
            ) : (
              <ActivityIndicator size="small" color={colors.orange} />
            )}
            <Text style={styles.statText}>{likes ? likes.length : 0}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.location}
          onPress={() =>
            navigation.navigate("Map", {
              isPicker: false,
              location,
            })
          }
        >
          <Location width={24} height={24} stroke={colors.text_gray} />
          <Text numberOfLines={1} style={styles.locationText}>
            {location.name}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 24,
  },
  stats: {
    flexDirection: "row",
    gap: 24,
  },
  statItem: {
    width: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 6,
  },
  statText: {
    ...text.main,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flexShrink: 1,
  },
  locationText: {
    flexShrink: 1,
    ...text.main,
    textDecorationLine: "underline",
  },
});
