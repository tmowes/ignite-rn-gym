import { TouchableOpacityProps } from 'react-native'

import { Exercise } from '@models/exercise'

export type ExerciseCardProps = TouchableOpacityProps & {
  data: Exercise
}
