'use client'

import { useState } from 'react'
import { Plus, Eye, Pencil, Trash2, Users, Clock, Globe, Lock, X } from 'lucide-react'
import { cn, BRANCH_META, GRADE_LABELS } from '@/lib/utils'
import { GAMES } from '@/data/games'
import { TEACHER_PROFILE } from '@/data/progress'
import type { Game, GameType, Grade, SubjectBranch } from '@/types'
import Link from 'next/link'

type QuizItem     = { question: string; options: string[]; correctIndex: number; explanation: string }
type FlashItem    = { term: string; definition: string }
type DragItem     = { item: string; category: string }
type MemoryItem   = { front: string; back: string }
type FillItem     = { sentence: string; answer: string; distractors: string; explanation: string }
type CrossItem    = { clue: string; answer: string }

const ITEM_LABEL: Record<GameType, string> = {
  'quiz': 'câu hỏi', 'flashcard-match': 'thẻ', 'drag-drop': 'mục',
  'memory': 'cặp bài', 'fill-blank': 'câu', 'crossword': 'từ',
}

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
  const [quizItems, setQuizItems]   = useState<QuizItem[]>([{ question: '', options: ['', '', '', ''], correctIndex: 0, explanation: '' }])
  const [flashItems, setFlashItems] = useState<FlashItem[]>([{ term: '', definition: '' }])
  const [dragCats, setDragCats]     = useState<string[]>(['Nhóm A', 'Nhóm B'])
  const [dragItems, setDragItems]   = useState<DragItem[]>([{ item: '', category: 'Nhóm A' }])
  const [memItems, setMemItems]     = useState<MemoryItem[]>([{ front: '', back: '' }])
  const [fillItems, setFillItems]   = useState<FillItem[]>([{ sentence: '', answer: '', distractors: '', explanation: '' }])
  const [crossItems, setCrossItems] = useState<CrossItem[]>([{ clue: '', answer: '' }])
  const [creating, setCreating]     = useState(false)

  function currentCount() {
    const map: Record<GameType, number> = {
      'quiz': quizItems.length, 'flashcard-match': flashItems.length,
      'drag-drop': dragItems.length, 'memory': memItems.length,
      'fill-blank': fillItems.length, 'crossword': crossItems.length,
    }
    return map[form.type]
  }

  function addItem() {
    switch (form.type) {
      case 'quiz':           setQuizItems(p  => [...p,  { question: '', options: ['', '', '', ''], correctIndex: 0, explanation: '' }]); break
      case 'flashcard-match':setFlashItems(p => [...p,  { term: '', definition: '' }]); break
      case 'drag-drop':      setDragItems(p  => [...p,  { item: '', category: dragCats[0] || '' }]); break
      case 'memory':         setMemItems(p   => [...p,  { front: '', back: '' }]); break
      case 'fill-blank':     setFillItems(p  => [...p,  { sentence: '', answer: '', distractors: '', explanation: '' }]); break
      case 'crossword':      setCrossItems(p => [...p,  { clue: '', answer: '' }]); break
    }
  }

  function resetItems() {
    setQuizItems([{ question: '', options: ['', '', '', ''], correctIndex: 0, explanation: '' }])
    setFlashItems([{ term: '', definition: '' }])
    setDragCats(['Nhóm A', 'Nhóm B'])
    setDragItems([{ item: '', category: 'Nhóm A' }])
    setMemItems([{ front: '', back: '' }])
    setFillItems([{ sentence: '', answer: '', distractors: '', explanation: '' }])
    setCrossItems([{ clue: '', answer: '' }])
  }

  function handleCreate() {
    if (!form.title.trim()) return
    setCreating(true)
    setTimeout(() => {
      let builtQuestions: any[] = []
      switch (form.type) {
        case 'quiz':
          builtQuestions = quizItems.map((q, i) => ({
            id: `q${i}`, type: 'quiz', question: q.question,
            answer: q.options[q.correctIndex] || '', options: q.options,
            correctIndex: q.correctIndex, explanation: q.explanation,
          })); break
        case 'flashcard-match':
          builtQuestions = flashItems.map((f, i) => ({
            id: `f${i}`, type: 'match', question: f.term, answer: f.definition, explanation: '',
          })); break
        case 'drag-drop':
          builtQuestions = dragItems.map((d, i) => ({
            id: `d${i}`, type: 'match', question: d.item, answer: d.category,
            options: dragCats, explanation: '',
          })); break
        case 'memory':
          builtQuestions = memItems.map((m, i) => ({
            id: `m${i}`, type: 'match', question: m.front, answer: m.back, explanation: '',
          })); break
        case 'fill-blank':
          builtQuestions = fillItems.map((f, i) => ({
            id: `fb${i}`, type: 'fill-blank', question: f.sentence, answer: f.answer,
            options: f.distractors.split(',').map(s => s.trim()).filter(Boolean),
            explanation: f.explanation,
          })); break
        case 'crossword':
          builtQuestions = crossItems.map((c, i) => ({
            id: `cw${i}`, type: 'quiz', question: c.clue, answer: c.answer, explanation: '',
          })); break
      }
      if (editingGame) {
        setMyGames(prev => prev.map(g => g.id === editingGame.id
          ? { ...g, ...form, questions: builtQuestions } : g
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
    // Restore items by type
    if (game.type === 'quiz') {
      setQuizItems(game.questions.map(q => ({
        question: q.question,
        options: (q as any).options || [q.answer, '', '', ''],
        correctIndex: (q as any).correctIndex ?? 0,
        explanation: q.explanation,
      })))
    } else if (game.type === 'flashcard-match' || game.type === 'memory') {
      const setter = game.type === 'flashcard-match' ? setFlashItems : setMemItems
      const key1   = game.type === 'flashcard-match' ? 'term' : 'front'
      const key2   = game.type === 'flashcard-match' ? 'definition' : 'back'
      setter(game.questions.map(q => ({ [key1]: q.question, [key2]: q.answer } as any)))
    } else if (game.type === 'fill-blank') {
      setFillItems(game.questions.map(q => ({
        sentence: q.question, answer: q.answer,
        distractors: (q.options || []).join(', '), explanation: q.explanation,
      })))
    } else if (game.type === 'crossword') {
      setCrossItems(game.questions.map(q => ({ clue: q.question, answer: q.answer })))
    }
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
        <button onClick={() => { setView('list'); setEditingGame(null); resetItems() }} className="btn-secondary">← Quay lại</button>
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
                <button key={gt.type} onClick={() => setForm(p => ({ ...p, type: gt.type as GameType }))}
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

        {/* Items editor — adapts to game type */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-800 text-sm">{currentCount()} {ITEM_LABEL[form.type]}</h3>
            <button onClick={addItem} className="btn-secondary flex items-center gap-1.5 text-xs">
              <Plus size={12} /> Thêm {ITEM_LABEL[form.type]}
            </button>
          </div>

          {/* ── Quiz ── */}
          {form.type === 'quiz' && quizItems.map((q, qi) => (
            <div key={qi} className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-slate-500">Câu {qi + 1}</p>
                {quizItems.length > 1 && (
                  <button onClick={() => setQuizItems(p => p.filter((_, i) => i !== qi))}
                    className="text-slate-300 hover:text-red-400"><Trash2 size={12} /></button>
                )}
              </div>
              <textarea value={q.question}
                onChange={e => setQuizItems(p => p.map((x, i) => i === qi ? { ...x, question: e.target.value } : x))}
                placeholder="Nội dung câu hỏi..." className="input resize-none mb-3" rows={2} />
              <div className="grid grid-cols-2 gap-2 mb-3">
                {q.options.map((opt, oi) => (
                  <div key={oi} className="relative">
                    <input value={opt}
                      onChange={e => setQuizItems(p => p.map((x, i) => {
                        if (i !== qi) return x
                        const opts = [...x.options]; opts[oi] = e.target.value; return { ...x, options: opts }
                      }))}
                      placeholder={`Lựa chọn ${String.fromCharCode(65 + oi)}`}
                      className={cn('input pr-8', q.correctIndex === oi && 'border-emerald-400 bg-emerald-50')}
                    />
                    <button
                      onClick={() => setQuizItems(p => p.map((x, i) => i === qi ? { ...x, correctIndex: oi } : x))}
                      className={cn('absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-xs',
                        q.correctIndex === oi ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400 hover:bg-slate-300'
                      )}
                      title="Đánh dấu đáp án đúng">✓</button>
                  </div>
                ))}
              </div>
              <input value={q.explanation}
                onChange={e => setQuizItems(p => p.map((x, i) => i === qi ? { ...x, explanation: e.target.value } : x))}
                placeholder="Giải thích đáp án..." className="input text-xs" />
            </div>
          ))}

          {/* ── Flashcard Match ── */}
          {form.type === 'flashcard-match' && flashItems.map((f, fi) => (
            <div key={fi} className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-slate-500">🃏 Thẻ {fi + 1}</p>
                {flashItems.length > 1 && (
                  <button onClick={() => setFlashItems(p => p.filter((_, i) => i !== fi))}
                    className="text-slate-300 hover:text-red-400"><Trash2 size={12} /></button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-500 mb-1 block font-medium">Mặt trước – Thuật ngữ</label>
                  <textarea value={f.term}
                    onChange={e => setFlashItems(p => p.map((x, i) => i === fi ? { ...x, term: e.target.value } : x))}
                    placeholder="Vd: Tế bào nhân thực" className="input resize-none" rows={3} />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block font-medium">Mặt sau – Định nghĩa</label>
                  <textarea value={f.definition}
                    onChange={e => setFlashItems(p => p.map((x, i) => i === fi ? { ...x, definition: e.target.value } : x))}
                    placeholder="Vd: Tế bào có nhân hoàn chỉnh, được bao bọc bởi màng nhân..." className="input resize-none" rows={3} />
                </div>
              </div>
            </div>
          ))}

          {/* ── Drag & Drop ── */}
          {form.type === 'drag-drop' && (
            <>
              <div className="card p-3 bg-slate-50 border border-dashed border-slate-200">
                <p className="text-xs font-semibold text-slate-600 mb-2">📂 Danh mục phân loại</p>
                <div className="flex flex-wrap gap-2">
                  {dragCats.map((cat, ci) => (
                    <div key={ci} className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1">
                      <input value={cat}
                        onChange={e => setDragCats(p => p.map((c, i) => i === ci ? e.target.value : c))}
                        className="text-xs border-0 outline-none bg-transparent w-20" />
                      {dragCats.length > 2 && (
                        <button onClick={() => setDragCats(p => p.filter((_, i) => i !== ci))}
                          className="text-slate-300 hover:text-red-400"><X size={10} /></button>
                      )}
                    </div>
                  ))}
                  <button onClick={() => setDragCats(p => [...p, `Nhóm ${p.length + 1}`])}
                    className="text-xs text-blue-500 border border-dashed border-blue-200 px-2 py-1 rounded-lg hover:bg-blue-50">
                    + Thêm nhóm
                  </button>
                </div>
              </div>
              {dragItems.map((d, di) => (
                <div key={di} className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-slate-500">Mục {di + 1}</p>
                    {dragItems.length > 1 && (
                      <button onClick={() => setDragItems(p => p.filter((_, i) => i !== di))}
                        className="text-slate-300 hover:text-red-400"><Trash2 size={12} /></button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-500 mb-1 block font-medium">Tên mục</label>
                      <input value={d.item}
                        onChange={e => setDragItems(p => p.map((x, i) => i === di ? { ...x, item: e.target.value } : x))}
                        placeholder="Vd: Lá cây" className="input" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 mb-1 block font-medium">Thuộc nhóm</label>
                      <select value={d.category}
                        onChange={e => setDragItems(p => p.map((x, i) => i === di ? { ...x, category: e.target.value } : x))}
                        className="input">
                        {dragCats.map((cat, ci) => <option key={ci} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* ── Memory Cards ── */}
          {form.type === 'memory' && memItems.map((m, mi) => (
            <div key={mi} className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-slate-500">🎴 Cặp {mi + 1}</p>
                {memItems.length > 1 && (
                  <button onClick={() => setMemItems(p => p.filter((_, i) => i !== mi))}
                    className="text-slate-300 hover:text-red-400"><Trash2 size={12} /></button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-500 mb-1 block font-medium">Bài A</label>
                  <input value={m.front}
                    onChange={e => setMemItems(p => p.map((x, i) => i === mi ? { ...x, front: e.target.value } : x))}
                    placeholder="Vd: Quang hợp" className="input" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block font-medium">Bài B (ghép cặp)</label>
                  <input value={m.back}
                    onChange={e => setMemItems(p => p.map((x, i) => i === mi ? { ...x, back: e.target.value } : x))}
                    placeholder="Vd: 6CO₂ + 6H₂O → Glucôzơ + O₂" className="input" />
                </div>
              </div>
            </div>
          ))}

          {/* ── Điền chỗ trống ── */}
          {form.type === 'fill-blank' && fillItems.map((f, fi) => (
            <div key={fi} className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-slate-500">Câu {fi + 1}</p>
                {fillItems.length > 1 && (
                  <button onClick={() => setFillItems(p => p.filter((_, i) => i !== fi))}
                    className="text-slate-300 hover:text-red-400"><Trash2 size={12} /></button>
                )}
              </div>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-slate-500 mb-1 block font-medium">
                    Câu có chỗ trống <span className="text-blue-500 font-normal">(dùng ___ để đánh dấu vị trí)</span>
                  </label>
                  <input value={f.sentence}
                    onChange={e => setFillItems(p => p.map((x, i) => i === fi ? { ...x, sentence: e.target.value } : x))}
                    placeholder="Vd: Cường độ dòng điện I = U / ___" className="input" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block font-medium">Đáp án đúng</label>
                    <input value={f.answer}
                      onChange={e => setFillItems(p => p.map((x, i) => i === fi ? { ...x, answer: e.target.value } : x))}
                      placeholder="Vd: R" className="input" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block font-medium">Phương án nhiễu (cách nhau bởi dấu ,)</label>
                    <input value={f.distractors}
                      onChange={e => setFillItems(p => p.map((x, i) => i === fi ? { ...x, distractors: e.target.value } : x))}
                      placeholder="Vd: U, I, P" className="input" />
                  </div>
                </div>
                <input value={f.explanation}
                  onChange={e => setFillItems(p => p.map((x, i) => i === fi ? { ...x, explanation: e.target.value } : x))}
                  placeholder="Giải thích đáp án..." className="input text-xs" />
              </div>
            </div>
          ))}

          {/* ── Ô chữ ── */}
          {form.type === 'crossword' && crossItems.map((c, ci) => (
            <div key={ci} className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-slate-500">🔤 Từ {ci + 1} — {c.answer.length > 0 ? `${c.answer.length} ký tự` : 'chưa nhập'}</p>
                {crossItems.length > 1 && (
                  <button onClick={() => setCrossItems(p => p.filter((_, i) => i !== ci))}
                    className="text-slate-300 hover:text-red-400"><Trash2 size={12} /></button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-500 mb-1 block font-medium">Gợi ý / Định nghĩa</label>
                  <textarea value={c.clue}
                    onChange={e => setCrossItems(p => p.map((x, i) => i === ci ? { ...x, clue: e.target.value } : x))}
                    placeholder="Vd: Đơn vị đo cường độ dòng điện" className="input resize-none" rows={2} />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block font-medium">Đáp án (không dấu, in hoa)</label>
                  <input value={c.answer}
                    onChange={e => setCrossItems(p => p.map((x, i) => i === ci ? { ...x, answer: e.target.value.toUpperCase().replace(/[^A-Z]/g, '') } : x))}
                    placeholder="Vd: AMPE" className="input font-mono tracking-widest" />
                  {c.answer && (
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {c.answer.split('').map((ch, idx) => (
                        <span key={idx} className="w-6 h-6 border border-slate-300 rounded flex items-center justify-center text-xs font-bold text-slate-600 bg-slate-50">{ch}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
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
