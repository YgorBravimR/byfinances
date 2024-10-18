import { FormItem } from './ui/form'

interface Props {
  message: string | null | undefined
  children: React.ReactNode
}

export const FormItemWithMessage = ({ message, children }: Props) => {
  return (
    <FormItem className="w-full">
      {children}
      {message && (
        <p className="absolute truncate text-center text-xs font-medium text-red-500 dark:text-red-900">{message}</p>
      )}
    </FormItem>
  )
}
