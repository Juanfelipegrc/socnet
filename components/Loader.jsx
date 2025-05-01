import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from '../constants/theme';

export const Loader = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.secondary
        }}>
            
            <ActivityIndicator
                size={'large'}
                color={COLORS.primary}
            />
        </View>
    );
};
