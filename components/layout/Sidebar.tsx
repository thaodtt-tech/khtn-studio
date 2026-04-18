'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home, BookOpen, Library, FolderOpen, NotebookPen,
  Sparkles, FileText, Network, Gamepad2, PenTool, User,
  FlaskConical, ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { APP_NAME } from '@/lib/constants'

const ICON_MAP: Record<string, React.ElementType> = {
  Home, BookOpen, Library, FolderOpen, NotebookPen,
  Sparkles, FileText, Network, Gamepad2, PenTool, User,
}

const NAV = [
  {
    group: 'Tổng quan',
    items: [
      { href: '/dashboard',  label: 'Trang chủ',        icon: 'Home' },
      { href: '/subjects',   label: 'Khám phá môn học', icon: 'BookOpen' },
      { href: '/resources',  label: 'Thư viện số',       icon: 'Library' },
    ],
  },
  {
    group: 'Học tập cá nhân',
    items: [
      { href: '/my-study',   label: 'Hệ thống ôn tập',  icon: 'FolderOpen' },
      { href: '/notebooks',  label: 'Notebook KHTN',     icon: 'NotebookPen' },
    ],
  },
  {
    group: 'Công cụ AI',
    items: [
      { href: '/ai-tools',   label: 'Công cụ AI',        icon: 'Sparkles' },
      { href: '/reports',    label: 'Báo cáo học tập',   icon: 'FileText' },
      { href: '/mindmaps',   label: 'Sơ đồ tư duy',      icon: 'Network' },
    ],
  },
  {
    group: 'Game học tập',
    items: [
      { href: '/games',      label: 'Thư viện game',     icon: 'Gamepad2' },
      { href: '/teacher',    label: 'Game Studio',       icon: 'PenTool' },
    ],
  },
  {
    group: 'Cá nhân',
    items: [
      { href: '/profile',    label: 'Tiến độ & Hồ sơ',  icon: 'User' },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col h-full overflow-y-auto shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-100">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <FlaskConical size={16} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm leading-tight">{APP_NAME}</div>
            <div className="text-[10px] text-slate-400 leading-tight">KHTN THCS</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-5">
        {NAV.map((section) => (
          <div key={section.group}>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1.5">
              {section.group}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = ICON_MAP[item.icon]
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      )}
                    >
                      {Icon && (
                        <Icon
                          size={15}
                          className={cn(isActive ? 'text-blue-600' : 'text-slate-400')}
                        />
                      )}
                      <span className="flex-1">{item.label}</span>
                      {isActive && <ChevronRight size={12} className="text-blue-400" />}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-4 py-3 border-t border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-sm">
            🎓
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-700 truncate">Nguyễn Nguyên Bảo</p>
            <p className="text-[10px] text-slate-400">Lớp 6A7 · THCS Dịch Vọng Hậu</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
