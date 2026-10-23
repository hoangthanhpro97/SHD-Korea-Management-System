# 15 — Mốc thời gian theo kỳ nhập học

## Nguồn SOP01 trang 5 (khung tham chiếu, chưa phải deadline cứng)
| Kỳ | Tiếp nhận | Hồ sơ trường | Nộp trường | Phỏng vấn | Hồ sơ lãnh sự | Nộp visa | Xuất cảnh |
|---|---|---|---|---|---|---|---|
| 03 | Đến 30/09 | 15/09–15/10 | 01/10–15/12 | 01/12–31/12 | 15/12–10/01 | 10/01–10/02 | 01/03–30/03 |
| 06 | Đến 31/01 | 15/12–15/01 | 01/01–15/03 | 01/03–31/03 | 15/03–10/04 | 01/05–25/05 | 01/06–30/06 |
| 09 | Đến 30/04 | 15/03–15/04 | 01/04–15/06 | 01/06–30/06 | 15/06–10/07 | 01/08–25/08 | 01/09–30/09 |
| 12 | Đến 30/07 | 15/06–15/07 | 01/07–15/09 | 01/09–30/09 | 15/09–10/10 | 01/11–25/11 | 01/12–30/12 |

## Nguồn SOP02 trang 3
- ST01: 2 tuần đầu; ST02: tuần 3; ST03: tuần 9; ST04: tuần 10; ST05: tuần 11; ST06: tuần 14; ST07: tuần 18–20.

## Đề xuất thiết kế
- Lưu `templateVersion`, `effectiveFrom`, `intakePeriod`, `schoolId?`, `country?`, `plannedStartAt`, `plannedEndAt`, `calendarTimezone`.
- Gán `deadline` cho từng stage và task sau khi xác nhận ngày nhập học thực tế và yêu cầu trường.
- Cảnh báo 'DUE_SOON'/'OVERDUE' tùy cấu hình, hỗ trợ gia hạn có lý do và người duyệt.
- Người phụ trách phải cập nhật biểu phí/địa chỉ/quy định có thể thay đổi; không đưa chi phí SOP01 thành hằng số trong code.
