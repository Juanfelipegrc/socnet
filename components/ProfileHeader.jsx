import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Modal, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { styles } from '../styles/profile.styles';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Image } from 'expo-image';
import { LoaderStories } from './LoaderStories';
import { COLORS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@clerk/clerk-expo';
import { useActiveUser } from '../hooks/useActiveUser';
import { EditProfileModal } from './EditProfileModal';

export const ProfileHeader = () => {

    const [isLoadingImage, setIsLoadingImage] = useState(true);
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    const {onSetActiveUser, userActiveState} = useActiveUser();

    const user = useQuery(api.profile.getActualUser);
    const {signOut} = useAuth();

    const blurhash = 'L0000000?^000000000000000000';

    const handleLoad = () => {
        setIsLoadingImage(false);
    };

    const onSetEditingProfile = (value) => {
        setIsEditingProfile(value);
    }

    useEffect(() => {
        if(user === undefined) return;
        onSetActiveUser(user);
    }, [user]);
    

    return (
        <View style={styles.profileheader}>
            <View style={styles.headerMainSection}>
                <Text style={styles.username}>{userActiveState?.username}</Text>
                <TouchableOpacity
                    onPress={signOut}
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
                        source={userActiveState?.image}
                        style={styles.profilePicture}
                        onLoad={handleLoad}
                        placeholder={{blurhash}}
                        transition={50}
                    />
                </View>

                <View style={styles.rightSectionContainer}>
                    <View style={styles.rightSection}>
                        <Text style={styles.name}>{userActiveState?.fullname}</Text>
                        <View style={styles.followsContainer}>
                            <View style={styles.postNumContainer}>
                                <Text style={styles.stadisticNums}>{userActiveState?.posts}</Text>
                                <Text style={styles.stadisticTitles}>posts</Text>
                            </View>
                            <View style={styles.followersContainer}>
                                <Text style={styles.stadisticNums}>{userActiveState?.followers}</Text>
                                <Text style={styles.stadisticTitles}>followers</Text>
                            </View>
                            <View style={styles.followingContainer}>
                                <Text style={styles.stadisticNums}>{userActiveState?.following}</Text>
                                <Text style={styles.stadisticTitles}>following</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </View>

            <View style={styles.headerSecondSection}>
                <Text style={styles.bioText}>{userActiveState?.bio}</Text>
            </View>

            <View style={styles.headerThirdSection}>
                <TouchableOpacity
                    style={styles.editProfileButton}
                    onPress={() => setIsEditingProfile(true)}
                >
                    <Text style={styles.editProfileButtonText}>Edit profile</Text>
                </TouchableOpacity>
            </View>

            <EditProfileModal isEditingProfile={isEditingProfile} onSetIsEditingProfile={onSetEditingProfile} userActiveState={userActiveState}/>
                
        </View>
    );
};
