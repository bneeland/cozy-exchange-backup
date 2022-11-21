import Link from 'next/link'
import { Center } from '@chakra-ui/react'
import Logo from './logo'

export default function Header() {
  return (
    <Center position="fixed" top="0" insetX="0" h="60px" zIndex="sticky" backdropFilter="auto" backdropBlur="8px" borderBottomWidth="1px" borderBottomColor="whiteAlpha.100">
      <Logo isLight />
    </Center>
  )
}
