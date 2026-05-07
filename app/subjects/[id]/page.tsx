'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Clock, ChevronRight, X, Download, BookOpen, ExternalLink } from 'lucide-react'
import { cn, BRANCH_META, GRADE_LABELS, DIFFICULTY_META, RESOURCE_TYPE_META } from '@/lib/utils'
import { getSubjectById, SUBJECTS } from '@/data/subjects'
import { NOTEBOOKS } from '@/data/notebooks'
import { RESOURCES } from '@/data/resources'
import type { Resource } from '@/types'

function previewUrl(url: string) {
  if (url.includes('youtube.com/embed/')) return url
  return url.replace(/\/view.*$/, '/preview')
}

function inlineMd(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
}

function renderArticle(md: string) {
  const lines = md.split('\n')
  const elements: React.ReactNode[] = []
  let listItems: string[] = []
  let k = 0
  function flushList() {
    if (!listItems.length) return
    elements.push(
      <ul key={k++} className="list-disc pl-5 space-y-1 my-2">
        {listItems.map((item, i) => (
          <li key={i} className="text-sm text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: inlineMd(item) }} />
        ))}
      </ul>
    )
    listItems = []
  }
  for (const line of lines) {
    if (line.startsWith('## ')) {
      flushList()
      elements.push(<h2 key={k++} className="text-base font-bold text-slate-800 mt-6 mb-2 pb-1 border-b border-slate-200">{line.slice(3)}</h2>)
    } else if (line.startsWith('### ')) {
      flushList()
      elements.push(<h3 key={k++} className="text-sm font-semibold text-slate-700 mt-4 mb-1.5">{line.slice(4)}</h3>)
    } else if (line.startsWith('> ')) {
      flushList()
      elements.push(
        <div key={k++} className="border-l-4 border-blue-300 bg-blue-50 px-3 py-2 my-2 rounded-r-lg">
          <p className="text-sm text-blue-800" dangerouslySetInnerHTML={{ __html: inlineMd(line.slice(2)) }} />
        </div>
      )
    } else if (line.startsWith('- ')) {
      listItems.push(line.slice(2))
    } else if (line.trim() === '') {
      flushList()
    } else {
      flushList()
      elements.push(
        <p key={k++} className="text-sm text-slate-700 leading-relaxed my-1.5"
          dangerouslySetInnerHTML={{ __html: inlineMd(line) }} />
      )
    }
  }
  flushList()
  return elements
}

function ArticleModal({ resource, onClose }: { resource: Resource; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/60" onClick={onClose}>
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 shrink-0" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl">{resource.thumbnailEmoji}</span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">{resource.title}</p>
            <p className="text-xs text-slate-400">🎓 {resource.author}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded hover:bg-slate-100 transition-colors ml-4 shrink-0">
          <X size={16} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto bg-white" onClick={e => e.stopPropagation()}>
        <div className="max-w-2xl mx-auto px-6 py-6">
          {renderArticle(resource.content ?? resource.description)}
        </div>
      </div>
    </div>
  )
}

