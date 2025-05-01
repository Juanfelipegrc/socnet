import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from '../../styles/bookmarks.styles'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { BookmarkCover } from '../../components/BookmarkCover'
import { Loader } from '../../components/Loader'
import { BookmarksHeader } from '../../components/BookmarksHeader'
import { usePosts } from '../../hooks/usePosts'
import { NoBookmarksFound } from '../../components/NoBookmarksFound'

export default function Bookmarks() {

  const bookmarkedPosts = useQuery(api.bookmarks.getBookmarkedPosts);

  const {onSetBookmarks, posts} = usePosts();
  
  
  useEffect(() => {
    if(bookmarkedPosts === undefined) return;
    onSetBookmarks(bookmarkedPosts);
  },[bookmarkedPosts]);
  
  console.log({BOOKMARKS:
    posts.bookmarks
  })

  if(bookmarkedPosts?.length === 0) return (

    <View style={styles.container}>
      <BookmarksHeader/>
      <NoBookmarksFound/>
    </View>

  )

  return (
    <View style={styles.container}>



      <FlatList
          data={posts.bookmarks}
          renderItem={({item}) => <BookmarkCover key={item._id} post={item}/>}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<BookmarksHeader/>}
          numColumns={3}
          style={{width: '100%'}}
      />

    </View>
  )
}