import type { Resource } from '@/types'

export const RESOURCES: Resource[] = [
  // ─── Khoa học Tự nhiên 6 – Sách giáo khoa, giáo viên, bài tập (3 bộ sách) ────
  { id: 'khtn6-cd-sgk', title: 'KHTN 6 – Sách Giáo Khoa (Cánh Diều)', description: 'Sách giáo khoa Khoa học Tự nhiên lớp 6 – bộ sách Cánh Diều. Bao gồm toàn bộ nội dung chương trình học kỳ, hình ảnh minh họa phong phú, câu hỏi và bài tập cuối bài.', type: 'pdf', grade: 6, branch: 'khtn', topic: 'Khoa học Tự nhiên', subjectId: 'l6-khtn', url: 'https://drive.google.com/file/d/1FUYfGHRs5UNVqw4FFUsY3PnBYIa4Jm4X/view?usp=sharing', thumbnailEmoji: '📗', author: 'NXB Giáo dục Việt Nam', savedCount: 0, viewCount: 0, createdAt: '2025-04-17', tags: ['SGK', 'lớp 6', 'Cánh Diều', 'sách giáo khoa'], isFeatured: true },
  { id: 'khtn6-cd-sgv', title: 'KHTN 6 – Sách Giáo Viên (Cánh Diều)', description: 'Sách giáo viên Khoa học Tự nhiên lớp 6 – bộ sách Cánh Diều. Hướng dẫn giảng dạy từng bài, gợi ý hoạt động học, đáp án và phân phối chương trình.', type: 'pdf', grade: 6, branch: 'khtn', topic: 'Khoa học Tự nhiên', subjectId: 'l6-khtn', url: 'https://drive.google.com/file/d/1UcanHJXA3pqc6397YBu9TTAO6ApILpPa/view?usp=sharing', thumbnailEmoji: '📘', author: 'NXB Giáo dục Việt Nam', savedCount: 0, viewCount: 0, createdAt: '2025-04-17', tags: ['SGV', 'lớp 6', 'Cánh Diều', 'giáo viên'], isFeatured: false },
  { id: 'khtn6-cd-sbt', title: 'KHTN 6 – Sách Bài Tập (Cánh Diều)', description: 'Sách bài tập Khoa học Tự nhiên lớp 6 – bộ sách Cánh Diều. Hệ thống bài tập theo từng bài học, phân cấp từ cơ bản đến nâng cao, có ô trả lời sẵn.', type: 'pdf', grade: 6, branch: 'khtn', topic: 'Khoa học Tự nhiên', subjectId: 'l6-khtn', url: 'https://drive.google.com/file/d/1DjosGk2yslKROFGpnDPDWDhHlOZA3eHC/view?usp=sharing', thumbnailEmoji: '📙', author: 'NXB Giáo dục Việt Nam', savedCount: 0, viewCount: 0, createdAt: '2025-04-17', tags: ['SBT', 'lớp 6', 'Cánh Diều', 'bài tập'], isFeatured: false },

  { id: 'khtn6-ctst-sgk', title: 'KHTN 6 – Sách Giáo Khoa (Chân Trời Sáng Tạo)', description: 'Sách giáo khoa Khoa học Tự nhiên lớp 6 – bộ sách Chân Trời Sáng Tạo. Nội dung bám sát chương trình 2018, thiết kế hiện đại với nhiều hoạt động trải nghiệm.', type: 'pdf', grade: 6, branch: 'khtn', topic: 'Khoa học Tự nhiên', subjectId: 'l6-khtn', url: 'https://drive.google.com/file/d/186v5FOKwR0WQpQlamvmTo5skupkIMjK7/view?usp=sharing', thumbnailEmoji: '📗', author: 'NXB Giáo dục Việt Nam', savedCount: 0, viewCount: 0, createdAt: '2025-04-17', tags: ['SGK', 'lớp 6', 'Chân Trời Sáng Tạo', 'sách giáo khoa'], isFeatured: true },
  { id: 'khtn6-ctst-sgv', title: 'KHTN 6 – Sách Giáo Viên (Chân Trời Sáng Tạo)', description: 'Sách giáo viên Khoa học Tự nhiên lớp 6 – bộ sách Chân Trời Sáng Tạo. Gồm kế hoạch bài dạy, hướng dẫn đánh giá, gợi ý mở rộng và đáp án bài tập.', type: 'pdf', grade: 6, branch: 'khtn', topic: 'Khoa học Tự nhiên', subjectId: 'l6-khtn', url: 'https://drive.google.com/file/d/1QqwC2ZfKDDbbO7qmBWNIIqdDqRPKy_Dp/view?usp=sharing', thumbnailEmoji: '📘', author: 'NXB Giáo dục Việt Nam', savedCount: 0, viewCount: 0, createdAt: '2025-04-17', tags: ['SGV', 'lớp 6', 'Chân Trời Sáng Tạo', 'giáo viên'], isFeatured: false },
  { id: 'khtn6-ctst-sbt', title: 'KHTN 6 – Sách Bài Tập (Chân Trời Sáng Tạo)', description: 'Sách bài tập Khoa học Tự nhiên lớp 6 – bộ sách Chân Trời Sáng Tạo. Bài tập đa dạng, tích hợp bài tập thực hành và vận dụng thực tiễn.', type: 'pdf', grade: 6, branch: 'khtn', topic: 'Khoa học Tự nhiên', subjectId: 'l6-khtn', url: 'https://drive.google.com/file/d/1uwZ-nudnRg2Xf6Ff7AJn6oEVcB7aSfOi/view?usp=sharing', thumbnailEmoji: '📙', author: 'NXB Giáo dục Việt Nam', savedCount: 0, viewCount: 0, createdAt: '2025-04-17', tags: ['SBT', 'lớp 6', 'Chân Trời Sáng Tạo', 'bài tập'], isFeatured: false },

  { id: 'khtn6-kntt-sgk', title: 'KHTN 6 – Sách Giáo Khoa (Kết Nối Tri Thức)', description: 'Sách giáo khoa Khoa học Tự nhiên lớp 6 – bộ sách Kết Nối Tri Thức với Cuộc Sống. Chú trọng kết nối kiến thức khoa học với thực tiễn đời sống học sinh.', type: 'pdf', grade: 6, branch: 'khtn', topic: 'Khoa học Tự nhiên', subjectId: 'l6-khtn', url: 'https://drive.google.com/file/d/1E8RUhRzzHEG041Edy-0KZnFuSVzpYBFi/view?usp=sharing', thumbnailEmoji: '📗', author: 'NXB Giáo dục Việt Nam', savedCount: 0, viewCount: 0, createdAt: '2025-04-17', tags: ['SGK', 'lớp 6', 'Kết Nối Tri Thức', 'sách giáo khoa'], isFeatured: true },
  { id: 'khtn6-kntt-sgv', title: 'KHTN 6 – Sách Giáo Viên (Kết Nối Tri Thức)', description: 'Sách giáo viên Khoa học Tự nhiên lớp 6 – bộ sách Kết Nối Tri Thức với Cuộc Sống. Hướng dẫn tổ chức dạy học, đánh giá năng lực và phẩm chất học sinh.', type: 'pdf', grade: 6, branch: 'khtn', topic: 'Khoa học Tự nhiên', subjectId: 'l6-khtn', url: 'https://drive.google.com/file/d/1sHQFHNwPQiw-a-KVe-hTJNgWjhf2fWip/view?usp=sharing', thumbnailEmoji: '📘', author: 'NXB Giáo dục Việt Nam', savedCount: 0, viewCount: 0, createdAt: '2025-04-17', tags: ['SGV', 'lớp 6', 'Kết Nối Tri Thức', 'giáo viên'], isFeatured: false },
  { id: 'khtn6-kntt-sbt', title: 'KHTN 6 – Sách Bài Tập (Kết Nối Tri Thức)', description: 'Sách bài tập Khoa học Tự nhiên lớp 6 – bộ sách Kết Nối Tri Thức với Cuộc Sống. Câu hỏi và bài tập theo tiến trình bài học, phù hợp ôn tập và kiểm tra.', type: 'pdf', grade: 6, branch: 'khtn', topic: 'Khoa học Tự nhiên', subjectId: 'l6-khtn', url: 'https://drive.google.com/file/d/1mhw9v4w6U3sKolY_xafEimb2tSwO3xJ3/view?usp=sharing', thumbnailEmoji: '📙', author: 'NXB Giáo dục Việt Nam', savedCount: 0, viewCount: 0, createdAt: '2025-04-17', tags: ['SBT', 'lớp 6', 'Kết Nối Tri Thức', 'bài tập'], isFeatured: false },

  // ─── Existing resources ────────────────────────────────────────────────────────
  { id: 'r1', title: 'Tổng hợp kiến thức Vật lí lớp 8 – Điện học', description: 'Tài liệu hệ thống toàn bộ kiến thức chương điện học lớp 8: điện trở, định luật Ohm, mạch điện. Có bài tập mẫu và lời giải chi tiết.', type: 'pdf', grade: 8, branch: 'physics', topic: 'Điện học', subjectId: 'l8-physics-electricity', thumbnailEmoji: '📕', author: 'GV Minh Tuấn', savedCount: 342, viewCount: 1204, createdAt: '2024-08-01', tags: ['điện học', 'lớp 8', 'tổng hợp', 'có lời giải'], isFeatured: true },
  { id: 'r2', title: 'Video: Thí nghiệm Quang hợp với cây thủy sinh', description: 'Video thí nghiệm trực quan theo dõi bong bóng khí O₂ thoát ra khi cây thủy sinh (Elodea) quang hợp dưới các cường độ ánh sáng khác nhau.', type: 'video', grade: 7, branch: 'biology', topic: 'Quang hợp', subjectId: 'l7-biology-metabolism', url: 'https://www.youtube.com/embed/Q-eScTIKglA', thumbnailEmoji: '🌿', author: 'KHTN Studio', savedCount: 289, viewCount: 2100, createdAt: '2024-07-15', tags: ['quang hợp', 'thí nghiệm', 'video'], isFeatured: true },
  { id: 'r3', title: 'Sơ đồ tư duy: Cấu tạo và chức năng tế bào', description: 'Mind map chi tiết về cấu tạo tế bào thực vật và động vật, chức năng từng bào quan. Màu sắc phân biệt rõ ràng, dễ nhớ.', type: 'mindmap', grade: 6, branch: 'biology', topic: 'Tế bào', subjectId: 'l6-biology-cell', thumbnailEmoji: '🗺️', author: 'GV Lan Anh', savedCount: 415, viewCount: 1890, createdAt: '2024-06-20', tags: ['tế bào', 'sơ đồ', 'lớp 6'], isFeatured: true },
  { id: 'r4', title: 'Bộ 50 bài tập Hóa học lớp 8 – Phản ứng hóa học', description: '50 bài tập từ cơ bản đến nâng cao về cân bằng phương trình, tính theo PTHH, bài toán hỗn hợp. Có đáp án và hướng dẫn giải.', type: 'exercise', grade: 8, branch: 'chemistry', topic: 'Phản ứng hóa học', subjectId: 'l8-chemistry-reaction', thumbnailEmoji: '✏️', author: 'GV Thanh Hà', savedCount: 520, viewCount: 2340, createdAt: '2024-09-01', tags: ['bài tập', 'hóa 8', 'có đáp án'], isFeatured: false },
  { id: 'r5', title: 'Mô phỏng tương tác: Mạch điện RLC', description: 'Mô phỏng HTML5 cho phép điều chỉnh điện trở, tụ điện, cuộn cảm và quan sát sự thay đổi cường độ dòng điện theo thời gian thực.', type: 'simulation', grade: 9, branch: 'physics', topic: 'Điện từ học', subjectId: 'l9-physics-electromagnetism', thumbnailEmoji: '🔬', author: 'PhET Interactive', savedCount: 178, viewCount: 891, createdAt: '2024-05-10', tags: ['mô phỏng', 'điện từ', 'tương tác'], isFeatured: false },
  { id: 'r6', title: 'Hình ảnh: Các dạng đột biến nhiễm sắc thể', description: 'Bộ ảnh minh họa đột biến: mất đoạn, lặp đoạn, đảo đoạn, chuyển đoạn. Kèm giải thích ngắn gọn dưới mỗi hình.', type: 'image', grade: 9, branch: 'biology', topic: 'Di truyền', subjectId: 'l9-biology-genetics', thumbnailEmoji: '🖼️', author: 'KHTN Studio', savedCount: 234, viewCount: 1020, createdAt: '2024-08-20', tags: ['đột biến', 'di truyền', 'minh họa'], isFeatured: false },
  { id: 'r7', title: 'Tài liệu thí nghiệm: Tách muối từ nước biển', description: 'Hướng dẫn chi tiết thí nghiệm cô cạn và chưng cất để tách muối. Có danh sách dụng cụ, các bước thực hiện và câu hỏi thảo luận.', type: 'experiment', grade: 6, branch: 'chemistry', topic: 'Tách chất', subjectId: 'l6-chemistry-matter', thumbnailEmoji: '⚗️', author: 'GV Quốc Bảo', savedCount: 301, viewCount: 1450, createdAt: '2024-07-01', tags: ['thí nghiệm', 'tách chất', 'thực hành'], isFeatured: true },
  { id: 'r8', title: 'Bài viết: Định luật Ohm – Từ lý thuyết đến bài tập', description: 'Bài viết giải thích trực quan định luật Ohm U=IR, cách đo điện trở bằng ampe kế và vôn kế, kèm 10 bài tập mẫu có lời giải.', type: 'article', grade: 8, branch: 'physics', topic: 'Điện học', subjectId: 'l8-physics-electricity', thumbnailEmoji: '📄', author: 'KHTN Studio', savedCount: 398, viewCount: 1780, createdAt: '2024-08-15', tags: ['Ohm', 'bài viết', 'lý thuyết'], isFeatured: false, content: `## Định luật Ohm – Từ lý thuyết đến bài tập

### I. Lịch sử và phát biểu

**Georg Simon Ohm** (1789–1854), nhà vật lý người Đức, đã phát hiện mối quan hệ giữa hiệu điện thế, cường độ dòng điện và điện trở năm 1827 qua thực nghiệm với các dây dẫn kim loại.

**Phát biểu:** Cường độ dòng điện qua một đoạn dây dẫn tỉ lệ thuận với hiệu điện thế hai đầu đoạn dây và tỉ lệ nghịch với điện trở của đoạn dây đó.

### II. Công thức

**Công thức cơ bản: I = U / R**

Trong đó:
- **I** – Cường độ dòng điện (Ampe – A)
- **U** – Hiệu điện thế (Vôn – V)
- **R** – Điện trở (Ôm – Ω)

Các dạng biến đổi:
- U = I × R (tính hiệu điện thế)
- R = U / I (tính điện trở)

> **Mẹo nhớ tam giác U–I–R:** Viết U ở đỉnh, I và R ở hai góc đáy. Che đại lượng cần tính: hai đại lượng còn lại nằm ngang → nhân (U = I×R); nằm dọc → chia (I = U/R hoặc R = U/I).

### III. Đo điện trở bằng ampe kế và vôn kế

**Ampe kế** đo cường độ dòng điện I:
- Mắc **nối tiếp** vào đoạn mạch cần đo
- Cực (+) ampe kế hướng về cực (+) nguồn điện
- Đơn vị đọc: A hoặc mA

**Vôn kế** đo hiệu điện thế U:
- Mắc **song song** với đoạn mạch cần đo
- Cực (+) vôn kế hướng về cực (+) nguồn điện
- Chọn thang đo phù hợp, lớn hơn giá trị cần đo

Sau khi có I và U → tính R = U/I.

### IV. Điều kiện áp dụng

Định luật Ohm đúng khi:
- Nhiệt độ **không thay đổi** (điện trở là hằng số)
- Vật dẫn là kim loại thuần (không có tụ điện hay cuộn cảm)

> **Lưu ý:** Bóng đèn sợi đốt không tuân hoàn toàn định luật Ohm vì sợi vonfram nóng lên làm điện trở tăng mạnh. Chỉ áp dụng khi nhiệt độ ổn định.

### V. Mạch điện nối tiếp và song song

**Mạch nối tiếp** (R₁, R₂, ... mắc liên tiếp):
- R_tđ = R₁ + R₂ + R₃ + ...
- Cường độ I như nhau qua mỗi điện trở
- U = U₁ + U₂ + U₃ + ...

**Mạch song song** (R₁, R₂, ... hai đầu chung):
- 1/R_tđ = 1/R₁ + 1/R₂ + 1/R₃ + ...
- Hiệu điện thế U như nhau qua mỗi nhánh
- I = I₁ + I₂ + I₃ + ...

### VI. Bài tập có lời giải

**Bài 1.** R = 15 Ω, U = 6 V. Tính I.
*Giải:* I = U/R = 6/15 = **0,4 A**

**Bài 2.** I = 0,5 A, R = 20 Ω. Tính U.
*Giải:* U = I×R = 0,5×20 = **10 V**

**Bài 3.** Bóng đèn I = 0,4 A khi U = 12 V. Tính R.
*Giải:* R = U/I = 12/0,4 = **30 Ω**

**Bài 4.** Ampe kế chỉ 0,6 A, vôn kế chỉ 9 V. Tính R.
*Giải:* R = 9/0,6 = **15 Ω**

**Bài 5.** Cần I = 2 A qua R = 10 Ω. Cần U bao nhiêu?
*Giải:* U = I×R = 2×10 = **20 V**

**Bài 6.** R₁ = 10 Ω, R₂ = 20 Ω nối tiếp, U = 12 V. Tính I mạch chính.
*Giải:* R_tđ = 30 Ω → I = 12/30 = **0,4 A**

**Bài 7.** R₁ = 6 Ω, R₂ = 3 Ω song song, U = 6 V. Tính I₁, I₂ và I.
*Giải:* I₁ = 6/6 = 1 A; I₂ = 6/3 = 2 A; I = **3 A**

**Bài 8.** R = 50 Ω, I không quá 0,1 A. U tối đa là bao nhiêu?
*Giải:* U_max = 0,1×50 = **5 V**

**Bài 9.** R₁ = 4 Ω nối tiếp với (R₂ // R₃), R₂ = R₃ = 6 Ω, U = 14 V. Tính I qua R₁.
*Giải:* R₂₃ = (6×6)/(6+6) = 3 Ω; R_tđ = 4+3 = 7 Ω; I = 14/7 = **2 A**

**Bài 10.** Hai bóng đèn Đ₁ (6V – 3W) và Đ₂ (6V – 6W) mắc song song vào U = 6 V. Tính cường độ dòng điện qua mỗi bóng.
*Giải:* R₁ = U²/P₁ = 36/3 = 12 Ω; R₂ = 36/6 = 6 Ω; I₁ = 6/12 = **0,5 A**; I₂ = 6/6 = **1 A**

### VII. Bảng tổng kết

Đại lượng | Ký hiệu | Đơn vị | Dụng cụ đo
Cường độ dòng điện | I | A (Ampe) | Ampe kế
Hiệu điện thế | U | V (Vôn) | Vôn kế
Điện trở | R | Ω (Ôm) | Ôm kế / tính từ U và I

> **Kết luận:** Định luật Ohm là nền tảng của toàn bộ kỹ thuật điện. Nắm vững ba công thức và hiểu rõ điều kiện áp dụng là chìa khóa để giải mọi bài tập điện học lớp 8.` },
  { id: 'r9', title: 'Video: Cơ chế di truyền AND và tổng hợp protein', description: 'Video hoạt hình 3D mô tả quá trình tự nhân đôi AND, phiên mã ARN và dịch mã tạo protein. Thuyết minh tiếng Việt.', type: 'video', grade: 9, branch: 'biology', topic: 'Di truyền', subjectId: 'l9-biology-genetics', url: 'https://www.youtube.com/embed/IPmIDNFob1A', thumbnailEmoji: '🧬', author: 'KHTN Studio', savedCount: 467, viewCount: 3200, createdAt: '2024-09-10', tags: ['di truyền', 'AND', 'video hoạt hình'], isFeatured: true },
  { id: 'r10', title: 'Bài tập tốc độ lớp 7 – Đề cương ôn thi HK', description: '40 bài tập về tốc độ, vận tốc trung bình, đồ thị s-t từ đề thi các trường THCS. Phân loại theo mức độ, có đáp án.', type: 'exercise', grade: 7, branch: 'physics', topic: 'Tốc độ', subjectId: 'l7-physics-speed', thumbnailEmoji: '✏️', author: 'Tổng hợp đề thi', savedCount: 612, viewCount: 2800, createdAt: '2024-10-01', tags: ['tốc độ', 'ôn thi', 'đề cương'], isFeatured: true },
  { id: 'r11', title: 'Sơ đồ tư duy: Phản ứng hóa học lớp 8', description: 'Mind map hệ thống các loại phản ứng hóa học: hóa hợp, phân hủy, thế, trao đổi. Ví dụ phương trình cho từng loại.', type: 'mindmap', grade: 8, branch: 'chemistry', topic: 'Phản ứng hóa học', subjectId: 'l8-chemistry-reaction', thumbnailEmoji: '🗺️', author: 'GV Thanh Hà', savedCount: 289, viewCount: 1340, createdAt: '2024-07-20', tags: ['phản ứng', 'sơ đồ', 'phân loại'], isFeatured: false },
  { id: 'r12', title: 'Mô phỏng: Phân chia tế bào (Nguyên phân)', description: 'Mô phỏng animation từng giai đoạn nguyên phân: kỳ đầu, kỳ giữa, kỳ sau, kỳ cuối. Có thể tua chậm và dừng ở mỗi bước.', type: 'simulation', grade: 6, branch: 'biology', topic: 'Tế bào', subjectId: 'l6-biology-cell', thumbnailEmoji: '🔬', author: 'Biology Corner', savedCount: 203, viewCount: 950, createdAt: '2024-06-01', tags: ['nguyên phân', 'mô phỏng', 'tế bào'], isFeatured: false },
  { id: 'r13', title: 'PDF: Hợp chất hữu cơ lớp 9 – Ôn thi toàn diện', description: 'Tài liệu ôn tập đầy đủ hữu cơ lớp 9: metan, etilen, axetilen, benzen, ancol, axit, este. Bảng tóm tắt tính chất và phản ứng đặc trưng.', type: 'pdf', grade: 9, branch: 'chemistry', topic: 'Hữu cơ', subjectId: 'l9-chemistry-organic', thumbnailEmoji: '📕', author: 'GV Quốc Bảo', savedCount: 478, viewCount: 2100, createdAt: '2024-09-20', tags: ['hữu cơ', 'ôn thi', 'lớp 9'], isFeatured: false },
  { id: 'r14', title: 'Bài viết: Biến đổi khí hậu và hành động của học sinh', description: 'Bài viết khoa học giải thích cơ chế hiệu ứng nhà kính, số liệu nóng lên toàn cầu và 10 hành động thiết thực học sinh có thể làm ngay.', type: 'article', grade: 9, branch: 'environment', topic: 'Môi trường', subjectId: 'l9-environment', thumbnailEmoji: '📄', author: 'KHTN Studio', savedCount: 356, viewCount: 1600, createdAt: '2024-08-05', tags: ['khí hậu', 'môi trường', 'hành động'], isFeatured: false, content: `## Biến đổi khí hậu và hành động của học sinh

### I. Hiệu ứng nhà kính là gì?

Khí quyển Trái Đất hoạt động như một **nhà kính khổng lồ**: ánh sáng mặt trời xuyên qua lớp khí quyển chiếu xuống bề mặt Trái Đất, bề mặt hấp thụ nhiệt rồi bức xạ trở lại dưới dạng tia hồng ngoại. Các khí nhà kính (CO₂, CH₄, N₂O, H₂O...) hấp thụ tia hồng ngoại này và giữ nhiệt lại trong khí quyển.

Đây là hiện tượng **tự nhiên và cần thiết** – nếu không có hiệu ứng nhà kính, nhiệt độ trung bình Trái Đất sẽ là khoảng –18°C thay vì +15°C như hiện nay. Vấn đề là hoạt động của con người đang làm tăng nồng độ khí nhà kính, khiến hiệu ứng này trở nên quá mức.

### II. Số liệu thực tế

- Nồng độ CO₂ trong khí quyển năm 2023 đạt **421 ppm** – mức cao nhất trong 3 triệu năm qua
- Nhiệt độ trung bình Trái Đất đã tăng **+1,1°C** so với thời tiền công nghiệp (trước 1850)
- Mực nước biển dâng trung bình **3,6 mm/năm** trong giai đoạn 2006–2015
- Các đợt nắng nóng, lũ lụt, hạn hán xảy ra thường xuyên hơn và khốc liệt hơn

> **Việt Nam** là một trong những quốc gia dễ bị tổn thương nhất bởi biến đổi khí hậu. Đồng bằng sông Cửu Long có nguy cơ ngập một phần nếu mực nước biển dâng 1 m.

### III. Nguyên nhân chính

**Do con người gây ra:**
- Đốt nhiên liệu hóa thạch (than, dầu, khí đốt) cho điện, giao thông, công nghiệp – chiếm ~75% lượng khí thải
- Phá rừng làm giảm khả năng hấp thụ CO₂ của Trái Đất
- Nông nghiệp (chăn nuôi gia súc, trồng lúa) thải CH₄
- Rác thải chôn lấp sinh khí CH₄

### IV. Hậu quả

- **Sinh thái:** san hô tẩy trắng, nhiều loài tuyệt chủng, hệ sinh thái rừng bị phá vỡ
- **Con người:** thiếu nước ngọt, mất mùa, dịch bệnh lan rộng, di cư khí hậu
- **Kinh tế:** thiệt hại hàng nghìn tỷ USD mỗi năm từ thiên tai liên quan khí hậu

### V. 10 hành động thiết thực cho học sinh

- Giảm sử dụng đồ nhựa một lần, mang túi vải khi đi chợ
- Đi xe đạp, đi bộ hoặc đi xe buýt thay vì đi xe máy/ô tô khi có thể
- Tắt điện, rút phích cắm khi không dùng – giảm tiêu thụ điện
- Ăn ít thịt bò/thịt cừu hơn (chăn nuôi gia súc phát thải CH₄ rất lớn)
- Trồng cây, tham gia các hoạt động bảo vệ rừng tại địa phương
- Phân loại rác tại nguồn: tái chế giấy, nhựa, kim loại
- Tiết kiệm nước: khóa vòi khi đánh răng, tưới cây đúng giờ
- Tuyên truyền cho gia đình, bạn bè về biến đổi khí hậu
- Theo dõi và chia sẻ thông tin khoa học đáng tin cậy (không tin tức giả)
- Ủng hộ và tham gia các phong trào bảo vệ môi trường tại trường, địa phương

### VI. Mục tiêu toàn cầu – Hiệp định Paris 2015

Hiệp định Paris được 196 quốc gia ký kết với mục tiêu:
- Giữ nhiệt độ tăng **dưới 2°C**, cố gắng **1,5°C** so với mức tiền công nghiệp
- Đạt phát thải ròng bằng 0 (net-zero) vào khoảng **năm 2050**

> **Kết luận:** Biến đổi khí hậu là thách thức lớn nhất thế kỷ 21. Mỗi hành động nhỏ của từng cá nhân, dù chỉ là học sinh, đều góp phần tạo nên sự thay đổi. Hành động ngay hôm nay, vì một tương lai bền vững.` },
  { id: 'r15', title: 'Tài liệu thí nghiệm: Nam châm và Từ trường', description: 'Hướng dẫn thí nghiệm quan sát đường sức từ bằng mạt sắt, xác định cực nam châm và từ trường đất. Câu hỏi thảo luận và báo cáo thực hành.', type: 'experiment', grade: 9, branch: 'physics', topic: 'Điện từ học', subjectId: 'l9-physics-electromagnetism', thumbnailEmoji: '⚗️', author: 'GV Minh Tuấn', savedCount: 189, viewCount: 820, createdAt: '2024-07-10', tags: ['nam châm', 'thí nghiệm', 'từ trường'], isFeatured: false },
  { id: 'r16', title: 'Video: Lực ma sát – Khi nào có lợi, khi nào có hại?', description: 'Video giải thích sinh động các loại ma sát (tĩnh, trượt, lăn), ứng dụng trong đời sống và cách giảm thiểu ma sát không mong muốn.', type: 'video', grade: 6, branch: 'physics', topic: 'Lực', subjectId: 'l6-physics-force', url: 'https://www.youtube.com/embed/8a47T9JEBso', thumbnailEmoji: '⚡', author: 'KHTN Studio', savedCount: 267, viewCount: 1450, createdAt: '2024-06-15', tags: ['ma sát', 'lực', 'video'], isFeatured: false },
  { id: 'r17', title: 'Bộ flashcard: 50 công thức Vật lí THCS', description: 'Bộ 50 flashcard bao gồm tất cả công thức vật lí quan trọng từ lớp 6-9. Mỗi card có công thức, đơn vị, ý nghĩa vật lí và ví dụ minh họa.', type: 'pdf', grade: 9, branch: 'physics', topic: 'Tổng hợp', subjectId: 'l9-physics-electromagnetism', thumbnailEmoji: '📕', author: 'KHTN Studio', savedCount: 834, viewCount: 4200, createdAt: '2024-10-10', tags: ['công thức', 'flashcard', 'tổng hợp', 'tất cả lớp'], isFeatured: true },
  { id: 'r18', title: 'Hình ảnh: Chuỗi thức ăn trong hệ sinh thái rừng', description: 'Infographic màu sắc minh họa chuỗi thức ăn và lưới thức ăn trong hệ sinh thái rừng nhiệt đới. Chú thích bậc dinh dưỡng từng loài.', type: 'image', grade: 7, branch: 'biology', topic: 'Trao đổi chất', subjectId: 'l7-biology-metabolism', thumbnailEmoji: '🖼️', author: 'GV Lan Anh', savedCount: 312, viewCount: 1230, createdAt: '2024-07-25', tags: ['chuỗi thức ăn', 'sinh thái', 'infographic'], isFeatured: false },
  { id: 'r19', title: 'Bài tập Hóa lớp 9 – Nhận biết chất vô cơ', description: 'Chuyên đề nhận biết các chất vô cơ: axit, bazơ, muối. Phương pháp, sơ đồ logic và 30 bài tập có đáp án.', type: 'exercise', grade: 9, branch: 'chemistry', topic: 'Hợp chất vô cơ', subjectId: 'l9-chemistry-organic', thumbnailEmoji: '✏️', author: 'GV Thanh Hà', savedCount: 445, viewCount: 1980, createdAt: '2024-09-15', tags: ['nhận biết', 'vô cơ', 'lớp 9'], isFeatured: false },
  { id: 'r20', title: 'Mô phỏng tương tác: Hệ thần kinh người', description: 'Mô hình 3D tương tác cho phép khám phá cấu trúc não, tủy sống và các dây thần kinh. Click vào từng bộ phận để xem chức năng.', type: 'simulation', grade: 8, branch: 'biology', topic: 'Cơ thể người', subjectId: 'l8-chemistry-reaction', thumbnailEmoji: '🔬', author: 'BioDigital Human', savedCount: 298, viewCount: 1560, createdAt: '2024-08-10', tags: ['thần kinh', 'cơ thể người', '3D', 'tương tác'], isFeatured: false },

  // ─── Bài viết có nội dung đầy đủ ─────────────────────────────────────────────
  { id: 'art-01', title: 'Bài viết: Tế bào – Đơn vị cơ bản của sự sống', description: 'Bài viết đầy đủ về cấu tạo tế bào thực vật và động vật, chức năng từng bào quan, điểm giống và khác nhau. Bám sát SGK KHTN 6.', type: 'article', grade: 6, branch: 'biology', topic: 'Tế bào', subjectId: 'l6-biology-cell', thumbnailEmoji: '🔬', author: 'KHTN Studio', savedCount: 412, viewCount: 2100, createdAt: '2024-06-10', tags: ['tế bào', 'sinh học', 'lớp 6', 'bào quan'], isFeatured: true, content: `## Tế bào – Đơn vị cơ bản của sự sống

### I. Tế bào là gì?

**Tế bào** là đơn vị cấu trúc và chức năng cơ bản của mọi sinh vật. Mọi cơ thể sống đều được cấu tạo từ tế bào – từ vi khuẩn chỉ có một tế bào đến cơ thể người với khoảng **37 nghìn tỷ tế bào**.

Tế bào được **Robert Hooke** phát hiện lần đầu năm 1665 khi quan sát lát cắt bần dưới kính hiển vi. Ông thấy các ô nhỏ và đặt tên là "cell" (ô nhỏ).

### II. Cấu tạo tế bào

**Tế bào có 3 thành phần chính:**

- **Màng tế bào:** Lớp màng bán thấm bao quanh tế bào, kiểm soát sự trao đổi chất vào và ra khỏi tế bào. Cấu tạo từ lớp phospholipid kép và protein.
- **Tế bào chất:** Chất lỏng nhớt chứa nước, muối khoáng và các bào quan. Nơi diễn ra hầu hết các phản ứng sinh hóa của tế bào.
- **Nhân tế bào:** Trung tâm điều khiển mọi hoạt động của tế bào. Chứa AND mang thông tin di truyền. Được bao bọc bởi màng nhân có lỗ thủng để trao đổi vật chất.

**Các bào quan quan trọng:**
- **Ti thể:** "Nhà máy năng lượng" – thực hiện hô hấp tế bào, tạo ATP
- **Lục lạp:** Chỉ có ở tế bào thực vật – thực hiện quang hợp, chứa diệp lục
- **Ribosome:** Tổng hợp protein từ axit amin
- **Lưới nội chất:** Hệ thống màng vận chuyển vật chất trong tế bào
- **Bộ máy Golgi:** Đóng gói và phân phối protein, lipid
- **Không bào:** Tế bào thực vật có không bào lớn chứa nước và muối khoáng

### III. So sánh tế bào thực vật và động vật

Điểm giống nhau:
- Đều có màng tế bào, tế bào chất, nhân
- Đều có ti thể, ribosome, lưới nội chất, bộ máy Golgi

Điểm khác nhau:
- **Vách tế bào:** Chỉ có ở tế bào thực vật (cellulose) – giúp tế bào cứng chắc
- **Lục lạp:** Chỉ có ở tế bào thực vật – thực hiện quang hợp
- **Không bào:** Tế bào thực vật có không bào lớn; tế bào động vật có nhiều không bào nhỏ
- **Trung tử:** Chỉ có ở tế bào động vật – tham gia phân chia tế bào

> **Mẹo nhớ:** "Thực vật THÊM: Vách – Lục lạp – Không bào lớn"

### IV. Chức năng của tế bào

Tế bào thực hiện đầy đủ các chức năng của sự sống:
- **Trao đổi chất:** hô hấp, quang hợp (thực vật), tiêu hóa nội bào
- **Sinh trưởng:** tổng hợp chất hữu cơ, tăng kích thước
- **Sinh sản:** phân chia tạo tế bào con (nguyên phân, giảm phân)
- **Cảm ứng:** phản ứng với kích thích từ môi trường

### V. Từ tế bào đến cơ thể

Các tế bào có cùng cấu trúc và chức năng tập hợp thành **mô** (ví dụ: mô cơ, mô thần kinh). Các mô kết hợp tạo **cơ quan** (tim, phổi, gan...). Các cơ quan phối hợp tạo **hệ cơ quan** (hệ tiêu hóa, hệ tuần hoàn...). Các hệ cơ quan hợp thành **cơ thể** hoàn chỉnh.

> **Kết luận:** Tế bào là đơn vị sống nhỏ nhất. Nắm vững cấu tạo và chức năng tế bào giúp em hiểu toàn bộ sinh học từ phân tử đến hệ sinh thái.` },

  { id: 'art-02', title: 'Bài viết: Quang hợp ở thực vật – Toàn tập lý thuyết', description: 'Bài viết đầy đủ về quang hợp: phương trình, nguyên liệu, sản phẩm, các yếu tố ảnh hưởng và ý nghĩa. Kèm câu hỏi ôn tập SGK KHTN 7.', type: 'article', grade: 7, branch: 'biology', topic: 'Quang hợp', subjectId: 'l7-biology-metabolism', thumbnailEmoji: '🌿', author: 'KHTN Studio', savedCount: 378, viewCount: 1950, createdAt: '2024-07-20', tags: ['quang hợp', 'sinh học', 'lớp 7', 'lý thuyết'], isFeatured: false, content: `## Quang hợp ở thực vật – Toàn tập lý thuyết

### I. Định nghĩa và phương trình

**Quang hợp** là quá trình lá cây sử dụng ánh sáng mặt trời để chuyển hóa CO₂ và H₂O thành chất hữu cơ (glucôzơ) và giải phóng O₂.

**Phương trình tổng quát:**

6CO₂ + 6H₂O → (ánh sáng, diệp lục) → C₆H₁₂O₆ + 6O₂

Đọc là: Sáu phân tử CO₂ và sáu phân tử nước, nhờ ánh sáng và diệp lục, tạo thành một phân tử glucôzơ và sáu phân tử ôxy.

### II. Nguyên liệu và điều kiện

**Nguyên liệu:**
- **CO₂:** lấy từ không khí qua lỗ khí (khí khổng) ở mặt dưới lá
- **H₂O:** hút từ đất qua rễ, vận chuyển lên lá qua thân

**Điều kiện:**
- **Ánh sáng:** nguồn năng lượng để thực hiện quang hợp
- **Diệp lục (chlorophyll):** sắc tố xanh trong lục lạp, hấp thụ ánh sáng
- **Lục lạp:** bào quan thực hiện quang hợp, chỉ có ở tế bào thực vật

### III. Sản phẩm

- **Glucôzơ (C₆H₁₂O₆):** chất hữu cơ đầu tiên được tạo ra, là nguyên liệu tổng hợp tinh bột, cellulose, protein...
- **Ôxy (O₂):** giải phóng ra ngoài qua khí khổng – nguồn O₂ cho mọi sinh vật hô hấp

### IV. Các yếu tố ảnh hưởng

**Cường độ ánh sáng:**
- Ánh sáng mạnh → quang hợp nhanh hơn (đến mức bão hòa)
- Ánh sáng yếu → quang hợp chậm
- Không có ánh sáng → quang hợp dừng lại

**Nồng độ CO₂:**
- CO₂ tăng → quang hợp tăng (trong giới hạn)
- Thiếu CO₂ → quang hợp giảm mạnh

**Nhiệt độ:**
- Quang hợp diễn ra tốt nhất ở 25–35°C
- Nhiệt độ quá cao (>40°C) hoặc quá thấp (<5°C) → quang hợp giảm

**Nước:**
- Thiếu nước làm khí khổng đóng lại → CO₂ không vào được → quang hợp giảm

### V. Ý nghĩa của quang hợp

- **Cung cấp chất hữu cơ:** toàn bộ chất hữu cơ trong sinh quyển đều bắt nguồn từ quang hợp
- **Cung cấp O₂:** duy trì nồng độ O₂ trong khí quyển (~21%), cần cho hô hấp của mọi sinh vật
- **Hấp thụ CO₂:** làm giảm hiệu ứng nhà kính, điều hòa khí hậu Trái Đất
- **Cơ sở của chuỗi thức ăn:** thực vật là sinh vật sản xuất – bậc dinh dưỡng đầu tiên

### VI. Quang hợp và hô hấp tế bào

Quang hợp và hô hấp tế bào là hai quá trình ngược nhau:

Quang hợp: CO₂ + H₂O + Ánh sáng → Glucôzơ + O₂ (lưu trữ năng lượng)
Hô hấp: Glucôzơ + O₂ → CO₂ + H₂O + Năng lượng (ATP) (giải phóng năng lượng)

> **Lưu ý:** Ban ngày, quang hợp xảy ra đồng thời với hô hấp nhưng quang hợp mạnh hơn → cây hấp thụ CO₂ và thải O₂. Ban đêm, chỉ có hô hấp → cây hấp thụ O₂ và thải CO₂.

### VII. Câu hỏi ôn tập

- Viết phương trình quang hợp và giải thích ý nghĩa từng chất?
- Tại sao lá cây có màu xanh lục?
- Thí nghiệm nào chứng minh quang hợp tạo ra tinh bột?
- Nêu 3 yếu tố ảnh hưởng đến cường độ quang hợp?
- So sánh quang hợp và hô hấp tế bào?` },

  { id: 'art-03', title: 'Bài viết: Phân loại phản ứng hóa học lớp 8', description: 'Bài viết hệ thống 4 loại phản ứng: hóa hợp, phân hủy, thế, trao đổi. Dấu hiệu nhận biết, ví dụ phương trình và bài tập có đáp án.', type: 'article', grade: 8, branch: 'chemistry', topic: 'Phản ứng hóa học', subjectId: 'l8-chemistry-reaction', thumbnailEmoji: '⚗️', author: 'KHTN Studio', savedCount: 445, viewCount: 2280, createdAt: '2024-09-05', tags: ['phản ứng', 'hóa học', 'lớp 8', 'phân loại'], isFeatured: true, content: `## Phân loại phản ứng hóa học lớp 8

### I. Phản ứng hóa hợp

**Định nghĩa:** Hai hay nhiều chất kết hợp với nhau tạo thành một chất mới duy nhất.

**Dạng tổng quát:** A + B → AB

**Ví dụ:**
- 2H₂ + O₂ → 2H₂O (Hydro cháy trong ôxy tạo nước)
- CaO + H₂O → Ca(OH)₂ (Vôi sống hòa tan trong nước)
- SO₂ + H₂O → H₂SO₃ (Lưu huỳnh điôxit tan trong nước)
- N₂ + 3H₂ → 2NH₃ (Tổng hợp amoniac)

> **Nhận biết:** Nhiều chất → một chất sản phẩm. Thường tỏa nhiệt.

### II. Phản ứng phân hủy

**Định nghĩa:** Một chất bị phân tích thành hai hay nhiều chất mới.

**Dạng tổng quát:** AB → A + B

**Ví dụ:**
- 2H₂O → 2H₂ + O₂ (Điện phân nước)
- 2HgO → 2Hg + O₂ (Nung thủy ngân(II) ôxit)
- CaCO₃ → CaO + CO₂ (Nung đá vôi)
- 2KClO₃ → 2KCl + 3O₂ (Nhiệt phân kali clorat)

> **Nhận biết:** Một chất → nhiều chất sản phẩm. Thường cần nhiệt độ cao hoặc điện phân.

### III. Phản ứng thế

**Định nghĩa:** Một nguyên tố tự do đẩy một nguyên tố ra khỏi hợp chất, chiếm vị trí của nguyên tố đó.

**Dạng tổng quát:** A + BC → AC + B

**Ví dụ:**
- Fe + CuSO₄ → FeSO₄ + Cu (Sắt đẩy đồng khỏi dung dịch)
- Zn + 2HCl → ZnCl₂ + H₂ (Kẽm tác dụng với axit)
- Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag (Đồng đẩy bạc)
- 2Al + 3H₂SO₄ → Al₂(SO₄)₃ + 3H₂ (Nhôm tác dụng axit)

> **Nhận biết:** Đơn chất tham gia phản ứng và tạo ra đơn chất mới. Kim loại đứng trước đẩy kim loại đứng sau trong dãy hoạt động hóa học.

### IV. Phản ứng trao đổi

**Định nghĩa:** Hai hợp chất trao đổi thành phần nguyên tử hoặc nhóm nguyên tử cho nhau để tạo thành hai hợp chất mới.

**Dạng tổng quát:** AB + CD → AD + CB

**Ví dụ:**
- NaOH + HCl → NaCl + H₂O (Trung hòa)
- CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂
- Na₂SO₄ + BaCl₂ → BaSO₄↓ + 2NaCl (Kết tủa)
- AgNO₃ + NaCl → AgCl↓ + NaNO₃

**Điều kiện để phản ứng trao đổi xảy ra:**
- Tạo thành **kết tủa** (↓)
- Tạo thành **khí bay lên** (↑)
- Tạo thành **nước** (hoặc chất điện ly yếu)

> **Nhận biết:** Hai hợp chất, hai hợp chất sản phẩm. Không có đơn chất tham gia.

### V. Dấu hiệu nhận biết phản ứng hóa học xảy ra

- Tạo thành **chất kết tủa** (xuất hiện vẩn đục)
- Tạo thành **chất khí** (bong bóng sủi lên)
- **Đổi màu** dung dịch hoặc chất
- **Tỏa nhiệt** hoặc **phát sáng**
- **Mùi** đặc trưng của chất mới tạo thành

### VI. Bảng tổng kết

Loại phản ứng | Dấu hiệu | Ví dụ
Hóa hợp | Nhiều chất → 1 chất | CaO + H₂O → Ca(OH)₂
Phân hủy | 1 chất → nhiều chất | CaCO₃ → CaO + CO₂
Thế | Đơn chất + hợp chất | Fe + CuSO₄ → FeSO₄ + Cu
Trao đổi | 2 hợp chất → 2 hợp chất | NaOH + HCl → NaCl + H₂O

### VII. Bài tập phân loại

**Bài 1.** Phân loại các phản ứng sau:
- 2Na + 2H₂O → 2NaOH + H₂↑ → **Phản ứng thế**
- 2Fe + 3Cl₂ → 2FeCl₃ → **Phản ứng hóa hợp**
- 2Fe(OH)₃ → Fe₂O₃ + 3H₂O → **Phản ứng phân hủy**
- Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂↑ → **Phản ứng trao đổi**` },

  { id: 'art-04', title: 'Bài viết: Di truyền Mendel – Từ đậu Hà Lan đến gen người', description: 'Bài viết đầy đủ về định luật Mendel, tỉ lệ kiểu gen kiểu hình, bài toán lai một cặp tính trạng từ cơ bản đến nâng cao. KHTN 9.', type: 'article', grade: 9, branch: 'biology', topic: 'Di truyền', subjectId: 'l9-biology-genetics', thumbnailEmoji: '🧬', author: 'KHTN Studio', savedCount: 521, viewCount: 2890, createdAt: '2024-09-12', tags: ['Mendel', 'di truyền', 'lớp 9', 'bài toán lai'], isFeatured: true, content: `## Di truyền Mendel – Từ đậu Hà Lan đến gen người

### I. Gregor Mendel và thí nghiệm đậu Hà Lan

**Gregor Mendel** (1822–1884), tu sĩ người Áo, đã thực hiện hàng nghìn thí nghiệm lai đậu Hà Lan trong 8 năm (1856–1863). Ông chọn đậu Hà Lan vì:
- Có nhiều cặp tính trạng tương phản rõ ràng (hạt trơn/nhăn, hoa tím/trắng...)
- Dễ tự thụ phấn hoặc thụ phấn chéo
- Thế hệ ngắn, cho nhiều con cháu dễ thống kê

### II. Các khái niệm cơ bản

- **Gen:** Đơn vị di truyền, là đoạn AND mã hóa một tính trạng
- **Alen:** Các dạng khác nhau của cùng một gen (A và a)
- **Kiểu gen:** Tổ hợp alen của cá thể (AA, Aa, aa)
- **Kiểu hình:** Đặc điểm biểu hiện ra ngoài (trơn, nhăn...)
- **Trội (A):** Alen biểu hiện khi có 1 hoặc 2 bản sao
- **Lặn (a):** Alen chỉ biểu hiện khi có 2 bản sao (aa)
- **Đồng hợp:** AA (thuần trội) hoặc aa (thuần lặn)
- **Dị hợp:** Aa (biểu hiện tính trạng trội)

### III. Quy luật phân li (Định luật I Mendel)

**Phát biểu:** Mỗi tính trạng do một cặp alen quy định. Trong quá trình hình thành giao tử, các alen trong cặp phân li đồng đều vào các giao tử.

**Sơ đồ lai một cặp tính trạng:**

P: AA (hạt trơn) × aa (hạt nhăn)
Giao tử P: A × a
F₁: Aa → 100% kiểu hình trơn (trội hoàn toàn)

F₁ × F₁: Aa × Aa
Giao tử: A, a × A, a
F₂: 1AA : 2Aa : 1aa
→ Tỉ lệ kiểu gen: **1:2:1**
→ Tỉ lệ kiểu hình: **3 trội : 1 lặn**

### IV. Lai phân tích

Lai phân tích là lai cá thể mang tính trạng trội (chưa biết kiểu gen) với cá thể thuần lặn (aa) để xác định kiểu gen.

- Nếu kết quả **100% trội** → bố/mẹ có kiểu gen **AA**
- Nếu kết quả **1 trội : 1 lặn** → bố/mẹ có kiểu gen **Aa**

### V. Trội không hoàn toàn

Khi không có trội hoàn toàn, F₁ có kiểu hình trung gian:

P: AA (hoa đỏ) × aa (hoa trắng)
F₁: Aa → hoa hồng (trung gian)
F₁ × F₁: 1AA : 2Aa : 1aa
Kiểu hình: **1 đỏ : 2 hồng : 1 trắng** (tỉ lệ kiểu gen = kiểu hình)

### VI. Bài toán mẫu

**Bài 1.** Hạt trơn (A) trội so với hạt nhăn (a). P: Aa × Aa. Tính tỉ lệ kiểu gen và kiểu hình ở F₁.

*Giải:*
Giao tử: A, a × A, a
Kiểu gen F₁: 1AA : 2Aa : 1aa
Kiểu hình F₁: **3 hạt trơn (AA + Aa) : 1 hạt nhăn (aa)**

**Bài 2.** Từ tỉ lệ kiểu hình F₂ = 3:1, xác định kiểu gen P.
*Giải:* Tỉ lệ 3:1 đặc trưng cho lai F₁×F₁ với F₁ dị hợp → P: AA × aa

**Bài 3.** Bố mắt nâu (Aa), mẹ mắt nâu (Aa). Xác suất con mắt xanh (aa)?
*Giải:* Aa × Aa → 1/4 aa → Xác suất mắt xanh = **25%**

### VII. Ý nghĩa của di truyền Mendel

- Giải thích tính đa dạng và ổn định của các loài sinh vật
- Cơ sở khoa học cho chọn giống: chọn cá thể thuần chủng (AA, aa)
- Ứng dụng trong y học: dự đoán nguy cơ mắc bệnh di truyền
- Nền tảng cho di truyền học hiện đại và kỹ thuật AND

> **Kết luận:** Mendel đặt nền móng cho di truyền học hiện đại dù ông không biết gì về ADN hay nhiễm sắc thể. Các định luật của ông vẫn là cốt lõi của sinh học di truyền 150 năm sau.` },

  { id: 'art-05', title: 'Bài viết: Tốc độ và chuyển động – Giải bài tập từ A đến Z', description: 'Bài viết đầy đủ lý thuyết tốc độ, phân loại chuyển động, công thức tính tốc độ trung bình, kèm phương pháp giải các dạng bài tập thường gặp KHTN 7.', type: 'article', grade: 7, branch: 'physics', topic: 'Tốc độ', subjectId: 'l7-physics-speed', thumbnailEmoji: '🏃', author: 'KHTN Studio', savedCount: 467, viewCount: 2430, createdAt: '2024-09-18', tags: ['tốc độ', 'chuyển động', 'lớp 7', 'vật lý'], isFeatured: false, content: `## Tốc độ và chuyển động – Giải bài tập từ A đến Z

### I. Tốc độ là gì?

**Tốc độ** là đại lượng cho biết vật chuyển động nhanh hay chậm, được đo bằng quãng đường đi được trong một đơn vị thời gian.

**Công thức:** v = s / t

Trong đó:
- **v** – Tốc độ (m/s hoặc km/h)
- **s** – Quãng đường (m hoặc km)
- **t** – Thời gian (s hoặc h)

**Đổi đơn vị:** 1 m/s = 3,6 km/h

### II. Phân loại chuyển động

**Chuyển động thẳng đều:**
- Tốc độ không đổi theo thời gian
- Quỹ đạo là đường thẳng
- Đồ thị s–t là đường thẳng dốc; đồ thị v–t là đường nằm ngang

**Chuyển động không đều:**
- Tốc độ thay đổi theo thời gian
- Dùng tốc độ trung bình để đặc trưng

### III. Tốc độ trung bình

**Tốc độ trung bình** là tổng quãng đường chia cho tổng thời gian:

v_tb = (s₁ + s₂ + ... + sₙ) / (t₁ + t₂ + ... + tₙ)

> **Lưu ý quan trọng:** Tốc độ trung bình KHÔNG phải trung bình cộng các tốc độ! v_tb ≠ (v₁ + v₂)/2 (trừ khi thời gian bằng nhau).

### IV. Đọc đồ thị chuyển động

**Đồ thị s–t (quãng đường – thời gian):**
- Độ dốc = tốc độ (v = Δs/Δt)
- Đường nằm ngang → vật đứng yên
- Đường dốc đều → chuyển động thẳng đều
- Đường cong → tốc độ thay đổi

**Đồ thị v–t (tốc độ – thời gian):**
- Đường nằm ngang → tốc độ không đổi (chuyển động đều)
- Diện tích dưới đồ thị = quãng đường đi được

### V. Các dạng bài tập thường gặp

**Dạng 1: Tính tốc độ, quãng đường hoặc thời gian**

Bài mẫu: Ô tô đi quãng đường 120 km trong 2 giờ. Tốc độ ô tô là bao nhiêu?
*Giải:* v = s/t = 120/2 = **60 km/h = 16,7 m/s**

**Dạng 2: Tính tốc độ trung bình**

Bài mẫu: Người đi xe đạp: 10 km đầu với 20 km/h, 10 km sau với 10 km/h. Tính v_tb.
*Giải:* t₁ = 10/20 = 0,5 h; t₂ = 10/10 = 1 h
v_tb = (10+10)/(0,5+1) = 20/1,5 = **13,3 km/h** (không phải 15 km/h!)

**Dạng 3: Hai vật chuyển động gặp nhau**

Phương pháp: Gọi t là thời gian từ khi xuất phát đến khi gặp nhau.
Lập phương trình: s₁ + s₂ = d (tổng quãng đường = khoảng cách ban đầu)

Bài mẫu: Hai xe xuất phát cùng lúc từ A và B cách nhau 120 km, đi ngược chiều. Xe A: 60 km/h, xe B: 40 km/h. Hỏi sau bao lâu hai xe gặp nhau?
*Giải:* 60t + 40t = 120 → 100t = 120 → t = **1,2 giờ = 72 phút**

**Dạng 4: Hai vật đuổi nhau**

Phương pháp: s₁ = s₂ + d (xe đuổi đi được nhiều hơn đúng khoảng cách ban đầu)

Bài mẫu: Xe A đang ở vị trí cách xe B 30 km, đuổi theo xe B. Xe A: 80 km/h, xe B: 50 km/h. Sau bao lâu A đuổi kịp B?
*Giải:* 80t = 50t + 30 → 30t = 30 → t = **1 giờ**

**Dạng 5: Đổi đơn vị và so sánh tốc độ**

- Chim ưng bay 200 km/h = 200/3,6 ≈ **55,6 m/s**
- Âm thanh trong không khí: ~340 m/s = 340×3,6 = **1224 km/h**
- Ánh sáng: 300.000 km/s (nhanh hơn âm thanh ~880.000 lần)

### VI. Bảng tốc độ tham khảo

Đối tượng | Tốc độ (km/h)
Người đi bộ | 5–6
Xe đạp | 15–20
Ô tô trong đô thị | 50–60
Tàu hỏa | 100–300
Máy bay dân dụng | 800–900
Âm thanh (không khí) | 1.224

> **Kết luận:** Nắm vững công thức v = s/t và phân biệt tốc độ tức thời với tốc độ trung bình là chìa khóa giải mọi bài toán chuyển động lớp 7.` },

  // ─── Video local /public ──────────────────────────────────────────────────────
  { id: 'local-01', title: 'KHTN 6 – Một số phương pháp tách chất ra khỏi hỗn hợp (Lọc, Cô cạn, Chiết)', description: 'Bài giảng sinh động về các phương pháp tách chất: lọc, cô cạn và chiết. Minh họa thực tế dễ hiểu, bám sát chương trình KHTN lớp 6.', type: 'video', grade: 6, branch: 'chemistry', topic: 'Tách chất', subjectId: 'l6-khtn', url: '/khtn6-tach-chat-hon-hop.mp4', thumbnailEmoji: '⚗️', author: 'Trạng (KHTN 6)', savedCount: 0, viewCount: 0, createdAt: '2026-04-22', tags: ['tách chất', 'lọc', 'cô cạn', 'chiết', 'lớp 6'], isFeatured: true },
  { id: 'local-02', title: 'KHTN 6 – Sự đa dạng của thế giới sinh vật (Giới thiệu 5 giới)', description: 'Video giới thiệu hệ thống phân loại 5 giới sinh vật: Khởi sinh, Nguyên sinh, Nấm, Thực vật, Động vật. Hình ảnh phong phú, minh họa trực quan.', type: 'video', grade: 6, branch: 'biology', topic: 'Đa dạng sinh vật', subjectId: 'l6-khtn', url: '/khtn6-su-da-dang-sinh-vat.mp4', thumbnailEmoji: '🌍', author: 'KHTN 6', savedCount: 0, viewCount: 0, createdAt: '2026-04-22', tags: ['5 giới', 'đa dạng sinh vật', 'phân loại', 'lớp 6'], isFeatured: false },
  { id: 'local-03', title: 'KHTN 6 – Tế bào (Cấu tạo và chức năng)', description: 'Video giảng dạy về tế bào – đơn vị cơ bản của sự sống: cấu tạo tế bào thực vật và động vật, chức năng các bào quan, sự khác biệt giữa hai loại tế bào.', type: 'video', grade: 6, branch: 'biology', topic: 'Tế bào', subjectId: 'l6-khtn', url: '/khtn6-te-bao.mp4', thumbnailEmoji: '🔬', author: 'KHTN 6', savedCount: 0, viewCount: 0, createdAt: '2026-04-22', tags: ['tế bào', 'bào quan', 'sinh học', 'lớp 6'], isFeatured: false },
  { id: 'local-04', title: 'KHTN 7 – Thí nghiệm: Chứng minh thân vận chuyển nước (OLM.VN)', description: 'Video thí nghiệm thực tế chứng minh thân cây có khả năng vận chuyển nước và muối khoáng từ rễ lên lá. Sử dụng phẩm màu để quan sát trực quan.', type: 'video', grade: 7, branch: 'biology', topic: 'Vận chuyển nước', subjectId: 'l7-khtn', url: '/khtn7-than-van-chuyen-nuoc.mp4', thumbnailEmoji: '🌿', author: 'OLM.VN', savedCount: 0, viewCount: 0, createdAt: '2026-04-22', tags: ['thí nghiệm', 'thân cây', 'vận chuyển nước', 'lớp 7'], isFeatured: true },
  { id: 'local-05', title: 'KHTN 7 – Thực hành quan sát động vật nguyên sinh (ĐVNS)', description: 'Video thực hành quan sát các loại động vật nguyên sinh dưới kính hiển vi: trùng roi, trùng đế giày, trùng biến hình. Hướng dẫn làm tiêu bản và nhận biết.', type: 'video', grade: 7, branch: 'biology', topic: 'Sinh vật đơn bào', subjectId: 'l7-khtn', url: '/khtn7-dong-vat-nguyen-sinh.mp4', thumbnailEmoji: '🦠', author: 'KHTN 7', savedCount: 0, viewCount: 0, createdAt: '2026-04-22', tags: ['thực hành', 'ĐVNS', 'kính hiển vi', 'lớp 7'], isFeatured: false },

  // ─── Mô phỏng thí nghiệm – Kênh YouTube @VTL-9 (Vũ Thị Lê) ──────────────────
  { id: 'vtl-01', title: 'Thí nghiệm KHTN 6: Phân biệt huyền phù và dung dịch', description: 'Video thí nghiệm thực tế hướng dẫn phân biệt huyền phù và dung dịch: quan sát độ trong suốt, lọc qua giấy lọc, nhận xét sự khác biệt.', type: 'video', grade: 6, branch: 'chemistry', topic: 'Hỗn hợp và dung dịch', subjectId: 'l6-khtn', url: 'https://www.youtube.com/embed/3hA5dtnjqnw', thumbnailEmoji: '🧪', author: 'Vũ Thị Lê (@VTL-9)', savedCount: 0, viewCount: 0, createdAt: '2026-04-22', tags: ['thí nghiệm', 'huyền phù', 'dung dịch', 'lớp 6', 'hóa học'], isFeatured: true },
  { id: 'vtl-02', title: 'Thí nghiệm KHTN 6: Phân biệt chất tan – dung môi – dung dịch', description: 'Thí nghiệm minh họa khái niệm chất tan, dung môi và dung dịch thông qua pha muối, đường, dầu ăn vào nước. Quan sát và rút ra nhận xét.', type: 'video', grade: 6, branch: 'chemistry', topic: 'Hỗn hợp và dung dịch', subjectId: 'l6-khtn', url: 'https://www.youtube.com/embed/5Gi0-kxhXJg', thumbnailEmoji: '🧪', author: 'Vũ Thị Lê (@VTL-9)', savedCount: 0, viewCount: 0, createdAt: '2026-04-22', tags: ['thí nghiệm', 'dung dịch', 'chất tan', 'lớp 6'], isFeatured: false },
  { id: 'vtl-03', title: 'KHTN 6 – Thí nghiệm sự chuyển thể của chất (Cánh Diều)', description: 'Video thí nghiệm quan sát quá trình nóng chảy, đông đặc, bay hơi và ngưng tụ của các chất. Bám sát nội dung SGK Cánh Diều lớp 6.', type: 'video', grade: 6, branch: 'chemistry', topic: 'Các thể của chất', subjectId: 'l6-khtn', url: 'https://www.youtube.com/embed/kXjo9M-FSUY', thumbnailEmoji: '🌡️', author: 'Vũ Thị Lê (@VTL-9)', savedCount: 0, viewCount: 0, createdAt: '2026-04-22', tags: ['thí nghiệm', 'chuyển thể', 'nóng chảy', 'lớp 6'], isFeatured: false },
  { id: 'vtl-04', title: 'KHTN 6 – Cách sử dụng các loại đồng hồ bấm giây', description: 'Hướng dẫn thực hành sử dụng đồng hồ bấm giây cơ học và điện tử trong các thí nghiệm đo thời gian. Kỹ năng thực hành cơ bản cho học sinh KHTN 6.', type: 'video', grade: 6, branch: 'khtn', topic: 'Kỹ năng thực hành', subjectId: 'l6-khtn', url: 'https://www.youtube.com/embed/gfRZ4s4wgCc', thumbnailEmoji: '⏱️', author: 'Vũ Thị Lê (@VTL-9)', savedCount: 0, viewCount: 0, createdAt: '2026-04-22', tags: ['thực hành', 'đồng hồ bấm giây', 'kỹ năng', 'lớp 6'], isFeatured: false },
  { id: 'vtl-05', title: 'Thực hành chứng minh quang hợp ở cây xanh', description: 'Video thực hành thí nghiệm chứng minh quá trình quang hợp ở cây xanh: kiểm tra tinh bột bằng dung dịch iốt sau khi che sáng một phần lá.', type: 'video', grade: 7, branch: 'biology', topic: 'Quang hợp', subjectId: 'l7-khtn', url: 'https://www.youtube.com/embed/y4hcilD5e4Q', thumbnailEmoji: '🌿', author: 'Vũ Thị Lê (@VTL-9)', savedCount: 0, viewCount: 0, createdAt: '2026-04-22', tags: ['thí nghiệm', 'quang hợp', 'cây xanh', 'sinh học', 'lớp 7'], isFeatured: true },
  { id: 'vtl-06', title: 'Thí nghiệm phản xạ toàn phần – KHTN 9', description: 'Video thí nghiệm quan sát hiện tượng phản xạ toàn phần khi tia sáng truyền từ môi trường chiết quang hơn sang môi trường chiết quang kém.', type: 'video', grade: 9, branch: 'physics', topic: 'Ánh sáng', subjectId: 'l9-khtn', url: 'https://www.youtube.com/embed/Xxx0m1Xcq7Y', thumbnailEmoji: '💡', author: 'Vũ Thị Lê (@VTL-9)', savedCount: 0, viewCount: 0, createdAt: '2026-04-22', tags: ['thí nghiệm', 'phản xạ toàn phần', 'ánh sáng', 'lớp 9'], isFeatured: false },
  { id: 'vtl-07', title: 'Thí nghiệm tán sắc ánh sáng – Bài 5 KHTN 9 CTST', description: 'Thí nghiệm quan sát màu sắc của vật dưới ánh sáng đơn sắc, giải thích hiện tượng tán sắc ánh sáng qua lăng kính. Theo SGK Chân Trời Sáng Tạo lớp 9.', type: 'video', grade: 9, branch: 'physics', topic: 'Ánh sáng', subjectId: 'l9-khtn', url: 'https://www.youtube.com/embed/xCfs7U4LA1M', thumbnailEmoji: '🌈', author: 'Vũ Thị Lê (@VTL-9)', savedCount: 0, viewCount: 0, createdAt: '2026-04-22', tags: ['thí nghiệm', 'tán sắc ánh sáng', 'lăng kính', 'lớp 9'], isFeatured: true },
  { id: 'vtl-08', title: 'Thí nghiệm đường truyền tia sáng qua thấu kính phân kì – KHTN 9 CTST', description: 'Video thí nghiệm xác định đường truyền của ba chùm tia sáng hẹp song song qua thấu kính phân kì, xác định tiêu điểm và tiêu cự.', type: 'video', grade: 9, branch: 'physics', topic: 'Ánh sáng', subjectId: 'l9-khtn', url: 'https://www.youtube.com/embed/tZ-hKcvX2cw', thumbnailEmoji: '🔭', author: 'Vũ Thị Lê (@VTL-9)', savedCount: 0, viewCount: 0, createdAt: '2026-04-22', tags: ['thí nghiệm', 'thấu kính phân kì', 'tia sáng', 'lớp 9'], isFeatured: false },
  { id: 'vtl-09', title: 'Thí nghiệm mạch điện song song – Vật lý lớp 9', description: 'Thí nghiệm thực tế lắp mạch điện song song, đo cường độ dòng điện qua từng nhánh và kiểm chứng quy tắc cường độ dòng điện trong mạch song song.', type: 'video', grade: 9, branch: 'physics', topic: 'Điện học', subjectId: 'l9-khtn', url: 'https://www.youtube.com/embed/3MzJPcZUVkg', thumbnailEmoji: '⚡', author: 'Vũ Thị Lê (@VTL-9)', savedCount: 0, viewCount: 0, createdAt: '2026-04-22', tags: ['thí nghiệm', 'mạch điện', 'song song', 'lớp 9'], isFeatured: false },
  { id: 'vtl-10', title: 'KHTN 9 – Thí nghiệm tính chất vật lí của tinh bột và cellulose', description: 'Video thí nghiệm khảo sát các tính chất vật lí của tinh bột (hồ tinh bột, phản ứng với iốt) và cellulose. Nội dung Bài 28 – SGK Chân Trời Sáng Tạo lớp 9.', type: 'video', grade: 9, branch: 'chemistry', topic: 'Hóa hữu cơ', subjectId: 'l9-khtn', url: 'https://www.youtube.com/embed/ySbLFyYgxLs', thumbnailEmoji: '🧫', author: 'Vũ Thị Lê (@VTL-9)', savedCount: 0, viewCount: 0, createdAt: '2026-04-22', tags: ['thí nghiệm', 'tinh bột', 'cellulose', 'hữu cơ', 'lớp 9'], isFeatured: false },

  // ─── Bài viết lý thuyết – Nguồn VietJack KHTN 6 ──────────────────────────────
  { id: 'art-l6-luc', title: 'Lực và các tác dụng của lực – KHTN 6', description: 'Bài viết hệ thống toàn bộ kiến thức về lực: định nghĩa, các tác dụng của lực lên chuyển động và hình dạng vật, phân biệt lực tiếp xúc và lực không tiếp xúc, cách đo lực.', type: 'article', grade: 6, branch: 'physics', topic: 'Lực', subjectId: 'l6-physics-force', thumbnailEmoji: '💪', author: 'VietJack / KHTN Studio', savedCount: 0, viewCount: 0, createdAt: '2026-05-07', tags: ['lực', 'tác dụng của lực', 'lực tiếp xúc', 'lớp 6'], isFeatured: true, content: `## Lực là gì?

**Lực** là một tác nhân có khả năng làm thay đổi trạng thái chuyển động hoặc hình dạng của vật.

Mỗi lực đều có: điểm đặt, phương, chiều và độ lớn. Trong sơ đồ, lực được biểu diễn bằng **mũi tên** có chiều dài tỉ lệ với độ lớn.

## Các tác dụng của lực

Lực tác dụng lên vật có thể:

### 1. Thay đổi tốc độ chuyển động
- Làm vật từ **đứng yên chuyển sang chuyển động**
- Làm vật đang chuyển động **nhanh dần** hoặc **chậm dần**
- Làm vật đang chuyển động **dừng lại**

### 2. Thay đổi hướng chuyển động
Lực làm đổi chiều của vật đang chuyển động.

> **Ví dụ:** Cầu thủ đá lệch hướng quả bóng đang lăn. Thủ môn bắt bóng bay đổi hướng.

### 3. Làm biến dạng vật
Thay đổi hình dạng, kích thước của vật.

> **Ví dụ:** Ấn tay lên mặt đệm → đệm lõm xuống. Kéo lò xo → lò xo dãn ra.

> **Lưu ý:** Một lực có thể tác dụng đồng thời hai hoặc cả ba hiệu quả trên.

## Lực tiếp xúc và lực không tiếp xúc

### Lực tiếp xúc
Những lực xuất hiện khi hai vật **tiếp xúc trực tiếp** với nhau.

- Tay đẩy cửa, chân đá bóng, kéo dây thừng
- Lực ma sát khi vật trượt trên mặt bàn

### Lực không tiếp xúc
Lực xuất hiện khi vật gây lực **không chạm** vào vật chịu lực.

- **Lực hấp dẫn:** Trái Đất hút quả táo rơi xuống
- **Lực từ:** Nam châm hút các vật bằng sắt, thép
- **Lực điện:** Thanh nhựa nhiễm điện hút mẩu giấy nhỏ

## Đo lực – Lực kế

**Lực kế** là dụng cụ đo độ lớn của lực. Đơn vị lực là **Newton (N)**, ký hiệu N.

> **Mẹo nhớ:** 1 kg vật có trọng lượng xấp xỉ **10 N** trên bề mặt Trái Đất.
> Vì vậy một cuốn sách nặng 200 g có trọng lượng khoảng **2 N**.` },

  { id: 'art-l6-hapdan', title: 'Lực hấp dẫn và trọng lực – KHTN 6', description: 'Bài viết giải thích lực hấp dẫn, trọng lực và trọng lượng. Phân biệt khối lượng và trọng lượng, công thức tính, ứng dụng trong thực tiễn và trong vũ trụ.', type: 'article', grade: 6, branch: 'physics', topic: 'Lực hấp dẫn', subjectId: 'l6-physics-force', thumbnailEmoji: '🌍', author: 'VietJack / KHTN Studio', savedCount: 0, viewCount: 0, createdAt: '2026-05-07', tags: ['lực hấp dẫn', 'trọng lực', 'trọng lượng', 'lớp 6'], isFeatured: false, content: `## Lực hấp dẫn là gì?

**Lực hấp dẫn** là lực hút giữa hai vật bất kì có khối lượng trong vũ trụ. Đây là lực *không tiếp xúc*, tác dụng qua khoảng không gian.

## Đặc điểm của lực hấp dẫn

- Phụ thuộc vào **khối lượng:** vật càng nặng, lực hút càng lớn
- Phụ thuộc vào **khoảng cách:** hai vật càng gần, lực càng mạnh
- Giữa các vật nhỏ hằng ngày: lực rất yếu, khó nhận thấy
- Giữa các thiên thể: lực rất lớn, quyết định cấu trúc vũ trụ

## Trọng lực và trọng lượng

**Trọng lực** là lực hấp dẫn của Trái Đất tác dụng lên vật, kéo vật về phía tâm Trái Đất (hướng thẳng đứng xuống dưới).

**Trọng lượng (P)** là độ lớn của trọng lực tác dụng lên vật.

> **Công thức:** P = m × g
> m: khối lượng (kg) — g ≈ 10 m/s² (gia tốc trọng trường tại Trái Đất)
> **Ví dụ:** Vật có m = 5 kg → P = 5 × 10 = **50 N**

## Phân biệt khối lượng và trọng lượng

- **Khối lượng (m):** Lượng chất trong vật, không thay đổi dù ở đâu. Đơn vị: kg
- **Trọng lượng (P):** Lực hút của Trái Đất lên vật, thay đổi theo nơi đo. Đơn vị: N

> Trên Mặt Trăng, g ≈ 1,6 m/s² nên cùng vật đó nhẹ hơn 6 lần so với Trái Đất!

## Ví dụ thực tiễn

- Mặt Trăng quay quanh Trái Đất nhờ lực hấp dẫn giữ ổn định quỹ đạo
- Các hành tinh chuyển động quanh Mặt Trời
- Quả táo rơi xuống khi buông tay
- Nước chảy từ cao xuống thấp
- Nhảy lên rồi lại rơi xuống` },

  { id: 'art-l6-nhiet-nang', title: 'Nhiệt năng và các dạng năng lượng – KHTN 6', description: 'Bài viết giải thích nhiệt năng, điện năng, quang năng, hóa năng và sự chuyển hóa năng lượng. Kèm ví dụ thực tế về các thiết bị chuyển đổi năng lượng.', type: 'article', grade: 6, branch: 'physics', topic: 'Năng lượng', subjectId: 'l6-physics-force', thumbnailEmoji: '🔥', author: 'VietJack / KHTN Studio', savedCount: 0, viewCount: 0, createdAt: '2026-05-07', tags: ['nhiệt năng', 'năng lượng', 'chuyển hóa', 'lớp 6'], isFeatured: false, content: `## Năng lượng là gì?

**Năng lượng** là khả năng thực hiện công hoặc làm thay đổi nhiệt độ của một vật. Năng lượng tồn tại dưới nhiều dạng và có thể chuyển hóa qua lại.

## Nhiệt năng

**Nhiệt năng** là năng lượng liên quan đến chuyển động hỗn độn của các phân tử bên trong vật chất.

- Vật có nhiệt độ càng cao → nhiệt năng càng **lớn**
- Nhiệt năng truyền từ vật **nóng** sang vật **lạnh** hơn
- Nguồn nhiệt năng quen thuộc: Mặt Trời, ngọn lửa, bếp gas, bóng đèn sợi đốt

### Các cách làm tăng nhiệt năng
- **Thực hiện công:** Ma sát (xoa hai tay vào nhau → ấm lên)
- **Truyền nhiệt:** Đặt vật lạnh gần nguồn nóng

## Các dạng năng lượng khác

### Năng lượng điện (Điện năng)
Năng lượng của dòng điện. Ứng dụng: thắp sáng, quạt, tivi, sạc điện thoại.

### Năng lượng ánh sáng (Quang năng)
Dạng năng lượng bức xạ điện từ mà mắt có thể nhìn thấy. Nguồn: Mặt Trời, đèn điện.

### Năng lượng hóa học (Hóa năng)
Lưu trữ trong liên kết hóa học. Nguồn: thức ăn, pin, xăng dầu, củi.

### Cơ năng
Năng lượng liên quan đến chuyển động (động năng) và vị trí (thế năng).

## Chuyển hóa năng lượng

Năng lượng không tự sinh ra hay mất đi — chỉ **chuyển từ dạng này sang dạng khác**.

- Bóng đèn: **Điện năng → Quang năng + Nhiệt năng**
- Quạt điện: **Điện năng → Cơ năng + Nhiệt năng**
- Ô tô chạy: **Hóa năng (xăng) → Cơ năng + Nhiệt năng**
- Cây xanh: **Quang năng (ánh sáng) → Hóa năng (tinh bột)**
- Pin điện: **Hóa năng → Điện năng**

> **Định luật bảo toàn năng lượng:** Tổng năng lượng trong một hệ cô lập luôn không đổi.` },

  { id: 'art-l6-nang-luong-tt', title: 'Năng lượng tái tạo: Gió và Mặt trời – KHTN 6', description: 'Bài viết về năng lượng gió và năng lượng mặt trời: định nghĩa, nguyên lý, ứng dụng thực tế, ưu điểm so với nhiên liệu hóa thạch. Liên hệ thực tiễn Việt Nam.', type: 'article', grade: 6, branch: 'physics', topic: 'Năng lượng tái tạo', subjectId: 'l6-physics-force', thumbnailEmoji: '☀️', author: 'VietJack / KHTN Studio', savedCount: 0, viewCount: 0, createdAt: '2026-05-07', tags: ['năng lượng tái tạo', 'năng lượng mặt trời', 'năng lượng gió', 'lớp 6'], isFeatured: true, content: `## Tại sao cần năng lượng tái tạo?

Các nguồn năng lượng hóa thạch (than đá, dầu mỏ, khí tự nhiên) đang **cạn dần** và gây ô nhiễm môi trường, đẩy nhanh biến đổi khí hậu. Vì vậy, con người đang chuyển sang khai thác **năng lượng tái tạo** — nguồn năng lượng sạch, vô hạn từ thiên nhiên.

## Năng lượng Mặt trời

**Định nghĩa:** Năng lượng bức xạ ánh sáng và nhiệt xuất phát từ Mặt Trời.

### Đặc điểm
- **Vô tận:** Mặt Trời sẽ còn chiếu sáng hàng tỉ năm nữa
- **Sạch:** Không thải CO₂, không gây ô nhiễm
- **Phổ biến:** Hầu hết mọi nơi trên Trái Đất đều nhận được ánh sáng Mặt Trời

### Ứng dụng
- **Tấm pin mặt trời (solar panel):** Chuyển quang năng thành điện năng cho nhà ở và nhà máy
- **Máy nước nóng năng lượng mặt trời:** Đun nóng nước sinh hoạt
- **Quang hợp:** Năng lượng Mặt Trời giúp cây xanh tạo chất hữu cơ nuôi sống toàn bộ chuỗi thức ăn

## Năng lượng Gió

**Định nghĩa:** Động năng của khối không khí chuyển động trong bầu khí quyển.

### Nguyên lý hình thành gió
Gió là sự chuyển động của không khí từ khu vực **áp suất cao** đến khu vực **áp suất thấp**. Nguyên nhân: Mặt Trời làm nóng không đều bề mặt Trái Đất.

### Ứng dụng
- **Tua-bin gió:** Cánh quạt lớn quay nhờ sức gió → phát điện
- **Lịch sử:** Thuyền buồm, cối xay gió đã dùng sức gió từ hàng nghìn năm

## So sánh

- Năng lượng mặt trời: cần ánh sáng ban ngày, hoạt động tốt vùng nhiều nắng
- Năng lượng gió: hoạt động cả ban đêm, cần vùng có gió mạnh ổn định

> **Tại Việt Nam:** Bờ biển dài 3.000 km → tiềm năng gió lớn. Miền Trung và miền Nam nắng nhiều → pin mặt trời rất hiệu quả. Việt Nam đang là một trong những nước phát triển năng lượng tái tạo nhanh nhất Đông Nam Á.` },

  { id: 'art-l6-chat-vatthe', title: 'Chất, vật thể và vật liệu – KHTN 6', description: 'Bài viết phân biệt chất, vật thể và vật liệu với ví dụ thực tế. Phân loại vật liệu theo nguồn gốc và công dụng. Tính chất vật lí đặc trưng của một số vật liệu phổ biến.', type: 'article', grade: 6, branch: 'chemistry', topic: 'Chất và vật thể', subjectId: 'l6-chemistry-matter', thumbnailEmoji: '🧱', author: 'VietJack / KHTN Studio', savedCount: 0, viewCount: 0, createdAt: '2026-05-07', tags: ['chất', 'vật thể', 'vật liệu', 'tính chất', 'lớp 6'], isFeatured: true, content: `## Chất là gì?

**Chất** là dạng vật chất tồn tại trong tự nhiên hoặc do con người tạo ra. Mỗi chất có những tính chất vật lí và hóa học đặc trưng riêng.

> **Ví dụ:** nước, muối ăn (NaCl), đường (C₁₂H₂₂O₁₁), sắt (Fe), oxy (O₂), carbon dioxide (CO₂).

## Vật thể là gì?

**Vật thể** là những đồ vật, sự vật tồn tại xung quanh chúng ta. Các vật thể đều được tạo thành từ một hoặc nhiều **chất**.

### Mối quan hệ chất – vật thể

- **Một chất → nhiều vật thể:** Gỗ tạo nên bàn, ghế, giường, tủ, sàn nhà
- **Một vật thể → nhiều chất:** Xe đạp gồm: thép (khung), cao su (lốp), nhựa (tay cầm), nhôm (vành)

> **Cách phân biệt nhanh:**
> "Nước" → **chất** | "Chai nước" → **vật thể**
> "Gỗ" → **chất** | "Cái bàn" → **vật thể**
> "Thủy tinh" → **chất** | "Cốc thủy tinh" → **vật thể**

## Vật liệu là gì?

**Vật liệu** là chất (hoặc hỗn hợp chất) được con người sử dụng làm nguyên liệu để tạo ra các sản phẩm phục vụ cuộc sống.

### Phân loại theo nguồn gốc

- **Tự nhiên:** Gỗ, đá, cao su thiên nhiên, len, bông, đất sét
- **Nhân tạo:** Nhựa tổng hợp, thủy tinh, xi măng, thép, sợi carbon

### Phân loại theo công dụng

- **Xây dựng:** Xi măng, gạch, cát, sắt thép, kính
- **Dệt may:** Sợi cotton, polyester, lụa tự nhiên
- **Điện tử:** Silicon, đồng, nhựa cách điện
- **Y tế:** Titan (cấy ghép), latex (găng tay), thủy tinh (ống nghiệm)

## Tính chất của một số vật liệu phổ biến

- **Gỗ:** Nhẹ, dễ gia công, cách nhiệt tốt → nội thất, xây dựng
- **Thủy tinh:** Trong suốt, cứng, dễ vỡ → chai lọ, kính cửa sổ
- **Nhựa:** Nhẹ, bền, dễ tạo hình, cách điện → bao bì, đồ gia dụng
- **Đá vôi (CaCO₃):** Rắn, không tan trong nước, màu trắng xám → xây dựng, sản xuất xi măng, vôi
- **Thép:** Cứng, dẫn điện/nhiệt, bền → cầu đường, khung nhà, máy móc` },

  { id: 'art-l6-nuoc', title: 'Các thể của nước và vòng tuần hoàn nước – KHTN 6', description: 'Bài viết trình bày ba thể của nước (rắn, lỏng, khí), các quá trình chuyển thể và bốn giai đoạn của vòng tuần hoàn nước trong tự nhiên. Ý nghĩa với khí hậu và sự sống.', type: 'article', grade: 6, branch: 'chemistry', topic: 'Nước và vòng tuần hoàn', subjectId: 'l6-chemistry-matter', thumbnailEmoji: '💧', author: 'VietJack / KHTN Studio', savedCount: 0, viewCount: 0, createdAt: '2026-05-07', tags: ['nước', 'các thể', 'vòng tuần hoàn', 'chuyển thể', 'lớp 6'], isFeatured: false, content: `## Ba thể của nước

Nước là chất quen thuộc nhất trong cuộc sống và là chất **duy nhất** tồn tại tự nhiên ở cả ba thể trong điều kiện Trái Đất.

### Thể rắn – Nước đá, băng, tuyết
- **Hình dạng:** Xác định, cứng chắc
- **Thể tích:** Xác định, không thay đổi
- **Điều kiện:** Nhiệt độ ≤ 0°C (ở áp suất khí quyển)

### Thể lỏng – Nước thường
- **Hình dạng:** Không cố định, theo hình dạng vật chứa
- **Thể tích:** Xác định
- **Điều kiện:** 0°C đến 100°C (ở áp suất khí quyển)

### Thể khí – Hơi nước
- **Hình dạng:** Không xác định, lan tỏa khắp nơi
- **Thể tích:** Không xác định
- **Điều kiện:** Trên 100°C hoặc bay hơi dần ở nhiệt độ thường

## Các quá trình chuyển thể

- **Nóng chảy:** Rắn → Lỏng (đá tan ở 0°C khi hấp thụ nhiệt)
- **Đông đặc:** Lỏng → Rắn (nước đóng băng ở 0°C khi mất nhiệt)
- **Bay hơi:** Lỏng → Khí (nước sôi ở 100°C hoặc bốc hơi chậm ở nhiệt độ thường)
- **Ngưng tụ:** Khí → Lỏng (hơi nước gặp lạnh tạo giọt nước trên kính, sương buổi sáng)
- **Thăng hoa:** Rắn → Khí trực tiếp (đá khô CO₂, băng phiến)

## Vòng tuần hoàn của nước trong tự nhiên

Nước luôn vận động theo một chu kỳ **khép kín liên tục** gọi là vòng tuần hoàn nước.

### 4 giai đoạn chính

**1. Bay hơi**
Dưới tác dụng nhiệt của Mặt Trời, nước từ biển, hồ, sông, mặt đất bốc hơi lên cao. Cây cối cũng thoát hơi nước qua lá (thoát hơi nước).

**2. Ngưng tụ**
Hơi nước lên cao gặp không khí lạnh ngưng tụ thành các giọt nước nhỏ li ti tạo thành **mây** và **sương mù**.

**3. Mưa (và tuyết)**
Khi các giọt nước trong mây tụ lại đủ lớn và đủ nặng, rơi xuống thành **mưa** (vùng ôn đới/nhiệt đới) hoặc **tuyết** (vùng lạnh).

**4. Chảy tràn và thấm đất**
Nước mưa chảy tràn trên mặt đất vào sông, hồ, biển. Một phần thấm xuống đất thành **nước ngầm**. Nước lại bốc hơi và tiếp tục vòng mới.

> **Ý nghĩa:** Vòng tuần hoàn nước điều phối khí hậu Trái Đất, phân phối nước ngọt cho sinh vật, hình thành địa hình (sông suối, thung lũng) và duy trì sự sống. Không có vòng tuần hoàn này, các vùng đất liền sẽ không có nước ngọt!` },
]

export function getResourcesByGradeAndBranch(grade?: number, branch?: string, type?: string) {
  return RESOURCES.filter(r =>
    (!grade || r.grade === grade) &&
    (!branch || r.branch === branch) &&
    (!type || r.type === type)
  )
}

export function getFeaturedResources() {
  return RESOURCES.filter(r => r.isFeatured)
}
