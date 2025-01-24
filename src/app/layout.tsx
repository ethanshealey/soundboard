import { Metadata } from 'next'
import './globals.scss'
import Providers from './Providers'

export const metadata: Metadata = {
  title: 'Soundboard | ethanshealey.com',
  description: 'Soundboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
