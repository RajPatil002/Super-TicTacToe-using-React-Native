
import { Dimensions, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ShadowButton from '../widgets/button'
import { Server } from '../game/serverconnect'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { stackParams } from '../../App'
import GlobalStyles from '../widgets/styles'




function HomePage(): JSX.Element {
    const navigation = useNavigation<NativeStackNavigationProp<stackParams>>()
    const [onlinetypevisible, setonlinetypevisible] = useState(false)
    const [joinbox, setJoinBox] = useState(true)
    const [code, setCode] = useState(['', '', '', ''])
    const [focusnode, setFocusNode] = useState<undefined | number>(undefined)
    const ref = Array.from({ length: 4 }, () => useRef(null))
    useEffect(() => {
        if (joinbox) {
            ref[0].current.focus()
        }
    }, [joinbox])
    // const [port, setPort] = useState<undefined | string>()
    // return (
    //     <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
    //         <View style={{ width: Dimensions.get('screen').width * 0.35, height: Dimensions.get('screen').height * 0.25, backgroundColor: "#0ff" }}></View>
    //         <View style={{ width: Dimensions.get('window').width * 0.35, height: Dimensions.get('window').height * 0.25, backgroundColor: "#f0f" }}></View>

    //     </View>
    // )
    console.log(code)
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
                            onPress={() => {
                                setJoinBox(true)
                                setonlinetypevisible(false)
                            }}
                            textStyles={{ color: "#fff", fontSize: 30, fontWeight: 'bold' }}
                            style={{
                                borderColor: "#000", borderWidth: 0, borderRadius: 10, backgroundColor: "#6d33ff", paddingHorizontal: 20, margin: 10
                            }}
                        />
                    </View>
                </View>
            </Modal>
            <Modal
                visible={true}
                onRequestClose={() => {
                    setJoinBox(false)
                    setonlinetypevisible(true)
                }}
                transparent>
                <View style={[GlobalStyles.center, { backgroundColor: "#00000099" }]}>
                    <View style={[GlobalStyles.center, { flex: 0, backgroundColor: "#fff", borderRadius: 20, padding: 20 }]}>
                        <Pressable
                            onPress={() => setonlinetypevisible(false)}
                            style={{ alignSelf: 'flex-end', borderWidth: 2, borderRadius: 50, width: 40, height: 40, justifyContent: 'center', }}>
                            <Text style={{ color: "#f00", fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>X</Text>
                        </Pressable>
                        <Text style={{ color: "#000", fontSize: 30, fontWeight: 'bold', textTransform: 'uppercase' }}>Enter code</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {code.map((singledigit, index) => {
                                console.log((ref[index].current != null ? ref[index].current.isFocused() : index == 0))
                                const isFocused = focusnode == index
                                return <View
                                    style={{
                                        borderWidth: isFocused ? 5 : 2, borderRadius: 10,
                                        margin: 5,
                                    }}
                                    key={index}>
                                    <View
                                        style={[{
                                            flex: 0,
                                            margin: isFocused
                                                ? 2 : 0,
                                            width: Dimensions.get('window').width * 0.125 * 0.8, height: Dimensions.get('window').width * 0.125 * 0.8
                                        }]}>
                                        {/* <TextInput ref={ref[index]} /> */}
                                        <TextInput
                                            ref={ref[index]}
                                            numberOfLines={1}
                                            maxLength={1}
                                            autoFocus={index == 0}
                                            keyboardType='numeric'
                                            caretHidden={true}
                                            value={''}
                                            placeholder={singledigit}
                                            placeholderTextColor={"#000"}
                                            inputMode='numeric'
                                            onFocus={() => {
                                                if ((ref[index].current.isFocused())) {
                                                    setFocusNode(index)
                                                }
                                            }}
                                            onKeyPress={(k) => {
                                                if (k.nativeEvent.key == 'Backspace' && index > 0) {
                                                    ref[index - 1].current.focus()
                                                }
                                            }}
                                            onChangeText={(text) => {
                                                text = text.replace(/\D/g, '');
                                                const prev = [...code]
                                                console.log(text)
                                                prev[index] = text
                                                setCode(prev)
                                                if (text.length != 0)
                                                    if (index < ref.length - 1 && ref[index + 1].current != null)
                                                        ref[index + 1].current.focus()
                                                    else {
                                                        ref[index].current.blur()
                                                        setFocusNode(undefined)
                                                    }
                                                // else

                                                // setFocusNode(focusnode + 1)
                                            }}
                                            style={{
                                                color: "#000",
                                                fontSize: 30,
                                                textAlign: 'center',
                                                paddingVertical: 0
                                            }} />
                                    </View>
                                </View>

                            })}</View>
                        <ShadowButton
                            label='Join Game'
                            onPress={async () => {
                                const port = code.join('')
                                if (port.length == 4) {
                                    const resp: { port: string } | undefined = await Server.getPortInformation(port)
                                    if (resp != undefined) {
                                        navigation.navigate('OnlineGamePage', { port: resp.port, createdbyid: undefined })
                                    }
                                }
                            }}
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
