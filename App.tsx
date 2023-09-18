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
  Pressable,
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


function newBigBox(box: Array<Array<string>>, r: number, c: number) {
  box[r][c] = 'x';
  return box
}

function printBigBox(bigbox: BigGame) {
  bigbox.bigbox.forEach((item) => {
    (item.forEach((item1) => {
      console.log(item1.box)
    }))
  })
}

function App(): JSX.Element {
  const [bigbox, _] = useState(new BigGame())
  const [count, setC] = useState(0)

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
              keyExtractor={(_, index) => index.toString()}
              renderItem={(bigboxrow) => {
                return <View style={{ flexDirection: 'row', }} key={bigboxrow.index}>
                  {bigboxrow.item.map((smallbox, bigindex) => <View
                    style={styles.bigbox}
                    key={bigindex}
                  >
                    {typeof (smallbox.box) != 'string' ?
                      <FlatList
                        style={styles.gamebox}
                        data={smallbox.box}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={(singleboxrow) => {
                          // console.log(singleboxrow.item)
                          return <View style={{ flexDirection: 'row', }} >
                            {singleboxrow.item.map((singleboxitem, index) => {
                              return <Pressable
                                onPress={() => {
                                  console.log("singleboxitem", index)
                                  if (typeof (smallbox.box) != 'string') {
                                    // smallbox.box = newBigBox(smallbox.box, singleboxrow.index, index)
                                    bigbox.bigbox[bigboxrow.index][bigindex].updateGameBox(singleboxrow.index, index, count % 2 == 0 ? 'x' : 'x')
                                    setC(count + 1)
                                    // smallbox.box = smallbox.updateGameBox(singleboxrow.index, index, 'x')
                                    // setBigBox(bigbox)
                                  }
                                  printBigBox(bigbox)
                                }}
                                key={singleboxrow.index + "" + index}
                                style={styles.pressbox}
                              >
                                <View style={styles.center}><Text style={{ fontSize: 25, color: '#000', fontWeight: 'bold' }}>{singleboxitem}</Text></View>
                              </Pressable>
                            })}
                          </View>

                        }}
                      />
                      : <View style={styles.winnerbox}>
                        <Text style={{ fontSize: 50, color: '#000', fontWeight: 'bold' }}>
                          {smallbox.box}
                        </Text>
                      </View>}
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
  },
  gamebox: {
    flex: 1,
    alignSelf: 'stretch',
    padding: (Dimensions.get('window').width / 12) * 0.05,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bigbox: {
    margin: (Dimensions.get('window').width / 12) * 0.2,
    borderWidth: 2,
    borderColor: '#000',
  },
  pressbox: {
    // backgroundColor: '#f00',
    borderWidth: 1,
    height: (Dimensions.get('window').width / 12),
    width: (Dimensions.get('window').width / 12),
    margin: (Dimensions.get('window').width / 12) / 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  winnerbox: {
    // backgroundColor: '#f00',
    borderWidth: 1,
    height: ((Dimensions.get('window').width * 3) / 12),
    width: ((Dimensions.get('window').width * 3) / 12),
    margin: (Dimensions.get('window').width / 56),
    justifyContent: 'center',
    alignItems: 'center'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;
