import { HStack, Avatar, VStack, Heading, IconButton, Text, useTheme } from 'native-base'
import { SignOut } from 'phosphor-react-native'

import { useAuth } from '@contexts/AuthProvider'
import avatarImg from '@assets/userPhotoDefault.png'
import { api } from '@services/api'

export function HomeHeader() {
  const { colors } = useTheme()
  const { user, onSignOut } = useAuth()

  return (
    <HStack bg="$gray.600" pl="6" pr="2" pt="8" pb="2" alignItems="center" w="full">
      <Avatar
        source={
          user?.avatar ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } : avatarImg
        }
        mr="4"
        size={16}
      />
      <VStack flex={1}>
        <Text fontSize="md">Olá,</Text>
        <Heading fontSize="md">{user?.name}</Heading>
      </VStack>
      <IconButton
        onPress={() => onSignOut()}
        icon={<SignOut size={24} color={colors.$gray[100]} />}
      />
    </HStack>
  )
}
