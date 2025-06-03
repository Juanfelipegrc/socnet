import { FlatList, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { OwnPostCover } from '../../components/OwnPostCover';
import { ProfileHeader } from '../../components/ProfileHeader';
import {Loader} from '../../components/Loader'
import { styles } from '../../styles/profile.styles';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useActiveUser } from '../../hooks/useActiveUser';
import {NoPostsFound} from '../../components/NoPostsFound';

export default function Profile() {

  const actualUser = useQuery(api.profile.getActualUser);
  const ownPosts = useQuery(api.profile.getPostsByUser, {userId: actualUser?._id});

  




  

  

  return (
    <View style={styles.container}>
        {
          ownPosts?.length === 0? (
            <>
            <ProfileHeader/>
            <NoPostsFound/>
            </>
          )
          :
          (
            <FlatList
            data={ownPosts}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <OwnPostCover post={item}/>}
            numColumns={3}
            ListHeaderComponent={<ProfileHeader/>}
            style={styles.container}
          />
          )
        }
    </View>
  )
}