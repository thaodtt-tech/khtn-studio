'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts'
import { Flame, Star, Trophy, BookOpen, Library, NotebookPen, Gamepad2, Sparkles, FileText } from 'lucide-react'
import { cn, BRANCH_META } from '@/lib/utils'
import { USER_PROGRESS, CURRENT_USER } from '@/data/progress'
import { timeAgo } from '@/lib/utils'

const DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

export default function ProfilePage() {
  const p = USER_PROGRESS
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'activity'>('overview')

  const chartData = DAYS.map((day, i) => ({ day, phút: p.weeklyStudyMinutes[i] }))
  const pieData = p.subjectBreakdown.map(b => ({
    name: BRANCH_META[b.branch].label,
    value: b.minutes,
    color: b.color,
  }))

  const earnedBadges = p.badges.filter(b => b.isEarned)
  const lockedBadges = p.badges.filter(b => !b.isEarned)
  const totalMinutes = p.weeklyStudyMinutes.reduce((a, b) => a + b, 0)

  return (
    <div>
      {/* Profile header */}
      <div className="card p-6 mb-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl shadow-lg">
            {CURRENT_USER.avatar}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-900">{CURRENT_USER.name}</h1>
            <p className="text-slate-500 text-sm">Lớp {CURRENT_USER.grade}{CURRENT_USER.class?.slice(2)} · {CURRENT_USER.school}</p>
            <div className="flex flex-wrap gap-3 mt-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-lg">
                <Flame size={14} className="text-amber-500" />
                <span className="text-xs font-semibold text-amber-700">{p.studyStreakDays} ngày streak</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-lg">
                <Library size={14} className="text-blue-500" />
                <span className="text-xs font-semibold text-blue-700">{p.totalResourcesSaved} tài liệu đã lưu</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-lg">
                <Trophy size={14} className="text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-700">{earnedBadges.length} huy hiệu</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {[
          { label: 'Chủ đề đã học',    value: p.totalSubjectsStudied,  icon: BookOpen,    color: 'text-blue-600',    bg: 'bg-blue-50' },
          { label: 'Tài liệu đã lưu',  value: p.totalResourcesSaved,   icon: Library,     color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Notebook',          value: p.totalNotebooksCreated, icon: NotebookPen, color: 'text-violet-600',  bg: 'bg-violet-50' },
          { label: 'Game đã chơi',      value: p.totalGamesPlayed,      icon: Gamepad2,    color: 'text-amber-600',   bg: 'bg-amber-50' },
          { label: 'Công cụ AI',        value: p.totalAIToolsUsed,      icon: Sparkles,    color: 'text-rose-600',    bg: 'bg-rose-50' },
          { label: 'Báo cáo tạo ra',   value: p.totalReportsGenerated, icon: FileText,    color: 'text-cyan-600',    bg: 'bg-cyan-50' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="card p-3 flex flex-col items-center gap-1.5">
            <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', bg)}>
              <Icon size={15} className={color} />
            </div>
            <p className="text-xl font-bold text-slate-900">{value}</p>
            <p className="text-[10px] text-slate-500 text-center leading-tight">{label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5">
        {(['overview', 'badges', 'activity'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={cn('px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            {tab === 'overview' ? '📊 Tổng quan' : tab === 'badges' ? '🏅 Huy hiệu' : '📋 Hoạt động'}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-5">
            <h3 className="font-semibold text-slate-800 mb-4">📈 Thời gian học tuần này</h3>
            <p className="text-xs text-slate-500 mb-3">Tổng: {totalMinutes} phút ({Math.floor(totalMinutes / 60)}h {totalMinutes % 60}p)</p>
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

          <div className="card p-5">
            <h3 className="font-semibold text-slate-800 mb-4">🍩 Phân bổ môn học</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `${v} phút`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="card p-5 lg:col-span-2">
            <h3 className="font-semibold text-slate-800 mb-3">🎯 Chủ đề yêu thích</h3>
            <div className="flex flex-wrap gap-2">
              {p.favoriteTopics.map(topic => (
                <span key={topic} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-full font-medium">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Badges */}
      {activeTab === 'badges' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-slate-700 mb-3">✅ Đã đạt được ({earnedBadges.length})</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {earnedBadges.map(badge => (
                <div key={badge.id} className="card p-4 flex flex-col items-center text-center gap-2 bg-gradient-to-b from-amber-50 to-white border-amber-100">
                  <span className="text-3xl">{badge.emoji}</span>
                  <p className="text-sm font-semibold text-amber-800">{badge.name}</p>
                  <p className="text-[11px] text-slate-400">{badge.description}</p>
                  {badge.earnedAt && <p className="text-[10px] text-amber-400">{badge.earnedAt.slice(0, 10)}</p>}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-slate-700 mb-3">🔒 Chưa đạt ({lockedBadges.length})</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {lockedBadges.map(badge => (
                <div key={badge.id} className="card p-4 flex flex-col items-center text-center gap-2 opacity-40 bg-slate-50">
                  <span className="text-3xl grayscale">{badge.emoji}</span>
                  <p className="text-sm font-semibold text-slate-600">{badge.name}</p>
                  <p className="text-[11px] text-slate-400">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Activity */}
      {activeTab === 'activity' && (
        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Lịch sử hoạt động</h3>
          <div className="space-y-3">
            {p.recentActivity.map(activity => (
              <div key={activity.id} className="flex items-start gap-3 py-2.5 border-b border-slate-50 last:border-0">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-base shrink-0">
                  {activity.emoji}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700">{activity.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{activity.description}</p>
                </div>
                <span className="text-[11px] text-slate-400 shrink-0">{timeAgo(activity.timestamp)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
