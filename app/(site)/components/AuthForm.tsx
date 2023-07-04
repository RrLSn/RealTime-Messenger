'use client'
import Input from '@/app/components/inputs/Input';
import styles from '@/app/styles/AuthForm.module.css'
import Button from '@/app/components/Button';
import { use, useCallback, useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import AuthSocialButton from './AuthSocialButton';
import {BsGithub, BsGoogle} from 'react-icons/bs'

type variant = 'LOGIN' | 'REGISTER';
const AuthForm = () => {
    const [variant, setVariant] = useState<variant>('LOGIN')
    const [isLoading, setIsLoading] = useState  (false)
    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN'){
            setVariant('REGISTER')
        }else {
            setVariant('LOGIN')
        }
    }, [variant])

    const { 
        register, 
        handleSubmit, 
        formState: {errors} } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        if(variant === 'REGISTER'){
            //axios Register
        }

        if(variant === 'LOGIN'){
            //NextAuth signin
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true)

        //NextAuth signin
    }

  return (
    <div className={styles.wrapper}>
        <main>
            <form onSubmit={handleSubmit(onSubmit)}>
                {variant === 'REGISTER' && (
                    <Input 
                    label='Name'
                    id='name'
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    />
                )}
                <Input 
                label='Email address'
                id='email'
                type='email'
                register={register}
                errors={errors}
                disabled={isLoading}
                />
                <Input 
                label='Password'
                id='password'
                type='password'
                register={register}
                errors={errors}
                disabled={isLoading}
                />
                <div>
                    <Button fullwidth type='submit' disabled={isLoading}>{variant === 'LOGIN' ? 'Sign in' : 'Register'}</Button>
                </div>
            </form>

            <div className='mt-6'>
                <div className='relative'>
                    <div className='absolute inset-0 flex items-center'>
                        <div className='w-full border-t border-gray-300' />
                    </div>
                    <div className='relative flex justify-center text-sm'>
                        <span className='bg-white px-2 text-gray-500'>Or continue with</span>
                    </div>
                </div>

                <div className='mt-6 flex justify-center gap-2'>
                    <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
                    <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
                </div>
                
                <div className={styles.variantTrigger}>
                    <div>
                        {variant === 'LOGIN' ? 'New to Messenger ?' : 'Already have an account'}
                    </div>
                    <div onClick={toggleVariant} className='cursor-pointer underline'>
                        {variant === 'LOGIN' ? 'Create an account' : 'login'}
                    </div>
                </div>
                
            </div>
        </main>
    </div>
  )
}

export default AuthForm