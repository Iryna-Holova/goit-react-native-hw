import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { addPost } from "../services/firestore";
import { colors, text } from "../styles/global";
import Button from "../components/Button";
import Camera from "../assets/icons/camera.svg";
import MapPin from "../assets/icons/map-pin.svg";
import Trash from "../assets/icons/trash.svg";

export default CreatePostsScreen = ({ route, navigation }) => {
  const [photoUri, setPhotoUri] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(false);

  useFocusEffect(() => {
    if (route.params?.location) {
      setLocation(route.params.location);
      navigation.setParams({ location: null });
    }
    if (route.params?.photoUri) {
      setPhotoUri(route.params.photoUri);
      navigation.setParams({ photoUri: null });
    }
  });

  const handleImagePicker = () => {
    navigation.navigate("Camera", {
      isPortrait: false,
      parentScreen: "Create",
    });
  };

  const handleLocationPicker = () => {
    navigation.navigate("Map", {
      isPicker: true,
      location,
    });
  };

  const handleSubmit = async () => {
    try {
      await addPost({ title, location, photoUri });
      navigation.goBack();
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearForm = () => {
    setPhotoUri(null);
    setTitle("");
    setLocation({});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 98 : null}
    >
      <ScrollView style={{ flex: 1, flexShrink: 1 }}>
        <View style={styles.container}>
          <View>
            <Pressable
              style={[styles.photoInput, { borderWidth: photoUri ? 0 : 1 }]}
              onPress={handleImagePicker}
            >
              {photoUri && (
                <Image source={{ uri: photoUri }} style={styles.photo} />
              )}
              <View
                style={[
                  styles.camera,
                  {
                    backgroundColor: photoUri
                      ? colors.white_transparent
                      : colors.white,
                  },
                ]}
              >
                <Camera
                  height={24}
                  width={24}
                  fill={photoUri ? colors.white : colors.text_gray}
                />
              </View>
            </Pressable>
            <Text style={styles.photoInputText}>
              {photoUri ? "Редагувати фото" : "Завантажте фото"}
            </Text>
          </View>
          <View style={styles.fields}>
            <TextInput
              style={[styles.input, title ? text.main_bold : text.main]}
              placeholder="Назва..."
              placeholderTextColor={colors.text_gray}
              value={title}
              onChangeText={(value) => setTitle(value)}
            />
            <Pressable
              onPress={handleLocationPicker}
              style={[styles.input, styles.locationInput]}
            >
              <MapPin height={24} width={24} stroke={colors.text_gray} />
              <Text
                style={[
                  text.main,
                  !location.name && { color: colors.text_gray },
                ]}
              >
                {location.name ?? "Місцевість..."}
              </Text>
            </Pressable>
          </View>
          <Button
            onPress={handleSubmit}
            disabled={!photoUri || !title || !location.name || loading}
          >
            Опублікувати
          </Button>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={handleClearForm} style={styles.deleteButton}>
          <Trash height={24} width={24} fill={colors.text_gray} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 99,
    paddingHorizontal: 16,
    gap: 32,
  },
  photoInput: {
    height: 240,
    backgroundColor: colors.gray,
    borderWidth: 1,
    borderColor: colors.border_gray,
    borderRadius: 8,
    marginBottom: 8,
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  camera: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    bottom: "50%",
    right: "50%",
    transform: [{ translateX: "50%" }, { translateY: "50%" }],
    justifyContent: "center",
    alignItems: "center",
  },
  photoInputText: {
    ...text.main,
    color: colors.text_gray,
  },
  fields: {
    gap: 24,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.border_gray,
  },
  locationInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  bottomContainer: {
    paddingTop: 9,
    backgroundColor: colors.white,
    height: 83,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  deleteButton: {
    paddingVertical: 8,
    paddingHorizontal: 23,
    backgroundColor: colors.gray,
    borderRadius: 20,
  },
});
