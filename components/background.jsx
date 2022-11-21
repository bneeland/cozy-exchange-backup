import Link from 'next/link'
import { Center, Box, Text } from '@chakra-ui/react'

export default function Background() {
  return (
    <Box position="fixed" inset="0" bgGradient="linear(to-t, #DF7C50, #001A63)" zIndex="hide" />
  )
}
