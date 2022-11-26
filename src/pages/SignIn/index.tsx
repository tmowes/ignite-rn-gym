import { useState } from 'react'

import { Heading, ScrollView, VStack, Image, Text, Center, Button, useToast } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import bgImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { PublicNavProps } from '@routes/types'
import { InputControlled } from '@components/InputControlled'
import { AppError } from '@utils/AppError'
import { useAuth } from '@contexts/AuthProvider'

import { FormDataProps, signInSchema } from './schema'

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const { navigate } = useNavigation<PublicNavProps>()
  const toast = useToast()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInSchema),
  })

  const { onSignIn } = useAuth()

  const handleSignIn = async ({ email, password }: FormDataProps) => {
    try {
      setIsLoading(true)
      await onSignIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError
      setIsLoading(false)
      toast.show({
        title: isAppError
          ? error.message
          : 'Não foi possível conectar, tente novamente mais tarde.',
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
        <Center my="24">
          <LogoSvg />
          <Text color="$gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>
        <Center>
          <Heading color="$gray.100" mb="6" fontSize="xl">
            Acesse sua conta
          </Heading>
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
                returnKeyType="send"
                onSubmitEditing={handleSubmit(handleSignIn)}
              />
            )}
          />
          <Button variant="$solid" onPress={handleSubmit(handleSignIn)} isLoading={isLoading}>
            Acessar
          </Button>
        </Center>
        <Center mt="24">
          <Text color="$gray.100" fontSize="sm" mb="4">
            Ainda não tem acesso?
          </Text>
          <Button variant="$outline" onPress={() => navigate('signup')}>
            Criar conta
          </Button>
        </Center>
      </VStack>
    </ScrollView>
  )
}
