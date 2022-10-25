import { Center, Spinner } from 'native-base'

export function Loading() {
  return (
    <Center flex={1} bg="transparent">
      <Spinner color="white" size={80} />
    </Center>
  )
}
