import Header from './header'
import Footer from './footer'
import { Flex, Box, Spacer } from '@chakra-ui/react'

export default function Layout({ children }) {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Spacer mt="40px" />
      <Box>{children}</Box>
      <Spacer />
      <Footer />
    </Flex>
  )
}
