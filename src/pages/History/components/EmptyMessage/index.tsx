import { Center, Text } from 'native-base'

export function EmptyMessage() {
  return (
    <Center flex={1}>
      <Text color="$gray.100" textAlign="center">
        Não há exercícios registrados ainda. {'\n'}
        Vamos fazer exercícios hoje?
      </Text>
    </Center>
  )
}
