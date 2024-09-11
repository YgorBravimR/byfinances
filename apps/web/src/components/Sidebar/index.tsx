"use client"
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { BadgePlus, ChartNoAxesCombined, CircleArrowLeft, CircleArrowRight, Layers3, ScrollText, FilePlus2, UserPlus2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

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
          <li className="text-lg py-2 cursor-pointer hover:opacity-50">
            {url ? (
              <Link href={url} className="flex flex-row items-center gap-4 whitespace-nowrap">
                <div>{icon}</div>
                <span>{title}</span>
              </Link>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex flex-row items-center gap-4 whitespace-nowrap w-full">
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
                  <ul className="flex flex-col w-full gap-4 py-2 pl-0.5 overflow-x-hidden">
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
      title: "Dashboard",
      url: "/",
    },
    {
      icon: <ScrollText size={iconSize} />,
      title: "Cotações",
      url: "/quotes",
    },
    {
      icon: <Layers3 size={iconSize} />,
      title: "Propostas",
      url: "/proposals",
    },
    {
      icon: <BadgePlus size={iconSize} />,
      title: "Adicionar",
      subItems: [
        {
          icon: <UserPlus2 size={iconSize} />,
          title: "Usuário",
          url: "/add/user",
        },
      ],
    },
  ]

  return (
    <div
      className={cn(
        "transition-all duration-2000 ease-in-out bg-white border-r border-r-slate-900/10  text-slate-500  hover:text-slate-950 ",
        "z-30 relative flex flex-col px-4 h-screen ",
        isOpen ? "w-56 text-slate-950" : "w-0 md:w-16"
      )}
    >
      <div className="flex gap-2 justify-center items-center h-12">
        <Image src={isOpen ? "/linkrGreenSmall.png" : "/linkrGreenLogo.png"} width={100} height={50} alt="byplo" className={cn("object-contain")} />
        <button onClick={() => setIsOpen(!isOpen)} className="absolute -right-3 top-3">
          {isOpen ? <CircleArrowLeft size={20} /> : <CircleArrowRight size={20} />}
        </button>
      </div>
      <nav>
        <ul className="flex flex-col w-full gap-4 py-2 pl-0.5 overflow-x-hidden mt-4">
          {nav.map(({ title, icon, url, subItems }, i) => (
            <NavItem icon={icon} title={title} url={url} key={`main-nav-item-${title}-${i}`} isSidebarOpen={isOpen} subItems={subItems} />
          ))}
        </ul>
      </nav>
    </div>
  )
}
