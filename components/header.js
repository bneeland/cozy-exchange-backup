import Link from 'next/link'
import { Center, Box, Text } from '@chakra-ui/react'

export default function Header() {
  return (
    <Center position="fixed" w="100%" h="40px" background="white" zIndex="sticky">
      <Link href="/">
        <Center>
          <Text>EXCHANGING</Text><Text color="gray.500">.gifts</Text>
        </Center>
      </Link>
    </Center>
  )
}
