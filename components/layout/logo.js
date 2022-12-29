import Link from 'next/link'
import { ArrowsRightLeftIcon } from '@heroicons/react/24/solid'

export default function Logo() {
  return (
    <div>
      <Link href="/">
        <ArrowsRightLeftIcon className="w-6 h-6" />
      </Link>
    </div>
  )
}
