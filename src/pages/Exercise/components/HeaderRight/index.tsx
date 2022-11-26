import { HStack, Text } from 'native-base'

import BodySvg from '@assets/body.svg'

import { HeaderRightProps } from './types'

export function HeaderRight(props: HeaderRightProps) {
  const { label } = props
  return (
    <HStack pl="2" pr="4" alignItems="center" minW="24">
      <BodySvg width={14} height={14} />
      <Text color="$gray.200" textTransform="capitalize" ml="1">
        {label}
      </Text>
    </HStack>
  )
}
