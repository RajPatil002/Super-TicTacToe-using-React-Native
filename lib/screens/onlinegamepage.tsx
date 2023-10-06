import { Dimensions, FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GameBox from './gamebox'
import SocketServer, { Server } from '../game/serverconnect'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { stackParams } from '../../App'
import ShadowButton from '../widgets/button'
import GlobalStyles from '../widgets/styles'
import { useNavigation } from '@react-navigation/native'

type Props = NativeStackNavigationProp<stackParams, 'OnlineGamePage'>
type playerstatus = { status: { ready: boolean, connected: boolean }, marker: string | undefined }
type move = { move: { br: number, bc: number, r: number, c: number, marker: string } }
type players = {
    players: {
        you: any,
        opponent: any
    }
}
type start = {
    turn: boolean,
    start: {
        countdown: number
    }
}

const OnlineGamePage: React.FC<Props> = (props) => {
    const [_, setState] = useState()
    const { route } = props
    const navigation = useNavigation()
    const { port, createdbyid } = route.params
    const [socket, setSocket] = useState<SocketServer | null>();
    const [you, setYou] = useState<playerstatus>({ status: { ready: false, connected: false }, marker: undefined })
    const [opponent, setOpponent] = useState<playerstatus>({ status: { ready: false, connected: false }, marker: undefined })
    const [countdown, setCountdown] = useState<number | undefined>()
    const [startCount, setStartCount] = useState(false)
    useEffect(() => {
        // const soc = 
        setSocket(new SocketServer(port))
    }, [])

    useEffect(() => {
        console.log("timer here")
        if (startCount) {
            console.log("timer init")
            if (countdown) {
                let counter = countdown
                const timer = setInterval(() => {
                    counter -= 1
                    setCountdown(counter)
                    console.log(counter)
                    if (counter == 0) {
                        console.log("timer dead")
                        clearInterval(timer)

                    }
                }, 1000)
            }
            // setTimeout(() => , countdown * 1000)
        }
    }, [startCount])
    useEffect(() => {
        if (socket) {
            console.log("here")
            socket.websocket.onopen = () => {
                console.log("Connected1")
                // socket.websocket.send(JSON.stringify({
                //     name: "Raj",
                //     createdbyid: createdbyid
                // }))
                socket.websocket.onmessage = (message) => {
                    console.log("mssg" + (message.data.toString()))
                    const data: move | players | start = JSON.parse(message.data.toString())
                    // console.log(data.players)
                    if ('players' in data) {
                        setYou(data.players.you)
                        setOpponent(data.players.opponent)
                    }
                    else if ('move' in data) {
                        console.log(data.move)
                        // this.sendToOtherPlayer(message.toString(), ws.id)
                        // this.changeTurn(ws.id)
                    } else if ('start' in data) {
                        setCountdown(data.start.countdown)
                        setStartCount(true)
                        console.log(data.start.countdown)
                        // if (countdown) {
                        //     setCountdown()
                        // }
                    }

                    setState(undefined)
                }
            }
            socket.websocket.onclose = () => navigation.goBack()
        }
    }, [socket])
    return (
        <View style={[styles.window]}>
            <Modal
                visible={!(you.status.ready && opponent.status.ready && countdown == 0)}
                // onRequestClose={() => setPort(undefined)}
                transparent>
                <View style={[GlobalStyles.center, { backgroundColor: "#00000099" }]}>
                    <View style={[GlobalStyles.center, { flex: 0, backgroundColor: "#fff", borderRadius: 20, padding: 20 }]}>
                        <Pressable
                            onPress={() => {

                            }}
                            style={{ alignSelf: 'flex-end', borderWidth: 2, borderRadius: 50, width: 40, height: 40, justifyContent: 'center', }}>
                            <Text style={{ color: "#f00", fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>X</Text>
                        </Pressable>

                        <Text style={{ color: "#000", fontSize: 30, fontWeight: 'bold' }}>{port}</Text>
                        {countdown != undefined ? <Text style={{ color: "#f07", fontSize: 30, fontWeight: 'bold' }}>{countdown}</Text> : null}

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{
                                borderWidth: 0.5, borderColor: "#000",
                                justifyContent: 'center', borderRadius: 17.5,
                                padding: 5,
                                backgroundColor: you.status.connected ? '#3f5' : '#f35'
                            }}>

                                <View style={{
                                    backgroundColor: "#000",
                                    justifyContent: 'center', borderRadius: 15,
                                    width: Dimensions.get('window').width * 0.3,

                                }}>
                                    <View style={{ alignItems: 'flex-start', padding: 20 }}>
                                        <Text style={{ fontSize: 20, textTransform: 'uppercase', }} numberOfLines={1}>You</Text>
                                        <Text style={{ color: you.status.ready ? '#3f5' : '#f35' }}>{you.status.ready ? 'Ready' : 'Not Ready'}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ width: 75, backgroundColor: "#fff" }}></View>
                            <View style={{
                                borderWidth: 0.5, borderColor: "#000",
                                justifyContent: 'center', borderRadius: 17.5,
                                padding: 5,
                                backgroundColor: opponent.status.connected ? '#3f5' : '#f35'
                            }}>
                                <View style={{
                                    backgroundColor: "#000",
                                    justifyContent: 'center',
                                    borderRadius: 15,
                                    width: Dimensions.get('window').width * 0.3,
                                }}>
                                    <View style={{ alignItems: 'flex-start', padding: 20 }}>
                                        {/* <Text>{((mytextvar).length > maxlimit) ?
                                        (((mytextvar).substring(0, maxlimit - 3)) + '...') :
                                        mytextvar}
                                    </Text> */}
                                        <Text style={{ fontSize: 20, textTransform: 'uppercase', }} numberOfLines={1}>{opponent.status.connected ? 'opponent' : 'waiting'}</Text>
                                        <Text style={{ color: opponent.status.ready ? '#3f5' : '#f35' }}>{opponent.status.ready ? 'Ready' : 'Not Ready'}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <ShadowButton
                            label={!you.status.ready ? 'Ready' : 'Not Ready'}
                            onPress={async () => {
                                // const port: { port: string | undefined } = await Server.getPort()
                                // console.log(typeof (port.port))
                                if (socket) {
                                    socket.sendReadyStatus(!you.status.ready)
                                }
                                // setReady(!ready)
                            }}
                            textStyles={{ color: "#fff", fontSize: 30, fontWeight: 'bold' }}
                            style={{
                                borderColor: "#000", borderWidth: 0, borderRadius: 10, backgroundColor: "#6d33ff", paddingHorizontal: 20, margin: 10
                            }}
                        />
                    </View>
                </View>
            </Modal>
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