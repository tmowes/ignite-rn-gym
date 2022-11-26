import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { RouteProp } from '@react-navigation/native'

export type PublicRoutesProps = {
  signin: undefined
  signup: undefined
}

export type PrivateRoutesProps = {
  home: undefined
  exercise: { exerciseId: string }
  history: undefined
  profile: undefined
}

export type PublicNavProps = NativeStackNavigationProp<PublicRoutesProps>
export type PrivateNavProps = BottomTabNavigationProp<PrivateRoutesProps>

export type ExerciseDetailsRouteProp = RouteProp<PrivateRoutesProps, 'exercise'>
