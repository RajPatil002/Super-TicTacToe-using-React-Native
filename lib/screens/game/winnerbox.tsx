import { Dimensions, Text, View } from 'react-native'
import React from 'react'
import GlobalStyles from '../../widgets/styles'
import Icon from 'react-native-vector-icons/FontAwesome5'


const width = Dimensions.get('window').width


const WinnerBox: React.FC<player> = ({ marker, name }) => {
    return (
        <View style={[GlobalStyles.center, { flex: 0, borderWidth: 2, borderRadius: 10, padding: 10, margin: 10 }]}>
            <Text style={{ color: "#228B22", fontSize: 40, fontWeight: 'bold', textTransform: 'uppercase' }}>Winner</Text>
            <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', borderWidth: 3, borderColor: "#228B22", borderRadius: 10 }}>
                <Text style={{ color: "#131313", fontSize: 50, fontWeight: 'bold', textTransform: 'uppercase', marginHorizontal: 10 }}>{name}</Text>

                <View style={{
                    width: width / 6, height: width / 6,
                    borderWidth: 1, borderColor: "#228B22", borderRadius: 10,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    {marker != 'x'
                        ? <Icon name='times' size={width / 10} color={'#7b00ff'} />
                        : <Icon name='circle-notch' size={width / 12} color={'#FF6D33'} />}
                </View>
            </View>
        </View>
    )
}

export default WinnerBox
