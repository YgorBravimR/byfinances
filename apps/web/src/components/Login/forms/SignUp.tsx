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
import { signUp } from '../actions'
import { SignUpFormType, SignUpSchema } from '../schemas'

export const SignUpForm = () => {
  const router = useRouter()
  const [{ success, message, errors }, submit, isPending] = useCustomFormState(signUp, () => router.push('/'))

  const { register } = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpSchema),
  })

  return (
    <>
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
          <FormItemWithMessage message={errors?.name ? errors?.name[0] : null}>
            <Input type="text" label="Name" placeholder="Name" id="signup-name" {...register('name')} />
          </FormItemWithMessage>
          <FormItemWithMessage message={errors?.email ? errors.email[0] : null}>
            <Input type="email" label="E-mail" placeholder="E-mail" id="signup-email" {...register('email')} />
          </FormItemWithMessage>
          <FormItemWithMessage message={errors?.password ? errors.password[0] : null}>
            <Input type="password" label="Password" placeholder="Password" id="signup-password" {...register('password')} />
          </FormItemWithMessage>
          <FormItemWithMessage message={errors?.confirmPassword ? errors.confirmPassword[0] : null}>
            <Input type="password" label="Repeat Password" placeholder="Repeat Password" id="signup-password-confirm" {...register('confirmPassword')} />
          </FormItemWithMessage>
        </div>
        <Button size="sm" type="submit" className="w-24">
          {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Register'}
        </Button>
      </form>
    </>
  )
}
