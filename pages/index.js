import Head from 'next/head'
import Link from 'next/link'
import { PlusSmallIcon } from '@heroicons/react/20/solid'

export default function Home() {
  return (
    <>
      <Head>
        <title>Exchanging.gifts - Home</title>
        <meta name="description" content="Draw names for a gift exchange" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        Main content div
      </div>
    </>
  )
}
