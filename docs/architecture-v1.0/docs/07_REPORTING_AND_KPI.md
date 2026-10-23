# 07 — Báo cáo tuần/tháng/quý và chỉ số Dashboard

## Điều được nguồn chứng minh
- XLS_NV có cột: thời gian thực hiện, mục công việc, ngày, chi tiết, tình trạng/kết quả, trạng thái, kế hoạch tuần tới và chi tiết kế hoạch.
- XLS_TP có cột: mục công việc, chi tiết thực hiện, kết quả, trạng thái, khó khăn/đề xuất, kế hoạch tháng sau. Tháng 09 có bảng nhật ký tuần.
- Bảng quản lý hồ sơ riêng cung cấp tình trạng giấy tờ, người thực hiện, ngày scan, dịch, công chứng, xin tem, nộp trường, invoice.
- Mẫu quý và 6 tháng cần được bổ sung bản nguồn chuẩn để xác nhận chính xác định dạng, chỉ tiêu và người duyệt. Không tự tạo 'form chính thức'.

## Thiết kế dữ liệu báo cáo
1. Nhân viên ghi `tasks` và `task_updates` trực tiếp; trạng thái công việc phân biệt `PLANNED`, `IN_PROGRESS`, `BLOCKED`, `DONE`, `CANCELLED`.
2. Hệ thống sinh nháp báo cáo tuần từ activity có `effectiveAt` trong kỳ; user sửa phần mô tả nhưng không được âm thầm đổi sự kiện nguồn.
3. Kế hoạch tuần tới tạo thành các `tasks` có `plannedStart`/`dueAt` trong kỳ mới, không phải việc đã hoàn thành tuần hiện tại.
4. Trưởng phòng tổng hợp công việc cá nhân + công việc phòng + `case`/`application` trạng thái đúng cutoff.
5. `reports` giữ draft/review/approved, `report_snapshots` giữ số liệu & văn bản chốt, `sourceIds`, cutoff và phiên bản mẫu.
6. Quý/6 tháng/năm: tính từ dữ liệu gốc theo kỳ, **không cộng '5 hồ sơ tháng 8' với '5 hồ sơ tháng 9' thành 10 học viên**.

## Định nghĩa KPI đề xuất
| Mã | KPI | Công thức logic | Chống đếm sai |
|---|---|---|---|
| KPI01 | Học viên hoạt động tại thời điểm T | COUNT DISTINCT `studentId` với case active tại T | không cộng snapshots từng tháng |
| KPI02 | Hồ sơ theo stage | COUNT DISTINCT `caseId` có stage tại T | không lấy 'Đang học tiếng' là stage |
| KPI03 | Tỷ lệ checklist đạt | count requirements applicable `PASSED` / count requirements applicable | điều kiện áp dụng & hết hạn |
| KPI04 | Việc trễ hạn | COUNT task chưa DONE có dueAt < T | chỉ đếm 1 task/ID |
| KPI05 | Bàn giao đối ngoại | COUNT application có event `INTERNAL_HANDOVER` xác thực | không đồng nghĩa trường nhận |
| KPI06 | Đã gửi trường | COUNT application có event `SENT_TO_SCHOOL` | không đồng nghĩa trường nhận |
| KPI07 | Trường đã nhận | COUNT application có event `RECEIVED_BY_SCHOOL` kèm chứng cứ | nếu nghi ngờ = DISPUTED, không đếm |
| KPI08 | Tỷ lệ phỏng vấn đạt | approved interviews / finalized official interviews | phỏng vấn thử riêng |
| KPI09 | Visa được cấp | COUNT visa có decision `ISSUED` | không đếm nộp visa |
| KPI10 | Báo cáo đúng hạn | số báo cáo được duyệt trước deadline / số báo cáo phải nộp | phải định nghĩa mốc nộp |

**Nguồn báo cáo hiện có bất nhất:** Báo cáo trưởng phòng tháng 9 có nêu Chosun và Ansan đã tiếp nhận, trong khi một bản tổng hợp quý chốt 29/09 ghi chưa có xác nhận trường. Cần đối chiếu thời điểm chỉnh sửa/tài liệu chứng minh và tách dữ liệu snapshot theo ngày; không tự chọn số cuối cùng.
