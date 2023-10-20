import { Dimensions, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import GlobalStyles from '../../widgets/styles'
import GameBox from './gamebox'
import BigGame from '../../game/biggame'
import { useNavigation } from '@react-navigation/native'
import { CloseButton } from '../../widgets/button'
import codebox from '../home/codebox'
import WinnerBox from './winnerbox'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { stackParams } from '../../../App'
import PlayerCard from '../../widgets/playercards'



type Props = NativeStackNavigationProp<stackParams, 'OfflineGamePage'>
type players = Array<player>
const width = Dimensions.get('window').width

const OfflineGamePage: React.FC<Props> = (props) => {
    // @ts-ignore
    const { route } = props
    const players: players = route.params.players
    const [bigbox, _] = useState(new BigGame())
    const [availableboxr, setavailableboxr] = useState<number | undefined>()
    const [availableboxc, setavailableboxc] = useState<number | undefined>()
    const [marker, setMarker] = useState<'x' | 'o'>('x')
    const [winner, setWinner] = useState<player | undefined>()
    const navigation = useNavigation()
    // console.log(players)
    return (
        <View style={styles.window}>
            <Modal
                visible={winner != undefined}
                onRequestClose={() => navigation.goBack()}
                transparent>
                <View style={[GlobalStyles.center, { backgroundColor: "#00000099" }]}>
                    <View style={[GlobalStyles.center, styles.box]}>
                        <CloseButton
                            onPress={() => setWinner(undefined)} />
                        {winner ? <WinnerBox
                            name={winner.name}
                            marker={winner.marker}
                        /> : <></>}
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
                    onMark={(bigrow: number, bigcolumn: number, row: number, column: number) => {
                        // console.log("singleboxitem", column)
                        const win = bigbox.bigbox[bigrow][bigcolumn].updateGameBox(row, column, marker)
                        if (win) {
                            if (bigbox.checkBigBoxStatus(marker)) {
                                setWinner(players[0].marker == marker ? players[0] : players[1])
                            }
                        }
                        if (bigbox.isNextBoxAvailable(row, column,)) {
                            // console.log(row, column)
                            setavailableboxr(row)
                            setavailableboxc(column)
                        } else {
                            setavailableboxr(undefined)
                            setavailableboxc(undefined)
                        }
                        // setC(count + 1)
                        setMarker(marker == 'o' ? 'x' : 'o')

                    }}
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
    }
})