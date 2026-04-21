export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'student' | 'teacher' | 'admin'
  grade?: string
  class?: string
  school: string
  avatar: string
}

const STORAGE_KEY = 'khtn_auth_user'

const DEMO_USERS: (AuthUser & { password: string })[] = [
  {
    id: 'u1',
    email: 'hocsinh@dim-sciences.edu.vn',
    password: 'hocsinh2024',
    name: 'Nguyễn Nguyên Bảo',
    role: 'student',
    grade: '6',
    class: '6A7',
    school: 'THCS Dịch Vọng Hậu',
    avatar: '🎓',
  },
  {
    id: 'u2',
    email: 'giaovien@dim-sciences.edu.vn',
    password: 'giaovien2024',
    name: 'Trần Thị Lan Anh',
    role: 'teacher',
    school: 'THCS Dịch Vọng Hậu',
    avatar: '👩‍🏫',
  },
  {
    id: 'u3',
    email: 'admin@dim-sciences.edu.vn',
    password: 'admin2024',
    name: 'Admin KHTN Studio',
    role: 'admin',
    school: 'KHTN Studio',
    avatar: '⚙️',
  },
]

export function login(email: string, password: string): AuthUser | null {
  const found = DEMO_USERS.find(
    u => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
  )
  if (!found) return null
  const { password: _, ...user } = found
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  }
  return user
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY)
  }
}

export function getUser(): AuthUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

export function isAuthenticated(): boolean {
  return getUser() !== null
}
