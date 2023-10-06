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
import OnlineGamePage from './lib/screens/onlinegamepage';
import HomePage from './lib/screens/homepage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export type stackParams = {
  HomePage: undefined;
  OnlineGamePage: {
    port: string,
    createdbyid: string | undefined
  };
}

const Stack = createNativeStackNavigator<stackParams>();

function App(): JSX.Element {

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='HomePage'>
        <Stack.Screen name='HomePage' component={HomePage} />
        <Stack.Screen name='OnlineGamePage' component={OnlineGamePage} />
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
