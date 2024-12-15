import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import { fetchFullAddress } from "../services/googleMaps";
import { colors } from "../styles/global";
import SaveIcon from "../assets/icons/save.svg";

export default MapScreen = ({ navigation, route }) => {
  const [coords, setCoords] = useState(route.params.location.coords || null);
  const [name, setName] = useState(route.params.location.name || "Loading...");
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!coords) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") return;

        let {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({});
        setCoords({ latitude, longitude });
        setRegion({ latitude, longitude });
        fetchPlaceInfo({ latitude, longitude });
      })();
    }

    if (coords && mapRef.current) {
      setRegion(coords);
    }
  }, [coords]);

  useEffect(() => {
    navigation.setOptions({ headerTitle: name });
  }, [name]);

  const fetchPlaceInfo = async (coords) => {
    try {
      const address = await fetchFullAddress(coords);
      setName(address);
    } catch (error) {
      console.error("Error:", error);
      setName("Unknown place");
    }
  };

  const setRegion = (coordinates) => {
    mapRef.current.animateToRegion({
      ...coordinates,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const handleMarkerChange = async (e) => {
    const { coordinate } = e.nativeEvent;
    setCoords(coordinate);
    fetchPlaceInfo(coordinate);
  };

  useLayoutEffect(() => {
    if (!route.params?.isPicker) return;
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.popTo("Create", { location: { coords, name } })
          }
          style={{ padding: 16 }}
        >
          <SaveIcon width={24} height={24} fill={colors.orange} />
        </TouchableOpacity>
      ),
    });
  }, [coords, name]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.mapStyle}
        initialRegion={
          coords
            ? { ...coords, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
            : null
        }
        onPress={route.params?.isPicker ? handleMarkerChange : null}
        showsUserLocation={true}
      >
        <Marker
          ref={markerRef}
          draggable={route.params?.isPicker}
          coordinate={coords ?? { latitude: 0, longitude: 0 }}
          onDragEnd={handleMarkerChange}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
});
