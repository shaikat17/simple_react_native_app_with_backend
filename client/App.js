import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import RootNavigation from './Navigations';


export default function App() {
  enableScreens();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
    </SafeAreaProvider>
  );
}


