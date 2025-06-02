import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";


const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
    },
    feedHeader: {
        display: 'flex',
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,

    },
    headerTitle: {
        fontSize: 35,
        fontWeight: 500,
        color: COLORS.primary,
    },
    headerTitleAnotherColor: {
        fontSize: 35,
        fontWeight: 500,
        color: COLORS.blue,
    },
    postsContainer: {
        flex: 1,
        marginBottom: 54,
    },
    storyContainer: {
        paddingVertical: 12,
    },
    storyWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 12,
        width: 80,
        height: 94
    },
    story: {
        width: 85,
        height: 85,
        borderRadius: 50,
        borderWidth: 3,
        position: 'relative',
        borderColor: COLORS.blue,
        backgroundColor: COLORS.secondary,
        padding: 2,
    },
    noStory: {
        width: 85,
        height: 85,
        position: 'relative',
        borderRadius: 50,
        borderWidth: 3,
        borderColor: COLORS.grey,
        backgroundColor: COLORS.secondary,
        padding: 2,
    },
    storyImageContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    storyImage: {
        width: 75,
        height: 75,
        borderRadius: 50,
        marginBottom: 7
    },
    storyImageHidden: {
        opacity: 0
    },
    storyUsername: {
        fontSize: 11,
        marginTop: 10,
        color: COLORS.primary,
        textAlign: 'center'
    },
    postContainer: {
        flex: 1,
    },
    postHeader: {
        display: 'flex',
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        alignItems: 'center'
    },
    leftInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 13,

    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    postUsername: {
        fontSize: 14,
        color: COLORS.primary,
    },
    postImageContainer: {
        width: width,
        height: width,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    postImage: {
        width: '100%',
        height: '100%'
    },
    likeHeartOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    heartIconVisual: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 6,
    },
    actionsContainer: {
        width: width,
        display: 'flex'
    },
    likesCommentsBookmarksContainer: {
        width: '100%',
        paddingHorizontal: 15,
        paddingTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    leftSectionActions: {
        display: 'flex',
        flexDirection: 'row',
        gap: 12
    },
    infoContainer: {
        display: 'flex',
        width: width,
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: 19,
        marginBottom: 20
    },
    captionAuthorUser: {
        fontSize: 13.5,
        fontWeight: 700,  
        color: COLORS.primary, 
    },
    captionText: {
        fontWeight: 400,
    },
    postTime: {
        color: COLORS.grey,
        fontSize: 12,
        marginTop: 5
    },
    actionsNums: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: 600,
        alignSelf: 'center'
    },
    action: {
        display: 'flex',
        flexDirection: 'row',
        gap: 4
    },
    commentsModal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        margin: 0,
        
    },
    commentsModalContainer: {
        display: 'flex',
        height: '70%',
        width: width,
        flexDirection: 'column',
        backgroundColor: COLORS.secondary,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        position: 'relative'
    },  
    inputCommentsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        padding: 20,
        zIndex: 9999,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.secondary
    },
    inputComments: {
        backgroundColor: COLORS.secondary,
        borderWidth: 0.7,
        borderColor: '#e4e4e447',
        width: '80%',
        color: COLORS.primary,
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    actualUserPicture: {
        width: 54,
        height: 54,
        borderRadius: 50,
        aspectRatio: 1,
    },
    commentContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        width: width,
        padding: 15,
    },
    commentPicture: {
        width: 40,
        height: 40,
        aspectRatio: 1,
        borderRadius: 50,

    },
    commentLeftSection: {
        display: 'flex',
        width: '80%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    commentUsername: {
        fontSize: 11,
        color: COLORS.primary,
        fontWeight: 600,
    },
    commentText: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: 400,

    },
    commentsModalTitle: {
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: 600,
        textAlign: 'center',
        paddingVertical: 20,
    }
    


})