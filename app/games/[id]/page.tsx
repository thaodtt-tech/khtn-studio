'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, CheckCircle, XCircle, Trophy, RefreshCw, ChevronRight, Shuffle } from 'lucide-react'
import { cn, BRANCH_META, GRADE_LABELS } from '@/lib/utils'
import { getGameById } from '@/data/games'
import type { GameQuestion } from '@/types'

type GameState = 'intro' | 'playing' | 'finished'

// ─── QUIZ ENGINE ─────────────────────────────────────────────────────────────
function QuizEngine({
  questions, onFinish,
}: { questions: any[]; onFinish: (score: number, answers: number[]) => void }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [showExp, setShowExp] = useState(false)
  const q = questions[currentQ]
  const score = answers.filter((a, i) => a === questions[i].correctIndex).length

  function pick(idx: number) {
    if (selected !== null) return
    setSelected(idx)
    setShowExp(true)
    setAnswers(p => [...p, idx])
  }

  function next() {
    if (currentQ < questions.length - 1) {
      setCurrentQ(p => p + 1); setSelected(null); setShowExp(false)
    } else {
      onFinish(score + (selected === q.correctIndex ? 1 : 0) - (selected === q.correctIndex ? 1 : 0),
        [...answers])
      // recalc properly
      const finalAnswers = [...answers]
      const finalScore = finalAnswers.filter((a, i) => a === questions[i].correctIndex).length
      onFinish(finalScore, finalAnswers)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-sm text-slate-500">{currentQ + 1}/{questions.length}</span>
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${((currentQ) / questions.length) * 100}%` }} />
        </div>
        <span className="text-sm font-semibold text-slate-700">{score} đúng</span>
      </div>
      <div className="card p-6">
        <p className="text-xs text-slate-400 mb-2">Câu {currentQ + 1}</p>
        <h2 className="text-base font-semibold text-slate-900 leading-relaxed mb-5">{q.question}</h2>
        <div className="space-y-2.5 mb-4">
          {q.options?.map((opt: string, idx: number) => {
            const isSelected = selected === idx
            const isCorrect = idx === q.correctIndex
            const shown = selected !== null
            return (
              <button key={idx} onClick={() => pick(idx)} disabled={shown}
                className={cn('w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all',
                  !shown && 'hover:bg-blue-50 hover:border-blue-300 border-slate-200 bg-white',
                  shown && isCorrect && 'bg-emerald-50 border-emerald-400 text-emerald-700',
                  shown && isSelected && !isCorrect && 'bg-red-50 border-red-400 text-red-700',
                  shown && !isSelected && !isCorrect && 'border-slate-100 text-slate-400 bg-slate-50',
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {shown && isCorrect && <CheckCircle size={15} className="text-emerald-500 shrink-0" />}
                  {shown && isSelected && !isCorrect && <XCircle size={15} className="text-red-500 shrink-0" />}
                </div>
              </button>
            )
          })}
        </div>
        {showExp && q.explanation && (
          <div className="p-3 bg-blue-50 rounded-xl text-sm text-blue-800 mb-4">
            💡 <strong>Giải thích:</strong> {q.explanation}
          </div>
        )}
        {selected !== null && (
          <button onClick={next} className="btn-primary w-full flex items-center justify-center gap-2">
            {currentQ < questions.length - 1
              ? <><ChevronRight size={16} /> Câu tiếp theo</>
              : <><Trophy size={16} /> Xem kết quả</>}
          </button>
        )}
      </div>
    </div>
  )
}

// ─── FILL BLANK ENGINE ────────────────────────────────────────────────────────
function FillBlankEngine({
  questions, onFinish,
}: { questions: any[]; onFinish: (score: number, answers: number[]) => void }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [input, setInput] = useState('')
  const [result, setResult] = useState<null | 'correct' | 'wrong'>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const q = questions[currentQ]

  function check() {
    if (!input.trim()) return
    const correct = input.trim().toLowerCase() === (q.answer || '').toLowerCase()
    setResult(correct ? 'correct' : 'wrong')
    setAnswers(p => [...p, correct ? 0 : -1])
  }

  function next() {
    if (currentQ < questions.length - 1) {
      setCurrentQ(p => p + 1); setInput(''); setResult(null)
    } else {
      const finalAnswers = [...answers]
      onFinish(finalAnswers.filter(a => a === 0).length, finalAnswers)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-sm text-slate-500">{currentQ + 1}/{questions.length}</span>
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-amber-500 rounded-full transition-all"
            style={{ width: `${(currentQ / questions.length) * 100}%` }} />
        </div>
      </div>
      <div className="card p-6">
        <p className="text-xs text-slate-400 mb-2">Câu {currentQ + 1}</p>
        <p className="text-base font-semibold text-slate-900 leading-relaxed mb-5">{q.question}</p>
        <div className="flex gap-2 mb-3">
          <input value={input} onChange={e => setInput(e.target.value)}
            disabled={result !== null}
            onKeyDown={e => e.key === 'Enter' && result === null && check()}
            placeholder="Nhập câu trả lời của bạn..."
            className={cn('input flex-1', result && 'opacity-80')}
            autoFocus
          />
          {result === null && (
            <button onClick={check} className="btn-primary px-5">Kiểm tra</button>
          )}
        </div>
        {result && (
          <div className={cn('p-3 rounded-xl text-sm font-medium mb-4',
            result === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
          )}>
            {result === 'correct'
              ? `✅ Chính xác! Đáp án: "${q.answer}"`
              : `❌ Chưa đúng. Đáp án đúng: "${q.answer}"`}
            {q.explanation && <p className="mt-1 text-sm opacity-80">💡 {q.explanation}</p>}
          </div>
        )}
        {result !== null && (
          <button onClick={next} className="btn-primary w-full flex items-center justify-center gap-2">
            {currentQ < questions.length - 1
              ? <><ChevronRight size={16} /> Câu tiếp theo</>
              : <><Trophy size={16} /> Xem kết quả</>}
          </button>
        )}
      </div>
    </div>
  )
}

// ─── FLASHCARD MATCH ENGINE ───────────────────────────────────────────────────
function FlashcardMatchEngine({
  questions, onFinish,
}: { questions: any[]; onFinish: (score: number, answers: number[]) => void }) {
  // Two columns: left = questions (shuffled), right = answers (shuffled)
  const [leftItems] = useState(() => questions.map((q, i) => ({ id: i, text: q.question })))
  const [rightItems] = useState(() => {
    const items = questions.map((q, i) => ({ id: i, text: q.answer }))
    return [...items].sort(() => Math.random() - 0.5)
  })
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null)
  const [selectedRight, setSelectedRight] = useState<number | null>(null)
  const [matched, setMatched] = useState<Set<number>>(new Set())
  const [wrong, setWrong] = useState<{ l: number; r: number } | null>(null)
  const [errors, setErrors] = useState(0)

  useEffect(() => {
    if (selectedLeft === null || selectedRight === null) return
    if (selectedLeft === selectedRight) {
      // correct match
      setMatched(prev => { const s = new Set(prev); s.add(selectedLeft!); return s })
      setSelectedLeft(null); setSelectedRight(null)
      if (matched.size + 1 === questions.length) {
        setTimeout(() => onFinish(questions.length - errors, []), 600)
      }
    } else {
      // wrong
      setWrong({ l: selectedLeft, r: selectedRight })
      setErrors(e => e + 1)
      setTimeout(() => {
        setSelectedLeft(null); setSelectedRight(null); setWrong(null)
      }, 900)
    }
  }, [selectedLeft, selectedRight])

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-5 text-sm text-slate-500">
        <span>Ghép đôi: {matched.size}/{questions.length} cặp đúng</span>
        <span className="text-red-500">❌ Sai: {errors} lần</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* Left: terms */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Thuật ngữ</p>
          {leftItems.map(item => {
            const isMatched = matched.has(item.id)
            const isSelected = selectedLeft === item.id
            const isWrong = wrong?.l === item.id
            return (
              <button key={item.id} onClick={() => !isMatched && setSelectedLeft(item.id)}
                disabled={isMatched}
                className={cn('w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all',
                  isMatched && 'bg-emerald-50 border-emerald-300 text-emerald-700 opacity-60',
                  !isMatched && isSelected && 'bg-blue-100 border-blue-400 text-blue-700 ring-2 ring-blue-300',
                  !isMatched && isWrong && 'bg-red-50 border-red-400 text-red-600',
                  !isMatched && !isSelected && !isWrong && 'bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50',
                )}
              >
                {isMatched ? '✅ ' : ''}{item.text}
              </button>
            )
          })}
        </div>
        {/* Right: definitions */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Định nghĩa</p>
          {rightItems.map(item => {
            const isMatched = matched.has(item.id)
            const isSelected = selectedRight === item.id
            const isWrong = wrong?.r === item.id
            return (
              <button key={item.id} onClick={() => !isMatched && setSelectedRight(item.id)}
                disabled={isMatched}
                className={cn('w-full text-left px-4 py-3 rounded-xl border text-sm transition-all',
                  isMatched && 'bg-emerald-50 border-emerald-300 text-emerald-700 opacity-60',
                  !isMatched && isSelected && 'bg-violet-100 border-violet-400 text-violet-700 ring-2 ring-violet-300',
                  !isMatched && isWrong && 'bg-red-50 border-red-400 text-red-600',
                  !isMatched && !isSelected && !isWrong && 'bg-white border-slate-200 hover:border-violet-300 hover:bg-violet-50',
                )}
              >
                {isMatched ? '✅ ' : ''}{item.text}
              </button>
            )
          })}
        </div>
      </div>
      <p className="text-center text-xs text-slate-400 mt-4">
        Click một thuật ngữ bên trái → rồi click định nghĩa tương ứng bên phải
      </p>
    </div>
  )
}

// ─── MEMORY CARDS ENGINE ──────────────────────────────────────────────────────
type MemoryCard = { id: number; pairId: number; text: string; side: 'term' | 'def'; flipped: boolean; matched: boolean }

function MemoryEngine({
  questions, onFinish,
}: { questions: any[]; onFinish: (score: number, answers: number[]) => void }) {
  const [cards, setCards] = useState<MemoryCard[]>(() => {
    const deck: MemoryCard[] = []
    questions.forEach((q, i) => {
      deck.push({ id: i * 2,     pairId: i, text: q.question, side: 'term', flipped: false, matched: false })
      deck.push({ id: i * 2 + 1, pairId: i, text: q.answer,   side: 'def',  flipped: false, matched: false })
    })
    return deck.sort(() => Math.random() - 0.5)
  })
  const [flippedIds, setFlippedIds] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [locked, setLocked] = useState(false)
  const matchedCount = cards.filter(c => c.matched).length / 2

  function flip(cardId: number) {
    if (locked) return
    const card = cards.find(c => c.id === cardId)
    if (!card || card.flipped || card.matched) return
    const newFlipped = [...flippedIds, cardId]
    setCards(prev => prev.map(c => c.id === cardId ? { ...c, flipped: true } : c))
    setFlippedIds(newFlipped)

    if (newFlipped.length === 2) {
      setLocked(true)
      setMoves(m => m + 1)
      const [a, b] = newFlipped.map(id => cards.find(c => c.id === id)!)
      if (a.pairId === b.pairId) {
        // match
        setCards(prev => prev.map(c => newFlipped.includes(c.id) ? { ...c, matched: true } : c))
        setFlippedIds([])
        setLocked(false)
        if (matchedCount + 1 === questions.length) {
          setTimeout(() => onFinish(questions.length, []), 500)
        }
      } else {
        // no match — flip back
        setTimeout(() => {
          setCards(prev => prev.map(c => newFlipped.includes(c.id) ? { ...c, flipped: false } : c))
          setFlippedIds([])
          setLocked(false)
        }, 1000)
      }
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-5 text-sm text-slate-500">
        <span>✅ Đã ghép: {matchedCount}/{questions.length} cặp</span>
        <span>🎯 Số lần lật: {moves}</span>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {cards.map(card => (
          <button key={card.id} onClick={() => flip(card.id)}
            className={cn(
              'aspect-square rounded-xl border-2 text-sm font-medium transition-all duration-300 p-2 flex items-center justify-center text-center leading-tight',
              card.matched && 'bg-emerald-50 border-emerald-300 text-emerald-700',
              card.flipped && !card.matched && (card.side === 'term'
                ? 'bg-blue-50 border-blue-400 text-blue-800'
                : 'bg-violet-50 border-violet-400 text-violet-800'),
              !card.flipped && !card.matched && 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-400',
            )}
          >
            {card.flipped || card.matched ? card.text : '?'}
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-slate-400 mt-4">Lật 2 thẻ để tìm cặp trùng nhau (thuật ngữ ↔ định nghĩa)</p>
    </div>
  )
}

// ─── DRAG & DROP ENGINE ───────────────────────────────────────────────────────
function DragDropEngine({
  questions, onFinish,
}: { questions: any[]; onFinish: (score: number, answers: number[]) => void }) {
  const categories = [...new Set(questions.map((q: any) => q.answer))]
  const [items] = useState(() => questions.map((q, i) => ({
    id: i, text: q.question, correct: q.answer, placed: null as string | null
  })).sort(() => Math.random() - 0.5))
  const [placements, setPlacements] = useState<Record<number, string>>({})
  const [dragId, setDragId] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  function drop(category: string) {
    if (dragId === null) return
    setPlacements(prev => ({ ...prev, [dragId]: category }))
    setDragId(null)
  }

  function removeFromCategory(itemId: number) {
    if (submitted) return
    setPlacements(prev => { const n = { ...prev }; delete n[itemId]; return n })
  }

  function submit() {
    setSubmitted(true)
    const score = items.filter(item => placements[item.id] === item.correct).length
    setTimeout(() => onFinish(score, items.map(item => placements[item.id] === item.correct ? 0 : -1)), 1500)
  }

  const unplaced = items.filter(item => placements[item.id] === undefined)

  return (
    <div className="max-w-3xl mx-auto">
      {/* Unplaced items */}
      <div className="card p-4 mb-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Kéo thả vào đúng nhóm</p>
        <div className="flex flex-wrap gap-2 min-h-12">
          {unplaced.map(item => (
            <div key={item.id}
              draggable
              onDragStart={() => setDragId(item.id)}
              className="px-3 py-2 bg-blue-50 border border-blue-200 text-blue-800 text-sm rounded-xl cursor-grab active:cursor-grabbing font-medium select-none hover:bg-blue-100 transition-colors"
            >
              {item.text}
            </div>
          ))}
          {unplaced.length === 0 && <p className="text-xs text-slate-400 self-center">Tất cả đã được xếp loại ✓</p>}
        </div>
      </div>

      {/* Drop zones */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        {categories.map(cat => {
          const placedHere = items.filter(item => placements[item.id] === cat)
          return (
            <div key={cat}
              onDragOver={e => e.preventDefault()}
              onDrop={() => drop(cat)}
              className="card p-3 min-h-28 border-2 border-dashed border-slate-200 hover:border-blue-300 transition-colors"
            >
              <p className="text-xs font-bold text-slate-700 mb-2 text-center">{cat}</p>
              <div className="flex flex-wrap gap-1.5">
                {placedHere.map(item => {
                  const isCorrect = submitted && item.correct === cat
                  const isWrong = submitted && item.correct !== cat
                  return (
                    <div key={item.id}
                      onClick={() => removeFromCategory(item.id)}
                      className={cn('px-2 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors',
                        isCorrect ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' :
                          isWrong ? 'bg-red-100 text-red-700 border border-red-300' :
                            'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700'
                      )}
                    >
                      {isCorrect && '✅ '}{isWrong && '❌ '}{item.text}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {unplaced.length === 0 && !submitted && (
        <button onClick={submit} className="btn-primary w-full py-3 flex items-center justify-center gap-2">
          <CheckCircle size={16} /> Nộp kết quả
        </button>
      )}
      {submitted && (
        <div className="card p-4 text-center text-sm text-slate-500">
          ⏳ Đang tính điểm...
        </div>
      )}
      <p className="text-center text-xs text-slate-400 mt-3">
        Kéo thả từng mục vào nhóm đúng. Click vào mục đã xếp để đưa trở lại.
      </p>
    </div>
  )
}

// ─── RESULT SCREEN ────────────────────────────────────────────────────────────
function ResultScreen({ score, total, onReset }: { score: number; total: number; onReset: () => void }) {
  const pct = Math.round((score / total) * 100)
  const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : 1
  const msgs = ['Cần cố gắng thêm! 💪', 'Làm tốt! Hãy ôn lại phần sai. 👍', 'Xuất sắc! Bạn nắm vững kiến thức này! 🏆']
  return (
    <div className="max-w-md mx-auto">
      <div className="card p-8 text-center">
        <div className="text-5xl mb-3">{'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}</div>
        <p className="text-3xl font-black text-blue-600 mb-1">{pct}%</p>
        <p className="text-lg font-bold text-slate-800 mb-1">{score}/{total} câu đúng</p>
        <p className="text-sm text-slate-500 mb-7">{msgs[stars - 1]}</p>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-7">
          <div className={cn('h-full rounded-full transition-all duration-1000',
            pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-400'
          )} style={{ width: `${pct}%` }} />
        </div>
        <div className="flex gap-3">
          <button onClick={onReset} className="btn-secondary flex-1 flex items-center justify-center gap-2">
            <RefreshCw size={14} /> Chơi lại
          </button>
          <Link href="/games" className="btn-primary flex-1 flex items-center justify-center gap-2">
            <Trophy size={14} /> Game khác
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function GamePlayPage() {
  const { id } = useParams<{ id: string }>()
  const game = getGameById(id)
  const [gameState, setGameState] = useState<GameState>('intro')
  const [result, setResult] = useState<{ score: number; answers: number[] } | null>(null)

  if (!game) return (
    <div className="text-center py-20">
      <p className="text-slate-400">Không tìm thấy game này.</p>
      <Link href="/games" className="text-blue-600 text-sm mt-2 inline-block hover:underline">← Quay lại</Link>
    </div>
  )

  const bm = BRANCH_META[game.branch]

  function handleFinish(score: number, answers: number[]) {
    setResult({ score, answers })
    setGameState('finished')
  }

  function reset() {
    setGameState('intro')
    setResult(null)
  }

  // ── Intro
  if (gameState === 'intro') return (
    <div>
      <Link href="/games" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-6">
        <ArrowLeft size={14} /> Thư viện game
      </Link>
      <div className="max-w-lg mx-auto">
        <div className="card p-8 text-center">
          <div className={cn('w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4', game.bgColor)}>
            {game.emoji}
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">{game.title}</h1>
          <p className="text-sm text-slate-500 mb-4">{game.description}</p>
          <div className="flex justify-center gap-2 flex-wrap mb-6">
            <span className={cn('badge text-xs', bm.bg, bm.color)}>{bm.emoji} {bm.label}</span>
            <span className="badge bg-slate-100 text-slate-600 text-xs">{GRADE_LABELS[game.grade]}</span>
            <span className="badge bg-slate-100 text-slate-600 text-xs">⭐ {game.rating}</span>
            <span className="badge bg-blue-100 text-blue-700 text-xs">
              {game.type === 'quiz' ? '🧠 Quiz' :
               game.type === 'flashcard-match' ? '🃏 Ghép đôi' :
               game.type === 'memory' ? '🎴 Memory' :
               game.type === 'drag-drop' ? '🖱️ Drag & Drop' :
               game.type === 'fill-blank' ? '✏️ Điền chỗ trống' : '🎮 Game'}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Câu hỏi', value: game.questions.length },
              { label: 'Thời gian', value: `~${game.estimatedMinutes}p` },
              { label: 'Lượt chơi', value: game.playCount.toLocaleString() },
            ].map(s => (
              <div key={s.label} className="bg-slate-50 rounded-xl p-3">
                <p className="text-xl font-bold text-slate-800">{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
          {game.teacherName && <p className="text-xs text-slate-400 mb-4">Tạo bởi {game.teacherName}</p>}
          <button onClick={() => setGameState('playing')} className="btn-primary w-full py-3 text-base">
            Bắt đầu chơi →
          </button>
        </div>
      </div>
    </div>
  )

  // ── Finished
  if (gameState === 'finished' && result) return (
    <div>
      <Link href="/games" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-6">
        <ArrowLeft size={14} /> Thư viện game
      </Link>
      <ResultScreen score={result.score} total={game.questions.length} onReset={reset} />
    </div>
  )

  // ── Playing — route to correct engine
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button onClick={reset} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800">
          <ArrowLeft size={14} /> Thoát
        </button>
        <span className="text-sm font-medium text-slate-600">{game.title}</span>
        <div className="w-20" />
      </div>

      {game.type === 'quiz' && (
        <QuizEngine questions={game.questions} onFinish={handleFinish} />
      )}
      {game.type === 'fill-blank' && (
        <FillBlankEngine questions={game.questions} onFinish={handleFinish} />
      )}
      {game.type === 'flashcard-match' && (
        <FlashcardMatchEngine questions={game.questions} onFinish={handleFinish} />
      )}
      {game.type === 'memory' && (
        <MemoryEngine questions={game.questions} onFinish={handleFinish} />
      )}
      {game.type === 'drag-drop' && (
        <DragDropEngine questions={game.questions} onFinish={handleFinish} />
      )}
    </div>
  )
}
