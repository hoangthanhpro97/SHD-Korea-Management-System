# 09 — Roadmap và backlog triển khai bằng Cursor

**Phương thức làm việc:** một sprint có mục tiêu có thể thử được, có script test, có tiêu chí nghiệm thu; chưa triển khai production trong sprint phát triển.

| Sprint | Phạm vi | Kết quả nghiệm thu | Phụ thuộc |
|---|---|---|---|
| 0 | Chuẩn bị repo, React/TypeScript/Vite/Tailwind, ESLint, định tuyến, test, mock data | Chạy web demo local, build sạch, không chứa secrets | phê duyệt kiến trúc |
| 1 | Auth Google, profile & membership, quyền phân tách | user test đăng nhập, không xem case không được giao | approve ma trận quyền |
| 2 | Students, Cases, phân công, 7-stage skeleton | tạo case synthetic, lịch sử thay đổi, phân công | ERD + enums |
| 3 | Document requirements, document status, reviews, Drive mock | thêm giấy, yêu cầu bổ sung, kiểm tra chéo, log | checklist & cửa kiểm soát |
| 4 | Tasks, hoạt động, deadline, issues | staff cập nhật task, manager theo dõi trễ | task enum |
| 5 | School applications & handover / sent / received states | tách được 3 mốc, lưu evidence | vai trò đối ngoại |
| 6 | Dashboard & báo cáo tuần/tháng | số tính chuẩn, chốt snapshot thử nghiệm | định nghĩa KPI, cutoff |
| 7 | Gmail/Calendar/Drive API và đồng bộ chọn lọc | quyền hẹp, logs, retry, idempotency | Workspace test setup |
| 8 | Visa, invoice/payment, departure; quý/năm; Gemini tùy chọn | test E2E cho một case đầy đủ | nội quy tài chính/AI |
| 9 | Đánh giá bảo mật, restore test, UAT, migration dry-run | hoàn thành biên bản nghiệm thu | dữ liệu thật được phê duyệt |

## Quy tắc không làm ngay
- Không lập dashboard bằng dữ liệu thật chưa đối soát.
- Không nối 100% mọi API Google ngay từ Sprint 0.
- Không dùng Gemini để quyết định 'đậu phỏng vấn', 'hồ sơ đạt', 'đã nhận trường'.
- Không đưa pháp lý và finance vào production trước khi có chủ quy trình phê duyệt.

## Definition of Done
Code chạy, lint/test pass, không có secrets lộ, phân quyền test cả positive & negative, có audit trail, người dùng kiểm tra trực quan, lưu phiên bản Git.
