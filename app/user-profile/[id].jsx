import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Stack, useRouter } from 'expo-router'
import { styles } from '../../styles/profile.styles'
import {styles as CreateStyles} from '../../styles/create.styles'
import { OwnPostCover } from '../../components/OwnPostCover'
import { ProfileHeader } from '../../components/ProfileHeader'
import { useActiveUser } from '../../hooks/useActiveUser'
import { PostCover } from '../../components/PostCover'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { NoPostsFound } from '../../components/NoPostsFound'

export default function userProfile() {

    const {activeUserState} = useActiveUser();
    

    const activeUserPosts = useQuery(api.profile.getPostsByUser, activeUserState?._id? {userId: activeUserState?._id} : 'skip');

   
    if(activeUserPosts?.length === 0) return (
  
      <View style={styles.container}>
        <ProfileHeader/>
        <NoPostsFound/>
      </View>
  
    )
      

  return (
    <View style={CreateStyles.container}>
        <View style={styles.container}>
              <FlatList
              data={activeUserPosts}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => <PostCover post={item}/>}
              numColumns={3}
              ListHeaderComponent={<ProfileHeader/>}
              style={styles.container}
            />
        </View>

      <Stack.Screen options={{ title: 'Profile' , headerShown: false, animation: 'ios_from_right'}} />
    </View>
  )
}