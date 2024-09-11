"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useActionState } from "react"
import { useForm } from "react-hook-form"
import { signIn } from "../actions"
import { SignInFormSchema, SignInSchema } from "../schemas"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"

export const SignInForm = () => {
  const [state, formAction, isPending] = useActionState(signIn, null)

  // const { register } = useForm<SignInFormSchema>({
  //   resolver: zodResolver(SignInSchema),
  // })

  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(SignInSchema),
  })

  const { control } = form

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2 items-center" action={formAction}>
        <div className="grid gap-4">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Input type="email" label="E-mail" placeholder="E-mail" onChange={field.onChange} defaultValue={field.value} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Input type="password" label="Senha" placeholder="Senha" onChange={field.onChange} defaultValue={field.value} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Link href={"/sign-in/recover"} className="text-xs hover:underline -mt-3">
            Esqueceu a senha?
          </Link>
        </div>
        <Button size="sm" type="submit" className="w-24">
          {isPending ? <Loader2 className="size-4 animate-spin" /> : "Entrar"}
        </Button>
      </form>
    </Form>
  )
}
