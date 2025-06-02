import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Post } from '../../components/Post'
import { useActivePost } from '../../hooks/useActivePost'
import { styles } from '../../styles/create.styles';
import { Stack, usePathname, useRouter } from 'expo-router';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';


export default function PostDetails() {

  const {post} = useActivePost();
  const router = useRouter();
  
  const onNavigatePath = () => {
    router.back();
  }

  


  return (
    <View style={styles.container}>
      <View style={styles.createHeader}>
        <TouchableOpacity
            onPress={onNavigatePath}
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