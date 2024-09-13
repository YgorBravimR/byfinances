import Link from 'next/link'

export const LoginRecover = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center gap-4">
      <Link href="/" className="bg-yellow-300 text-red-600 underline">
        De volta pra página de login
      </Link>
    </div>
  )
}
