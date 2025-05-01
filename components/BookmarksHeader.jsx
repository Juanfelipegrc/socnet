import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/bookmarks.styles';

export const BookmarksHeader = () => {
    return (
        <View style={styles.bookmarksHeader}>
            <Text style={styles.titleHeader}>BOOKMARKS</Text>
        </View>
    );
};
