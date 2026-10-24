# Antigravity Agent Rules — SHD Korea Management System

Dự án này là hệ thống phần mềm quản lý hồ sơ du học Hàn Quốc của SHD Korea (SHD Corp), tuân thủ tiêu chuẩn quy trình **Architecture Kit v1.0**.

## 1. Nguyên tắc cốt lõi (Source-of-truth)
- **Tách biệt đối tượng độc lập**: `students`, `cases`, `schoolApplications`, `tasks`, `documents`, `events`, `reports` là các thực thể khác nhau, không dùng chung trường trạng thái.
- **Phân định 4 mốc nộp trường**:
  `Bàn giao Đối ngoại (INTERNAL_HANDOVER)` ≠ `Đã gửi Trường (SENT_TO_SCHOOL)` ≠ `Trường xác nhận nhận (RECEIVED_BY_SCHOOL)` ≠ `Trường cấp Invoice/Nhận học (INVOICE_ISSUED)`.
  Không được tự suy diễn hoặc gộp trạng thái nếu thiếu minh chứng (`evidenceId`).
- **Quy trình 7 giai đoạn**:
  - `ST01`: Tiếp nhận hồ sơ đầu vào & thẩm định nhân thân, nguồn tài chính.
  - `ST02`: Xử lý hồ sơ trường (Dịch thuật công chứng, chứng nhận lãnh sự).
  - `ST03`: Nộp hồ sơ trường (Bàn giao đối ngoại & gửi EMS).
  - `ST04`: Phỏng vấn trường & Invoice học phí.
  - `ST05`: Xử lý hồ sơ Lãnh sự (Sổ đóng băng & khám lao).
  - `ST06`: Nộp Visa KVAC / Lãnh sự quán.
  - `ST07`: Xuất cảnh & Bàn giao sinh viên tại Hàn Quốc.

## 2. Bảo mật dữ liệu cá nhân (PII)
- Tuyệt đối **KHÔNG** đưa số CCCD thật, số hộ chiếu thật, sao kê ngân hàng thật, email cá nhân học viên vào prompt AI hay commit lên repository.
- Toàn bộ quá trình phát triển và kiểm thử chỉ sử dụng dữ liệu giả lập chuẩn hóa trong `apps/web/src/mocks/synthetic_demo_cases.json`.

## 3. Tiêu chuẩn kỹ thuật
- Ngôn ngữ: TypeScript strict mode (`tsc -b`).
- Frontend: React 19, Vite, Tailwind CSS v4, React Router 8.
- Trước khi hoàn tất thay đổi mã nguồn, phải chạy `npm run build` và `npm run lint` đảm bảo 0 lỗi.
