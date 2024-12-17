import { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import * as Linking from "expo-linking";

import { colors } from "../styles/global";
import FlipIcon from "../assets/icons/flip.svg";
import Button from "../components/Button";

export default CameraScreen = ({ navigation, route }) => {
  const [asked, setAsked] = useState(false);
  const [facing, setFacing] = useState(
    route.params?.isPortrait ? "front" : "back"
  );
  const [permission, requestPermission] = useCameraPermissions();
  const camera = useRef();

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    if (!asked && permission.canAskAgain) {
      requestPermission();
      setAsked(true);
      return <View style={styles.container} />;
    }

    const handleOpenSettings = () => {
      Linking.openSettings();
    };

    return (
      <View style={[styles.container, { paddingHorizontal: 16 }]}>
        <Text style={styles.message}>
          We need your permission to use the camera.
        </Text>
        {permission.canAskAgain ? (
          <Button onPress={requestPermission}>Request Permission</Button>
        ) : (
          <Button onPress={handleOpenSettings}>Open Settings</Button>
        )}
        <StatusBar style="light" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const handleTakePicture = async () => {
    if (!camera) return;
    const image = await camera.current?.takePictureAsync();
    if (route.params?.parentScreen === "Profile") {
      navigation.popTo("Home", {
        screen: "Profile",
        params: { photoUri: image.uri },
      });
    } else {
      navigation.popTo(route.params.parentScreen, { photoUri: image.uri });
    }
  };

  return (
    <View style={styles.container}>
      <CameraView ref={camera} style={styles.camera} facing={facing}>
        <TouchableOpacity
          onPress={handleTakePicture}
          style={[styles.button, styles.photoButton]}
        >
          <View style={styles.circle} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.flipButton]}
          onPress={toggleCameraFacing}
        >
          <FlipIcon width={24} height={24} fill={colors.white} />
        </TouchableOpacity>
      </CameraView>
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.black_primary,
    gap: 16,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    color: colors.white,
  },
  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 40,
  },
  button: {
    backgroundColor: colors.gray_transparent,
    borderRadius: 100,
  },
  photoButton: {
    padding: 4,
    backgroundColor: colors.gray_transparent,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.white,
  },
  circle: {
    width: 48,
    height: 48,
    backgroundColor: colors.white,
    borderRadius: 100,
  },
  flipButton: {
    position: "absolute",
    padding: 8,
    right: 16,
    bottom: 48,
  },
});
