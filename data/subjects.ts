import type { Subject } from '@/types'

export const SUBJECTS: Subject[] = [
  // ── LỚP 6 ────────────────────────────────────────────────────────────────
  {
    id: 'l6-biology-cell',
    name: 'Tế bào – Đơn vị cơ bản của sự sống',
    grade: 6, branch: 'biology',
    description: 'Khám phá cấu trúc, chức năng và sự phân chia của tế bào. Nền tảng để hiểu toàn bộ sinh học.',
    color: 'text-emerald-700', bgColor: 'bg-emerald-50', emoji: '🔬',
    lessonCount: 5, exerciseCount: 24, resourceCount: 12,
    lessons: [
      { id: 'l6b1', title: 'Khái niệm và cấu tạo tế bào', description: 'Tế bào là gì? Cấu tạo màng tế bào, nhân và tế bào chất.', subjectId: 'l6-biology-cell', grade: 6, branch: 'biology', difficulty: 'basic', exerciseCount: 5, resourceCount: 3, estimatedMinutes: 35, tags: ['tế bào', 'cấu tạo', 'cơ bản'], coverEmoji: '🦠', isNew: false },
      { id: 'l6b2', title: 'Sự phân chia tế bào', description: 'Nguyên phân, giảm phân và vai trò trong sinh trưởng.', subjectId: 'l6-biology-cell', grade: 6, branch: 'biology', difficulty: 'advanced', exerciseCount: 6, resourceCount: 4, estimatedMinutes: 45, tags: ['phân chia', 'nguyên phân'], coverEmoji: '🔀', isNew: false },
      { id: 'l6b3', title: 'Tế bào thực vật và tế bào động vật', description: 'Điểm giống và khác nhau giữa hai loại tế bào.', subjectId: 'l6-biology-cell', grade: 6, branch: 'biology', difficulty: 'basic', exerciseCount: 5, resourceCount: 3, estimatedMinutes: 30, tags: ['so sánh', 'thực vật', 'động vật'], coverEmoji: '🌿', isNew: false },
      { id: 'l6b4', title: 'Mô và cơ quan', description: 'Từ tế bào đến mô, từ mô đến cơ quan. Cấp độ tổ chức của cơ thể.', subjectId: 'l6-biology-cell', grade: 6, branch: 'biology', difficulty: 'basic', exerciseCount: 4, resourceCount: 2, estimatedMinutes: 30, tags: ['mô', 'cơ quan'], coverEmoji: '🫀', isNew: false },
      { id: 'l6b5', title: 'Bài tập tổng hợp về tế bào', description: 'Ôn tập và nâng cao toàn bộ kiến thức chương tế bào.', subjectId: 'l6-biology-cell', grade: 6, branch: 'biology', difficulty: 'gifted', exerciseCount: 4, resourceCount: 0, estimatedMinutes: 50, tags: ['ôn tập', 'bồi dưỡng'], coverEmoji: '📝', isNew: false },
    ],
  },
  {
    id: 'l6-physics-force',
    name: 'Lực và Năng lượng',
    grade: 6, branch: 'physics',
    description: 'Khái niệm lực, tác dụng của lực, các loại lực trong tự nhiên và năng lượng.',
    color: 'text-indigo-700', bgColor: 'bg-indigo-50', emoji: '⚡',
    lessonCount: 4, exerciseCount: 20, resourceCount: 10,
    lessons: [
      { id: 'l6p1', title: 'Lực là gì?', description: 'Định nghĩa lực, tác dụng đẩy/kéo, biểu diễn lực bằng mũi tên.', subjectId: 'l6-physics-force', grade: 6, branch: 'physics', difficulty: 'basic', exerciseCount: 5, resourceCount: 3, estimatedMinutes: 30, tags: ['lực', 'định nghĩa'], coverEmoji: '↗️', isNew: false },
      { id: 'l6p2', title: 'Trọng lực và lực ma sát', description: 'Trọng lực, trọng lượng, lực ma sát và ứng dụng.', subjectId: 'l6-physics-force', grade: 6, branch: 'physics', difficulty: 'basic', exerciseCount: 5, resourceCount: 2, estimatedMinutes: 35, tags: ['trọng lực', 'ma sát'], coverEmoji: '🏋️', isNew: false },
      { id: 'l6p3', title: 'Năng lượng và các dạng năng lượng', description: 'Năng lượng cơ học, nhiệt, điện, ánh sáng. Sự chuyển hóa năng lượng.', subjectId: 'l6-physics-force', grade: 6, branch: 'physics', difficulty: 'advanced', exerciseCount: 5, resourceCount: 3, estimatedMinutes: 40, tags: ['năng lượng', 'chuyển hóa'], coverEmoji: '🔋', isNew: true },
      { id: 'l6p4', title: 'Bài tập về lực và năng lượng', description: 'Tổng hợp và nâng cao toàn chương.', subjectId: 'l6-physics-force', grade: 6, branch: 'physics', difficulty: 'gifted', exerciseCount: 5, resourceCount: 2, estimatedMinutes: 55, tags: ['ôn tập', 'nâng cao'], coverEmoji: '📋', isNew: false },
    ],
  },
  {
    id: 'l6-chemistry-matter',
    name: 'Chất và Sự biến đổi của chất',
    grade: 6, branch: 'chemistry',
    description: 'Chất tinh khiết và hỗn hợp, tính chất vật lí và hóa học, sự biến đổi chất.',
    color: 'text-amber-700', bgColor: 'bg-amber-50', emoji: '🧪',
    lessonCount: 4, exerciseCount: 18, resourceCount: 9,
    lessons: [
      { id: 'l6c1', title: 'Chất tinh khiết và hỗn hợp', description: 'Phân biệt chất tinh khiết, hỗn hợp đồng nhất và không đồng nhất.', subjectId: 'l6-chemistry-matter', grade: 6, branch: 'chemistry', difficulty: 'basic', exerciseCount: 4, resourceCount: 2, estimatedMinutes: 30, tags: ['chất', 'hỗn hợp'], coverEmoji: '⚗️', isNew: false },
      { id: 'l6c2', title: 'Tính chất và sự biến đổi vật lí', description: 'Màu sắc, mùi vị, nhiệt độ sôi/nóng chảy và biến đổi vật lí.', subjectId: 'l6-chemistry-matter', grade: 6, branch: 'chemistry', difficulty: 'basic', exerciseCount: 4, resourceCount: 2, estimatedMinutes: 30, tags: ['vật lí', 'biến đổi'], coverEmoji: '🌡️', isNew: false },
      { id: 'l6c3', title: 'Biến đổi hóa học', description: 'Phản ứng hóa học cơ bản, dấu hiệu nhận biết biến đổi hóa học.', subjectId: 'l6-chemistry-matter', grade: 6, branch: 'chemistry', difficulty: 'advanced', exerciseCount: 5, resourceCount: 3, estimatedMinutes: 45, tags: ['hóa học', 'phản ứng'], coverEmoji: '💥', isNew: false },
      { id: 'l6c4', title: 'Tách chất ra khỏi hỗn hợp', description: 'Lọc, chưng cất, chiết và cô cạn trong phòng thí nghiệm.', subjectId: 'l6-chemistry-matter', grade: 6, branch: 'chemistry', difficulty: 'advanced', exerciseCount: 5, resourceCount: 2, estimatedMinutes: 40, tags: ['tách chất', 'thí nghiệm'], coverEmoji: '🧫', isNew: true },
    ],
  },

  // ── LỚP 7 ────────────────────────────────────────────────────────────────
  {
    id: 'l7-physics-speed',
    name: 'Tốc độ và Chuyển động',
    grade: 7, branch: 'physics',
    description: 'Tốc độ, vận tốc, chuyển động thẳng đều và không đều. Phương trình chuyển động.',
    color: 'text-indigo-700', bgColor: 'bg-indigo-50', emoji: '🏃',
    lessonCount: 5, exerciseCount: 28, resourceCount: 11,
    lessons: [
      { id: 'l7p1', title: 'Tốc độ – Định nghĩa và công thức', description: 'v = s/t. Đơn vị m/s và km/h. Ý nghĩa tốc độ.', subjectId: 'l7-physics-speed', grade: 7, branch: 'physics', difficulty: 'basic', exerciseCount: 6, resourceCount: 2, estimatedMinutes: 35, tags: ['tốc độ', 'công thức'], coverEmoji: '⏱️', isNew: false },
      { id: 'l7p2', title: 'Đồ thị chuyển động', description: 'Đọc và vẽ đồ thị s-t, v-t của chuyển động.', subjectId: 'l7-physics-speed', grade: 7, branch: 'physics', difficulty: 'advanced', exerciseCount: 6, resourceCount: 3, estimatedMinutes: 50, tags: ['đồ thị', 'chuyển động'], coverEmoji: '📈', isNew: false },
      { id: 'l7p3', title: 'Chuyển động thẳng đều', description: 'Đặc điểm, phương trình và bài toán chuyển động thẳng đều.', subjectId: 'l7-physics-speed', grade: 7, branch: 'physics', difficulty: 'basic', exerciseCount: 6, resourceCount: 2, estimatedMinutes: 35, tags: ['thẳng đều', 'đặc điểm'], coverEmoji: '➡️', isNew: false },
      { id: 'l7p4', title: 'Chuyển động không đều', description: 'Tốc độ trung bình, bài toán chuyển động hai chiều.', subjectId: 'l7-physics-speed', grade: 7, branch: 'physics', difficulty: 'advanced', exerciseCount: 5, resourceCount: 2, estimatedMinutes: 45, tags: ['không đều', 'trung bình'], coverEmoji: '〰️', isNew: false },
      { id: 'l7p5', title: 'Bài tập nâng cao tốc độ', description: 'Bài toán gặp nhau, đuổi nhau, tốc độ tương đối.', subjectId: 'l7-physics-speed', grade: 7, branch: 'physics', difficulty: 'gifted', exerciseCount: 5, resourceCount: 2, estimatedMinutes: 60, tags: ['nâng cao', 'bồi dưỡng'], coverEmoji: '🏆', isNew: false },
    ],
  },
  {
    id: 'l7-biology-metabolism',
    name: 'Trao đổi chất và Năng lượng',
    grade: 7, branch: 'biology',
    description: 'Quang hợp, hô hấp tế bào, chuỗi thức ăn và dòng năng lượng trong hệ sinh thái.',
    color: 'text-emerald-700', bgColor: 'bg-emerald-50', emoji: '🌿',
    lessonCount: 4, exerciseCount: 20, resourceCount: 9,
    lessons: [
      { id: 'l7bio1', title: 'Quang hợp ở thực vật', description: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. Điều kiện và ý nghĩa.', subjectId: 'l7-biology-metabolism', grade: 7, branch: 'biology', difficulty: 'basic', exerciseCount: 5, resourceCount: 3, estimatedMinutes: 35, tags: ['quang hợp', 'thực vật'], coverEmoji: '🌱', isNew: false },
      { id: 'l7bio2', title: 'Hô hấp tế bào', description: 'Quá trình phân giải glucôzơ giải phóng năng lượng ATP.', subjectId: 'l7-biology-metabolism', grade: 7, branch: 'biology', difficulty: 'advanced', exerciseCount: 5, resourceCount: 2, estimatedMinutes: 40, tags: ['hô hấp', 'ATP'], coverEmoji: '💨', isNew: false },
      { id: 'l7bio3', title: 'Chuỗi và lưới thức ăn', description: 'Chuỗi thức ăn, lưới thức ăn, bậc dinh dưỡng và dòng năng lượng.', subjectId: 'l7-biology-metabolism', grade: 7, branch: 'biology', difficulty: 'basic', exerciseCount: 5, resourceCount: 2, estimatedMinutes: 35, tags: ['chuỗi thức ăn', 'sinh thái'], coverEmoji: '🦁', isNew: true },
      { id: 'l7bio4', title: 'Bài tập trao đổi chất', description: 'Ôn tập và nâng cao toàn chương.', subjectId: 'l7-biology-metabolism', grade: 7, branch: 'biology', difficulty: 'gifted', exerciseCount: 5, resourceCount: 2, estimatedMinutes: 55, tags: ['ôn tập'], coverEmoji: '📝', isNew: false },
    ],
  },

  // ── LỚP 8 ────────────────────────────────────────────────────────────────
  {
    id: 'l8-chemistry-reaction',
    name: 'Phản ứng hóa học',
    grade: 8, branch: 'chemistry',
    description: 'Phương trình hóa học, các loại phản ứng, tốc độ phản ứng và cân bằng hóa học.',
    color: 'text-amber-700', bgColor: 'bg-amber-50', emoji: '⚗️',
    lessonCount: 5, exerciseCount: 30, resourceCount: 14,
    lessons: [
      { id: 'l8c1', title: 'Phương trình hóa học', description: 'Cân bằng phương trình hóa học. Ý nghĩa và cách lập.', subjectId: 'l8-chemistry-reaction', grade: 8, branch: 'chemistry', difficulty: 'basic', exerciseCount: 7, resourceCount: 3, estimatedMinutes: 40, tags: ['phương trình', 'cân bằng'], coverEmoji: '⚖️', isNew: false },
      { id: 'l8c2', title: 'Oxi hóa – Khử', description: 'Chất oxi hóa, chất khử, phản ứng oxi hóa khử và cân bằng.', subjectId: 'l8-chemistry-reaction', grade: 8, branch: 'chemistry', difficulty: 'advanced', exerciseCount: 7, resourceCount: 3, estimatedMinutes: 55, tags: ['oxi hóa', 'khử'], coverEmoji: '🔥', isNew: false },
      { id: 'l8c3', title: 'Axit – Bazơ – Muối', description: 'Tính chất hóa học, cách nhận biết và phản ứng trung hòa.', subjectId: 'l8-chemistry-reaction', grade: 8, branch: 'chemistry', difficulty: 'advanced', exerciseCount: 8, resourceCount: 4, estimatedMinutes: 60, tags: ['axit', 'bazơ', 'muối'], coverEmoji: '🧲', isNew: false },
      { id: 'l8c4', title: 'Mol và tính toán hóa học', description: 'Khái niệm mol, khối lượng mol, thể tích mol khí.', subjectId: 'l8-chemistry-reaction', grade: 8, branch: 'chemistry', difficulty: 'advanced', exerciseCount: 5, resourceCount: 2, estimatedMinutes: 50, tags: ['mol', 'tính toán'], coverEmoji: '🔢', isNew: false },
      { id: 'l8c5', title: 'Bài toán hóa học nâng cao', description: 'Hỗn hợp, hiệu suất phản ứng, bài toán bồi dưỡng.', subjectId: 'l8-chemistry-reaction', grade: 8, branch: 'chemistry', difficulty: 'gifted', exerciseCount: 3, resourceCount: 2, estimatedMinutes: 70, tags: ['bồi dưỡng', 'hỗn hợp'], coverEmoji: '🏆', isNew: true },
    ],
  },
  {
    id: 'l8-physics-electricity',
    name: 'Dòng điện và Mạch điện',
    grade: 8, branch: 'physics',
    description: 'Cường độ dòng điện, hiệu điện thế, điện trở, định luật Ohm, mạch nối tiếp và song song.',
    color: 'text-indigo-700', bgColor: 'bg-indigo-50', emoji: '💡',
    lessonCount: 5, exerciseCount: 32, resourceCount: 15,
    lessons: [
      { id: 'l8p1', title: 'Cường độ dòng điện và Hiệu điện thế', description: 'I (A), U (V), dụng cụ đo ampe kế và vôn kế.', subjectId: 'l8-physics-electricity', grade: 8, branch: 'physics', difficulty: 'basic', exerciseCount: 6, resourceCount: 3, estimatedMinutes: 35, tags: ['dòng điện', 'hiệu điện thế'], coverEmoji: '🔌', isNew: false },
      { id: 'l8p2', title: 'Điện trở – Định luật Ohm', description: 'U = I.R. Ý nghĩa và ứng dụng định luật Ohm.', subjectId: 'l8-physics-electricity', grade: 8, branch: 'physics', difficulty: 'basic', exerciseCount: 7, resourceCount: 3, estimatedMinutes: 40, tags: ['điện trở', 'Ohm'], coverEmoji: 'Ω', isNew: false },
      { id: 'l8p3', title: 'Mạch nối tiếp và song song', description: 'Công thức tính điện trở tương đương, I và U trong từng mạch.', subjectId: 'l8-physics-electricity', grade: 8, branch: 'physics', difficulty: 'advanced', exerciseCount: 8, resourceCount: 4, estimatedMinutes: 55, tags: ['nối tiếp', 'song song'], coverEmoji: '🔗', isNew: false },
      { id: 'l8p4', title: 'Công và Công suất điện', description: 'P = U.I = I².R. Điện năng tiêu thụ và hiệu suất.', subjectId: 'l8-physics-electricity', grade: 8, branch: 'physics', difficulty: 'advanced', exerciseCount: 6, resourceCount: 3, estimatedMinutes: 50, tags: ['công suất', 'điện năng'], coverEmoji: '⚡', isNew: false },
      { id: 'l8p5', title: 'Bài tập mạch điện nâng cao', description: 'Mạch hỗn hợp, bài toán bồi dưỡng điện học.', subjectId: 'l8-physics-electricity', grade: 8, branch: 'physics', difficulty: 'gifted', exerciseCount: 5, resourceCount: 2, estimatedMinutes: 75, tags: ['bồi dưỡng', 'mạch hỗn hợp'], coverEmoji: '🏆', isNew: true },
    ],
  },

  // ── LỚP 9 ────────────────────────────────────────────────────────────────
  {
    id: 'l9-biology-genetics',
    name: 'Di truyền và Biến dị',
    grade: 9, branch: 'biology',
    description: 'Định luật Mendel, AND, ARN, protein và cơ chế di truyền. Đột biến và ứng dụng.',
    color: 'text-emerald-700', bgColor: 'bg-emerald-50', emoji: '🧬',
    lessonCount: 6, exerciseCount: 28, resourceCount: 13,
    lessons: [
      { id: 'l9bio1', title: 'Định luật Mendel', description: 'Lai một cặp tính trạng, tỉ lệ 3:1, kiểu gen và kiểu hình.', subjectId: 'l9-biology-genetics', grade: 9, branch: 'biology', difficulty: 'basic', exerciseCount: 5, resourceCount: 2, estimatedMinutes: 40, tags: ['Mendel', 'di truyền'], coverEmoji: '🐇', isNew: false },
      { id: 'l9bio2', title: 'AND và ARN', description: 'Cấu trúc AND, nguyên tắc bổ sung, quá trình tự nhân đôi AND.', subjectId: 'l9-biology-genetics', grade: 9, branch: 'biology', difficulty: 'advanced', exerciseCount: 5, resourceCount: 3, estimatedMinutes: 50, tags: ['AND', 'ARN'], coverEmoji: '🧬', isNew: false },
      { id: 'l9bio3', title: 'Tổng hợp Protein', description: 'Phiên mã, dịch mã và tổng hợp chuỗi polipeptit.', subjectId: 'l9-biology-genetics', grade: 9, branch: 'biology', difficulty: 'advanced', exerciseCount: 5, resourceCount: 3, estimatedMinutes: 55, tags: ['protein', 'phiên mã'], coverEmoji: '🔗', isNew: false },
      { id: 'l9bio4', title: 'Đột biến gen và nhiễm sắc thể', description: 'Các dạng đột biến, nguyên nhân và hậu quả.', subjectId: 'l9-biology-genetics', grade: 9, branch: 'biology', difficulty: 'advanced', exerciseCount: 5, resourceCount: 2, estimatedMinutes: 45, tags: ['đột biến'], coverEmoji: '⚠️', isNew: true },
      { id: 'l9bio5', title: 'Ứng dụng di truyền học', description: 'Chọn giống, kĩ thuật AND tái tổ hợp, liệu pháp gen.', subjectId: 'l9-biology-genetics', grade: 9, branch: 'biology', difficulty: 'basic', exerciseCount: 4, resourceCount: 2, estimatedMinutes: 35, tags: ['ứng dụng', 'chọn giống'], coverEmoji: '🌾', isNew: false },
      { id: 'l9bio6', title: 'Bài tập di truyền nâng cao', description: 'Bài toán phả hệ, lai hai cặp tính trạng, bồi dưỡng.', subjectId: 'l9-biology-genetics', grade: 9, branch: 'biology', difficulty: 'gifted', exerciseCount: 4, resourceCount: 1, estimatedMinutes: 75, tags: ['bồi dưỡng', 'phả hệ'], coverEmoji: '🏆', isNew: false },
    ],
  },
  {
    id: 'l9-environment',
    name: 'Môi trường và Phát triển bền vững',
    grade: 9, branch: 'environment',
    description: 'Ô nhiễm môi trường, biến đổi khí hậu, bảo tồn đa dạng sinh học và phát triển bền vững.',
    color: 'text-sky-700', bgColor: 'bg-sky-50', emoji: '🌍',
    lessonCount: 4, exerciseCount: 16, resourceCount: 10,
    lessons: [
      { id: 'l9env1', title: 'Ô nhiễm môi trường', description: 'Các loại ô nhiễm: không khí, nước, đất. Nguyên nhân và hậu quả.', subjectId: 'l9-environment', grade: 9, branch: 'environment', difficulty: 'basic', exerciseCount: 4, resourceCount: 3, estimatedMinutes: 30, tags: ['ô nhiễm', 'môi trường'], coverEmoji: '🌫️', isNew: false },
      { id: 'l9env2', title: 'Biến đổi khí hậu', description: 'Hiệu ứng nhà kính, nóng lên toàn cầu và giải pháp.', subjectId: 'l9-environment', grade: 9, branch: 'environment', difficulty: 'basic', exerciseCount: 4, resourceCount: 3, estimatedMinutes: 35, tags: ['khí hậu', 'nhà kính'], coverEmoji: '🌡️', isNew: false },
      { id: 'l9env3', title: 'Đa dạng sinh học', description: 'Giá trị đa dạng sinh học, nguy cơ tuyệt chủng và bảo tồn.', subjectId: 'l9-environment', grade: 9, branch: 'environment', difficulty: 'advanced', exerciseCount: 4, resourceCount: 2, estimatedMinutes: 35, tags: ['đa dạng sinh học', 'bảo tồn'], coverEmoji: '🦋', isNew: true },
      { id: 'l9env4', title: 'Phát triển bền vững', description: 'Khái niệm, mục tiêu SDGs và hành động của mỗi học sinh.', subjectId: 'l9-environment', grade: 9, branch: 'environment', difficulty: 'basic', exerciseCount: 4, resourceCount: 2, estimatedMinutes: 30, tags: ['bền vững', 'SDG'], coverEmoji: '♻️', isNew: false },
    ],
  },
  {
    id: 'l9-chemistry-organic',
    name: 'Hợp chất hữu cơ',
    grade: 9, branch: 'chemistry',
    description: 'Hidrocacbon, dẫn xuất halogen, ancol, axit hữu cơ, este và polime.',
    color: 'text-amber-700', bgColor: 'bg-amber-50', emoji: '🧫',
    lessonCount: 5, exerciseCount: 25, resourceCount: 11,
    lessons: [
      { id: 'l9org1', title: 'Hidrocacbon – Metan, Etan, Etilen', description: 'Cấu trúc, tính chất và ứng dụng các hidrocacbon đơn giản.', subjectId: 'l9-chemistry-organic', grade: 9, branch: 'chemistry', difficulty: 'basic', exerciseCount: 5, resourceCount: 2, estimatedMinutes: 40, tags: ['hidrocacbon', 'metan'], coverEmoji: '⛽', isNew: false },
      { id: 'l9org2', title: 'Ancol và Axit hữu cơ', description: 'Cấu trúc, tính chất hóa học và phản ứng đặc trưng.', subjectId: 'l9-chemistry-organic', grade: 9, branch: 'chemistry', difficulty: 'advanced', exerciseCount: 6, resourceCount: 3, estimatedMinutes: 50, tags: ['ancol', 'axit hữu cơ'], coverEmoji: '🍷', isNew: false },
      { id: 'l9org3', title: 'Glucozơ và Saccarozơ', description: 'Carbohydrate cơ bản, phản ứng tráng bạc và nhận biết.', subjectId: 'l9-chemistry-organic', grade: 9, branch: 'chemistry', difficulty: 'advanced', exerciseCount: 5, resourceCount: 2, estimatedMinutes: 45, tags: ['glucozơ', 'carbohydrate'], coverEmoji: '🍬', isNew: false },
      { id: 'l9org4', title: 'Polime và Vật liệu', description: 'Nhựa, cao su, tơ và các vật liệu polime ứng dụng thực tế.', subjectId: 'l9-chemistry-organic', grade: 9, branch: 'chemistry', difficulty: 'basic', exerciseCount: 5, resourceCount: 2, estimatedMinutes: 35, tags: ['polime', 'vật liệu'], coverEmoji: '🧴', isNew: true },
      { id: 'l9org5', title: 'Bài toán hữu cơ nâng cao', description: 'Xác định CTPT, chuỗi phản ứng và bài toán hỗn hợp hữu cơ.', subjectId: 'l9-chemistry-organic', grade: 9, branch: 'chemistry', difficulty: 'gifted', exerciseCount: 4, resourceCount: 2, estimatedMinutes: 70, tags: ['bồi dưỡng', 'nâng cao'], coverEmoji: '🏆', isNew: false },
    ],
  },
  {
    id: 'l9-physics-electromagnetism',
    name: 'Điện từ học',
    grade: 9, branch: 'physics',
    description: 'Nam châm, lực từ, cảm ứng điện từ, máy biến thế và ứng dụng kĩ thuật.',
    color: 'text-indigo-700', bgColor: 'bg-indigo-50', emoji: '🧲',
    lessonCount: 5, exerciseCount: 22, resourceCount: 10,
    lessons: [
      { id: 'l9phys1', title: 'Nam châm và Từ trường', description: 'Tính chất nam châm, đường sức từ, từ trường Trái Đất.', subjectId: 'l9-physics-electromagnetism', grade: 9, branch: 'physics', difficulty: 'basic', exerciseCount: 4, resourceCount: 2, estimatedMinutes: 30, tags: ['nam châm', 'từ trường'], coverEmoji: '🧲', isNew: false },
      { id: 'l9phys2', title: 'Lực từ – Quy tắc bàn tay trái', description: 'Lực Lorentz, F = B.I.l, quy tắc bàn tay trái.', subjectId: 'l9-physics-electromagnetism', grade: 9, branch: 'physics', difficulty: 'advanced', exerciseCount: 5, resourceCount: 2, estimatedMinutes: 45, tags: ['lực từ', 'Lorentz'], coverEmoji: '✋', isNew: false },
      { id: 'l9phys3', title: 'Cảm ứng điện từ', description: 'Từ thông, định luật Faraday, hiện tượng cảm ứng điện từ.', subjectId: 'l9-physics-electromagnetism', grade: 9, branch: 'physics', difficulty: 'advanced', exerciseCount: 5, resourceCount: 2, estimatedMinutes: 50, tags: ['cảm ứng', 'Faraday'], coverEmoji: '🌀', isNew: false },
      { id: 'l9phys4', title: 'Máy biến thế và Truyền tải điện', description: 'Nguyên lí máy biến thế, n₁/n₂ = U₁/U₂ = I₂/I₁.', subjectId: 'l9-physics-electromagnetism', grade: 9, branch: 'physics', difficulty: 'advanced', exerciseCount: 5, resourceCount: 2, estimatedMinutes: 45, tags: ['máy biến thế', 'truyền tải'], coverEmoji: '🔄', isNew: false },
      { id: 'l9phys5', title: 'Bài tập điện từ bồi dưỡng', description: 'Bài toán tổng hợp điện từ học cấp độ thi học sinh giỏi.', subjectId: 'l9-physics-electromagnetism', grade: 9, branch: 'physics', difficulty: 'gifted', exerciseCount: 3, resourceCount: 0, estimatedMinutes: 80, tags: ['bồi dưỡng', 'HSG'], coverEmoji: '🏆', isNew: true },
    ],
  },
]

export function getSubjectsByGrade(grade: number) {
  return SUBJECTS.filter(s => s.grade === grade)
}

export function getSubjectById(id: string) {
  return SUBJECTS.find(s => s.id === id)
}
