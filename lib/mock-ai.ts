import type { Flashcard, MindMapNode, Report, Grade, SubjectBranch } from '@/types'

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

export async function mockGenerateMindMap(topic: string): Promise<MindMapNode> {
  await delay(2000)
  return {
    id: 'root',
    label: topic,
    emoji: '🔬',
    color: '#3b82f6',
    children: [
      {
        id: 'c1', label: 'Khái niệm', emoji: '💡', color: '#6366f1',
        children: [
          { id: 'c1a', label: 'Định nghĩa' },
          { id: 'c1b', label: 'Lịch sử phát hiện' },
          { id: 'c1c', label: 'Phân loại' },
        ],
      },
      {
        id: 'c2', label: 'Công thức', emoji: '📐', color: '#f59e0b',
        children: [
          { id: 'c2a', label: 'Công thức chính' },
          { id: 'c2b', label: 'Đơn vị đo' },
          { id: 'c2c', label: 'Biến đổi công thức' },
        ],
      },
      {
        id: 'c3', label: 'Ứng dụng', emoji: '⚙️', color: '#10b981',
        children: [
          { id: 'c3a', label: 'Trong đời sống' },
          { id: 'c3b', label: 'Trong công nghệ' },
          { id: 'c3c', label: 'Thí nghiệm liên quan' },
        ],
      },
      {
        id: 'c4', label: 'Ghi nhớ', emoji: '✅', color: '#ec4899',
        children: [
          { id: 'c4a', label: 'Điểm mấu chốt' },
          { id: 'c4b', label: 'Dễ nhầm lẫn' },
          { id: 'c4c', label: 'Mẹo học thuộc' },
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
