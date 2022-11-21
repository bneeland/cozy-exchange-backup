import Header from './header'
import Footer from './footer'
import { Flex, Box, Spacer } from '@chakra-ui/react'
import Background from './background.jsx'

export default function Layout({ children }) {
  return (
    <Flex direction="column" h="100vh">
      <Background />
      <Header />
      <Spacer mt="60px" />
      <Flex direction="column" gap="24px" maxW="768" marginX="auto" paddingX="24px" paddingY="48px" zIndex="base">
        {children}
      </Flex>
      <Spacer />
      <Footer />
    </Flex>
  )
}
