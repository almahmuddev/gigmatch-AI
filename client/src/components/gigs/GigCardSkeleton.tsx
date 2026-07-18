export default function GigCardSkeleton() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-card border border-neutral-line bg-white">
      <div className="h-44 w-full animate-pulse bg-neutral-line" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-line" />
        <div className="h-3 w-full animate-pulse rounded bg-neutral-line" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-neutral-line" />
        <div className="mt-auto h-9 w-full animate-pulse rounded-lg bg-neutral-line" />
      </div>
    </div>
  )
}
