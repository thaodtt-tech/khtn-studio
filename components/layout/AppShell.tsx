'use client'

import { usePathname } from 'next/navigation'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

const PUBLIC_ROUTES = ['/', '/login']

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPublic = PUBLIC_ROUTES.includes(pathname)

  if (isPublic) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-7xl mx-auto animate-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
