import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PlayerCard: React.FC<{ players: Array<player>, marker: marker }> = ({ players, marker }) => {
    return (
        <View style={styles.background}>
            {players.map((player, index) => (
                <View
                    key={index}
                    style={[styles.active, {
                        backgroundColor: marker == player.marker ? '#3f5' : '#000'
                    }]}>

                    <View style={{
                        backgroundColor: "#000",
                        justifyContent: 'center', borderRadius: 15,
                        width: Dimensions.get('window').width * 0.4,

                    }}>
                        <View style={{ alignItems: 'flex-start', padding: 20 }}>
                            <Text style={styles.name} numberOfLines={1}>{player.name}</Text>
                            <Text style={styles.marker}>{player.marker}</Text>
                        </View>
                    </View>
                </View>))}
        </View>
    )
}

export default PlayerCard

const styles = StyleSheet.create({
    background: { flexDirection: 'row', width: Dimensions.get('window').width, justifyContent: 'space-between', padding: 10 },
    active: {
        borderWidth: 0.5, borderColor: "#000",
        justifyContent: 'center', borderRadius: 17.5,
        padding: 5,
    },
    name: { fontSize: 25, textTransform: 'uppercase', fontWeight: 'bold', color: '#fff' },
    marker: { color: '#6d33ff', fontSize: 20, fontWeight: 'bold' }
})