import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import GlobalStyles from '../../widgets/styles'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { stackParams } from '../../../App'
import { ShadowButton } from '../../widgets/button'

const PlayersNameField: React.FC<{
    navigation: NativeStackNavigationProp<stackParams>
}> = ({ navigation }) => {
    const [players, _] = useState<Array<{ name: string, marker: 'x' | 'o' | undefined }>>([{ name: 'player1', marker: undefined }, { name: 'player2', marker: undefined }])
    return (
        <View style={[GlobalStyles.center, { flex: 0, }]}>
            <View style={{
                alignItems: 'center',
                // borderWidth: isvalid ? 0 : 2, borderRadius: 10, borderColor: "#fa5555",
                paddingHorizontal: 5
            }}>
                {players.map((player, index) => {
                    const name = player.name.toLowerCase()
                    const isdefaultname = name == 'player1' || name == 'player2'
                    return (
                        <View
                            style={{
                                // borderWidth: 2,
                                borderRadius: 20,
                                margin: 10,
                                padding: 10,
                                width: Dimensions.get('window').width * 0.5,
                                backgroundColor: "#ddd"
                            }}
                            key={index}>
                            <TextInput

                                style={{
                                    color: "#000",
                                    fontSize: 30,
                                    // textAlign: 'center',
                                    paddingVertical: 0,
                                    textTransform: 'capitalize'
                                }}

                                numberOfLines={1}
                                maxLength={15}

                                placeholderTextColor={"#333"}
                                placeholder={isdefaultname ? player.name.toUpperCase() : undefined}
                                onChangeText={(text) => {
                                    if (text.length < 16)
                                        player.name = text
                                    console.log(player.name)
                                }}
                            />
                        </View>
                    )
                })}
                <ShadowButton
                    label='start'
                    elevation={7.5}
                    textStyles={{ color: "#fff", fontSize: 30, fontWeight: 'bold' }}
                    style={GlobalStyles.button}
                    onPress={() => {
                        // @ts-ignore
                        players[0].marker = (((Math.random() * 10) % 2).toFixed(0) == 1
                            ? 'x'
                            : 'o')
                        players[1].marker = players[0].marker == 'x' ? 'o' : 'x'
                        // console.log(players)

                        navigation.navigate('OfflineGamePage', { players: players })
                        // getMarker() {
                        //     let marker = ''
                        //     if (this.markers.length == 0) {
                        //         marker = 
                        //     }
                        //     else {
                        //         marker = (this.markers.includes('x')
                        //             ? 'o'
                        //             : 'x')
                        //     }
                        //     this.markers.push(marker)
                        //     return marker
                        // }
                    }}
                />
            </View>
        </View>
    )
}

export default PlayersNameField

const styles = StyleSheet.create({
    input: {

    }
})