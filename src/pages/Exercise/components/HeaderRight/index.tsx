import { HStack, Text } from 'native-base'

import BodySvg from '@assets/body.svg'

import { HeaderRightProps } from './types'

export function HeaderRight(props: HeaderRightProps) {
  const { label } = props
  return (
    <HStack px="4" alignItems="center">
      <BodySvg width={14} height={14} />
      <Text color="$gray.200" textTransform="capitalize" ml="1">
        {label}
      </Text>
    </HStack>
  )
}
