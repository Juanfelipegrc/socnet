import React, { useState } from 'react';
import { FlatList, Keyboard, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { styles } from '../styles/feed.styles';
import Modal from 'react-native-modal';
import { KeyboardAvoidingView } from 'react-native';
import { COLORS } from '../constants/theme';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Ionicons } from '@expo/vector-icons';
import { Comment } from './Comment';

export const CommentsModal = ({modalIsOpen, onSetModal, postUsername, actualUserPicture, comments, postId}) => {

    const [actualComment, setActualComment] = useState('');
    const createComment = useMutation(api.comments.createComment);



    const closeModal = () => {
        onSetModal(false);
    };

    const onSubmitComment = () => {

        if(!actualComment?.trim()) return;
        try {
            createComment({postId: postId, comment: actualComment,})
        } catch (error) {
            console.error(error, 'Error Creating The Comment');
        } finally{
            setActualComment('');
        }
    }



    return (
        <SafeAreaView style={{flex: 1}}>
            
           
        <Modal 
            isVisible={modalIsOpen}
            animationIn='slideInUp'
            animationOut='slideOutDown'
            animationInTiming={400}
            animationOutTiming={300}
            backdropColor='black'
            backdropOpacity={0.6}
            backdropTransitionInTiming={0}
            backdropTransitionOutTiming={0}
            onBackButtonPress={closeModal}
            onBackdropPress={closeModal}
            statusBarTranslucent
            avoidKeyboard
            style={styles.commentsModal}
        >
            <KeyboardAvoidingView 
                style={styles.commentsModalContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                    

                    <Text style={styles.commentsModalTitle}>Comments</Text>
                    <FlatList
                        data={comments}
                        contentContainerStyle={{paddingVertical:20}}
                        renderItem={({item}) => <Comment comment={item}/>}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    />

                    <View style={styles.inputCommentsContainer}>
                        <Image
                            style={styles.actualUserPicture}
                            source={actualUserPicture}
                        />
                        <TextInput
                            placeholder={`Add a comment for ${postUsername}`}
                            multiline
                            value={actualComment}
                            onChangeText={setActualComment}
                            placeholderTextColor={COLORS.primary}
                            
                            style={styles.inputComments}
                        />
                        <TouchableOpacity
                            onPress={onSubmitComment}
                        >
                            <Ionicons
                                name='send-outline'
                                size={26}
                                color={COLORS.primary}
                                // style={{position: 'absolute', bottom: 10, right: 10}}
                                
                            />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

           
        </Modal>
        </SafeAreaView>
    );
};
