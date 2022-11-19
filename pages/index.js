import Head from 'next/head'
import Link from 'next/link'
import { Center } from '@chakra-ui/react'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Exchanging.gifts - Home</title>
        <meta name="description" content="Draw names for a gift exchange" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center>
        <Link href="app">Start</Link>
      </Center>
    </div>
  )
}
