// import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'

// import './globals.css'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'My Next.js App',
//   description: 'A sample Next.js application',
// }

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='h-full flex items-center justify-center'>
        {children}
    </div>
  )
}