"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useActionState } from "react"
import { useForm } from "react-hook-form"
import { signUp } from "../actions"
import { SignUpFormSchema, SignUpSchema } from "../schemas"

export const SignUpForm = () => {
  const [state, formAction, isPending] = useActionState(signUp, null)

  const { register } = useForm<SignUpFormSchema>({
    resolver: zodResolver(SignUpSchema),
  })

  return (
    <form className="flex flex-col gap-2 items-center" action={formAction}>
      <h2>{state}</h2>
      <div className="grid gap-4">
        <Input type="text" id="signup-name" label="Nome" placeholder="Email" {...register("name")} />
        <Input type="email" id="signup-email" label="Email" placeholder="Email" {...register("email")} />
        <Input type="password" id="signup-password" label="Senha" placeholder="Senha" {...register("password")} />
        <Input type="password" id="signup-password-confirm" label="Confirmar Senha" placeholder="Confirmar Senha" {...register("confirmPassword")} />
      </div>
      <Button size="sm" type="submit" className="w-24">
        {isPending ? <Loader2 className="size-4 animate-spin" /> : "Cadastrar"}
      </Button>
    </form>
  )
}
