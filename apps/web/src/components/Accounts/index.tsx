'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getAccounts } from './actions'
import { AccountsCard } from './card'
import { CreateAccountModal } from './modals/CreateAccountModal'

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
      <CreateAccountModal isOpen={isCreateAccountModalOpen} setIsOpen={setIsCreateAccountModalOpen} />
      <div className="grid w-full grid-cols-3 justify-center gap-4">
        {isPending ? <div>Loading...</div> : data?.map((account, i) => <AccountsCard account={account} />)}
      </div>
    </div>
  )
}
