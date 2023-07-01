'use client'
import clsx from 'clsx';
import styles from '@/app/styles/input.module.css'
import {
    UseFormRegister,
    FieldErrors,
    FieldValues
} from 'react-hook-form'

interface inputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    disabled?: boolean
}

const input: React.FC<inputProps> = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled
}) => {
  return (
    <div className={styles.wrapper}>
        <label htmlFor={id}>{label}</label>
        <input 
        id={id} 
        type={type} 
        autoComplete={id} 
        disabled={disabled} 
        {...register(id, {required})} 
        className={clsx(`form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 text-sm leading-6`,
        errors[id] && 'focus:ring-rose-500',
        disabled && 'opacity-50 cursor-default'
        )} />
    </div>
  )
}

export default input