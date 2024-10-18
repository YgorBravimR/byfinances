import { FormEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAccountFormAction } from '../actions'
import { CreateAccountDTO, CreateAccountSchema } from '../types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormItemWithMessage } from '@/components/FormErrorMessage'
import { Loader2 } from 'lucide-react'
import { ControlledInput } from '@/components/ui/controlledInput'
import { currencyFormatter } from '@/utils/numberFormater'
import { Form } from '@/components/ui/form'

export const CreateAccountForm = () => {
  const queryClient = useQueryClient()

  // Initialize "react-hook-form"
  const form = useForm<CreateAccountDTO>({
    resolver: zodResolver(CreateAccountSchema),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: createAccountFormAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['accounts'] })
      await queryClient.refetchQueries({ queryKey: ['accounts'] })
    },
    onError: (error) => {
      console.error('Mutation error:', error)

      // Handle field-specific errors here if needed
      // Potentially parse and show error messages on the relevant form fields.
    },
  })

  // Handle form submit
  const onSubmit = async (data: CreateAccountDTO) => {
    await mutateAsync(data)
  }

  return (
    <Form {...form}>
      <form className="flex w-full flex-col items-center gap-6" onSubmit={handleSubmit(onSubmit)}>
        <FormItemWithMessage message={errors?.name?.message}>
          <Input
            type="text"
            label="Account name"
            placeholder="Account name"
            id="create-account-name"
            {...register('name')}
          />
        </FormItemWithMessage>

        <FormItemWithMessage message={errors?.description?.message}>
          <Input
            type="text"
            label="Description"
            placeholder="Description"
            id="create-account-description"
            {...register('description')}
          />
        </FormItemWithMessage>

        <FormItemWithMessage message={errors?.bank?.message}>
          <Input type="text" label="Bank" placeholder="Bank" id="create-account-bank" {...register('bank')} />
        </FormItemWithMessage>

        <FormItemWithMessage message={errors?.color?.message}>
          <Input type="text" label="Color" placeholder="Color" id="create-account-color" {...register('color')} />
        </FormItemWithMessage>

        {/* <FormItemWithMessage message={errors?.initialBalance?.message}>
          <Input
            type="number"
            label="Initial Balance"
            placeholder="Initial Balance"
            id="create-account-balance"
            {...register('initialBalance')}
          />
        </FormItemWithMessage> */}
        <FormItemWithMessage message={errors?.initialBalance?.message}>
          <ControlledInput
            name="initialBalance"
            label="Initial Balance"
            placeholder="Initial Balance"
            formatter={currencyFormatter()}
          />
        </FormItemWithMessage>

        <Button size="sm" type="submit" className="w-24 self-end">
          {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Confirm'}
        </Button>

        {isSuccess && <p>Account created successfully!</p>}
        {isError && <p>There was a problem creating the account. Please try again.</p>}
      </form>
    </Form>
  )
}
