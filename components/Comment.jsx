import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/feed.styles';
import { Image } from 'expo-image';

export const Comment = ({comment}) => {
    return (
        <View style={styles.commentContainer}>
            <Image
                source={comment?.authorPicture}
                style={styles.commentPicture}
            />
            <View style={styles.commentLeftSection}>
                <Text style={styles.commentUsername}>{comment.authorUsername}</Text>
                <Text style={styles.commentText}>{comment.comment}</Text>
            </View>
        </View>
    );
};
