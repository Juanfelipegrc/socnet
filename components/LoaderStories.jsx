import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from '../constants/theme';

export const LoaderStories = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            alignSelf: 'center'
        }}>
            
            <ActivityIndicator
                size={'small'}
                color={COLORS.primary}
            />
        </View>
    );
};
