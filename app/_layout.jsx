import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";
import { InitialLayout } from "../components/InitialLayout";
import ClerkAndCoverProvider from "../providers/ClerkAndCoverProvider";
import {Provider} from 'react-redux'
import {store} from '../store/store'
import {GestureHandlerRootView} from 'react-native-gesture-handler'



const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;



if(!publishableKey) {
    throw new Error('Missing publishable key')
}


export default function RootLayout() {





  return (
    <ClerkAndCoverProvider>
      <Provider store={store}>
        <GestureHandlerRootView>
          <SafeAreaProvider>
            <SafeAreaView style={{flex:1, backgroundColor: COLORS.secondary}}>
              <InitialLayout/>
            </SafeAreaView>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </Provider>
    </ClerkAndCoverProvider>
  );
}
