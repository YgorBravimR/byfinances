'use client'

import { FormItemWithMessage } from '@/components/FormErrorMessage'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCustomFormState } from '@/hooks/useCustomFormState'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { signInFormAction } from '../actions'
import { SignInFormType, SignInSchema } from '../types'

export const SignInForm = () => {
  const [{ success, message, errors }, submit, isPending] = useCustomFormState(signInFormAction, () => router.push('/'))

  const router = useRouter()

  const { register } = useForm<SignInFormType>({
    resolver: zodResolver(SignInSchema),
  })

  return (
    <form className="flex w-full flex-col items-center gap-6" onSubmit={submit}>
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Sign in failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}
      <div className="grid w-full gap-6">
        <FormItemWithMessage message={errors?.email ? errors?.email[0] : null}>
          <Input type="email" label="E-mail" placeholder="E-mail" id="signin-email" {...register('email')} />
        </FormItemWithMessage>
        <FormItemWithMessage message={errors?.password ? errors.password[0] : null}>
          <Input
            type="password"
            label="Password"
            placeholder="Password"
            id="signin-password"
            {...register('password')}
          />
        </FormItemWithMessage>
        <Link href={'/sign-in/recover'} className="-mt-2 text-xs hover:underline">
          Forgot your password?
        </Link>
      </div>
      <Button size="sm" type="submit" className="w-24">
        {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Sign In'}
      </Button>
    </form>
  )
}
