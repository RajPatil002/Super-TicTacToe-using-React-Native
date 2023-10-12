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



type Props = NativeStackNavigationProp<stackParams, 'OfflineGamePage'>
type player = {
    marker: 'x' | 'o' | undefined,
    name: string
}
type players = Array<player>

const OfflineGamePage: React.FC<Props> = (props) => {
    // @ts-ignore
    const { route } = props
    const players: players = route.params.players
    // const [player1, player2]: players = players
    // const players = useState(players)
    const [bigbox, _] = useState(new BigGame())
    const [availableboxr, setavailableboxr] = useState<number | undefined>()
    const [availableboxc, setavailableboxc] = useState<number | undefined>()
    const [marker, setMarker] = useState<'x' | 'o'>('x')
    const [winner, setWinner] = useState<player | undefined>()
    const navigation = useNavigation()
    console.log(players)
    return (
        <View style={styles.window}>
            <Modal
                visible={winner != undefined}
                onRequestClose={() => navigation.goBack()}
                transparent>
                <View style={[GlobalStyles.center, { backgroundColor: "#00000099" }]}>
                    <View style={[GlobalStyles.center, styles.box]}>
                        <CloseButton
                            onPress={() => navigation.goBack()} />
                        <WinnerBox
                            name={"me"}
                            marker='x'
                        />
                    </View>
                </View>
            </Modal>
            <View style={styles.gridbackground}>
                <View style={{ flexDirection: 'row', width: Dimensions.get('window').width, justifyContent: 'space-between', padding: 10 }}>
                    {players.map((player, index) => (
                        <View
                            key={index}
                            style={{
                                borderWidth: 0.5, borderColor: "#000",
                                justifyContent: 'center', borderRadius: 17.5,
                                padding: 5,
                                backgroundColor: marker == player.marker ? '#3f5' : '#000'
                            }}>

                            <View style={{
                                backgroundColor: "#000",
                                justifyContent: 'center', borderRadius: 15,
                                width: Dimensions.get('window').width * 0.4,

                            }}>
                                <View style={{ alignItems: 'flex-start', padding: 20 }}>
                                    <Text style={{ fontSize: 25, textTransform: 'uppercase', }} numberOfLines={1}>{player.name}</Text>
                                    <Text style={{ color: '#6d33ff', fontSize: 20, fontWeight: 'bold' }}>{player.marker}</Text>
                                </View>
                            </View>
                        </View>))}
                </View>
                <GameBox
                    online={false}
                    bigbox={bigbox}
                    nextboxrow={availableboxr}
                    nextboxcolumn={availableboxc}
                    onMark={(bigrow: number, bigcolumn: number, row: number, column: number) => {
                        console.log("singleboxitem", column)
                        const win = bigbox.bigbox[bigrow][bigcolumn].updateGameBox(row, column, marker)
                        if (win) {
                            if (bigbox.checkBigBoxStatus(marker)) {
                                setWinner(players[0].marker == marker ? players[0] : players[1])
                            }
                        }
                        if (bigbox.isNextBoxAvailable(row, column,)) {
                            console.log(row, column)
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