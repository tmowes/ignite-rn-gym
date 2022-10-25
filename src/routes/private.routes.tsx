import { Platform } from 'react-native'

import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { useTheme } from 'native-base'

import { Home } from '@pages/Home'
import { History } from '@pages/History'
import { Profile } from '@pages/Profile'
import { Exercise } from '@pages/Exercise'
import HomeSvg from '@assets/home.svg'
import HistorySvg from '@assets/history.svg'
import ProfileSvg from '@assets/profile.svg'

import { PrivateRoutesProps } from './types'

const { Navigator, Screen } = createBottomTabNavigator<PrivateRoutesProps>()

export default function PrivateRoutes() {
  const { colors, sizes } = useTheme()
  const iconSize = { width: sizes[6], height: sizes[6] }
  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarInactiveTintColor: colors.$gray['200'],
    tabBarActiveTintColor: colors.$green['500'],
    tabBarStyle: {
      backgroundColor: colors.$gray['600'],
      borderTopWidth: 0,
      height: Platform.OS === 'android' ? 'auto' : 96,
      paddingBottom: sizes[10],
      paddingTop: sizes[6],
    },
  }

  return (
    <Navigator screenOptions={screenOptions}>
      <Screen
        name="home"
        component={Home}
        options={{ tabBarIcon: ({ color }) => <HomeSvg fill={color} {...iconSize} /> }}
      />
      <Screen
        name="history"
        component={History}
        options={{ tabBarIcon: ({ color }) => <HistorySvg fill={color} {...iconSize} /> }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{ tabBarIcon: ({ color }) => <ProfileSvg fill={color} {...iconSize} /> }}
      />
      <Screen name="exercise" component={Exercise} options={{ tabBarButton: () => null }} />
    </Navigator>
  )
}
