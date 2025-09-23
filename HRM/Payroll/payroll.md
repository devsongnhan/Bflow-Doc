Class Diagram - Hệ thống Quản lý Lương
mermaidclassDiagram
    class NhanVien {
        +String maNhanVien
        +String hoTen
        +String phongBan
        +Date ngayVaoLam
        +String loaiBangLuongId
        +getLoaiBangLuong()
        +getHopDongHienTai()
    }
    
    class LoaiBangLuong {
        +String maLoai
        +String tenLoai
        +String phongBanApDung
        +List~ThuocTinhBangLuong~ thuocTinhList
        +addThuocTinh()
        +removeThuocTinh()
    }
    
    class ThuocTinhBangLuong {
        +String maThuocTinh
        +String tenCot
        +String kieuDuLieu
        +String nguonDuLieu
        +String congThuc
        +Boolean batBuoc
    }
    
    class BangLuong {
        +String maBangLuong
        +String nhanVienId
        +String loaiBangLuongId
        +Integer thang
        +Integer nam
        +Date ngayTao
        +Map~String-Object~ duLieu
        +tinhToan()
        +getLuongThucNhan()
    }
    
    class HopDongLaoDong {
        +String maHopDong
        +String nhanVienId
        +Date ngayKy
        +Date ngayHetHan
        +Decimal luongCoBan
        +Boolean tinhBaoHiem
        +String quyDinhBaoHiemId
        +String quyDinhThueId
        +Boolean trangThai
    }
    
    class LoaiThuNhap {
        +String maLoai
        +String tenLoai
        +Decimal giaTri
        +Boolean mienThue
        +String moTa
    }
    
    class QuyDinhBaoHiem {
        +String maQuyDinh
        +String tenQuyDinh
        +Float tyLeBHXH
        +Float tyLeBHYT
        +Float tyLeBHTN
        +Decimal mucTranBHXH
        +Decimal mucTranBHYT
        +Decimal mucTranBHTN
        +Date ngayApDung
    }
    
    class QuyDinhThueTNCN {
        +String maQuyDinh
        +String tenQuyDinh
        +List~BacThue~ bacThueList
        +Date ngayApDung
        +tinhThue(thuNhap)
    }
    
    class BacThue {
        +Decimal mucTu
        +Decimal mucDen
        +Float tyLe
    }
    
    class QuyDinhGiamTru {
        +String maQuyDinh
        +Decimal giamTruBanThan
        +Decimal giamTruPhuThuoc
        +Date ngayApDung
    }
    
    NhanVien "1" --> "1" LoaiBangLuong : áp dụng
    NhanVien "1" --> "*" BangLuong : có
    NhanVien "1" --> "*" HopDongLaoDong : ký kết
    
    BangLuong "*" --> "1" LoaiBangLuong : theo mẫu
    
    LoaiBangLuong "1" *-- "*" ThuocTinhBangLuong : chứa
    LoaiBangLuong "1" --> "*" LoaiThuNhap : sử dụng
    
    HopDongLaoDong "*" --> "1" QuyDinhBaoHiem : áp dụng
    HopDongLaoDong "*" --> "1" QuyDinhThueTNCN : áp dụng
    
    QuyDinhThueTNCN "1" *-- "*" BacThue : chứa

ERD - Hệ thống Quản lý Lương
mermaiderDiagram
    NHAN_VIEN {
        varchar ma_nhan_vien PK
        varchar ho_ten
        varchar phong_ban
        date ngay_vao_lam
        varchar loai_bang_luong_id FK
        varchar email
        varchar sdt
        boolean trang_thai
    }
    
    LOAI_BANG_LUONG {
        varchar ma_loai PK
        varchar ten_loai
        varchar phong_ban_ap_dung
        text mo_ta
        boolean trang_thai
        datetime ngay_tao
    }
    
    THUOC_TINH_BANG_LUONG {
        varchar ma_thuoc_tinh PK
        varchar loai_bang_luong_id FK
        varchar ten_cot
        varchar kieu_du_lieu
        varchar nguon_du_lieu
        text cong_thuc
        boolean bat_buoc
        int thu_tu_hien_thi
    }
    
    BANG_LUONG {
        varchar ma_bang_luong PK
        varchar nhan_vien_id FK
        varchar loai_bang_luong_id FK
        int thang
        int nam
        date ngay_tao
        json du_lieu_luong
        decimal tong_thu_nhap
        decimal luong_thuc_nhan
        varchar trang_thai
    }
    
    HOP_DONG_LAO_DONG {
        varchar ma_hop_dong PK
        varchar nhan_vien_id FK
        varchar loai_hop_dong
        date ngay_ky
        date ngay_het_han
        decimal luong_co_ban
        boolean tinh_bao_hiem
        varchar quy_dinh_bao_hiem_id FK
        varchar quy_dinh_thue_id FK
        varchar quy_dinh_giam_tru_id FK
        boolean trang_thai
    }
    
    LOAI_THU_NHAP {
        varchar ma_loai PK
        varchar ten_loai
        decimal gia_tri_mac_dinh
        boolean mien_thue
        text mo_ta
        boolean trang_thai
    }
    
    LOAI_BANG_LUONG_THU_NHAP {
        varchar loai_bang_luong_id FK
        varchar loai_thu_nhap_id FK
        boolean bat_buoc
    }
    
    QUY_DINH_BAO_HIEM {
        varchar ma_quy_dinh PK
        varchar ten_quy_dinh
        float ty_le_bhxh_nld
        float ty_le_bhxh_dn
        float ty_le_bhyt_nld
        float ty_le_bhyt_dn
        float ty_le_bhtn_nld
        float ty_le_bhtn_dn
        decimal muc_tran_bhxh
        decimal muc_tran_bhyt
        decimal muc_tran_bhtn
        date ngay_ap_dung
        boolean trang_thai
    }
    
    QUY_DINH_THUE_TNCN {
        varchar ma_quy_dinh PK
        varchar ten_quy_dinh
        date ngay_ap_dung
        boolean trang_thai
    }
    
    BAC_THUE {
        varchar ma_bac PK
        varchar quy_dinh_thue_id FK
        decimal muc_tu
        decimal muc_den
        float ty_le
        int thu_tu
    }
    
    QUY_DINH_GIAM_TRU {
        varchar ma_quy_dinh PK
        decimal giam_tru_ban_than
        decimal giam_tru_phu_thuoc
        date ngay_ap_dung
        boolean trang_thai
    }
    
    NHAN_VIEN ||--o{ BANG_LUONG : "có nhiều"
    NHAN_VIEN ||--o{ HOP_DONG_LAO_DONG : "ký kết"
    NHAN_VIEN }|--|| LOAI_BANG_LUONG : "áp dụng"
    
    LOAI_BANG_LUONG ||--o{ THUOC_TINH_BANG_LUONG : "chứa"
    LOAI_BANG_LUONG ||--o{ BANG_LUONG : "làm mẫu cho"
    LOAI_BANG_LUONG ||--o{ LOAI_BANG_LUONG_THU_NHAP : "sử dụng"
    
    LOAI_THU_NHAP ||--o{ LOAI_BANG_LUONG_THU_NHAP : "được dùng trong"
    
    HOP_DONG_LAO_DONG }o--|| QUY_DINH_BAO_HIEM : "áp dụng"
    HOP_DONG_LAO_DONG }o--|| QUY_DINH_THUE_TNCN : "áp dụng"
    HOP_DONG_LAO_DONG }o--|| QUY_DINH_GIAM_TRU : "áp dụng"
    
    QUY_DINH_THUE_TNCN ||--o{ BAC_THUE : "chứa"

