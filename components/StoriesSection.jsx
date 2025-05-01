import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { styles } from '../styles/feed.styles';
import { STORIES } from '../constants/storyUsers';
import { Story } from './Story';
import { usePosts } from '../hooks/usePosts';

export const StoriesSection = () => {

    const {onSetStories, stories} = usePosts();

    useEffect(() => {
        
      if(STORIES === undefined) return;

      if(stories?.length !== 0) return;
      onSetStories(STORIES);

    }, []);
    

    console.log(stories)
    return (
         <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.storyContainer}
            >

            {
                stories?.map((story) => (
                    <Story
                    story={story}
                    key={story.id}
                    />
                ))
            }


        </ScrollView>
    );
};
