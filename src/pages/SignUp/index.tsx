import { Heading, ScrollView, VStack, Image, Text, Center, Input, Button } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import bgImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'

export function SignUp() {
  const { goBack } = useNavigation()
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
          <Input placeholder="Nome" />
          <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />
          <Input placeholder="Senha" secureTextEntry />
          <Input placeholder="Confirme  a Senha" secureTextEntry />
          <Button variant="primary">Criar e acessar</Button>
        </Center>
        <Button variant="secondary" mt="24" onPress={() => goBack()}>
          Voltar para o login
        </Button>
      </VStack>
    </ScrollView>
  )
}
