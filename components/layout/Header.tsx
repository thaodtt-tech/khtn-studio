'use client'

import { Search, Bell, Star, Flame } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export function Header() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) router.push(`/resources?q=${encodeURIComponent(query)}`)
  }

  return (
    <header className="h-14 bg-white border-b border-slate-100 flex items-center px-6 gap-4 shrink-0">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex-1 max-w-md">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Tìm kiếm chủ đề, tài nguyên, game..."
            className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
      </form>

      <div className="flex-1" />

      {/* Stats pills */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-full">
          <Flame size={13} className="text-amber-500" />
          <span className="text-xs font-semibold text-amber-600">12 ngày</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full">
          <Star size={13} className="text-blue-500" />
          <span className="text-xs font-semibold text-blue-600">23 tài liệu</span>
        </div>
      </div>

      {/* Notification */}
      <button className="relative w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors">
        <Bell size={16} className="text-slate-500" />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
      </button>
    </header>
  )
}
