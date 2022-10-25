import { useState } from 'react'

import { FlatList, Heading, HStack, Text, VStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { PrivateNavProps } from '@routes/types'
import { compareStrings } from '@utils/compareStrings'

import { GroupSelector } from './components/GroupSelector'
import { ExerciseCard } from './components/ExerciseCard'

export function Home() {
  const { navigate } = useNavigation<PrivateNavProps>()
  const [exercises, setExercises] = useState([
    'Puxada frontal',
    'Remada curvada',
    'Remada unilateral',
    'Levantamento terras',
    'Levantamento terras2',
    'Levantamento terras3',
    'Levantamento terras4',
  ])
  const [groups, setGroups] = useState(['Costas', 'Bíceps', 'Tríceps', 'ombro'])
  const [groupSelected, setGroupSelected] = useState('Costas')
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
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard onPress={() => navigate('exercise')} data={item} />
          )}
        />
      </VStack>
    </VStack>
  )
}
