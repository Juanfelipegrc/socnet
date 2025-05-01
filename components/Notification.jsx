import { useQuery } from 'convex/react';
import React from 'react';
import { api } from '../convex/_generated/api';
import { Text, View } from 'react-native';
import { styles } from '../styles/notifications.styles';
import { Image } from 'expo-image';

export const Notification = ({notification}) => {

    const blurhash = 'L6Pj0^i_.AyE_3t7t7R**0o#DgR4';

    return (
        <View style={styles.notificationContainer}>
            <Image
                source={notification?.senderImage}
                style={styles.senderImage}
                placeholder={{blurhash}}
                transition={200}
            />
            <View>
                <Text style={styles.notificationText}><Text style={styles.notificationSenderUsername}>{notification.senderUsername}</Text> has liked your post</Text>
            </View>
            <Image
                source={notification?.postImage}
                style={styles.postImage}
                placeholder={{blurhash}}
                transition={200}
            />
        </View>
    );
};
