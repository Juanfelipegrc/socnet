import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/feed.styles';
import { Image } from 'expo-image';
import { LoaderStories } from './LoaderStories';

export const Story = ({story}) => {

    const blurhash = 'L0000000?^000000000000000000';


    return (
        <View style={styles.storyWrapper}>
            <TouchableOpacity style={story.hasStory? styles.story : styles.noStory}>

                    <View style={styles.storyImageContainer}>
                        <Image
                            source={story?.image}
                            style={styles.storyImage}
                            transition={300}
                            placeholder={{blurhash}}
                        />

                        
                    </View>
                    <Text style={styles.storyUsername}>{story.username.split(' ')[0]}</Text>


            </TouchableOpacity>
        </View>
    );
};
