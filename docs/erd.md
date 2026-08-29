# ERD - PERSONAL FINANCE MANAGEMENT

## User

- id
- email
- password
- name
- createdAt

## Category

- id
- name
- type
- userId

## Transaction

- id
- title
- amount
- type
- date
- userId
- categoryId

---

## Quan hệ

User 1 --- n Transaction

User 1 --- n Category

Category 1 --- n Transaction