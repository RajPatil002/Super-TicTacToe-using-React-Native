import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { Server } from '../../game/serverconnect'
import { ShadowButton } from '../../widgets/button'
import GlobalStyles from '../../widgets/styles'
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
            <Text style={{ color: "#000", fontSize: 30, fontWeight: 'bold', textTransform: 'uppercase' }}>select</Text>
            <ShadowButton
                label='Create Game'
                onPress={(async () => {
                    setClick(true)
                    const resp: { port: string, createdbyid: string } | undefined = await Server.getPort()
                    console.log("Error?", resp)
                    if (resp != undefined) {
                        navigation.navigate('OnlineGamePage', { port: resp.port, createdbyid: resp.createdbyid })
                    } else {
                        console.log("Error")
                    }
                    setClick(false)
                })}
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