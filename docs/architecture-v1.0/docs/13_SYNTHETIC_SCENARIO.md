# 13 — Một hồ sơ DEMO đi qua hệ thống (không có dữ liệu thật)

1. NV01 tạo `studentId=stu_demo_01` tên giả lập `Học viên Demo A`, `studentCode=DEMO2026-001`.
2. Tạo `caseId=case_demo_01`, `periodId=2026-12`, giao `ownerUserId=user_demo_hs01`.
3. Nhập danh sách giấy tờ PL1A. Hệ thống báo thiếu `residence_certificate`, tạo issue và task nhắc bổ sung.
4. Khi bổ sung tài liệu, reviewer NV02 kiểm tra độc lập (không phải NV01). Bản scan có metadata `driveFileId=DEMO_ONLY`, chưa gọi Google Drive API.
5. Hồ sơ stage 1 đủ và thông tin tài chính hợp lệ theo xác nhận của nhân viên có thẩm quyền → trưởng phòng có quyền duyệt ST01 → ST02.
6. Nhân viên tập hợp giấy gửi dịch, nhận bản dịch và kiểm tra chéo trước khi đưa vào hồ sơ trường.
7. `applicationId=app_demo_schoolA_01` được **bàn giao đối ngoại** ngày T1 → dashboard 'bàn giao: 1', 'gửi trường: 0', 'trường nhận: 0'.
8. Đối ngoại cập nhật **đã gửi trường** T2 với chứng từ; lúc này dashboard 'gửi trường: 1', 'trường nhận: 0'.
9. Đối ngoại bổ sung biên nhận T3; reviewer xác thực → 'trường nhận: 1'.
10. Phỏng vấn thử ghi riêng, không được coi là phỏng vấn trường. Sau khi có kết quả chính thức và invoice, hệ thống lập bước xử lý tiếp.
11. Khi chốt báo cáo tuần tại T4, snapshot ghi đúng số theo T4, dù case thay đổi tuần sau.

Dữ liệu demo này dùng kiểm thử e2e, không phù hợp chứng minh tính đúng của mọi quy trình ngoài thực tế.
