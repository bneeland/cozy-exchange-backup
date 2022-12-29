import {
  AdjustmentsHorizontalIcon,
  UserIcon,
  ListBulletIcon,
  BoltIcon,
} from '@heroicons/react/24/outline'

const ICON_SIZE = 6

export const PANELS = [
  {
    id: 'settings',
    label: 'Settings',
    icon: <AdjustmentsHorizontalIcon className={`w-${ICON_SIZE} h-${ICON_SIZE}`} />,
  },
  {
    id: 'participants',
    label: 'Participants',
    icon: <UserIcon className={`w-${ICON_SIZE} h-${ICON_SIZE}`} />,
  },
  {
    id: 'rules',
    label: 'Rules',
    icon: <ListBulletIcon className={`w-${ICON_SIZE} h-${ICON_SIZE}`} />,
  },
  {
    id: 'finalize',
    label: 'Finalize',
    icon: <BoltIcon className={`w-${ICON_SIZE} h-${ICON_SIZE}`} />,
  }
]
