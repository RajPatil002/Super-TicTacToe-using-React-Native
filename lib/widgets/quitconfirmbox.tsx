import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ShadowButton } from './button'

const width = Dimensions.get('window').width

const QuitConfirmBox: React.FC<{
    onPress: (confirm: boolean) => void
}> = ({ onPress }) => {
    return (
        <View style={{ alignItems: "center" }}>
            <Text style={{
                fontSize: width / 20,
                fontWeight: 'bold',
                color: "#131313",
                margin: width / 30
            }}>Do you want to quit the game?</Text>
            <View style={{ flexDirection: 'row', backgroundColor: "#f00", justifyContent: "space-around" }}>
                <ShadowButton
                    label='Quit'
                    style={styles.button}
                    textStyles={(styles.buttontext)}
                    onPress={() => {
                        onPress(true)
                    }}
                />
                <ShadowButton
                    label='Resume'
                    style={styles.button}
                    textStyles={(styles.buttontext)}
                    onPress={() => {
                        onPress(false)
                    }}
                />
            </View>
        </View>
    )
}

export default QuitConfirmBox

const styles = StyleSheet.create({
    button: {
        borderRadius: 10, backgroundColor: "#7b00ff", paddingHorizontal: width / 30, margin: 10
    },
    buttontext: { color: "#fff", fontSize: width / 20, }
})
