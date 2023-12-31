import { Appearance, Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'

const width = Dimensions.get('window').width
const theme = Appearance.getColorScheme()
const light = theme != 'dark'

const PlayerCard: React.FC<{ players: Array<player>, marker?: marker }> = ({ players, marker }) => {
    return (
        <View style={styles.background}>
            {players.map((player, index) => (
                <View
                    key={index}
                    style={[styles.active, {
                        backgroundColor: marker
                            ? marker == player.marker
                                ? '#3f5'
                                : light
                                    ? "#131313"
                                    : '#fefefe'
                            : light
                                ? "#131313"
                                : '#fefefe'
                    }]}>

                    <View style={{
                        backgroundColor: "#000",
                        justifyContent: 'center', borderRadius: 15,
                        width: width * 0.4,
                    }}>
                        <View style={{ alignItems: 'flex-start', padding: width / 36 }}>
                            <Text style={styles.name} numberOfLines={1}>{player.name}</Text>
                            {marker
                                ? player.marker == 'x'
                                    ? <Icon name='times' size={width / 17} color={'#7b00ff'} />
                                    : <Icon name='circle-notch' size={width / 20} color={'#FF6D33'} />
                                : <Icon name='spinner' size={width / 20} color={light ? "#131313" : '#fefefe'} />}

                        </View>
                    </View>
                </View>))}
        </View>
    )
}

export default PlayerCard

const styles = StyleSheet.create({
    background: { flexDirection: 'row', width: width, justifyContent: 'space-between', padding: width / 36, },
    active: {
        borderWidth: 0.5, borderColor: "#000",
        justifyContent: 'center', borderRadius: 17.5,
        padding: width / 72,
    },
    name: { fontSize: width / 20, textTransform: 'uppercase', fontWeight: 'bold', color: '#fff' },
})