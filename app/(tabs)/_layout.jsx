import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../../constants/theme';

export default function TabLayout() {

    
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarActiveTintColor:COLORS.primary,
                tabBarInactiveTintColor: COLORS.grey,
                tabBarStyle: {
                    backgroundColor: '#000',
                    borderTopWith: 0.2,
                    borderTopColor: '#e4e4e447',
                    position: 'absolute',
                    elevation: 0,
                    height: 54,
                    paddingBottom: 0,
                    paddingTop: 6
                }
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    tabBarIcon: ({size, color}) => <Ionicons
                        name={color === COLORS.primary? 'home' : 'home-outline'}

                        size={27}
                        color={color}
                    />
                }}
            />

            <Tabs.Screen
                name='bookmarks'
                options={{
                    tabBarIcon: ({size, color}) => <Ionicons
                        name={color === COLORS.primary? 'bookmark' : 'bookmark-outline'}

                        size={27}
                        color={color}
                    />
                }}
            />

            <Tabs.Screen
                name='create'
                options={{
                    tabBarIcon: ({size, color}) => <Ionicons
                        name={color === COLORS.primary? 'add-circle-sharp' : 'add-circle-outline'}

                        size={27}
                        color={color}
                    />
                }}
            />

            <Tabs.Screen
                name='notifications'
                options={{
                    tabBarIcon: ({size, color}) => <Ionicons
                        name={color === COLORS.primary? 'notifications' : 'notifications-outline'}

                        size={27}
                        color={color}
                    />
                }}
            />

            <Tabs.Screen
                name='profile'
                options={{
                    tabBarIcon: ({size, color}) => <Ionicons
                        name={color === COLORS.primary? 'person-sharp' : 'person-outline'}

                        size={27}
                        color={color}
                    />
                }}
            />


        </Tabs>
    );
};
