# 11 — Các quyết định còn mở và rủi ro nguồn

| ID | Quyết định / vấn đề | Trạng thái đề xuất | Ai xác minh |
|---|---|---|---|
| D01 | SHD-KR-HS-01/02 đang ở trạng thái phát hành thực tế nào? Trang bìa chưa có ngày hiệu lực, chữ ký trong tệp trống | Chưa xác minh hiệu lực | Trưởng phòng/Giám đốc |
| D02 | Quy trình nào ưu tiên khi khác nhau về timeline: SOP01 kỳ nhập học, SOP02 tuần tương đối? | Cần quy tắc chọn cấu hình | Trưởng phòng |
| D03 | Ai được duyệt chuyển từng stage, ai được kiểm tra chéo tài liệu, có trường hợp tự duyệt của trưởng phòng? | Chưa có ma trận ký duyệt chi tiết | Trưởng phòng/GĐ |
| D04 | Mỗi case tương ứng một kỳ/trường hay nhiều trường? Đề xuất `case` 1—N `school_application` | Chờ xác nhận | Trưởng phòng/Đối ngoại |
| D05 | Cần chính sách bảo lưu/chuyển kỳ/rút hồ sơ và lưu chứng cứ như thế nào? | Chưa có đầy đủ SOP | Trưởng phòng |
| D06 | Khác biệt trạng thái trường tiếp nhận tại báo cáo tháng 9 và tổng hợp Q3: căn cứ biên nhận và ngày cập nhật? | Xung đột nguồn, không auto-resolution | Đối ngoại/Trưởng phòng |
| D07 | Báo cáo Q3 có tổng livestream 10, mẫu trưởng phòng tháng 9 nêu 11; chốt số theo kỳ/cutoff và danh sách sự kiện nào? | Cần đối chiếu nguồn và tiêu chí đếm | Trưởng phòng/MKT |
| D08 | Hạn nộp và duyệt báo cáo tuần/tháng/quý/năm là ngày nào? Ai duyệt cuối? | Chưa được nêu đầy đủ | Ban Giám đốc |
| D09 | Cần thêm biểu mẫu quý, 6 tháng, năm chính thức để chuẩn hóa template không? | Có | Trưởng phòng |
| D10 | Tiến độ học viên 'Đang học tiếng' có phải nằm ngoài Case workflow? | Đề xuất tách `learning_enrollment_status` | Trưởng phòng/Đào tạo |
| D11 | Ai được xem hồ sơ tài chính/hộ chiếu và tài liệu nhạy cảm, ai được tải hàng loạt? | Chưa khóa quyền | Chủ dữ liệu/IT |
| D12 | Dữ liệu Excel gốc có `#NAME?`, kiểu cột `Số buổi nghỉ` không nhất quán; chuẩn hóa thế nào? | Quarantine khi import | Nhân viên hồ sơ |
| D13 | Chứng từ báo cáo ghi 'chỉnh sửa sổ đỏ' có nghĩa là chỉnh file trình bày/đối chiếu hay thay đổi nội dung giấy tờ? | Phải xác minh; phần mềm không hỗ trợ giả mạo | Trưởng phòng/pháp chế |
| D14 | Quy định giữ/xóa dữ liệu và hồ sơ khi học viên rút hoặc kết thúc hợp đồng? | Cần ban hành | Pháp chế/IT |
| D15 | Dùng Firestore hay PostgreSQL sau thử nghiệm khả năng truy vấn dashboard? | Thử nghiệm rồi chốt | Người phụ trách kỹ thuật |
| D16 | Tài khoản Cloud/Drive production do công ty sở hữu, phương án backup, người thay thế? | Phải xác nhận trước go-live | IT/Ban Giám đốc |
| D17 | Phân loại thông số tham chiếu phí, cơ quan, thời hạn cập nhật liên tục như thế nào? | Cần có owner và effectiveAt | Trưởng phòng |
| D18 | Thiết lập kiểm soát tự động đối với trạng thái và tài liệu phụ thuộc điều kiện riêng (ví dụ nghề nghiệp, loại trường)? | Cần kiểm tra checklist chi tiết | Trưởng phòng |

**Cách xử lý:** ghi `owner`, `dueDate`, `decision`, `approvedBy`, `approvedAt` vào quyết định; không sửa dòng nguồn để làm biến mất xung đột.
