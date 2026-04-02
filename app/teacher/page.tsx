'use client'

import { useState } from 'react'
import { Plus, Eye, Pencil, Trash2, Users, Clock, Globe, Lock } from 'lucide-react'
import { cn, BRANCH_META, GRADE_LABELS } from '@/lib/utils'
import { GAMES } from '@/data/games'
import { TEACHER_PROFILE } from '@/data/progress'
import type { Game, GameType, Grade, SubjectBranch } from '@/types'
import Link from 'next/link'

const GAME_TYPES: { type: GameType; label: string; emoji: string; desc: string }[] = [
  { type: 'quiz',           label: 'Quiz Challenge',      emoji: '🧠', desc: 'Câu hỏi trắc nghiệm có giải thích' },
  { type: 'flashcard-match',label: 'Flashcard Match',     emoji: '🃏', desc: 'Ghép đôi thuật ngữ và định nghĩa' },
  { type: 'drag-drop',      label: 'Drag & Drop',         emoji: '🖱️', desc: 'Kéo thả phân loại đối tượng' },
  { type: 'memory',         label: 'Memory Cards',        emoji: '🎴', desc: 'Lật bài tìm cặp trùng nhau' },
  { type: 'fill-blank',     label: 'Điền chỗ trống',      emoji: '✏️', desc: 'Hoàn thành câu với từ đúng' },
  { type: 'crossword',      label: 'Ô chữ',               emoji: '🔤', desc: 'Giải ô chữ theo gợi ý' },
]

const GRADES: Grade[] = [6, 7, 8, 9]
const BRANCHES: SubjectBranch[] = ['physics', 'chemistry', 'biology', 'environment']

