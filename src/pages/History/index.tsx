import { useCallback, useEffect, useState } from 'react'

import { VStack, SectionList, useToast } from 'native-base'
import { useFocusEffect } from '@react-navigation/native'
import { History } from '@models/history'

import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { Loading } from '@components/Loading'
import { useAuth } from '@contexts/AuthProvider'

import { EmptyMessage } from './components/EmptyMessage'
import { HistoryCard } from './components/HistoryCard '
import { SectionHeader } from './components/SectionHeader'

export function HistoryTab() {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [exercisesHistory, setExercisesHistory] = useState<History[] | null>(null)
  const { refreshedToken } = useAuth()

  const loadHistory = useCallback(async () => {
    try {
      setIsLoading(true)
      const { data } = await api.get<History[]>('/history')
      setExercisesHistory(data)
    } catch (error) {
      setExercisesHistory(null)
      const isAppError = error instanceof AppError
      toast.show({
        title: isAppError
          ? error.message
          : 'Não foi possível carregar o histórico de exercicios.',
        bgColor: 'red.500',
        placement: 'top',
      })
    } finally {
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFocusEffect(
    useCallback(() => {
      console.log('refreshedToken', refreshedToken)
      loadHistory()
    }, [loadHistory, refreshedToken]),
  )

  console.log({ exercisesHistory })

  if (isLoading) {
    return <Loading />
  }

  if (!exercisesHistory) {
    return <Loading />
  }

  return (
    <VStack flex={1}>
      <SectionList
        sections={exercisesHistory}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => <HistoryCard data={item} />}
        renderSectionHeader={({ section: { title } }) => <SectionHeader title={title} />}
        ListEmptyComponent={() => <EmptyMessage />}
        px="4"
      />
    </VStack>
  )
}
