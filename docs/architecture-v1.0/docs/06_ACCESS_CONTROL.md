# 06 — Phân quyền dự kiến

## Vai trò cơ sở
`SYS_ADMIN` vận hành tài khoản/thiết lập, quyền xem PII **không mặc định**. `HS_MANAGER` trưởng phòng; `HS_STAFF` nhân viên hồ sơ; `TRAINING_STAFF` phòng đào tạo; `EXTERNAL_AFFAIRS` đối ngoại; `ACCOUNTING` kế toán; `EXEC_VIEWER` ban lãnh đạo.

| Hành động | HS_STAFF | HS_MANAGER | TRAINING_STAFF | EXTERNAL_AFFAIRS | ACCOUNTING | SYS_ADMIN |
|---|---|---|---|---|---|---|
| Xem case được giao | Có | Có trong phạm vi phòng | Theo trường thông tin cần thiết | Theo lần nộp được phân | Invoice được giao | Không mặc định |
| Sửa hồ sơ/giấy tờ được giao | Có | Có | Không | Không | Không | Không |
| Kiểm tra chéo tài liệu | Nếu có quyền review và không phải người tạo | Có, nếu độc lập | Không | Theo bước đối ngoại | Không | Không |
| Duyệt chuyển giai đoạn | Đề nghị | Đề xuất duyệt | Không | Chỉ xác nhận đầu việc thuộc phòng | Không | Không |
| Nhận/gửi xác nhận trường | Không tự đánh dấu nếu không có evidence | Xem/quản lý tranh chấp | Không | Có theo phân công | Không | Không |
| Ghi phỏng vấn/đào tạo | Xem, phối hợp | Xem | Có | Thông tin lịch trường | Không | Không |
| Invoice và thanh toán | Xem trạng thái hạn chế | Xem trạng thái | Không | Xem invoice theo trường | Đối chiếu, cập nhật | Không |
| Báo cáo cá nhân | Tạo/sửa bản nháp | Xem | Theo quyền | Theo quyền | Theo quyền | Không |
| Báo cáo phòng | Xem trong phạm vi | Tạo/duyệt nếu phân công | Không | Không | Không | Không |
| Quản lý user + cấu hình | Không | Gửi yêu cầu | Không | Không | Không | Có |

Quyền 'Có' là đề xuất, phải phê duyệt bằng ma trận quyền nội bộ chính thức.

## Kiểm tra bắt buộc trên backend
- `auth.uid` đang active, thuộc Workspace domain/allowlist, có membership còn hiệu lực.
- Được cấp quyền theo entity, department, `caseId`, `applicationId`, mức nhạy cảm (ABAC).
- Đọc Drive file cần quyền Drive riêng, không chỉ database rules.
- Lệnh duyệt có tách biệt người làm và người duyệt (`reviewerId != preparerId`).
- Chỉ admin được quản lý cấu hình nhưng đọc PII phải có cấp quyền nghiệp vụ riêng hoặc cơ chế break-glass có audit.
- Log bắt buộc: ai thao tác, trước/sau, thời điểm, nguồn, lý do.

## Chưa được khóa cứng
Ai ký duyệt thực sự các giai đoạn? Khả năng trưởng phòng tự duyệt hồ sơ do chính họ chuẩn bị? Vai trò Giám đốc điều hành là người duyệt SOP, không tự suy ra là người duyệt từng hồ sơ.
