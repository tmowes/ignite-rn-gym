/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { NativeBaseProvider } from 'native-base'

import { Loading } from '@components/Loading'
import { theme } from '@styles/theme'

import { Routes } from './routes'

export function AppSrc() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#121214' }}>
      <NativeBaseProvider theme={theme}>
        {fontsLoaded ? <Routes /> : <Loading />}
        <StatusBar style="light" backgroundColor="transparent" translucent />
      </NativeBaseProvider>
    </GestureHandlerRootView>
  )
}
