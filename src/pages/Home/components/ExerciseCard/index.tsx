import { TouchableOpacity } from 'react-native'

import { Heading, HStack, Icon, Image, Text, VStack } from 'native-base'
import { Entypo } from '@expo/vector-icons'

import { ExerciseCardProps } from './types'

export function ExerciseCard(props: ExerciseCardProps) {
  const { data, ...attrs } = props
  return (
    <TouchableOpacity {...attrs}>
      <HStack bg="$gray.500" alignItems="center" rounded="md" p="2" pr="4" mb="3">
        <Image
          source={{
            uri: 'http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg',
          }}
          alt="Imagem do exercício"
          resizeMode="center"
          rounded="md"
          w="16"
          h="16"
          mr="4"
        />
        <VStack flex={1}>
          <Heading fontSize="lg" color="$white">
            Remanda unilateral
          </Heading>
          <Text fontSize="sm" color="$gray.200" mt="1" numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>
        <Icon as={Entypo} name="chevron-thin-right" color="$gray.300" />
      </HStack>
    </TouchableOpacity>
  )
}
