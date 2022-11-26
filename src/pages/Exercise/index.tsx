import { useCallback, useLayoutEffect, useState } from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'
import { Box, Button, Center, HStack, Image, Text, useToast, VStack } from 'native-base'
import { Exercise } from '@models/exercise'

import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import { ExerciseDetailsRouteProp, PrivateNavProps } from '@routes/types'
import { AppError } from '@utils/AppError'
import { api } from '@services/api'
import { Loading } from '@components/Loading'

import { HeaderRight } from './components/HeaderRight'

export function ExerciseDetails() {
  const toast = useToast()

  const {
    params: { exerciseId },
  } = useRoute<ExerciseDetailsRouteProp>()
  const { setOptions, navigate } = useNavigation<PrivateNavProps>()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [exercise, setExercise] = useState<Exercise | null>(null)

  const loadExerciseDetails = useCallback(async () => {
    try {
      setIsLoading(true)
      const { data } = await api.get<Exercise>(`/exercises/${exerciseId}`)
      setExercise(data)
      setOptions({
        headerTitle: data?.name ?? '',
        headerRight: () => <HeaderRight label={data.group} />,
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      toast.show({
        title: isAppError
          ? error.message
          : 'Não foi possível carregar os detalhes do exercicio.',
        bgColor: 'red.500',
        placement: 'top',
      })
    } finally {
      setIsLoading(false)
    }
  }, [exerciseId, setOptions, toast])

  const onExerciseDone = useCallback(async () => {
    try {
      setIsSubmitting(true)
      await api.post('/history', { exercise_id: exerciseId })
      toast.show({
        title: 'Parabéns!, você concluiu o exercício!',
        bgColor: 'green.700',
        placement: 'top',
      })
      navigate('history')
    } catch (error) {
      const isAppError = error instanceof AppError
      toast.show({
        title: isAppError ? error.message : 'Não foi possível registrar o exercicio.',
        bgColor: 'red.500',
        placement: 'top',
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [exerciseId, navigate, toast])

  useLayoutEffect(() => {
    loadExerciseDetails()
  }, [loadExerciseDetails])

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1}>
      <VStack p="8">
        <Box mb="4" rounded="lg" overflow="hidden">
          <Image
            w="full"
            h="80"
            source={{
              uri: `${api.defaults.baseURL}/exercise/demo/${exercise?.demo}`,
            }}
            alt="Nome do exercício"
            resizeMode="cover"
          />
        </Box>
        <Box bg="$gray.600" rounded="md" p="4" pb="2">
          <HStack justifyContent="space-around" mb="4">
            <HStack alignItems="center">
              <SeriesSvg />
              <Text color="$gray.200" ml="2">
                {exercise?.series ?? 0 > 1
                  ? `${exercise?.series} séries`
                  : `${exercise?.series} série`}
              </Text>
            </HStack>
            <HStack alignItems="center">
              <RepetitionsSvg />
              <Text color="$gray.200" ml="2">
                {exercise?.repetitions} repetições
              </Text>
            </HStack>
          </HStack>
          <Button variant="$solid" onPress={onExerciseDone} isLoading={isSubmitting}>
            Marcar como realizado
          </Button>
        </Box>
      </VStack>
    </VStack>
  )
}
