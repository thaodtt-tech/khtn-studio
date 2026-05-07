'use client'

import { useState } from 'react'
import { Sparkles, Loader2, RefreshCw, BookmarkPlus, BookmarkCheck, Trash2, FolderOpen, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockGenerateMindMap } from '@/lib/mock-ai'
import type { MindMapNode } from '@/types'
import { NOTEBOOKS } from '@/data/notebooks'

interface SavedMap {
  id: string
  title: string
  rootNode: MindMapNode
  createdAt: string
}

function loadSaved(): SavedMap[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem('khtn_mindmaps') || '[]') } catch { return [] }
}

function persistSaved(maps: SavedMap[]) {
  localStorage.setItem('khtn_mindmaps', JSON.stringify(maps))
}

const COLORS = ['#3b82f6', '#6366f1', '#10b981', '#f59e0b', '#ec4899', '#0ea5e9', '#8b5cf6', '#ef4444']

type OnLeafClick = (node: MindMapNode) => void

function MindMapNodeComp({ node, depth = 0, onLeafClick }: { node: MindMapNode; depth?: number; onLeafClick?: OnLeafClick }) {
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
                <MindMapNodeComp node={child} depth={1} onLeafClick={onLeafClick} />
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
            {node.children!.map(child => (
              <div key={child.id} className="flex items-center">
                <div className="w-4 h-px bg-slate-200" />
                <button
                  onClick={() => child.notes && onLeafClick?.(child)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium border text-left transition-all',
                    child.notes
                      ? 'hover:shadow-sm hover:scale-[1.03] cursor-pointer'
                      : 'cursor-default'
                  )}
                  style={{ borderColor: color + '40', backgroundColor: color + '10', color }}
                >
                  {child.label}
                  {child.notes && <span className="ml-1 opacity-40">▸</span>}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <button
      onClick={() => node.notes && onLeafClick?.(node)}
      className={cn(
        'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
        node.notes ? 'hover:opacity-70 cursor-pointer' : 'cursor-default'
      )}
      style={{ color }}
    >
      {node.label}
      {node.notes && <span className="ml-1 opacity-40">▸</span>}
    </button>
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
  const [savedMaps, setSavedMaps] = useState<SavedMap[]>(loadSaved)
  const [justSaved, setJustSaved] = useState(false)
  const [currentTitle, setCurrentTitle] = useState('')
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null)

  async function generate() {
    const t = topic || NOTEBOOKS.find(n => n.id === fromNotebook)?.topic || 'Chủ đề KHTN'
    setLoading(true)
    setJustSaved(false)
    setSelectedNode(null)
    const map = await mockGenerateMindMap(t)
    setCurrentMap(map)
    setCurrentTitle(t)
    setLoading(false)
  }

  function saveMap() {
    const entry: SavedMap = {
      id: `mm-${Date.now()}`,
      title: currentTitle || currentMap.label,
      rootNode: currentMap,
      createdAt: new Date().toISOString(),
    }
    const updated = [entry, ...savedMaps]
    setSavedMaps(updated)
    persistSaved(updated)
    setJustSaved(true)
  }

  function deleteMap(id: string) {
    const updated = savedMaps.filter(m => m.id !== id)
    setSavedMaps(updated)
    persistSaved(updated)
  }

  function loadMap(m: SavedMap) {
    setCurrentMap(m.rootNode)
    setCurrentTitle(m.title)
    setJustSaved(true)
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
        <button
          onClick={saveMap}
          disabled={loading || justSaved}
          className={cn(
            'flex items-center gap-1.5 h-9 text-xs px-3 rounded-lg font-medium border transition-colors',
            justSaved
              ? 'bg-green-50 border-green-200 text-green-600 cursor-default'
              : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
          )}
        >
          {justSaved ? <BookmarkCheck size={13} /> : <BookmarkPlus size={13} />}
          {justSaved ? 'Đã lưu' : 'Lưu sơ đồ'}
        </button>
        <button onClick={() => { setCurrentMap(SAMPLE_MAP); setCurrentTitle(''); setJustSaved(false) }} className="btn-secondary flex items-center gap-1.5 h-9 text-xs">
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
            <MindMapNodeComp node={currentMap} onLeafClick={n => setSelectedNode(prev => prev?.id === n.id ? null : n)} />
          </div>
        )}
      </div>

      {/* Node Detail Panel */}
      {selectedNode?.notes && (
        <div className="mt-3 card p-4 border-l-4 border-blue-400 bg-blue-50/60 flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-blue-700 mb-1">{selectedNode.label}</p>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{selectedNode.notes}</p>
          </div>
          <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-slate-600 shrink-0 mt-0.5">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 text-xs text-slate-400 justify-center">
        <span>💡 Click nhánh cấp 1 để mở rộng / thu gọn</span>
        <span>·</span>
        <span>▸ Click mục có dấu ▸ để xem nội dung chi tiết</span>
        <span>·</span>
        <span>🔄 Nhấn "Tạo sơ đồ" để tạo mind map từ chủ đề bạn chọn</span>
      </div>

      {/* Saved Maps */}
      {savedMaps.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <FolderOpen size={16} className="text-slate-400" />
            <h2 className="text-sm font-semibold text-slate-600">Sơ đồ đã lưu ({savedMaps.length})</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {savedMaps.map(m => (
              <div key={m.id} className="card p-4 flex items-start gap-3 hover:shadow-md transition-shadow">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{m.rootNode.emoji} {m.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {new Date(m.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="text-xs text-slate-400">{m.rootNode.children?.length ?? 0} nhánh chính</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => loadMap(m)}
                    className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                  >
                    Mở
                  </button>
                  <button
                    onClick={() => deleteMap(m.id)}
                    className="p-1 rounded text-slate-300 hover:text-red-400 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
