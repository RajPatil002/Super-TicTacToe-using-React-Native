import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalStyles from '../../widgets/styles'

const GameTimeout: React.FC<{ timeout: number }> = ({ timeout }) => {
    const [time, setTime] = useState(timeout)
    useEffect(() => {
        let counter = time
        let timer = setInterval(() => {
            counter--
            console.log(counter)
            if (counter > 0) {
                setTime(counter)
            } else {
                clearInterval(timer)
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <View>
            <Text style={GlobalStyles.title}>{time}</Text>
        </View>
    )
}

export default GameTimeout

const styles = StyleSheet.create({})