import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Stack, useRouter } from 'expo-router'
import { styles } from '../../styles/profile.styles'
import {styles as CreateStyles} from '../../styles/create.styles'
import { OwnPostCover } from '../../components/OwnPostCover'
import { ProfileHeader } from '../../components/ProfileHeader'
import { useActiveUser } from '../../hooks/useActiveUser'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/theme'
import { PostCover } from '../../components/PostCover'

export default function userProfile() {

    const {onSetActiveUser, activeUserState} = useActiveUser();
    
    
    const userPosts = useQuery(api.profile.getPostsByUser, activeUserState?._id? {userId: activeUserState?._id} : 'skip');

    const activeUserDB = useQuery(api.profile.getUserById, activeUserState?._id? {userId: activeUserState?._id} : 'skip');

 
          
      
        
      
        
    
      
        useEffect(() => {
          if (!activeUserDB || !activeUserState) return;
        
          const hasChanged =
            activeUserDB.followers !== activeUserState.followers ||
            activeUserDB.following !== activeUserState.following ||
            activeUserDB.posts !== activeUserState.posts;
        
          if (hasChanged) {
            onSetActiveUser({ ...activeUserDB, postsList: activeUserState.postsList }, false);
          }
        }, [activeUserDB]);

    
      useEffect(() => {
        if(userPosts === undefined) return;
        if(activeUserState?.postsList?.length === userPosts?.length) return;
        onSetActiveUser({...activeUserState, postsList: activeUserState?.postsList}, false);
      },[userPosts]);


      

  return (
    <View style={CreateStyles.container}>
        <View style={styles.container}>
              <FlatList
              data={activeUserState?.postsList}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => <PostCover post={item}/>}
              numColumns={3}
              ListHeaderComponent={<ProfileHeader/>}
              style={styles.container}
            />
        </View>

      <Stack.Screen options={{ title: 'Profile' , headerShown: false, animation: 'slide_from_right'}} />
    </View>
  )
}