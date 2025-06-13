import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Chatbot from "@/components/Chatbot"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Chirawat Chitpakdee - AI Engineer & Tech Lead",
  description: "Chirawat Chitpakdee - AI Workflow Engineer & Tech Lead specializing in AI/LLM systems, RPA, and performance testing",
  keywords: "AI Engineer, Tech Lead, LLM, RPA, Performance Testing, Python, FastAPI, AWS",
  authors: [{ name: "Chirawat Chitpakdee" }],
  openGraph: {
    title: "Chirawat Chitpakdee - AI Engineer & Tech Lead",
    description: "Chirawat Chitpakdee - AI Workflow Engineer & Tech Lead specializing in AI/LLM systems, RPA, and performance testing",
    url: "https://chirawat.info/",
    siteName: "Chirawat Chitpakdee Portfolio",
    images: [
      {
        url: "https://chirawat.info/images/profile_picture.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chirawat Chitpakdee - AI Engineer & Tech Lead",
    description: "Chirawat Chitpakdee - AI Workflow Engineer & Tech Lead specializing in AI/LLM systems, RPA, and performance testing",
    images: ["https://chirawat.info/images/profile_picture.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
          rel="stylesheet" 
        />
        <link rel="icon" href="/images/cc_favicon.png" type="image/png" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Chatbot />
      </body>
    </html>
  )
}
