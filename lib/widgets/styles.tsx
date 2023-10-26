import { Appearance, Dimensions, StyleSheet } from "react-native"

const width = Dimensions.get('window').width
const theme = Appearance.getColorScheme()

const GlobalStyles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        backgroundColor: theme == 'dark' ? "#131313" : '#fefefe',
    },
    button: {
        borderRadius: 10, backgroundColor: "#7b00ff", paddingHorizontal: width / 24, margin: 10
    },
    buttontext: { color: "#fff", fontSize: width / 14, fontWeight: 'bold' }
})
export default GlobalStyles