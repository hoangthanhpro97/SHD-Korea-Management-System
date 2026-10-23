# SHD Korea Management System — Architecture Kit v1.0 (DRAFT)

**Tình trạng:** DỰ THẢO CẦN DUYỆT — tài liệu lập trình, chưa phải phần mềm chạy và chưa phải cấu hình production.
**Ngày:** 21/10/2026. **Định hướng:** Web app React/TypeScript, Firebase/Firestore ứng viên MVP, Google Workspace API, Cursor AI.

## Bắt đầu từ đây (dành cho người chưa biết lập trình)
1. Đọc `docs/01_SOURCE_AUDIT.md` và `docs/02_REQUIREMENTS_TRACEABILITY.md` để biết đâu là nghiệp vụ gốc, đâu là đề xuất.
2. Đọc `docs/03_ARCHITECTURE.md`, `docs/04_DATA_MODEL.md` và sơ đồ Mermaid trong `diagrams/`.
3. **Chưa tích hợp dữ liệu học viên thật.** Xem `docs/11_OPEN_DECISIONS.md` và chốt các quyết định còn mở với người phụ trách.
4. Tạo repository GitHub **private**, giải nén bộ tài liệu vào thư mục `docs/shd-spec/` trong repository.
5. Copy `cursor/PROJECT_RULES.md` sang `.cursor/rules/shd-project.mdc` sau khi thêm frontmatter phù hợp, hoặc cung cấp nguyên nội dung cho Cursor Agent để làm quy tắc.
6. Chạy `cursor/SPRINT_0_PROMPT.md` ở chế độ **Plan/Ask trước**, chưa cho Agent triển khai hay tự tạo tài khoản cloud.
7. Chỉ tiến tới Sprint 1 sau khi nghiệm thu Sprint 0 và chuẩn hóa quy tắc quyền, dữ liệu theo người sở hữu.

## Các tài liệu chính
- 01: Kiểm tra nguồn và cảnh báo dữ liệu
- 02: Ma trận nguồn → nghiệp vụ → chức năng → dữ liệu
- 03: Kiến trúc công nghệ, tích hợp và an toàn
- 04: Data model logic + khóa tham chiếu Firestore
- 05: Quy tắc workflow 7 giai đoạn + điểm chặn
- 06: Phân quyền RBAC/ABAC và ủy quyền hành động
- 07: Báo cáo, KPI, đối soát
- 08: Mapping nhập dữ liệu Excel
- 09: Product backlog & lộ trình phát triển
- 10: Kiểm thử, nghiệm thu, dữ liệu giả lập
- 11: Quyết định còn mở / xung đột cần xác minh
- 12: Giải thích thuật ngữ cho người mới
- 13: Luồng nghiệp vụ ví dụ bằng dữ liệu giả lập
- 14: Đề xuất thiết kế màn hình và API
- 15: Cấu trúc cấu hình mốc theo kỳ nhập học
- 16: Hồ sơ rủi ro và biện pháp kiểm soát

## Nguyên tắc cốt lõi
- `students`, `cases`, `applications`, `documents`, `tasks`, `events`, `reports` là các loại đối tượng KHÁC NHAU.
- **Chuyển Đối ngoại ≠ gửi Trường ≠ Trường xác nhận tiếp nhận ≠ được Trường nhận học.**
- Thời hạn và yêu cầu trường/cơ quan là quy tắc được quản trị, có hiệu lực theo phiên bản; không hardcode văn bản tham chiếu.
- Không tự sửa nội dung chứng từ thật; không nhập email, hộ chiếu, tài chính người học vào prompt AI.
- Báo cáo lấy từ sự kiện đã xác minh, lưu snapshot, nguồn và trạng thái đối soát, không cộng trùng học viên.

## Cần chú ý
Tài liệu 01 và 02 chứa khác biệt về timeline (tuần tương đối và mốc kỳ nhập học), và báo cáo tháng 9 có tình trạng trường tiếp nhận khác so với báo cáo tổng hợp đã chốt ngày 29/09. Xem mục quyết định còn mở — không tự chọn một phiên bản mà không ghi nhận bằng chứng.
