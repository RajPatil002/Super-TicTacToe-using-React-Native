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
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const length = 3;
let inc = 1

function generateGrid() { return Array(3).fill(Array(3).fill(singleGameGrid())) }

function singleGameGrid() { return Array.from({ length }, (_, index) => Array.from({ length }, (_, i) => inc++)) }



function App(): JSX.Element {
  const [color, setColor] = useState("#ff0fff")
  const [grid, setGrid] = useState(generateGrid())

  return (
    <SafeAreaView style={styles.safeareaview}>
      <View style={[styles.view, { backgroundColor: color }]}>
        <Text style={styles.title}>
          Welcome To TicTacToe
        </Text>
        <View style={styles.gridbackground}>

          <FlatList
            style={[styles.gamebox, {
              flexDirection: 'column',
              backgroundColor: '#ff0000',
            }]}//{ borderRadius: 20, backgroundColor: "#ffffff", gap: 20 }
            data={grid}
            contentContainerStyle={{
              flexGrow: 1, justifyContent: 'center', alignItems: 'center'
            }}
            // columnWrapperStyle={{ flexWrap: 'wrap' }}
            renderItem={(boxrow) => {
              console.log(boxrow)
              return (
                <FlatList
                  contentContainerStyle={{
                    flexGrow: 1, justifyContent: 'center', alignItems: 'center'
                  }}
                  style={[{
                    backgroundColor: '#ffff00',
                    flexDirection: 'row', alignSelf: 'center',
                    padding: 10
                  }]}//, borderRadius: 20, backgroundColor: "#ffffff", justifyContent: 'space-evenly' }}
                  data={boxrow.item}
                  renderItem={(boxrowitem) =>
                    <FlatList
                      contentContainerStyle={{
                        flexGrow: 1, justifyContent: 'center', alignItems: 'center'
                      }}
                      style={{
                        flexDirection: 'column', backgroundColor: "#00f0ff",
                        margin: 10
                      }}
                      data={boxrowitem.item}
                      renderItem={(singleboxrow) => <FlatList
                        style={{ flexDirection: 'row', justifyContent: "space-evenly" }}
                        data={singleboxrow.item}
                        renderItem={(singlebox) => <View style={styles.gridbox} >
                          <Text style={{ color: '#000000', padding: 10, margin: 10, backgroundColor: '#59d459' }}>
                            {singlebox.item}
                          </Text>
                        </View>}
                      />}
                    />}
                />
              )
            }}
          />
        </View>
        <Button title='click' onPress={() => {
          setColor("#00ffff")
        }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffc2c2",
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    alignSelf: 'center'
  },
  view: {
    // justifyContent: 'space-evenly',
    alignContent: 'center',
    justifyContent: "center",

    alignSelf: 'stretch',

    flex: 1,
    // backgroundColor: "#ffc2c2",
    // alignContent:'center'
  },
  gridbox: {
    // backgroundColor: "#ff00ff",
    // margin: 5,
    // // height: 20,
    // // width: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  gridbackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  gamebox: {
    flexWrap: 'wrap',
    // alignSelf: 'stretch',
    flex: 1
  }
});

export default App;
