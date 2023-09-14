/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  FlatList,
  Text,
  useColorScheme,
  View,
  Dimensions,
  ListRenderItem,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SingleGameBox from './lib/singlegame';
import BigGame from './lib/biggame';



function App(): JSX.Element {
  const [color, setColor] = useState("#ff0fff")
  const [bigbox, setBigBox] = useState(new BigGame())

  return (
    <SafeAreaView style={styles.safeareaview}>
      <View style={[styles.window]}>
        <Text style={styles.title}>
          Welcome To TicTacToe
        </Text>
        <View style={{ flex: 1, justifyContent: 'center' }}>

          <View style={styles.gridbackground}>

            <FlatList
              data={bigbox.bigbox}
              renderItem={(bigboxrow) => {
                return <View style={{ flexDirection: 'row', }}>
                  {bigboxrow.item.map((bigboxrowitem) => <View
                    style={{
                      margin: (Dimensions.get('window').width / 12) * 0.1,
                      borderWidth: 2,
                      borderColor: '#000',
                      // borderWidth: 1
                    }}
                  >
                    {typeof (bigboxrowitem.box) != 'string' ?
                      <FlatList
                        style={{
                          flex: 1,
                          // flexGrow: 1,
                          alignSelf: 'stretch',
                          // margin: 10,
                          padding: (Dimensions.get('window').width / 12) * 0.05,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                        data={bigboxrowitem.box}
                        renderItem={(singleboxrow) => {
                          console.log(singleboxrow.item)
                          return <View style={{ flexDirection: 'row', }}>
                            {singleboxrow.item.map((singleboxitem) => <View style={{
                              borderColor: "#000",
                              borderWidth: 1,
                              height: (Dimensions.get('window').width / 12),
                              width: (Dimensions.get('window').width / 12),
                              margin: (Dimensions.get('window').width / 12) / 13.5,
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}><Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold' }}>{singleboxitem}</Text></View>)}
                          </View>
                        }}
                      /> : <View></View>}
                  </View>)}
                </View>
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff",
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    alignSelf: 'center',
    color: "#0ff",
  },
  window: {
    alignContent: 'center',
    justifyContent: "center",
    flex: 1,
  },
  gridbackground: {
    justifyContent: "center",
    alignItems: 'center',
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').width,
    // backgroundColor: "#7add89"
  },
  gamebox: {
    // flexWrap: 'wrap',
    // alignSelf: 'stretch',
    // flex: 1
  }
});

export default App;
