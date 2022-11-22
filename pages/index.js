import Head from 'next/head'
import Link from 'next/link'
import { Card, CardBody, Heading, Flex, Box, Button } from '@chakra-ui/react'
import { PlusSmallIcon } from '@heroicons/react/20/solid'

export default function Home() {
  return (
    <>
      <Head>
        <title>Exchanging.gifts - Home</title>
        <meta name="description" content="Draw names for a gift exchange" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Card background="white">
        <CardBody>
          <Heading size="lg">Randomly assign people for a gift exchange</Heading>
          <Flex alignItems="center"><PlusSmallIcon style={{ height: '20px' }} />Set rules for who should or shouldn't be assigned to whom</Flex>
          <Flex alignItems="center"><PlusSmallIcon style={{ height: '20px' }} />Sends emails automatically with the name each person is assigned to</Flex>
          <Box mt="10px">
            <Link href="app">
              <Button>Start</Button>
            </Link>
          </Box>
        </CardBody>
      </Card>
    </>
  )
}
