'use client'

import { useRef } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function GoogleSignInButton() {
  const btnRef = useRef<HTMLDivElement>(null)
  const { loginWithGoogle } = useAuth()
  const router = useRouter()

  const renderButton = () => {
    if (!window.google || !btnRef.current) return

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      callback: async (response) => {
        try {
          await loginWithGoogle(response.credential)
          router.push('/explore')
        } catch {
          alert('google sign-in failed, please try again')
        }
      },
    })

    window.google.accounts.id.renderButton(btnRef.current, {
      theme: 'outline',
      size: 'large',
      width: 320,
      text: 'continue_with',
    })
  }

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={renderButton} />
      <div ref={btnRef} className="flex justify-center" />
    </>
  )
}