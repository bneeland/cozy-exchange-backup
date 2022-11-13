import Head from 'next/head'
import { CircularProgress } from '@chakra-ui/react'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Simple Gifts</title>
        <meta name="description" content="Draw names for a gift exchange" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Simple Gifts
      <CircularProgress isIndeterminate size="32px" />
    </div>
  )
}
