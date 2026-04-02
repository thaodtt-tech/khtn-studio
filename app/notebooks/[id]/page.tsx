'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Sparkles, Link2, FileText, Type, Loader2, Star } from 'lucide-react'
import { cn, BRANCH_META, GRADE_LABELS } from '@/lib/utils'
import { getNotebookById } from '@/data/notebooks'
import { mockGenerateSummary, mockGenerateFlashcards, delay } from '@/lib/mock-ai'
import type { NotebookSource } from '@/types'

const TABS = ['Nguồn tài liệu', 'Ghi chú', 'AI Tóm tắt', 'Khái niệm', 'Câu hỏi', 'Công thức', 'Từ vựng'] as const

export default function NotebookDetailPage() {
  const { id } = useParams<{ id: string }>()
  const nb = getNotebookById(id)
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('AI Tóm tắt')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiSummary, setAiSummary] = useState(nb?.aiSummary || '')
  const [showAddSource, setShowAddSource] = useState(false)
  const [newSource, setNewSource] = useState({ type: 'text' as 'text' | 'link' | 'file', title: '', content: '' })
  const [sources, setSources] = useState<NotebookSource[]>(nb?.sources || [])
  const [notes, setNotes] = useState(nb?.notes || '')
  const [flashcards, setFlashcards] = useState<any[]>([])
  const [flashLoading, setFlashLoading] = useState(false)

  if (!nb) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">Không tìm thấy notebook.</p>
        <Link href="/notebooks" className="text-blue-600 text-sm mt-2 inline-block hover:underline">← Quay lại</Link>
      </div>
    )
  }

  const branch = BRANCH_META[nb.branch]

  async function generateSummary() {
    setAiLoading(true)
    const result = await mockGenerateSummary(nb!.topic, notes)
    setAiSummary(result)
    setAiLoading(false)
    setActiveTab('AI Tóm tắt')
  }

  async function generateFlashcards() {
    setFlashLoading(true)
    const cards = await mockGenerateFlashcards(nb!.topic, nb!.grade, nb!.branch)
    setFlashcards(cards)
    setFlashLoading(false)
  }

  function addSource() {
    if (!newSource.title.trim()) return
    const source: NotebookSource = {
      id: Date.now().toString(),
      type: newSource.type,
      title: newSource.title,
      content: newSource.content,
      addedAt: new Date().toISOString(),
    }
    setSources(prev => [...prev, source])
    setNewSource({ type: 'text', title: '', content: '' })
    setShowAddSource(false)
  }

  return (
    <div>
      <Link href="/notebooks" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-5 transition-colors">
        <ArrowLeft size={14} /> Notebooks
      </Link>

      {/* Header */}
      <div className="flex items-start gap-4 mb-6 p-5 rounded-2xl border border-slate-100 bg-white">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: nb.color + '20' }}
        >
          {nb.emoji}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-lg font-bold text-slate-900">{nb.title}</h1>
            {nb.isStarred && <Star size={14} className="text-amber-400 fill-amber-400" />}
          </div>
          <p className="text-sm text-slate-500 mb-2">{nb.description}</p>
          <div className="flex flex-wrap gap-2">
            <span className={cn('badge text-[10px]', branch.bg, branch.color)}>{branch.emoji} {branch.label}</span>
            <span className="badge bg-slate-100 text-slate-500 text-[10px]">{GRADE_LABELS[nb.grade]}</span>
            <span className="badge bg-blue-100 text-blue-700 text-[10px]">🏷️ {nb.topic}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={generateSummary} disabled={aiLoading}
            className="btn-primary flex items-center gap-1.5 text-xs"
          >
            {aiLoading ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
            AI Tóm tắt
          </button>
          <button onClick={() => setShowAddSource(true)} className="btn-secondary flex items-center gap-1.5 text-xs">
            <Plus size={13} /> Thêm nguồn
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 overflow-x-auto pb-1">
        {TABS.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={cn('px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors',
              activeTab === t ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Sources */}
          {activeTab === 'Nguồn tài liệu' && (
            <div className="space-y-3">
              {sources.map(src => (
                <div key={src.id} className="card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {src.type === 'text' && <Type size={14} className="text-blue-500" />}
                    {src.type === 'link' && <Link2 size={14} className="text-emerald-500" />}
                    {src.type === 'file' && <FileText size={14} className="text-amber-500" />}
                    <span className="text-sm font-medium text-slate-800">{src.title}</span>
                    <span className="text-[10px] text-slate-400 ml-auto">{src.addedAt.slice(0, 10)}</span>
                  </div>
                  {src.content && <p className="text-xs text-slate-600 leading-relaxed">{src.content}</p>}
                  {src.url && <a href={src.url} className="text-xs text-blue-500 hover:underline">🔗 {src.url}</a>}
                  {src.fileName && <p className="text-xs text-slate-500">📎 {src.fileName}</p>}
                </div>
              ))}
              {sources.length === 0 && (
                <div className="text-center py-10 text-slate-400">
                  <p className="text-2xl mb-2">📥</p>
                  <p className="text-sm">Chưa có nguồn tài liệu. Nhấn "Thêm nguồn" để bắt đầu.</p>
                </div>
              )}
            </div>
          )}

          {/* Notes */}
          {activeTab === 'Ghi chú' && (
            <div className="card p-4">
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full text-sm text-slate-700 leading-relaxed outline-none resize-none min-h-64 border-none"
                placeholder="Viết ghi chú của bạn ở đây..."
              />
            </div>
          )}

          {/* AI Summary */}
          {activeTab === 'AI Tóm tắt' && (
            <div className="card p-5">
              {aiLoading ? (
                <div className="flex flex-col items-center py-12 gap-3 text-slate-400">
                  <Loader2 size={28} className="animate-spin text-blue-500" />
                  <p className="text-sm">AI đang tóm tắt kiến thức...</p>
                </div>
              ) : aiSummary ? (
                <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed whitespace-pre-line">
                  {aiSummary}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <Sparkles size={28} className="mx-auto mb-3 text-blue-300" />
                  <p className="text-sm">Nhấn "AI Tóm tắt" để tạo bản tóm tắt thông minh từ nội dung notebook.</p>
                </div>
              )}
            </div>
          )}

          {/* Concepts */}
          {activeTab === 'Khái niệm' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {nb.keyConcepts.map((c, i) => (
                <div key={i} className="card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {c.emoji && <span className="text-xl">{c.emoji}</span>}
                    <h4 className="text-sm font-semibold text-slate-800">{c.term}</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{c.definition}</p>
                </div>
              ))}
            </div>
          )}

          {/* Questions */}
          {activeTab === 'Câu hỏi' && (
            <div className="space-y-2">
              {nb.importantQuestions.map((q, i) => (
                <div key={i} className="card p-4 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <p className="text-sm text-slate-700">{q}</p>
                </div>
              ))}
            </div>
          )}

          {/* Formulas */}
          {activeTab === 'Công thức' && (
            <div className="space-y-3">
              {nb.formulas.map((f, i) => (
                <div key={i} className="card p-4">
                  <p className="text-xs text-slate-500 mb-1">{f.name}</p>
                  <div className="text-xl font-bold text-blue-700 font-mono mb-2 px-3 py-2 bg-blue-50 rounded-lg">
                    {f.expression}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    {f.unit && <span>📏 Đơn vị: <strong>{f.unit}</strong></span>}
                    <span>{f.description}</span>
                  </div>
                </div>
              ))}
              {nb.formulas.length === 0 && (
                <div className="text-center py-10 text-slate-400 text-sm">Chưa có công thức nào được thêm.</div>
              )}
            </div>
          )}

          {/* Vocabulary */}
          {activeTab === 'Từ vựng' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {nb.vocabulary.map((v, i) => (
                <div key={i} className="card p-3 flex items-start gap-3">
                  <div className="text-sm font-bold text-slate-900 min-w-28">{v.term}</div>
                  <div className="text-xs text-slate-500 flex-1">{v.meaning}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card p-4">
            <h3 className="text-xs font-semibold text-slate-700 mb-3 uppercase tracking-wider">Thống kê</h3>
            {[
              { label: 'Nguồn tài liệu', value: sources.length },
              { label: 'Khái niệm', value: nb.keyConcepts.length },
              { label: 'Câu hỏi', value: nb.importantQuestions.length },
              { label: 'Công thức', value: nb.formulas.length },
              { label: 'Từ vựng', value: nb.vocabulary.length },
            ].map(item => (
              <div key={item.label} className="flex justify-between text-xs py-1.5 border-b border-slate-50 last:border-0">
                <span className="text-slate-500">{item.label}</span>
                <span className="font-semibold text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Flashcards */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">AI Flashcards</h3>
              <button onClick={generateFlashcards} disabled={flashLoading}
                className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
              >
                {flashLoading ? <Loader2 size={10} className="animate-spin" /> : <Sparkles size={10} />}
                Tạo
              </button>
            </div>
            {flashcards.length > 0 ? (
              <div className="space-y-2">
                {flashcards.slice(0, 3).map((fc, i) => (
                  <div key={i} className="text-xs p-2 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-800">Q: {fc.front}</p>
                    <p className="text-blue-600 mt-1">A: {fc.back}</p>
                  </div>
                ))}
                {flashcards.length > 3 && (
                  <p className="text-[10px] text-slate-400 text-center">+{flashcards.length - 3} flashcard nữa</p>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-400">Nhấn "Tạo" để AI tạo flashcard từ nội dung notebook.</p>
            )}
          </div>
        </div>
      </div>

      {/* Add source modal */}
      {showAddSource && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="font-bold text-slate-900 mb-4">Thêm nguồn tài liệu</h2>
            <div className="space-y-3">
              <div className="flex gap-2">
                {(['text', 'link', 'file'] as const).map(t => (
                  <button key={t} onClick={() => setNewSource(p => ({ ...p, type: t }))}
                    className={cn('flex-1 py-2 rounded-lg text-xs font-medium transition-colors border',
                      newSource.type === t ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 text-slate-600'
                    )}
                  >
                    {t === 'text' ? '📝 Văn bản' : t === 'link' ? '🔗 Link' : '📎 File'}
                  </button>
                ))}
              </div>
              <input value={newSource.title} onChange={e => setNewSource(p => ({ ...p, title: e.target.value }))}
                placeholder="Tiêu đề nguồn..."
                className="input"
              />
              {newSource.type === 'text' && (
                <textarea value={newSource.content} onChange={e => setNewSource(p => ({ ...p, content: e.target.value }))}
                  placeholder="Dán nội dung, ghi chú vào đây..."
                  className="input min-h-28 resize-none" rows={4}
                />
              )}
              {newSource.type === 'link' && (
                <input value={newSource.content} onChange={e => setNewSource(p => ({ ...p, content: e.target.value }))}
                  placeholder="https://..."
                  className="input"
                />
              )}
              {newSource.type === 'file' && (
                <label className="border-2 border-dashed border-slate-200 hover:border-blue-300 rounded-lg p-6 text-center text-sm text-slate-400 cursor-pointer block transition-colors hover:bg-blue-50">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                    onChange={e => {
                      const file = e.target.files?.[0]
                      if (file) setNewSource(p => ({ ...p, title: p.title || file.name, content: file.name }))
                    }}
                  />
                  📎 {newSource.content
                    ? <span className="text-blue-600 font-medium">{newSource.content}</span>
                    : 'Kéo thả hoặc click để chọn file (.pdf, .doc, .png...)'}
                </label>
              )}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={addSource} className="btn-primary flex-1">Thêm nguồn</button>
              <button onClick={() => setShowAddSource(false)} className="btn-secondary">Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
