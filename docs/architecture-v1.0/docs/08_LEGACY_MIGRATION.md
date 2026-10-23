# 08 — Mapping nhập dữ liệu từ Excel

## Quy trình an toàn
1. Sao lưu bản gốc, lập checksum và phân quyền đọc. **Không sửa trực tiếp file gốc**.
2. Import vào staging bằng tài khoản test, tạo `source_file`, `sheet`, `row_number`, `raw_value`, `normalized_value`, `validation_status`.
3. Chuẩn hóa mã học viên, ngày, điện thoại (string), loại giấy tờ, tên trường; phân loại null/unknown/disputed.
4. Đối chiếu `studentCode` ↔ `studentId`; phát hiện người trùng họ tên, mã sai, chuyển kỳ.
5. Bóc 1 hàng hồ sơ chi tiết thành `documents` và nhiều `document_assets`/`events` (không biến 29 cột thành một đối tượng khó kiểm toán).
6. Đối chiếu tỷ lệ đếm và lấy xác nhận lãnh đạo trước khi chuyển production.

## Sheet → collection
| Sheet | Cột gốc | Đích | Ghi chú |
|---|---|---|---|
| `DS học viên` | Mã HV, Họ tên, Ngày sinh, ... | `students` | thông tin PII lưu giới hạn quyền; không import text số hộ chiếu ra prompt |
| `DS học viên` | Trường, Kỳ bay, NV xử lý | `cases`, `case_assignments`, `school_applications` | trường trong cột tự do cần chuẩn hóa, có thể nhiều trường |
| `DS học viên` | Trạng thái / cột tiến độ | phân loại vào `cases` hoặc `learning_enrollments` | không nhập nguyên enum hỗn hợp |
| `Hồ sơ chi tiết` | Học viên, Danh mục hồ sơ | `documents` | join theo mapped studentCode, KHÔNG join tên thuần túy |
| `Hồ sơ chi tiết` | Ngày nhận, Người nhận, Ngày scan, Ngày dịch, ... | `case_events`, `document_assets`, `document_reviews` | mỗi hành động một event với ngày nguồn |
| `Hồ sơ chi tiết` | File scan đính kèm | `document_assets` | nếu URL là thư mục, lưu folderRef riêng, chưa coi là file duy nhất |
| `Checklist` | Mã HV + các ô Đã nộp | `document_requirements` + `document_submissions` | 'Đã nộp' ≠ 'Đạt' ≠ 'Được duyệt' |
| `Invoice & Thanh toán` | Invoice số, ngày, KRW, tỷ giá, chuyển tiền | `invoices`, `payments` | trạng thái invoice tách trạng thái payment |
| `Danh mục` | trạng thái, trường, kỳ, loại giấy | `stage_templates`, `document_types`, `schools`, `intake_periods` | có version, aliases |
| `Dasboard` | tổng học viên và trạng thái | KHÔNG nhập số | tính lại từ collections |
| `XLS_NV` | từng mục công việc & kế hoạch | `tasks`, `task_updates`, `report_lines` | việc không liên quan case có `caseId=null` |
| `XLS_TP` | báo cáo phòng, khó khăn, kế hoạch | `reports`, `report_lines`, `issues` | lưu xuất xứ/từ báo cáo tháng |

## Dữ liệu lỗi cần chặn nhập
- `#NAME?`, `#REF!`, `#N/A`, `0` ở ngày tháng không rõ, `NaN`, tên trường mơ hồ.
- Trường `Số buổi nghỉ` có số serial Excel: chuyển vào `IMPORT_REVIEW`, không tự sửa thành số buổi.
- Mọi trạng thái chưa xác nhận hoặc xung đột: `DISPUTED` + issue có người phụ trách đối soát.
- Dữ liệu report tuần/tháng có thể lặp cùng task nhiều lần; dùng `legacySourceKey` và quy tắc dedup kèm xác minh con người.

## Ví dụ hiển thị bằng dữ liệu giả lập
`studentId=stu_demo_01`, `studentCode=DEMO2026-001`, `caseId=case_demo_01`, `applicationId=app_demo_01`.
