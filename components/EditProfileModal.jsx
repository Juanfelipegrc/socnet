import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';
import { Text, View, KeyboardAvoidingView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { styles } from '../styles/profile.styles';
import { COLORS } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export const EditProfileModal = ({userActualState, isEditingProfile,  onSetIsEditingProfile, }) => {





    
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
                        <View style={{ flex: 1}}>
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
                                
                                <TouchableOpacity style={styles.userValueItem}>
                                    <View style={styles.itemTitle}>
                                        <Text style={styles.userItemText}>
                                            Name
                                        </Text>
                                    </View>
                                    <View style={styles.itemValue}>
                                        <Text style={styles.userItemText}>
                                            {userActualState?.fullname}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={styles.userValueItem}>
                                    <View style={styles.itemTitle}>
                                        <Text style={styles.userItemText}>
                                            Username
                                        </Text>
                                    </View>
                                    <View style={styles.itemValue}>
                                        <Text style={styles.userItemText}>
                                            {userActualState?.username}
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.userValueItem}>
                                    <View style={styles.itemTitle}>
                                        <Text style={styles.userItemText}>
                                            Pronouns
                                        </Text>
                                    </View>
                                    <View style={styles.itemValue}>
                                        <Text style={styles.userItemText}>
                                            Pronouns
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.userValueItem}>
                                    <View style={styles.itemTitle}>
                                        <Text style={styles.userItemText}>
                                            Bio
                                        </Text>
                                    </View>
                                    <View style={styles.itemValue}>
                                        <Text style={styles.userItemText}>
                                            {userActualState?.bio}
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.userValueItem}>
                                    <View style={styles.itemTitle}>
                                        <Text style={styles.userItemText}>
                                            Links
                                        </Text>
                                    </View>
                                    <View style={styles.itemValue}>
                                        <Text style={styles.userItemTextNoValue}>
                                            Add links
                                        </Text>
                                        <MaterialIcons
                                            name='arrow-forward-ios'
                                            style={styles.arrowItem}
                                        />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.userValueItem}>
                                    <View style={styles.itemTitle}>
                                        <Text style={styles.userItemText}>
                                            Banners
                                        </Text>
                                    </View>
                                    <View style={styles.itemValue}>
                                        <Text style={styles.userItemTextNoValue}>
                                            Add Banners
                                        </Text>
                                        <MaterialIcons
                                            name='arrow-forward-ios'
                                            style={styles.arrowItem}
                                        />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.userValueItemWithBorder}>
                                    <View style={styles.itemTitle}>
                                        <Text style={styles.userItemText}>
                                            Music
                                        </Text>
                                    </View>
                                    <View style={styles.itemValueWithoutBorder}>
                                        <Text style={styles.userItemTextNoValue}>
                                            Add Music to your profile
                                        </Text>
                                        <MaterialIcons
                                            name='arrow-forward-ios'
                                            style={styles.arrowItem}
                                        />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.userValueItemWithBorder}>
                                    <View style={styles.itemTitle}>
                                        <Text style={styles.userItemText}>
                                            Gender
                                        </Text>
                                    </View>
                                    <View style={styles.itemValueWithoutBorder}>
                                        <Text style={styles.userItemText}>
                                            Male
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                    
                            </View>    
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </Modal>
    );
};
