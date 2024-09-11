import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, id, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:placeholder:text-transparent dark:focus-visible:ring-slate-300",
            className
          )}
          ref={ref}
          {...props}
        />
        <label
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm transition-all duration-200 ease-in-out"
          htmlFor={id}
        >
          {label}
        </label>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
