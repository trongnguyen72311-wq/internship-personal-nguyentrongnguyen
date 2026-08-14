# 🗄️ Sơ Đồ Cơ Sở Dữ Liệu (ERD & Database Schema)

**Dự án:** Quản Lý Thu Chi Cá Nhân  
**Tác giả:** Nguyễn Trọng Nguyễn  
**Công nghệ:** PostgreSQL / Prisma ORM  

---

## 1. Sơ Đồ Thực Thể Mối Quan Hệ (Mermaid ERD)

```mermaid
erDiagram
    USER ||--o{ CATEGORY : "sở hữu"
    USER ||--o{ TRANSACTION : "thực hiện"
    CATEGORY ||--o{ TRANSACTION : "phân loại"

    USER {
        String id PK
        String email UK
        String name
        DateTime createdAt
        DateTime updatedAt
    }

    CATEGORY {
        String id PK
        String name
        String type
        String userId FK
        DateTime createdAt
    }

    TRANSACTION {
        String id PK
        String title
        Float amount
        String type
        DateTime date
        String note
        String userId FK
        String categoryId FK
        DateTime createdAt
        DateTime updatedAt
    }