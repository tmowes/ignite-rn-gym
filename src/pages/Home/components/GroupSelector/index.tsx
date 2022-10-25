import { Pressable, Text } from 'native-base'

import { GroupSelectorProps } from './types'

export function GroupSelector(props: GroupSelectorProps) {
  const { isActive, name, ...attrs } = props
  return (
    <Pressable
      mr="3"
      w="24"
      h="10"
      bg="$gray.600"
      rounded="md"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      isPressed={isActive}
      _pressed={{
        borderColor: '$green.500',
        borderWidth: 1,
      }}
      {...attrs}
    >
      <Text
        color={isActive ? '$green.500' : '$gray.200'}
        textTransform="uppercase"
        fontWeight="bold"
        fontSize="xs"
      >
        {name}
      </Text>
    </Pressable>
  )
}
