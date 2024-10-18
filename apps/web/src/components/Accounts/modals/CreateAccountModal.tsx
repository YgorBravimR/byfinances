import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { CircleX } from 'lucide-react'
import { CreateAccountForm } from '../forms/CreateAccount'
import { Button } from '@/components/ui/button'

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const CreateAccountModal = ({ isOpen, setIsOpen }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
  )
}
