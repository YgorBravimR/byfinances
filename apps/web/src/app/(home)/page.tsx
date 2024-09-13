"use client"
import Image from 'next/image'

export default function Page() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-4 ">
      <div className="h-1/2">
        <Image width={600} height={600} src={'/penguin.webp'} alt="" className="h-full w-full rounded-xl object-contain" />
      </div>
      <div>
        <Image width={400} height={200} src={'/byplo2.png'} alt="" />
      </div>
    </div>
  )
}
