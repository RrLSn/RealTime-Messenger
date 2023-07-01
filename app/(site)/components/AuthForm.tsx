'use client'
import Input from '@/app/components/inputs/Input';
import styles from '@/app/styles/AuthForm.module.css'
import Button from '@/app/components/Button';
import { use, useCallback, useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';

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
                    />
                )}
                <Input 
                label='Email address'
                id='email'
                type='email'
                register={register}
                errors={errors}
                />
                <Input 
                label='Password'
                id='password'
                type='password'
                register={register}
                errors={errors}
                />
                <div>
                    <Button>test</Button>
                </div>
            </form>
        </main>
    </div>
  )
}

export default AuthForm