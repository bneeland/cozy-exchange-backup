import { Center } from '@chakra-ui/react'
import Logo from './logo'

export default function Footer() {
  return (
    <Center padding="24px" zIndex="overlay" background="white">
      <Logo isDark />
    </Center>
  )
}
