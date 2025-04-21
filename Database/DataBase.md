# 📦 User Management Microservice – Database Schema

Этот проект содержит описание схемы базы данных для микросервиса управления пользователями. База данных предназначена для хранения информации о пользователях, ролях, разрешениях, а также обеспечивает безопасное управление входом, сбросом паролей и подтверждением электронной почты.

## 🗂 Структура базы данных

Схема реализована в формате [DBML](https://dbml.dbdiagram.io/home/) и включает следующие ключевые компоненты:

### 🎯 Основные сущности

- **`users`** — данные пользователей: имя, email, статус, хэш пароля и прочее.
- **`roles`** — справочник ролей (администратор, редактор, пользователь и т. д.).
- **`permissions`** — справочник возможных разрешений.
- **`user_roles`** — таблица связей многие-ко-многим между пользователями и ролями.
- **`role_permissions`** — связи между ролями и разрешениями.

### 📜 Аудит и безопасность

- **`user_login_history`** — история всех попыток входа пользователей.
- **`password_reset_tokens`** — токены для восстановления пароля.
- **`email_verification_tokens`** — токены подтверждения email.

## 🧩 Перечисления (Enums)

- `UserStatus`: `active`, `inactive`, `pending`, `blocked`, `deleted`
- `RoleType`: `administrator`, `editor`, `viewer`, `moderator`, `user`

## 🔗 Связи (Foreign Keys)

- `user_roles.user_id` → `users.id`
- `user_roles.role_id` → `roles.id`
- `role_permissions.role_id` → `roles.id`
- `role_permissions.permission_id` → `permissions.id`
- `user_login_history.user_id` → `users.id`
- `password_reset_tokens.user_id` → `users.id`
- `email_verification_tokens.user_id` → `users.id`

## 🧪 Использование

Схема может быть импортирована в инструменты визуального моделирования баз данных, такие как:

- [dbdiagram.io](https://dbdiagram.io)
- [QuickDBD](https://quickdatabasediagrams.com/)
- [JetBrains DataGrip](https://www.jetbrains.com/datagrip/)

Файл `.dbml` можно использовать для:
- автоматической генерации миграций
- визуализации ER-диаграммы
- экспорта в `.sql` или другие форматы

## 🛡 Безопасность и расширяемость

- Хранение паролей реализуется через безопасные хэши (например, bcrypt).
- Статус пользователя и подтверждение email позволяют управлять безопасностью регистрации.
- Легко масштабируется для RBAC (Role-Based Access Control) систем.

## 📁 Файлы

- `schema.dbml` — основной файл схемы базы данных
- `README.md` — описание проекта

## 📌 TODO

- [ ] Добавить таблицу `audit_logs` для хранения действий пользователей
- [ ] Добавить временные ограничения на использование токенов повторно
- [ ] Настроить миграции и начальные скрипты заполнения данных

## 📬 Контакты

- 🔗 **Контакты автора**  
  • TG: [@MikhailPrasolov](https://t.me/MikhailPrasolov)  
  • Канал: [t.me/systemananalytics](https://t.me/systemananalytics)

> Если заметили ошибку или хотите дополнить материалы — смело открывайте Issue или присылайте Pull Request!


