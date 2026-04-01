export const APP_NAME = 'KHTN Studio'
export const APP_TAGLINE = 'Nền tảng học tập Khoa học Tự nhiên THCS'

export const NAV_ITEMS = [
  {
    group: 'Tổng quan',
    items: [
      { href: '/dashboard',  label: 'Trang chủ',        icon: 'Home' },
      { href: '/subjects',   label: 'Khám phá môn học', icon: 'BookOpen' },
      { href: '/resources',  label: 'Thư viện số',       icon: 'Library' },
    ],
  },
  {
    group: 'Học tập cá nhân',
    items: [
      { href: '/my-study',   label: 'Hệ thống ôn tập',  icon: 'FolderOpen' },
      { href: '/notebooks',  label: 'Notebook KHTN',     icon: 'NotebookPen' },
    ],
  },
  {
    group: 'Công cụ AI',
    items: [
      { href: '/ai-tools',   label: 'Công cụ AI',        icon: 'Sparkles' },
      { href: '/reports',    label: 'Báo cáo học tập',   icon: 'FileText' },
      { href: '/mindmaps',   label: 'Sơ đồ tư duy',      icon: 'Network' },
    ],
  },
  {
    group: 'Game học tập',
    items: [
      { href: '/games',      label: 'Thư viện game',     icon: 'Gamepad2' },
      { href: '/teacher',    label: 'Game Studio',       icon: 'PenTool' },
    ],
  },
  {
    group: 'Cá nhân',
    items: [
      { href: '/profile',    label: 'Tiến độ & Hồ sơ',  icon: 'User' },
    ],
  },
]
