import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";


const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
    },
    bookmarksHeader: {
        display: 'flex',
        flexDirection: 'row',
        width: width,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderBottomWidth: 0.2,
        borderBottomColor: '#e4e4e447'
    },
    titleHeader: {
        color: COLORS.primary,
        fontSize: 15,
        fontWeight: 700
    },
    bookmark: {
        width: '33.33%',
        padding: 2,
        aspectRatio: 1,

    },
    bookmarkImage: {
        width: '100%',
        height: '100%',
        aspectRatio: 1, 
    }
}) 