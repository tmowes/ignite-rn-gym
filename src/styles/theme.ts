/* eslint-disable sonarjs/no-duplicate-string */
import { extendTheme, IButtonProps } from 'native-base'

export const theme = extendTheme({
  colors: {
    $green: {
      700: '#00875F',
      500: '#00B37E',
    },
    $gray: {
      700: '#121214',
      600: '#202024',
      500: '#29292E',
      400: '#323238',
      300: '#7C7C8A',
      200: '#C4C4CC',
      100: '#E1E1E6',
    },
    $white: '#FFFFFF',
    $red: {
      500: '#F75A68',
    },
  },
  fonts: {
    heading: 'Roboto_700Bold',
    body: 'Roboto_400Regular',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  sizes: {
    14: 56,
    33: 148,
  },
  components: {
    Button: {
      baseStyle: () => ({
        mb: 4,
        h: 14,
        w: 'full',
        _text: {
          color: 'white',
          fontFamily: 'heading',
          fontSize: 'sm',
        },
      }),
      defaultProps: () => ({
        variant: 'primary',
      }),
      variants: {
        primary: (props: any) => ({
          rounded: 'sm',
          bg: '$green.700',
          _pressed: {
            bg: '$green.500',
          },
          _text: {
            color: 'white',
            fontFamily: 'heading',
            fontSize: 'sm',
          },
          ...props,
        }),
        secondary: (props: any) => ({
          rounded: 'sm',
          bg: 'transparent',
          borderWidth: 1,
          borderColor: '$green.700',
          _pressed: {
            borderWidth: 1,
            borderColor: '$green.500',
            bg: '$gray.500',
          },
          _text: {
            color: '$green.500',
          },
          ...props,
        }),
      },
    },
    Input: {
      baseStyle: {},
      defaultProps: {
        placeholderTextColor: '$gray.300',
        bg: '$gray.700',
        h: 14,
        px: 4,
        mb: 4,
        borderWidth: 0,
        borderColor: '$gray.700',
        fontFamily: 'body',
        color: 'white',
        fontSize: 'sm',
        w: 'full',
        _focus: {
          borderColor: '$green.500',
          bg: '$gray.700',
          borderWidth: 1,
        },
        _invalid: {
          borderColor: '$red.500',
          bg: '$gray.700',
          borderWidth: 1,
        },
      },
    },
    Avatar: {
      defaultProps: {
        borderWidth: 2,
        borderColor: '$gray.400',
      },
    },
    TextArea: {
      baseStyle: {},
      defaultProps: {
        placeholderTextColor: 'gray.400',
        bg: '_gray_950',
        borderColor: '_gray_950',
        w: 'full',
        _focus: {
          borderColor: 'orange.500',
          bg: '_gray_950',
        },
        _invalid: {
          borderColor: 'error.500',
          bg: '_gray_950',
        },
      },
    },
    IconButton: {
      defaultProps: {
        colorScheme: 'gray',
        bg: 'transparent',
        borderRadius: 'full',
      },
    },
    Heading: {
      defaultProps: {
        fontWeight: 'bold',
        fontFamily: 'heading',
      },
    },
    Text: {
      defaultProps: {
        fontWeight: 'normal',
        fontFamily: 'body',
      },
    },
    ScrollView: {
      defaultProps: {
        contentContainerStyle: {
          flexGrow: 1,
          paddingBottom: 32,
        },
        showsVerticalScrollIndicator: false,
      },
    },
    FlatList: {
      defaultProps: {
        showsVerticalScrollIndicator: false,
      },
      variants: {
        horizontal: {
          horizontal: true,
          showsHorizontalScrollIndicator: false,
          my: '8',
          _contentContainerStyle: {
            px: '8',
          },
        },
        vertical: {
          showsVerticalScrollIndicator: false,
          _contentContainerStyle: {
            pb: '12',
          },
        },
      },
    },
    SectionList: {
      defaultProps: {
        contentContainerStyle: {
          flexGrow: 1,
          paddingBottom: 32,
        },
        showsVerticalScrollIndicator: false,
      },
    },
  },
  config: {
    initialColorMode: 'dark',
  },
})

type CustomThemeType = typeof theme

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
