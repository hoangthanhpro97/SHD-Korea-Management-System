# 03 — Kiến trúc tổng thể và công nghệ

## Mục tiêu
Phần mềm web quản trị hồ sơ và công việc toàn phòng, kết nối Google Workspace, sinh báo cáo nhưng không dùng Sheets làm nguồn dữ liệu trung tâm chính.

## Lựa chọn tạm thời cho MVP
- Frontend: React + TypeScript + Vite, Tailwind CSS; router/validation chọn sau Sprint 0.
- Backend: Firebase Authentication cho tài khoản; Cloud Functions hoặc Cloud Run cho nghiệp vụ đặc quyền và Google APIs (tùy tài khoản thanh toán/quota); không đưa credential vào browser.
- Database: Firestore **ứng viên**, cần thực nghiệm truy vấn cross-collection & phân quyền; PostgreSQL là phương án thay thế nếu báo cáo phức tạp.
- Tệp: Google Drive Shared Drive của công ty; metadata và Drive file ID tại Firestore; các file mẫu ở môi trường thử nghiệm tách khỏi dữ liệu công ty.
- Asynchronous: Cloud Scheduler/Tasks hoặc Apps Script (chỉ bổ trợ sau khi kiểm tra quota) cho nhắc việc và báo cáo theo lịch.
- Audit: lịch sử chỉ ghi thêm (append-only) bởi backend, không để client tự giả mạo người duyệt.
- Report: tập hợp sự kiện và công việc → preview → đối chiếu → duyệt → snapshot bất biến → xuất Google Docs/Sheets/PDF tùy mẫu.
- AI: Gemini **hỗ trợ soạn tóm tắt** trên dữ liệu đã lọc, không xác nhận trạng thái và không xem như bằng chứng; phải đánh giá điều khoản dữ liệu.

## Các lớp
1. Client: danh sách hồ sơ, form, dashboard, nhật ký, công việc và báo cáo.
2. Auth/IAM: đăng nhập Google với allowlist Workspace; máy chủ kiểm tra membership, role, case access.
3. Domain service: quy tắc chuyển stage, checklist, review, cập nhật bằng chứng, phân công.
4. Database: master data, transaction events, snapshots, audit log.
5. Integration: Google APIs server-side với OAuth/Service Account đã cấu hình nguyên tắc tối thiểu.
6. Observability: logging, error reporting, monitoring, backup/restore testing.

## Bảo mật
- Test bằng tài khoản cá nhân + dữ liệu giả lập. Khi dùng thật: tạo dự án cloud/Drive thuộc tổ chức; chủ sở hữu thuộc công ty, tài khoản quản trị dự phòng, MFA.
- Không cho truy cập tệp qua link công khai; Drive ACL độc lập với database rules, phải áp dụng cả hai.
- Cloud Functions dùng quyền hẹp, Secrets Manager cho bí mật, không gửi PII vào log.
- Quản lý phiếu và chứng từ bằng `evidence_id` + `source_file_id`; không ghi 'đã nhận' nếu chỉ 'đã gửi'.
- Xử lý quyền xuất dữ liệu, bảo quản dữ liệu, hợp đồng DPA, chính sách thời hạn lưu sau khi được lãnh đạo và pháp chế phê duyệt.
- Phân tách DEV / STAGING / PROD; chỉ deploy PROD bằng workflow duyệt.

## Chưa quyết định
- Firestore vs PostgreSQL: thí điểm 3 truy vấn thực tế (dashboard gộp nhiều giai đoạn, báo cáo tháng, đối soát thay đổi theo thời điểm) trước Sprint 1.
- Phân quyền phòng đào tạo/đối ngoại/cộng tác viên thực tế.
- Các mẫu báo cáo quý, 6 tháng, năm chưa được đối chiếu đủ file gốc.
