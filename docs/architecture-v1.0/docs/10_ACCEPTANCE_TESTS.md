# 10 — Bộ kiểm thử nền tảng (dữ liệu giả lập)

| ID | Given | When | Then |
|---|---|---|---|
| AC01 | staff A được giao case X | mở case X | xem/chỉnh đúng scope; audit ghi actor |
| AC02 | staff B không được giao case X | đoán URL/document ID case X | trả permission denied, không lộ metadata nhạy cảm |
| AC03 | hồ sơ stage 1 thiếu chứng minh nguồn tài chính | nhấn 'Chuyển bước' | bị chặn + thông báo điều kiện thiếu |
| AC04 | user A soạn chứng từ cần kiểm tra chéo | user A tự duyệt | bị từ chối |
| AC05 | reviewer B độc lập | duyệt chứng từ đạt | có review+timestamp+reviewerId |
| AC06 | application mới 'Bàn giao Đối ngoại' | Dashboard xem 'Đã gửi Trường' | không tính là đã gửi |
| AC07 | application đã gửi nhưng chưa có email/biên nhận trường nhận | xem 'Trường đã nhận' | không được tính |
| AC08 | receipt xác thực được kèm event trường nhận | viewer có quyền xem | KPI 'đã nhận' tăng chính xác 1 application |
| AC09 | tài liệu hết hạn trong checklist | xét duyệt stage | blocked dù trạng thái cũ 'Đạt' |
| AC10 | hồ sơ ngưng/rút | tạo yêu cầu rút | case sang `WITHDRAWAL_REQUESTED`; không tự xóa tệp hoặc sự kiện |
| AC11 | kỳ báo cáo chốt lúc 23:59 ngày X | thay dữ liệu live ngày X+1 | snapshot kỳ X không đổi |
| AC12 | task kế hoạch tuần tới | tạo từ form kế hoạch | không bị tính vào số task hoàn thành tuần này |
| AC13 | import lỗi `#NAME?` | chạy import dry-run | quarantined + log nguồn |
| AC14 | trường bản gốc 1 case có 2 lần nộp | nhóm KPI case/student | đếm application 2, student 1 |
| AC15 | credential API bị thiếu | chạy app demo | UI mock an toàn, không chứa token trong log/frontend |
| AC16 | template KPI có tranh chấp nguồn | tạo báo cáo | dashboard báo 'cần đối soát', không tuyên bố hoàn thành |
| AC17 | task chậm, owner thuộc phòng HS | schedule alert | nhắc owner & manager theo cấu hình, không spam |
| AC18 | SYS_ADMIN không được cấp quyền nghiệp vụ | xem hộ chiếu từ app | từ chối dù là admin kỹ thuật |

**Các bài test là đề xuất** để chuyển thành Playwright/Vitest hoặc Firebase emulator integration tests khi lập trình.
