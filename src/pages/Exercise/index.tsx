import { useLayoutEffect } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Center, Text } from 'native-base'

import { HeaderRight } from './components/HeaderRight'

export function Exercise() {
  const { setOptions } = useNavigation()

  useLayoutEffect(() => {
    setOptions({
      headerTitle: `Puxada frontal`,
      headerRight: () => <HeaderRight label="costas" />,
    })
  }, [setOptions])

  return (
    <Center flex={1}>
      <Text>Exercise</Text>
    </Center>
  )
}
