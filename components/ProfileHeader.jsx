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

export const ProfileHeader = () => {

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isActualUser, setIsActualUser] = useState(null);


    const {activeUserState, onCleanActiveUser} = useActiveUser();
    const activeUser = useQuery(api.profile.getUserById, activeUserState?._id? {userId: activeUserState?._id} : 'skip');
    const actualUser = useQuery(api.profile.getActualUser);


    const validationIsFollowing = useQuery(api.profile.validateIsFollowing, activeUser?._id? {userId: activeUser?._id} : 'skip');
    const toggleFollowUser = useMutation(api.profile.toggleFollowUser);
    
   
    const [isFollowing, setIsFollowing] = useState(validationIsFollowing);



    const {onCleanActivePost} = useActivePost();
    const {signOut} = useAuth();
    const router = useRouter();
    const pathname = usePathname();


    const blurhash = 'L0000000?^000000000000000000';



    const onSetEditingProfile = (value) => {
        setIsEditingProfile(value);
    }

    const onNavigatePath = () => {
        router.back()
    
    }


    const onLogout = () => {
        signOut();
        setTimeout(() => {
            onCleanActiveUser();
            onCleanActivePost();
        }, 500);
    }

    const handleFollow = async() => {

        if(activeUser?._id?.length === 0) return;
        if(activeUser?._id === actualUser?._id) return;
        const follow = await toggleFollowUser({userId: activeUser?._id});
 

        setIsFollowing(follow);
 
    };



    useEffect(() => {
        if(pathname === '/profile' || pathname.split('/')[1] === 'user-profile' && pathname.split('/')[2] === actualUser?._id){
            setIsActualUser(true);
        } else {
            setTimeout(() => {
                setIsActualUser(false);
            }, 500);
        }
    }, [pathname]);


    useEffect(() => {
      setIsFollowing(validationIsFollowing)
    }, [validationIsFollowing])
    
    

    


 



    

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
                        <Text style={styles.username}>{actualUser?.username}</Text>
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
                            source={actualUser?.image}
                            style={styles.profilePicture}
                            placeholder={{blurhash}}
                            transition={50}
                        />
                    </View>
    
                    <View style={styles.rightSectionContainer}>
                        <View style={styles.rightSection}>
                            <Text style={styles.name}>{actualUser?.fullname}</Text>
                            <View style={styles.followsContainer}>
                                <View style={styles.postNumContainer}>
                                    <Text style={styles.stadisticNums}>{actualUser?.posts}</Text>
                                    <Text style={styles.stadisticTitles}>posts</Text>
                                </View>
                                <View style={styles.followersContainer}>
                                    <Text style={styles.stadisticNums}>{actualUser?.followers}</Text>
                                    <Text style={styles.stadisticTitles}>followers</Text>
                                </View>
                                <View style={styles.followingContainer}>
                                    <Text style={styles.stadisticNums}>{actualUser?.following}</Text>
                                    <Text style={styles.stadisticTitles}>following</Text>
                                </View>
                            </View>
                        </View>
                    </View>
    
                </View>
    
                <View style={styles.headerSecondSection}>
                    <Text style={styles.bioText}>{actualUser?.bio}</Text>
                </View>
    
                <View style={styles.headerThirdSection}>
                    <TouchableOpacity
                        style={styles.editProfileButton}
                        onPress={() => setIsEditingProfile(true)}
                    >
                        <Text style={styles.editProfileButtonText}>Edit profile</Text>
                    </TouchableOpacity>
                </View>
    
                <EditProfileModal isEditingProfile={isEditingProfile} onSetIsEditingProfile={onSetEditingProfile} userActualState={actualUser}/>
                    
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
                    <Text style={styles.username}>{activeUser?.username}</Text>
                    
                </View>
                <View style={styles.headerFirstSection}>
    
                    <View style={styles.leftSectionContainer}>
                        <Image
                            source={activeUser?.image}
                            style={styles.profilePicture}
                
                            placeholder={{blurhash}}
                            transition={50}
                        />
                    </View>
    
                    <View style={styles.rightSectionContainer}>
                        <View style={styles.rightSection}>
                            <Text style={styles.name}>{activeUser?.fullname}</Text>
                            <View style={styles.followsContainer}>
                                <View style={styles.postNumContainer}>
                                    <Text style={styles.stadisticNums}>{activeUser?.posts}</Text>
                                    <Text style={styles.stadisticTitles}>posts</Text>
                                </View>
                                <View style={styles.followersContainer}>
                                    <Text style={styles.stadisticNums}>{activeUser?.followers}</Text>
                                    <Text style={styles.stadisticTitles}>followers</Text>
                                </View>
                                <View style={styles.followingContainer}>
                                    <Text style={styles.stadisticNums}>{activeUser?.following}</Text>
                                    <Text style={styles.stadisticTitles}>following</Text>
                                </View>
                            </View>
                        </View>
                    </View>
    
                </View>
    
                <View style={styles.headerSecondSection}>
                    <Text style={styles.bioText}>{activeUser?.bio}</Text>
                </View>
    
                <View style={styles.headerThirdSection}>
                    
                            
                            {
                                isFollowing? (
                                    <Pressable
                                        onPress={handleFollow}
                                        style={({ pressed }) => [
                                            styles.messageProfileButton,
                                            pressed && { opacity: 0.5 }
                                        ]}
                                    >
                                        <Text style={styles.editProfileButtonText}>
                                        {'Unfollow'}
                                        </Text>
                                    </Pressable>
                                )
                                :
                                (
                                    <Pressable
                                        onPress={handleFollow}
                                        style={({ pressed }) => [
                                            styles.editProfileButton,
                                            pressed && { opacity: 0.5 }
                                        ]}
                                    >
                                        <Text style={styles.editProfileButtonText}>
                                        {'Follow'}
                                        </Text>
                                    </Pressable>
                                )
                            }
                               
                   
                            <TouchableOpacity
                                style={styles.messageProfileButton}
                            >
                                <Text style={styles.editProfileButtonText}>Message</Text>
                            </TouchableOpacity>
                    
                </View>
    
              
            </View>
        );
    }
};
