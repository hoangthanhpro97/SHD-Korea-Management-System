# 05 — Workflow 7 giai đoạn theo SOP01/SOP02

**Nguồn chuẩn định hướng:** SOP01 tr.5–15 & phụ lục 1A/2A/3A; SOP02 tr.3–11.
Một giai đoạn có `NOT_STARTED`, `IN_PROGRESS`, `BLOCKED`, `READY_FOR_REVIEW`, `APPROVED`, `REOPENED`; Case có `ACTIVE`, `ON_HOLD`, `WITHDRAWAL_REQUESTED`, `WITHDRAWN`, `COMPLETED`, `CANCELLED`. Đây là **enum đề xuất**, chưa phải từ nguyên văn SOP.

| Stage | Tên | Việc con chính | Kiểm tra trước khi chuyển (đề xuất tự động/duyệt tay) |
|---|---|---|---|
| ST01 | Tiếp nhận, xử lý hồ sơ đầu vào | Ký hợp đồng; cấp mã; nhận giấy tờ; khai thông tin; ghi yêu cầu bổ sung | Thông tin cá nhân nhất quán; hồ sơ đầu vào theo PL1A; xác định nguồn tài chính/người bảo lãnh; reviewer duyệt |
| ST02 | Xử lý hồ sơ trường | Chứng minh thu nhập thực tế; tập hợp scan; kiểm tra chéo; dịch/công chứng; chứng nhận tại cơ quan | Có review của người khác; tệp hợp lệ theo PL2A; có trạng thái từng bản chứng nhận |
| ST03 | Nộp hồ sơ trường | Kế hoạch học tập; form trường; bàn giao đối ngoại; gửi trường; nhận xác nhận | Có evidence bàn giao, evidence gửi, evidence trường nhận nếu muốn tính trường đã nhận |
| ST04 | Phỏng vấn trường | Lịch ôn, phỏng vấn thử, phỏng vấn thực, kết quả; invoice/thư mời khi có | Không coi 'phỏng vấn đã tổ chức' là 'đậu'; lưu trường hợp phỏng vấn lại/chuyển trường |
| ST05 | Xử lý hồ sơ Lãnh sự | Kiểm tra tài chính, xác nhận địa phương; dịch; khám lao; ngân hàng | PL3A phù hợp điều kiện riêng; tệp hợp lệ, chưa hết hạn; reviewer duyệt |
| ST06 | Nộp Visa | Kiểm tra hồ sơ; nộp; mã hồ sơ; phỏng vấn nếu yêu cầu; tra cứu; kết quả | Có biên nhận, mã tra cứu, kết quả visa; theo dõi yêu cầu bổ sung riêng |
| ST07 | Xuất cảnh, bàn giao | Checklist trước bay; hồ sơ gốc; bay; nhập cảnh; bàn giao/nhập học | Chỉ `COMPLETED` khi có chứng cứ hoàn tất bàn giao, nhập cảnh và xác nhận ban đầu theo SOP |

## Event trường phải tách (rất quan trọng)
`DRAFTED` → `INTERNAL_HANDOVER` → `SENT_TO_SCHOOL` → `RECEIVED_BY_SCHOOL` → `INTERVIEW_SCHEDULED` → `INTERVIEW_RESULT` → `OFFER/INVITATION`.
`INTERNAL_HANDOVER` không làm `SENT_TO_SCHOOL=true`. `SENT_TO_SCHOOL` không làm `RECEIVED_BY_SCHOOL=true` nếu thiếu bằng chứng. Trường hợp nguồn ghi mâu thuẫn: `DISPUTED` + mở issue.

## Điều kiện chặn kỹ thuật
- Không đổi ST01 → ST02 nếu `financialSourceVerified=false` hoặc `identityMismatchOpen=true` (SOP01 tr.6). Việc định nghĩa kiểm tra bằng giấy tờ nào cần người phụ trách xác nhận.
- Không duyệt yêu cầu `REVIEW_REQUIRED` nếu người duyệt bằng người tạo, tại vị trí kiểm tra chéo (SOP01 tr.7).
- Không cho user thường tự ghi sự kiện xác nhận từ trường nếu không có chứng cứ/được đơn vị có quyền xác thực.
- Nếu yêu cầu chứng từ phụ thuộc nghề nghiệp/bảo lãnh, checklist là conditional, không cố gắn tất cả 14 giấy tờ cho mọi người.
- ST03 và ST04 có thể có vòng lặp trường thay thế / phỏng vấn lại (SOP01 tr.10–11), không coi workflow là tuyến tính tuyệt đối.
- Mọi chuyển bước và thay đổi người xử lý ghi audit event.

## Mốc thời gian
SOP01 tr.5 tham chiếu kỳ 03/06/09/12; SOP02 tr.3 tham chiếu tuần tương đối 2/3/9/10/11/14/18–20. Do khác cách biểu diễn, giữ song song `intake_calendar_template` và `relative_week_template`, chọn theo phiên bản cấu hình; không tự động giả định chúng khớp nhau.

**Không hardcode**: lệ phí, địa chỉ, yêu cầu khám, tiền đóng băng, thời hạn; SOP01 ghi rõ có thể thay đổi.
