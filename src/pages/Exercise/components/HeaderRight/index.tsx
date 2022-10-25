import { HStack, Text } from 'native-base'

import BodySvg from '@assets/body.svg'

import { HeaderRightProps } from './types'

export function HeaderRight(props: HeaderRightProps) {
  const { label } = props
  return (
    <HStack px="3" alignItems="center">
      <BodySvg width={14} height={14} />
      <Text textTransform="capitalize" color="$gray.200">
        {label}
      </Text>
    </HStack>
  )
}
