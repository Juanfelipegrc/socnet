import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../constants/theme";


const {width} = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
        alignItems: 'center',
    },
    createHeader: {
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
    backButton: {
        position: 'absolute',
        left: 10,
        padding: 2,
    },
    createPostButton: {
        flex: 1,
        width: width,
        height: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    createPostButtonText: {
        fontSize: 10,
        marginTop: 8,
        color: COLORS.primary,
    },
    iconAndText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom:20
    },
    shareButton: {
        backgroundColor: COLORS.blue,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
        paddingHorizontal: 12,
        paddingVertical: 7
    },
    shareButtonDisabled: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
        paddingHorizontal: 12,
        paddingVertical: 7
    },
    shareButtonText: {
        color: COLORS.primary,
        fontSize: 13,
        
    },
    contentContainer: {
        flex: 1
    },
    imageContainer: {
        width: width,
        height: width,
        position: 'relative'
    },
    postImage: {
        width: '100%',
        height: '100%'
    },
    changeButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        position: 'absolute',
        right: 10,
        bottom: 10
    },
    changeButtonText: {
        fontSize: 11,
        color: COLORS.primary,
        fontWeight: 500
    },
    captionContainer: {
        flexDirection: 'row',
        gap: 15,
        padding: 18
    },
    avatarContainer: {
        height: 40,
        width: 40,
    },
    avatarCaption: {
        borderRadius: 50,
        height: '100%',
        width: '100%'
    },
    captionInput: {
        flex: 1,
        minHeight: 40,
        color: COLORS.primary,
        fontSize: 16,
        paddingTop: 10
    },
    scrollContent: {
        flexGrow: 1,
    }
})