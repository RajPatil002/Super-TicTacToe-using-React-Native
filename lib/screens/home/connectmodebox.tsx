import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
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
    const [box, setBox] = visible
    return (
        <View style={[GlobalStyles.center, { flex: 0 }]}>
            <Text style={{ color: "#000", fontSize: 30, fontWeight: 'bold' }}>Hi</Text>
            <ShadowButton
                label='Create Game'
                onPress={async () => {
                    const resp: { port: string, createdbyid: string } | undefined = await Server.getPort()
                    // console.log(typeof (resp.port))
                    if (resp != undefined) {
                        // setonlinetypevisible(false)
                        // setPort(port.port)
                        navigation.navigate('OnlineGamePage', { port: resp.port, createdbyid: resp.createdbyid })
                    }
                }}
                elevation={7.5}
                textStyles={style.buttontext}
                style={GlobalStyles.button}
            />
            <ShadowButton
                label='Join Game'
                onPress={() => {
                    setBox(true)
                    // setonlinetypevisible(false)
                }}
                elevation={7.5}
                textStyles={{ color: "#fff", fontSize: 30, fontWeight: 'bold' }}
                style={GlobalStyles.button}
            />
        </View>
    )
}

export default ConnectModeBox

const style = StyleSheet.create({
    buttontext: { color: "#fff", fontSize: 30, fontWeight: 'bold' }
})