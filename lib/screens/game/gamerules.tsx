import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GlobalStyles from '../../widgets/styles';

const gamerules = [
    "Make your first move in any of the 9 smaller grids.",
    "Your move sends your opponent to the corresponding smaller grid.",
    "Win a smaller grid by getting three symbols in a row.",
    "If a smaller grid is full or won, choose any open grid for your next move.",
    "Win three smaller grids in a row to win the game."
];
const width = Dimensions.get('window').width

const GameRules = () => {
    return (
        <View>
            <Text style={styles.header} >rules</Text>
            <View style={{
                flexDirection: 'column', width: width * 0.8,
                borderWidth: 2, borderRadius: 10, borderColor: "#c3c3c3",
                margin: 5
            }}>
                {gamerules.map((rule, index) => {
                    return (
                        <View
                            key={index}
                            style={{ flexDirection: 'row', alignItems: 'flex-start', padding: 10 }}>
                            <Text style={[styles.bodytext, {
                                color: "#131313",
                            }]}>{index + 1}.</Text>
                            <Text style={[styles.bodytext, {
                                flexShrink: 1,
                                color: "#818181",
                            }]} numberOfLines={5}>{rule}</Text>
                        </View>
                    )
                })}

            </View>
        </View>
    )
}

export default GameRules

const styles = StyleSheet.create({
    header: {
        fontSize: width / 15,
        fontWeight: 'bold',
        color: "#131313",
        textTransform: 'uppercase',
        margin: 5
    },
    bodytext: {
        fontSize: width / 25,
        margin: 5
    }
})