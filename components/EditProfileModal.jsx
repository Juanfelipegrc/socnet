import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';
import { Text, View, KeyboardAvoidingView, TouchableOpacity, Modal, TouchableWithoutFeedback, TextInput } from 'react-native';
import { styles } from '../styles/profile.styles';
import { COLORS } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export const EditProfileModal = ({userActualState, isEditingProfile, onSetIsEditingProfile, }) => {

    const [hasOpened, setHasOpened] = useState(false);
    const [paddingIOS, setPaddingIOS] = useState(true);


    useEffect(() => {
    
        if(isEditingProfile && !hasOpened){
            setHasOpened(true)
        } else if(isEditingProfile && hasOpened) {
            setPaddingIOS(false);
        }

    }, [isEditingProfile]);
    


    
    return (
        <Modal
            visible={isEditingProfile}
            animationType='slide'
            transparent={true}
            onRequestClose={() => onSetIsEditingProfile(false)}
        >
            <SafeAreaView style={styles.safeAreaWrapper}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.modalContainer}
                    >
                        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? paddingIOS? 20 : 0 : 0 }}>
                            <View style={styles.modalHeader}>
                                <TouchableOpacity
                                    style={styles.closeModalButton}
                                    onPress={() => onSetIsEditingProfile(false)}
                                >
                                    <Ionicons
                                        name='close'
                                        size={27}
                                        color={COLORS.primary}
                                        
                                    />
                                </TouchableOpacity>
                                <Text style={styles.modalTitle}>
                                    Edit Profile
                                </Text>
                            </View>


                            <View style={styles.modalFirstSection}>
                                <Image
                                    source={userActualState?.image}
                                    style={styles.modalProfilePicture}
                                />
                                <TouchableOpacity 
                                    style={styles.editProfilePictureButton}
                                >
                                    <Text style={styles.editProfilePictureText}>Edit profile picture</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.modalSecondSection}>
                                <View style={styles.modalTitlesContainer}>
                                    
                                    <Text style={styles.modalTitleItem}>Name</Text>
                                    <Text style={styles.modalTitleItem}>Username</Text>
                                    <Text style={styles.modalTitleItem}>Pronous</Text>
                                    <Text style={styles.modalTitleItem}>Bio</Text>
                                    <Text style={styles.modalTitleItem}>Links</Text>
                                    <Text style={styles.modalTitleItem}>Banners</Text>
                                    <Text style={styles.modalTitleItem}>Music</Text>
                                    <Text style={styles.modalTitleItem}>Gender</Text>

                                </View>
                                <View style={styles.modalValuesContainer}>
                                    <TextInput
                                        placeholder='Name'
                                        value={userActualState?.fullname}
                                        style={styles.modalValueItem}
                                    />
                                    <TextInput
                                        placeholder='Username'
                                        value={userActualState?.username}
                                        style={styles.modalValueItem}
                                    />
                                    <TextInput
                                        placeholder='Pronous'
                                        value='Pronous'
                                        style={styles.modalValueItem}
                                    />
                                    <TextInput
                                        placeholder='Bio'
                                        value={userActualState?.bio}
                                        style={styles.modalValueItem}
                                    />
                                    <TextInput
                                        placeholder='Links'
                                        value='No links yet'
                                        style={styles.modalValueItem}
                                    />
                                    <TextInput
                                        placeholder='Banners'
                                        value='No banners yet'
                                        style={styles.modalValueItem}
                                    />
                                    <TextInput
                                        placeholder='Music'
                                        value='No music yet'
                                        style={styles.modalValueItem}
                                    />
                                    <TextInput
                                        placeholder='Gender'
                                        value='No chosed yet'
                                        style={styles.modalValueItem}
                                    />
                                    
                                </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </Modal>
    );
};
