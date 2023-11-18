import { Appearance, BackHandler, Dimensions, Modal, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalStyles from '../../widgets/styles'
import GameBox from './gamebox'
import BigGame from '../../game/biggame'
import { useNavigation } from '@react-navigation/native'
import { CloseButton } from '../../widgets/button'
import WinnerBox from './winnerbox'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { stackParams } from '../../../App'
import PlayerCard from '../../widgets/playercards'
import QuitConfirmBox from '../../widgets/quitconfirmbox'



type Props = NativeStackNavigationProp<stackParams, 'OfflineGamePage'>
type players = Array<player>
const width = Dimensions.get('window').width
const theme = Appearance.getColorScheme()

const OfflineGamePage: React.FC<Props> = (props) => {
    // @ts-ignore
    const { route } = props
    const navigation = useNavigation()

    // game
    const players: players = route.params.players
    const [bigbox, _] = useState(new BigGame())

    // game stats
    const [marker, setMarker] = useState<'x' | 'o'>('x')
    const [winner, setWinner] = useState<player | undefined>()
    const [winnerbox, setWinnerBox] = useState(false)
    const [quitbox, setQuitBox] = useState(false)
    const [availableboxr, setavailableboxr] = useState<number | undefined>()
    const [availableboxc, setavailableboxc] = useState<number | undefined>()




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
        <View style={styles.window}>

            {/* winner box */}
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
                                navigation.goBack()
                            }
                        }} />
                    </View>
                </View>
            </Modal>
            <View style={styles.gridbackground}>
                <PlayerCard
                    players={players}
                    marker={marker}
                />
                <View style={{ height: width / 12 }}></View>
                <GameBox
                    online={false}
                    bigbox={bigbox}
                    nextboxrow={availableboxr}
                    nextboxcolumn={availableboxc}
                    onMark={!winner ? (bigrow: number, bigcolumn: number, row: number, column: number) => {
                        // console.log("singleboxitem", column)
                        const win = bigbox.bigbox[bigrow][bigcolumn].updateGameBox(row, column, marker)
                        if (win) {
                            if (bigbox.checkBigBoxStatus(marker)) {
                                setWinner(players[0].marker == marker ? players[0] : players[1])
                                console.log(players[0].marker == marker ? players[0] : players[1])
                                setWinnerBox(true)
                                console.log(marker, winner)
                                return
                            }
                        }
                        if (bigbox.isNextBoxAvailable(row, column,)) {
                            // console.log(row, column)
                            // setavailableboxr(row)
                            // setavailableboxc(column)
                        } else {
                            setavailableboxr(undefined)
                            setavailableboxc(undefined)
                        }
                        console.log(winner)
                        setMarker(marker == 'o' ? 'x' : 'o')

                    } : () => { }}
                />
            </View>

        </View>
    )
}

export default OfflineGamePage

const styles = StyleSheet.create({
    gridbackground: {
        justifyContent: "center",
        alignItems: 'center',
    },
    box: { flex: 0, backgroundColor: "#fff", borderRadius: 20, padding: 20 },
    window: {
        alignContent: 'center',
        justifyContent: "center",
        flex: 1,
        backgroundColor: theme == 'dark' ? "#131313" : '#fefefe'
    }
})