import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"

export const PaginationComponent = ({ page, totalPages, url }: { page: number; totalPages: number; url: string }) => {
  const slicedUrl = url.endsWith("/") ? url.slice(0, -1) : url

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="z-10 flex justify-center w-full">
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`${slicedUrl}?page=${page - 1}`} />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink href={`${slicedUrl}?page=${1}`} isActive={page === 1}>
              1
            </PaginationLink>
          </PaginationItem>

          {Array.from(Array(totalPages)).map((_, i) => {
            // first and last pages are always visible
            if (i === 0 || i + 1 === totalPages) return

            // show only 2 pages before and after the current page
            if (i + 1 < page - 3 || i + 1 > page + 3) return

            // show ellipsis if there are more than 2 pages between the current page
            if (i + 1 === page - 3 || i + 1 === page + 3) {
              return (
                <PaginationItem key={`pagination-item-${slicedUrl}-${i + 1}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            return (
              <PaginationItem key={`pagination-item-${slicedUrl}-${i + 1}`}>
                <PaginationLink href={`${slicedUrl}?page=${i + 1}`} isActive={i + 1 === page}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          <PaginationItem>
            <PaginationLink href={`${slicedUrl}?page=${totalPages}`} isActive={page === totalPages}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>

          {page < totalPages && (
            <PaginationItem>
              <PaginationNext href={`${slicedUrl}?page=${page + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  )
}
