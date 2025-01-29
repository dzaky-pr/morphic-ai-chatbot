import Header from '@/components/header'
import PwaDownloadAnnouncement from '@/components/pwadownload'
import { Sidebar } from '@/components/sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import type { Metadata, Viewport } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

const title = 'NUII AI'
const description = 'Standar Konstruksi by Artificial Intelligence.'
const url = 'https://nuii-chatbot.vercel.app'

export const metadata: Metadata = {
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default'
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false
  },
  metadataBase: new URL(url),
  title: {
    default: title,
    template: `%s | ${title}`
  },
  description: description,
  robots: { index: true, follow: true },
  openGraph: {
    url: url,
    title: title,
    description: description,
    siteName: title,
    // images: [`${url}/images/og/og-long.png`],
    type: 'website',
    locale: 'id_ID'
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    // images: [`${url}/images/og/og-square.png`],
    creator: '@nuii-ai'
  },
  authors: [
    {
      name: 'nuii-ai',
      url: url
    }
  ]
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const enableSaveChatHistory =
    process.env.NEXT_PUBLIC_ENABLE_SAVE_CHAT_HISTORY === 'true'
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="NUII AI" />
      </head>
      <body className={cn('font-sans antialiased', fontSans.variable)}>
        <PwaDownloadAnnouncement />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />

          {children}
          {enableSaveChatHistory && <Sidebar />}
          {/* <Footer /> */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
