# 02 — Ma trận truy vết nghiệp vụ → phần mềm (RTM)

`Nguồn`: SOP01 trang tài liệu gốc; SOP02 trang tài liệu gốc; XLS_HS/XLS_NV/XLS_TP chỉ sheet và cột.
`Mức`: MUST = MVP bắt buộc, SHOULD = trong giai đoạn tiếp theo, LATER = mở rộng.

| Mã | Nhu cầu nghiệp vụ | Căn cứ | Module | Bảng dữ liệu | Mức |
|---|---|---|---|---|---|
| BR-01 | Một học viên có mã quản lý, kỳ nhập học, thông tin đã xác minh | SOP01 tr.6; XLS_HS DS học viên | Students | students | MUST |
| BR-02 | Một hồ sơ có người phụ trách chính, kế hoạch và trạng thái | SOP01 tr.4 | Cases | cases, case_assignments | MUST |
| BR-03 | Thu và đánh giá giấy tờ đầu vào; tạo yêu cầu bổ sung | SOP01 tr.6 & PL1A tr.16 | Documents | document_requirements, document_submissions | MUST |
| BR-04 | Thông tin tài chính và thông tin cá nhân phải được xác thực trước khi qua bước hồ sơ trường | SOP01 tr.6 | Approval gates | stage_reviews, issues | MUST |
| BR-05 | Kiểm tra chéo tài liệu trước khi gửi dịch, chứng nhận, trường, visa | SOP01 tr.4, 7, 8 | Reviews | stage_reviews, audit_events | MUST |
| BR-06 | Tài liệu có bản scan, bản dịch, chứng nhận, nhiều phiên bản | SOP01 tr.7–9, PL4A tr.20 | Files | documents, document_assets | MUST |
| BR-07 | Chuyển hồ sơ đến Đối ngoại, gửi Trường, Trường xác nhận là 3 mốc riêng | SOP01 tr.10; XLS_TP tháng 09; báo cáo Q3 | Applications | school_applications, application_events | MUST |
| BR-08 | Phỏng vấn có lịch, người phụ trách, kết quả, lần thử/lần thật | SOP01 tr.11; SOP02 tr.8 | Interviews | interviews | SHOULD |
| BR-09 | Visa có mã nộp, biên nhận, trạng thái, yêu cầu bổ sung | SOP01 tr.14 | Visa | visa_applications, case_events | SHOULD |
| BR-10 | Bay, bàn giao giấy tờ gốc, xác nhận nhập học sau đến nơi | SOP01 tr.15 | Departure | handovers, departures | SHOULD |
| BR-11 | Công việc hồ sơ và công việc hành chính, sự kiện cùng tồn tại | XLS_NV, XLS_TP | Tasks | tasks, task_updates | MUST |
| BR-12 | Nhân viên báo cáo việc, tiến độ, kế hoạch tuần tới | XLS_NV hàng tiêu đề và dữ liệu | Reporting | report_periods, reports | MUST |
| BR-13 | Trưởng phòng tổng hợp, khó khăn, đề xuất và kế hoạch tháng sau | XLS_TP hàng tiêu đề và dữ liệu | Reporting | reports, report_lines | MUST |
| BR-14 | Có invoice, tỷ giá, ngày chuyển, đối chiếu chứng từ | XLS_HS Invoice & Thanh toán | Finance | invoices, payments | SHOULD |
| BR-15 | Mốc thời gian thay đổi theo kỳ nhập học & trường | SOP01 tr.5; SOP02 tr.3 | Configuration | intake_periods, stage_templates | MUST |
| BR-16 | Chức năng cảnh báo trễ hạn có người xử lý ngoại lệ | SOP01 tr.4 | Alerts | notifications, issues | MUST |
| BR-17 | Kiểm soát theo phòng/vai trò, không tự xem mọi tài liệu | SOP01 tr.4 & quy trình phòng; thiết kế bổ sung | IAM | users, memberships, grants | MUST |
| BR-18 | Lưu báo cáo đã chốt và nguồn dẫn chứng để không đổi số lịch sử | Khác biệt tài liệu tổng hợp 09/Q3; yêu cầu báo cáo | Reporting | report_snapshots, metric_evidence | MUST |

**Không được viết code các quy tắc chưa phê duyệt**: ai duyệt stage 1/2/3/4/5/6/7, ai được đổi người phụ trách, ai được xuất tất cả tài liệu, điều kiện đóng hồ sơ, cutoff báo cáo.
