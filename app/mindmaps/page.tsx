'use client'

import { useState } from 'react'
import { Sparkles, Loader2, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockGenerateMindMap } from '@/lib/mock-ai'
import type { MindMapNode } from '@/types'
import { NOTEBOOKS } from '@/data/notebooks'

const COLORS = ['#3b82f6', '#6366f1', '#10b981', '#f59e0b', '#ec4899', '#0ea5e9', '#8b5cf6', '#ef4444']

function MindMapNodeComp({ node, depth = 0 }: { node: MindMapNode; depth?: number }) {
  const [expanded, setExpanded] = useState(true)
  const hasChildren = node.children && node.children.length > 0
  const color = node.color || COLORS[depth % COLORS.length]

  if (depth === 0) {
    return (
      <div className="flex flex-col items-center">
        <div
          className="px-5 py-3 rounded-2xl text-white font-bold text-base shadow-lg flex items-center gap-2 cursor-default"
          style={{ backgroundColor: color }}
        >
          {node.emoji && <span>{node.emoji}</span>}
          <span>{node.label}</span>
        </div>
        {hasChildren && (
          <div className="flex gap-4 mt-6 flex-wrap justify-center">
            {node.children!.map(child => (
              <div key={child.id} className="flex flex-col items-center">
                <div className="w-px h-6 bg-slate-200" />
                <MindMapNodeComp node={child} depth={1} />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (depth === 1) {
    return (
      <div className="flex flex-col items-center">
        <button
          onClick={() => setExpanded(!expanded)}
          className="px-4 py-2 rounded-xl text-white font-semibold text-sm shadow-md flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          style={{ backgroundColor: color }}
        >
          {node.emoji && <span>{node.emoji}</span>}
          <span>{node.label}</span>
          {hasChildren && <span className="text-white/70 text-xs">{expanded ? '▲' : '▼'}</span>}
        </button>
        {hasChildren && expanded && (
          <div className="flex flex-col items-center mt-3 gap-2">
            {node.children!.map((child, i) => (
              <div key={child.id} className="flex items-center">
                <div className="w-4 h-px bg-slate-200" />
                <div
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border"
                  style={{ borderColor: color + '40', backgroundColor: color + '10', color: color }}
                >
                  {child.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ color }}>
      {node.label}
    </div>
  )
}

const SAMPLE_MAP: MindMapNode = {
  id: 'root', label: 'Định luật Ohm', emoji: '⚡', color: '#3b82f6',
  children: [
    { id: 'c1', label: 'Công thức', emoji: '📐', color: '#6366f1', children: [
      { id: 'c1a', label: 'U = I × R' },
      { id: 'c1b', label: 'I = U / R' },
      { id: 'c1c', label: 'R = U / I' },
    ]},
    { id: 'c2', label: 'Đại lượng', emoji: '🔢', color: '#f59e0b', children: [
      { id: 'c2a', label: 'U – Hiệu điện thế (V)' },
      { id: 'c2b', label: 'I – Cường độ (A)' },
      { id: 'c2c', label: 'R – Điện trở (Ω)' },
    ]},
    { id: 'c3', label: 'Ứng dụng', emoji: '💡', color: '#10b981', children: [
      { id: 'c3a', label: 'Tính điện trở' },
      { id: 'c3b', label: 'Thiết kế mạch điện' },
      { id: 'c3c', label: 'An toàn điện' },
    ]},
    { id: 'c4', label: 'Lưu ý', emoji: '⚠️', color: '#ec4899', children: [
      { id: 'c4a', label: 'Chỉ áp dụng ở nhiệt độ ổn định' },
      { id: 'c4b', label: 'R phụ thuộc vật liệu' },
      { id: 'c4c', label: 'Kiểm tra đơn vị' },
    ]},
  ],
}

export default function MindMapsPage() {
  const [topic, setTopic] = useState('')
  const [fromNotebook, setFromNotebook] = useState('')
  const [currentMap, setCurrentMap] = useState<MindMapNode>(SAMPLE_MAP)
  const [loading, setLoading] = useState(false)

  async function generate() {
    const t = topic || NOTEBOOKS.find(n => n.id === fromNotebook)?.topic || 'Chủ đề KHTN'
    setLoading(true)
    const map = await mockGenerateMindMap(t)
    setCurrentMap(map)
    setLoading(false)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="page-title">Sơ đồ tư duy</h1>
        <p className="page-subtitle">Hệ thống hóa kiến thức KHTN bằng mind map trực quan</p>
      </div>

      {/* Controls */}
      <div className="card p-4 mb-6 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-48">
          <label className="text-xs font-medium text-slate-600 mb-1 block">Chủ đề</label>
          <input value={topic} onChange={e => setTopic(e.target.value)}
            placeholder="Vd: Tế bào, Định luật Ohm..."
            className="input"
          />
        </div>
        <div className="flex-1 min-w-48">
          <label className="text-xs font-medium text-slate-600 mb-1 block">Hoặc từ Notebook</label>
          <select value={fromNotebook} onChange={e => setFromNotebook(e.target.value)} className="input">
            <option value="">— Chọn notebook —</option>
            {NOTEBOOKS.map(nb => (
              <option key={nb.id} value={nb.id}>{nb.emoji} {nb.title}</option>
            ))}
          </select>
        </div>
        <button onClick={generate} disabled={loading}
          className="btn-primary flex items-center gap-2 h-9"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
          {loading ? 'Đang tạo...' : 'Tạo sơ đồ'}
        </button>
        <button onClick={() => setCurrentMap(SAMPLE_MAP)} className="btn-secondary flex items-center gap-1.5 h-9 text-xs">
          <RefreshCw size={13} /> Reset
        </button>
      </div>

      {/* Mind Map Canvas */}
      <div className="card p-8 overflow-x-auto">
        {loading ? (
          <div className="flex flex-col items-center py-16 gap-3 text-slate-400">
            <Loader2 size={32} className="animate-spin text-blue-400" />
            <p className="text-sm">AI đang tạo sơ đồ tư duy...</p>
          </div>
        ) : (
          <div className="flex justify-center min-w-max">
            <MindMapNodeComp node={currentMap} />
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 text-xs text-slate-400 justify-center">
        <span>💡 Click vào nhánh để mở rộng / thu gọn</span>
        <span>·</span>
        <span>🔄 Nhấn "Tạo sơ đồ" để tạo mind map từ chủ đề bạn chọn</span>
      </div>
    </div>
  )
}
