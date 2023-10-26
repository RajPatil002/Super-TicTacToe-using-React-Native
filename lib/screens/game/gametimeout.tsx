import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import GlobalStyles from '../../widgets/styles'

const width = Dimensions.get('window').width
console.log(width)

const GameTimeout: React.FC<{ timeout: number, onTimeout: () => void }> = ({ timeout, onTimeout }) => {
    const [time, setTime] = useState(timeout)
    useEffect(() => {
        let counter = time
        let timer = setInterval(() => {
            counter--
            console.log(counter)
            if (counter >= 0) {
                setTime(counter)
            } else {
                clearInterval(timer)
                onTimeout()
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <View style={[GlobalStyles.center, {
            flexDirection: 'row',
            borderRadius: 10,
            backgroundColor: "#7b00ff",
            padding: 2
        }]}>
            <Icon name='clock' size={width / 20} style={{ margin: 5, }} color={"#fafafa"} />
            <View style={{
                flexDirection: 'row',
                borderRadius: 10,
                margin: 10,
                backgroundColor: "#fff"
            }}>
                <Text style={{ fontSize: width / 25, color: "#7b00ff", margin: 5 }}>{time}</Text>

            </View>
        </View>
    )
}

export default GameTimeout

const styles = StyleSheet.create({})