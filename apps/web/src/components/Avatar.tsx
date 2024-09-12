'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenuLabel, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

export const AvatarBadge = ({ img, name, size = 40 }: { img?: string | null; name: string; size?: number }) => {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={`p-0 text-slate-500 dark:text-slate-400`} style={{ width: size, height: size }}>
          <Avatar className="h-full w-full">
            {img && <AvatarImage src={img} />}
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          onClick={() => {
            deleteCookie('access_token')
            router.push('/sign-in')
          }}
        >
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
