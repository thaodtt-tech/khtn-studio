'use client'

import { useState } from 'react'
import { Search, Star, Eye, Bookmark, BookmarkCheck, X, BookOpen, Download } from 'lucide-react'
import { cn, BRANCH_META, GRADE_LABELS, RESOURCE_TYPE_META } from '@/lib/utils'
import { RESOURCES } from '@/data/resources'
import type { Resource, Grade, SubjectBranch, ResourceType } from '@/types'

const GRADES: (Grade | 'all')[] = ['all', 6, 7, 8, 9]
const BRANCHES: (SubjectBranch | 'all')[] = ['all', 'khtn', 'physics', 'chemistry', 'biology', 'environment']
const TYPES: (ResourceType | 'all')[] = ['all', 'article', 'pdf', 'video', 'mindmap', 'exercise', 'simulation', 'experiment', 'image']

function previewUrl(url: string) {
  if (url.includes('youtube.com/embed/')) return url
  return url.replace(/\/view.*$/, '/preview')
}

function PdfModal({ resource, onClose }: { resource: Resource; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/70" onClick={onClose}>
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 text-white shrink-0" onClick={e => e.stopPropagation()}>
        <span className="text-sm font-medium truncate">{resource.thumbnailEmoji} {resource.title}</span>
        <div className="flex items-center gap-2 ml-4 shrink-0">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs bg-slate-700 hover:bg-slate-600 transition-colors"
          >
            <Download size={12} /> Tải xuống
          </a>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-slate-700 transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="flex-1 min-h-0" onClick={e => e.stopPropagation()}>
        <iframe
          src={previewUrl(resource.url!)}
          className="w-full h-full border-0"
          allow="autoplay"
        />
      </div>
    </div>
  )
}

function ResourceCard({ resource, saved, onSave, onRead }: {
  resource: Resource
  saved: boolean
  onSave: () => void
  onRead: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const typeM = RESOURCE_TYPE_META[resource.type]
  const branchM = BRANCH_META[resource.branch]

  return (
    <div className="card p-4 flex flex-col hover:shadow-card-hover transition-all">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className={cn('badge text-[10px]', typeM.color)}>{typeM.emoji} {typeM.label}</span>
          <span className={cn('badge text-[10px]', branchM.bg, branchM.color)}>{branchM.label}</span>
        </div>
        <button onClick={onSave} className="text-slate-400 hover:text-amber-500 transition-colors shrink-0">
          {saved ? <BookmarkCheck size={16} className="text-amber-500" /> : <Bookmark size={16} />}
        </button>
      </div>

      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl mb-3">
        {resource.thumbnailEmoji}
      </div>

      <h3 className="text-sm font-semibold text-slate-800 mb-1 line-clamp-2 leading-snug">{resource.title}</h3>

      <p className={cn('text-xs text-slate-500 leading-relaxed mb-3 flex-1', expanded ? '' : 'line-clamp-2')}>
        {resource.description}
      </p>
      {resource.description.length > 100 && (
        <button onClick={() => setExpanded(!expanded)} className="text-[11px] text-blue-500 mb-2 hover:underline text-left">
          {expanded ? 'Thu gọn' : 'Xem thêm'}
        </button>
      )}

      <div className="flex flex-wrap gap-1 mb-3">
        {resource.tags.slice(0, 3).map(t => (
          <span key={t} className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded-full">{t}</span>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-50 pt-2.5">
        <span>🎓 {resource.author}</span>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-0.5"><Eye size={10} /> {resource.viewCount.toLocaleString()}</span>
          <span className="flex items-center gap-0.5"><Star size={10} /> {resource.savedCount}</span>
        </div>
      </div>

      {resource.url && (
        <button
          onClick={onRead}
          className="mt-3 flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg text-xs font-medium bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors"
        >
          <BookOpen size={12} /> {resource.type === 'video' ? 'Xem video' : 'Đọc online'}
        </button>
      )}
    </div>
  )
}

export default function ResourcesPage() {
  const [search, setSearch] = useState('')
  const [grade, setGrade] = useState<Grade | 'all'>('all')
  const [branch, setBranch] = useState<SubjectBranch | 'all'>('all')
  const [type, setType] = useState<ResourceType | 'all'>('all')
  const [saved, setSaved] = useState<Set<string>>(new Set(['r1', 'r7', 'r9', 'r10']))
  const [showSavedOnly, setShowSavedOnly] = useState(false)
  const [viewing, setViewing] = useState<Resource | null>(null)

  const filtered = RESOURCES.filter(r =>
    (!search || r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) &&
    (grade === 'all' || r.grade === grade) &&
    (branch === 'all' || r.branch === branch) &&
    (type === 'all' || r.type === type) &&
    (!showSavedOnly || saved.has(r.id))
  )

  function toggleSave(id: string) {
    setSaved(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div>
      {viewing && <PdfModal resource={viewing} onClose={() => setViewing(null)} />}

      <div className="mb-6">
        <h1 className="page-title">Thư viện số KHTN</h1>
        <p className="page-subtitle">Bài viết, PDF, video, sơ đồ, bài tập và mô phỏng cho học sinh THCS</p>
      </div>

      <div className="card p-4 mb-6 space-y-3">
        <div className="flex gap-3 items-center">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Tìm tài liệu, video, bài tập..."
              className="input pl-9"
            />
          </div>
          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={cn('flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors border',
              showSavedOnly
                ? 'bg-amber-50 border-amber-200 text-amber-700'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            )}
          >
            <BookmarkCheck size={13} /> Đã lưu ({saved.size})
          </button>
          {(search || grade !== 'all' || branch !== 'all' || type !== 'all') && (
            <button onClick={() => { setSearch(''); setGrade('all'); setBranch('all'); setType('all') }}
              className="flex items-center gap-1 px-2 py-2 text-xs text-slate-500 hover:text-slate-700"
            >
              <X size={12} /> Xóa lọc
            </button>
          )}
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {GRADES.map(g => (
            <button key={g} onClick={() => setGrade(g)}
              className={cn('px-2.5 py-1 rounded-lg text-xs font-medium transition-colors',
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
                className={cn('px-2.5 py-1 rounded-lg text-xs font-medium transition-colors',
                  branch === b ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {m ? `${m.emoji} ${m.label}` : 'Tất cả môn'}
              </button>
            )
          })}
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {TYPES.map(t => {
            const m = t !== 'all' ? RESOURCE_TYPE_META[t] : null
            return (
              <button key={t} onClick={() => setType(t)}
                className={cn('px-2.5 py-1 rounded-lg text-xs font-medium transition-colors',
                  type === t ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {m ? `${m.emoji} ${m.label}` : 'Tất cả loại'}
              </button>
            )
          })}
        </div>
      </div>

      <p className="text-sm text-slate-500 mb-4">
        Tìm thấy <span className="font-semibold text-slate-800">{filtered.length}</span> tài nguyên
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(r => (
          <ResourceCard key={r.id} resource={r} saved={saved.has(r.id)} onSave={() => toggleSave(r.id)} onRead={() => setViewing(r)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <div className="text-4xl mb-3">📭</div>
          <p className="font-medium">Không tìm thấy tài nguyên nào</p>
          <p className="text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa</p>
        </div>
      )}
    </div>
  )
}
