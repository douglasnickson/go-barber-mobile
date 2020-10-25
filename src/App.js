import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import createRouter from './routes';

export default function App() {
  const signed = useSelector((state) => state.auth.signed);
  const Routes = createRouter(signed);
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#7153b1" />
      <Routes />
    </NavigationContainer>
  );
}
