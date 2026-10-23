# 04 — Mô hình dữ liệu logic & khóa

## Giải thích
**PK** (primary key) = mã duy nhất của một bản ghi; **FK** (foreign key logic) = mã tham chiếu sang bản ghi khác. Firestore không tự cưỡng chế FK nên backend phải kiểm tra, dùng transaction và test.

### Master data
| Collection / bảng | PK | FK / thuộc tính chính | Quy tắc |
|---|---|---|---|
| `users` | `userId` | `authUid`, `email`, `active` | userId có thể là UID, nhưng không dùng tên người |
| `departments` | `departmentId` | `name` | Phòng Hồ sơ, Đào tạo, Đối ngoại, Kế toán |
| `memberships` | `membershipId` | `userId`, `departmentId`, `role`, `validFrom`, `validTo` | vai trò theo thời gian |
| `students` | `studentId` | `studentCode` unique, thông tin tối thiểu | một người; PII phân nhóm quyền |
| `intake_periods` | `periodId` | `year`, `intakeMonth`, `configVersion` | kỳ 03/06/09/12 và ngoại lệ |
| `schools` | `schoolId` | `canonicalName` | danh mục trường, chống nhập sai |
| `stage_templates` | `templateId` | `stageCode`, `version`, `effectiveFrom` | checklist, mốc, điều kiện có hiệu lực |
| `document_types` | `docTypeId` | `name`, `applicability` | lấy từ PL1A/2A/3A, tránh trùng do alias |

### Transaction data
| Collection / bảng | PK | FK / thuộc tính chính | Quy tắc |
|---|---|---|---|
| `cases` | `caseId` | `studentId`, `periodId`, `ownerUserId`, `stageCode`, `status` | một hồ sơ theo kỳ/lộ trình; người học có nhiều case |
| `case_assignments` | `assignmentId` | `caseId`, `userId`, `role`, `from`, `to` | lịch sử phân công |
| `school_applications` | `applicationId` | `caseId`, `schoolId`, `program`, `status` | một hồ sơ có nhiều lần nộp |
| `application_events` | `applicationEventId` | `applicationId`, `eventType`, `eventAt`, `evidenceId` | bàn giao/gửi/nhận/đậu là 4 event tách biệt |
| `documents` | `documentId` | `caseId`, `docTypeId`, `status`, `expiryAt` | chứng từ logic; có thể có nhiều bản |
| `document_assets` | `assetId` | `documentId`, `driveFileId`, `assetType`, `version`, `uploadedBy` | ảnh/bản scan/bản dịch/bản chứng nhận |
| `document_requirements` | `requirementId` | `templateId`, `docTypeId`, `requiredWhen` | các danh mục bắt buộc theo hoàn cảnh |
| `document_reviews` | `reviewId` | `documentId`, `reviewerId`, `outcome`, `reviewedAt` | người duyệt khác người thực hiện (nếu bắt buộc) |
| `case_stages` | `caseStageId` | `caseId`, `stageCode`, `enteredAt`, `completedAt` | lưu nhiều lần mở lại |
| `stage_reviews` | `stageReviewId` | `caseStageId`, `reviewerId`, `decision`, `evidenceIds` | chặn chuyển bước |
| `tasks` | `taskId` | `caseId?`, `applicationId?`, `assigneeId`, `dueAt`, `category` | công việc độc lập hoặc gắn hồ sơ |
| `task_updates` | `taskUpdateId` | `taskId`, `actorId`, `at`, `result`, `status` | nhật ký công việc thay vì ghi đè |
| `issues` | `issueId` | `caseId?`, `taskId?`, `type`, `severity`, `resolvedAt` | thiếu giấy tờ/trễ/rủi ro |
| `case_events` | `eventId` | `caseId`, `action`, `actorId`, `effectiveAt`, `recordedAt`, `evidenceId` | không sửa event lịch sử |
| `invoices` | `invoiceId` | `applicationId`, `externalInvoiceNo`, `amountKRW`, `dueAt` | chiếu theo trường/nộp, không theo mỗi học viên |
| `payments` | `paymentId` | `invoiceId`, `amount`, `currency`, `paidAt`, `evidenceId` | nhiều thanh toán/hoàn ứng có thể gắn |
| `interviews` | `interviewId` | `applicationId`, `type`, `scheduledAt`, `result` | nhiều lần thử, phỏng vấn thật |
| `visa_applications` | `visaId` | `caseId`, `submittedAt`, `trackingCode`, `status` | trạng thái độc lập |
| `departures` | `departureId` | `caseId`, `departedAt`, `arrivalConfirmedAt` | không 'hoàn tất' trước khi xác nhận |
| `handovers` | `handoverId` | `caseId`, `fromUnit`, `toUnit`, `at`, `evidenceId` | bàn giao vật lý / điện tử |
| `reports` | `reportId` | `periodId`, `reportType`, `authorId`, `status` | DRAFT/REVIEW/APPROVED |
| `report_snapshots` | `snapshotId` | `reportId`, `generatedAt`, `dataCutoffAt`, `hash` | bản chốt không cập nhật theo dữ liệu live |
| `metric_evidence` | `evidenceId` | `recordType`, `recordId`, `sourceName`, `sourceDate`, `verifiedBy` | minh chứng cho chỉ số |
| `audit_events` | `auditEventId` | `actorId`, `action`, `entity`, `at`, `beforeHash`, `afterHash` | append-only, backend ghi |

## 5 quan hệ sống còn
`students 1—N cases`; `cases 1—N school_applications`; `cases 1—N documents`; `cases 1—N tasks`; `documents 1—N document_assets`.

## Firestore schema ban đầu, cần kiểm chứng truy vấn
- Master collections phẳng: `students/{studentId}`, `cases/{caseId}`, `tasks/{taskId}`, `documents/{documentId}`, `schoolApplications/{applicationId}`.
- Mỗi documents lưu `caseId`, `studentId` được denormalize có kiểm soát; không tin `studentId` do frontend đưa vào mà phải cross-check `caseId`.
- Id mang tính opaque (UUID/ULID); `studentCode` trình bày ví dụ `2026DH001` chỉ là mã nghiệp vụ do import, không là PK.
- Các event phải có `actorUid`, `occurredAt`, `recordedAt`, `sourceId`, `correctionOf?`, `approvalId?`. Sửa sự kiện bằng event đính chính thay vì xóa.
- Truy vấn/aggregation theo thời kỳ có thể cần `report_rollups` do backend tạo; không cho client tự viết tổng hợp.

## Không lưu dưới dạng field chung
Không dùng một field `status` chung cho học viên, case, application, chứng từ, visa, việc, invoice. Mỗi entity có enum riêng.
