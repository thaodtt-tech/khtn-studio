'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff, AlertCircle, Loader2, ChevronRight } from 'lucide-react'
import { login, isAuthenticated } from '@/lib/auth'
import { APP_NAME } from '@/lib/constants'

const DEMO_ACCOUNTS = [
  { label: 'Học sinh', email: 'hocsinh@dim-sciences.edu.vn', password: 'hocsinh2024', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { label: 'Giáo viên', email: 'giaovien@dim-sciences.edu.vn', password: 'giaovien2024', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { label: 'Admin', email: 'admin@dim-sciences.edu.vn', password: 'admin2024', color: 'bg-purple-50 text-purple-700 border-purple-200' },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated()) router.replace('/dashboard')
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const user = login(email, password)
    if (user) {
      router.push('/dashboard')
    } else {
      setError('Email hoặc mật khẩu không đúng. Hãy thử tài khoản demo bên dưới.')
      setLoading(false)
    }
  }

  function fillDemo(acc: typeof DEMO_ACCOUNTS[0]) {
    setEmail(acc.email)
    setPassword(acc.password)
    setError('')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel – branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-800 flex-col justify-between p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <Image src="/logo.png" alt={APP_NAME} width={44} height={44} className="rounded-xl shadow-lg" />
          <div>
            <div className="text-white font-bold text-lg leading-tight">{APP_NAME}</div>
            <div className="text-blue-200 text-xs">KHTN THCS</div>
          </div>
        </div>

        {/* Main message */}
        <div className="relative space-y-6">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Khám phá thế giới<br />
            <span className="text-blue-200">Khoa học Tự nhiên</span>
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed max-w-sm">
            Học theo chương trình THCS với game tương tác, notebook AI và hơn 36 bài ôn tập được thiết kế theo 3 mạch KHTN.
          </p>

          {/* Subject badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { label: '⚡ Vật lí', bg: 'bg-indigo-500/30' },
              { label: '🧪 Hoá học', bg: 'bg-amber-500/30' },
              { label: '🌱 Sinh học', bg: 'bg-emerald-500/30' },
            ].map(s => (
              <span key={s.label} className={`${s.bg} text-white text-sm px-3 py-1.5 rounded-full backdrop-blur`}>
                {s.label}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { value: '36+', label: 'Game học tập' },
              { value: '6–9', label: 'Lớp THCS' },
              { value: '3', label: 'Mạch KHTN' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-blue-200 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="relative text-blue-300 text-xs">
          Theo chương trình GDPT 2018 · 3 bộ sách: Cánh Diều, KNTT, CTST
        </div>
      </div>

      {/* Right panel – login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md space-y-8">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3">
            <Image src="/logo.png" alt={APP_NAME} width={36} height={36} className="rounded-xl" />
            <span className="font-bold text-slate-900">{APP_NAME}</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">Đăng nhập</h2>
            <p className="text-slate-500 text-sm mt-1">Chào mừng trở lại! Hãy tiếp tục hành trình học tập.</p>
          </div>

          {/* Demo account quick-fill */}
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Tài khoản demo</p>
            <div className="flex gap-2 flex-wrap">
              {DEMO_ACCOUNTS.map(acc => (
                <button
                  key={acc.label}
                  type="button"
                  onClick={() => fillDemo(acc)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all hover:scale-105 ${acc.color}`}
                >
                  {acc.label}
                  <ChevronRight size={11} />
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@truong.edu.vn"
                required
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Mật khẩu</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle size={15} className="text-red-500 mt-0.5 shrink-0" />
                <p className="text-xs text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-2.5 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                'Đăng nhập'
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400">
            Chưa có tài khoản?{' '}
            <span className="text-blue-600 font-medium">Liên hệ giáo viên để được cấp.</span>
          </p>

          <div className="pt-2 border-t border-slate-200">
            <Link href="/" className="flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors">
              ← Về trang giới thiệu
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
