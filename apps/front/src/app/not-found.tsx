import SparklesText from "@/components/magicui/sparkles-text"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import Image from "next/image"
import "./globals.css"

export const metadata: Metadata = {
  title: "404",
  description: "Page not found",
}

export default async function NotFound() {
  const currentData = {
    image: "/construction.jpg",
    bg: "/404.gif",
    text: "text-white",
    sentence:
      "Careful! Everytime you try to access a page that doesn't exist, our workers get stressed.",
  }

  return (
    <div className="relative w-[100vw] h-[100vh] p-5 lg:p-20 bg-black">
      <div
        className="relative flex flex-col items-center w-full h-full pt-20"
        style={{
          backgroundImage: `url(${currentData.bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mb-6 text-center lg:mb-20">
          <div className="">
            <SparklesText
              text="404"
              className="text-6xl md:text-[10rem] lg:-mb-10 bg-black rounded-full px-10 py-2"
            />
          </div>
        </div>

        <div
          className={cn(
            "px-10 py-2 text-xl font-bold text-center bg-[#000000aa] rounded-full",
            currentData.text
          )}
        >
          <p
            className={`mb-2 [text-shadow:_1px_1px_0_rgb(${currentData.text === "text-black" ? "255_255_255_/_60%" : "0_0_0_/_90%"})]`}
          >
            {currentData.sentence}
          </p>
        </div>
      </div>
    </div>
  )
}
