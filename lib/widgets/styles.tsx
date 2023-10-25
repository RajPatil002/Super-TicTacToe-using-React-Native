import { Appearance, Dimensions, StyleSheet } from "react-native"

const width = Dimensions.get('window').width
const theme = Appearance.getColorScheme()

const GlobalStyles = StyleSheet.create({
    // title: {
    //     fontSize: 24,
    //     fontWeight: '600',
    //     // alignSelf: 'center',
    //     color: "#0ff",
    //     textTransform: 'uppercase'
    // },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        backgroundColor: theme == 'dark' ? "#131313" : '#fefefe',
    },
    button: {
        // borderColor: theme != 'dark' ? "#131313" : '#fefefe', borderWidth: 2,
        borderRadius: 10, backgroundColor: "#7b00ff", paddingHorizontal: width / 24, margin: 10
    },
    buttontext: { color: "#fff", fontSize: width / 14, fontWeight: 'bold' }
})
export default GlobalStyles