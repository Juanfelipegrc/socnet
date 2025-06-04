import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
    },
    profileheader: {
        width: width,
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 15,
        paddingVertical: 15,
        gap: 15
    },
    headerMainSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerMainSectionActiveUser: {
        display: 'flex',
        flexDirection: 'row',
        gap:10,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },  
    headerFirstSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

        alignItems: 'center'
    },
    profilePicture: {
        borderRadius: 100,
        width: '100%',
        height: '100%',
        aspectRatio: 1,
    },
    profilePictureHidden: {
        opacity: 0,
    },
    leftSectionContainer: {
        borderRadius: 100,
        width: 90,
        height: 90,
        aspectRatio: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    rightSectionContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    rightSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 7,
    },
    followsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 240
    },
    postNumContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 5
    },
    followersContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 5

    },
    followingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 5

    },
    name: {
        fontSize: 15,
        color: COLORS.primary,
        fontWeight: 600,
    },
    username: {
        fontSize: 26,
        color: COLORS.primary,
        fontWeight: 600,
    },
    stadisticNums: {
        fontSize: 18,
        color: COLORS.primary,
        fontWeight: 600,
    },
    stadisticTitles: {
        fontSize: 14,
        fontWeight: 500,
        color: COLORS.primary
    },
    headerSecondSection: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%'
    },
    bioText: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: 400
    },
    headerThirdSection: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        width: '100%'
    },
    editProfileButton: {
        paddingVertical: 8,
        paddingHorizontal:10,
        flexGrow: 1,
        backgroundColor: COLORS.blue,
        borderRadius: 10
    },
    messageProfileButton: {
        paddingVertical: 8,
        paddingHorizontal:10,
        flexGrow: 1,
        backgroundColor: COLORS.secondary,
        borderWidth: 1,
        borderColor: '#e4e4e447',
        borderRadius: 10
    },
    editProfileButtonText: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: 600,
        textAlign: 'center'
    },
    ownPostCover: {
        width: '33.33%',
        padding: 2,
        aspectRatio: 1,

    },
    ownPostCoverImage: {
        width: '100%',
        height: '100%',
        aspectRatio: 1, 
    },
    modalContainer: {
        flex: 1,
        backgroundColor: COLORS.secondary,
    },
    modalContent: {
        flex: 1,
        backgroundColor: COLORS.secondary,
    },
    modalHeader: {
        display: 'flex',
        width: width,
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        borderBottomColor: COLORS.grey,
    },
    modalTitle: {
        fontSize: 15,
        color: COLORS.primary,
        fontWeight: 600
    },
    closeModalButton: {
        position: 'absolute',
        left: 10,
        padding: 2,

    },
    safeAreaWrapper: {
        flex: 1,
    },
    individualPostHeader: {
            display: 'flex',
            flexDirection: 'row',
            width: width,
            height: 52,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            borderBottomWidth: 0.2,
            borderBottomColor: COLORS.grey
            
    },
    backButton: {
        position: 'absolute',
        left: 10,
        padding: 2,
    },
    postModalStyle: {
        margin: 0
    },
    modalFirstSection: {
        width: width,
        paddingVertical: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 18
    },
    modalProfilePicture: {
        width: 90,
        height: 90,
        borderRadius: 100,
        aspectRatio: 1,
    },
    editProfilePictureButton: {
        padding: 10,
    },
    editProfilePictureText: {
        fontSize: 14,
        color: COLORS.blue,
        fontWeight: 600,
    },
    modalSecondSection: {
        display: 'flex',
        width: width,
        flexDirection: 'column',
        justifyContent: 'center',
        borderTopColor: '#e4e4e447',
        borderTopWidth: 0.2,
    },
        userValueItem: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    userValueItemWithBorder: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        borderBottomWidth: 0.2,
        borderBottomColor: '#e4e4e447',
    },
    itemTitle: {
        display: 'flex',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 25,
        paddingVertical: 17,
    },
    itemValue: {
        display: 'flex',
        position: 'relative',
        width: '70%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderBottomWidth: 0.2,
        borderBottomColor: '#e4e4e447',
        paddingVertical: 17,

    },
    itemValueWithoutBorder: {
        display: 'flex',
        position: 'relative',
        width: '70%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingVertical: 17,

    },
    
    userItemText: {
        fontSize: 16.5,
        color: COLORS.primary,    
    },
    userItemTextNoValue: {
        fontSize: 16.5,
        color: COLORS.grey,    
    },
    
    arrowItem: {
        fontSize: 17, 
        color: COLORS.primary,
        position: 'absolute',
        right: 14,
    }
    

})