import Link from 'next/link'

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid w-full overflow-hidden rounded-card border border-neutral-line bg-white shadow-sm lg:grid-cols-2">
        <div className="p-8 sm:p-10">
          <Link href="/" className="font-display text-lg font-semibold text-primary">
            GigMatch<span className="text-accent">AI</span>
          </Link>
          <h1 className="mt-6 font-display text-2xl font-semibold text-primary">{title}</h1>
          <p className="mt-1 text-sm text-neutral-soft">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>

        <div className="hidden flex-col justify-center bg-primary p-10 text-white lg:flex">
          <p className="font-display text-2xl font-semibold leading-snug">
            &ldquo;The fit score saved me hours of scrolling through gigs I was never going to land.&rdquo;
          </p>
          <p className="mt-4 text-sm text-white/70">Rakib H., Full-Stack Developer</p>
        </div>
      </div>
    </div>
  )
}