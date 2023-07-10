'use client'
import Input from '@/app/components/inputs/Input';
import styles from '@/app/styles/AuthForm.module.css'
import Button from '@/app/components/Button';
import { use, useCallback, useEffect, useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs'
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

type variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const session = useSession()
    const router = useRouter
    const [variant, setVariant] = useState<variant>('LOGIN')
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        if(session?.status === 'authenticated') {
            router.push('/users')
        }
    }, [session?.status, router])

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
            axios.post('/api/register', data)
            .catch(() => toast.error('Something went wrong'))
            .finally(() => setIsLoading(false))
        }

        if(variant === 'LOGIN'){
            signIn('credentials', {
                ...data,
                redirect: false
            })
            .then((callback) => {
                if(callback?.error) {
                    toast.error('Email or password not correct')
                }

                if(callback?.ok && !callback.error){
                    toast.success('Logged In')
                }
            })
            .finally(() => setIsLoading(false))
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true)
        signIn(action, { redirect: false })
        .then((callback) => {
            if(callback?.error){
                toast.error('Invalid Credentials')
            }

            if(callback?.ok && !callback?.error){
                toast.success('logged In')
            }
        })

        .finally(() => setIsLoading(false))
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
                    <AuthSocialButton icon={BsGithub} onClick={() => socialAction("github")} />
                    <AuthSocialButton icon={BsGoogle} onClick={() => socialAction("google")} />
                </div>
                
                <div className={styles.variantTrigger}>
                    <div>
                        {variant === 'LOGIN' ? 'New to Messenger ?' : 'Already have an account'}
                    </div>
                    <div onClick={toggleVariant} className='cursor-pointer underline hover:text-sky-500'>
                        {variant === 'LOGIN' ? 'Create an account' : 'login'}
                    </div>
                </div>
                
            </div>
        </main>
    </div>
  )
}

export default AuthForm