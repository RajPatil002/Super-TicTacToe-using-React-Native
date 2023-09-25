import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BigGame from '../game/biggame'
import SocketServer from '../game/serverconnect'

const GameBox: React.FC<{
    online: boolean,
    // onPress: () => void
}> = ({ online }) => {
    const [bigbox, __] = useState(new BigGame())
    const [count, setC] = useState(0)
    const [availableboxr, setavailableboxr] = useState<number | undefined>()
    const [availableboxc, setavailableboxc] = useState<number | undefined>()
    return (
        <FlatList
            data={bigbox.bigbox}
            keyExtractor={(_, index) => index.toString()}
            renderItem={(bigboxrow) => {
                return <View style={{ flexDirection: 'row', }} key={bigboxrow.index}>
                    {bigboxrow.item.map((smallbox, bigindex) => <View
                        style={availableboxr == bigboxrow.index && bigindex == availableboxc
                            ? styles.bigboxtomark
                            : availableboxc == undefined
                                ? typeof (smallbox.box) == 'string'
                                    ? styles.bigbox
                                    : styles.bigboxtomark
                                : styles.bigbox}
                        key={bigindex}>
                        {typeof (smallbox.box) != 'string' ?
                            <FlatList
                                style={styles.gamebox}
                                data={smallbox.box}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={(singleboxrow) => {
                                    return <View style={{ flexDirection: 'row', }} >
                                        {singleboxrow.item.map((singleboxitem, index) => {
                                            return <Pressable
                                                onPress={(availableboxr == undefined || (bigboxrow.index == availableboxr && bigindex == availableboxc)) && singleboxitem == ' ' ? () => {
                                                    console.log("singleboxitem", index)
                                                    const value = count % 2 == 0 ? 'x' : 'o'
                                                    const win = bigbox.bigbox[bigboxrow.index][bigindex].updateGameBox(singleboxrow.index, index, value)
                                                    if (win) {
                                                        console.log(bigbox.checkBigBoxStatus(value))
                                                    }
                                                    if (bigbox.isNextBoxAvailable(singleboxrow.index, index,)) {
                                                        console.log(singleboxrow.index, index)
                                                        setavailableboxr(singleboxrow.index)
                                                        setavailableboxc(index)
                                                    } else {
                                                        setavailableboxr(undefined)
                                                        setavailableboxc(undefined)
                                                    }
                                                    setC(count + 1)
                                                } : null}
                                                key={singleboxrow.index + "" + index}
                                                style={(availableboxr == undefined || (bigboxrow.index == availableboxr && bigindex == availableboxc)) && singleboxitem == ' ' ? styles.pressboxavailable : styles.pressbox}
                                            >
                                                <View style={styles.center}><Text style={{ fontSize: 25, color: '#000', fontWeight: 'bold' }}>{singleboxitem}</Text></View>
                                            </Pressable>
                                        })}
                                    </View>

                                }}
                            />
                            : <View style={styles.winnerbox}>
                                <Text style={{ fontSize: 50, color: '#000', fontWeight: 'bold' }}>
                                    {smallbox.box}
                                </Text>
                            </View>}
                    </View>)}
                </View>
            }}
        />
    )
}

export default GameBox

const styles = StyleSheet.create({

    gamebox: {
        flex: 1,
        alignSelf: 'stretch',
        padding: (Dimensions.get('window').width / 12) * 0.05,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bigbox: {
        margin: (Dimensions.get('window').width / 12) * 0.2,
        borderWidth: 2,
        borderColor: '#fa5555',
    },
    bigboxtomark: {
        margin: (Dimensions.get('window').width / 12) * 0.2,
        borderWidth: 4,
        borderColor: '#228B22',
    },
    pressboxavailable: {
        borderWidth: 1.5,
        borderColor: '#228B22',
        height: (Dimensions.get('window').width / 12),
        width: (Dimensions.get('window').width / 12),
        margin: (Dimensions.get('window').width / 12) / 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressbox: {
        borderWidth: 1,
        borderColor: '#fa5555',
        height: (Dimensions.get('window').width / 12),
        width: (Dimensions.get('window').width / 12),
        margin: (Dimensions.get('window').width / 12) / 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    winnerbox: {
        borderWidth: 3,
        borderColor: '#000',
        height: ((Dimensions.get('window').width * 3) / 12),
        width: ((Dimensions.get('window').width * 3) / 12),
        margin: (Dimensions.get('window').width / 56),
        justifyContent: 'center',
        alignItems: 'center'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})