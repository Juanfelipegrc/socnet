import React, { useEffect, useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/profile.styles';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Image } from 'expo-image';
import { COLORS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@clerk/clerk-expo';
import {useUserActual} from '../hooks/useUserActual';
import { EditProfileModal } from './EditProfileModal';
import { useActiveUser } from '../hooks/useActiveUser';
import { usePathname, useRouter } from 'expo-router';
import { useActivePost } from '../hooks/useActivePost';
import {usePosts} from '../hooks/usePosts'
import { useRoute } from '@react-navigation/native';

export const ProfileHeader = () => {

    const [isLoadingImage, setIsLoadingImage] = useState(true);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [shouldDelete, setShouldDelete] = useState(false);
    const [isActualUser, setIsActualUser] = useState(true);
    const [activeUserSaved, setActiveUserSaved] = useState(null);


    const {onSetActiveUser, activeUserState, onCleanActiveUser} = useActiveUser();
    const validationIsFollowing = useQuery(api.profile.validateIsFollowing, activeUserState?._id?.length !== 0? {userId: activeUserState?._id} : 'skip');
   
    const [isFollowing, setIsFollowing] = useState(validationIsFollowing);
    const {onSetActualUser, userActualState} = useUserActual();

    const toggleFollowUser = useMutation(api.profile.toggleFollowUser);


    const {onCleanActivePost} = useActivePost();
    const {onCleanAllUserInfo} = usePosts();

    const user = useQuery(api.profile.getActualUser);
    const {signOut} = useAuth();

    const router = useRouter();
    const pathname = usePathname();

    const blurhash = 'L0000000?^000000000000000000';






    const handleLoad = () => {
        setIsLoadingImage(false);
    };

    const onSetEditingProfile = (value) => {
        setIsEditingProfile(value);
    }

    const onNavigatePath = () => {
        router.back()
    
    }

    const onLogout = () => {
        onCleanActiveUser();
        onCleanActivePost();
        onCleanAllUserInfo();
        signOut();
    }

    const handleFollow = async() => {

        if(activeUserState?._id?.length === 0) return;
        if(activeUserState?._id === userActualState?._id) return;
        const follow = await toggleFollowUser({userId: activeUserState?._id});
 

        setIsFollowing(follow);
 
    }


 




    useEffect(() => {
      if(validationIsFollowing === undefined) return;
      if(validationIsFollowing === isFollowing) return;

      setIsFollowing(validationIsFollowing)
    }, [validationIsFollowing])
    

    


    


    useEffect(() => {
        if(activeUserState?._id?.length === 0) return;
        if(activeUserState?._id !== userActualState?._id){
            setIsActualUser(false);
        }

        setActiveUserSaved(activeUserState);
    }, [activeUserState])
    



    useEffect(() => {
        if(!activeUserSaved || activeUserState === activeUserSaved || activeUserState === undefined || isActualUser) return; 
        onSetActiveUser(activeUserState, false);
    }, [activeUserState]);
    
    
    
    useEffect(() => {
        if(user === undefined) return;
        onSetActualUser(user);
    }, [user]);


    

    if(isActualUser){
        return (
            <View style={styles.profileheader}>
                <View style={styles.headerMainSection}>
                    <View style={styles.headerMainSectionActiveUser}>
                        {
                            pathname.split('/')[1] === 'user-profile' && (
                                <TouchableOpacity
                                    onPress={onNavigatePath}
                                >
                                    <Ionicons       
                                    name='arrow-back'
                                    size={25}
                                    color={COLORS.primary}
                                    />
                                </TouchableOpacity>
                            )
                        }
                        <Text style={styles.username}>{userActualState?.username}</Text>
                    </View>


                    <TouchableOpacity
                        onPress={onLogout}
                        >
                        <Ionicons 
                            name='log-out-outline'
                            size={27}
                            color={COLORS.primary}
                        />
    
                    </TouchableOpacity>
                </View>
                <View style={styles.headerFirstSection}>
    
                    <View style={styles.leftSectionContainer}>
                        <Image
                            source={userActualState?.image}
                            style={styles.profilePicture}
                            onLoad={handleLoad}
                            placeholder={{blurhash}}
                            transition={50}
                        />
                    </View>
    
                    <View style={styles.rightSectionContainer}>
                        <View style={styles.rightSection}>
                            <Text style={styles.name}>{userActualState?.fullname}</Text>
                            <View style={styles.followsContainer}>
                                <View style={styles.postNumContainer}>
                                    <Text style={styles.stadisticNums}>{userActualState?.posts}</Text>
                                    <Text style={styles.stadisticTitles}>posts</Text>
                                </View>
                                <View style={styles.followersContainer}>
                                    <Text style={styles.stadisticNums}>{userActualState?.followers}</Text>
                                    <Text style={styles.stadisticTitles}>followers</Text>
                                </View>
                                <View style={styles.followingContainer}>
                                    <Text style={styles.stadisticNums}>{userActualState?.following}</Text>
                                    <Text style={styles.stadisticTitles}>following</Text>
                                </View>
                            </View>
                        </View>
                    </View>
    
                </View>
    
                <View style={styles.headerSecondSection}>
                    <Text style={styles.bioText}>{userActualState?.bio}</Text>
                </View>
    
                <View style={styles.headerThirdSection}>
                    <TouchableOpacity
                        style={styles.editProfileButton}
                        onPress={() => setIsEditingProfile(true)}
                    >
                        <Text style={styles.editProfileButtonText}>Edit profile</Text>
                    </TouchableOpacity>
                </View>
    
                <EditProfileModal isEditingProfile={isEditingProfile} onSetIsEditingProfile={onSetEditingProfile} userActualState={userActualState}/>
                    
            </View>
        );
    } else {
        return (
            <View style={styles.profileheader}>
                <View style={styles.headerMainSectionActiveUser}>
                    <TouchableOpacity
                        onPress={onNavigatePath}
                    >
                        <Ionicons       
                        name='arrow-back'
                        size={25}
                        color={COLORS.primary}
                        />
                    </TouchableOpacity>
                    <Text style={styles.username}>{activeUserState?.username}</Text>
                    
                </View>
                <View style={styles.headerFirstSection}>
    
                    <View style={styles.leftSectionContainer}>
                        <Image
                            source={activeUserState?.image}
                            style={styles.profilePicture}
                            onLoad={handleLoad}
                            placeholder={{blurhash}}
                            transition={50}
                        />
                    </View>
    
                    <View style={styles.rightSectionContainer}>
                        <View style={styles.rightSection}>
                            <Text style={styles.name}>{activeUserState?.fullname}</Text>
                            <View style={styles.followsContainer}>
                                <View style={styles.postNumContainer}>
                                    <Text style={styles.stadisticNums}>{activeUserState?.posts}</Text>
                                    <Text style={styles.stadisticTitles}>posts</Text>
                                </View>
                                <View style={styles.followersContainer}>
                                    <Text style={styles.stadisticNums}>{activeUserState?.followers}</Text>
                                    <Text style={styles.stadisticTitles}>followers</Text>
                                </View>
                                <View style={styles.followingContainer}>
                                    <Text style={styles.stadisticNums}>{activeUserState?.following}</Text>
                                    <Text style={styles.stadisticTitles}>following</Text>
                                </View>
                            </View>
                        </View>
                    </View>
    
                </View>
    
                <View style={styles.headerSecondSection}>
                    <Text style={styles.bioText}>{activeUserState?.bio}</Text>
                </View>
    
                <View style={styles.headerThirdSection}>
                    <Pressable
                        onPress={() => {
                            if(activeUserState?._id === userActualState?._id){
                            setIsEditingProfile(true);
                            } else {
                            handleFollow();
                            }
                        }}
                        style={({ pressed }) => [
                            activeUserState?._id !== userActualState?._id && isFollowing
                            ? styles.messageProfileButton
                            : styles.editProfileButton,
                            pressed && { opacity: 0.5 }
                        ]}
                        >
                        <Text style={styles.editProfileButtonText}>
                            {activeUserState?._id === userActualState?._id
                            ? 'Edit Profile'
                            : isFollowing
                            ? 'Unfollow'
                            : 'Follow'}
                        </Text>
                        </Pressable>
                    {
                        activeUserState?._id !== userActualState?._id && (
                            <TouchableOpacity
                                style={styles.messageProfileButton}
                            >
                                <Text style={styles.editProfileButtonText}>Message</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
    
                <EditProfileModal isEditingProfile={isEditingProfile} onSetIsEditingProfile={onSetEditingProfile} userActualState={userActualState}/>

            </View>
        );
    }
};
