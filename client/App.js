import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import RootNavigation from './Navigations';


export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
    </SafeAreaProvider>
  );
}


