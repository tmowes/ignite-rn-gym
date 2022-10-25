import { Heading } from 'native-base'

import { SectionHeaderProps } from './types'

export function SectionHeader(props: SectionHeaderProps) {
  const { title } = props
  return (
    <Heading color="$gray.200" fontSize="md" mt="8" mb="2">
      {title}
    </Heading>
  )
}
