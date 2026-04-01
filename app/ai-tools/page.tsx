'use client'

import { useState } from 'react'
import {
  Sparkles, FileText, Network, CheckSquare, FlipHorizontal,
  HelpCircle, Loader2, Copy, Check, ChevronDown, ChevronUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockGenerateSummary, mockGenerateFlashcards, mockGenerateQuestions, mockGenerateChecklist } from '@/lib/mock-ai'
import { NOTEBOOKS } from '@/data/notebooks'
import Link from 'next/link'

const TOOLS = [
  { id: 'summary',    label: 'Tóm tắt kiến thức',    icon: FileText,       desc: 'Tóm tắt tự động từ nội dung bạn cung cấp', color: 'bg-blue-500' },
  { id: 'questions',  label: 'Tạo câu hỏi ôn tập',   icon: HelpCircle,     desc: 'Sinh câu hỏi tự luận và trắc nghiệm',    color: 'bg-violet-500' },
  { id: 'flashcards', label: 'Tạo Flashcards',        icon: FlipHorizontal, desc: 'Bộ thẻ học thuật từ nội dung của bạn',   color: 'bg-emerald-500' },
  { id: 'checklist',  label: 'Checklist ôn thi',      icon: CheckSquare,    desc: 'Danh sách kiểm tra trước kỳ thi',        color: 'bg-amber-500' },
  { id: 'mindmap',    label: 'Sơ đồ tư duy',          icon: Network,        desc: 'Xem sơ đồ tư duy — trang Mind Maps',    color: 'bg-rose-500', href: '/mindmaps' },
  { id: 'report',     label: 'Báo cáo học tập',       icon: Sparkles,       desc: 'Tạo báo cáo hoàn chỉnh — trang Reports', color: 'bg-cyan-500', href: '/reports' },
]

type ToolId = 'summary' | 'questions' | 'flashcards' | 'checklist'

