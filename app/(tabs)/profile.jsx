import { FlatList, View } from 'react-native'
import React, { useEffect } from 'react'
import { OwnPostCover } from '../../components/OwnPostCover';
import { ProfileHeader } from '../../components/ProfileHeader';
import {Loader} from '../../components/Loader'
import { styles } from '../../styles/profile.styles';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { usePosts } from '../../hooks/usePosts';


export default function Profile() {

  const ownPosts = useQuery(api.profile.getPostByCurrentUser);
  const {onSetPosts, posts} = usePosts();

  

  useEffect(() => {
    if(ownPosts === undefined) return;
    onSetPosts(ownPosts);
  },[ownPosts]);
  console.log({BOOKMARKSPROFILE:posts.bookmarks})

  


  return (
    <View style={styles.container}>
        <FlatList
        data={posts.posts}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <OwnPostCover post={item}/>}
        numColumns={3}
        ListHeaderComponent={<ProfileHeader/>}
        style={styles.container}
      />
    </View>
  )
}