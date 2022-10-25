import { Image } from 'native-base'

import { UserPhotoProps } from './types'

export function UserPhoto(props: UserPhotoProps) {
  const { size, ...rest } = props
  return (
    <Image
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor="$gray.400"
      alt=""
      {...rest}
    />
  )
}
