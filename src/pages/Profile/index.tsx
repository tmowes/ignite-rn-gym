import { useState } from 'react'

import {
  Avatar,
  Button,
  Center,
  Heading,
  Input,
  ScrollView,
  Skeleton,
  VStack,
  useToast,
} from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { validPhotoSize } from '@utils/validPhotoSize'

const PHOTO_SIZE = 33

export function Profile() {
  const toast = useToast()
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/tmowes.png')

  const onAvatarChange = async () => {
    setPhotoIsLoading(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })
      if (photoSelected.cancelled) return

      if (photoSelected.uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.uri)
        if (photoInfo.size && validPhotoSize(photoInfo.size, 2)) {
          toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 2MB.',
            placement: 'top',
            bgColor: '$red.500',
          })
          return
        }
        console.log(photoInfo)
        setUserPhoto(photoSelected.uri)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

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
            <Avatar source={{ uri: userPhoto }} size={PHOTO_SIZE} />
          )}
          <Button variant="$link" mt="-2" mb="4" onPress={onAvatarChange}>
            Alterar foto
          </Button>
          <Input bg="$gray.600" placeholder="Nome" />
          <Input bg="$gray.600" placeholder="E-mail" isDisabled />
          <Heading color="$gray.200" fontSize="md" alignSelf="flex-start" mt="6" mb="2">
            Alterar senha
          </Heading>
          <Input bg="$gray.600" placeholder="Nova senha" secureTextEntry />
          <Input bg="$gray.600" placeholder="Confirme a nova senha" secureTextEntry />
          <Button variant="$solid" mt="2">
            Atualizar
          </Button>
        </Center>
      </ScrollView>
    </VStack>
  )
}
