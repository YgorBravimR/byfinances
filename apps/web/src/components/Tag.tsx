import { cn } from "@/lib/utils"
import { Badge } from "./ui/badge"

export type StatusType = "READY" | "COMPLETED" | "CANCELED" | "OPEN" | "CLOSED"

export const Tag = ({ status }: { status: StatusType }) => (
  <Badge
    variant="default"
    className={cn(
      status === "READY"
        ? "text-green-800 bg-green-100 dark:bg-green-900 dark:text-green-200"
        : "",
      status === "COMPLETED" || status === "CLOSED"
        ? "text-blue-800 bg-blue-100 dark:bg-blue-900 dark:text-blue-200"
        : "",
      status === "CANCELED" || status === "OPEN"
        ? "text-red-800 bg-red-100 dark:bg-red-900 dark:text-red-200"
        : ""
    )}
  >
    {status.toUpperCase()}
  </Badge>
)
