import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/feed.styles';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { api } from '../convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from 'react-native-reanimated';
import { CommentsModal } from './CommentsModal';
import { useActiveUser } from '../hooks/useActiveUser';
import { usePathname } from 'expo-router';




export const Post = ({post}) => {


    const [isBookmarked, setIsBookmarked] = useState(post?.isBookmarked);
    const [isLiked, setIsLiked] = useState({isLiked: post?.isLiked, likesNum: post?.likes});
    const [commentsModalIsOpen, setCommentsModalIsOpen] = useState(false);
    const {onSetActiveUser, activeUserState} = useActiveUser();


    const userPosts = useQuery(api.profile.getPostsByUser, post?.author?._id? {userId: post?.author?._id} : 'skip');
    const userAuthor = useQuery(api.profile.getUserById, post?.author?._id? {userId: post?.author?._id} : 'skip');
    const comments = useQuery(api.comments.getComments, post?._id?  {postId: post?._id} : 'skip');
    const toggleBookmark = useMutation(api.bookmarks.toggleBookmark);
    const toggleLike = useMutation(api.likes.toggleLike);
    const addLikeWithDoubleTap = useMutation(api.likes.addLikeWithDoubleTap);

    
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);
    const blurhash = 'L0000000?^000000000000000000';
    
    const onSetCommentsModal = (value) => {
        setCommentsModalIsOpen(value);
    };


    const onSetActiveUserProfile = () => {
        onSetActiveUser({...userAuthor, postsList: userPosts})
    }

    
    const getTimeDifference = () => {
        const actualData = Date.now();
        
        const actualDifference = actualData - post?._creationTime;
        
        const seconds = Math.floor(actualDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 31);
        const years = Math.floor(months / 12);
        
        
        if(years > 0) {


            if(years === 1) {
                return `${years} year ago`
            }
            return `${years} years ago`


        } else if(months > 0) {


            if(months === 1) {
                return `${months} month ago`
            }
            return `${months} months ago`


        } else if(weeks > 0) {


            if(weeks === 1) {
                return `${weeks} week ago`
            }
            return `${weeks} weeks ago`


        } else if(days > 0) {
            if(days === 1) {
                return `${days} day ago`
            }


            return `${days} days ago`


        } else if(hours > 0) {
            if(hours === 1) {
                return `${hours} hour ago`
            }


            return `${hours} hours ago`


        } else if(minutes > 0) {
            if(minutes === 1) {
                return `${minutes} minute ago`
            }


            return `${minutes} minutes ago`


        } else if(seconds > 0) {
            if(seconds === 1) {
                return `${seconds} second ago`
            }
        

            return `${seconds} seconds ago`


        }
    }
    
    const createdAt = getTimeDifference();
    
    

    useEffect(() => {
        
        setIsBookmarked(post?.isBookmarked);
    
      }, [post?.isBookmarked]);



      
    
    
      useEffect(() => {
    
        setIsLiked({ isLiked: post?.isLiked, likesNum: post?.likes });
    
      }, [post?.isLiked, post?.likes]);


      const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{scale: scale.value}],
            opacity: opacity.value
        }
      })


    const handleAddBookmark = async() => {
        
        const isBookmarked = await toggleBookmark({postId: post?._id, userIdAuthor: post?.author?._id});
        setIsBookmarked(isBookmarked);

        
    };

    const handleLikeWithDoubleTap = async() => {
        const {isLiked, likesNum} = await addLikeWithDoubleTap({postId: post?._id});
        setIsLiked({isLiked, likesNum});
    }

    const handleLike = async() => {
        const {isLiked, likesNum} = await toggleLike({postId: post?._id});
        setIsLiked({isLiked, likesNum});
    }

    const onDoubleTap = useCallback(() => {
        scale.value = withSequence(
            withTiming(1.2, {duration: 150}),
            withTiming(1, {duration: 100}),
            withDelay(1000, withTiming(0, {duration: 300}))
        );
        opacity.value = withSequence(
            withTiming(1, {duration: 200}),
            withDelay(1000, withTiming(0, {duration: 300}))
        );

        runOnJS(handleLikeWithDoubleTap)();
    }, [handleLikeWithDoubleTap, scale, opacity])



    return (
        <View style={styles.postContainer}>
            
            {/* HEADER */}

            <View style={styles.postHeader}>
                <View style={styles.leftInfoContainer}>
                    
                    <Image
                        source={post?.author?.image}
                        style={styles.userImage}
                        placeholder={{blurhash}}
                        transition={70}
                    />
                    <TouchableOpacity
                        style={{paddingVertical: 10}}
                        onPress={onSetActiveUserProfile}
                    >
                        <Text style={styles.postUsername}>{post?.author?.username}</Text>
                    </TouchableOpacity>
                </View>
            </View>


            {/* POST IMAGE SECTION */}
            <TapGestureHandler
                numberOfTaps={2}
                onActivated={onDoubleTap}
            >
                <View
                    style={styles.postImageContainer}
                >
                    <Image
                        key={post?._id}
                        source={post?.imageUrl}
                        style={styles.postImage}
                        placeholder={{blurhash}}
                        transition={70}
                        
                    />

                    <Animated.View
                        style={[styles.likeHeartOverlay, animatedStyle]}
                    >
                        <Ionicons
                            name='heart'
                            size={100}
                            color={COLORS.primary}
                            style={styles.heartIconVisual}
                        />
                    </Animated.View>
                </View>
            </TapGestureHandler>
            

            {/* ACTIONS SECTION */}

            <View style={styles.actionsContainer}>

                <View style={styles.likesCommentsBookmarksContainer}>
                    <View style={styles.leftSectionActions}>
                        <TouchableOpacity
                            onPress={handleLike}
                            style={styles.action}
                        >
                            <Ionicons
                                name={!isLiked.isLiked? 'heart-outline' : 'heart'}
                                size={33}
                                color={!isLiked.isLiked? COLORS.primary : COLORS.red}
                            />
                            {
                                isLiked.likesNum !== 0 && <Text style={styles.actionsNums}>{isLiked.likesNum}</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setCommentsModalIsOpen(true)}
                            style={styles.action}
                        >
                            <Ionicons
                                name='chatbubble-outline'
                                size={28}
                                color={COLORS.primary}
                            />
                            {
                                comments?.length !== 0 && <Text style={styles.actionsNums}>{comments?.length}</Text>
                            }
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={handleAddBookmark}
                    >
                        <Ionicons
                            name={ !isBookmarked? 'bookmark-outline' : 'bookmark'}
                            size={30}
                            color={COLORS.primary}
                        />
                        
                    </TouchableOpacity>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.captionAuthorUser}>
                        {post?.author?.username} {'\u00A0'}
                        <Text style={styles.captionText}>
                            {post?.caption}
                        </Text>
                    </Text>
                    <Text style={styles.postTime}>{createdAt}</Text>
                </View>

            </View>
            <CommentsModal 
                modalIsOpen={commentsModalIsOpen} 
                onSetModal={onSetCommentsModal}
                postUsername={post?.author?.username}
                actualUserPicture={post?.actualUserPicture}
                postId={post?._id}
                comments={comments}
            />
        </View>
    );
};
