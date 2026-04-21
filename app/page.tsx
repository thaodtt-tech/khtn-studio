'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  FlaskConical, Gamepad2, NotebookPen, Sparkles, Library,
  BookOpen, Network, ArrowRight, Zap, Star, Users, Trophy,
  ChevronRight, Play,
} from 'lucide-react'
import { isAuthenticated } from '@/lib/auth'
import { APP_NAME } from '@/lib/constants'

const SUBJECTS = [
  {
    icon: '⚡',
    label: 'Vật lí',
    sub: 'mạch Năng lượng và sự biến đổi',
    color: 'from-indigo-500 to-violet-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    text: 'text-indigo-700',
    topics: ['Lực & chuyển động', 'Năng lượng', 'Âm thanh', 'Ánh sáng', 'Nhiệt học', 'Điện học'],
  },
  {
    icon: '🧪',
    label: 'Hoá học',
    sub: 'mạch Chất và sự biến đổi của chất',
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    text: 'text-amber-700',
    topics: ['Nguyên tử & phân tử', 'Chất tinh khiết', 'Phản ứng hóa học', 'Acid – Base', 'Kim loại', 'Hóa hữu cơ'],
  },
  {
    icon: '🌱',
    label: 'Sinh học',
    sub: 'mạch Vật sống',
    color: 'from-emerald-500 to-green-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    text: 'text-emerald-700',
    topics: ['Tế bào sự sống', 'Phân loại sinh vật', 'Trao đổi chất', 'Cảm ứng', 'Sinh trưởng', 'Di truyền'],
  },
]

