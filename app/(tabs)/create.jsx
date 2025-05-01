import { View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import { styles } from '../../styles/create.styles'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/theme'
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { useMutation } from 'convex/react'
import {api} from '../../convex/_generated/api'
import * as FileSystem from 'expo-file-system'
import { Image } from 'expo-image'
import { useUser } from '@clerk/clerk-expo'

export default function Create() {

    const [selectedImage, setSelectedImage] = useState(null);
    const [manipulatedImage, setManipulatedImage] = useState(null)
    const [caption, setCaption] = useState('');
    const [isSharing, setIsSharing] = useState(false);
    const scrollViewRef = useRef(null);

    const {user} = useUser()
    const router = useRouter();

    const blurhash = 'L6Pj0^i_.AyE_3t7t7R**0o#DgR4';

    const pickImage = async() => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if(!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }

        const originarUri = result.assets[0].uri;
        const originarWidth = result.assets[0].width;
        const originalHeight = result.assets[0].height;

        try {
            const targetWidth = 1080;
            const shouldResize = originarWidth > targetWidth;

            const context = ImageManipulator.ImageManipulator.manipulate(originarUri);

            if(shouldResize){
                context.resize({width: targetWidth});
            }

            const imageRef = await context.renderAsync();

            const saveOptions = {
                compress: 0.75,
                format: ImageManipulator.SaveFormat.WEBP,
            };

            const finalResult = await imageRef.saveAsync(saveOptions);

            setManipulatedImage(finalResult.uri)

        } catch (error) {
            console.error(error);
        }
    };

    const generateUploadUrl = useMutation(api.posts.generateUploadUrl);
    const createPost = useMutation(api.posts.createPost);

    const handleShare = async() => {
        if(!manipulatedImage) return;

        try {
            setIsSharing(true);
            const uploadUrl = await generateUploadUrl();

            const uploadResult = await FileSystem.uploadAsync(uploadUrl, manipulatedImage, {
                httpMethod: 'POST',
                uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
                mimeType: 'image/webp',
            });

            if(uploadResult.status !== 200) {
                throw new Error('Upload failed')
            };

            const {storageId} = JSON.parse(uploadResult.body);
            await createPost({storageId, caption});

            router.push('/(tabs)');


        } catch (error) {
            console.error('Error sharing', error);
        } finally {
            setIsSharing(false);
            setSelectedImage(null);
            setCaption('');
        }
    }


    const handleScrollScrollView = () => {
        setTimeout(() => {
            scrollViewRef?.current.scrollToEnd({animated: true});
        }, 280);
    }



    if(!selectedImage) {
        return (
            <View style={styles.container}>

                {/* HEADER */}
                <View style={styles.createHeader}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <Ionicons       name='arrow-back'
                    size={25}
                    color={COLORS.primary}
                    />
                </TouchableOpacity>
                <Text style={styles.titleHeader}>
                    POST
                </Text>
                </View>

                <TouchableOpacity
                    style={styles.createPostButton}
                    onPress={pickImage}
                >
                    <View style={styles.iconAndText}>
                        <Ionicons
                            name='image-outline'
                            size={62}
                            color={COLORS.primary}
                        />

                        <Text style={styles.createPostButtonText}>
                            Tap to chose an image
                        </Text>
                    </View>

                </TouchableOpacity>

            </View>
  )}

  return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios'? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={20}

        >


            {/* HEADER */}
            <View style={styles.createHeader}>
            <TouchableOpacity
                onPress={() => {
                    setIsSharing(false);
                    setSelectedImage(null);
                    setCaption('');
                }}
                style={styles.backButton}
            >
                <Ionicons       
                name='close-outline'
                size={27}
                color={COLORS.primary}
                />
            </TouchableOpacity>
            <Text style={styles.titleHeader}>
                POST
            </Text>

            <TouchableOpacity
                onPress={handleShare}
                style={!isSharing? styles.shareButton : styles.shareButtonDisabled}
            >
                {
                    !isSharing? (
                        <Text style={styles.shareButtonText}>Share</Text>
                    )
                    : (
                        <ActivityIndicator size={'small'} color={COLORS.primary}/>
                    )
                }
            </TouchableOpacity>

            </View>

            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.scrollContent}
                bounces={false}
                keyboardShouldPersistTaps='handled'
                contentOffset={{y: 0, x: 0}}
            >
                <View style={styles.contentContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={selectedImage}
                            style={styles.postImage}
                            placeholder={{blurhash}}
                            transition={200}
                        />
                        <TouchableOpacity
                            style={styles.changeButton}
                            onPress={pickImage}
                        >
                            <Ionicons 
                                name='image-outline'
                                size={18}
                                color={COLORS.primary}
                            />
                            <Text style={styles.changeButtonText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.captionContainer}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={user?.imageUrl}
                                style={styles.avatarCaption}
                            />
                        </View>
                        <TextInput
                                placeholder='Write a caption...'
                                multiline
                                onLayout={handleScrollScrollView}
                                onFocus={handleScrollScrollView}
                                style={styles.captionInput}
                                value={caption}
                                onChangeText={setCaption}
                                editable={!isSharing}
                                placeholderTextColor={COLORS.grey}
                            />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
  )
}