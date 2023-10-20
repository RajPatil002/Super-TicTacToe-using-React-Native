import { StyleSheet } from "react-native"



const GlobalStyles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: '600',
        alignSelf: 'center',
        color: "#0ff",
        textTransform: 'uppercase'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        backgroundColor: "#fff",
    },
    button: {
        borderColor: "#000", borderWidth: 2, borderRadius: 10, backgroundColor: "#7b00ff", paddingHorizontal: 20, margin: 10
    },
    buttontext: { color: "#fff", fontSize: 30, fontWeight: 'bold' }
})
export default GlobalStyles