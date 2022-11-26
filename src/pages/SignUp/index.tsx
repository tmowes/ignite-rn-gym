import { useState } from 'react'

import { Heading, ScrollView, VStack, Image, Text, Center, Button, useToast } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import bgImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { InputControlled } from '@components/InputControlled'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { useAuth } from '@contexts/AuthProvider'

import { FormDataProps, signUpSchema } from './schema'

export function SignUp() {
  const { goBack } = useNavigation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()
  const { onSignIn } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: zodResolver(signUpSchema),
  })

  const onSignUp = async (formData: FormDataProps) => {
    try {
      setIsSubmitting(true)
      await api.post('/users', formData)
      await onSignIn(formData.email, formData.password)
    } catch (error) {
      const isAppError = error instanceof AppError
      setIsSubmitting(false)
      toast.show({
        title: isAppError
          ? error.message
          : 'Não foi possível criar sua conta, tente novamente mais tarde.',
        bgColor: 'red.500',
        placement: 'top',
      })
    }
  }

  return (
    <ScrollView>
      <VStack flex={1} px="8" pb="8">
        <Image
          source={bgImg}
          defaultSource={bgImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />
        <Center my="16">
          <LogoSvg />
          <Text color="$gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>
        <Center>
          <Heading color="$gray.100" mb="6" fontSize="xl">
            Crie sua conta
          </Heading>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <InputControlled
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
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <InputControlled
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="passwordConfirm"
            render={({ field: { onChange, value } }) => (
              <InputControlled
                placeholder="Confirme a Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.passwordConfirm?.message}
                returnKeyType="send"
                onSubmitEditing={handleSubmit(onSignUp)}
              />
            )}
          />
          <Button variant="$solid" onPress={handleSubmit(onSignUp)} isLoading={isSubmitting}>
            Criar e acessar
          </Button>
        </Center>
        <Button variant="$outline" mt="12" onPress={() => goBack()}>
          Voltar para o loginz
        </Button>
      </VStack>
    </ScrollView>
  )
}
