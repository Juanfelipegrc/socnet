import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/bookmarks.styles';
import { Image } from 'expo-image';
import { useActivePost } from '../hooks/useActivePost';
import { usePathname } from 'expo-router';

export const BookmarkCover = ({post}) => {

    const {onSetActivePost} = useActivePost();
    const actualPath = usePathname();


    
    const blurhash = 'L0000000?^000000000000000000';
    return (
        <TouchableOpacity 
            style={styles.bookmark}
            onPress={() => onSetActivePost(post, [actualPath])}
        >
            <Image
                source={post.imageUrl}
                style={styles.bookmarkImage}
                transition={50}
                placeholder={{blurhash}}
            />
        </TouchableOpacity>
    );
};
