import Footer from '@/components/footer'
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

export const metadata: Metadata = {
  metadataBase: new URL('https:/nuii-chatbot.vercel.app'),
  title,
  description,
  openGraph: {
    title,
    description
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@miiura'
  }
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
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#e0c8fd" />
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
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

// import type { Metadata } from 'next'
// import './globals.css'

// export const metadata: Metadata = {
//   title: 'NextJs 15',
//   description: 'Nextjs 15 starter template'
// }

// export default function RootLayout({
//   children
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en">
//       <head>
//         <link rel="manifest" href="/manifest.json" />
//         <link rel="apple-touch-icon" href="/icon.png" />
//         <meta name="theme-color" content="#e0c8fd" />

//         <meta property="og:title" content="Nextjs App" />
//         <meta name="twitter:title" content="Nextjs App" />

//         <meta name="description" content="Nextjs 14 starter template" />
//         <meta property="og:description" content="Nextjs 14 starter template" />
//         <meta name="twitter:description" content="Nextjs 14 starter template" />

//         <meta property="og:image" content="https://i.imgur.com/Z3bMJXy.jpg" />
//         <meta name="twitter:image" content="https://i.imgur.com/Z3bMJXy.jpg" />
//       </head>
//       {/* //! If you don't want 'screen size' visible at the left bottom of the browser window, You can remove `debug-screens` class */}
//       <body>{children}</body>
//     </html>
//   )
// }
