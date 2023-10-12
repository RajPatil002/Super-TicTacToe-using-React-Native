
import { Dimensions, Keyboard, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Server } from '../../game/serverconnect'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { stackParams } from '../../../App'
import GlobalStyles from '../../widgets/styles'
import CodeBox from './codebox'
import ConnectModeBox from './connectmodebox'
import { CloseButton, ShadowButton } from '../../widgets/button'
import WinnerBox from '../game/winnerbox'
import PlayersNameField from './playersnamefield'




const HomePage: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<stackParams>>()
    const [onlinemode, setOnlineModeVisible] = useState(false)
    const [namefields, setNameField] = useState(false)
    const codebox = useState(false)
    console.log('hi', codebox)
    return (
        <View style={GlobalStyles.center}>
            <Modal
                visible={onlinemode}
                onRequestClose={() => setOnlineModeVisible(false)}
                transparent>
                <View style={[GlobalStyles.center, { backgroundColor: "#00000099" }]}>
                    <View style={[GlobalStyles.center, style.box]}>
                        <CloseButton
                            onPress={codebox[0] ? () => {
                                codebox[1](false)
                            } : () => setOnlineModeVisible(false)} />
                        {codebox[0]
                            ? <CodeBox
                                visible={codebox}
                                navigation={navigation}
                            />
                            : <ConnectModeBox
                                visible={codebox}
                                navigation={navigation}
                            />}
                    </View>
                </View>
            </Modal>

            <Modal
                visible={namefields}
                onRequestClose={() => setOnlineModeVisible(false)}
                transparent>
                <View style={[GlobalStyles.center, { backgroundColor: "#00000099" }]}>
                    <View style={[GlobalStyles.center, style.box]}>
                        <CloseButton
                            onPress={() => setNameField(false)} />
                        <PlayersNameField navigation={navigation} />

                    </View>
                </View>
            </Modal>
            <Text style={GlobalStyles.title}>
                Welcome To TicTacToe
            </Text>
            <ShadowButton label={'Online'}
                textStyles={style.buttontext}
                style={GlobalStyles.button}
                elevation={7.5}
                onPress={() => {
                    console.log('press')
                    setOnlineModeVisible(false)
                    setOnlineModeVisible(true)
                }}
            />
            <ShadowButton label={'Offline'}
                textStyles={style.buttontext}
                style={GlobalStyles.button}
                elevation={7.5}
                onPress={() => setNameField(true)}
            />
        </View>
    )
}

const style = StyleSheet.create({
    box: { flex: 0, backgroundColor: "#fff", borderRadius: 20, padding: 20 },
    buttontext: { color: "#fff", fontSize: 30, fontWeight: 'bold' }

})
export default HomePage
