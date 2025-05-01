import { View, Text } from 'react-native'
import React from 'react'
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { ConvexReactClient } from 'convex/react'

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL);

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if(!publishableKey) {
    throw new Error('Missing publishable key')
}

export default function ClerkAndCoverProvider({children}) {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ConvexProviderWithClerk
            useAuth={useAuth}
            client={convex}
        >
            <ClerkLoaded>
                {children}
            </ClerkLoaded>
        </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}