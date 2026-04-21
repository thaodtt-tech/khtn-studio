import type { Metadata } from 'next'
import './globals.css'
import { AppShell } from '@/components/layout/AppShell'

export const metadata: Metadata = {
  title: 'KHTN Studio – Học Khoa học Tự nhiên THCS',
  description: 'Nền tảng học tập KHTN số dành cho học sinh THCS: ôn tập, tài nguyên, notebook, AI tools và game học tập.',
  icons: { icon: '/logo.png', apple: '/logo.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
