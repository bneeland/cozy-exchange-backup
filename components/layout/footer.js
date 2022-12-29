import Link from 'next/link'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'

export default function Footer() {
  return (
    <div className="flex justify-center">
      <Link href="https://github.com/bneeland/exchanging-gifts" target="_blank">
        <div className="flex items-center gap-1 text-xs">
          Edit on GitHub <ArrowTopRightOnSquareIcon className="w-3 h-3" />
        </div>
      </Link>
    </div>
  )
}
