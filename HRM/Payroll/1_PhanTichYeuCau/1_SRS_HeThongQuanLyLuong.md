# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
# HỆ THỐNG QUẢN LÝ LƯƠNG

**Phiên bản:** 1.0  
**Ngày:** 2024  
**Trạng thái:** Draft

---

## MỤC LỤC
1. [Giới thiệu](#1-giới-thiệu)
2. [Mô tả tổng quan hệ thống](#2-mô-tả-tổng-quan-hệ-thống)
3. [Yêu cầu nghiệp vụ (Business Requirements)](#3-yêu-cầu-nghiệp-vụ-business-requirements)
4. [Yêu cầu chức năng (Functional Requirements)](#4-yêu-cầu-chức-năng-functional-requirements)
5. [Yêu cầu phi chức năng (Non-functional Requirements)](#5-yêu-cầu-phi-chức-năng-non-functional-requirements)
6. [Ràng buộc và giới hạn](#6-ràng-buộc-và-giới-hạn)
7. [Giả định và phụ thuộc](#7-giả-định-và-phụ-thuộc)
8. [Phụ lục](#8-phụ-lục)

---

## 1. GIỚI THIỆU

### 1.1 Mục đích tài liệu
Tài liệu này mô tả chi tiết các yêu cầu cho việc phát triển Hệ thống Quản lý Lương, bao gồm yêu cầu nghiệp vụ, yêu cầu chức năng và yêu cầu phi chức năng.

### 1.2 Phạm vi dự án
Hệ thống Quản lý Lương được xây dựng để:
- Tự động hóa quy trình tính lương cho nhân viên
- Quản lý linh hoạt các loại bảng lương khác nhau
- Tính toán bảo hiểm, thuế TNCN theo quy định
- Quản lý hợp đồng lao động và lịch sử lương

### 1.3 Định nghĩa và từ viết tắt
| Từ viết tắt | Mô tả |
|-------------|-------|
| BHXH | Bảo hiểm xã hội |
| BHYT | Bảo hiểm y tế |
| BHTN | Bảo hiểm thất nghiệp |
| TNCN | Thu nhập cá nhân |
| HR | Human Resources (Nhân sự) |

### 1.4 Người dùng mục tiêu
- **Nhân viên HR**: Quản lý thông tin nhân viên, tính lương
- **Kế toán**: Xử lý thanh toán, báo cáo tài chính
- **Quản lý**: Phê duyệt, xem báo cáo
- **Nhân viên**: Xem bảng lương cá nhân

---

## 2. MÔ TẢ TỔNG QUAN HỆ THỐNG

### 2.1 Bối cảnh nghiệp vụ
Hiện tại, nhiều doanh nghiệp đang gặp khó khăn trong việc:
- Tính lương thủ công bằng Excel, dễ sai sót
- Khó quản lý nhiều loại bảng lương khác nhau
- Cập nhật thay đổi quy định phức tạp
- Thiếu tính minh bạch trong tính lương

### 2.2 Mục tiêu hệ thống
- **Tự động hóa**: Giảm 90% thời gian tính lương
- **Chính xác**: Đảm bảo 100% tính toán đúng quy định
- **Linh hoạt**: Hỗ trợ mọi loại hình doanh nghiệp
- **Minh bạch**: Nhân viên có thể tra cứu chi tiết

### 2.3 Giới hạn hệ thống
- Chỉ áp dụng cho doanh nghiệp tại Việt Nam
- Tính lương theo tháng (không hỗ trợ tuần/ngày)
- Không tích hợp trực tiếp với ngân hàng

---

## 3. YÊU CẦU NGHIỆP VỤ (BUSINESS REQUIREMENTS)

### BR01: Quản lý cơ cấu lương linh hoạt
**Mô tả:** Hệ thống phải cho phép thiết kế nhiều loại bảng lương khác nhau cho từng phòng ban/vị trí

**Chi tiết:**
- Mỗi phòng ban/nhân viên có thể có cấu trúc lương riêng
- Cho phép thêm/bớt các thành phần lương động
- Hỗ trợ công thức tính toán phức tạp

**Lợi ích:** Phù hợp với mọi mô hình kinh doanh

### BR02: Tuân thủ quy định pháp luật
**Mô tả:** Hệ thống phải tính toán đúng theo quy định về bảo hiểm, thuế TNCN

**Chi tiết:**
- Cập nhật kịp thời thay đổi quy định
- Lưu trữ lịch sử để kiểm toán
- Xuất báo cáo theo mẫu quy định

**Lợi ích:** Tránh rủi ro pháp lý, phạt hành chính

### BR03: Tối ưu hóa quy trình làm việc
**Mô tả:** Giảm thiểu công sức và thời gian xử lý lương

**Chi tiết:**
- Tự động tạo bảng lương hàng tháng
- Tích hợp với hệ thống chấm công
- Quy trình phê duyệt điện tử

**Lợi ích:** Tiết kiệm 80% thời gian xử lý

### BR04: Đảm bảo tính bảo mật
**Mô tả:** Bảo vệ thông tin lương nhạy cảm

**Chi tiết:**
- Phân quyền chi tiết theo vai trò
- Mã hóa dữ liệu nhạy cảm
- Log audit trail đầy đủ

**Lợi ích:** Bảo mật thông tin, tuân thủ GDPR

---

## 4. YÊU CẦU CHỨC NĂNG (FUNCTIONAL REQUIREMENTS)

### 4.1 Quản lý Loại bảng lương

#### FR01: Tạo loại bảng lương
**Mô tả:** Cho phép định nghĩa template bảng lương

**Input:**
- Tên loại bảng lương
- Phòng ban áp dụng
- Danh sách thuộc tính (cột)
- Công thức tính toán

**Process:**
1. Kiểm tra tên không trùng
2. Validate công thức
3. Lưu template

**Output:**
- Template bảng lương mới
- Mã loại bảng lương

**Business Rules:**
- Mỗi loại phải có ít nhất thuộc tính lương cơ bản
- Công thức phải hợp lệ về cú pháp

#### FR02: Cấu hình thuộc tính động
**Mô tả:** Thêm/sửa/xóa các cột trong bảng lương

**Các loại thuộc tính:**
- Lấy từ hệ thống (lương cơ bản từ hợp đồng)
- Nhập thủ công (số công, thưởng)
- Tính theo công thức

### 4.2 Quản lý Nhân viên

#### FR03: Quản lý thông tin nhân viên
**Mô tả:** CRUD thông tin nhân viên

**Thông tin quản lý:**
- Thông tin cá nhân
- Phòng ban, chức vụ
- Loại bảng lương áp dụng
- Người phụ thuộc (giảm trừ gia cảnh)

#### FR04: Quản lý hợp đồng lao động
**Mô tả:** Quản lý hợp đồng và phụ lục

**Chức năng:**
- Tạo hợp đồng mới
- Tạo phụ lục hợp đồng
- Chọn quy định BH/Thuế áp dụng
- Quản lý lịch sử hợp đồng

### 4.3 Tính toán Lương

#### FR05: Tạo bảng lương tháng
**Mô tả:** Tự động tạo bảng lương cho tất cả nhân viên

**Quy trình:**
1. Xác định loại bảng lương của từng NV
2. Tạo bảng lương theo template
3. Điền dữ liệu từ hệ thống
4. Cho phép nhập dữ liệu thủ công
5. Tính toán theo công thức
6. Tính BH, thuế TNCN
7. Tính lương thực nhận

#### FR06: Tính bảo hiểm
**Mô tả:** Tính BHXH, BHYT, BHTN theo quy định

**Công thức:**
- BHXH = Lương đóng BH × 8% (NLĐ) + 17.5% (DN)
- BHYT = Lương đóng BH × 1.5% (NLĐ) + 3% (DN)  
- BHTN = Lương đóng BH × 1% (NLĐ) + 1% (DN)

**Giới hạn:**
- Mức trần: 20 lần lương cơ sở
- Mức sàn: Lương tối thiểu vùng

#### FR07: Tính thuế TNCN
**Mô tả:** Tính thuế lũy tiến từng phần theo quy định Việt Nam

**Công thức chính xác:**
```
Thu nhập chịu thuế = Thu nhập GROSS - BHXH cá nhân (8%) - Giảm trừ cá nhân - Giảm trừ người phụ thuộc
Trong đó:
- Thu nhập GROSS = Lương cơ bản + Phụ cấp chịu thuế (TRƯỚC khi trừ BHXH)
- Giảm trừ cá nhân = 11,000,000 VNĐ (2024)
- Giảm trừ người phụ thuộc = 4,400,000 VNĐ/người
- Thuế TNCN = Áp dụng biểu thuế lũy tiến trên thu nhập chịu thuế
```

**Lưu ý quan trọng:** Thuế TNCN được tính từ thu nhập GROSS (trước BHXH), không phải từ lương NET

**Giảm trừ:**
- Bản thân: 11,000,000 VNĐ/tháng
- Phụ thuộc: 4,400,000 VNĐ/người/tháng

### 4.4 Quản lý Quy định

#### FR08: Quản lý quy định bảo hiểm
**Mô tả:** Cấu hình tỷ lệ, mức trần BH

**Chức năng:**
- Tạo quy định mới với ngày áp dụng
- Lưu lịch sử thay đổi
- Tự động áp dụng theo ngày

#### FR09: Quản lý biểu thuế
**Mô tả:** Cấu hình bậc thuế TNCN

**Cấu hình:**
- Các bậc thuế và tỷ lệ
- Ngày áp dụng
- Công thức tính

#### FR10: Quản lý loại thu nhập
**Mô tả:** Định nghĩa các khoản thu nhập

**Thuộc tính:**
- Miễn thuế/Chịu thuế
- Tính/Không tính vào lương BH
- Giá trị mặc định

### 4.5 Báo cáo

#### FR11: Báo cáo bảng lương
**Mô tả:** Xuất bảng lương theo tháng

**Định dạng:**
- PDF cho từng nhân viên
- Excel tổng hợp
- Email gửi nhân viên

#### FR12: Báo cáo bảo hiểm
**Mô tả:** Báo cáo đóng BHXH, BHYT, BHTN

**Mẫu báo cáo:**
- D02-TS: Tờ khai tham gia BHXH
- C12-TS: Danh sách lao động tham gia BHXH

#### FR13: Báo cáo thuế TNCN
**Mô tả:** Báo cáo quyết toán thuế

**Mẫu báo cáo:**
- Bảng kê thuế TNCN
- Quyết toán thuế năm

### 4.6 Phân quyền

#### FR14: Quản lý người dùng và phân quyền
**Mô tả:** Phân quyền theo vai trò

**Vai trò:**
- **Admin**: Toàn quyền hệ thống
- **HR Manager**: Quản lý nhân viên, tính lương
- **Accountant**: Xem báo cáo, xuất thanh toán
- **Manager**: Xem báo cáo phòng ban
- **Employee**: Xem lương cá nhân

---

## 5. YÊU CẦU PHI CHỨC NĂNG (NON-FUNCTIONAL REQUIREMENTS)

### 5.1 Hiệu năng (Performance)

#### NFR01: Thời gian xử lý
- Tạo bảng lương 1000 nhân viên: < 5 phút
- Tính toán lương 1 nhân viên: < 2 giây
- Xuất báo cáo: < 10 giây

#### NFR02: Khả năng xử lý đồng thời
- Hỗ trợ tối thiểu 100 user đồng thời
- Xử lý được 10,000 nhân viên

### 5.2 Tính sẵn sàng (Availability)

#### NFR03: Uptime
- Uptime: 99.5% (cho phép downtime 3.5 giờ/tháng)
- Backup: Hàng ngày vào 2:00 AM
- Recovery time objective (RTO): < 4 giờ

### 5.3 Bảo mật (Security)

#### NFR04: Xác thực và phân quyền
- Xác thực 2 yếu tố cho HR và Admin
- Mã hóa mật khẩu với bcrypt
- Session timeout sau 30 phút không hoạt động

#### NFR05: Mã hóa dữ liệu
- Mã hóa dữ liệu lương với AES-256
- HTTPS cho toàn bộ kết nối
- Backup được mã hóa

#### NFR06: Audit Trail
- Log mọi thao tác với dữ liệu lương
- Lưu trữ log tối thiểu 3 năm
- Không thể xóa/sửa log

### 5.4 Khả năng sử dụng (Usability)

#### NFR07: Giao diện người dùng
- Responsive design cho mobile/tablet
- Thời gian training cho user mới: < 2 giờ
- Hỗ trợ tiếng Việt và tiếng Anh

#### NFR08: Trải nghiệm người dùng
- Mọi thao tác không quá 3 click
- Có gợi ý và validate real-time
- Thông báo lỗi rõ ràng

### 5.5 Khả năng bảo trì (Maintainability)

#### NFR09: Cấu trúc code
- Tuân thủ clean code principles
- Code coverage > 80%
- Document API đầy đủ

#### NFR10: Khả năng mở rộng
- Microservices architecture
- Database sharding ready
- Horizontal scaling support

### 5.6 Tương thích (Compatibility)

#### NFR11: Trình duyệt
- Chrome (phiên bản 2 năm gần nhất)
- Firefox (phiên bản 2 năm gần nhất)
- Safari (phiên bản 2 năm gần nhất)
- Edge (phiên bản 2 năm gần nhất)

#### NFR12: Hệ điều hành
- Windows 10 trở lên
- macOS 10.14 trở lên
- Ubuntu 18.04 LTS trở lên

### 5.7 Tuân thủ (Compliance)

#### NFR13: Quy định pháp luật
- Tuân thủ Luật Lao động Việt Nam
- Tuân thủ quy định về BHXH, BHYT, BHTN
- Tuân thủ Luật thuế TNCN

#### NFR14: Chuẩn quốc tế
- ISO 27001 cho bảo mật thông tin
- GDPR cho bảo vệ dữ liệu cá nhân

---

## 6. RÀNG BUỘC VÀ GIỚI HẠN

### 6.1 Ràng buộc kỹ thuật
- Backend: Java Spring Boot hoặc .NET Core
- Frontend: React hoặc Angular
- Database: PostgreSQL hoặc MySQL
- Deploy trên cloud (AWS/Azure/GCP)

### 6.2 Ràng buộc nghiệp vụ
- Chỉ tính lương theo tháng
- Không xử lý thanh toán trực tiếp
- Giới hạn 50 loại bảng lương khác nhau

### 6.3 Ràng buộc thời gian
- Phase 1 (MVP): 3 tháng
- Phase 2 (Full features): 6 tháng
- Go-live: Trước kỳ tính lương tháng 1/2025

### 6.4 Ràng buộc ngân sách
- Tổng ngân sách: 500 triệu VNĐ
- Bao gồm: Development, Testing, Training
- Không bao gồm: Infrastructure, License

---

## 7. GIẢ ĐỊNH VÀ PHỤ THUỘC

### 7.1 Giả định
- Doanh nghiệp đã có hệ thống chấm công
- Nhân viên có email công ty
- Có đội IT hỗ trợ vận hành
- Quy định pháp luật không thay đổi đột ngột

### 7.2 Phụ thuộc
- API chấm công từ hệ thống hiện tại
- Email server để gửi bảng lương
- Kết nối internet ổn định
- Đào tạo user trước go-live

---

## 8. PHỤ LỤC

### 8.1 Glossary
| Thuật ngữ | Định nghĩa |
|-----------|-----------|
| Loại bảng lương | Template định nghĩa cấu trúc bảng lương |
| Bảng lương | Instance thực tế của lương tháng |
| Lương đóng BH | Mức lương làm căn cứ tính BH |
| Thu nhập tính thuế | Thu nhập sau khi trừ các khoản giảm trừ |

### 8.2 Tài liệu tham khảo
- Luật Lao động số 45/2019/QH14
- Luật Bảo hiểm xã hội số 58/2014/QH13
- Luật Thuế TNCN số 04/2007/QH12
- Nghị định 145/2020/NĐ-CP về BHXH

### 8.3 Change Log
| Ngày | Phiên bản | Thay đổi | Người thực hiện |
|------|-----------|----------|-----------------|
| 01/01/2024 | 1.0 | Tạo mới | BA Team |

---

**Xác nhận và phê duyệt:**

| Vai trò | Họ tên | Chữ ký | Ngày |
|---------|--------|--------|------|
| Business Analyst | | | |
| Project Manager | | | |
| Technical Lead | | | |
| Client Representative | | | |
