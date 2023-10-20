import { Dimensions, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Server } from '../../game/serverconnect'
import { ShadowButton } from '../../widgets/button'
import GlobalStyles from '../../widgets/styles'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { stackParams } from '../../../App'


const CodeBox: React.FC<{
    visible: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    navigation: NativeStackNavigationProp<stackParams>
}> = ({ visible, navigation }) => {
    const [code, setCode] = useState(['', '', '', ''])
    const [focusnode, setFocusNode] = useState<undefined | number>(undefined)
    const [isvalid, setValid] = useState(true)
    const ref = Array.from({ length: 4 }, () => useRef<any>(null))
    useEffect(() => {
        if (visible && ref[0].current) {
            // // console.log(visible, codebox)
            ref[0].current.focus()
        }
    }, [visible])
    return (
        <View style={[GlobalStyles.center, { flex: 0, }]}>
            <Text style={{ color: "#000", fontSize: 30, fontWeight: 'bold', textTransform: 'uppercase' }}>Enter code</Text>
            <View style={{
                flexDirection: 'row', alignItems: 'center',
                borderWidth: isvalid ? 0 : 2, borderRadius: 10, borderColor: "#fa5555",
                paddingHorizontal: 5
            }}>
                {code.map((singledigit, index) => {
                    const isFocused = focusnode == index
                    // // console.log(focusnode)
                    return <View
                        style={{
                            borderWidth: isFocused ? 5 : 0, borderRadius: 10,
                            margin: 5,
                            backgroundColor: isFocused ? "#fff" : "#ddd"
                        }}
                        key={index}>
                        <View
                            style={[{
                                flex: 0,
                                margin: isFocused
                                    ? 2 : 0,
                                width: Dimensions.get('window').width * 0.125 * 0.8,
                                height: Dimensions.get('window').width * 0.125 * 0.8
                            }]}>
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
                                    if (!isvalid)
                                        setValid(true)
                                    if ((ref[index].current.isFocused())) {
                                        setFocusNode(index)
                                    }
                                }}
                                onKeyPress={(k) => {
                                    if (k.nativeEvent.key == 'Backspace' && index > 0) {
                                        const prev = [...code]
                                        prev[index] = ''
                                        setCode(prev)
                                        ref[index - 1].current.focus()
                                    }
                                }}
                                onChangeText={(text) => {
                                    text = text.replace(/\D/g, '');
                                    const prev = [...code]
                                    prev[index] = text
                                    setCode(prev)
                                    if (text.length != 0)
                                        if (index < ref.length - 1 && ref[index + 1].current != null)
                                            ref[index + 1].current.focus()
                                        else {
                                            ref[index].current.blur()
                                            setFocusNode(undefined)
                                        }
                                }}
                                style={{
                                    color: "#000",
                                    fontSize: 30,
                                    textAlign: 'center',
                                    paddingVertical: 0
                                }} />
                        </View>
                    </View>

                })}
            </View>
            {isvalid ? null : <Text style={{ color: "#fa5555" }}>Enter CODE</Text>}
            <ShadowButton
                label='Join Game'
                onPress={async () => {
                    const port = code.join('')
                    if (port.length == 4) {
                        const resp: { port: string } | undefined = await Server.getPortInformation(port)
                        if (resp != undefined) {
                            navigation.navigate('OnlineGamePage', { port: resp.port, createdbyid: undefined })
                        }
                    } else {
                        setValid(false)
                    }
                }}
                elevation={7.5}
                textStyles={GlobalStyles.buttontext}
                style={GlobalStyles.button}
            />
        </View>
    )
}

export default CodeBox

const styles = StyleSheet.create({
    buttontext: { color: "#fff", fontSize: 30, fontWeight: 'bold' }
})