export default function TeacherGameStudioPage() {
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list')
  const [myGames, setMyGames] = useState<Game[]>(GAMES.slice(0, 3))
  const [editingGame, setEditingGame] = useState<Game | null>(null)
  const [previewGame, setPreviewGame] = useState<Game | null>(null)

  // Create form state
  const [form, setForm] = useState({
    title: '', description: '', type: 'quiz' as GameType,
    grade: 8 as Grade, branch: 'physics' as SubjectBranch,
    topic: '', estimatedMinutes: 10,
  })
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctIndex: 0, explanation: '' },
  ])
  const [creating, setCreating] = useState(false)

  function addQuestion() {
    setQuestions(prev => [...prev, { question: '', options: ['', '', '', ''], correctIndex: 0, explanation: '' }])
  }

  function updateQuestion(idx: number, field: string, value: any) {
    setQuestions(prev => prev.map((q, i) => i === idx ? { ...q, [field]: value } : q))
  }

  function updateOption(qIdx: number, optIdx: number, value: string) {
    setQuestions(prev => prev.map((q, i) => {
      if (i !== qIdx) return q
      const opts = [...q.options]; opts[optIdx] = value
      return { ...q, options: opts }
    }))
  }

  function handleCreate() {
    if (!form.title.trim()) return
    setCreating(true)
    setTimeout(() => {
      const builtQuestions = questions.map((q, i) => ({
        id: `q${i}`, type: 'quiz' as const, question: q.question,
        answer: q.options[q.correctIndex] || '', options: q.options,
        correctIndex: q.correctIndex, explanation: q.explanation,
      }))
      if (editingGame) {
        // update existing
        setMyGames(prev => prev.map(g => g.id === editingGame.id
          ? { ...g, ...form, questions: builtQuestions }
          : g
        ))
        setEditingGame(null)
      } else {
        const game: Game = {
          id: `g-${Date.now()}`, ...form,
          emoji: '🎮', color: 'text-blue-600', bgColor: 'bg-blue-50',
          questions: builtQuestions,
          createdBy: 'teacher', teacherName: TEACHER_PROFILE.name,
          playCount: 0, rating: 0, isPublished: false,
          createdAt: new Date().toISOString(),
        }
        setMyGames(prev => [game, ...prev])
      }
      setView('list')
      setCreating(false)
    }, 800)
  }

  function startEdit(game: Game) {
    setEditingGame(game)
    setForm({
      title: game.title, description: game.description, type: game.type,
      grade: game.grade, branch: game.branch, topic: game.topic,
      estimatedMinutes: game.estimatedMinutes,
    })
    setQuestions(game.questions.map(q => ({
      question: q.question,
      options: (q as any).options || [q.answer, '', '', ''],
      correctIndex: (q as any).correctIndex ?? 0,
      explanation: q.explanation,
    })))
    setView('create')
  }

  function togglePublish(gameId: string) {
    setMyGames(prev => prev.map(g => g.id === gameId ? { ...g, isPublished: !g.isPublished } : g))
  }

  if (view === 'create') return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="page-title">{editingGame ? 'Chỉnh sửa Game' : 'Tạo Game mới'}</h1>
          <p className="page-subtitle">Thiết kế trò chơi học tập cho học sinh của bạn</p>
        </div>
        <button onClick={() => { setView('list'); setEditingGame(null) }} className="btn-secondary">← Quay lại</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Config */}
        <div className="space-y-4">
          <div className="card p-4">
            <h3 className="font-semibold text-slate-800 mb-3 text-sm">📝 Thông tin game</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Tiêu đề *</label>
                <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="Vd: Quiz Điện học lớp 8" className="input" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Mô tả</label>
                <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  placeholder="Mô tả ngắn về game..." className="input resize-none" rows={2} />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Chủ đề</label>
                <input value={form.topic} onChange={e => setForm(p => ({ ...p, topic: e.target.value }))}
                  placeholder="Vd: Điện học, Tế bào..." className="input" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Lớp</label>
                  <select value={form.grade}
                    onChange={e => setForm(p => ({ ...p, grade: Number(e.target.value) as Grade }))}
                    className="input"
                  >
                    {GRADES.map(g => <option key={g} value={g}>{GRADE_LABELS[g]}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Thời gian (phút)</label>
                  <input type="number" value={form.estimatedMinutes}
                    onChange={e => setForm(p => ({ ...p, estimatedMinutes: Number(e.target.value) }))}
                    className="input" min={1} max={60}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card p-4">
            <h3 className="font-semibold text-slate-800 mb-3 text-sm">🎮 Loại game</h3>
            <div className="space-y-2">
              {GAME_TYPES.map(gt => (
                <button key={gt.type} onClick={() => setForm(p => ({ ...p, type: gt.type }))}
                  className={cn('w-full flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all',
                    form.type === gt.type
                      ? 'bg-blue-50 border-blue-300'
                      : 'border-slate-100 hover:bg-slate-50'
                  )}
                >
                  <span className="text-xl">{gt.emoji}</span>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{gt.label}</p>
                    <p className="text-[10px] text-slate-400">{gt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-800 text-sm">{questions.length} câu hỏi</h3>
            <button onClick={addQuestion} className="btn-secondary flex items-center gap-1.5 text-xs">
              <Plus size={12} /> Thêm câu
            </button>
          </div>

          {questions.map((q, qIdx) => (
            <div key={qIdx} className="card p-4">
              <p className="text-xs font-semibold text-slate-500 mb-2">Câu {qIdx + 1}</p>
              <textarea value={q.question}
                onChange={e => updateQuestion(qIdx, 'question', e.target.value)}
                placeholder="Nội dung câu hỏi..."
                className="input resize-none mb-3" rows={2}
              />
              <div className="grid grid-cols-2 gap-2 mb-3">
                {q.options.map((opt, optIdx) => (
                  <div key={optIdx} className="relative">
                    <input value={opt}
                      onChange={e => updateOption(qIdx, optIdx, e.target.value)}
                      placeholder={`Lựa chọn ${String.fromCharCode(65 + optIdx)}`}
                      className={cn('input pr-8', q.correctIndex === optIdx && 'border-emerald-400 bg-emerald-50')}
                    />
                    <button
                      onClick={() => updateQuestion(qIdx, 'correctIndex', optIdx)}
                      className={cn('absolute right-2 top-1/2 -translate-y-1/2 text-xs w-5 h-5 rounded-full flex items-center justify-center',
                        q.correctIndex === optIdx ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400 hover:bg-slate-300'
                      )}
                      title="Đánh dấu đáp án đúng"
                    >✓</button>
                  </div>
                ))}
              </div>
              <input value={q.explanation}
                onChange={e => updateQuestion(qIdx, 'explanation', e.target.value)}
                placeholder="Giải thích đáp án..."
                className="input text-xs"
              />
            </div>
          ))}

          <button onClick={handleCreate} disabled={!form.title.trim() || creating}
            className={cn('btn-primary w-full flex items-center justify-center gap-2 py-3',
              (!form.title.trim() || creating) && 'opacity-50 cursor-not-allowed'
            )}
          >
            {creating ? '⏳ Đang lưu...' : editingGame ? '💾 Lưu thay đổi' : '🚀 Tạo và lưu game'}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="page-title">Game Studio</h1>
          <p className="page-subtitle">Tạo và quản lý game học tập KHTN của bạn · {TEACHER_PROFILE.name}</p>
        </div>
        <button onClick={() => setView('create')} className="btn-primary flex items-center gap-1.5">
          <Plus size={14} /> Tạo game mới
        </button>
      </div>

      {/* My games */}
      <h2 className="text-sm font-semibold text-slate-700 mb-3">Game của tôi ({myGames.length})</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {myGames.map(game => {
          const bm = BRANCH_META[game.branch]
          return (
            <div key={game.id} className="card p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-xl', game.bgColor)}>
                  {game.emoji}
                </div>
                <button
                  onClick={() => togglePublish(game.id)}
                  className={cn('badge text-[10px] cursor-pointer transition-colors',
                    game.isPublished ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  )}
                  title={game.isPublished ? 'Click để ẩn khỏi thư viện' : 'Click để publish'}
                >
                  {game.isPublished
                    ? <><Globe size={9} className="inline mr-1" />Published</>
                    : <><Lock size={9} className="inline mr-1" />Draft</>}
                </button>
              </div>
              <h3 className="text-sm font-semibold text-slate-800 mb-1 line-clamp-2">{game.title}</h3>
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className={cn('badge text-[10px]', bm.bg, bm.color)}>{bm.label}</span>
                <span className="badge bg-slate-100 text-slate-500 text-[10px]">{GRADE_LABELS[game.grade]}</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-3">
                <span><Clock size={10} className="inline mr-0.5" />{game.estimatedMinutes}p</span>
                <span>{game.questions.length} câu</span>
                {game.playCount > 0 && <span><Users size={10} className="inline mr-0.5" />{game.playCount.toLocaleString()}</span>}
              </div>
              <div className="flex gap-2 border-t border-slate-50 pt-3">
                <Link href={`/games/${game.id}`} className="btn-secondary flex-1 text-center text-xs py-1.5">
                  <Eye size={12} className="inline mr-1" />Preview
                </Link>
                <button onClick={() => startEdit(game)}
                  className="btn-ghost text-xs py-1.5 px-2 hover:bg-blue-50 hover:text-blue-600"
                  title="Chỉnh sửa game"
                >
                  <Pencil size={12} />
                </button>
                <button onClick={() => setMyGames(prev => prev.filter(g => g.id !== game.id))}
                  className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-slate-300 hover:text-red-400 transition-colors"
                  title="Xóa game"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          )
        })}

        {/* Add card */}
        <button onClick={() => setView('create')}
          className="card border-2 border-dashed border-slate-200 p-4 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-blue-300 hover:text-blue-500 transition-colors min-h-48"
        >
          <Plus size={24} />
          <p className="text-sm font-medium">Tạo game mới</p>
        </button>
      </div>
    </div>
  )
}
