'use client'

import { useQuery } from '@tanstack/react-query'
import { CircleX } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { getAccounts } from './actions'
import { AccountsCard } from './card'
import { CreateAccountForm } from './forms/CreateAccount'

export function AccountsPage() {
  const [search, setSearch] = useState('')
  const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] = useState(false)

  const { data, isPending } = useQuery({
    queryFn: async () => await getAccounts(),
    queryKey: ['accounts', { search }],
    staleTime: 60 * 3 * 1000, // 3 Minutes
  })

  return (
    <div className="flex h-full w-full flex-col gap-4 px-20 py-10">
      <Dialog open={isCreateAccountModalOpen} onOpenChange={setIsCreateAccountModalOpen}>
        <DialogTrigger asChild>
          <Button variant={'addNew'} className="self-end">
            Nova conta
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <div className="flex items-center justify-between">
            <DialogTitle>New Account</DialogTitle>
            <DialogClose>
              <CircleX className="size-4" />
            </DialogClose>
          </div>
          <CreateAccountForm />
        </DialogContent>
      </Dialog>

      <div className="grid w-full grid-cols-3 justify-center gap-4">
        {isPending ? <div>Loading...</div> : data?.map((account, i) => <AccountsCard account={account} />)}
      </div>
    </div>
  )
}
