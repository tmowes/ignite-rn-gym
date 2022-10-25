import { useState } from 'react'

import { Button, Center, Heading, Input, ScrollView, Skeleton, VStack } from 'native-base'

import { UserPhoto } from '@components/UserPhoto'

const PHOTO_SIZE = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/tmowes.png')
  return (
    <VStack flex={1}>
      <ScrollView>
        <Center mt="4" px="8">
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="$gray.600"
              endColor="$gray.400"
            />
          ) : (
            <UserPhoto
              source={{ uri: userPhoto }}
              size={PHOTO_SIZE}
              alt="Imagem do usuário"
              mr={4}
            />
          )}
          <Button
            variant="link"
            _text={{ color: '$green.500', fontWeight: 'bold', fontSize: 'md' }}
            mt="1"
            mb="4"
          >
            Alterar foto
          </Button>
          <Input bg="$gray.600" placeholder="Nome" />
          <Input bg="$gray.600" placeholder="E-mail" isDisabled />
          <Heading color="$gray.200" fontSize="md" alignSelf="flex-start" mt="6" mb="2">
            Alterar senha
          </Heading>
          <Input bg="$gray.600" placeholder="Nova senha" secureTextEntry />
          <Input bg="$gray.600" placeholder="Confirme a nova senha" secureTextEntry />
          <Button variant="primary" mt="2">
            Atualizar
          </Button>
        </Center>
      </ScrollView>
    </VStack>
  )
}
