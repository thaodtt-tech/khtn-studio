import type { UserProgress, UserProfile } from '@/types'

export const CURRENT_USER: UserProfile = {
  id: 'u1',
  name: 'Nguyễn Minh Khoa',
  email: 'khoa.nguyen@thcs-demo.edu.vn',
  role: 'student',
  grade: 8,
  class: '8A2',
  school: 'THCS Nguyễn Du',
  avatar: '🎓',
  createdAt: '2024-09-01',
}

export const USER_PROGRESS: UserProgress = {
  userId: 'u1',
  totalSubjectsStudied: 7,
  totalResourcesSaved: 23,
  totalNotebooksCreated: 4,
  totalGamesPlayed: 18,
  totalAIToolsUsed: 9,
  totalReportsGenerated: 3,
  studyStreakDays: 12,
  weeklyStudyMinutes: [45, 90, 60, 120, 75, 30, 105],
  subjectBreakdown: [
    { branch: 'physics',     minutes: 340, color: '#6366f1' },
    { branch: 'chemistry',   minutes: 280, color: '#f59e0b' },
    { branch: 'biology',     minutes: 210, color: '#10b981' },
    { branch: 'environment', minutes: 95,  color: '#0ea5e9' },
  ],
  badges: [
    { id: 'b1', name: 'Nhà Khoa học Nhỏ', description: 'Hoàn thành 5 chủ đề KHTN', emoji: '🔬', earnedAt: '2024-09-15', isEarned: true },
    { id: 'b2', name: 'Người Ghi Chép',   description: 'Tạo 3 notebook đầu tiên',    emoji: '📓', earnedAt: '2024-10-01', isEarned: true },
    { id: 'b3', name: 'Game Master',       description: 'Chơi 10 game học tập',       emoji: '🎮', earnedAt: '2024-10-10', isEarned: true },
    { id: 'b4', name: 'Thư Viện Sĩ',      description: 'Lưu 20 tài nguyên',          emoji: '📚', earnedAt: '2024-10-12', isEarned: true },
    { id: 'b5', name: 'AI Explorer',       description: 'Dùng 5 công cụ AI',          emoji: '🤖', earnedAt: '2024-10-14', isEarned: true },
    { id: 'b6', name: 'Streak 7 ngày',     description: 'Học liên tục 7 ngày',        emoji: '🔥', earnedAt: '2024-10-08', isEarned: true },
    { id: 'b7', name: 'Streak 30 ngày',    description: 'Học liên tục 30 ngày',       emoji: '🏆', isEarned: false },
    { id: 'b8', name: 'Chuyên Gia Hóa',    description: 'Hoàn thành mọi chủ đề Hóa', emoji: '⚗️', isEarned: false },
    { id: 'b9', name: 'Báo Cáo Viên',      description: 'Tạo 5 báo cáo học tập',     emoji: '📊', isEarned: false },
  ],
  recentActivity: [
    { id: 'a1', type: 'game',     title: 'Hoàn thành quiz Điện học lớp 8', description: 'Điểm 9/10 — xuất sắc!', emoji: '⚡', timestamp: '2024-10-15T14:30:00' },
    { id: 'a2', type: 'resource', title: 'Lưu tài liệu "Tổng hợp Vật lí lớp 8"', description: 'Đã thêm vào bộ sưu tập', emoji: '📕', timestamp: '2024-10-15T11:00:00' },
    { id: 'a3', type: 'notebook', title: 'Cập nhật Notebook Điện học', description: 'Thêm 2 công thức mới', emoji: '💡', timestamp: '2024-10-14T20:00:00' },
    { id: 'a4', type: 'ai-tool',  title: 'Tạo flashcard chủ đề Điện học', description: '5 flashcard được tạo tự động', emoji: '🤖', timestamp: '2024-10-14T15:45:00' },
    { id: 'a5', type: 'subject',  title: 'Học bài "Mạch nối tiếp và song song"', description: 'Lớp 8 – Vật lí', emoji: '🔗', timestamp: '2024-10-13T19:30:00' },
    { id: 'a6', type: 'report',   title: 'Tạo báo cáo "Định luật Ohm"', description: 'Xuất PDF thành công', emoji: '📊', timestamp: '2024-10-12T16:00:00' },
    { id: 'a7', type: 'game',     title: 'Chơi Memory Cards Di truyền học', description: 'Điểm 6/6 — hoàn hảo!', emoji: '🧬', timestamp: '2024-10-11T21:00:00' },
  ],
  favoriteTopics: ['Điện học', 'Di truyền', 'Phản ứng hóa học'],
}

export const TEACHER_PROFILE: UserProfile = {
  id: 't1',
  name: 'Nguyễn Thị Thanh Hà',
  email: 'ha.nguyen@thcs-demo.edu.vn',
  role: 'teacher',
  school: 'THCS Nguyễn Du',
  avatar: '👩‍🏫',
  createdAt: '2023-09-01',
}
