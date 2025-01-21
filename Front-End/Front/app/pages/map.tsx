import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

interface Boutique {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const map = () => {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [randomBoutiques, setRandomBoutiques] = useState<Boutique[]>([]); // Type explicitly defined here

  const generateRandomLocations = (latitude: number, longitude: number, count = 5): Boutique[] => {
    const randomLocations: Boutique[] = [];
    for (let i = 0; i < count; i++) {
      const randomLatitude = latitude + (Math.random() - 0.5) * 0.01; // Adjust 0.01 for proximity
      const randomLongitude = longitude + (Math.random() - 0.5) * 0.01;
      randomLocations.push({
        id: i + 1,
        name: `Boutique ${String.fromCharCode(65 + i)}`, // Names like A, B, C...
        latitude: randomLatitude,
        longitude: randomLongitude,
      });
    }
    return randomLocations;
  };

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied');
        return;
      }
      let current = await Location.getCurrentPositionAsync({});
      setLocation(current.coords);

      const boutiques = generateRandomLocations(current.coords.latitude, current.coords.longitude);
      setRandomBoutiques(boutiques); // This now works as expected
    };
    getLocation();
  }, []);

  if (!location) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title="Your Location"
        />

        {randomBoutiques.map((boutique) => (
          <Marker
            key={boutique.id}
            coordinate={{ latitude: boutique.latitude, longitude: boutique.longitude }}
            title={boutique.name}
            description={`Location of ${boutique.name}`}
          />
        ))}
      </MapView>
    </View>
  );
};

export default map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
