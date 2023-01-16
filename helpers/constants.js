import {
  AdjustmentsHorizontalIcon,
  UserIcon,
  ListBulletIcon,
  BoltIcon,
} from '@heroicons/react/24/outline'

export const ICON_SIZE = 6

export const PANELS = [
  {
    id: 'intro',
    isShown: false,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <AdjustmentsHorizontalIcon className={`w-${ICON_SIZE} h-${ICON_SIZE}`} />,
    isShown: true,
  },
  {
    id: 'participants',
    label: 'Participants',
    icon: <UserIcon className={`w-${ICON_SIZE} h-${ICON_SIZE}`} />,
    isShown: true,
  },
  {
    id: 'rules',
    label: 'Rules',
    icon: <ListBulletIcon className={`w-${ICON_SIZE} h-${ICON_SIZE}`} />,
    isShown: true,
  },
  {
    id: 'finalize',
    label: 'Finalize',
    icon: <BoltIcon className={`w-${ICON_SIZE} h-${ICON_SIZE}`} />,
    isShown: true,
  }
]
