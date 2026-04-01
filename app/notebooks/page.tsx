'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Star, Clock, BookOpen } from 'lucide-react'
import { cn, BRANCH_META, GRADE_LABELS, formatDate } from '@/lib/utils'
import { NOTEBOOKS } from '@/data/notebooks'
import type { Notebook } from '@/types'

function NotebookCard({ nb }: { nb: Notebook }) {
  const branch = BRANCH_META[nb.branch]
  return (
    <Link href={`/notebooks/${nb.id}`} className="card-hover p-5 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ backgroundColor: nb.color + '20' }}
        >
          {nb.emoji}
        </div>
        {nb.isStarred && <Star size={14} className="text-amber-400 fill-amber-400" />}
      </div>
      <h3 className="font-semibold text-slate-800 text-sm mb-1 line-clamp-2 leading-snug">{nb.title}</h3>
      <p className="text-xs text-slate-500 line-clamp-2 mb-3 flex-1">{nb.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className={cn('badge text-[10px]', branch.bg, branch.color)}>{branch.emoji} {branch.label}</span>
        <span className="badge bg-slate-100 text-slate-500 text-[10px]">{GRADE_LABELS[nb.grade]}</span>
      </div>

      <div className="border-t border-slate-50 pt-3 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-3">
          <span>{nb.sources.length} nguồn</span>
          <span>{nb.keyConcepts.length} khái niệm</span>
          <span>{nb.formulas.length} công thức</span>
        </div>
        <span className="flex items-center gap-1"><Clock size={9} /> {formatDate(nb.updatedAt)}</span>
      </div>
    </Link>
  )
}

export default function NotebooksPage() {
  const [notebooks, setNotebooks] = useState(NOTEBOOKS)
  const [search, setSearch] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [newNb, setNewNb] = useState({ title: '', topic: '', description: '' })

  const filtered = notebooks.filter(n =>
    !search ||
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.topic.toLowerCase().includes(search.toLowerCase())
  )
  const starred = filtered.filter(n => n.isStarred)
  const rest = filtered.filter(n => !n.isStarred)

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="page-title">Notebook KHTN</h1>
          <p className="page-subtitle">Tổ chức tư liệu học tập theo chủ đề — lấy cảm hứng từ NotebookLM</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-1.5">
          <Plus size={14} /> Tạo notebook
        </button>
      </div>

      <div className="relative mb-6">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Tìm notebook theo tiêu đề, chủ đề..."
          className="input pl-9"
        />
      </div>

      {starred.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-1.5 mb-3">
            <Star size={14} className="text-amber-400 fill-amber-400" /> Đã đánh dấu sao
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {starred.map(nb => <NotebookCard key={nb.id} nb={nb} />)}
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-slate-700 mb-3">Tất cả notebook</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map(nb => <NotebookCard key={nb.id} nb={nb} />)}
          </div>
        </section>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <div className="text-4xl mb-3">📓</div>
          <p className="font-medium">Chưa có notebook nào</p>
          <p className="text-sm mt-1">Tạo notebook đầu tiên để bắt đầu tổ chức kiến thức</p>
        </div>
      )}

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="font-bold text-slate-900 mb-4">Tạo Notebook mới</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Tên notebook</label>
                <input value={newNb.title} onChange={e => setNewNb(p => ({ ...p, title: e.target.value }))}
                  placeholder="Vd: Điện học lớp 8 – Ôn thi HK2"
                  className="input"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Chủ đề / Topic</label>
                <input value={newNb.topic} onChange={e => setNewNb(p => ({ ...p, topic: e.target.value }))}
                  placeholder="Vd: Điện học, Di truyền, Tế bào..."
                  className="input"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Mô tả ngắn</label>
                <textarea value={newNb.description} onChange={e => setNewNb(p => ({ ...p, description: e.target.value }))}
                  placeholder="Notebook này dùng để ôn tập..."
                  className="input min-h-20 resize-none" rows={3}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => {
                  if (!newNb.title.trim()) return
                  const nb: Notebook = {
                    id: `nb-${Date.now()}`, title: newNb.title, description: newNb.description,
                    topic: newNb.topic, grade: 8, branch: 'physics', subjectId: '',
                    color: '#3b82f6', emoji: '📓',
                    sources: [], notes: '', keyConcepts: [], importantQuestions: [],
                    vocabulary: [], formulas: [], relatedExerciseIds: [],
                    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
                  }
                  setNotebooks(prev => [nb, ...prev])
                  setNewNb({ title: '', topic: '', description: '' })
                  setShowCreate(false)
                }}
                className="btn-primary flex-1"
              >
                Tạo notebook
              </button>
              <button onClick={() => setShowCreate(false)} className="btn-secondary">Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
