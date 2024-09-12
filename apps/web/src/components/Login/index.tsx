"use client"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { useMemo, useState } from "react"
import { SignInForm } from "./forms/SignIn"
import { SignUpForm } from "./forms/SignUp"

export const Login = () => {
  const [step, setStep] = useState<'signup' | 'signin'>('signin')

  const formSteps = useMemo(
    () => ({
      signin: {
        title: "Entrar",
        jsx: <SignInForm />,
        changeStep: {
          text: "Ainda não tem uma conta?",
          buttonText: "Cadastre-se",
          onClick: () => setStep("signup"),
        },
      },
      signup: {
        title: "Cadastrar",
        jsx: <SignUpForm />,
        changeStep: {
          text: "Já está cadastrado?",
          buttonText: "Entrar",
          onClick: () => setStep("signin"),
        },
      },
    }),
    []
  )

  return (
    <main className="flex items-center justify-center w-full min-h-screen">
      <div className="mx-auto w-[450px] h-[450px] flex flex-col items-center justify-center gap-6 bg-white shadow-2xl rounded-md relative">
        <Image src={"/greenLogo.png"} alt="" width={40} height={80} className="object-contain absolute top-2 left-2" />
        <h1 className="text-2xl font-bold">{formSteps[step].title}</h1>
        {formSteps[step].jsx}
        <div className="text-sm flex gap-2 items-center">
          {formSteps[step].changeStep.text}
          <Button size="sm" variant="link" onClick={formSteps[step].changeStep.onClick} className="text-sm text-[#003E4D]">
            {formSteps[step].changeStep.buttonText}
          </Button>
        </div>
      </div>
    </main>
  )
}
