'use client'
import { Button } from '@/components/ui/button'
import { useMemo, useState } from 'react'
import { SignInForm } from './forms/SignIn'
import { SignUpForm } from './forms/SignUp'

export const Login = () => {
  const [step, setStep] = useState<'signup' | 'signin'>('signin')

  const formSteps = useMemo(
    () => ({
      signin: {
        title: 'Sign In',
        jsx: <SignInForm />,
        changeStep: {
          text: 'Not registered yet?',
          buttonText: 'Sign up now',
          onClick: () => setStep('signup'),
        },
      },
      signup: {
        title: 'Sign Up',
        jsx: <SignUpForm />,
        changeStep: {
          text: 'Already registered?',
          buttonText: 'Sign In',
          onClick: () => setStep('signin'),
        },
      },
    }),
    []
  )

  return (
    <div className="relative mx-auto flex h-[450px] w-[450px] flex-col items-center justify-center gap-6 rounded-md bg-white p-14 shadow-2xl ">
      <h1 className="text-2xl font-bold">{formSteps[step].title}</h1>
      {formSteps[step].jsx}
      <div className="flex items-center gap-2 text-sm">
        {formSteps[step].changeStep.text}
        <Button size="sm" variant="link" onClick={formSteps[step].changeStep.onClick} className="text-sm text-[#003E4D]">
          {formSteps[step].changeStep.buttonText}
        </Button>
      </div>
    </div>
  )
}
