import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import SearchBar from '../components/SearchBar';

const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar onLocationSelect={setSearchLocation} />
      <MapView 
        style={styles.map} 
        initialRegion={{
          latitude: location?.latitude || 10.9368,
          longitude: location?.longitude || 76.7432,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {location && <Marker coordinate={location} title="You are here" />}
        {searchLocation && <Marker coordinate={searchLocation} title="Search Result" />}
      </MapView>
      <Button title="Go Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' }
});

export default MapScreen;