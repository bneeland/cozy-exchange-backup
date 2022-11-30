import '../styles/globals.css'
import Layout from '../components/layout'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: `'Exo 2', sans-serif`,
    body: `'Exo 2', sans-serif`,
  },
  colors: {
    gray: {
      50: '#F1F2F3',
      100: '#D8DADE',
      200: '#BFC2CA',
      300: '#A6AAB5',
      400: '#8D92A0',
      500: '#747A8B',
      600: '#5D626F',
      700: '#464953',
      800: '#2E3138',
      900: '#17181C',
    },
    orange: {
      50: '#FBEFE9',
      100: '#F4D2C3',
      200: '#EDB59C',
      300: '#E69875',
      400: '#DF7B4E',
      500: '#D85E27',
      600: '#AC4B20',
      700: '#813818',
      800: '#562510',
      900: '#2B1308',
    },
    pink: {
      50: '#FBE9F5',
      100: '#F4C3E3',
      200: '#ED9CD1',
      300: '#E675BF',
      400: '#DF4EAD',
      500: '#D8279B',
      600: '#AC207C',
      700: '#81185D',
      800: '#56103E',
      900: '#2B081F',
    },
    purple: {
      50: '#F7E5FF',
      100: '#E8B8FF',
      200: '#DA8AFF',
      300: '#CB5CFF',
      400: '#BC2EFF',
      500: '#AE00FF',
      600: '#8B00CC',
      700: '#680099',
      800: '#450066',
      900: '#230033',
    },
    blue: {
      50: '#E5ECFF',
      100: '#B8CAFF',
      200: '#8AA9FF',
      300: '#5C87FF',
      400: '#2E65FF',
      500: '#0043FF',
      600: '#0036CC',
      700: '#002899',
      800: '#001B66',
      900: '#000D33',
    },
    red: {
      50: '#FBE9E9',
      100: '#F4C3C3',
      200: '#ED9C9C',
      300: '#E67575',
      400: '#DF4E4E',
      500: '#D82727',
      600: '#AC2020',
      700: '#811818',
      800: '#561010',
      900: '#2B0808',
    },
    yellow: {
      50: '#FFFDE5',
      100: '#FFF9B8',
      200: '#FFF58A',
      300: '#FFF15C',
      400: '#FFED2E',
      500: '#FFEA00',
      600: '#CCBB00',
      700: '#998C00',
      800: '#665D00',
      900: '#332F00',
    }
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