function PdfModal({ resource, onClose }: { resource: Resource; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/70" onClick={onClose}>
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 text-white shrink-0" onClick={e => e.stopPropagation()}>
        <span className="text-sm font-medium truncate">{resource.thumbnailEmoji} {resource.title}</span>
        <div className="flex items-center gap-2 ml-4 shrink-0">
          <a href={resource.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs bg-slate-700 hover:bg-slate-600 transition-colors">
            <Download size={12} /> Tải xuống
          </a>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-slate-700 transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="flex-1 min-h-0" onClick={e => e.stopPropagation()}>
        {resource.url!.endsWith('.mp4') ? (
          <video src={resource.url!} controls autoPlay className="w-full h-full bg-black" />
        ) : (
          <iframe src={previewUrl(resource.url!)} className="w-full h-full border-0" allow="autoplay" />
        )}
      </div>
    </div>
  )
}

export default function SubjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const subject = getSubjectById(id)
  const [selectedDiff, setSelectedDiff] = useState<'all' | 'basic' | 'advanced' | 'gifted'>('all')
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())
  const [viewingResource, setViewingResource] = useState<Resource | null>(null)
  const [readingArticle, setReadingArticle] = useState<Resource | null>(null)

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
  const notebooks = NOTEBOOKS.filter(nb => nb.subjectId === subject.id)
  const subjectResources = RESOURCES.filter(r => r.subjectId === subject.id)

  function toggleComplete(lessonId: string) {
    setCompletedLessons(prev => {
      const next = new Set(prev)
      next.has(lessonId) ? next.delete(lessonId) : next.add(lessonId)
      return next
    })
  }

  function handleResourceOpen(r: Resource) {
    if (r.type === 'article') setReadingArticle(r)
    else setViewingResource(r)
  }

  const completedCount = subject.lessons.filter(l => completedLessons.has(l.id)).length
  const progress = Math.round((completedCount / subject.lessons.length) * 100)

  // Related subjects (same grade)
  const related = SUBJECTS.filter(s => s.grade === subject.grade && s.id !== subject.id).slice(0, 3)

  return (
    <div>
      {viewingResource && <PdfModal resource={viewingResource} onClose={() => setViewingResource(null)} />}
      {readingArticle && <ArticleModal resource={readingArticle} onClose={() => setReadingArticle(null)} />}

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

      {/* ── Kiến thức trọng tâm ───────────────────────────────────────── */}
      {notebooks.map(nb => (
        <div key={nb.id} className="mt-8 card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
              style={{ backgroundColor: nb.color + '22', color: nb.color }}>
              {nb.emoji}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">📖 Kiến thức trọng tâm</h2>
              <p className="text-xs text-slate-500 mt-0.5">{nb.title}</p>
            </div>
          </div>

          {/* Key Concepts */}
          {nb.keyConcepts.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-yellow-100 text-yellow-700 text-xs flex items-center justify-center">💡</span>
                Khái niệm chính
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {nb.keyConcepts.map((c, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-3 flex items-start gap-3 border border-slate-100">
                    <span className="text-xl shrink-0 mt-0.5">{c.emoji ?? '🔑'}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-800">{c.term}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{c.definition}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formulas */}
          {nb.formulas.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center">📐</span>
                Công thức cần nhớ
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-100">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600">
                      <th className="text-left px-3 py-2 font-medium">Tên</th>
                      <th className="text-left px-3 py-2 font-medium">Công thức</th>
                      <th className="text-left px-3 py-2 font-medium">Đơn vị</th>
                      <th className="text-left px-3 py-2 font-medium hidden sm:table-cell">Mô tả</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {nb.formulas.map((f, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-3 py-2 text-slate-700 font-medium">{f.name}</td>
                        <td className="px-3 py-2 font-mono text-indigo-700 font-semibold">{f.expression}</td>
                        <td className="px-3 py-2 text-slate-500">{f.unit ?? '—'}</td>
                        <td className="px-3 py-2 text-slate-500 hidden sm:table-cell">{f.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Vocabulary */}
          {nb.vocabulary.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center">📖</span>
                Thuật ngữ
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {nb.vocabulary.map((v, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 bg-blue-50 rounded-lg">
                    <span className="text-blue-700 font-semibold text-xs shrink-0 mt-0.5">{v.term}</span>
                    <span className="text-slate-400 text-xs">—</span>
                    <span className="text-slate-600 text-xs leading-relaxed">{v.meaning}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Important Questions */}
          {nb.importantQuestions.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs flex items-center justify-center">❓</span>
                Câu hỏi trọng tâm
              </h3>
              <div className="space-y-2">
                {nb.importantQuestions.map((q, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-sm text-slate-700">{q}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* ── Tài liệu tham khảo ──────────────────────────────────────────── */}
      {subjectResources.length > 0 && (
        <div className="mt-8">
          <h2 className="text-base font-bold text-slate-800 mb-4">📚 Tài liệu tham khảo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {subjectResources.map(r => {
              const typeM = RESOURCE_TYPE_META[r.type]
              const branchM = BRANCH_META[r.branch]
              const hasAction = r.url || r.type === 'article'
              return (
                <div key={r.id} className="card p-4 flex flex-col hover:shadow-card-hover transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={cn('badge text-[10px]', typeM.color)}>{typeM.emoji} {typeM.label}</span>
                    <span className={cn('badge text-[10px]', branchM.bg, branchM.color)}>{branchM.label}</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-xl mb-3">
                    {r.thumbnailEmoji}
                  </div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-1 line-clamp-2 leading-snug">{r.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3 flex-1 line-clamp-3">{r.description}</p>
                  <div className="text-[11px] text-slate-400 mb-3">🎓 {r.author}</div>
                  {hasAction && (
                    r.type === 'article' ? (
                      <button onClick={() => handleResourceOpen(r)}
                        className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg text-xs font-medium bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors">
                        <BookOpen size={12} /> Đọc bài viết
                      </button>
                    ) : (
                      <a href={r.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg text-xs font-medium bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors">
                        <ExternalLink size={12} /> Xem tài liệu
                      </a>
                    )
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
