import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/notifications.styles';

export const NotificationsHeader = () => {
    return (
        <View style={styles.notificationsHeader}>
            <Text style={styles.titleHeader}>NOTIFICATIONS</Text>
        </View>
    );
};
