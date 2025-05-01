import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../../styles/auth.styles'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/theme'
import { useSSO } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

export default function Login() {


    const router = useRouter();
    const {startSSOFlow} = useSSO();

    const handleGoogleSignIn = async() => {
        try {
            const {createdSessionId, setActive} = await startSSOFlow({strategy: 'oauth_google'});

            if(setActive && createdSessionId) {
                setActive({
                    session: createdSessionId
                });
                router.replace('/(tabs)');
            }
        } catch (error) {
            console.error('Authentication Error', error)
        }
    };


  return (
    <View style={styles.container}>
        <Ionicons name='rocket' size={60} color={COLORS.primary}/>
        <Text style={styles.authTitle}>
            soc
            <Text style={styles.authTitleBlue}>net</Text>
        </Text>

        <Text style={styles.persuasiveText}>Don't miss anything</Text>

        <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
        >
            <Ionicons 
                name='logo-google'
                size={20}
                color={COLORS.secondary}
            />
            <Text>Continue with Google</Text>
        </TouchableOpacity>
    </View>
  )
}