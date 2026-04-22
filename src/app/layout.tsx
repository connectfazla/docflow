import type { Metadata } from 'next'
import './globals.css'
import { ToastContainer } from '@/components/ui/toast'
import { Providers } from '@/components/providers'

export const metadata: Metadata = {
  title: 'DocFlow Pro — Document Automation Platform',
  description: 'Create, send, track, and sign documents online. The all-in-one document workflow platform.',
  openGraph: {
    title: 'DocFlow Pro',
    description: 'Create, send, track, and sign documents online.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  )
}
