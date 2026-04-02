'use client'

import { useState } from 'react'
import { Sparkles, Loader2, Download, Copy, Check, FileText } from 'lucide-react'
import { cn, BRANCH_META, GRADE_LABELS } from '@/lib/utils'
import { mockGenerateReport } from '@/lib/mock-ai'
import type { Report, Grade, SubjectBranch } from '@/types'
import { NOTEBOOKS } from '@/data/notebooks'

const GRADES: Grade[] = [6, 7, 8, 9]
const BRANCHES: SubjectBranch[] = ['physics', 'chemistry', 'biology', 'environment']

export default function ReportsPage() {
  const [topic, setTopic] = useState('')
  const [grade, setGrade] = useState<Grade>(8)
  const [branch, setBranch] = useState<SubjectBranch>('physics')
  const [fromNotebook, setFromNotebook] = useState('')
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  async function generate() {
    if (!topic.trim()) return
    setLoading(true)
    const r = await mockGenerateReport(topic, grade, branch)
    setReport(r)
    setLoading(false)
  }

  function copyReport() {
    if (!report) return
    const text = [
      `# ${report.title}`,
      `**Lớp:** ${GRADE_LABELS[report.grade]} | **Môn:** ${BRANCH_META[report.branch].label}`,
      `\n## Mục tiêu\n${report.objective}`,
      `\n## Nội dung chính\n${report.mainContent.join('\n\n')}`,
      `\n## Khái niệm trọng tâm\n${report.keyConcepts.map(k => `- **${k.term}:** ${k.explanation}`).join('\n')}`,
      `\n## Ví dụ\n${report.examples.map(e => `### ${e.title}\n${e.content}`).join('\n\n')}`,
      `\n## Câu hỏi ôn tập\n${report.reviewQuestions.map((q, i) => `${i+1}. ${q}`).join('\n')}`,
      `\n## Kết luận\n${report.conclusion}`,
    ].join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="page-title">Báo cáo học tập</h1>
        <p className="page-subtitle">Tạo báo cáo học tập cấu trúc từ notebook hoặc chủ đề bạn nhập</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Config panel */}
        <div className="card p-5">
          <h2 className="font-semibold text-slate-800 mb-4">⚙️ Cấu hình báo cáo</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Chủ đề báo cáo *</label>
              <input value={topic} onChange={e => setTopic(e.target.value)}
                placeholder="Vd: Định luật Ohm, Tế bào, Tốc độ..."
                className="input"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Lớp</label>
              <div className="flex gap-2">
                {GRADES.map(g => (
                  <button key={g} onClick={() => setGrade(g)}
                    className={cn('flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors',
                      grade === g ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    )}
                  >
                    {GRADE_LABELS[g]}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Môn nhánh</label>
              <div className="grid grid-cols-2 gap-2">
                {BRANCHES.map(b => {
                  const m = BRANCH_META[b]
                  return (
                    <button key={b} onClick={() => setBranch(b)}
                      className={cn('py-2 rounded-lg text-xs font-medium transition-colors',
                        branch === b
                          ? 'bg-blue-600 text-white'
                          : cn('text-slate-600 hover:bg-slate-100', m.bg)
                      )}
                    >
                      {m.emoji} {m.label}
                    </button>
                  )
                })}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Từ Notebook (tùy chọn)</label>
              <select value={fromNotebook} onChange={e => setFromNotebook(e.target.value)} className="input">
                <option value="">— Không chọn —</option>
                {NOTEBOOKS.map(nb => (
                  <option key={nb.id} value={nb.id}>{nb.emoji} {nb.title}</option>
                ))}
              </select>
            </div>
            <button onClick={generate} disabled={!topic.trim() || loading}
              className={cn('w-full btn-primary flex items-center justify-center gap-2',
                (!topic.trim() || loading) && 'opacity-50 cursor-not-allowed'
              )}
            >
              {loading
                ? <><Loader2 size={14} className="animate-spin" /> Đang tạo báo cáo...</>
                : <><Sparkles size={14} /> Tạo báo cáo</>
              }
            </button>
          </div>
        </div>

        {/* Report preview */}
        <div className="lg:col-span-2">
          {loading && (
            <div className="card p-8 flex flex-col items-center justify-center gap-3 text-slate-400 h-full min-h-64">
              <Loader2 size={32} className="animate-spin text-blue-400" />
              <p className="text-sm">AI đang soạn báo cáo học tập...</p>
              <p className="text-xs">Đang phân tích chủ đề và cấu trúc nội dung</p>
            </div>
          )}

          {!loading && !report && (
            <div className="card p-8 flex flex-col items-center justify-center gap-3 text-slate-300 h-full min-h-64">
              <FileText size={48} />
              <p className="text-slate-400 font-medium">Báo cáo sẽ hiển thị ở đây</p>
              <p className="text-sm text-slate-300">Điền thông tin bên trái và nhấn "Tạo báo cáo"</p>
            </div>
          )}

          {!loading && report && (
            <div className="card overflow-hidden">
              {/* Report header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-blue-200 text-xs mb-1">BÁO CÁO HỌC TẬP · KHTN STUDIO</p>
                    <h2 className="text-xl font-bold">{report.title}</h2>
                    <div className="flex gap-3 mt-2 text-sm text-blue-200">
                      <span>{GRADE_LABELS[report.grade]}</span>
                      <span>·</span>
                      <span>{BRANCH_META[report.branch].emoji} {BRANCH_META[report.branch].label}</span>
                      <span>·</span>
                      <span>{new Date(report.createdAt).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={copyReport}
                      className="flex items-center gap-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs transition-colors"
                    >
                      {copied ? <Check size={12} /> : <Copy size={12} />}
                      {copied ? 'Đã sao chép' : 'Copy'}
                    </button>
                    <button
                      className="flex items-center gap-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs transition-colors"
                      onClick={() => window.print()}
                    >
                      <Download size={12} /> In / PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* Report body */}
              <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
                {/* Objective */}
                <section>
                  <h3 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                    🎯 Mục tiêu học tập
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed p-3 bg-blue-50 rounded-lg">{report.objective}</p>
                </section>

                {/* Main content */}
                <section>
                  <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">📖 Nội dung chính</h3>
                  <div className="space-y-3">
                    {report.mainContent.map((block, i) => (
                      <div key={i} className="text-sm text-slate-600 leading-relaxed whitespace-pre-line p-3 bg-slate-50 rounded-lg">
                        {block}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Key concepts */}
                <section>
                  <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">💡 Khái niệm trọng tâm</h3>
                  <div className="grid gap-2">
                    {report.keyConcepts.map((k, i) => (
                      <div key={i} className="flex gap-3 p-3 bg-amber-50 rounded-lg">
                        <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        <div>
                          <span className="text-sm font-semibold text-amber-800">{k.term}: </span>
                          <span className="text-sm text-amber-700">{k.explanation}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Examples */}
                <section>
                  <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">📌 Ví dụ minh họa</h3>
                  <div className="space-y-3">
                    {report.examples.map((ex, i) => (
                      <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
                        <div className="bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700">{ex.title}</div>
                        <p className="px-4 py-3 text-sm text-slate-600 leading-relaxed">{ex.content}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Review questions */}
                <section>
                  <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">❓ Câu hỏi ôn tập</h3>
                  <ol className="space-y-2">
                    {report.reviewQuestions.map((q, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-slate-600">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i+1}</span>
                        {q}
                      </li>
                    ))}
                  </ol>
                </section>

                {/* Conclusion */}
                <section className="border-t border-slate-100 pt-4">
                  <h3 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">✅ Kết luận</h3>
                  <p className="text-sm text-slate-600 leading-relaxed italic">{report.conclusion}</p>
                </section>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
