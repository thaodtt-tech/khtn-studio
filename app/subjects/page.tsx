'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter } from 'lucide-react'
import { cn, BRANCH_META, GRADE_LABELS, DIFFICULTY_META } from '@/lib/utils'
import { SUBJECTS } from '@/data/subjects'
import type { Grade, SubjectBranch } from '@/types'

const GRADES: (Grade | 'all')[] = ['all', 6, 7, 8, 9]
const BRANCHES: (SubjectBranch | 'all')[] = ['all', 'physics', 'chemistry', 'biology', 'environment']

export default function SubjectsPage() {
  const [selectedGrade, setSelectedGrade] = useState<Grade | 'all'>('all')
  const [selectedBranch, setSelectedBranch] = useState<SubjectBranch | 'all'>('all')
  const [search, setSearch] = useState('')

  const filtered = SUBJECTS.filter(s =>
    (selectedGrade === 'all' || s.grade === selectedGrade) &&
    (selectedBranch === 'all' || s.branch === selectedBranch) &&
    (search === '' || s.name.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div>
      <div className="mb-6">
        <h1 className="page-title">Khám phá môn học</h1>
        <p className="page-subtitle">Học theo lớp và mảng kiến thức KHTN từ lớp 6 đến lớp 9</p>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tìm chủ đề..."
            className="input pl-9"
          />
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {GRADES.map(g => (
            <button key={g} onClick={() => setSelectedGrade(g)}
              className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                selectedGrade === g
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              {g === 'all' ? 'Tất cả lớp' : GRADE_LABELS[g]}
            </button>
          ))}
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {BRANCHES.map(b => {
            const meta = b !== 'all' ? BRANCH_META[b] : null
            return (
              <button key={b} onClick={() => setSelectedBranch(b)}
                className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                  selectedBranch === b
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {meta ? `${meta.emoji} ${meta.label}` : 'Tất cả'}
              </button>
            )
          })}
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-slate-500 mb-4">
        Tìm thấy <span className="font-semibold text-slate-800">{filtered.length}</span> chủ đề
      </p>

      {/* Subject grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(subject => {
          const branch = BRANCH_META[subject.branch]
          return (
            <Link key={subject.id} href={`/subjects/${subject.id}`}
              className="card-hover p-5 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-2xl', subject.bgColor)}>
                  {subject.emoji}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={cn('badge text-[10px]', branch.bg, branch.color)}>
                    {branch.emoji} {branch.label}
                  </span>
                  <span className="badge bg-slate-100 text-slate-500 text-[10px]">
                    {GRADE_LABELS[subject.grade]}
                  </span>
                </div>
              </div>

              <h3 className="font-semibold text-slate-800 leading-snug mb-1">{subject.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed flex-1 line-clamp-2 mb-4">{subject.description}</p>

              {/* Stats */}
              <div className="flex items-center gap-3 text-xs text-slate-500 border-t border-slate-50 pt-3">
                <span>📖 {subject.lessonCount} bài học</span>
                <span>✏️ {subject.exerciseCount} BT</span>
                <span>📚 {subject.resourceCount} TL</span>
              </div>

              {/* Lesson difficulty preview */}
              <div className="flex gap-1 mt-3">
                {subject.lessons.slice(0, 3).map(l => (
                  <span key={l.id}
                    className={cn('text-[10px] px-1.5 py-0.5 rounded-md font-medium', DIFFICULTY_META[l.difficulty].badge)}
                  >
                    {DIFFICULTY_META[l.difficulty].label}
                  </span>
                ))}
                {subject.lessons.length > 3 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-400 font-medium">
                    +{subject.lessons.length - 3}
                  </span>
                )}
              </div>
            </Link>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-medium">Không tìm thấy chủ đề nào</p>
          <p className="text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      )}
    </div>
  )
}
