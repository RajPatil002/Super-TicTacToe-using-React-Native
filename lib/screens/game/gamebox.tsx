import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BigGame from '../../game/biggame'

type move = { br: number, bc: number, r: number, c: number, marker: string }

const GameBox: React.FC<{
    online: boolean,
    bigbox: BigGame,
    onMark: (br: number, bc: number, r: number, c: number) => void,
    marker?: 'x' | 'o',
    nextboxrow: number | undefined,
    nextboxcolumn: number | undefined,
    turn?: boolean
    // onPress: () => void
}> = ({ online, bigbox, turn, nextboxrow, nextboxcolumn, onMark }) => {
    console.log(online, turn, nextboxrow, nextboxcolumn,)
    const [clicked, setClick] = useState(false)

    return (
        online
            ? <FlatList
                data={bigbox.bigbox}
                keyExtractor={(_, index) => index.toString()}
                renderItem={(bigboxrow) => {
                    return <View style={{ flexDirection: 'row', }} key={bigboxrow.index}>
                        {bigboxrow.item.map((smallbox, bigindex) => <View
                            style={(turn
                                ? (nextboxrow == bigboxrow.index && bigindex == nextboxcolumn
                                    ? styles.bigboxtomark
                                    : nextboxcolumn == undefined
                                        ? typeof (smallbox.box) == 'string'
                                            ? styles.bigbox
                                            : styles.bigboxtomark
                                        : styles.bigbox)
                                : styles.bigboxonline)}
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
                                                    onPress={turn
                                                        ? ((nextboxrow == undefined || (bigboxrow.index == nextboxrow && bigindex == nextboxcolumn)) && singleboxitem == ' '
                                                            ? () => {
                                                                setClick(true)
                                                                onMark(bigboxrow.index, bigindex, singleboxrow.index, index)
                                                                setClick(false)
                                                            }
                                                            : null)
                                                        : () => {
                                                            const move: move = { br: bigboxrow.index, bc: bigindex, r: singleboxrow.index, c: index, marker: 'x' }
                                                            console.log(move, "remove this from box click")
                                                        }}
                                                    key={singleboxrow.index + "" + index}
                                                    style={(turn
                                                        ? ((nextboxrow == undefined || (bigboxrow.index == nextboxrow && bigindex == nextboxcolumn)) && singleboxitem == ' '
                                                            ? styles.pressboxavailable
                                                            : styles.pressbox)
                                                        : styles.pressboxonline)}
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
            : <FlatList
                data={bigbox.bigbox}
                keyExtractor={(_, index) => index.toString()}
                renderItem={(bigboxrow) => {
                    return <View style={{ flexDirection: 'row', }} key={bigboxrow.index}>
                        {bigboxrow.item.map((smallbox, bigindex) => <View
                            style={(nextboxrow == bigboxrow.index && bigindex == nextboxcolumn
                                ? styles.bigboxtomark
                                : nextboxcolumn == undefined
                                    ? typeof (smallbox.box) == 'string'
                                        ? styles.bigbox
                                        : styles.bigboxtomark
                                    : styles.bigbox)}
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
                                                    onPress={((nextboxrow == undefined || (bigboxrow.index == nextboxrow && bigindex == nextboxcolumn)) && singleboxitem == ' '
                                                        ? () => onMark(bigboxrow.index, bigindex, singleboxrow.index, index)
                                                        : null)}
                                                    key={singleboxrow.index + "" + index}
                                                    style={((nextboxrow == undefined || (bigboxrow.index == nextboxrow && bigindex == nextboxcolumn)) && singleboxitem == ' '
                                                        ? styles.pressboxavailable
                                                        : styles.pressbox)}
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
        alignItems: 'center',
    },
    bigbox: {
        margin: (Dimensions.get('window').width / 12) * 0.2,
        borderWidth: 2,
        borderColor: '#fa5555',
    },
    bigboxonline: {
        margin: (Dimensions.get('window').width / 12) * 0.2,
        borderWidth: 2,
        borderColor: '#000',
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
    pressboxonline: {
        borderWidth: 1.5,
        borderColor: '#000',
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