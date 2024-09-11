import Link from "next/link"

export const LoginRecover = () => {
  return (
    <div>
      <Link href="/login" className="underline text-red-600 bg-yellow-300">
        De volta pra página de login
      </Link>
    </div>
  )
}
