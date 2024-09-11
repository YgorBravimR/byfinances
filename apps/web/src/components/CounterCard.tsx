import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { ReactNode } from "react"
import NumberTicker from "./magicui/number-ticket"

interface Props {
  description: string
  title: number
  children: ReactNode
  progress: number
}

export const CounterCard = ({
  description,
  title,
  children,
  progress,
}: Props) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{description}</CardDescription>
        <CardTitle className="text-4xl">
          <NumberTicker value={title} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{children}</div>
      </CardContent>
      <CardFooter>
        <Progress value={progress} aria-label={`${progress}% increase`} />
      </CardFooter>
    </Card>
  )
}
