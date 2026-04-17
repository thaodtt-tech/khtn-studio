'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Star, Users, Clock } from 'lucide-react'
import { cn, BRANCH_META, GRADE_LABELS } from '@/lib/utils'
import { GAMES } from '@/data/games'
import type { Grade, SubjectBranch, GameType } from '@/types'

const GAME_TYPE_LABELS: Record<GameType, string> = {
  quiz: '🧠 Quiz',
  'flashcard-match': '🃏 Flashcard Match',
  'drag-drop': '🖱️ Drag & Drop',
  memory: '🎴 Memory',
  'fill-blank': '✏️ Điền chỗ trống',
  crossword: '🔤 Ô chữ',
}

const GRADES: (Grade | 'all')[] = ['all', 6, 7, 8, 9]
const BRANCHES: (SubjectBranch | 'all')[] = ['all', 'khtn', 'physics', 'chemistry', 'biology', 'environment']

export default function GamesPage() {
  const [search, setSearch] = useState('')
  const [grade, setGrade] = useState<Grade | 'all'>('all')
  const [branch, setBranch] = useState<SubjectBranch | 'all'>('all')

  const filtered = GAMES.filter(g =>
    g.isPublished &&
    (grade === 'all' || g.grade === grade) &&
    (branch === 'all' || g.branch === branch) &&
    (!search || g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.topic.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div>
      <div className="mb-6">
        <h1 className="page-title">Thư viện Game học tập</h1>
        <p className="page-subtitle">Quiz, flashcard, memory và các trò chơi giáo dục KHTN THCS</p>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6 space-y-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Tìm game theo tên, chủ đề..."
            className="input pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {GRADES.map(g => (
            <button key={g} onClick={() => setGrade(g)}
              className={cn('px-3 py-1 rounded-lg text-xs font-medium transition-colors',
                grade === g ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              {g === 'all' ? 'Tất cả lớp' : GRADE_LABELS[g as Grade]}
            </button>
          ))}
          <div className="w-px h-5 bg-slate-200 mx-1 self-center" />
          {BRANCHES.map(b => {
            const m = b !== 'all' ? BRANCH_META[b] : null
            return (
              <button key={b} onClick={() => setBranch(b)}
                className={cn('px-3 py-1 rounded-lg text-xs font-medium transition-colors',
                  branch === b ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {m ? `${m.emoji} ${m.label}` : 'Tất cả'}
              </button>
            )
          })}
        </div>
      </div>

      <p className="text-sm text-slate-500 mb-4">{filtered.length} game</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(game => {
          const bm = BRANCH_META[game.branch]
          return (
            <Link key={game.id} href={`/games/${game.id}`} className="card-hover p-4 flex flex-col">
              <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3', game.bgColor)}>
                {game.emoji}
              </div>
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2">{game.title}</h3>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 mb-3 flex-1">{game.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="badge bg-slate-100 text-slate-600 text-[10px]">{GAME_TYPE_LABELS[game.type]}</span>
                <span className={cn('badge text-[10px]', bm.bg, bm.color)}>{bm.label}</span>
                <span className="badge bg-slate-100 text-slate-500 text-[10px]">{GRADE_LABELS[game.grade]}</span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-50 pt-2.5">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-0.5"><Star size={10} className="fill-amber-400 text-amber-400" /> {game.rating}</span>
                  <span className="flex items-center gap-0.5"><Users size={10} /> {game.playCount.toLocaleString()}</span>
                </div>
                <span className="flex items-center gap-0.5"><Clock size={10} /> ~{game.estimatedMinutes}p</span>
              </div>
            </Link>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <div className="text-4xl mb-3">🎮</div>
          <p className="font-medium">Không tìm thấy game nào</p>
          <p className="text-sm mt-1">Thử thay đổi bộ lọc</p>
        </div>
      )}
    </div>
  )
}
