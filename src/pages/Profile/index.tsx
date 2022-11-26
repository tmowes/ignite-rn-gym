import { useState } from 'react'

import {
  Avatar,
  Button,
  Center,
  Heading,
  ScrollView,
  Skeleton,
  VStack,
  useToast,
} from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@models/user'

import { validPhotoSize } from '@utils/validPhotoSize'
import { InputControlled } from '@components/InputControlled'
import { useAuth } from '@contexts/AuthProvider'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { convertToSlug } from '@utils/converToSlug'
import avatarImg from '@assets/userPhotoDefault.png'

import { FormDataProps, profileSchema } from './schema'

const PHOTO_SIZE = 33

export function Profile() {
  const toast = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, onUpdateUserData } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      passwordPrevious: null,
      password: null,
      passwordConfirm: null,
    },
    resolver: zodResolver(profileSchema),
  })

  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  const onAvatarChange = async () => {
    if (user === null) return
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
        const fileExtension = photoInfo.uri.split('.').pop()

        const photoFile = {
          name: `${convertToSlug(user.name)}.${fileExtension}`,
          uri: photoSelected.uri,
          type: `${photoSelected.type}/${fileExtension}`,
        } as any

        const uploadAvatarData = new FormData()
        uploadAvatarData.append('avatar', photoFile)

        const { data } = await api.patch<User>('/users/avatar', uploadAvatarData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })

        await onUpdateUserData({ ...user, avatar: data.avatar })
        toast.show({
          title: 'Foto de perfil atualizada com sucesso.',
          bgColor: 'green.700',
          placement: 'top',
        })
      }
    } catch (error) {
      const isAppError = error instanceof AppError
      toast.show({
        title: isAppError
          ? error.message
          : 'Não foi possível sua foto de perfil, tente novamente mais tarde.',
        bgColor: 'red.500',
        placement: 'top',
      })
    } finally {
      setPhotoIsLoading(false)
    }
  }

  const onUpdateProfile = async (data: FormDataProps) => {
    try {
      setIsSubmitting(true)
      await api.put('/users', {
        name: data.name,
        password: data.password,
        old_password: data.passwordPrevious,
      })
      if (user !== null) {
        await onUpdateUserData({ ...user, name: data.name })
      }
      toast.show({
        title: 'perfil atualizado com sucesso.',
        bgColor: 'green.700',
        placement: 'top',
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      toast.show({
        title: isAppError
          ? error.message
          : 'Não foi possível atualizar o perfil, tente novamente mais tarde.',
        bgColor: 'red.500',
        placement: 'top',
      })
    } finally {
      setIsSubmitting(false)
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
            <Avatar
              source={
                user?.avatar
                  ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                  : avatarImg
              }
              size={PHOTO_SIZE}
            />
          )}
          <Button variant="$link" mt="-2" mb="4" onPress={onAvatarChange}>
            Alterar foto
          </Button>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <InputControlled
                bg="$gray.600"
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <InputControlled
                bg="$gray.600"
                isDisabled
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Heading color="$gray.200" fontSize="md" alignSelf="flex-start" mt="6" mb="2">
            Alterar senha
          </Heading>
          <Controller
            control={control}
            name="passwordPrevious"
            render={({ field: { onChange } }) => (
              <InputControlled
                bg="$gray.600"
                placeholder="Senha atual"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.passwordPrevious?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <InputControlled
                bg="$gray.600"
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="passwordConfirm"
            render={({ field: { onChange } }) => (
              <InputControlled
                bg="$gray.600"
                placeholder="Confirme a nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.passwordConfirm?.message}
                onSubmitEditing={handleSubmit(onUpdateProfile)}
                returnKeyType="send"
              />
            )}
          />
          <Button
            variant="$solid"
            mt="2"
            onPress={handleSubmit(onUpdateProfile)}
            isLoading={isSubmitting}
          >
            Atualizar
          </Button>
        </Center>
      </ScrollView>
    </VStack>
  )
}
