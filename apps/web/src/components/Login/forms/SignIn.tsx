"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertTriangle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useActionState } from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from '../actions'
import { SignInFormSchema, SignInSchema } from '../schemas'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { FormErrorMessage } from '@/components/FormErrorMessage'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export const SignInForm = () => {
  const [{ success, message, errors }, formAction, isPending] = useActionState(signIn, { success: false, message: null, errors: null })

  const { register } = useForm<SignInFormSchema>({
    resolver: zodResolver(SignInSchema),
  })

  return (
    <form className="flex flex-col items-center gap-2" action={formAction}>
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Sign in failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}
      <div className="grid gap-4">
        <Input type="email" label="E-mail" placeholder="E-mail" id="signin-email" {...register('email')} />
        {errors?.email && <FormErrorMessage message={errors.email[0]} />}
        <Input type="password" label="Senha" placeholder="Senha" id="signin-email" {...register('password')} />
        {errors?.password && <FormErrorMessage message={errors.password[0]} />}
        <Link href={'/sign-in/recover'} className="-mt-3 text-xs hover:underline">
          Esqueceu a senha?
        </Link>
      </div>
      <Button size="sm" type="submit" className="w-24">
        {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Entrar'}
      </Button>
    </form>
  )
}
