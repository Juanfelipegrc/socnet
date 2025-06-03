import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { styles } from '../../styles/feed.styles'
import { useAuth } from '@clerk/clerk-expo'
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { NoPostsFound } from '../../components/NoPostsFound';
import { Post } from '../../components/Post';
import { HomeHeader } from '../../components/HomeHeader';




export default function Index() {

  const {isSignedIn, signOut} = useAuth();


  const queryResult = useQuery(api.posts.getFeedPosts);
  

      


  useEffect(() => {

    setTimeout(() => {
      if(queryResult?.problem === 'no-user' && isSignedIn) signOut();
    }, 3000);

  }, [queryResult?.problem]);
  

  

  return (
    <View style={styles.container}>


       

        {
          queryResult?.posts?.length === 0 && (
            <NoPostsFound/>
          )
        }


        {
          queryResult?.posts?.length !== 0 && queryResult?.posts !== undefined && (
            <FlatList
              data={queryResult.posts}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 64}}
              renderItem={({item}) => <Post post={item}/>}
              ListHeaderComponent={<HomeHeader/>}
            />
          )
        }

        
    </View>
  )
}