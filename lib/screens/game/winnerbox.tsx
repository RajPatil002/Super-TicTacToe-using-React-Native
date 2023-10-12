import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GlobalStyles from '../../widgets/styles'

// type player = {
//     marker: 'x' | 'o',
//     name: string
// }

const WinnerBox: React.FC<player> = ({ marker, name }) => {
    return (
        <View style={[GlobalStyles.center, { flex: 0, borderWidth: 2, borderRadius: 10, padding: 10, margin: 10 }]}>
            <Text style={{ color: "#228B22", fontSize: 40, fontWeight: 'bold', textTransform: 'uppercase' }}>Winner</Text>
            <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', borderWidth: 3, borderColor: "#228B22", borderRadius: 10 }}>
                <Text style={{ color: "#6d33ff", fontSize: 50, fontWeight: 'bold', textTransform: 'uppercase', marginHorizontal: 10 }}>{name}</Text>
                <Text style={{ color: "#000", fontSize: 35, fontWeight: 'bold', textTransform: 'uppercase', paddingHorizontal: 20, borderWidth: 1, borderColor: "#228B22", borderRadius: 10 }}>{marker}</Text>
            </View>
        </View>
    )
}

export default WinnerBox
