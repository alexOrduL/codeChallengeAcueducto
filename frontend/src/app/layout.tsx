import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Za-🦆🦆🦆 Tennis - Descuentos especiales para palíndromos',
  description: 'Ecommerce de tenis con búsqueda inteligente que aplica 50% de descuento automáticamente cuando buscas palíndromos. Equipamiento de tenis premium.',
  keywords: ['tennis', 'tenis', 'palíndromo', 'descuentos', 'raquetas', 'equipamiento deportivo', 'next.js', 'modern ui'],
  authors: [{ name: 'Za-🦆🦆🦆 Tennis Team' }],
  openGraph: {
    title: 'Za-🦆🦆🦆 Tennis - Descuentos especiales',
    description: 'Descubre equipamiento de tenis increíble con 50% OFF automático en búsquedas de palíndromos',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}