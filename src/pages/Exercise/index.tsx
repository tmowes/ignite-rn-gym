import { useLayoutEffect } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Box, Button, Center, HStack, Image, Text, VStack } from 'native-base'

import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'

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
    <VStack flex={1}>
      <VStack p="8">
        <Image
          w="full"
          h="80"
          source={{
            uri: 'https://www2.ufjf.br/noticias/wp-content/uploads/sites/2/2019/11/alora-griffiths-lonmc8rp1qs-unsplash-e1573138733902.jpg',
          }}
          alt="Nome do exercício"
          mb="4"
          resizeMode="cover"
          rounded="lg"
        />
        <Box bg="$gray.600" rounded="md" p="4" pb="2">
          <HStack justifyContent="space-around" mb="4">
            <HStack alignItems="center">
              <SeriesSvg />
              <Text color="$gray.200" ml="2">
                3 séries
              </Text>
            </HStack>
            <HStack alignItems="center">
              <RepetitionsSvg />
              <Text color="$gray.200" ml="2">
                12 repetições
              </Text>
            </HStack>
          </HStack>
          <Button variant="primary">Marcar como realizado</Button>
        </Box>
      </VStack>
    </VStack>
  )
}
