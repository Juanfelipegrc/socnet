import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { styles } from '../styles/feed.styles';
import { STORIES } from '../constants/storyUsers';
import { Story } from './Story';

export const StoriesSection = () => {





    return (
         <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.storyContainer}
            >

            {
                STORIES?.map((story) => (
                    <Story
                    story={story}
                    key={story.id}
                    />
                ))
            }


        </ScrollView>
    );
};
