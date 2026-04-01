'use client'

import { useState } from 'react'
import { Plus, Search, Tag, Flag, FolderOpen, Pencil, Trash2 } from 'lucide-react'
import { cn, BRANCH_META } from '@/lib/utils'
import type { StudyItem, StudyItemType } from '@/types'
import { formatDate } from '@/lib/utils'

const INITIAL_ITEMS: StudyItem[] = [
  { id: '1', type: 'formula', title: 'Định luật Ohm', content: 'U = I × R. Trong đó: U (V) – hiệu điện thế, I (A) – cường độ dòng điện, R (Ω) – điện trở.', grade: 8, branch: 'physics', tags: ['điện học', 'công thức'], isFlagged: true, createdAt: '2024-10-01', updatedAt: '2024-10-01' },
  { id: '2', type: 'question', title: 'Tại sao dây dẫn dài thì điện trở lớn hơn?', content: 'R = ρ × l/S — điện trở tỉ lệ thuận với chiều dài. Điện tử phải va chạm nhiều hơn khi đi qua đoạn dây dài hơn.', grade: 8, branch: 'physics', tags: ['điện học', 'lý giải'], isFlagged: false, createdAt: '2024-10-02', updatedAt: '2024-10-02' },
  { id: '3', type: 'note', title: 'Phân biệt mạch nối tiếp và song song', content: 'Nối tiếp: I bằng nhau, U cộng lại, R = R₁+R₂.\nSong song: U bằng nhau, I cộng lại, 1/R = 1/R₁+1/R₂.', grade: 8, branch: 'physics', tags: ['mạch điện', 'so sánh'], isFlagged: true, createdAt: '2024-10-03', updatedAt: '2024-10-10' },
  { id: '4', type: 'formula', title: 'Số mol n = m/M', content: 'n: số mol (mol), m: khối lượng (g), M: khối lượng mol (g/mol). Ví dụ: 18g H₂O có n = 18/18 = 1 mol.', grade: 8, branch: 'chemistry', tags: ['mol', 'hóa học'], isFlagged: false, createdAt: '2024-09-25', updatedAt: '2024-09-25' },
  { id: '5', type: 'question', title: 'Quang hợp và hô hấp tế bào khác nhau như thế nào?', content: 'Quang hợp: CO₂ + H₂O → glucôzơ + O₂ (cần ánh sáng, xảy ra ở lục lạp).\nHô hấp: glucôzơ + O₂ → CO₂ + H₂O + ATP (xảy ra ở ty thể, ngày và đêm).', grade: 7, branch: 'biology', tags: ['sinh học', 'quang hợp', 'hô hấp'], isFlagged: true, createdAt: '2024-09-20', updatedAt: '2024-09-20' },
  { id: '6', type: 'experiment', title: 'Thí nghiệm chứng minh quang hợp thải O₂', content: 'Dụng cụ: cây thủy sinh Elodea, ống nghiệm, đèn, nước.\nCách làm: úp ống nghiệm đầy nước vào cành Elodea, chiếu đèn → quan sát bong bóng khí.\nKết luận: bong bóng là O₂ do quang hợp tạo ra.', grade: 7, branch: 'biology', tags: ['thí nghiệm', 'quang hợp'], isFlagged: false, createdAt: '2024-09-18', updatedAt: '2024-09-18' },
  { id: '7', type: 'note', title: 'Nguyên tắc bổ sung trong AND', content: 'A luôn bắt cặp với T (2 liên kết hydro).\nG luôn bắt cặp với X (3 liên kết hydro).\nHệ quả: %A = %T, %G = %X, %A + %G = 50%.', grade: 9, branch: 'biology', tags: ['AND', 'di truyền'], isFlagged: true, createdAt: '2024-10-05', updatedAt: '2024-10-05' },
  { id: '8', type: 'formula', title: 'Tốc độ trung bình', content: 'v_tb = s_tổng / t_tổng\nLưu ý: v_tb ≠ (v₁+v₂)/2 (không phải trung bình cộng!)', grade: 7, branch: 'physics', tags: ['tốc độ', 'công thức'], isFlagged: false, createdAt: '2024-09-15', updatedAt: '2024-09-15' },
]

