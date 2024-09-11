"use client"

import Link from "next/link"
import { AvatarBadge } from "../Avatar"

export const NavItem = ({ icon, title, url }: { icon: JSX.Element; title: string; url: string }) => {
  return (
    <li className="text-xs cursor-pointer hover:opacity-50">
      <Link href={url} className="flex flex-row items-start gap-4 whitespace-nowrap">
        <div className="w-4">{icon}</div> {title}
      </Link>
    </li>
  )
}

export const Navbar = () => {
  return (
    <div className="flex flex-row items-center justify-end w-full gap-2 px-4 py-2 bg-white shadow-md dark:shadow-2xl dark:bg-slate-950 h-12">
      <AvatarBadge img={"/avatar.png"} name={"Ygor"} size={30} />
    </div>
  )
}

export default Navbar
