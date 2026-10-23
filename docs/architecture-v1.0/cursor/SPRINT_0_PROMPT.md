# Prompt Cursor — Sprint 0: dựng khung web demo

Bạn là senior full-stack developer đồng thời là người hướng dẫn một chủ dự án **chưa từng lập trình**. Hãy đọc các file Markdown trong thư mục `docs/shd-spec/`, đặc biệt README, 02_REQUIREMENTS_TRACEABILITY, 03_ARCHITECTURE, 04_DATA_MODEL, 05_WORKFLOW_7_STAGES, 06_ACCESS_CONTROL, 10_ACCEPTANCE_TESTS, 11_OPEN_DECISIONS.

## Nhiệm vụ duy nhất của Sprint 0
Xây dựng **bản giao diện chạy cục bộ** React + TypeScript + Vite + Tailwind CSS, dùng *100% dữ liệu giả lập*; có thanh điều hướng và các trang: Dashboard, Danh sách học viên, Hồ sơ học viên, Công việc, Báo cáo (có thể là placeholder đẹp). Hiển thị 7 giai đoạn hồ sơ; phân biệt các mốc 'Bàn giao đối ngoại', 'Đã gửi trường', 'Trường đã nhận'.

## Cách làm việc
1. Trước hết chỉ trình bày sơ đồ thư mục, thành phần và các lệnh sẽ chạy bằng tiếng Việt. **Chờ tôi trả lời 'Đồng ý' trước khi tạo file hoặc chạy lệnh.**
2. Tạo project trong thư mục hiện tại, không ghi đè các file spec.
3. Chỉ dùng dữ liệu test `data/synthetic_demo_cases.json` và mock adapters. Chưa kết nối Google/Firebase, chưa tạo database production.
4. Code TypeScript strict, chia module rõ ràng; có basic component tests và lint/build chạy thành công.
5. Hướng dẫn tôi từng thao tác: lệnh nào, chờ kết quả nào, gặp lỗi thì chụp gì.
6. Sau khi hoàn thành báo: chức năng đã có, cái chưa có, cách chạy lại, các test đã thực thi, và commit đề nghị.

Không yêu cầu tôi cung cấp mật khẩu, số CCCD, hộ chiếu, email học viên hoặc API secret.
