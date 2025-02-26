import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';

const locations = [
  { id: '1', name: 'Main Building', latitude: 10.9368, longitude: 76.7432 },
  { id: '2', name: 'Central Library', latitude: 10.9365, longitude: 76.7435 },
  { id: '3', name: 'Student Center', latitude: 10.9370, longitude: 76.7440 }
];

const SearchBar = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);

  const handleSearch = (text) => {
    setQuery(text);
    if (text.length > 0) {
      const results = locations.filter(loc => loc.name.toLowerCase().includes(text.toLowerCase()));
      setFilteredLocations(results);
    } else {
      setFilteredLocations([]);
    }
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search locations..."
        value={query}
        onChangeText={handleSearch}
      />
      {filteredLocations.length > 0 && (
        <FlatList
          data={filteredLocations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onLocationSelect({ latitude: item.latitude, longitude: item.longitude })}>
              <Text style={styles.resultItem}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 1000
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  }
});

export default SearchBar;