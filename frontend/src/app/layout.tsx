import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Palindrome Store - Descuentos especiales para palíndromos',
  description: 'Ecommerce moderno con búsqueda inteligente que aplica 50% de descuento automáticamente cuando buscas palíndromos. Tecnología premium con UX excepcional.',
  keywords: ['ecommerce', 'palíndromo', 'descuentos', 'tecnología', 'productos', 'next.js', 'modern ui'],
  authors: [{ name: 'Palindrome Store Team' }],
  openGraph: {
    title: 'Palindrome Store - Descuentos especiales',
    description: 'Descubre productos increíbles con 50% OFF automático en búsquedas de palíndromos',
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