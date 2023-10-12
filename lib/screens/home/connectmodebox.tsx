import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Server } from '../../game/serverconnect'
import { ShadowButton } from '../../widgets/button'
import GlobalStyles from '../../widgets/styles'
import codebox from './codebox'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { stackParams } from '../../../App'

const ConnectModeBox: React.FC<{
    visible: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    navigation: NativeStackNavigationProp<stackParams>,
}> = ({ visible, navigation }) => {
    const [_, setBox] = visible
    const [clicked, setClick] = useState(false)
    return (
        <View style={[GlobalStyles.center, { flex: 0 }]}>
            <Text style={{ color: "#000", fontSize: 30, fontWeight: 'bold', textTransform: 'uppercase' }}>game</Text>
            <ShadowButton
                label='Create Game'
                onPress={clicked
                    ? (async () => {
                        setClick(true)
                        const resp: { port: string, createdbyid: string } | undefined = await Server.getPort()
                        if (resp != undefined) {
                            navigation.navigate('OnlineGamePage', { port: resp.port, createdbyid: resp.createdbyid })
                        }
                        setClick(false)
                    }) : null}
                elevation={7.5}
                textStyles={GlobalStyles.buttontext}
                style={GlobalStyles.button}
            />
            <ShadowButton
                label='Join Game'
                onPress={() => {
                    setBox(true)
                }}
                elevation={7.5}
                textStyles={GlobalStyles.buttontext}
                style={GlobalStyles.button}
            />
        </View>
    )
}

export default ConnectModeBox

// const style = StyleSheet.create({
//     buttontext: { color: "#fff", fontSize: 30, fontWeight: 'bold' }
// })