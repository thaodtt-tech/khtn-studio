// ─── Subject & Lesson ─────────────────────────────────────────────────────────

export type SubjectBranch = 'physics' | 'chemistry' | 'biology' | 'environment'
export type Grade = 6 | 7 | 8 | 9
export type Difficulty = 'basic' | 'advanced' | 'gifted'

export interface Lesson {
  id: string
  title: string
  description: string
  subjectId: string
  grade: Grade
  branch: SubjectBranch
  difficulty: Difficulty
  exerciseCount: number
  resourceCount: number
  estimatedMinutes: number
  tags: string[]
  coverEmoji: string
  isNew?: boolean
}

export interface Subject {
  id: string
  name: string
  grade: Grade
  branch: SubjectBranch
  description: string
  color: string
  bgColor: string
  emoji: string
  lessonCount: number
  exerciseCount: number
  resourceCount: number
  lessons: Lesson[]
}

// ─── Resource / Digital Library ───────────────────────────────────────────────

export type ResourceType =
  | 'article'
  | 'pdf'
  | 'image'
  | 'video'
  | 'mindmap'
  | 'exercise'
  | 'simulation'
  | 'experiment'

export interface Resource {
  id: string
  title: string
  description: string
  type: ResourceType
  grade: Grade
  branch: SubjectBranch
  topic: string
  subjectId: string
  url?: string
  thumbnailEmoji: string
  author: string
  savedCount: number
  viewCount: number
  createdAt: string
  tags: string[]
  isFeatured?: boolean
}

export interface DigitalLibraryConfig {
  id: string
  name: string
  description: string
  url: string
  apiEndpoint?: string
  resourceType: ResourceType[]
  subjectTag: string[]
  logoEmoji: string
}

// ─── Notebook ─────────────────────────────────────────────────────────────────

export interface NotebookSource {
  id: string
  type: 'text' | 'link' | 'file'
  title: string
  content?: string
  url?: string
  fileName?: string
  addedAt: string
}

export interface KeyConcept {
  term: string
  definition: string
  emoji?: string
}

export interface Formula {
  name: string
  expression: string
  unit?: string
  description: string
}

export interface Notebook {
  id: string
  title: string
  description: string
  topic: string
  grade: Grade
  branch: SubjectBranch
  subjectId: string
  color: string
  emoji: string
  sources: NotebookSource[]
  notes: string
  aiSummary?: string
  keyConcepts: KeyConcept[]
  importantQuestions: string[]
  vocabulary: { term: string; meaning: string }[]
  formulas: Formula[]
  relatedExerciseIds: string[]
  createdAt: string
  updatedAt: string
  isStarred?: boolean
}

// ─── Study System ─────────────────────────────────────────────────────────────

export type StudyItemType =
  | 'note'
  | 'question'
  | 'exercise'
  | 'formula'
  | 'resource'
  | 'experiment'

export interface StudyItem {
  id: string
  type: StudyItemType
  title: string
  content: string
  grade?: Grade
  branch?: SubjectBranch
  tags: string[]
  isFlagged: boolean
  createdAt: string
  updatedAt: string
  notebookId?: string
}

// ─── Flashcard ────────────────────────────────────────────────────────────────

export interface Flashcard {
  id: string
  front: string
  back: string
  hint?: string
  grade: Grade
  branch: SubjectBranch
  topic: string
  difficulty: Difficulty
  isKnown?: boolean
}

// ─── Mind Map ─────────────────────────────────────────────────────────────────

export interface MindMapNode {
  id: string
  label: string
  emoji?: string
  color?: string
  children?: MindMapNode[]
  notes?: string
}

export interface MindMap {
  id: string
  title: string
  rootNode: MindMapNode
  grade: Grade
  branch: SubjectBranch
  createdAt: string
  notebookId?: string
}

// ─── Report ───────────────────────────────────────────────────────────────────

export interface Report {
  id: string
  title: string
  grade: Grade
  branch: SubjectBranch
  topic: string
  objective: string
  mainContent: string[]
  keyConcepts: { term: string; explanation: string }[]
  examples: { title: string; content: string }[]
  reviewQuestions: string[]
  conclusion: string
  createdAt: string
  notebookId?: string
}

// ─── Game ─────────────────────────────────────────────────────────────────────

export type GameType =
  | 'quiz'
  | 'flashcard-match'
  | 'drag-drop'
  | 'memory'
  | 'fill-blank'
  | 'crossword'

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  imageEmoji?: string
  difficulty: Difficulty
}

export interface GameQuestion {
  id: string
  type: 'quiz' | 'fill-blank' | 'match'
  question: string
  answer: string
  options?: string[]
  correctIndex?: number
  explanation: string
}

export interface Game {
  id: string
  title: string
  description: string
  type: GameType
  grade: Grade
  branch: SubjectBranch
  topic: string
  emoji: string
  color: string
  bgColor: string
  questions: GameQuestion[]
  createdBy: 'teacher' | 'system'
  teacherName?: string
  playCount: number
  rating: number
  estimatedMinutes: number
  isPublished: boolean
  createdAt: string
}

// ─── User / Progress ──────────────────────────────────────────────────────────

export type UserRole = 'student' | 'teacher' | 'admin'

export interface UserProfile {
  id: string
  name: string
  email: string
  role: UserRole
  grade?: Grade
  class?: string
  school: string
  avatar: string
  createdAt: string
}

export interface BadgeItem {
  id: string
  name: string
  description: string
  emoji: string
  earnedAt?: string
  isEarned: boolean
}

export interface ActivityLog {
  id: string
  type: 'subject' | 'resource' | 'notebook' | 'game' | 'ai-tool' | 'report'
  title: string
  description: string
  emoji: string
  timestamp: string
}

export interface UserProgress {
  userId: string
  totalSubjectsStudied: number
  totalResourcesSaved: number
  totalNotebooksCreated: number
  totalGamesPlayed: number
  totalAIToolsUsed: number
  totalReportsGenerated: number
  studyStreakDays: number
  weeklyStudyMinutes: number[]
  subjectBreakdown: { branch: SubjectBranch; minutes: number; color: string }[]
  badges: BadgeItem[]
  recentActivity: ActivityLog[]
  favoriteTopics: string[]
}
