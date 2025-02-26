import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ThemeToggle from '../components/ThemeToggle';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ThemeToggle />
      <Text style={styles.title}>Welcome to Karunya Campus Map</Text>
      <Button title="Go to Map" onPress={() => navigation.navigate('Map')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 }
});

export default HomeScreen;