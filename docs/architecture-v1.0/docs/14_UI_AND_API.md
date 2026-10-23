# 14 — Danh mục màn hình và API theo từng vai trò

## Màn hình MVP
| Route gợi ý | Tên màn hình | Vai trò chính |
|---|---|---|
| `/login` | Đăng nhập Google | Người dùng được cấp quyền |
| `/dashboard` | KPI hồ sơ và cảnh báo | Trưởng phòng / nhân viên theo scope |
| `/students` | Danh sách học viên, tìm kiếm | Hồ sơ |
| `/students/:studentId` | Hồ sơ thông tin học viên | Hồ sơ được giao |
| `/cases` | Bảng tiến độ 7 giai đoạn | Trưởng phòng / nhân viên |
| `/cases/:caseId` | Chi tiết case: stage, checklist, công việc, lịch sử | Theo phân quyền case |
| `/cases/:caseId/documents` | Danh mục giấy tờ, bản dịch, kiểm tra chéo | Hồ sơ và reviewer |
| `/applications` | Bàn giao đối ngoại/gửi trường/nhận trường | Hồ sơ/đối ngoại |
| `/tasks` | Công việc của tôi / của phòng | Theo phân công |
| `/reports` | Báo cáo tuần/tháng, xem xét và chốt | Nhân viên/trưởng phòng |
| `/admin` | Users, roles, cấu hình trạng thái/kỳ | Admin cấu hình |

## Lệnh backend mẫu — chưa phải API contract production
- `createCase(studentId, periodId, assigneeId)` tạo case bằng xác thực chủ sở hữu.
- `submitDocument(caseId, docTypeId, assetRef)` ghi yêu cầu/tệp mới + event.
- `requestStageReview(caseId, stageCode)` chuẩn bị gói evidence.
- `approveStageReview(caseId, reviewId, decision)` xác minh reviewer khác preparer & điều kiện.
- `recordApplicationEvent(applicationId, type, evidenceId)` kiểm soát event type và quyền đối ngoại.
- `createTask(caseId?, ownerId, dueAt, description)` tạo công việc.
- `generateReportPreview(period, type, authorId)` tạo nháp từ dữ liệu đúng kỳ.
- `approveReport(reportId, cutoffAt)` tạo snapshot bất biến với hash.

Không để frontend ghi trực tiếp trường `stage=APPROVED`, `application.receivedBySchool=true`, `report.status=APPROVED` mà không qua backend xác thực.
