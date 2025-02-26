import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appearance } from 'react-native';
import HomeScreen from '../../screens/HomeScreen';
import MapScreen from '../../screens/MapScreen';

// Define types for ThemeContext
type ThemeContextType = {
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
};

// Create ThemeContext with default values
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define types for the stack navigator
type RootStackParamList = {
  Home: undefined;
  Map: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  const [theme, setTheme] = useState<'light' | 'dark'>(Appearance.getColorScheme() || 'light');

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) setTheme(colorScheme);
    });

    return () => listener.remove(); // Cleanup listener
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: theme === 'dark' ? '#333' : '#fff' },
            headerTintColor: theme === 'dark' ? '#fff' : '#000',
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme context
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeContext provider');
  return context;
}
