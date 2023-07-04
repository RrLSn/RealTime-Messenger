'use client'
import clsx from 'clsx'

interface buttonProps {
    type?: 'button' | 'submit' | 'reset' | undefined;
    children?: React.ReactNode;
    fullwidth?: boolean;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
    onClick?: () => void
}

const Button: React.FC<buttonProps> = ({
    type,
    children,
    secondary,
    danger,
    disabled,
    onClick,
    fullwidth
}) => {
  return (
    <button onClick={onClick} type={type} disabled={disabled} className={clsx(`
    flex
    justify-center
    rounded-md
    px-3
    py-2
    text-sm
    font-semibold
    focus-visible:outline
    focus-visible:outline-2
    focus-visible:outline-offset-2`,
    disabled && 'opacity-50 cursor-default',
    secondary ? 'text-gray-900' : 'text-white',
    fullwidth && 'w-full',
    danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
    !secondary && !danger && 'bg-sky-500 hover:bg-sky-500 focus-visible:outline-sky-500')}>{children}</button>
  )
}

export default Button