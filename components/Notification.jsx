import { useQuery } from 'convex/react';
import React from 'react';
import { api } from '../convex/_generated/api';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/notifications.styles';
import { Image } from 'expo-image';

export const Notification = ({notification}) => {

    const blurhash = 'L6Pj0^i_.AyE_3t7t7R**0o#DgR4';

    return (
        <View style={styles.notificationContainer}>
            <View style={styles.imageContainer}>
                <Image
                    source={notification?.senderImage}
                    style={styles.senderImage}
                    placeholder={{blurhash}}
                    transition={200}
                />
            </View>
            {
                notification?.type === 'like' && (
                    <>
                        <View style={styles.notificationTextContainer}>
                            <Text style={styles.notificationText}><Text style={styles.notificationSenderUsername}>{notification.senderUsername}</Text>{"\u00A0"}liked your post</Text>
                        </View>
                        <View style={styles.imageContainerPost}>
                            <Image
                                source={notification?.postImage}
                                style={styles.postImage}
                                placeholder={{blurhash}}
                                transition={200}
                            />
                        </View>
                    </>
                )
            }
            {
                notification?.type === 'follow' && (
                    <>
                        <View style={styles.notificationTextContainer}>
                            <Text style={styles.notificationText}><Text style={styles.notificationSenderUsername}>{notification.senderUsername}</Text>{"\u00A0"}started following you</Text>
                        </View>
                        <View style={styles.followBackButtonContainer}>
                            <TouchableOpacity
                                style={styles.followBackButton}
                            >
                                <Text style={styles.followBackButtonText}>Follow Back</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )
            }
        </View>
    );
};
