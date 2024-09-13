"use client"
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import {
  BadgePlus,
  ChartNoAxesCombined,
  CircleArrowLeft,
  CircleArrowRight,
  Layers3,
  ScrollText,
  FilePlus2,
  UserPlus2,
  CreditCard,
  List,
  Plus,
  Banknote,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../ui/button'

interface NavItemProps {
  icon: JSX.Element
  title: string
  isSidebarOpen?: boolean
  url?: string
  subItems?: NavItemProps[]
  isSubItem?: boolean
}

export const NavItem = ({ icon, title, url, subItems, isSidebarOpen, isSubItem }: NavItemProps) => {
  return (
    <TooltipProvider delayDuration={100} disableHoverableContent>
      <Tooltip open={isSubItem || isSidebarOpen ? false : undefined}>
        <TooltipTrigger asChild>
          <li className="cursor-pointer py-2 text-lg hover:opacity-50">
            {url ? (
              <Link href={url} className="flex flex-row items-center gap-4 whitespace-nowrap">
                <div>{icon}</div>
                <span>{title}</span>
              </Link>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex w-full flex-row items-center gap-4 whitespace-nowrap">
                    {!isSidebarOpen ? (
                      <PopoverAnchor>
                        <div>{icon}</div>
                      </PopoverAnchor>
                    ) : (
                      <div>{icon}</div>
                    )}
                    <span>{title}</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent side="right" className="ml-3">
                  <ul className="flex w-full flex-col gap-4 overflow-x-hidden py-2 pl-0.5">
                    {subItems?.map(({ title, icon, url }, i) => <NavItem isSubItem icon={icon} title={title} url={url} key={`main-nav-item-${title}-${i}`} />)}
                  </ul>
                </PopoverContent>
              </Popover>
            )}
          </li>
        </TooltipTrigger>
        <TooltipContent side="right" className="ml-3">
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const iconSize = 26

  const nav: NavItemProps[] = [
    {
      icon: <ChartNoAxesCombined size={iconSize} />,
      title: 'Dashboard',
      url: '/',
    },
    {
      icon: <Banknote size={iconSize} />,
      title: 'Accounts',
      url: '/accounts',
    },
    {
      icon: <CreditCard size={iconSize} />,
      title: 'Credit Cards',
      url: '/credit-cards',
    },
    {
      icon: <List size={iconSize} />,
      title: 'Transactions',
      url: '/transactions',
    },
    // {
    //   icon: <CreditCard size={iconSize} />,
    //   title: "Credit Cards",
    //   subItems: [
    //     {
    //       icon: <UserPlus2 size={iconSize} />,
    //       title: "Usuário",
    //       url: "/add/user",
    //     },
    //   ],
    // },
  ]

  return (
    <div
      className={cn(
        'border-r border-r-slate-900/10 bg-white text-slate-500 transition-all duration-1000  ease-in-out  hover:text-slate-950 ',
        'relative z-30 flex h-screen flex-col gap-4 px-4',
        isOpen ? 'w-56 text-slate-950' : 'w-0 md:w-20'
      )}
    >
      <div className="flex h-12 items-center justify-center gap-2">
        <Image
          src={isOpen ? '/linkrGreenSmall.png' : '/linkrGreenLogo.png'}
          width={100}
          height={50}
          alt="byplo"
          className={cn('object-contain', isOpen ? 'max-h-12' : 'max-h-11')}
        />
        <button onClick={() => setIsOpen(!isOpen)} className="absolute -right-3 top-10">
          {isOpen ? <CircleArrowLeft size={24} className="text-primary" /> : <CircleArrowRight size={24} className="text-primary" />}
        </button>
      </div>
      <Button className={cn('m-0 h-12 w-full gap-2 rounded-full bg-primary p-0 text-white')}>
        <Plus />
        {isOpen && <span className="text-lg">New</span>}
      </Button>
      <nav>
        <ul className="flex w-full flex-col gap-4 overflow-x-hidden pl-[10px]">
          {nav.map(({ title, icon, url, subItems }, i) => (
            <NavItem icon={icon} title={title} url={url} key={`main-nav-item-${title}-${i}`} isSidebarOpen={isOpen} subItems={subItems} />
          ))}
        </ul>
      </nav>
    </div>
  )
}
