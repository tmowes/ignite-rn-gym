import { TouchableOpacity } from 'react-native'

import { Heading, HStack, Icon, Image, Text, VStack } from 'native-base'
import { Entypo } from '@expo/vector-icons'

import { api } from '@services/api'

import { ExerciseCardProps } from './types'

export function ExerciseCard(props: ExerciseCardProps) {
  const { data, ...attrs } = props
  const { name, thumb, series, repetitions } = data
  return (
    <TouchableOpacity {...attrs}>
      <HStack bg="$gray.500" alignItems="center" rounded="md" p="2" pr="4" mb="3">
        <Image
          source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${thumb}` }}
          alt=""
          resizeMode="cover"
          rounded="md"
          w="16"
          h="16"
          mr="4"
        />
        <VStack flex={1} mr="2">
          <Heading fontSize="lg" color="$white">
            {name}
          </Heading>
          <Text fontSize="sm" color="$gray.200" mt="1" numberOfLines={2}>
            {series > 1 ? `${series} séries` : `${series} série`} x {repetitions} repetições
          </Text>
        </VStack>
        <Icon as={Entypo} name="chevron-thin-right" color="$gray.300" />
      </HStack>
    </TouchableOpacity>
  )
}
