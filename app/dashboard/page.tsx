'use client'

import Link from 'next/link'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import {
  BookOpen, Library, FolderOpen, NotebookPen, Sparkles, Gamepad2,
  FileText, Network, ArrowRight, Flame, Star, Trophy, TrendingUp, Clock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SUBJECTS } from '@/data/subjects'
import { USER_PROGRESS, CURRENT_USER } from '@/data/progress'
import { RESOURCES } from '@/data/resources'
import { GAMES } from '@/data/games'
import { timeAgo } from '@/lib/utils'

const DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

const QUICK_LINKS = [
  { href: '/subjects',  label: 'Ôn tập nhanh',     icon: BookOpen,    color: 'bg-blue-500',   desc: 'Học theo chủ đề' },
  { href: '/resources', label: 'Thư viện số',       icon: Library,     color: 'bg-emerald-500', desc: 'Tài nguyên KHTN' },
  { href: '/notebooks', label: 'Notebook',           icon: NotebookPen, color: 'bg-violet-500', desc: 'Ghi chú & tổng hợp' },
  { href: '/ai-tools',  label: 'Công cụ AI',         icon: Sparkles,    color: 'bg-amber-500',  desc: 'Tóm tắt & flashcard' },
  { href: '/reports',   label: 'Báo cáo',            icon: FileText,    color: 'bg-rose-500',   desc: 'Tạo báo cáo' },
  { href: '/mindmaps',  label: 'Sơ đồ tư duy',       icon: Network,     color: 'bg-cyan-500',   desc: 'Hệ thống kiến thức' },
  { href: '/games',     label: 'Game học tập',       icon: Gamepad2,    color: 'bg-indigo-500', desc: 'Quiz & flashcard' },
  { href: '/my-study',  label: 'Hệ thống ôn tập',   icon: FolderOpen,  color: 'bg-teal-500',   desc: 'Ghi chú cá nhân' },
]

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Chào buổi sáng'
  if (h < 18) return 'Chào buổi chiều'
  return 'Chào buổi tối'
}

