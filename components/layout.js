import Header from './header'
import Footer from './footer'
import { Flex, Box, Spacer } from '@chakra-ui/react'
import Background from './background'

export default function Layout({ children }) {
  return (
    <Flex direction="column" h="100vh">
      <Background />
      <Header />
      <Spacer />
      <Flex direction="column" gap="24px" maxW="640" marginX="auto" padding="24px" zIndex="base">
        {children}
      </Flex>
      <Spacer />
      <Footer />
    </Flex>
  )
}
