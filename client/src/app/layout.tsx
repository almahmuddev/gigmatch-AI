import type { Metadata } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { QueryProvider } from '@/components/providers/QueryProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ChatWidget from '@/components/chat/ChatWidget'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'GigMatch AI - Find the freelance gigs that actually fit',
    template: '%s | GigMatch AI',
  },
  description:
    'An AI-powered freelance marketplace that matches freelancers with the gigs that fit their skills, not just a keyword search.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans">
        <QueryProvider>
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <ChatWidget />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
