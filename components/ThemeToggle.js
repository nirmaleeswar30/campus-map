import React from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';
import { useTheme } from './App';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Dark Mode</Text>
      <Switch
        value={theme === 'dark'}
        onValueChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'transparent'
  }
});

export default ThemeToggle;