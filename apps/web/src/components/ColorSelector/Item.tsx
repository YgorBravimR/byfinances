import { cva } from 'class-variance-authority'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type ColorSelectorStates = 'disabled' | 'selected' | 'default'

interface Props {
  color: string
  name?: string
  state?: ColorSelectorStates | null
  handleClick: (color: string) => void
  id?: string
}

export const ColorSelectorItem = ({ color, name, state = 'default', handleClick, id }: Props) => {
  const styles = cva('rounded-full w-[30px] h-[30px] border flex items-center justify-center transition-all relative', {
    variants: {
      state: {
        disabled: ['hover:border-emerald-600', 'border-slate-300'],
        selected: ['border-black', 'hover:border-black', 'border-2'],
        default: ['border-slate-300', 'hover:border-emerald-600'],
      },
    },
    defaultVariants: {
      state: 'default',
    },
  })

  const [showTooltip, setShowTooltip] = useState(false)

  const disabled = false

  return (
    <li>
      <button
        className={styles({ state })}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        id={id}
        disabled={disabled}
        aria-name={`Change color to ${name}`}
        onClick={(e) => {
          e.preventDefault()
          !disabled && handleClick(color)
        }}
      >
        <div
          className={cn('flex h-[80%] w-[80%] items-center justify-center rounded-full bg-gray-100')}
          style={{
            backgroundColor: color,
          }}
        />
      </button>
    </li>
  )
}
