import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../constants/theme';

export const NoNotificationsFound = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.secondary,
        }}>
            <Text style={{color: COLORS.primary}}>No Notifications Found</Text>
        </View>
    );
};
