'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Clock, BookOpen, Star, ChevronRight, Play } from 'lucide-react'
import { cn, BRANCH_META, GRADE_LABELS, DIFFICULTY_META } from '@/lib/utils'
import { getSubjectById, SUBJECTS } from '@/data/subjects'
import type { Lesson } from '@/types'

export default function SubjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const subject = getSubjectById(id)
  const [selectedDiff, setSelectedDiff] = useState<'all' | 'basic' | 'advanced' | 'gifted'>('all')
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())

  if (!subject) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">Không tìm thấy chủ đề này.</p>
        <Link href="/subjects" className="text-blue-600 text-sm mt-2 inline-block hover:underline">← Quay lại</Link>
      </div>
    )
  }

  const branch = BRANCH_META[subject.branch]
  const lessons = subject.lessons.filter(l => selectedDiff === 'all' || l.difficulty === selectedDiff)

  function toggleComplete(id: string) {
    setCompletedLessons(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const completedCount = subject.lessons.filter(l => completedLessons.has(l.id)).length
  const progress = Math.round((completedCount / subject.lessons.length) * 100)

  // Related subjects (same grade)
  const related = SUBJECTS.filter(s => s.grade === subject.grade && s.id !== subject.id).slice(0, 3)

  return (
    <div>
      {/* Back */}
      <Link href="/subjects" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors">
        <ArrowLeft size={14} /> Khám phá môn học
      </Link>

      {/* Hero */}
      <div className={cn('rounded-2xl p-6 mb-6', subject.bgColor, 'border border-slate-100')}>
        <div className="flex items-start gap-4">
          <div className="text-4xl">{subject.emoji}</div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className={cn('badge', branch.bg, branch.color)}>{branch.emoji} {branch.label}</span>
              <span className="badge bg-white/70 text-slate-600">{GRADE_LABELS[subject.grade]}</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mb-1">{subject.name}</h1>
            <p className="text-sm text-slate-600">{subject.description}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-5">
          <div className="flex justify-between text-xs text-slate-600 mb-1.5">
            <span>Tiến độ học tập</span>
            <span className="font-semibold">{completedCount}/{subject.lessons.length} bài ({progress}%)</span>
          </div>
          <div className="h-2 bg-white/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-current rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, color: '#3b82f6', backgroundColor: '#3b82f6' }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lessons */}
        <div className="lg:col-span-2">
          {/* Filter tabs */}
          <div className="flex gap-2 mb-4">
            {(['all', 'basic', 'advanced', 'gifted'] as const).map(d => (
              <button key={d} onClick={() => setSelectedDiff(d)}
                className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                  selectedDiff === d ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {d === 'all' ? 'Tất cả' : DIFFICULTY_META[d].label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {lessons.map((lesson, idx) => {
              const done = completedLessons.has(lesson.id)
              const diff = DIFFICULTY_META[lesson.difficulty]
              return (
                <div key={lesson.id}
                  className={cn('card p-4 flex items-center gap-4 transition-all',
                    done && 'opacity-60'
                  )}
                >
                  {/* Number */}
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
                    done ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'
                  )}>
                    {done ? '✓' : idx + 1}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-slate-800">{lesson.title}</h3>
                      {lesson.isNew && <span className="badge bg-blue-100 text-blue-700 text-[10px]">Mới</span>}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{lesson.description}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className={cn('badge text-[10px]', diff.badge)}>{diff.label}</span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock size={10} /> {lesson.estimatedMinutes} phút
                      </span>
                      <span className="text-[11px] text-slate-400">✏️ {lesson.exerciseCount} BT</span>
                      <span className="text-[11px] text-slate-400">📚 {lesson.resourceCount} TL</span>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleComplete(lesson.id)}
                      className={cn(
                        'text-xs px-3 py-1.5 rounded-lg font-medium transition-colors',
                        done
                          ? 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      )}
                    >
                      {done ? 'Bỏ đánh dấu' : '✓ Đã học'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Stats */}
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Thống kê chủ đề</h3>
            <div className="space-y-2.5">
              {[
                { label: 'Bài học', value: subject.lessonCount, icon: '📖' },
                { label: 'Bài tập', value: subject.exerciseCount, icon: '✏️' },
                { label: 'Tài liệu', value: subject.resourceCount, icon: '📚' },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-slate-500">{item.icon} {item.label}</span>
                  <span className="font-semibold text-slate-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Từ khóa</h3>
            <div className="flex flex-wrap gap-1.5">
              {subject.lessons.flatMap(l => l.tags).filter((t, i, arr) => arr.indexOf(t) === i).slice(0, 12).map(tag => (
                <span key={tag} className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related */}
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Chủ đề liên quan</h3>
            <div className="space-y-2">
              {related.map(r => (
                <Link key={r.id} href={`/subjects/${r.id}`}
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <span className="text-lg">{r.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-700 line-clamp-1">{r.name}</p>
                    <p className="text-[10px] text-slate-400">{GRADE_LABELS[r.grade]}</p>
                  </div>
                  <ChevronRight size={12} className="text-slate-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
