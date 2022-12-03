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
        <div>
          <div>Randomly assign people for a gift exchange</div>
          <div><PlusSmallIcon style={{ height: '20px' }} />Set rules for who should or shouldn't be assigned to whom</div>
          <div><PlusSmallIcon style={{ height: '20px' }} />Sends emails automatically with the name each person is assigned to</div>
          <div>
            <Link href="app">
              <button>Start</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
