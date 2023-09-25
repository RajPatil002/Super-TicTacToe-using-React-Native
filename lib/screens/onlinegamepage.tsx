import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GameBox from './gamebox'
import SocketServer from '../game/serverconnect'

function OnlineGamePage(): JSX.Element {
    const [_, setState] = useState()
    useEffect(() => {
        console.log("here")
        const socket = new SocketServer(1000)
        socket.websocket.onopen = () => console.log("Connected1")
        socket.websocket.onmessage = (message) => {
            console.log(message.toString())
            setState(undefined)
        }
    }, [])
    return (
        <View style={[styles.window]}>
            <View style={{ flex: 1, justifyContent: 'center' }}>

                <View style={styles.gridbackground}>
                    <GameBox
                        online={true}
                    />
                </View>
            </View>
        </View>
    )
}

export default OnlineGamePage

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: '600',
        alignSelf: 'center',
        color: "#0ff",
    },
    window: {
        alignContent: 'center',
        justifyContent: "center",
        flex: 1,
    },
    gridbackground: {
        justifyContent: "center",
        alignItems: 'center',
    },
})