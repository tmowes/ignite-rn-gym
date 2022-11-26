import { Platform } from 'react-native'

import { ArrowLeft, SignOut } from 'phosphor-react-native'
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { IconButton, useTheme } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import HomeSvg from '@assets/home.svg'
import HistorySvg from '@assets/history.svg'
import ProfileSvg from '@assets/profile.svg'
import { Home } from '@pages/Home'
import { HistoryTab } from '@pages/History'
import { Profile } from '@pages/Profile'
import { ExerciseDetails } from '@pages/Exercise'
import { useAuth } from '@contexts/AuthProvider'
import { HomeHeader } from '@pages/Home/components/HomeHeader'

import { PrivateRoutesProps } from './types'

const { Navigator, Screen } = createBottomTabNavigator<PrivateRoutesProps>()

export default function PrivateRoutes() {
  const { colors, sizes } = useTheme()
  const { goBack } = useNavigation()
  const { onSignOut } = useAuth()

  const iconSize = { width: sizes[6], height: sizes[6] }
  const screenOptions: BottomTabNavigationOptions = {
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

  function CustomGoBackButtom() {
    return (
      <IconButton
        onPress={goBack}
        icon={<ArrowLeft size={24} color={colors.$green[500]} weight="bold" />}
      />
    )
  }

  function CustomSignOutButton() {
    return (
      <IconButton
        onPress={() => onSignOut()}
        icon={<SignOut size={24} color={colors.$gray[100]} />}
      />
    )
  }

  return (
    <Navigator screenOptions={screenOptions} initialRouteName="profile">
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <HomeSvg fill={color} {...iconSize} />,
          headerBackground: () => <HomeHeader />,
          headerTitle: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.$gray[600],
          },
        }}
      />
      <Screen
        name="history"
        component={HistoryTab}
        options={{
          tabBarIcon: ({ color }) => <HistorySvg fill={color} {...iconSize} />,
          headerTitle: 'Histórico de Exercícios',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitleStyle: {
            color: colors.$gray[100],
            fontSize: sizes[4],
          },
          headerStyle: {
            backgroundColor: colors.$gray[600],
          },
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <ProfileSvg fill={color} {...iconSize} />,
          headerRight: () => <CustomSignOutButton />,
          headerTitle: 'Perfil',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitleStyle: {
            color: colors.$gray[100],
            fontSize: sizes[4],
          },
          headerStyle: {
            backgroundColor: colors.$gray[600],
          },
        }}
      />
      <Screen
        name="exercise"
        component={ExerciseDetails}
        options={{
          tabBarButton: () => null,
          // tabBarIcon: ({ color }) => <ProfileSvg fill={color} {...iconSize} />,
          headerLeft: () => <CustomGoBackButtom />,
          headerTitle: 'Exercicio',
          headerTitleAlign: 'left',
          headerShadowVisible: false,
          headerTitleStyle: {
            color: colors.$gray[100],
            fontSize: sizes[4],
          },
          headerStyle: {
            backgroundColor: colors.$gray[600],
          },
        }}
      />
    </Navigator>
  )
}
