
import { Dimensions, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ShadowButton from '../widgets/button'
import { Server } from '../game/serverconnect'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { stackParams } from '../../App'
import GlobalStyles from '../widgets/styles'




function HomePage(): JSX.Element {
    const navigation = useNavigation<NativeStackNavigationProp<stackParams>>()
    const [onlinetypevisible, setonlinetypevisible] = useState(false)
    // const [port, setPort] = useState<undefined | string>()
    // return (
    //     <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
    //         <View style={{ width: Dimensions.get('screen').width * 0.35, height: Dimensions.get('screen').height * 0.25, backgroundColor: "#0ff" }}></View>
    //         <View style={{ width: Dimensions.get('window').width * 0.35, height: Dimensions.get('window').height * 0.25, backgroundColor: "#f0f" }}></View>

    //     </View>
    // )
    return (
        <View style={GlobalStyles.center}>
            <Modal
                visible={onlinetypevisible}
                onRequestClose={() => setonlinetypevisible(false)}
                transparent>
                <View style={[GlobalStyles.center, { backgroundColor: "#00000099" }]}>
                    <View style={[GlobalStyles.center, { flex: 0, backgroundColor: "#fff", borderRadius: 20, padding: 20 }]}>
                        <Pressable
                            onPress={() => setonlinetypevisible(false)}
                            style={{ alignSelf: 'flex-end', borderWidth: 2, borderRadius: 50, width: 40, height: 40, justifyContent: 'center', }}>
                            <Text style={{ color: "#f00", fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>X</Text>
                        </Pressable>
                        <Text style={{ color: "#000", fontSize: 30, fontWeight: 'bold' }}>Hi</Text>
                        <ShadowButton
                            label='Create Game'
                            onPress={async () => {
                                const resp: { port: string, createdbyid: string } | undefined = await Server.getPort()
                                // console.log(typeof (resp.port))
                                if (resp != undefined) {
                                    setonlinetypevisible(false)
                                    // setPort(port.port)
                                    navigation.navigate('OnlineGamePage', { port: resp.port, createdbyid: resp.createdbyid })
                                }
                            }}
                            textStyles={{ color: "#fff", fontSize: 30, fontWeight: 'bold' }}
                            style={{
                                borderColor: "#000", borderWidth: 0, borderRadius: 10, backgroundColor: "#6d33ff", paddingHorizontal: 20, margin: 10
                            }}
                        />
                        <ShadowButton
                            label='Join Game'
                            onPress={() => { }}
                            textStyles={{ color: "#fff", fontSize: 30, fontWeight: 'bold' }}
                            style={{
                                borderColor: "#000", borderWidth: 0, borderRadius: 10, backgroundColor: "#6d33ff", paddingHorizontal: 20, margin: 10
                            }}
                        />
                    </View>
                </View>
            </Modal>
            <Text style={GlobalStyles.title}>
                Welcome To TicTacToe
            </Text>
            <ShadowButton label={'Offline'}
                textStyles={{ color: "#fff", fontSize: 30, fontWeight: 'bold' }}
                style={{
                    borderColor: "#000", borderWidth: 0, borderRadius: 10, backgroundColor: "#6d33ff", paddingHorizontal: 20, margin: 10
                }}
                elevation={7.5}
                onPress={() => setonlinetypevisible(true)}
            />
            <ShadowButton label={'Online'}
                textStyles={{ color: "#fff", fontSize: 30, fontWeight: 'bold' }}
                style={{
                    borderColor: "#000", borderWidth: 0, borderRadius: 10, backgroundColor: "#6d33ff", paddingHorizontal: 20, margin: 10
                }}
                elevation={7.5}
                onPress={() => console.log("2")}
            />
        </View>
    )
}

export default HomePage
