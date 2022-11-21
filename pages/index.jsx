import Head from 'next/head'
import Link from 'next/link'
import { Card, CardBody, Flex, Heading, Box, List, ListItem, ListIcon, Button } from '@chakra-ui/react'
import { UserPlusIcon, WrenchIcon, EnvelopeIcon } from '@heroicons/react/24/solid'

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
          <Flex direction="column" alignItems="center" gap="20px">
            <Heading textAlign="center">Simple tool to set up randomized gift exchanges</Heading>
            <List marginX="15%">
              <ListItem color="gray.600">
                <ListIcon as={UserPlusIcon} color='green.300' />
                Add people
              </ListItem>
              <ListItem color="gray.600">
                <ListIcon as={WrenchIcon} color='green.300' />
                Set up matching rules
              </ListItem>
              <ListItem color="gray.600">
                <ListIcon as={EnvelopeIcon} color='green.300' />
                Randomly assign matches and send secret emails
              </ListItem>
            </List>
            <Link href="app">
              <Button>Start</Button>
            </Link>
          </Flex>
        </CardBody>
      </Card>
    </>
  )
}
