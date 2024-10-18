import { ColorSelector } from '@/components/ColorSelector'
import { FormItemWithMessage } from '@/components/FormErrorMessage'
import { Button } from '@/components/ui/button'
import { ControlledInput } from '@/components/ui/controlledInput'
import { Form, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { currencyFormatter } from '@/utils/numberFormater'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { createAccountFormAction, getBanks } from '../actions'
import { CreateAccountDTO, CreateAccountSchema } from '../types'
import { toast } from '@/components/ui/use-toast'

interface Props {
  close?: () => void
}

export const CreateAccountForm = ({ close }: Props) => {
  const queryClient = useQueryClient()

  const { data: banksList } = useQuery({
    queryFn: async () => await getBanks(),
    queryKey: ['banks'],
    staleTime: 48 * 60 * 60 * 1000, // 2 dias
  })

  const form = useForm<CreateAccountDTO>({
    resolver: zodResolver(CreateAccountSchema),
    defaultValues: {
      name: '',
      description: '',
      bank: '',
      color: '',
      initialBalance: 0,
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = form

  const { mutateAsync: createAccountAsync, isPending: isCreateAccountPending } = useMutation({
    mutationFn: createAccountFormAction,
    onSuccess: async (res) => {
      if (!res.success) {
        console.error('Mutation error:', res.message)
        toast({
          title: 'Error creating account',
          description: res.message,
          variant: 'destructive',
        })
      } else {
        await queryClient.invalidateQueries({ queryKey: ['accounts'] })
        await queryClient.refetchQueries({ queryKey: ['accounts'] })

        close && close()

        toast({
          title: 'Account created',
          description: 'Account created successfully!',
        })
      }
    },
  })

  const onSubmit = async (data: CreateAccountDTO) => {
    await createAccountAsync(data)
  }

  return (
    <Form {...form}>
      <form className="flex w-full flex-col items-center gap-8" onSubmit={handleSubmit(onSubmit)}>
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
          <Controller
            name="bank"
            control={form.control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Bank" defaultValue={field.value} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {banksList &&
                    banksList.map(({ bank_id, color, name, uid }) => (
                      <SelectItem key={`bank-${name}-${uid}`} value={String(bank_id)}>
                        <div className="flex gap-3">{name}</div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormItemWithMessage>
        <FormItemWithMessage message={errors?.initialBalance?.message}>
          <ControlledInput
            name="initialBalance"
            label="Initial Balance"
            placeholder="Initial Balance"
            formatter={currencyFormatter()}
          />
        </FormItemWithMessage>
        <FormItemWithMessage message={errors?.color?.message}>
          <Controller
            name="color"
            control={form.control}
            render={({ field }) => (
              <div className="flex w-full">
                <ColorSelector
                  columns={4}
                  wrapperClassName="w-fit"
                  tone="light"
                  showSelect
                  setSelectedColor={field.onChange}
                  selectedColor={field.value}
                />
              </div>
            )}
          />
        </FormItemWithMessage>
        <Button size="sm" type="submit" className="w-24 self-end">
          {isCreateAccountPending ? <Loader2 className="size-4 animate-spin" /> : 'Confirm'}
        </Button>
      </form>
    </Form>
  )
}
