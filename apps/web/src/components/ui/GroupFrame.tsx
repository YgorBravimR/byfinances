import { cn } from "@/lib/utils"

interface Props {
  children: React.ReactNode
  label: string
  className?: string
}

export const GroupFrame = ({ children, label, className }: Props) => {
  return (
    <div className={cn("border border-slate-300 rounded-lg relative p-4 w-full", className)}>
      <div className="absolute truncate text-xxs -top-[6.8px] bg-white px-1 rounded-lg left-2">{label}</div>
      {children}
    </div>
  )
}
