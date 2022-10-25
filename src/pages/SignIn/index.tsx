import { Heading, ScrollView, VStack, Image, Text, Center, Input, Button } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import bgImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { PublicNavProps } from '@routes/types'

export function SignIn() {
  const { navigate } = useNavigation<PublicNavProps>()

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
          <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />
          <Input placeholder="Senha" secureTextEntry />
          <Button variant="$solid">Acessar</Button>
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
