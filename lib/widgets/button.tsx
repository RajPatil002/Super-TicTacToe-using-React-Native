
import { Button, ColorValue, GestureResponderEvent, Pressable, PressableProps, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React, { JSXElementConstructor, ReactNode, useState } from 'react'


console.log("123")
const ShadowButton: React.FC<{
    label: string,
    textStyles?: StyleProp<TextStyle>,
    style?: ViewStyle,
    shadowColor?: ColorValue,
    elevation?: number,
    onPress: () => void
}> = ({ label,
    textStyles,
    shadowColor = "#c5c5c5",
    style = { margin: 0 },
    elevation = 5,
    onPress
}) => {
        // const [margin, _] = style.margin ? useState(style.margin) : useState(0)
        const { margin, ...newstyle } = style
        // const margin = style.margin ?? 0
        // style.margin = 0
        // console.log(style.margin, style)
        const [pressed, setIsPressed] = useState(false)
        return <Pressable
            onPress={() => setTimeout(onPress, 100)}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}>
            <View
                style={{ position: 'relative', flexDirection: 'row', margin: margin, }}>
                <View style={[newstyle, { margin: 0, marginLeft: elevation, marginTop: elevation, backgroundColor: shadowColor, padding: 10 },]}>
                    <Text style={[textStyles, { color: shadowColor },]}>
                        {label}
                    </Text>
                </View>
                <View
                    style={[
                        { backgroundColor: "#fff", padding: 10, borderWidth: 1 },
                        newstyle, { position: 'absolute' },
                        pressed ? { marginTop: elevation, marginLeft: elevation } : {}]}>
                    <Text style={[{ color: "#000" }, textStyles]}>
                        {label}
                    </Text>
                </View>
            </View>
        </Pressable>
    }

const CloseButton: React.FC<{
    onPress: () => void
}> = ({ onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={{ alignSelf: 'flex-end', borderWidth: 1, borderRadius: 50, width: 35, height: 35, justifyContent: 'center', }}>
            <Text style={{ color: "#fa5555", fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>X</Text>
        </Pressable>)
}


export { CloseButton, ShadowButton }