export default function AIToolsPage() {
  const [activeTool, setActiveTool] = useState<ToolId>('summary')
  const [topic, setTopic] = useState('')
  const [content, setContent] = useState('')
  const [fromNotebook, setFromNotebook] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [copied, setCopied] = useState(false)
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())

  async function run() {
    if (!topic.trim()) return
    const inputContent = content || (fromNotebook
      ? NOTEBOOKS.find(n => n.id === fromNotebook)?.notes || ''
      : '')
    setLoading(true)
    setResult(null)
    try {
      if (activeTool === 'summary') setResult(await mockGenerateSummary(topic, inputContent))
      if (activeTool === 'questions') setResult(await mockGenerateQuestions(topic, 6))
      if (activeTool === 'flashcards') setResult(await mockGenerateFlashcards(topic, 8, 'physics'))
      if (activeTool === 'checklist') setResult(await mockGenerateChecklist(topic))
    } finally {
      setLoading(false)
    }
  }

  function copyResult() {
    const text = Array.isArray(result) ? result.map((r: any) => r.front || r).join('\n') : result
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="page-title">Công cụ AI học tập</h1>
        <p className="page-subtitle">Tóm tắt, tạo câu hỏi, flashcard và checklist ôn thi bằng AI</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {TOOLS.map(tool => {
          const Icon = tool.icon
          const isActive = activeTool === tool.id
          return tool.href ? (
            <Link key={tool.id} href={tool.href}
              className="card-hover p-3 flex flex-col items-center text-center gap-2"
            >
              <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center text-white', tool.color)}>
                <Icon size={16} />
              </div>
              <p className="text-xs font-medium text-slate-700 leading-tight">{tool.label}</p>
            </Link>
          ) : (
            <button key={tool.id}
              onClick={() => { setActiveTool(tool.id as ToolId); setResult(null) }}
              className={cn('p-3 flex flex-col items-center text-center gap-2 rounded-xl border transition-all',
                isActive
                  ? 'bg-blue-50 border-blue-200 shadow-sm'
                  : 'bg-white border-slate-100 hover:shadow-card-hover hover:-translate-y-0.5'
              )}
            >
              <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center text-white', tool.color)}>
                <Icon size={16} />
              </div>
              <p className={cn('text-xs font-medium leading-tight', isActive ? 'text-blue-700' : 'text-slate-700')}>
                {tool.label}
              </p>
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="card p-5">
          <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <span className="text-lg">✏️</span> Nội dung đầu vào
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Chủ đề / Topic *</label>
              <input value={topic} onChange={e => setTopic(e.target.value)}
                placeholder="Vd: Định luật Ohm, Tế bào, Di truyền..."
                className="input"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Lấy từ Notebook</label>
              <select value={fromNotebook} onChange={e => setFromNotebook(e.target.value)} className="input">
                <option value="">— Chọn notebook —</option>
                {NOTEBOOKS.map(nb => (
                  <option key={nb.id} value={nb.id}>{nb.emoji} {nb.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Hoặc dán nội dung trực tiếp</label>
              <textarea value={content} onChange={e => setContent(e.target.value)}
                placeholder="Dán đoạn văn, ghi chú, tài liệu cần xử lý..."
                className="input min-h-32 resize-none" rows={5}
              />
            </div>

            <button onClick={run} disabled={!topic.trim() || loading}
              className={cn('w-full btn-primary flex items-center justify-center gap-2',
                (!topic.trim() || loading) && 'opacity-50 cursor-not-allowed'
              )}
            >
              {loading ? (
                <><Loader2 size={15} className="animate-spin" /> AI đang xử lý...</>
              ) : (
                <><Sparkles size={15} /> Chạy công cụ AI</>
              )}
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <span className="text-lg">🤖</span> Kết quả AI
            </h2>
            {result && (
              <button onClick={copyResult}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors"
              >
                {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                {copied ? 'Đã sao chép' : 'Sao chép'}
              </button>
            )}
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-400">
              <div className="relative">
                <Loader2 size={32} className="animate-spin text-blue-400" />
                <Sparkles size={14} className="absolute -top-1 -right-1 text-amber-400" />
              </div>
              <p className="text-sm">AI đang phân tích và tạo nội dung...</p>
              <p className="text-xs">Vài giây nữa thôi</p>
            </div>
          )}

          {!loading && !result && (
            <div className="flex flex-col items-center justify-center py-16 gap-2 text-slate-300">
              <Sparkles size={40} />
              <p className="text-sm text-slate-400">Kết quả sẽ hiển thị ở đây</p>
              <p className="text-xs text-slate-300">Nhập chủ đề và nhấn "Chạy công cụ AI"</p>
            </div>
          )}

          {/* Summary Result */}
          {!loading && result && activeTool === 'summary' && (
            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line overflow-y-auto max-h-96">
              {result}
            </div>
          )}

          {/* Questions Result */}
          {!loading && result && activeTool === 'questions' && (
            <div className="space-y-2 overflow-y-auto max-h-96">
              {(result as string[]).map((q, i) => (
                <div key={i} className="flex gap-2.5 p-3 bg-violet-50 rounded-lg">
                  <span className="w-5 h-5 rounded-full bg-violet-200 text-violet-700 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <p className="text-sm text-slate-700">{q}</p>
                </div>
              ))}
            </div>
          )}

          {/* Flashcards Result */}
          {!loading && result && activeTool === 'flashcards' && (
            <div className="space-y-2 overflow-y-auto max-h-96">
              <p className="text-xs text-slate-400 mb-3">Click vào thẻ để lật xem đáp án</p>
              {(result as any[]).map((fc, i) => (
                <div key={i}
                  onClick={() => setFlippedCards(prev => {
                    const next = new Set(prev)
                    next.has(i) ? next.delete(i) : next.add(i)
                    return next
                  })}
                  className={cn('p-3 rounded-lg cursor-pointer transition-all border',
                    flippedCards.has(i)
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-blue-50 border-blue-100 hover:border-blue-200'
                  )}
                >
                  {flippedCards.has(i) ? (
                    <p className="text-sm text-emerald-700">💡 {fc.back}</p>
                  ) : (
                    <p className="text-sm text-blue-700 font-medium">❓ {fc.front}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Checklist Result */}
          {!loading && result && activeTool === 'checklist' && (
            <div className="space-y-1.5 overflow-y-auto max-h-96">
              {(result as string[]).map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <input type="checkbox" className="w-4 h-4 accent-blue-600 cursor-pointer" />
                  <span className="text-sm text-slate-700">{item.replace('☐ ', '')}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
