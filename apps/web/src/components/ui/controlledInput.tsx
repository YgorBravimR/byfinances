import { Formatter, defaultFormatter } from '@/utils/numberFormater'
import { ChangeEventHandler, FocusEventHandler, forwardRef } from 'react'

import { useController } from 'react-hook-form'
import { mergeRefs } from 'react-merge-refs'
import { InputProps } from './input'
import { cn } from '@/lib/utils'

type ControlledInputProps = {
  name: string
  formatter?: Formatter<any>
} & InputProps

export const ControlledInput = forwardRef<HTMLInputElement, ControlledInputProps>(
  ({ className, name, type, label, id, formatter = defaultFormatter, ...props }, ref) => {
    const { field } = useController({
      name,
      defaultValue: props.value,
    })

    const inputRef = mergeRefs([ref, field.ref])

    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      field.onChange(formatter.parse(event.target.value))
      props.onChange?.(event)
    }

    const onBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      field.onBlur()
      props.onBlur?.(event)
    }

    const inputValue = field.value || field.value == 0 ? formatter.format(field.value ?? '') : ''

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:placeholder:text-transparent dark:focus-visible:ring-slate-300',
            className
          )}
          name={name}
          ref={inputRef}
          onChange={onChange}
          onBlur={onBlur}
          value={inputValue}
          {...props}
        />
        <label
          className="absolute left-3 top-1/2 -translate-y-1/2 transform text-sm text-slate-500 transition-all duration-200 ease-in-out"
          htmlFor={id}
        >
          {label}
        </label>
      </div>
    )
  }
)
