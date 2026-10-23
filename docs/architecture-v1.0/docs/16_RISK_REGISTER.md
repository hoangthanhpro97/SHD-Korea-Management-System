# 16 — Rủi ro và biện pháp kiểm soát

| Mã | Rủi ro | Mức | Kiểm soát |
|---|---|---|---|
| R01 | Lộ hộ chiếu/tài chính qua tài khoản hoặc link Drive | Cao | shared drives công ty, quyền tối thiểu, private, không tạo link public, kiểm tra ACL |
| R02 | Cursor/AI gửi dữ liệu thật lên dịch vụ ngoài phạm vi cho phép | Cao | chỉ dữ liệu giả lập trong prompt, phê duyệt chính sách AI và DPA |
| R03 | Tính nhầm 'đã gửi/đã nhận/đã đậu' | Cao | tách event và evidence, test AC06–AC08 |
| R04 | Tự động chuyển stage sai điều kiện | Cao | backend rules + review bắt buộc + deny-by-default |
| R05 | Mất lịch sử khi sửa/ghi đè | Cao | append-only events, snapshots, audit trail, backup |
| R06 | Quy trình cập nhật về phí/địa điểm/quy định nhưng code cứng | Trung bình-Cao | versioned configuration, owner cập nhật, kiểm tra nguồn chính thức |
| R07 | Import lỗi hoặc đếm trùng từ Excel | Cao | dry-run migration, validation, reconciliation, quarantine |
| R08 | Tài khoản phát triển cá nhân thành chủ sở hữu production | Cao | sở hữu công ty, MFA, admin dự phòng, quy trình bàn giao |
| R09 | Tự duyệt hồ sơ, không tách trách nhiệm | Cao | reviewer != preparer, test vai trò, audit |
| R10 | Báo cáo quý/năm bị thay đổi sau chốt | Cao | snapshot + cutoff + hash + không ghi đè |
| R11 | Không có chiến lược khôi phục khi mất cloud/tệp | Cao | lịch backup/restore test, versioning, incident response |
| R12 | Thiếu người bảo trì khi AI tạo code phức tạp | Trung bình | kiến trúc đơn giản, README, test, định dạng/lint, code review độc lập |
