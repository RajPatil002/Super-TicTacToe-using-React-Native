import { Dimensions, FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GameBox from './gamebox'
import SocketServer, { Server } from '../../game/serverconnect'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { stackParams } from '../../../App'
import { CloseButton, ShadowButton } from '../../widgets/button'
import GlobalStyles from '../../widgets/styles'
import { useNavigation } from '@react-navigation/native'
import BigGame from '../../game/biggame'

type Props = NativeStackNavigationProp<stackParams, 'OnlineGamePage'>

type marker = "x" | 'o'
type move = { br: number, bc: number, r: number, c: number, marker: marker }
type playerstatus = { status: { ready: boolean, connected: boolean }, marker: marker | undefined }
type players = {
    players: {
        you: any,
        opponent: any
    }
}
type start = {
    turn: boolean,
    start: boolean
}

type turn = { turn: boolean }

const OnlineGamePage: React.FC<Props> = (props) => {
    const [_, setState] = useState()
    // @ts-ignore
    const { route } = props
    const navigation = useNavigation()
    const { port, createdbyid } = route.params
    const [socket, setSocket] = useState<SocketServer | null>();


    const [you, setYou] = useState<playerstatus>({ status: { ready: false, connected: false }, marker: undefined })
    const [opponent, setOpponent] = useState<playerstatus>({ status: { ready: false, connected: false }, marker: undefined })
    // const [move, setMove] = useState<move>()

    // game
    const [bigbox, __] = useState(new BigGame())

    // game stats
    const [availableboxr, setavailableboxr] = useState<number | undefined>()
    const [availableboxc, setavailableboxc] = useState<number | undefined>()
    const [turn, setTurn] = useState(false)
    // const [marker, setMarker] = useState<'x' | 'o'>('x')
    // const [winner, setWinner] = useState<player | undefined>()


    // const [timer, setTimer] = useState<NodeJS.Timeout | undefined>()
    const [clicked, setClick] = useState(false)
    const [start, setStart] = useState(false)





    useEffect(() => {
        // const soc = 
        console.log("created")
        setSocket(new SocketServer(port))
    }, [])

    // useEffect(() => {
    //     console.log(countdown, timer, "2sasas")
    //     if (countdown == 0) {
    //         console.log(timer, "sasas")
    //         clearInterval(timer)
    //         setTimer(undefined)
    //         setCountdown(undefined)
    //         // console.log(timer, "2sasas")
    //     }
    // }, [countdown])

    // useEffect(() => {
    //     console.log("timer here")
    //     if (startCount) {
    //         console.log("timer init")
    //         if (countdown) {
    //             let counter = countdown
    //             setTimer(setInterval(() => {
    //                 console.log(counter)
    //                 if (counter > 0) {
    //                     counter -= 1
    //                     setCountdown(counter)
    //                 }
    //                 // if (counter == 0) {
    //                 //     console.log("timer dead", timer)
    //                 //     clearInterval(timer)
    //                 //     setTimer(undefined)
    //                 //     setCountdown(undefined)
    //                 // }
    //             }, 1000))
    //             // setTimeout(() => {

    //             // }, countdown * 1000)
    //         }
    //     } else {
    //         console.log("timer dead1", timer)
    //         clearInterval(timer)
    //         setTimer(undefined)
    //         setCountdown(undefined)
    //         if (timer) {
    //         }
    //     }
    // }, [startCount])
    useEffect(() => {
        if (socket) {
            console.log("here")
            socket.websocket.onopen = () => {
                console.log("Connected1")
                socket.websocket.onmessage = (message) => {
                    // console.log("mssg" + (message.data.toString()))
                    const data: ({ move: move } & turn) | players | start | turn = JSON.parse(message.data.toString())
                    console.log(data)

                    if ('start' in data) {
                        if (data.start) {
                            // setCountdown(data.start.countdown)
                            // setStartCount(true)
                            setStart(true)
                            setTurn(data.turn)
                        }
                        // console.log(data.start.countdown)
                        // if (countdown) {
                        //     setCountdown()
                        // }
                    } else if ('move' in data) {
                        console.log(data.move)
                        const move: move = data.move
                        // setMove(data)
                        const win = bigbox.bigbox[move.br][move.bc].updateGameBox(move.r, move.c, move.marker)
                        if (win) {
                            if (bigbox.checkBigBoxStatus(move.marker)) {
                                console.log(move.marker)
                                // setWinner(you.marker == move.marker ? you : opponent)
                                console.log('die')
                                return
                            }
                        }
                        if (bigbox.isNextBoxAvailable(move.r, move.c)) {
                            console.log(move.r, move.c)
                            setavailableboxr(move.r)
                            setavailableboxc(move.c)
                        } else {
                            setavailableboxr(undefined)
                            setavailableboxc(undefined)
                        }
                        setTurn(data.turn)
                        // setC(count + 1)
                        // setMarker(move.marker == 'o' ? 'x' : 'o')
                        // this.sendToOtherPlayer(message.toString(), ws.id)
                        // this.changeTurn(ws.id)
                    } else if ('players' in data) {
                        setYou(data.players.you)
                        setOpponent(data.players.opponent)
                        setClick(false)
                    } else if ('turn' in data) {
                        setTurn(data.turn)
                    }

                    setState(undefined)
                }
            }
            // socket.websocket.onclose = () => navigation.goBack()
        }
    }, [socket])
    return (
        <View style={[styles.window]}>
            <Modal
                visible={!start}
                // onRequestClose={() => setPort(undefined)}
                transparent>
                <View style={[GlobalStyles.center, { backgroundColor: "#00000099" }]}>
                    <View style={[GlobalStyles.center, { flex: 0, backgroundColor: "#fff", borderRadius: 20, padding: 20 }]}>
                        <CloseButton
                            onPress={() => {
                                if (socket) {
                                    socket.websocket.close()
                                    navigation.goBack()
                                }
                            }}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: "#000", fontSize: 15, letterSpacing: 2, textTransform: 'capitalize' }}> connect code </Text>
                            <Text style={{ color: "#6d33ff", fontSize: 30, fontWeight: '900', letterSpacing: 5 }}>{port}</Text>

                        </View>

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
                            onPress={(!start)
                                ? !clicked ? () => {
                                    // const port: { port: string | undefined } = await Server.getPort()
                                    console.log("typeof (port.port)")
                                    setClick(true)
                                    if (socket) {
                                        socket.sendReadyStatus(!you.status.ready)
                                    }
                                    // setReady(!ready)
                                } : null
                                : null}
                            elevation={(!start) ? 7.5 : 0}
                            textStyles={{ color: "#fff", fontSize: 30, fontWeight: 'bold' }}
                            style={GlobalStyles.button}
                        />
                    </View>
                </View>
            </Modal>
            <View style={styles.gridbackground}>
                <GameBox
                    online={true}
                    bigbox={bigbox}
                    onMark={async (bigrow: number, bigcolumn: number, row: number, column: number) => {
                        const move: move = { br: bigrow, bc: bigcolumn, r: row, c: column, marker: you.marker! }
                        console.log("move", move)
                        if (socket) {
                            await socket.sendMove(move)
                        }

                    }}
                    nextboxrow={availableboxr}
                    nextboxcolumn={availableboxc}
                    turn={turn}
                />
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