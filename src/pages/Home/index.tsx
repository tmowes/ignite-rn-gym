import { useCallback, useEffect, useState } from 'react'

import { FlatList, Heading, HStack, Text, useToast, VStack } from 'native-base'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Exercise } from '@models/exercise'

import { PrivateNavProps } from '@routes/types'
import { compareStrings } from '@utils/compareStrings'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { Loading } from '@components/Loading'

import { GroupSelector } from './components/GroupSelector'
import { ExerciseCard } from './components/ExerciseCard'

export function Home() {
  const { navigate } = useNavigation<PrivateNavProps>()
  const toast = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingExercises, setIsLoadingExercises] = useState(false)
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [groups, setGroups] = useState<string[]>([])
  const [groupSelected, setGroupSelected] = useState<string>('Costas')

  const loadGroups = useCallback(async () => {
    try {
      setIsLoading(true)
      const { data } = await api.get<string[]>('/groups')
      setGroups(data)
      setGroupSelected(data[0])
    } catch (error) {
      const isAppError = error instanceof AppError
      toast.show({
        title: isAppError ? error.message : 'Não foi possível carregar os grupos musculares.',
        bgColor: 'red.500',
        placement: 'top',
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  const loadExercisesByGroup = useCallback(async () => {
    try {
      setIsLoadingExercises(true)
      const { data } = await api.get<Exercise[]>(`/exercises/bygroup/${groupSelected}`)
      setExercises(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      toast.show({
        title: isAppError ? error.message : 'Não foi possível carregar os exercicios.',
        bgColor: 'red.500',
        placement: 'top',
      })
    } finally {
      setIsLoadingExercises(false)
    }
  }, [groupSelected, toast])

  useEffect(() => {
    loadGroups()
  }, [loadGroups])

  useFocusEffect(
    useCallback(() => {
      loadExercisesByGroup()
    }, [loadExercisesByGroup]),
  )

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1}>
      <FlatList
        variant="horizontal"
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupSelector
            name={item}
            // isActive={groupSelected.toLowerCase() === item.toLowerCase()}
            isActive={compareStrings(groupSelected, item)}
            onPress={() => setGroupSelected(item)}
          />
        )}
        maxH="10"
      />
      {isLoadingExercises ? (
        <Loading />
      ) : (
        <VStack flex={1} px="6">
          <HStack justifyContent="space-between" mb="4">
            <Heading color="$gray.200" fontSize="md">
              Exercícios
            </Heading>
            <Text color="$gray.200">{exercises.length}</Text>
          </HStack>
          <FlatList
            variant="vertical"
            data={exercises}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => (
              <ExerciseCard
                onPress={() => navigate('exercise', { exerciseId: `${item.id}` })}
                data={item}
              />
            )}
          />
        </VStack>
      )}
    </VStack>
  )
}
