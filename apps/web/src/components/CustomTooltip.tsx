import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

interface Props {
  trigger: JSX.Element
  content: JSX.Element | string
  delayDuration?: number
  disableHoverableContent?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export const CustomTooltip = ({ trigger, content, delayDuration = 100, disableHoverableContent = true, side = 'top' }: Props) => {
  return (
    <TooltipProvider delayDuration={delayDuration} disableHoverableContent={disableHoverableContent}>
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent side={side} className="ml-3">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
