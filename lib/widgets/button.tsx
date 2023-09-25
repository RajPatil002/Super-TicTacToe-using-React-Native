
import { Button, ColorValue, GestureResponderEvent, Pressable, PressableProps, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React, { JSXElementConstructor, ReactNode, useState } from 'react'


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
        const [margin, _] = (style as ViewStyle).margin != undefined ? useState((style as ViewStyle).margin) : useState(0)
        style['margin'] = 0
        const [pressed, setIsPressed] = useState(false)
        return <Pressable
            onPress={() => setTimeout(onPress, 100)}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}>
            <View
                style={{ position: 'relative', flexDirection: 'row', margin: margin, }}>
                <View style={[style, { marginLeft: elevation, marginTop: elevation, backgroundColor: shadowColor, padding: 10 },]}>
                    <Text style={[textStyles, { color: shadowColor },]}>
                        {label}
                    </Text>
                </View>
                <View
                    style={[{ backgroundColor: "#fff", padding: 10, borderWidth: 1 }, style, { position: 'absolute' }, pressed ? { marginTop: elevation, marginLeft: elevation } : {}]}>
                    <Text style={[{ color: "#000" }, textStyles]}>
                        {label}
                    </Text>
                </View>
            </View>
        </Pressable>
    }

export default ShadowButton;