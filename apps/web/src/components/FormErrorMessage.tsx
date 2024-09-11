interface Props {
  message: string
}

export const FormErrorMessage = ({ message }: Props) => {
  return <p className="text-xs font-medium text-red-500 dark:text-red-900">{message}</p>
}
