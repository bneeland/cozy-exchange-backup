import Link from 'next/link'
import { Card, Flex, Text } from '@chakra-ui/react'

export default function Logo() {
  return (
    <Link href="/">
      <Card padding="3px 10px" background="white" borderRadius="9999">
        <Flex>
          <Text color="black">
            Exchanging
          </Text>
          <Text color="gray.500">
            .gifts
          </Text>
        </Flex>
      </Card>
    </Link>
  )
}
