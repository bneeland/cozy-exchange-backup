import Link from 'next/link'
import { Center, Text } from '@chakra-ui/react'

export default function Logo({ isDark, isLight }) {
  return (
    <Link href="/">
      <Center>
        <Text color={isDark && 'black' || isLight && 'white'} textShadow={`0.5px 0.5px 1.5px ${isDark && 'white' || isLight && 'black'}`}>EXCHANGING</Text><Text color="gray.500">.gifts</Text>
      </Center>
    </Link>
  )
}
