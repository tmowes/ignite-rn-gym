import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SignIn } from '@pages/SignIn'
import { SignUp } from '@pages/SignUp'

import { PublicRoutesProps } from './types'

const { Navigator, Screen } = createNativeStackNavigator<PublicRoutesProps>()

export default function PublicRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signin" component={SignIn} />
      <Screen name="signup" component={SignUp} />
    </Navigator>
  )
}
