
import { Dimensions, Image, Keyboard, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
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
    return (
        <View style={[GlobalStyles.center, GlobalStyles.background]}>
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
            <View style={{ flex: 1, }}>
                <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('./../../../assets/img/bottom.png')}
                            style={{
                                margin: 20,
                                width: Dimensions.get('window').width,
                                height: Dimensions.get('window').width,
                                position: 'relative'
                            }}
                            width={100}
                            resizeMode='contain'
                        />
                        <View style={[{ position: 'absolute', }, GlobalStyles.center]}>
                            <ShadowButton label={'Online'}
                                textStyles={GlobalStyles.buttontext}
                                style={GlobalStyles.button}
                                elevation={5}
                                onPress={() => {
                                    setOnlineModeVisible(false)
                                    setOnlineModeVisible(true)
                                }}
                            />
                            <ShadowButton label={'Offline'}
                                textStyles={GlobalStyles.buttontext}
                                style={GlobalStyles.button}
                                elevation={5}
                                onPress={() => setNameField(true)}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ position: 'absolute' }}>
                    <View style={style.banner}>
                        <Image
                            source={require('./../../../assets/img/super_tic_tac_toe.png')}
                            style={{
                                margin: 20,
                                width: Dimensions.get('window').width,
                                height: Dimensions.get('window').width,
                            }}
                            width={100}
                            resizeMode='contain'
                        />
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    box: { flex: 0, backgroundColor: "#fff", borderRadius: 20, padding: 20 },
    banner: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom: {
        flex: 1,
        alignItems: 'center',
    },

})
export default HomePage