const TYPE_META: Record<StudyItemType, { label: string; emoji: string; color: string; bg: string }> = {
  note:       { label: 'Ghi chú',        emoji: '📝', color: 'text-blue-700',    bg: 'bg-blue-50' },
  question:   { label: 'Câu hỏi',        emoji: '❓', color: 'text-violet-700',  bg: 'bg-violet-50' },
  exercise:   { label: 'Bài tập',        emoji: '✏️', color: 'text-orange-700',  bg: 'bg-orange-50' },
  formula:    { label: 'Công thức',      emoji: '📐', color: 'text-amber-700',   bg: 'bg-amber-50' },
  resource:   { label: 'Tài nguyên',     emoji: '📚', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  experiment: { label: 'Thí nghiệm',     emoji: '⚗️', color: 'text-teal-700',   bg: 'bg-teal-50' },
}

const SECTIONS = [
  { key: 'all',        label: 'Tất cả',       emoji: '📋', count: (items: StudyItem[]) => items.length },
  { key: 'note',       label: 'Ghi chú',      emoji: '📝', count: (items: StudyItem[]) => items.filter(i => i.type === 'note').length },
  { key: 'question',   label: 'Câu hỏi',      emoji: '❓', count: (items: StudyItem[]) => items.filter(i => i.type === 'question').length },
  { key: 'formula',    label: 'Công thức',    emoji: '📐', count: (items: StudyItem[]) => items.filter(i => i.type === 'formula').length },
  { key: 'exercise',   label: 'Bài tập',      emoji: '✏️', count: (items: StudyItem[]) => items.filter(i => i.type === 'exercise').length },
  { key: 'experiment', label: 'Thí nghiệm',   emoji: '⚗️', count: (items: StudyItem[]) => items.filter(i => i.type === 'experiment').length },
  { key: 'flagged',    label: 'Cần ôn lại',   emoji: '🚩', count: (items: StudyItem[]) => items.filter(i => i.isFlagged).length },
]

export default function MyStudyPage() {
  const [items, setItems] = useState<StudyItem[]>(INITIAL_ITEMS)
  const [section, setSection] = useState('all')
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [newItem, setNewItem] = useState<Partial<StudyItem> & { tagInput?: string }>({ type: 'note', title: '', content: '', tags: [], isFlagged: false })

  const filtered = items.filter(item => {
    if (section === 'flagged') return item.isFlagged
    if (section !== 'all' && item.type !== section) return false
    if (search && !item.title.toLowerCase().includes(search.toLowerCase()) &&
        !item.content.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  function addItem() {
    if (!newItem.title?.trim()) return
    const item: StudyItem = {
      id: Date.now().toString(),
      type: newItem.type as StudyItemType || 'note',
      title: newItem.title!,
      content: newItem.content || '',
      tags: newItem.tagInput ? newItem.tagInput.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
      isFlagged: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setItems(prev => [item, ...prev])
    setNewItem({ type: 'note', title: '', content: '', tags: [], isFlagged: false })
    setShowAdd(false)
  }

  function toggleFlag(id: string) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, isFlagged: !i.isFlagged } : i))
  }

  function deleteItem(id: string) {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="page-title">Hệ thống ôn tập cá nhân</h1>
          <p className="page-subtitle">Tự xây dựng kho kiến thức riêng của bạn</p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="btn-primary flex items-center gap-1.5"
        >
          <Plus size={14} /> Thêm mới
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-48 shrink-0">
          <div className="space-y-1">
            {SECTIONS.map(s => (
              <button key={s.key} onClick={() => setSection(s.key)}
                className={cn('w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
                  section === s.key
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                )}
              >
                <span className="flex items-center gap-2">
                  <span>{s.emoji}</span> {s.label}
                </span>
                <span className={cn('text-xs rounded-full px-1.5 py-0.5',
                  section === s.key ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                )}>
                  {s.count(items)}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <div className="relative mb-4">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Tìm trong ghi chú, câu hỏi, công thức..."
              className="input pl-9"
            />
          </div>

          <div className="space-y-3">
            {filtered.map(item => {
              const tm = TYPE_META[item.type]
              const bm = item.branch ? BRANCH_META[item.branch] : null
              return (
                <div key={item.id} className={cn('card p-4 border-l-4',
                  item.isFlagged ? 'border-l-amber-400' : 'border-l-transparent'
                )}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0', tm.bg)}>
                        {tm.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-sm font-semibold text-slate-800">{item.title}</h3>
                          <span className={cn('badge text-[10px]', tm.bg, tm.color)}>{tm.label}</span>
                          {bm && <span className={cn('badge text-[10px]', bm.bg, bm.color)}>{bm.emoji} {bm.label}</span>}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{item.content}</p>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          {item.tags.map(t => (
                            <span key={t} className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded-full">
                              <Tag size={8} /> {t}
                            </span>
                          ))}
                          <span className="text-[10px] text-slate-300">{formatDate(item.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => toggleFlag(item.id)}
                        className={cn('w-7 h-7 rounded-lg flex items-center justify-center transition-colors',
                          item.isFlagged ? 'text-amber-500 bg-amber-50' : 'text-slate-300 hover:text-amber-400 hover:bg-amber-50'
                        )}
                      >
                        <Flag size={13} />
                      </button>
                      <button onClick={() => deleteItem(item.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-400 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}

            {filtered.length === 0 && (
              <div className="text-center py-16 text-slate-400">
                <div className="text-4xl mb-3">📂</div>
                <p className="font-medium">Chưa có nội dung nào</p>
                <p className="text-sm mt-1">Nhấn "Thêm mới" để bắt đầu xây dựng hệ thống ôn tập</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h2 className="font-bold text-slate-900 mb-4">Thêm nội dung mới</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Loại</label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(TYPE_META) as StudyItemType[]).map(t => (
                    <button key={t} onClick={() => setNewItem(p => ({ ...p, type: t }))}
                      className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border',
                        newItem.type === t
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      )}
                    >
                      {TYPE_META[t].emoji} {TYPE_META[t].label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Tiêu đề</label>
                <input value={newItem.title || ''} onChange={e => setNewItem(p => ({ ...p, title: e.target.value }))}
                  placeholder="Tên công thức, câu hỏi, ghi chú..."
                  className="input"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Nội dung</label>
                <textarea value={newItem.content || ''} onChange={e => setNewItem(p => ({ ...p, content: e.target.value }))}
                  placeholder="Nội dung chi tiết..."
                  className="input min-h-24 resize-none"
                  rows={4}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Tags (cách nhau bằng dấu phẩy)</label>
                <input
                  value={newItem.tagInput || ''}
                  onChange={e => setNewItem(p => ({ ...p, tagInput: e.target.value }))}
                  placeholder="vd: công thức, hóa học, lớp 8"
                  className="input"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={addItem} className="btn-primary flex-1">Thêm vào hệ thống</button>
              <button onClick={() => setShowAdd(false)} className="btn-secondary">Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
