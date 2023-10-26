
import { ColorValue, Pressable, StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'


const ShadowButton: React.FC<{
    label: string,
    textStyles?: StyleProp<TextStyle>,
    style?: ViewStyle,
    shadowColor?: ColorValue,
    elevation?: number,
    onPress: (() => void) | null | undefined
}> = ({ label,
    textStyles,
    shadowColor = "#c3c3c3",
    style = { margin: 0 },
    elevation = 5,
    onPress
}) => {
        const { margin, ...newstyle } = style
        const [pressed, setIsPressed] = useState(false)
        return <Pressable
            onPress={onPress ? () => setTimeout(onPress, 100) : null}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}>
            <View
                style={{ position: 'relative', flexDirection: 'row', margin: margin, }}>
                <View style={[newstyle, { margin: 0, marginLeft: elevation, marginTop: elevation, backgroundColor: shadowColor, padding: 10, borderColor: shadowColor },]}>
                    <Text style={[textStyles, { color: shadowColor },]}>
                        {label}
                    </Text>
                </View>
                <View
                    style={[
                        { backgroundColor: "#fff", padding: 10, },
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
            style={{ alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center' }}>
            <FontAwesome5Icon name='times-circle' size={30} color={"#fa5555"} />
        </Pressable>)
}


export { CloseButton, ShadowButton }