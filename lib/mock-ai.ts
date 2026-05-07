import type { Flashcard, MindMapNode, Report, Grade, SubjectBranch, Notebook } from '@/types'
import { NOTEBOOKS } from '@/data/notebooks'

// Simulates AI processing delay
export function delay(ms = 1500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ─── Mock AI Summary ──────────────────────────────────────────────────────────

export async function mockGenerateSummary(topic: string, content: string): Promise<string> {
  await delay(2000)
  return `## Tóm tắt kiến thức: ${topic}

### Nội dung chính
${content.slice(0, 100)}...

Đây là tóm tắt được tạo bởi AI từ nội dung notebook của bạn. Các khái niệm trọng tâm đã được phân tích và tổng hợp theo cấu trúc học tập hiệu quả.

### Điểm quan trọng cần nhớ
1. Nắm vững định nghĩa và công thức cơ bản
2. Hiểu mối liên hệ giữa các khái niệm
3. Vận dụng vào bài tập thực tế

### Gợi ý ôn tập
- Làm thêm bài tập dạng tính toán
- Vẽ sơ đồ tư duy để hệ thống hóa kiến thức
- Kết hợp với thí nghiệm thực tế`
}

// ─── Mock Flashcards ──────────────────────────────────────────────────────────

export async function mockGenerateFlashcards(
  topic: string, grade: Grade, branch: SubjectBranch
): Promise<Flashcard[]> {
  await delay(2500)
  const templates = [
    { front: `Định nghĩa ${topic} là gì?`, back: `${topic} là hiện tượng/khái niệm mô tả... (nội dung được AI tạo từ tài liệu của bạn)`, hint: 'Nghĩ đến định nghĩa cơ bản nhất' },
    { front: `Công thức tính ${topic}?`, back: `F = m × a (ví dụ minh họa) — AI sẽ điền công thức thực tế từ nội dung notebook`, hint: 'Nhớ các đại lượng trong công thức' },
    { front: `Đơn vị đo của ${topic}?`, back: `Đơn vị SI là... (được trích xuất từ tài liệu của bạn)`, hint: 'Hệ đơn vị quốc tế' },
    { front: `Ứng dụng thực tế của ${topic}?`, back: `Trong đời sống, ${topic} được ứng dụng trong... (AI phân tích từ nguồn tài liệu)`, hint: 'Nghĩ đến cuộc sống hàng ngày' },
    { front: `Phân biệt ${topic} và khái niệm liên quan?`, back: `Điểm khác biệt chính là... (nội dung AI phân tích)`, hint: 'So sánh đặc điểm nổi bật' },
  ]
  return templates.map((t, i) => ({
    id: `fc-${i}`, ...t, grade, branch, topic,
    difficulty: i < 2 ? 'basic' : i < 4 ? 'advanced' : 'gifted',
    isKnown: false,
  }))
}

// ─── Mock Review Questions ────────────────────────────────────────────────────

export async function mockGenerateQuestions(topic: string, count = 5): Promise<string[]> {
  await delay(1800)
  return [
    `${topic} được định nghĩa như thế nào? Cho ví dụ minh họa.`,
    `Nêu các đặc điểm chính của ${topic} và giải thích cơ chế hoạt động.`,
    `So sánh ${topic} với khái niệm liên quan trong chương trình KHTN.`,
    `Trình bày ứng dụng thực tế của ${topic} trong đời sống và khoa học.`,
    `Giải thích mối liên hệ giữa ${topic} và các nội dung đã học trong chương.`,
    `Vận dụng kiến thức về ${topic} để giải quyết bài toán thực tế sau...`,
    `Phân tích nguyên nhân và hệ quả của ${topic}.`,
    `Tại sao ${topic} là khái niệm quan trọng trong môn KHTN?`,
  ].slice(0, count)
}

// ─── Mock Mind Map ────────────────────────────────────────────────────────────

function buildFromNotebook(nb: Notebook): MindMapNode {
  const branches: MindMapNode[] = []

  // Branch 1: Key concepts
  if (nb.keyConcepts?.length) {
    branches.push({
      id: 'c1', label: 'Khái niệm', emoji: '💡', color: '#6366f1',
      children: nb.keyConcepts.slice(0, 4).map((kc, i) => ({
        id: `c1${i}`,
        label: kc.term,
        notes: kc.definition,
      })),
    })
  }

  // Branch 2: Formulas (physics/chemistry) or Vocabulary (biology)
  if (nb.formulas?.length) {
    branches.push({
      id: 'c2', label: 'Công thức', emoji: '📐', color: '#f59e0b',
      children: nb.formulas.slice(0, 4).map((f, i) => ({
        id: `c2${i}`,
        label: f.name,
        notes: `${f.expression}  |  Đơn vị: ${f.unit}\n${f.description}`,
      })),
    })
  } else if (nb.vocabulary?.length) {
    branches.push({
      id: 'c2', label: 'Thuật ngữ', emoji: '📖', color: '#f59e0b',
      children: nb.vocabulary.slice(0, 4).map((v, i) => ({
        id: `c2${i}`,
        label: v.term,
        notes: v.meaning,
      })),
    })
  }

  // Branch 3: Important questions
  if (nb.importantQuestions?.length) {
    branches.push({
      id: 'c3', label: 'Câu hỏi trọng tâm', emoji: '❓', color: '#10b981',
      children: nb.importantQuestions.slice(0, 4).map((q, i) => ({
        id: `c3${i}`,
        label: q.length > 28 ? q.slice(0, 28) + '…' : q,
        notes: q,
      })),
    })
  }

  // Branch 4: Notes & tips
  if (nb.notes) {
    const tips = nb.notes.split(/[.。!]/g).map(s => s.trim()).filter(s => s.length > 5)
    branches.push({
      id: 'c4', label: 'Lưu ý', emoji: '⚠️', color: '#ec4899',
      children: tips.slice(0, 3).map((tip, i) => ({
        id: `c4${i}`,
        label: tip.length > 28 ? tip.slice(0, 28) + '…' : tip,
        notes: tip,
      })),
    })
  }

  return {
    id: 'root',
    label: nb.topic,
    emoji: nb.emoji,
    color: nb.color,
    children: branches,
  }
}

export async function mockGenerateMindMap(topic: string): Promise<MindMapNode> {
  await delay(2000)

  const notebook = NOTEBOOKS.find(nb =>
    nb.topic.toLowerCase().includes(topic.toLowerCase()) ||
    topic.toLowerCase().includes(nb.topic.toLowerCase())
  )
  if (notebook) return buildFromNotebook(notebook)

  // Generic template with notes for unknown topics
  return {
    id: 'root',
    label: topic,
    emoji: '🔬',
    color: '#3b82f6',
    children: [
      {
        id: 'c1', label: 'Khái niệm', emoji: '💡', color: '#6366f1',
        children: [
          { id: 'c1a', label: 'Định nghĩa', notes: `${topic} là khái niệm/hiện tượng khoa học cơ bản trong chương trình KHTN. Nắm rõ định nghĩa và phân biệt với các khái niệm liên quan.` },
          { id: 'c1b', label: 'Lịch sử phát hiện', notes: `Khái niệm ${topic} được nghiên cứu và phát triển qua nhiều thế kỷ, đặt nền móng quan trọng cho khoa học hiện đại.` },
          { id: 'c1c', label: 'Phân loại', notes: `${topic} có thể được phân loại thành nhiều dạng/loại khác nhau tùy theo đặc điểm và điều kiện cụ thể.` },
        ],
      },
      {
        id: 'c2', label: 'Công thức', emoji: '📐', color: '#f59e0b',
        children: [
          { id: 'c2a', label: 'Công thức chính', notes: `Biểu thức toán học mô tả mối quan hệ giữa các đại lượng trong ${topic}. Cần ghi nhớ và hiểu rõ ý nghĩa từng ký hiệu.` },
          { id: 'c2b', label: 'Đơn vị đo', notes: `Mỗi đại lượng trong ${topic} có đơn vị đo riêng theo hệ SI. Lưu ý đổi đơn vị khi giải bài tập.` },
          { id: 'c2c', label: 'Biến đổi công thức', notes: `Từ công thức gốc có thể suy ra các công thức biến đổi để tính từng đại lượng khi biết các đại lượng còn lại.` },
        ],
      },
      {
        id: 'c3', label: 'Ứng dụng', emoji: '⚙️', color: '#10b981',
        children: [
          { id: 'c3a', label: 'Trong đời sống', notes: `${topic} xuất hiện trong nhiều hiện tượng và thiết bị quen thuộc trong cuộc sống hằng ngày. Quan sát xung quanh để nhận biết.` },
          { id: 'c3b', label: 'Trong công nghệ', notes: `Các kỹ sư và nhà khoa học ứng dụng kiến thức về ${topic} trong thiết kế máy móc, thiết bị và công nghệ hiện đại.` },
          { id: 'c3c', label: 'Thí nghiệm liên quan', notes: `Có thể thực hiện thí nghiệm để kiểm chứng lý thuyết về ${topic}. Chuẩn bị dụng cụ và ghi chép kết quả cẩn thận.` },
        ],
      },
      {
        id: 'c4', label: 'Ghi nhớ', emoji: '✅', color: '#ec4899',
        children: [
          { id: 'c4a', label: 'Điểm mấu chốt', notes: `Nắm chắc định nghĩa, công thức cơ bản và điều kiện áp dụng của ${topic}. Đây là nền tảng để giải mọi dạng bài tập.` },
          { id: 'c4b', label: 'Dễ nhầm lẫn', notes: `Học sinh thường nhầm lẫn giữa ${topic} và các khái niệm liên quan. Cần phân biệt rõ từng trường hợp cụ thể.` },
          { id: 'c4c', label: 'Mẹo học thuộc', notes: `Vẽ sơ đồ tư duy, làm bài tập từ dễ đến khó, ôn lại sau mỗi ngày học giúp ghi nhớ ${topic} hiệu quả và lâu dài.` },
        ],
      },
    ],
  }
}

// ─── Mock Report ──────────────────────────────────────────────────────────────

export async function mockGenerateReport(
  topic: string, grade: Grade, branch: SubjectBranch
): Promise<Report> {
  await delay(3000)
  return {
    id: `report-${Date.now()}`,
    title: `Báo cáo học tập: ${topic}`,
    grade, branch, topic,
    objective: `Sau khi học chủ đề "${topic}", học sinh có thể: nắm vững định nghĩa, vận dụng công thức, phân tích hiện tượng thực tế liên quan.`,
    mainContent: [
      `**1. Khái niệm và định nghĩa**\n${topic} là... (nội dung được AI tổng hợp từ notebook và tài liệu của bạn). Đây là một trong những khái niệm nền tảng quan trọng trong chương trình KHTN THCS.`,
      `**2. Các công thức và đại lượng liên quan**\nCông thức cơ bản: F = m.a (ví dụ). Trong đó các đại lượng được mô tả rõ ràng với đơn vị tương ứng.`,
      `**3. Phân tích và giải thích**\nCơ chế hoạt động của ${topic} được hiểu thông qua... Các yếu tố ảnh hưởng bao gồm...`,
      `**4. Thí nghiệm và quan sát**\nĐể kiểm chứng lý thuyết về ${topic}, có thể thực hiện thí nghiệm... với dụng cụ gồm...`,
    ],
    keyConcepts: [
      { term: `Định nghĩa ${topic}`, explanation: 'Là hiện tượng/đại lượng mô tả...' },
      { term: 'Công thức chính', explanation: 'F = m × a — mối quan hệ giữa các đại lượng' },
      { term: 'Điều kiện áp dụng', explanation: 'Áp dụng khi hệ thống đang ở trạng thái...' },
    ],
    examples: [
      { title: 'Ví dụ 1: Tình huống đời sống', content: `Khi ta quan sát ${topic} trong thực tế, ví dụ như... Đây là minh chứng rõ ràng cho lý thuyết.` },
      { title: 'Ví dụ 2: Bài toán tính toán', content: 'Cho m = 5kg, a = 2 m/s². Tính lực tác dụng. Giải: F = m × a = 5 × 2 = 10N.' },
    ],
    reviewQuestions: [
      `Định nghĩa ${topic} và nêu đặc điểm chính?`,
      `Viết công thức tính và giải thích ý nghĩa các đại lượng?`,
      `Cho ví dụ về ứng dụng của ${topic} trong đời sống?`,
      `So sánh ${topic} với khái niệm đã học trước đó?`,
    ],
    conclusion: `Qua bài học về ${topic}, chúng ta hiểu được tầm quan trọng của khái niệm này trong hệ thống kiến thức KHTN. Việc nắm vững lý thuyết kết hợp với thực hành bài tập sẽ giúp vận dụng hiệu quả vào các dạng đề thi.`,
    createdAt: new Date().toISOString(),
  }
}

// ─── Mock Checklist ───────────────────────────────────────────────────────────

export async function mockGenerateChecklist(topic: string): Promise<string[]> {
  await delay(1500)
  return [
    `☐ Nắm vững định nghĩa của ${topic}`,
    `☐ Thuộc công thức và đơn vị đo`,
    `☐ Hiểu điều kiện áp dụng công thức`,
    `☐ Làm được bài tập cơ bản`,
    `☐ Làm được bài tập nâng cao`,
    `☐ Giải thích được hiện tượng thực tế`,
    `☐ Kết nối với các khái niệm liên quan`,
    `☐ Ôn lại thí nghiệm minh họa`,
    `☐ Xem lại các lỗi thường gặp`,
    `☐ Làm bài kiểm tra thử`,
  ]
}