const FEATURES = [
  {
    icon: Gamepad2,
    title: '36+ Game học tập',
    desc: 'Quiz, Flashcard, Điền từ, Memory — bám sát SGK 3 bộ sách Cánh Diều, KNTT, CTST.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: NotebookPen,
    title: 'Notebook KHTN',
    desc: 'Ghi chú cá nhân có cấu trúc: khái niệm chính, công thức, từ vựng và câu hỏi ôn tập.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Sparkles,
    title: 'Công cụ AI',
    desc: 'Tóm tắt chủ đề, giải thích khái niệm, tạo câu hỏi ôn tập và hỗ trợ giải bài tập.',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
  },
  {
    icon: Library,
    title: 'Thư viện số',
    desc: 'Tổng hợp tài nguyên: bài giảng, hình ảnh, video thí nghiệm, sơ đồ tư duy.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
  },
  {
    icon: Network,
    title: 'Sơ đồ tư duy',
    desc: 'Trực quan hóa mối quan hệ giữa các khái niệm KHTN bằng mindmap tương tác.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: BookOpen,
    title: 'Hệ thống ôn tập',
    desc: 'Theo dõi tiến độ, lưu bài tập yêu thích và ôn tập theo chủ đề cá nhân hóa.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
]

const STATS = [
  { icon: Gamepad2, value: '36+', label: 'Game học tập', color: 'text-violet-600' },
  { icon: BookOpen, value: '6–9', label: 'Lớp THCS', color: 'text-blue-600' },
  { icon: Zap, value: '3', label: 'Mạch KHTN', color: 'text-amber-600' },
  { icon: Star, value: '3', label: 'Bộ sách SGK', color: 'text-emerald-600' },
]

export default function LandingPage() {
  const router = useRouter()
  useEffect(() => {
    if (isAuthenticated()) router.replace('/dashboard')
  }, [router])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ── Navbar ─────────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <FlaskConical size={16} className="text-white" />
            </div>
            <span className="font-bold text-slate-900">{APP_NAME}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/games" className="hidden sm:flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 transition-colors">
              <Gamepad2 size={14} /> Thử game miễn phí
            </Link>
            <Link
              href="/login"
              className="btn-primary flex items-center gap-1.5 text-sm"
            >
              Đăng nhập <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-20 px-6 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-blue-50 to-transparent rounded-full opacity-60 -z-10" />
        <div className="absolute top-20 right-0 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-40 -z-10" />
        <div className="absolute top-40 left-0 w-48 h-48 bg-emerald-100 rounded-full blur-3xl opacity-40 -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
            <Zap size={11} /> Theo chương trình GDPT 2018 — 3 bộ sách
          </span>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
            Học{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Khoa học Tự nhiên
            </span>
            <br />theo cách thú vị hơn
          </h1>

          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Nền tảng học tập KHTN cho học sinh THCS lớp 6–9. Game tương tác,
            notebook thông minh, công cụ AI và thư viện tài nguyên theo 3 mạch
            Vật lí · Hoá học · Sinh học.
          </p>

          {/* CTA buttons */}
          <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
            <Link
              href="/login"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-150 shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5"
            >
              Bắt đầu học ngay <ArrowRight size={16} />
            </Link>
            <Link
              href="/games"
              className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border border-slate-200 transition-all duration-150 hover:-translate-y-0.5"
            >
              <Play size={15} className="text-violet-500" /> Xem game học tập
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 pt-6 flex-wrap">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 Subject cards ────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900">3 mạch Khoa học Tự nhiên</h2>
            <p className="text-slate-500 mt-2">Nội dung bám sát SGK Cánh Diều, Kết nối tri thức và Chân trời sáng tạo</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUBJECTS.map(s => (
              <div
                key={s.label}
                className={`group relative bg-white rounded-2xl border ${s.border} p-6 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.color} rounded-t-2xl`} />

                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center text-2xl`}>
                    {s.icon}
                  </div>
                  <div>
                    <div className={`font-bold text-lg ${s.text}`}>{s.label}</div>
                    <div className="text-xs text-slate-400 leading-tight">{s.sub}</div>
                  </div>
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-1.5">
                  {s.topics.map(t => (
                    <span key={t} className={`text-xs px-2.5 py-1 ${s.bg} ${s.text} rounded-full font-medium`}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Hover CTA */}
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                  Khám phá chủ đề <ChevronRight size={13} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features grid ──────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900">Tất cả công cụ trong một nền tảng</h2>
            <p className="text-slate-500 mt-2">Thiết kế riêng cho học sinh THCS học KHTN</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(f => {
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className="group flex gap-4 p-5 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-200"
                >
                  <div className={`w-10 h-10 ${f.bg} rounded-lg flex items-center justify-center shrink-0`}>
                    <Icon size={18} className={f.color} />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 mb-1">{f.title}</div>
                    <div className="text-sm text-slate-500 leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Games preview CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-12 text-6xl">⚡</div>
          <div className="absolute top-8 right-20 text-5xl">🧪</div>
          <div className="absolute bottom-6 left-1/3 text-5xl">🌱</div>
          <div className="absolute bottom-4 right-8 text-6xl">🔬</div>
        </div>
        <div className="max-w-2xl mx-auto text-center relative space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 text-white text-xs font-semibold rounded-full backdrop-blur">
            <Trophy size={11} /> Game học tập miễn phí
          </div>
          <h2 className="text-3xl font-bold text-white">Thử ngay 36+ game KHTN</h2>
          <p className="text-blue-100 text-lg">
            Từ Quiz câu hỏi nhanh đến Flashcard match và Memory cards —
            tất cả bám sát nội dung SGK lớp 6–9.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap pt-2">
            <Link
              href="/login"
              className="flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all hover:-translate-y-0.5 shadow-lg"
            >
              Tạo tài khoản miễn phí <ArrowRight size={15} />
            </Link>
            <Link
              href="/games"
              className="flex items-center gap-2 px-6 py-3 bg-white/15 text-white font-semibold rounded-xl backdrop-blur hover:bg-white/25 transition-all"
            >
              <Play size={14} /> Xem game
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────────── */}
      <footer className="py-8 px-6 bg-slate-900 text-slate-400 text-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <FlaskConical size={14} className="text-white" />
            </div>
            <span className="text-white font-semibold">{APP_NAME}</span>
            <span className="text-slate-600">·</span>
            <span>KHTN THCS Việt Nam</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/games" className="hover:text-white transition-colors">Game</Link>
            <Link href="/resources" className="hover:text-white transition-colors">Tài nguyên</Link>
            <Link href="/login" className="hover:text-white transition-colors">Đăng nhập</Link>
          </div>
          <div className="text-xs text-slate-600">
            © 2025 KHTN Studio. Theo chương trình GDPT 2018.
          </div>
        </div>
      </footer>
    </div>
  )
}
