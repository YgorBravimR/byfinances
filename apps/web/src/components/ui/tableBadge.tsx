import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300",
  {
    variants: {
      variant: {
        black: "border-transparent bg-slate-900 text-slate-50 shadow",
        lightRed: "border-transparent bg-red-100 text-red-900 shadow",
        lightGreen: "border-transparent bg-green-100 text-green-900 shadow",
        lightBlue: "border-transparent bg-blue-100 text-blue-900 shadow",
        lightYellow: "border-transparent bg-yellow-100 text-yellow-900 shadow",
        lightGray: "border-transparent bg-slate-100 text-slate-900 shadow",
        lightIndigo: "border-transparent bg-indigo-100 text-indigo-900 shadow",
        lightPurple: "border-transparent bg-purple-100 text-purple-900 shadow",
        lightPink: "border-transparent bg-pink-100 text-pink-900 shadow",
        lightAmber: "border-transparent bg-amber-100 text-amber-900 shadow",
        red: "border-transparent bg-red-700 text-red-100 shadow",
        green: "border-transparent bg-green-700 text-green-100 shadow",
        blue: "border-transparent bg-blue-700 text-blue-100 shadow",
        yellow: "border-transparent bg-yellow-700 text-yellow-100 shadow",
        gray: "border-transparent bg-slate-700 text-slate-100 shadow",
        indigo: "border-transparent bg-indigo-700 text-indigo-100 shadow",
        purple: "border-transparent bg-purple-700 text-purple-100 shadow",
        pink: "border-transparent bg-pink-700 text-pink-100 shadow",
        amber: "border-transparent bg-amber-700 text-amber-100 shadow",
      },
    },
    defaultVariants: {
      variant: "black",
    },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function TableBadge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className, "items-center justify-center")} {...props} />
}

export { TableBadge, badgeVariants }
