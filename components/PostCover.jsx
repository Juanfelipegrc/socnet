import { Image } from 'expo-image';
import React from 'react';
import { styles } from '../styles/profile.styles';
import { TouchableOpacity, View } from 'react-native';
import { useActivePost } from '../hooks/useActivePost';
import { useActiveUser } from '../hooks/useActiveUser';
import { usePathname } from 'expo-router';

export const PostCover = ({post}) => {

    const {onSetActivePost} = useActivePost();
    const actualPath = usePathname();

    const blurhash = 'L0000000?^000000000000000000';


    return (
        <TouchableOpacity 
            style={styles.ownPostCover}
            onPress={() => onSetActivePost(post)}
        >
            <Image
                source={post.imageUrl}
                style={styles.ownPostCoverImage}
                placeholder={{blurhash}}
                transition={50}
            />
        </TouchableOpacity>
    );
};





