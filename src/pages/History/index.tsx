import { useState } from 'react'

import { VStack, SectionList } from 'native-base'

import { EmptyMessage } from './components/EmptyMessage'
import { HistoryCard } from './components/HistoryCard '
import { SectionHeader } from './components/SectionHeader'

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '26.10.22',
      data: [
        { region: 'Costas', name: 'Puxada frontal', time: '08:56' },
        { region: 'Costas', name: 'Remada unilateral', time: '08:32' },
      ],
    },
    {
      title: '25.10.22',
      data: [{ region: 'Costas', name: 'Puxada frontal', time: '11:24' }],
    },
  ])

  return (
    <VStack flex={1}>
      <SectionList
        sections={exercises}
        renderItem={({ item }) => <HistoryCard data={item} />}
        renderSectionHeader={({ section: { title } }) => <SectionHeader title={title} />}
        ListEmptyComponent={() => <EmptyMessage />}
        px="4"
      />
    </VStack>
  )
}
