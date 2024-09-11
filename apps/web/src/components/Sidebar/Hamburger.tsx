import { cn } from "@/lib/utils"
import hamburgerStyles from "./hamburger.module.css"

export const Hamburger = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}) => (
  <button
    className={cn(
      "visible block md:invisible md:hidden",
      "fixed top-0 left-0 z-40 w-10 h-10 py-1.5",
      "dark:text-white text-slate-950 h-100"
    )}
    onClick={() => setIsOpen(!isOpen)}
  >
    <svg
      className={cn(
        hamburgerStyles.ham,
        hamburgerStyles.ham4,
        hamburgerStyles.hamRotate,
        isOpen ? hamburgerStyles.active : ""
        // "dark:stroke-white stroke-slate-950"
        // "stroke-lime-400 fill-lime-400"
      )}
      viewBox="0 0 100 100"
      width="40"
      stroke="currentColor"
      fill="currentColor"
    >
      <g stroke="currentColor" fill="currentColor">
        <path
          className={cn(hamburgerStyles.line, hamburgerStyles.top)}
          d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
        />
        <path
          className={cn(hamburgerStyles.line, hamburgerStyles.middle)}
          d="m 70,50 h -40"
        />
        <path
          className={cn(hamburgerStyles.line, hamburgerStyles.bottom)}
          d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
        />
      </g>
    </svg>
  </button>
)
