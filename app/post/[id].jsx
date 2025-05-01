import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Post } from '../../components/Post'
import { useActivePost } from '../../hooks/useActivePost'
import { styles } from '../../styles/create.styles';
import { Stack, useRouter } from 'expo-router';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import { Loader } from '../../components/Loader';

export default function PostDetails() {

  const {post, lastPath} = useActivePost();
  const router = useRouter();
  const path = lastPath === 'profile'? '/(tabs)/profile' : '/(tabs)/bookmarks';





  return (
    <View style={styles.container}>
      <View style={styles.createHeader}>
        <TouchableOpacity
            onPress={() => router.replace(path)}
            style={styles.backButton}
        >
            <Ionicons       
            name='arrow-back'
            size={25}
            color={COLORS.primary}
            />
        </TouchableOpacity>
      </View>
          <Stack.Screen options={{ title: 'Post' , headerShown: false, animation: 'slide_from_right'}} />
          <Post post={post} />
      
    </View>
  )
}