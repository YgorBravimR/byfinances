'use client'
import { cn } from '@/lib/utils'
import { availableColors, mostUsedColors } from '@/utils/availableColors'
import { useMemo, useState } from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from '../ui/popover'
import { ColorSelectorItem } from './Item'

interface Props {
  tone?: 'light' | 'dark' | 'all'
  columns?: number
  wrapperClassName?: string
  showSelect?: boolean
  selectedColor: string | null
  setSelectedColor: (color: string) => void
}

export const ColorSelector = ({
  tone = 'all',
  columns = 4,
  wrapperClassName,
  showSelect,
  selectedColor,
  setSelectedColor,
}: Props) => {
  const colors = useMemo(() => {
    if (tone === 'all') {
      const lightColors = availableColors.light
      const darkColors = availableColors.dark
      const result = []

      const maxLength = Math.max(lightColors.length, darkColors.length)
      for (let i = 0; i < maxLength; i += 4) {
        result.push(...lightColors.slice(i, i + 4))
        result.push(...darkColors.slice(i, i + 4))
      }

      return result
    }
    return availableColors[tone]
  }, [availableColors, tone])

  const mainColors = useMemo(() => {
    const lightColors = availableColors.light
    const darkColors = availableColors.dark

    return tone === 'light'
      ? lightColors.filter(({ name }) => mostUsedColors.light.includes(name))
      : darkColors.filter(({ name }) => mostUsedColors.dark.includes(name))
  }, [colors, tone])

  return showSelect ? (
    <div className="flex flex-col items-start gap-2">
      <ul className={cn('grid w-full grid-cols-8 items-center gap-2', wrapperClassName)}>
        {mainColors.map(({ color, name }) => (
          <ColorSelectorItem
            key={name}
            color={color}
            name={name}
            state={selectedColor === color ? 'selected' : 'default'}
            handleClick={setSelectedColor}
          />
        ))}
        {selectedColor && !mainColors.find(({ color }) => color === selectedColor) && (
          <ColorSelectorItem color={selectedColor} name={''} state={'selected'} handleClick={setSelectedColor} />
        )}
      </ul>
      <Popover>
        <PopoverTrigger asChild className="flex items-center justify-center">
          <PopoverAnchor asChild>
            <Button variant="secondary" className="h-fit rounded-full px-3 py-1">
              Others
            </Button>
          </PopoverAnchor>
        </PopoverTrigger>
        <PopoverContent side="right" className="ml-3">
          <ul className={cn('grid w-full grid-cols-8 items-center gap-2', wrapperClassName)}>
            {colors.map(({ color, name }) => (
              <ColorSelectorItem
                key={name}
                color={color}
                name={name}
                state={selectedColor === color ? 'selected' : 'default'}
                handleClick={setSelectedColor}
              />
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  ) : (
    <ul
      className={cn('grid w-full items-center gap-2', wrapperClassName)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {colors.map(({ color, name }) => (
        <ColorSelectorItem
          key={name}
          color={color}
          name={name}
          state={selectedColor === color ? 'selected' : 'default'}
          handleClick={setSelectedColor}
        />
      ))}
    </ul>
  )
}
