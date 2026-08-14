# 🗄️ TÀI LIỆU THIẾT KẾ CƠ SỞ DỮ LIỆU (DATABASE ERD & SCHEMA SPECIFICATION)

**Tên dự án:** Quản Lý Thu Chi Cá Nhân (Personal Finance Management)  
**Sinh viên thực hiện:** Nguyễn Trọng Nguyễn  
**MSSV:** 2411020013  
**Đơn vị thực tập:** Kyanon Digital - Nhóm 2  
**Hệ quản trị CSDL:** PostgreSQL (Supabase)  
**ORM:** Prisma ORM  
**Phiên bản:** 1.0.0  

---

## 1. Sơ Đồ Thực Thể Mối Quan Hệ (Entity Relationship Diagram - ERD)

```mermaid
erDiagram
    USER ||--o{ CATEGORY : "creates (1 - N)"
    USER ||--o{ TRANSACTION : "records (1 - N)"
    CATEGORY ||--o{ TRANSACTION : "categorizes (1 - N)"

    USER {
        String id PK "cuid/uuid"
        String email UK "unique email"
        String name "display name"
        String image "avatar url"
        DateTime createdAt "default now"
        DateTime updatedAt "auto update"
    }

    CATEGORY {
        String id PK "cuid/uuid"
        String name "category name"
        String icon "icon identifier"
        String color "hex color"
        CategoryType type "INCOME | EXPENSE"
        String userId FK "references User(id)"
        DateTime createdAt "default now"
    }

    TRANSACTION {
        String id PK "cuid/uuid"
        String title "transaction title"
        Decimal amount "monetary value"
        TransactionType type "INCOME | EXPENSE"
        DateTime date "transaction date"
        String note "optional note"
        String userId FK "references User(id)"
        String categoryId FK "references Category(id)"
        DateTime createdAt "default now"
        DateTime updatedAt "auto update"
    }