import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Server } from '../../game/serverconnect'
import { ShadowButton } from '../../widgets/button'
import GlobalStyles from '../../widgets/styles'

const width = Dimensions.get('window').width

const CodeBox: React.FC<{
    visiblecodebox: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    onStart: (port: string) => void
}> = ({ visiblecodebox: visible, onStart }) => {

    const [_, setBox] = visible

    // room code
    const [code, setCode] = useState(['', '', '', ''])

    // text input validations and focus nodes
    const [focusnode, setFocusNode] = useState<undefined | number>(undefined)
    const [isvalid, setValid] = useState(true)
    const [isvalidcode, setValidCode] = useState(true)
    const ref = Array.from({ length: 4 }, () => useRef<any>(null))

    useEffect(() => {
        if (visible && ref[0].current) {
            // // console.log(visible, codebox)
            ref[0].current.focus()
        }
    }, [visible])



    return (
        <View style={[GlobalStyles.center, { flex: 0, }]}>
            <Text style={{ color: "#000", fontSize: width / 14, fontWeight: 'bold', textTransform: 'uppercase' }}>Enter code</Text>
            <View style={{
                flexDirection: 'row', alignItems: 'center',
                borderWidth: isvalid ? 0 : width / 180, borderRadius: 10, borderColor: "#fa5555",
                paddingHorizontal: 5
            }}>
                {code.map((singledigit, index) => {
                    const isFocused = focusnode == index
                    // // console.log(focusnode)
                    return <View
                        style={{
                            borderWidth: isFocused ? width / 120 : 0, borderRadius: 10,
                            margin: 5,
                            backgroundColor: isFocused ? "#fff" : "#ddd"
                        }}
                        key={index}>
                        <View
                            style={[{
                                flex: 0,
                                margin: isFocused
                                    ? 2 : 0,
                                width: width * 0.125 * 0.8,
                                height: width * 0.125 * 0.8
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
                                    if (!isvalidcode)
                                        setValidCode(true)
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
                                    console.log(text)
                                    text = text.replace(/\D/g, '');
                                    console.log(text)
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
            {isvalidcode ? null : <Text style={{ color: "#fa5555" }}>Invalid CODE</Text>}
            <ShadowButton
                label='Join Game'
                onPress={async () => {
                    const port = code.join('')
                    if (port.length == 4) {
                        const resp: portinfo = await Server.getPortInformation(port)
                        if (resp && resp.port && resp.connected > 0) {
                            setBox(false)
                            onStart(resp.port)
                        } else {
                            setValidCode(false)
                        }
                    } else {
                        setValid(false)
                    }
                }}
                elevation={5}
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