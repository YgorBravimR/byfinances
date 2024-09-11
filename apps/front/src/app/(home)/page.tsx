"use client"

import Image from "next/image"
import { Suspense } from "react"

export default function Home() {
  return (
    <Suspense>
      <div className="w-full h-screen flex justify-center items-center gap-4 ">
        <div className="h-1/2">
          <Image width={600} height={600} src={"/penguin.webp"} alt="" className="rounded-xl h-full w-full object-contain" />
        </div>
        <div>
          <Image width={400} height={200} src={"/byplo2.png"} alt="" />
        </div>
      </div>
    </Suspense>
  )
}
