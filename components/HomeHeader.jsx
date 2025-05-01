import React from 'react';
import { Text, View } from 'react-native';
import { StoriesSection } from './StoriesSection';
import { styles } from '../styles/feed.styles';

export const HomeHeader = React.memo(() => {
    return (
        <View>
            <View style={styles.feedHeader}>
                <Text style={styles.headerTitle}>
                soc
                <Text style={styles.headerTitleAnotherColor}>net</Text>
                </Text>
    
            </View>
            <StoriesSection/>
        </View>
    );
});
