import { useQuery } from 'convex/react';
import React from 'react';
import { api } from '../convex/_generated/api';
import { Platform, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/notifications.styles';
import { Image } from 'expo-image';
import { useActiveUser } from '../hooks/useActiveUser';
import { useActivePost } from '../hooks/useActivePost';

export const Notification = ({notification}) => {

    const {onSetActiveUser} = useActiveUser();
    const {onSetActivePost} = useActivePost();

    // const userPosts = useQuery(api.profile.getPostsByUser, notification?.senderId? {userId: notification?.senderId} : 'skip');
    const userAuthor = useQuery(api.profile.getUserById, notification?.senderId? {userId: notification?.senderId} : 'skip');

    const post = useQuery(api.posts.getIndividualPost, notification?.postId? {postId: notification?.postId} : 'skip');

    const blurhash = 'L6Pj0^i_.AyE_3t7t7R**0o#DgR4';



    return (
        <Pressable 
            style={({ pressed }) => [
                styles.notificationContainer,
                pressed && { opacity: 0.7 }
            ]}
            onPress={() => {
                if(notification?.type === 'follow'){
                    onSetActiveUser(userAuthor?._id)
                } else {
                    onSetActivePost(post)
                }
            }}
        >
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
                            <Text style={styles.notificationText}>
                                <TouchableOpacity
                                    onPress={() => onSetActiveUser(userAuthor?._id)}
                                    style={Platform.OS === 'ios'? {height: 14} : {height: 15}}
                                    
                                >
                                    <Text style={styles.notificationSenderUsername}>{notification.senderUsername}</Text>
                                  
                                </TouchableOpacity>
                                
                                {"\u00A0"}liked your post</Text>
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
        </Pressable>
    );
};
