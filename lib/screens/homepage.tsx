
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ShadowButton from '../widgets/button'




function HomePage({ navigation }: any): JSX.Element {
    const [onlinetypevisible, setonlinetypevisible] = useState(false)
    return (
        <View style={styles.center}>
            <Modal
                visible={onlinetypevisible}
                onRequestClose={() => setonlinetypevisible(false)}
                transparent>
                <View style={[styles.center, { backgroundColor: "#00000099" }]}>
                    <View style={[styles.center, { flex: 0, backgroundColor: "#fff", borderRadius: 20, padding: 20 }]}>
                        <Pressable
                            onPress={() => setonlinetypevisible(false)}
                            style={{ alignSelf: 'flex-end', borderWidth: 2, borderRadius: 50, width: 40, height: 40, justifyContent: 'center', }}>
                            <Text style={{ color: "#f00", fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>X</Text>
                        </Pressable>
                        <Text style={{ color: "#000", fontSize: 30, fontWeight: 'bold' }}>Hi</Text>
                        <ShadowButton
                            label='Create Game'
                            onPress={() => { }}
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
            <Text style={styles.title}>
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

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: '600',
        alignSelf: 'center',
        color: "#0ff",
        textTransform: 'uppercase'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        // padding: 20,
        // borderRadius: 20,
        // marginVertical: 20,
        // borderWidth: 1,
        // elevation: 10,
        backgroundColor: "#a0f",
        position: 'absolute',
    },
    shadowbox: {
        // padding: 10,
        // borderRadius: 20,
        alignSelf: 'stretch',
        backgroundColor: "#0f9",
    },
})

export default HomePage
