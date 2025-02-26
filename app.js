import React, { useState, useEffect, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appearance, useColorScheme } from 'react-native-appearance';
import HomeScreen from './screens/Homescreen';
import MapScreen from './screens/MapScreen';

const Stack = createStackNavigator();
const ThemeContext = createContext();

export default function App() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  useEffect(() => {
    Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: theme === 'dark' ? '#333' : '#fff' }, headerTintColor: theme === 'dark' ? '#fff' : '#000' }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}