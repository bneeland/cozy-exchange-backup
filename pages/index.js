import { TITLE_PREFIX } from '../constants'
import Head from 'next/head'
import Link from 'next/link'
import { CircularProgress } from '@chakra-ui/react'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Simple Gifts - Home</title>
        <meta name="description" content="Draw names for a gift exchange" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div><Link href="setup">Start</Link></div>
    </div>
  )
}
