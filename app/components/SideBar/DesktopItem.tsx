'use client'

import clsx from "clsx"
import Link from "next/link"

interface DesktopItemProps {
    label: string
    href: string
    icon: any
    active?: boolean
    onClick?: () => void
}

const DesktopItem: React.FC<DesktopItemProps> = ({
    label,
    href,
    icon: Icon,
    active,
    onClick
}) => {
    const handleClick = () => {
        if(onClick) {
            return onClick()
        }
    }
  return (
    <li onClick={handleClick}>
        <Link 
          href={href} 
          className={clsx(`
            rounded-md
            group
            gap-x-3
            flex
            p-3
            text-sm
            leading-6
            font-semibold
            text-gray-500
            hover:text-black
            hover:bg-gray-100
            items-center
          `,
             active && 'bg-gray-100 text-black'
          )}
        >
            <Icon classname='h-10 w-10 shrink-0' />
            <span className="sr-only">{label}</span>
        </Link>
    </li>
  )
}

export default DesktopItem