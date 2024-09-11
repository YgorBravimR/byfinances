"use client"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"
import { Fragment } from "react"

export const Breadcrumbs = () => {
  const pathname = usePathname()
  const splitPaths = pathname.split("/")

  return (
    <Breadcrumb className="mb-2 capitalize">
      <BreadcrumbList>
        {splitPaths.map((item, index) => {
          const label = index === 0 ? "Home" : item
          const isLast = splitPaths.length - 1 === index

          /** This constructs the path by iterating on all previous items */
          const path =
            index === 0
              ? "/"
              : splitPaths.filter((_, si) => si <= index).join("/")

          return (
            <Fragment key={`breadcrumb-${index}`}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={path}>{label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
