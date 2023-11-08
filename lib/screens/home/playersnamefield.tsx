import { Dimensions, StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import GlobalStyles from '../../widgets/styles'
import { ShadowButton } from '../../widgets/button'

const PlayersNameField: React.FC<{
    onStart: (players: Array<player>) => void
}> = ({ onStart }) => {
    const [players, _] = useState<Array<player>>([{ name: 'player1', marker: undefined }, { name: 'player2', marker: undefined }])
    return (
        <View style={[GlobalStyles.center, { flex: 0, }]}>
            <View style={{
                alignItems: 'center',
                paddingHorizontal: 5
            }}>
                {players.map((player, index) => {
                    const name = player.name.toLowerCase()
                    const isdefaultname = name == 'player1' || name == 'player2'
                    return (
                        <View
                            style={{
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
                                    // console.log(player.name)
                                }}
                            />
                        </View>
                    )
                })}
                <ShadowButton
                    label='start'
                    elevation={5}
                    textStyles={GlobalStyles.buttontext}
                    style={GlobalStyles.button}
                    onPress={() => {
                        // @ts-ignore
                        players[0].marker = (((Math.random() * 10) % 2).toFixed(0) == 1
                            ? 'x'
                            : 'o')
                        players[1].marker = players[0].marker == 'x' ? 'o' : 'x'

                        onStart(players)

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