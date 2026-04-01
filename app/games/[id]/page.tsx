'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, CheckCircle, XCircle, Trophy, RefreshCw, ChevronRight } from 'lucide-react'
import { cn, BRANCH_META, GRADE_LABELS } from '@/lib/utils'
import { getGameById } from '@/data/games'
import type { GameQuestion } from '@/types'

type GameState = 'intro' | 'playing' | 'finished'

export default function GamePlayPage() {
  const { id } = useParams<{ id: string }>()
  const game = getGameById(id)

  const [gameState, setGameState] = useState<GameState>('intro')
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [showExplanation, setShowExplanation] = useState(false)
  const [fillInput, setFillInput] = useState('')

  if (!game) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">Không tìm thấy game này.</p>
        <Link href="/games" className="text-blue-600 text-sm mt-2 inline-block hover:underline">← Quay lại</Link>
      </div>
    )
  }

  const bm = BRANCH_META[game.branch]
  const questions = game.questions
  const q = questions[currentQ] as GameQuestion & { options?: string[]; correctIndex?: number }

  const score = answers.filter((a, i) => {
    const qi = questions[i] as any
    return a !== null && a === qi.correctIndex
  }).length

  function handleAnswer(idx: number) {
    if (selected !== null) return
    setSelected(idx)
    setShowExplanation(true)
    const newAnswers = [...answers]
    newAnswers[currentQ] = idx
    setAnswers(newAnswers)
  }

  function next() {
    if (currentQ < questions.length - 1) {
      setCurrentQ(p => p + 1)
      setSelected(null)
      setShowExplanation(false)
      setFillInput('')
    } else {
      setGameState('finished')
    }
  }

  function reset() {
    setGameState('intro')
    setCurrentQ(0)
    setSelected(null)
    setAnswers([])
    setShowExplanation(false)
    setFillInput('')
  }

  function handleFillSubmit() {
    if (!fillInput.trim()) return
    const correct = fillInput.trim().toLowerCase() === q.answer?.toLowerCase()
    setSelected(correct ? (q.correctIndex ?? 0) : -1)
    setShowExplanation(true)
    const newAnswers = [...answers]
    newAnswers[currentQ] = correct ? 0 : -1
    setAnswers(newAnswers)
  }

  // ── Intro ────────────────────────────────────────────────────────────────
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
          <div className="flex justify-center gap-3 mb-6">
            <span className={cn('badge text-xs', bm.bg, bm.color)}>{bm.emoji} {bm.label}</span>
            <span className="badge bg-slate-100 text-slate-600 text-xs">{GRADE_LABELS[game.grade]}</span>
            <span className="badge bg-slate-100 text-slate-600 text-xs">⭐ {game.rating}</span>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6 text-center">
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-xl font-bold text-slate-800">{questions.length}</p>
              <p className="text-xs text-slate-500">Câu hỏi</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-xl font-bold text-slate-800">~{game.estimatedMinutes}p</p>
              <p className="text-xs text-slate-500">Thời gian</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-xl font-bold text-slate-800">{game.playCount.toLocaleString()}</p>
              <p className="text-xs text-slate-500">Lượt chơi</p>
            </div>
          </div>
          {game.teacherName && (
            <p className="text-xs text-slate-400 mb-5">Tạo bởi {game.teacherName}</p>
          )}
          <button onClick={() => setGameState('playing')} className="btn-primary w-full text-base py-3">
            Bắt đầu chơi →
          </button>
        </div>
      </div>
    </div>
  )

  // ── Playing ───────────────────────────────────────────────────────────────
  if (gameState === 'playing') return (
    <div>
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm text-slate-500">{currentQ + 1}/{questions.length}</span>
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-slate-700">{score} đúng</span>
        </div>

        <div className="card p-6">
          {/* Question */}
          <div className="mb-6">
            <span className="text-xs text-slate-400 mb-2 block">Câu {currentQ + 1}</span>
            <h2 className="text-base font-semibold text-slate-900 leading-relaxed">{q.question}</h2>
          </div>

          {/* Quiz / Drag-drop options */}
          {(q.type === 'quiz' || q.type === undefined) && q.options && (
            <div className="space-y-2.5 mb-4">
              {q.options.map((opt, idx) => {
                const isSelected = selected === idx
                const isCorrect = idx === q.correctIndex
                const showResult = selected !== null
                return (
                  <button key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={selected !== null}
                    className={cn(
                      'w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all',
                      !showResult && 'hover:bg-blue-50 hover:border-blue-300 border-slate-200 bg-white',
                      showResult && isCorrect && 'bg-emerald-50 border-emerald-400 text-emerald-700',
                      showResult && isSelected && !isCorrect && 'bg-red-50 border-red-400 text-red-700',
                      showResult && !isSelected && !isCorrect && 'border-slate-100 text-slate-400 bg-slate-50',
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0
                        border-current"
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                      {showResult && isCorrect && <CheckCircle size={16} className="ml-auto text-emerald-500" />}
                      {showResult && isSelected && !isCorrect && <XCircle size={16} className="ml-auto text-red-500" />}
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {/* Fill blank */}
          {q.type === 'fill-blank' && (
            <div className="mb-4">
              <div className="flex gap-2">
                <input
                  value={fillInput}
                  onChange={e => setFillInput(e.target.value)}
                  disabled={selected !== null}
                  onKeyDown={e => e.key === 'Enter' && handleFillSubmit()}
                  placeholder="Nhập câu trả lời của bạn..."
                  className={cn('input flex-1', selected !== null && 'opacity-70')}
                />
                {selected === null && (
                  <button onClick={handleFillSubmit} className="btn-primary px-4">Kiểm tra</button>
                )}
              </div>
              {selected !== null && (
                <div className={cn('mt-2 p-3 rounded-lg text-sm font-medium',
                  selected === 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                )}>
                  {selected === 0
                    ? `✅ Chính xác! Đáp án: "${q.answer}"`
                    : `❌ Chưa đúng. Đáp án đúng là: "${q.answer}"`
                  }
                </div>
              )}
            </div>
          )}

          {/* Match type */}
          {q.type === 'match' && (
            <div className="mb-4 space-y-2.5">
              {[q.answer, 'Lựa chọn khác A', 'Lựa chọn khác B', 'Lựa chọn khác C'].map((opt, idx) => (
                <button key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={selected !== null}
                  className={cn(
                    'w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all',
                    selected === null ? 'hover:bg-blue-50 hover:border-blue-300 border-slate-200 bg-white' :
                      idx === 0 ? 'bg-emerald-50 border-emerald-400 text-emerald-700' :
                        selected === idx ? 'bg-red-50 border-red-400 text-red-700' :
                          'border-slate-100 text-slate-400 bg-slate-50'
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Explanation */}
          {showExplanation && q.explanation && (
            <div className="p-3 bg-blue-50 rounded-xl text-sm text-blue-800 mb-4">
              💡 <strong>Giải thích:</strong> {q.explanation}
            </div>
          )}

          {/* Next */}
          {selected !== null && (
            <button onClick={next} className="btn-primary w-full flex items-center justify-center gap-2">
              {currentQ < questions.length - 1 ? (
                <><ChevronRight size={16} /> Câu tiếp theo</>
              ) : (
                <><Trophy size={16} /> Xem kết quả</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )

  // ── Finished ──────────────────────────────────────────────────────────────
  const pct = Math.round((score / questions.length) * 100)
  const stars = pct >= 80 ? 3 : pct >= 60 ? 2 : 1
  const messages = ['Cần cố gắng thêm! 💪', 'Làm tốt! Hãy ôn lại phần sai. 👍', 'Xuất sắc! Bạn nắm vững kiến thức này! 🏆']

  return (
    <div className="max-w-lg mx-auto">
      <div className="card p-8 text-center">
        <div className="text-4xl mb-2">{'⭐'.repeat(stars) + '☆'.repeat(3 - stars)}</div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">{score}/{questions.length} câu đúng</h2>
        <p className="text-3xl font-black text-blue-600 mb-2">{pct}%</p>
        <p className="text-sm text-slate-500 mb-6">{messages[stars - 1]}</p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {questions.map((_, i) => {
            const qi = questions[i] as any
            const ans = answers[i]
            const correct = ans !== null && ans === qi.correctIndex
            return (
              <div key={i}
                className={cn('py-2 rounded-lg text-xs font-semibold',
                  correct ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                )}
              >
                {correct ? '✅' : '❌'} Câu {i + 1}
              </div>
            )
          })}
        </div>

        <div className="flex gap-3">
          <button onClick={reset} className="btn-secondary flex-1 flex items-center justify-center gap-2">
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
