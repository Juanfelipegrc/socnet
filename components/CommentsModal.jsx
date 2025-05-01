import React from 'react';
import { Keyboard, Platform, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { styles } from '../styles/feed.styles';
import Modal from 'react-native-modal';
import { KeyboardAvoidingView } from 'react-native';
import { COLORS } from '../constants/theme';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';

export const CommentsModal = ({modalIsOpen, onSetModal, postUsername, actualUserPicture}) => {


    const closeModal = () => {
        onSetModal(false);
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
                    <TouchableWithoutFeedback
                        onPress={Keyboard.dismiss}
                    >
                        <View style={{flex: 1}}></View>
                    </TouchableWithoutFeedback>
                    <View style={styles.inputCommentsContainer}>
                        <Image
                            style={styles.actualUserPicture}
                            source={actualUserPicture}
                        />
                        <TextInput
                            placeholder={`Add a comment for ${postUsername}`}
                            multiline
                            placeholderTextColor={COLORS.primary}
                            style={styles.inputComments}
                        />
                    </View>
                </KeyboardAvoidingView>

           
        </Modal>
        </SafeAreaView>
    );
};
