import { Appearance, Dimensions, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GameBox from './gamebox'
import SocketServer from '../../game/serverconnect'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { stackParams } from '../../../App'
import { CloseButton, ShadowButton } from '../../widgets/button'
import GlobalStyles from '../../widgets/styles'
import { useNavigation } from '@react-navigation/native'
import BigGame from '../../game/biggame'
import PlayerCard from '../../widgets/playercards'
import WinnerBox from './winnerbox'
import GameTimeout from './gametimeout'
import { BackHandler } from 'react-native'
import QuitConfirmBox from '../../widgets/quitconfirmbox'
import Icon from 'react-native-vector-icons/FontAwesome5'

type Props = NativeStackNavigationProp<stackParams, 'OnlineGamePage'>
const width = Dimensions.get('window').width
const theme = Appearance.getColorScheme()


const OnlineGamePage: React.FC<Props> = (props) => {
    // @ts-ignore
    const { route } = props
    const navigation = useNavigation()

    // game server
    const { port, createdbyid } = route.params
    const [socket, setSocket] = useState<SocketServer | null>();
    const [jointime, setJointime] = useState<number | undefined>(undefined)

    // game
    const [bigbox, __] = useState(new BigGame())
    const [you, setYou] = useState<playerstatus>({ status: { ready: false, connected: false }, marker: undefined })
    const [opponent, setOpponent] = useState<playerstatus>({ status: { ready: false, connected: false }, marker: undefined })

    // game stats
    const [availableboxr, setavailableboxr] = useState<number | undefined>()
    const [availableboxc, setavailableboxc] = useState<number | undefined>()
    const [turn, setTurn] = useState(false)
    const [winner, setWinner] = useState<player | undefined>()
    const [winnerbox, setWinnerBox] = useState(false)
    const [clicked, setClick] = useState(false)
    const [start, setStart] = useState(false)
    const [quitbox, setQuitBox] = useState(false)





    useEffect(() => {
        setSocket(new SocketServer(port))
    }, [])

    useEffect(() => {
        if (socket) {
            socket.websocket.onopen = () => {
                socket.websocket.onmessage = (message) => {
                    const data: ({ move: move } & turn) | players | start | turn | { jointime: number, jointimestart: boolean } = JSON.parse(message.data.toString())
                    console.log(data)

                    if ('start' in data) {
                        if (data.start) {
                            setStart(true)
                            setTurn(data.turn)
                        }
                    } else if ('move' in data) {
                        const move: move = data.move
                        const win = bigbox.bigbox[move.br][move.bc].updateGameBox(move.r, move.c, move.marker)
                        if (win) {
                            if (bigbox.checkBigBoxStatus(move.marker)) {
                                setWinner(move.marker == you.marker ? { name: "you", marker: you.marker } : { name: "opponent", marker: opponent.marker })
                                socket.websocket.close()
                                return
                            }
                        }
                        if (bigbox.isNextBoxAvailable(move.r, move.c)) {
                            setavailableboxr(move.r)
                            setavailableboxc(move.c)
                        } else {
                            setavailableboxr(undefined)
                            setavailableboxc(undefined)
                        }
                        setTurn(data.turn)
                    } else if ('players' in data) {
                        setYou(data.players.you)
                        setOpponent(data.players.opponent)
                        setClick(false)
                        if (!opponent.status.ready && start) {
                            setWinner({ name: "you", marker: you.marker })
                        }
                    } else if ('turn' in data) {
                        setTurn(data.turn)
                    } else if ('jointimestart' in data) {
                        setJointime(data.jointime)
                    }

                }
            }
            socket.websocket.onclose = () => navigation.goBack()

            return () => {
                console.log("Disposing")
                socket.websocket.onopen = null
                socket.websocket.onmessage = null
                socket.websocket.onclose = null
                socket.websocket.close()
            }
        }
    }, [socket])




    useEffect(() => {
        const backCallback = () => {
            console.log("back", winner)
            if (winner) {
                return false
            }
            setQuitBox(true)
            return true
        }
        const back = BackHandler.addEventListener('hardwareBackPress', backCallback)
        return () => {
            back.remove()
        }
    }, [winner]);

    return (
        <View style={[styles.window]}>

            {/* Status box */}
            <Modal
                visible={!start}
                transparent>
                <View style={[GlobalStyles.center, GlobalStyles.alert]}>
                    <View style={[GlobalStyles.center, { flex: 0, backgroundColor: "#fff", borderRadius: 20, padding: 20 }]}>
                        <CloseButton
                            onPress={() => {
                                if (socket) {
                                    socket.websocket.close()
                                    navigation.goBack()
                                }
                            }}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", alignSelf: 'stretch', marginVertical: 10 }}>
                            <View style={[GlobalStyles.center, {
                                flexDirection: 'row',
                                borderRadius: 10,
                                backgroundColor: "#7b00ff",
                                padding: 2
                            }]}>
                                <Icon name='key' size={width / 20} style={{ margin: 5, }} color={"#fafafa"} />
                                <View style={{
                                    flexDirection: 'row',
                                    borderRadius: 10,
                                    margin: 10,
                                    backgroundColor: "#fff"
                                }}>
                                    <Text style={{ fontSize: width / 25, letterSpacing: 2, textTransform: 'capitalize', color: "#7b00ff", margin: 5 }}>{port}</Text>

                                </View>
                            </View>
                            {jointime ? <GameTimeout
                                timeout={jointime}
                                onTimeout={() => {
                                    navigation.goBack()
                                }}
                            /> : null}
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{
                                borderWidth: 0.5, borderColor: "#000",
                                justifyContent: 'center', borderRadius: 17.5,
                                padding: 5,
                                backgroundColor: you.status.connected ? '#3f5' : '#f35'
                            }}>

                                <View style={{
                                    backgroundColor: "#131313",
                                    justifyContent: 'center', borderRadius: 15,
                                    width: Dimensions.get('window').width * 0.3,

                                }}>
                                    <View style={{ alignItems: 'flex-start', padding: 20 }}>
                                        <Text style={styles.name} numberOfLines={1}>You</Text>
                                        <Text style={[styles.status, { color: you.status.ready ? '#3f5' : '#f35' }]}>{you.status.ready ? 'Ready' : 'Not Ready'}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ width: width / 6, backgroundColor: "#fff" }}></View>
                            <View style={{
                                borderWidth: 0.5, borderColor: "#000",
                                justifyContent: 'center', borderRadius: 17.5,
                                padding: 5,
                                backgroundColor: opponent.status.connected ? '#3f5' : '#f35'
                            }}>
                                <View style={{
                                    backgroundColor: "#131313",
                                    justifyContent: 'center',
                                    borderRadius: 15,
                                    width: Dimensions.get('window').width * 0.3,
                                }}>
                                    <View style={{ alignItems: 'flex-start', padding: 20 }}>
                                        <Text style={styles.name} numberOfLines={1}>{opponent.status.connected ? 'opponent' : 'waiting'}</Text>
                                        <Text style={[styles.status, { color: opponent.status.ready ? '#3f5' : '#f35' }]}>{opponent.status.ready ? 'Ready' : 'Not Ready'}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <ShadowButton
                            label={!you.status.ready ? 'Ready' : 'Not Ready'}
                            onPress={(!start)
                                ? !clicked ? () => {
                                    setClick(true)
                                    if (socket) {
                                        socket.sendReadyStatus(!you.status.ready)
                                    }
                                } : null
                                : null}
                            elevation={(!start) ? 7.5 : 0}
                            textStyles={GlobalStyles.buttontext}
                            style={GlobalStyles.button}
                        />
                    </View>
                </View>
            </Modal>

            {/* Winner box */}
            <Modal
                visible={winnerbox}
                onRequestClose={() => navigation.goBack()}
                transparent>
                <View style={[GlobalStyles.center, GlobalStyles.alert]}>
                    <View style={[GlobalStyles.center, styles.box]}>
                        <CloseButton
                            onPress={() => setWinnerBox(false)} />
                        {winner ? <WinnerBox
                            name={winner.name}
                            marker={winner.marker}
                        /> : <></>}
                    </View>
                </View>
            </Modal>

            {/* Quit box */}
            <Modal
                visible={quitbox}
                onRequestClose={() => setQuitBox(false)}
                transparent>
                <View style={[GlobalStyles.center, GlobalStyles.alert]}>
                    <View style={[GlobalStyles.center, styles.box]}>
                        <QuitConfirmBox onPress={(decision) => {
                            setQuitBox(false)
                            if (decision) {
                                if (socket) {
                                    socket.sendReadyStatus(false)
                                }
                                navigation.goBack()
                                // todo close sockets with winner
                            }
                        }} />
                    </View>
                </View>
            </Modal>
            <View style={styles.gridbackground}>
                <PlayerCard
                    marker={start
                        ? turn
                            ? you.marker
                            : opponent.marker
                        : undefined}
                    players={[{ marker: you.marker, name: "you" }, { marker: opponent.marker, name: 'opponent' }]}
                />
                <View style={{ height: width / 12 }}></View>
                <GameBox
                    online={true}
                    bigbox={bigbox}
                    onMark={async (bigrow: number, bigcolumn: number, row: number, column: number) => {
                        const move: move = { br: bigrow, bc: bigcolumn, r: row, c: column, marker: you.marker! }
                        if (socket) {
                            await socket.sendMove(move)
                        }
                    }}
                    marker={you.marker}
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
    window: {
        alignContent: 'center',
        justifyContent: "center",
        flex: 1,
        backgroundColor: theme == 'dark' ? "#131313" : '#fefefe'
    },
    gridbackground: {
        justifyContent: "center",
        alignItems: 'center',
    },
    box: { flex: 0, backgroundColor: "#fff", borderRadius: 20, padding: 20 },
    name: { fontSize: width / 24, textTransform: 'uppercase', color: "#cfcfcf", fontWeight: 'bold' },
    status: { fontSize: width / 32, textTransform: 'uppercase', }
})