export default function DashboardPage() {
  const { weeklyStudyMinutes, subjectBreakdown, recentActivity, totalResourcesSaved,
    totalNotebooksCreated, totalGamesPlayed, studyStreakDays, badges } = USER_PROGRESS

  const chartData = DAYS.map((day, i) => ({ day, phút: weeklyStudyMinutes[i] }))
  const earnedBadges = badges.filter(b => b.isEarned).slice(0, 4)
  const featuredSubjects = SUBJECTS.filter(s => s.grade === (CURRENT_USER.grade as number)).slice(0, 4)
  const topGames = GAMES.slice(0, 4)

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white p-6">
        <div className="relative z-10">
          <p className="text-blue-200 text-sm font-medium">{getGreeting()},</p>
          <h1 className="text-2xl font-bold mt-1">{CURRENT_USER.name} 👋</h1>
          <p className="text-blue-200 text-sm mt-1">Lớp {CURRENT_USER.grade} · {CURRENT_USER.class} · {CURRENT_USER.school}</p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5">
              <Flame size={16} className="text-amber-300" />
              <span className="text-sm font-semibold">{studyStreakDays} ngày streak</span>
            </div>
            <div className="w-px h-4 bg-blue-400" />
            <div className="flex items-center gap-1.5">
              <Star size={16} className="text-yellow-300" />
              <span className="text-sm font-semibold">{totalResourcesSaved} tài liệu đã lưu</span>
            </div>
            <div className="w-px h-4 bg-blue-400" />
            <div className="flex items-center gap-1.5">
              <Trophy size={16} className="text-emerald-300" />
              <span className="text-sm font-semibold">{earnedBadges.length} huy hiệu</span>
            </div>
          </div>
        </div>
        {/* Decorative */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-7xl opacity-10 select-none">⚗️</div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-white/5" />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Chủ đề đã học',  value: USER_PROGRESS.totalSubjectsStudied, icon: BookOpen,    color: 'text-blue-600',    bg: 'bg-blue-50' },
          { label: 'Tài liệu đã lưu', value: totalResourcesSaved,               icon: Library,     color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Notebook đã tạo', value: totalNotebooksCreated,              icon: NotebookPen, color: 'text-violet-600',  bg: 'bg-violet-50' },
          { label: 'Game đã chơi',    value: totalGamesPlayed,                   icon: Gamepad2,    color: 'text-amber-600',   bg: 'bg-amber-50' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="card p-4 flex items-center gap-3">
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', bg)}>
              <Icon size={18} className={color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{value}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <section>
        <div className="section-header">
          <div>
            <h2 className="font-semibold text-slate-900">Truy cập nhanh</h2>
            <p className="text-xs text-slate-500 mt-0.5">Tất cả công cụ học tập của bạn</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUICK_LINKS.map(({ href, label, icon: Icon, color, desc }) => (
            <Link key={href} href={href}
              className="card-hover p-4 flex flex-col items-center gap-2.5 text-center"
            >
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-white', color)}>
                <Icon size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{label}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Chart */}
        <div className="card p-5 lg:col-span-2">
          <div className="section-header">
            <div>
              <h2 className="font-semibold text-slate-900 flex items-center gap-2">
                <TrendingUp size={16} className="text-blue-500" />
                Thời gian học tuần này
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Tổng: {weeklyStudyMinutes.reduce((a, b) => a + b, 0)} phút
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} barSize={24}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={30} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                formatter={(v: number) => [`${v} phút`, 'Học tập']}
              />
              <Bar dataKey="phút" radius={[6, 6, 0, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={i === 5 || i === 6 ? '#e2e8f0' : '#3b82f6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Breakdown */}
        <div className="card p-5">
          <h2 className="font-semibold text-slate-900 mb-4">Phân bổ môn học</h2>
          <div className="space-y-3">
            {subjectBreakdown.map(({ branch, minutes, color }) => {
              const total = subjectBreakdown.reduce((a, b) => a + b.minutes, 0)
              const pct = Math.round((minutes / total) * 100)
              const labels: Record<string, string> = { physics: '⚡ Vật lí', chemistry: '🧪 Hóa học', biology: '🌱 Sinh học', environment: '🌍 Môi trường' }
              return (
                <div key={branch}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">{labels[branch]}</span>
                    <span className="text-slate-400">{minutes} phút</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subjects for grade */}
        <section className="card p-5">
          <div className="section-header">
            <h2 className="font-semibold text-slate-900">Học theo lớp của bạn</h2>
            <Link href="/subjects" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
              Xem tất cả <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {featuredSubjects.map(s => (
              <Link key={s.id} href={`/subjects/${s.id}`}
                className={cn('rounded-xl p-3 border transition-all hover:-translate-y-0.5 hover:shadow-md', s.bgColor, 'border-transparent')}
              >
                <div className="text-2xl mb-2">{s.emoji}</div>
                <p className="text-sm font-semibold text-slate-800 leading-tight">{s.name}</p>
                <p className="text-[11px] text-slate-500 mt-1">{s.lessonCount} bài · {s.exerciseCount} BT</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="card p-5">
          <div className="section-header">
            <h2 className="font-semibold text-slate-900">Hoạt động gần đây</h2>
            <Link href="/profile" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
              Xem tất cả <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-2.5">
            {recentActivity.slice(0, 5).map(activity => (
              <div key={activity.id} className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-sm shrink-0">
                  {activity.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-700 leading-tight">{activity.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{timeAgo(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Featured Games */}
      <section>
        <div className="section-header">
          <div>
            <h2 className="font-semibold text-slate-900">Game học tập nổi bật</h2>
            <p className="text-xs text-slate-500 mt-0.5">Học mà chơi, chơi mà học</p>
          </div>
          <Link href="/games" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
            Xem thêm <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {topGames.map(game => (
            <Link key={game.id} href={`/games/${game.id}`}
              className="card-hover p-4"
            >
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3', game.bgColor)}>
                {game.emoji}
              </div>
              <p className="text-sm font-semibold text-slate-800 leading-tight line-clamp-2">{game.title}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] text-slate-400">⭐ {game.rating}</span>
                <span className="text-[10px] text-slate-300">·</span>
                <span className="text-[10px] text-slate-400">{game.playCount.toLocaleString()} lượt</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Badges */}
      <section>
        <div className="section-header">
          <h2 className="font-semibold text-slate-900">Huy hiệu của bạn</h2>
          <Link href="/profile" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
            Xem tất cả <ArrowRight size={12} />
          </Link>
        </div>
        <div className="flex gap-3 flex-wrap">
          {USER_PROGRESS.badges.map(badge => (
            <div key={badge.id}
              className={cn('flex items-center gap-2 px-3 py-2 rounded-xl border text-sm',
                badge.isEarned
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-slate-50 border-slate-200 opacity-50'
              )}
            >
              <span>{badge.emoji}</span>
              <span className={cn('text-xs font-medium', badge.isEarned ? 'text-amber-700' : 'text-slate-400')}>
                {badge.name}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
