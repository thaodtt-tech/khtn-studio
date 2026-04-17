import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { SubjectBranch, Grade } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  })
}

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes} phút trước`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} giờ trước`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} ngày trước`
  return formatDate(dateStr)
}

export const BRANCH_META: Record<SubjectBranch, { label: string; color: string; bg: string; emoji: string }> = {
  physics:     { label: 'Vật lí',                color: 'text-indigo-700',  bg: 'bg-indigo-50',  emoji: '⚡' },
  chemistry:   { label: 'Hóa học',               color: 'text-amber-700',   bg: 'bg-amber-50',   emoji: '🧪' },
  biology:     { label: 'Sinh học',              color: 'text-emerald-700', bg: 'bg-emerald-50', emoji: '🌱' },
  environment: { label: 'Môi trường',            color: 'text-sky-700',     bg: 'bg-sky-50',     emoji: '🌍' },
  khtn:        { label: 'Khoa học Tự nhiên',     color: 'text-teal-700',    bg: 'bg-teal-50',    emoji: '🔭' },
}

export const GRADE_LABELS: Record<Grade, string> = {
  6: 'Lớp 6', 7: 'Lớp 7', 8: 'Lớp 8', 9: 'Lớp 9',
}

export const DIFFICULTY_META = {
  basic:    { label: 'Cơ bản',   color: 'text-green-700',  bg: 'bg-green-50',  badge: 'bg-green-100 text-green-700' },
  advanced: { label: 'Nâng cao', color: 'text-blue-700',   bg: 'bg-blue-50',   badge: 'bg-blue-100 text-blue-700' },
  gifted:   { label: 'Bồi dưỡng',color: 'text-violet-700', bg: 'bg-violet-50', badge: 'bg-violet-100 text-violet-700' },
}

export const RESOURCE_TYPE_META = {
  article:    { label: 'Bài viết',     emoji: '📄', color: 'bg-slate-100 text-slate-700' },
  pdf:        { label: 'Tài liệu PDF', emoji: '📕', color: 'bg-red-100 text-red-700' },
  image:      { label: 'Hình ảnh',     emoji: '🖼️', color: 'bg-pink-100 text-pink-700' },
  video:      { label: 'Video',        emoji: '🎬', color: 'bg-purple-100 text-purple-700' },
  mindmap:    { label: 'Sơ đồ tư duy', emoji: '🗺️', color: 'bg-cyan-100 text-cyan-700' },
  exercise:   { label: 'Bài tập',      emoji: '✏️', color: 'bg-orange-100 text-orange-700' },
  simulation: { label: 'Mô phỏng',     emoji: '🔬', color: 'bg-indigo-100 text-indigo-700' },
  experiment: { label: 'Thí nghiệm',   emoji: '⚗️', color: 'bg-teal-100 text-teal-700' },
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}

export function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}
