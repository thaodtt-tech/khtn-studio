import type { Notebook } from '@/types'

export const NOTEBOOKS: Notebook[] = [
  {
    id: 'nb1',
    title: 'Điện học lớp 8 – Ôn thi HK2',
    description: 'Hệ thống toàn bộ kiến thức điện học: điện trở, định luật Ohm, mạch điện, công suất điện.',
    topic: 'Điện học',
    grade: 8, branch: 'physics', subjectId: 'l8-physics-electricity',
    color: '#6366f1', emoji: '💡',
    sources: [
      { id: 's1', type: 'text', title: 'Ghi chú bài học buổi 1', content: 'Điện trở R = U/I, đơn vị Ohm (Ω). Điện trở phụ thuộc vật liệu, chiều dài, tiết diện.', addedAt: '2024-10-01' },
      { id: 's2', type: 'link', title: 'Video định luật Ohm', url: '#', addedAt: '2024-10-02' },
      { id: 's3', type: 'file', title: 'Đề cương ôn thi HK2.pdf', fileName: 'decuong_hk2.pdf', addedAt: '2024-10-03' },
    ],
    notes: 'Cần ôn lại phần mạch hỗn hợp. Hay nhầm công thức I trong mạch song song.',
    aiSummary: `## Tóm tắt AI: Điện học lớp 8\n\n### Định luật Ohm\nU = I × R — Hiệu điện thế bằng tích cường độ dòng điện và điện trở.\n\n### Mạch nối tiếp\n- R_tđ = R₁ + R₂ + ... \n- I_tổng = I₁ = I₂ (dòng điện bằng nhau)\n- U_tổng = U₁ + U₂ (hiệu điện thế cộng lại)\n\n### Mạch song song\n- 1/R_tđ = 1/R₁ + 1/R₂\n- U_tổng = U₁ = U₂ (hiệu điện thế bằng nhau)\n- I_tổng = I₁ + I₂ (cường độ cộng lại)`,
    keyConcepts: [
      { term: 'Điện trở (R)', definition: 'Đại lượng đặc trưng cho mức độ cản trở dòng điện của vật dẫn.', emoji: 'Ω' },
      { term: 'Định luật Ohm', definition: 'U = I.R — Mối quan hệ giữa hiệu điện thế, cường độ dòng điện và điện trở.', emoji: '⚡' },
      { term: 'Công suất điện', definition: 'P = U.I = I².R = U²/R. Đơn vị Watt (W).', emoji: '💡' },
    ],
    importantQuestions: [
      'Phân biệt mạch nối tiếp và song song về U, I, R?',
      'Tính điện năng tiêu thụ của bóng đèn trong 2 giờ?',
      'Tại sao dây dẫn dài điện trở lớn hơn?',
    ],
    vocabulary: [
      { term: 'Điện trở', meaning: 'Resistance (R) — cản trở dòng điện' },
      { term: 'Cường độ dòng điện', meaning: 'Current (I) — lượng điện tích qua tiết diện/giây' },
      { term: 'Hiệu điện thế', meaning: 'Voltage (U) — sức đẩy điện tích trong mạch' },
    ],
    formulas: [
      { name: 'Định luật Ohm', expression: 'U = I × R', unit: 'V, A, Ω', description: 'Mối quan hệ cơ bản trong mạch điện' },
      { name: 'Công suất điện', expression: 'P = U × I', unit: 'W', description: 'Điện năng tiêu thụ mỗi giây' },
      { name: 'Điện năng', expression: 'A = P × t = U × I × t', unit: 'J hoặc kWh', description: 'Tổng năng lượng điện tiêu thụ' },
    ],
    relatedExerciseIds: [],
    createdAt: '2024-10-01', updatedAt: '2024-10-15', isStarred: true,
  },
  {
    id: 'nb2',
    title: 'Di truyền và AND – Sinh lớp 9',
    description: 'Tổng hợp kiến thức di truyền Mendel, AND, ARN, tổng hợp protein. Có nhiều bài toán mẫu.',
    topic: 'Di truyền',
    grade: 9, branch: 'biology', subjectId: 'l9-biology-genetics',
    color: '#10b981', emoji: '🧬',
    sources: [
      { id: 's1', type: 'text', title: 'Công thức lai một cặp tính trạng', content: 'P: AA × aa → F1: Aa (100% đồng tính). F1 × F1 → F2: 1AA:2Aa:1aa, KH: 3 trội:1 lặn', addedAt: '2024-09-10' },
      { id: 's2', type: 'file', title: 'Bài giảng AND và ARN.pdf', fileName: 'and_arn.pdf', addedAt: '2024-09-12' },
    ],
    notes: 'Hay nhầm ARN thông tin với ARN vận chuyển. Mỗi loại có chức năng khác nhau.',
    aiSummary: `## Tóm tắt AI: Di truyền học\n\n### Định luật Mendel\nLai một cặp: F2 tỉ lệ KG = 1:2:1, tỉ lệ KH = 3:1\n\n### AND\n- Cấu trúc xoắn kép, liên kết theo nguyên tắc bổ sung: A-T, G-X\n- Tự nhân đôi theo nguyên tắc bổ sung và bán bảo tồn\n\n### Tổng hợp Protein\n1. Phiên mã: AND → mARN\n2. Dịch mã: mARN → chuỗi polipeptit`,
    keyConcepts: [
      { term: 'Gen', definition: 'Đoạn AND mang thông tin mã hóa cho một loại protein.', emoji: '🔑' },
      { term: 'Nguyên tắc bổ sung', definition: 'A-T (AND), A-U (ARN), G-X luôn bắt cặp với nhau.', emoji: '🔗' },
      { term: 'Phiên mã', definition: 'Quá trình tổng hợp mARN từ khuôn AND.', emoji: '📋' },
    ],
    importantQuestions: [
      'Nêu nguyên tắc bổ sung trong cấu trúc AND?',
      'Phân biệt nguyên phân và giảm phân?',
      'Biết trình tự AND, hãy xác định trình tự mARN?',
    ],
    vocabulary: [
      { term: 'Gen', meaning: 'Gene — đơn vị di truyền cơ bản' },
      { term: 'Kiểu gen', meaning: 'Genotype — thành phần gen của cá thể' },
      { term: 'Kiểu hình', meaning: 'Phenotype — đặc điểm biểu hiện ra ngoài' },
    ],
    formulas: [
      { name: 'Tỉ lệ bổ sung AND', expression: 'A = T, G = X; A + G = T + X = 50%', unit: '%', description: 'Nguyên tắc Chargaff về thành phần AND' },
      { name: 'Số nucleotid AND', expression: 'N = 2 × số cặp nucleotid', unit: 'nucleotid', description: 'Tổng số nucleotid trong AND mạch kép' },
    ],
    relatedExerciseIds: [],
    createdAt: '2024-09-10', updatedAt: '2024-10-08', isStarred: true,
  },
  {
    id: 'nb3',
    title: 'Tế bào – Kiến thức nền tảng Sinh lớp 6',
    description: 'Cấu tạo và chức năng tế bào thực vật, động vật. Sự phân chia tế bào.',
    topic: 'Tế bào',
    grade: 6, branch: 'biology', subjectId: 'l6-biology-cell',
    color: '#f59e0b', emoji: '🔬',
    sources: [
      { id: 's1', type: 'text', title: 'Cấu tạo tế bào thực vật', content: 'Tế bào TV có: màng tế bào, vách tế bào, nhân, tế bào chất, không bào lớn, lục lạp (tế bào xanh).', addedAt: '2024-08-05' },
    ],
    notes: 'Tế bào thực vật có vách tế bào và lục lạp — tế bào động vật không có.',
    keyConcepts: [
      { term: 'Màng tế bào', definition: 'Lớp màng bán thấm bao quanh tế bào, kiểm soát trao đổi chất.', emoji: '🔵' },
      { term: 'Nhân tế bào', definition: 'Trung tâm điều khiển hoạt động tế bào, chứa AND.', emoji: '⭕' },
      { term: 'Tế bào chất', definition: 'Chất lỏng chứa các bào quan thực hiện các phản ứng sinh hóa.', emoji: '🌊' },
    ],
    importantQuestions: [
      'Điểm khác nhau giữa tế bào thực vật và động vật?',
      'Nhân tế bào có vai trò gì?',
      'Sự phân chia tế bào diễn ra như thế nào?',
    ],
    vocabulary: [
      { term: 'Bào quan', meaning: 'Organelle — cơ quan nhỏ trong tế bào' },
      { term: 'Lục lạp', meaning: 'Chloroplast — bào quan quang hợp ở tế bào thực vật' },
    ],
    formulas: [],
    relatedExerciseIds: [],
    createdAt: '2024-08-05', updatedAt: '2024-09-01', isStarred: false,
  },
  {
    id: 'nb4',
    title: 'Phản ứng hóa học – Hóa 8',
    description: 'Các loại phản ứng, cân bằng phương trình, tính theo PTHH, axit-bazơ-muối.',
    topic: 'Phản ứng hóa học',
    grade: 8, branch: 'chemistry', subjectId: 'l8-chemistry-reaction',
    color: '#f59e0b', emoji: '⚗️',
    sources: [
      { id: 's1', type: 'text', title: 'Phân loại phản ứng', content: 'Phản ứng hóa hợp, phân hủy, thế, trao đổi. Mỗi loại có ví dụ và đặc điểm riêng.', addedAt: '2024-09-05' },
      { id: 's2', type: 'link', title: 'Video: Cân bằng phương trình hóa học', url: '#', addedAt: '2024-09-07' },
    ],
    notes: 'Bài toán hỗn hợp cần lập hệ phương trình. Nhớ kiểm tra sau khi giải.',
    keyConcepts: [
      { term: 'Phản ứng hóa hợp', definition: 'A + B → AB. Hai hay nhiều chất kết hợp tạo một chất mới.', emoji: '➕' },
      { term: 'Phản ứng phân hủy', definition: 'AB → A + B. Một chất bị phân tích thành nhiều chất.', emoji: '💥' },
      { term: 'Mol', definition: 'Đơn vị đo lượng chất. 1 mol = 6,022×10²³ hạt. n = m/M.', emoji: '⚖️' },
    ],
    importantQuestions: [
      'Cân bằng phương trình: Fe + O₂ → Fe₂O₃?',
      'Tính khối lượng CaCO₃ cần để tạo 11,2 lít CO₂ (đktc)?',
      'Phân biệt axit mạnh và axit yếu?',
    ],
    vocabulary: [
      { term: 'Chất phản ứng', meaning: 'Reactant — chất tham gia phản ứng' },
      { term: 'Sản phẩm', meaning: 'Product — chất tạo thành sau phản ứng' },
      { term: 'Hệ số tỉ lệ', meaning: 'Stoichiometric coefficient — số cân bằng trong PTHH' },
    ],
    formulas: [
      { name: 'Số mol', expression: 'n = m / M', unit: 'mol', description: 'Tính số mol từ khối lượng và khối lượng mol' },
      { name: 'Thể tích khí (đktc)', expression: 'V = n × 22,4', unit: 'lít', description: 'Thể tích khí ở điều kiện tiêu chuẩn' },
    ],
    relatedExerciseIds: [],
    createdAt: '2024-09-05', updatedAt: '2024-10-10', isStarred: false,
  },
  {
    id: 'nb5',
    title: 'Tốc độ và Chuyển động – Lý 7',
    description: 'Công thức tốc độ, đồ thị chuyển động, bài toán gặp nhau và đuổi nhau.',
    topic: 'Tốc độ',
    grade: 7, branch: 'physics', subjectId: 'l7-physics-speed',
    color: '#8b5cf6', emoji: '🏃',
    sources: [
      { id: 's1', type: 'text', title: 'Tổng hợp công thức tốc độ', content: 'v = s/t. Đổi đơn vị: 1 m/s = 3,6 km/h. Tốc độ trung bình: v_tb = s_tổng / t_tổng', addedAt: '2024-09-15' },
    ],
    notes: 'Bài toán hai xe: cần xét thời điểm gặp nhau. Lập phương trình s₁ = s₂.',
    keyConcepts: [
      { term: 'Tốc độ', definition: 'Quãng đường đi được trong một đơn vị thời gian. v = s/t.', emoji: '⚡' },
      { term: 'Tốc độ trung bình', definition: 'Tổng quãng đường chia tổng thời gian. Không phải trung bình cộng hai tốc độ.', emoji: '📊' },
    ],
    importantQuestions: [
      'Phân biệt tốc độ tức thời và tốc độ trung bình?',
      'Đọc đồ thị s-t và tính tốc độ từ độ dốc?',
      'Hai xe xuất phát cùng lúc, tính thời gian gặp nhau?',
    ],
    vocabulary: [
      { term: 'Quãng đường', meaning: 'Distance (s) — khoảng cách đi được' },
      { term: 'Thời gian', meaning: 'Time (t) — khoảng thời gian' },
    ],
    formulas: [
      { name: 'Công thức tốc độ', expression: 'v = s / t', unit: 'm/s hoặc km/h', description: 'Công thức cơ bản tính tốc độ' },
      { name: 'Đổi đơn vị', expression: '1 m/s = 3,6 km/h', unit: '—', description: 'Quy đổi đơn vị tốc độ' },
    ],
    relatedExerciseIds: [],
    createdAt: '2024-09-15', updatedAt: '2024-09-28', isStarred: false,
  },
  {
    id: 'nb6',
    title: 'Môi trường và Phát triển bền vững',
    description: 'Ô nhiễm môi trường, biến đổi khí hậu, đa dạng sinh học và SDGs.',
    topic: 'Môi trường',
    grade: 9, branch: 'environment', subjectId: 'l9-environment',
    color: '#0ea5e9', emoji: '🌍',
    sources: [
      { id: 's1', type: 'text', title: 'Các loại ô nhiễm', content: 'Ô nhiễm không khí (SO₂, NOₓ, bụi mịn PM2.5), ô nhiễm nước (kim loại nặng, thuốc trừ sâu), ô nhiễm đất.', addedAt: '2024-10-01' },
      { id: 's2', type: 'link', title: 'Báo cáo IPCC 2023', url: '#', addedAt: '2024-10-05' },
    ],
    notes: '17 mục tiêu SDGs của LHQ. Mục tiêu 13: Hành động về khí hậu.',
    keyConcepts: [
      { term: 'Hiệu ứng nhà kính', definition: 'Khí CO₂, CH₄, H₂O giữ nhiệt trong khí quyển, làm Trái Đất ấm lên.', emoji: '🌡️' },
      { term: 'Đa dạng sinh học', definition: 'Sự phong phú về gen, loài và hệ sinh thái trên Trái Đất.', emoji: '🦋' },
      { term: 'Phát triển bền vững', definition: 'Phát triển đáp ứng nhu cầu hiện tại mà không làm tổn hại đến thế hệ tương lai.', emoji: '♻️' },
    ],
    importantQuestions: [
      'Nguyên nhân chính gây biến đổi khí hậu?',
      'Đa dạng sinh học quan trọng như thế nào?',
      'Học sinh có thể làm gì để bảo vệ môi trường?',
    ],
    vocabulary: [
      { term: 'SDGs', meaning: 'Sustainable Development Goals — 17 mục tiêu phát triển bền vững LHQ' },
      { term: 'Carbon footprint', meaning: 'Lượng CO₂ phát thải do hoạt động của mỗi cá nhân/tổ chức' },
    ],
    formulas: [],
    relatedExerciseIds: [],
    createdAt: '2024-10-01', updatedAt: '2024-10-12', isStarred: true,
  },
]

export function getNotebookById(id: string) {
  return NOTEBOOKS.find(n => n.id === id)
}
