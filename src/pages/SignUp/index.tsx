import { Heading, ScrollView, VStack, Image, Text, Center, Input, Button } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import bgImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { InputControlled } from '@components/InputControlled'

import { FormDataProps, signUpSchema } from './schema'

export function SignUp() {
  const { goBack } = useNavigation()
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

  const onSignUp = (data: FormDataProps) => {
    console.log('SignUp', { data })
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
          <Button variant="$solid" onPress={handleSubmit(onSignUp)}>
            Criar e acessar
          </Button>
        </Center>
        <Button variant="$outline" mt="12" onPress={() => goBack()}>
          Voltar para o login
        </Button>
      </VStack>
    </ScrollView>
  )
}
