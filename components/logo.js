import Link from 'next/link'
import { Card, Flex, Text } from '@chakra-ui/react'

export default function Logo() {
  return (
    <Link href="/">
      <Card padding="3px 10px" background="gray.50" borderRadius="9999">
        <Flex>
          <Text color="black">
            Exchanging
          </Text>
          <Text color="gray.600">
            .gifts
          </Text>
        </Flex>
      </Card>
    </Link>
  )
}
