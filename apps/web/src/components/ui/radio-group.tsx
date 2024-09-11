"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>>(({ className, orientation, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("flex gap-2", className, orientation === "horizontal" ? "flex-row" : "flex-col")} {...props} ref={ref} />
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center ">
        <Circle className="h-2.5 w-2.5 fill-amber-600 text-amber-600" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }