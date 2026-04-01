import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'

export const metadata: Metadata = {
  title: 'KHTN Studio – Học Khoa học Tự nhiên THCS',
  description: 'Nền tảng học tập KHTN số dành cho học sinh THCS: ôn tập, tài nguyên, notebook, AI tools và game học tập.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
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
      </body>
    </html>
  )
}
