import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

export type PublicRoutesProps = {
  signin: undefined
  signup: undefined
}

export type PrivateRoutesProps = {
  home: undefined
  exercise: undefined
  history: undefined
  profile: undefined
}

export type PublicNavProps = NativeStackNavigationProp<PublicRoutesProps>
export type PrivateNavProps = BottomTabNavigationProp<PrivateRoutesProps>
