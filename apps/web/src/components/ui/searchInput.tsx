import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, placeholder = "Procurar", ...props }, ref) => {
  return (
    <div className={cn("relative w-full", className)}>
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="text-slate-500" />
      </span>
      <input
        type={type}
        className={cn(
          "h-9 w-full pl-10 pr-3 rounded-md border border-slate-200 bg-transparent py-1 text-sm shadow-sm transition-colors placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
        )}
        ref={ref}
        placeholder={placeholder}
        {...props}
      />
    </div>
  )
})
SearchInput.displayName = "SearchInput"

export { SearchInput }
