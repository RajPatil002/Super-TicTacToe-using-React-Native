/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import OnlineGamePage from './lib/screens/game/onlinegamepage';
import HomePage from './lib/screens/home/homepage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OfflineGamePage from './lib/screens/game/offlinegamepage';
import { Header } from '@react-navigation/stack';


export type stackParams = {
  HomePage: undefined;
  OnlineGamePage: {
    port: string,
    createdbyid: string | undefined
  };
  OfflineGamePage: {
    players: Array<{
      marker: 'x' | 'o' | undefined,
      name: string
    }>
  }
}

const Stack = createNativeStackNavigator<stackParams>();

function App(): JSX.Element {

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='HomePage'>
        <Stack.Screen name='HomePage' component={HomePage} options={{ headerShown: false }} />
        {/* @ts-ignore */}
        <Stack.Screen name='OnlineGamePage' component={OnlineGamePage} options={{ headerShown: false }} />
        {/* @ts-ignore */}
        <Stack.Screen name='OfflineGamePage' component={OfflineGamePage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    // <SafeAreaView style={styles.safeareaview}>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    backgroundColor: "#fff",
    flex: 1
  },
});

export default App;
