interface Props {
  message: string | null
  children: React.ReactNode
}

export const FormItemWithMessage = ({ message, children }: Props) => {
  return (
    <div className="w-full">
      {children}
      {message && <p className="absolute truncate text-center text-xs font-medium text-red-500 dark:text-red-900">{message}</p>}
    </div>
  )
}
