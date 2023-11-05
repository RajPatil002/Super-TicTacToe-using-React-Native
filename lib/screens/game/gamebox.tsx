import { Dimensions, FlatList, Pressable, StyleSheet, View, Appearance } from 'react-native'
import React, { useState } from 'react'
import BigGame from '../../game/biggame'
import Icon from 'react-native-vector-icons/FontAwesome5'

const width = (Dimensions.get('window').width)
const smallboxwidth = width / 12
const theme = Appearance.getColorScheme()
const light = theme != 'dark'


const GameBox: React.FC<{
    online: boolean,
    bigbox: BigGame,
    onMark: ((br: number, bc: number, r: number, c: number) => void),
    marker?: marker,
    nextboxrow: number | undefined,
    nextboxcolumn: number | undefined,
    turn?: boolean
}> = ({ online, bigbox, turn, nextboxrow, nextboxcolumn, onMark, marker }) => {
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
                                                const isavailable = (nextboxrow == undefined || (bigboxrow.index == nextboxrow && bigindex == nextboxcolumn)) && singleboxitem == ' '
                                                return <Pressable
                                                    onPress={turn
                                                        ? (isavailable
                                                            ? () => {
                                                                setClick(true)
                                                                onMark(bigboxrow.index, bigindex, singleboxrow.index, index)
                                                                setClick(false)
                                                            }
                                                            : null)
                                                        : null}
                                                    key={singleboxrow.index + "" + index}
                                                    style={(turn
                                                        ? (isavailable
                                                            ? styles.pressboxavailable
                                                            : [styles.pressbox, singleboxitem == ' ' ? {} : { borderWidth: 0 }])
                                                        : styles.pressboxonline)}
                                                >
                                                    <View style={styles.center}>
                                                        {singleboxitem != ' '
                                                            ? (singleboxitem == 'x'
                                                                ? <Icon name='times' size={width / 15} color={'#7b00ff'} />
                                                                : <Icon name='circle-notch' size={width / 18} color={'#FF6D33'} />
                                                            )
                                                            : <></>
                                                        }
                                                    </View>
                                                </Pressable>
                                            })}
                                        </View>

                                    }}
                                />
                                : <View style={styles.winnerbox}>
                                    {smallbox.box == 'x'
                                        ? <Icon name='times' size={width / 15} color={'#7b00ff'} />
                                        : <Icon name='circle-notch' size={width / 18} color={'#FF6D33'} />}

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
                                                const isavailable = (nextboxrow == undefined || (bigboxrow.index == nextboxrow && bigindex == nextboxcolumn)) && singleboxitem == ' '
                                                return <Pressable
                                                    onPress={(isavailable
                                                        ? () => onMark(bigboxrow.index, bigindex, singleboxrow.index, index)
                                                        : null)}
                                                    key={singleboxrow.index + "" + index}
                                                    style={(isavailable
                                                        ? styles.pressboxavailable
                                                        : [styles.pressbox, singleboxitem == ' ' ? {} : { borderWidth: 0 }])}
                                                >
                                                    <View style={styles.center}>
                                                        {singleboxitem != ' '
                                                            ? (singleboxitem == 'x'
                                                                ? <Icon name='times' size={width / 15} color={'#7b00ff'} />
                                                                : <Icon name='circle-notch' size={width / 18} color={'#FF6D33'} />
                                                            )
                                                            : <></>
                                                        }
                                                    </View>
                                                </Pressable>
                                            })}
                                        </View>

                                    }}
                                />
                                : <View style={styles.winnerbox}>
                                    {smallbox.box == 'x'
                                        ? <Icon name='times' size={width / 4.5} color={'#7b00ff'} />
                                        : <Icon name='circle-notch' size={width / 5.5} color={'#FF6D33'} />
                                    }
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
        // alignSelf: 'stretch',
        padding: smallboxwidth / 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bigbox: {
        margin: smallboxwidth / 6,
        borderWidth: smallboxwidth / 15,
        borderColor: light ? '#fa5555' : '#d92525',
    },
    bigboxonline: {
        margin: smallboxwidth / 6,
        borderWidth: smallboxwidth / 15,
        borderColor: light ? "#131313" : '#fefefe',
    },
    bigboxtomark: {
        margin: smallboxwidth / 6,
        borderWidth: smallboxwidth / 15,
        borderColor: light ? '#228B22' : "#30c930",
    },
    pressboxavailable: {
        borderWidth: smallboxwidth / 20,
        borderColor: light ? '#228B22' : "#30c930",
        height: smallboxwidth,
        width: smallboxwidth,
        margin: smallboxwidth / 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressboxonline: {
        borderWidth: 1,
        borderColor: light ? "#131313" : '#fefefe',
        height: smallboxwidth,
        width: smallboxwidth,
        margin: smallboxwidth / 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressbox: {
        borderWidth: smallboxwidth / 30,
        borderColor: light ? '#fa5555' : '#d92525',
        height: smallboxwidth,
        width: smallboxwidth,
        margin: smallboxwidth / 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    winnerbox: {
        borderWidth: 3,
        borderColor: '#000',
        height: (smallboxwidth * 3),
        width: (smallboxwidth * 3),
        margin: (Dimensions.get('window').width / 56),
        justifyContent: 'center',
        alignItems: 'center'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
})