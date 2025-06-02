import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary
    },
    notificationsHeader: {
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
    notificationContainer: {
        width: width,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20

    },
    imageContainer: {
        width: '20%',
    },
    imageContainerPost: {
        width: '30%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    senderImage: {
        width: 54,
        height: 54,
        borderRadius: 50,
        aspectRatio: 1,

    },
    postImage: {
        width: 47,
        height: 47,
        borderRadius: 10,
        aspectRatio: 1,

    },
    notificationTextContainer: {
        display: 'flex',
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    notificationText: {
        fontSize: 13,
        color: COLORS.primary,
        fontWeight: 500,
    },
    notificationSenderUsername:{
        fontSize: 13,
        color: COLORS.primary,
        fontWeight: 700,
    },
    followBackButtonContainer: {
        width: '30%',
        display: 'flex',
        flexDirection: 'row'
    },
    followBackButton: {
        paddingVertical: 8,
        paddingHorizontal:10,
        flexGrow: 1,
        backgroundColor: COLORS.blue,
        borderRadius: 10
    },
    followBackButtonText: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: 600,
        textAlign: 'center'
    }
    
})