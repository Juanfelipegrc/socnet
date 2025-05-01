import { StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    authTitle: {
        color: COLORS.primary,
        fontSize: 50,
        fontWeight: 600
    },
    authTitleBlue: {
        color: COLORS.blue,
        fontSize: 50,
        fontWeight: 600
    },
    persuasiveText: {
      fontSize: 10,
      color: COLORS.primary  
    },
    googleButton: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginTop: 30,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 22,
        alignItems: 'center',
        justifyContent: 'center',
        color: COLORS.secondary
    }
})