import { cn } from '@/lib/utils'
import { currencyFormater } from '@/utils/numberFormater'
import { EllipsisVertical, Wallet2 } from 'lucide-react'
import { CustomTooltip } from '../CustomTooltip'
import { Card, CardContent, CardHeader } from '../ui/card'
import { IAccount } from './types'

interface Props {
  account: IAccount
}

export const AccountsCard = ({ account: { name, description, bank, color } }: Props) => {
  const balance = -48.559
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <Wallet2 className="flex-shrink-0" />
            <CustomTooltip content={name} trigger={<strong className="w-full flex-grow truncate">{name}</strong>} />
          </div>
          <EllipsisVertical className="flex-shrink-0" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p>Current Balance</p>
          <p className={cn(balance > 0 && 'text-positive', balance < 0 && 'text-negative')}>{currencyFormater(balance)}</p>
        </div>
      </CardContent>
    </Card>
  )
}
