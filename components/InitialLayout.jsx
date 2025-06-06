import { useAuth } from '@clerk/clerk-expo';
import { Stack, usePathname, useRouter, useSegments } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {useUserActual} from '../hooks/useUserActual';


export const InitialLayout = () => {

    const {isLoaded, isSignedIn} = useAuth();

    const segments = useSegments();
    const router = useRouter();

    const {onSetActualUser} = useUserActual();

    const actualUser = useQuery(api.profile.getActualUser);
    

    useEffect(() => {
        if(!actualUser) return;
        onSetActualUser(actualUser);
    }, [actualUser]);


    useEffect(() => {

        if(!isLoaded) return;

        const inAuthPage = segments[0] === '(auth)';

        if(!isSignedIn && !inAuthPage){
            router.replace('/(auth)/login');
        } else if(isSignedIn && inAuthPage){
            router.replace('/(tabs)')
        }
      
    }, [isLoaded, isSignedIn, segments])
    
    if(!isLoaded) return null;

    return <Stack screenOptions={{headerShown: false}}/>
};
