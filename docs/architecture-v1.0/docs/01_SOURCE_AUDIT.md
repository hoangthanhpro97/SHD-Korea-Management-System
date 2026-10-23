# 01 — Kiểm tra nguồn và dữ liệu hiện có

## Nguồn nghiệp vụ chính được xem
| ID | Tên nguồn | Đã đọc | Nội dung |
|---|---|---|---|
| SOP01 | SHD-KR-HS-01 - Quy trình tiếp nhận, xử lý và quản lý hồ sơ du học Hàn Quốc.docx | Có | 20 trang: 7 giai đoạn, phân công, checklist 1A/2A/3A, lưu trữ 4A |
| SOP02 | SHD-KR-HS-02 - Quy trình tổng quan xử lý hồ sơ Hàn Quốc (1).docx | Có | 12 trang: 7 giai đoạn, sơ đồ trách nhiệm, ước lượng tuần 2/3/9/10/11/14/18-20 |
| XLS_HS | QUẢN LÝ HỒ SƠ DU HOC HÀN.xlsx | Có | 6 sheet: Dasboard, DS học viên, Hồ sơ chi tiết, Checklist, Invoice & Thanh toán, Danh mục |
| XLS_NV | BÁO CÁO TUẦN VÀ THÁNG CỦA NHÂN VIÊN.xlsx | Có | 4 sheet tháng 07–10/2026; form ghi nhận việc tuần/tháng & kế hoạch |
| XLS_TP | BÁO CÁO CÔNG VIỆC THEO TUẦN VÀ THÁNG CỦA TRƯỞNG PHÒNG.xlsx | Có | 3 sheet tháng 07–09/2026; quản lý kết quả, khó khăn, đề xuất, kế hoạch |

Ngoài 5 nguồn chính, thư viện dự án có nguồn tổng hợp Q3/2026; tài liệu có thể được dùng để đối chiếu nhưng không thay cho biên nhận gốc, bản cập nhật hiện trường, hoặc bản phê duyệt.

## Kết quả kiểm tra cấu trúc Excel
`XLS_HS`:
- `DS học viên!A1:AH101`: mã HV, thông tin cá nhân, chỉ số học tập, người phụ trách, kỳ bay, tiến độ, deadline, visa, bay.
- `Hồ sơ chi tiết!A1:AC55`: 1 dòng cho từng giấy tờ của học viên; thông tin nhận, scan, dịch, công chứng, chứng nhận và nộp trường.
- `Checklist!A1:N6`: biểu mẫu nộp giấy tờ theo hàng ngang (1 hàng/1 học viên).
- `Invoice & Thanh toán!A1:N41`: invoice, KRW, tỷ giá, VND, ngày chuyển tiền, trạng thái.
- `Danh mục!A1:H38`: các danh mục trạng thái, nhân sự, kỳ, loại giấy tờ.
- `Dasboard!A1:B5`: đếm học viên theo các trạng thái rất tổng quát.

`XLS_NV` tháng 07–10: nhóm `TG thực hiện / MỤC CÔNG VIỆC / NGÀY / CHI TIẾT / TÌNH TRẠNG-KẾT QUẢ / TRẠNG THÁI / KẾ HOẠCH TUẦN TỚI`.
`XLS_TP` các tháng 07–09: nhóm `Mục công việc / Chi tiết thực hiện / Tình trạng-Kết quả / Trạng thái / Khó khăn-Đề xuất / Kế hoạch tháng sau`; tháng 9 có phần báo cáo tuần phía dưới.

## Vấn đề dữ liệu cần lưu ý trước khi nhập
1. Một số ô liên kết trong `DS học viên`, `Checklist`, `Invoice & Thanh toán` trả `#NAME?`; phải xem lại công thức gốc, không tải giá trị lỗi vào database.
2. Cột `Số buổi nghỉ` tại `DS học viên` xuất hiện giá trị có kiểu ngày số Excel hoặc chuỗi; cần chuẩn hóa kiểu số nguyên và xác nhận ý nghĩa.
3. Ngày sinh tại `DS học viên` dùng chuỗi `yyyy.mm.dd`, nhiều mã điện thoại có thể bị chuyển thành số mất số 0. Không xử lý mã định danh điện thoại như số để tính toán.
4. Các đường dẫn ở `Hồ sơ chi tiết` có nơi trỏ tới *thư mục* Drive, không phải từng tài liệu. Cần bảng `document_assets` riêng.
5. Trạng thái hiện tại có cả `Đang học tiếng` (đào tạo), `Nộp trường` (hồ sơ), `Đóng học phí` (tài chính); phải tách các luồng trước khi di trú.
6. File tháng 9 trưởng phòng có diễn biến cập nhật tới đầu tháng 10, trong khi Q3 tổng hợp chốt 29/09 có kết luận khác nhau về xác nhận trường tiếp nhận. Phải có `recorded_at`, `effective_at`, `source_date` và `evidence`.
7. Một số mô tả công việc báo cáo dùng ngôn ngữ 'chỉnh sửa sổ đỏ' trong khi SOP01 bắt buộc chứng từ đúng thực tế, không tự ý sửa. **Không tự suy diễn là hành vi sửa chứng từ thật**; cần người phụ trách làm rõ nội dung để xác định hành động hợp lệ.

## Bảo mật & dữ liệu cá nhân
File gốc chứa PII (ví dụ số hộ chiếu, liên hệ, thông tin tài chính). Các tài liệu bàn giao ở bộ Kit cố ý không sao chép thông tin thật. Mọi thử nghiệm triển khai dùng `data/synthetic_demo_cases.json`.
