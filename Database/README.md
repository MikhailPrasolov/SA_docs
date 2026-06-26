# 🗄️ Базы данных — Моделирование и документация

> **Статус:** `evergreen` • **Уровень:** `средний` • **Для:** аналитиков, архитекторов БД
>
> Полное руководство по проектированию и документированию схем баз данных в формате DBML

## 📋 Содержание

1. [Примеры моделей](#-примеры-моделей)
2. [Форматы документирования](#-форматы-документирования)
3. [Лучшие практики](#-лучшие-практики)
4. [Инструменты](#-инструменты)
5. [Примеры запросов](#-примеры-запросов)

---

## 🆕 Что нового

| Дата | Изменение |
|------|-----------|
| 2026-06 | Добавлены метаданные; обновлён список файлов (Alfa.dbml, Alfa1.dbml) |

---

## 🎯 Примеры моделей

### 1. Микросервис управления пользователями

**Назначение:** База данных для системы управления пользователями с ролевой моделью доступа

**Основные сущности:**
- **`users`** — данные пользователей: имя, email, статус, хэш пароля
- **`roles`** — справочник ролей (администратор, редактор, пользователь)
- **`permissions`** — справочник возможных разрешений
- **`user_roles`** — связи многие-ко-многим между пользователями и ролями
- **`role_permissions`** — связи между ролями и разрешениями

**Аудит и безопасность:**
- **`user_login_history`** — история всех попыток входа
- **`password_reset_tokens`** — токены для восстановления пароля
- **`email_verification_tokens`** — токены подтверждения email

### 2. Система управления сетью магазинов

**Назначение:** База данных для розничной сети с учетом продаж, товаров и цен

**Основные сущности:**
- **`stores`** — данные о магазинах сети
- **`categories`** — справочник категорий товаров
- **`suppliers`** — справочник поставщиков
- **`products`** — справочник товаров с базовыми ценами
- **`cashiers`** — данные о кассирах
- **`sales`** — основная таблица продаж
- **`sale_items`** — детализация продаж по товарам
- **`store_prices`** — цены товаров по магазинам

---

## 📝 Форматы документирования

### DBML (Database Markup Language)

```dbml
Table users {
  id uuid [pk]
  name varchar(255) [not null]
  email varchar(255) [unique, not null]
  password_hash varchar(255) [not null]
  status user_status [default: 'pending']
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
}

Enum user_status {
  active
  inactive
  pending
  blocked
  deleted
}
```

### Преимущества DBML:
- **Человекочитаемый формат** — легко понимать и редактировать
- **Автоматическая визуализация** — генерация ER-диаграмм
- **Экспорт в SQL** — автоматическая генерация миграций
- **Версионирование** — легко отслеживать изменения

---

## 🏗 Лучшие практики

### 1. Нормализация данных
- **1NF** — устранение повторяющихся групп
- **2NF** — устранение частичных зависимостей
- **3NF** — устранение транзитивных зависимостей

### 2. Именование
- **Таблицы** — множественное число (`users`, `products`)
- **Поля** — snake_case (`created_at`, `user_id`)
- **Первичные ключи** — `id` или `{table_name}_id`
- **Внешние ключи** — `{referenced_table}_id`

### 3. Типы данных
- **Идентификаторы** — `uuid` или `bigint`
- **Даты** — `timestamp` или `date`
- **Текст** — `varchar(n)` с разумными ограничениями
- **Логические значения** — `boolean`

---

## 🛠 Инструменты

| Инструмент | Назначение |
|------------|------------|
| [dbdiagram.io](https://dbdiagram.io) | Визуализация DBML |
| [QuickDBD](https://quickdatabasediagrams.com/) | Быстрое моделирование |
| [JetBrains DataGrip](https://www.jetbrains.com/datagrip/) | Профессиональная работа с БД |
| [MySQL Workbench](https://www.mysql.com/products/workbench/) | Моделирование MySQL |
| [pgModeler](https://pgmodeler.io/) | Моделирование PostgreSQL |

---

## 📊 Примеры запросов

### Анализ продаж по магазинам
```sql
SELECT 
    st.store_name,
    COUNT(DISTINCT s.sale_id) as total_sales,
    SUM(s.total_amount) as total_revenue,
    AVG(s.total_amount) as avg_sale_amount
FROM sales s
JOIN stores st ON s.store_id = st.store_id
WHERE s.status = 'completed'
GROUP BY st.store_id, st.store_name
ORDER BY total_revenue DESC;
```

### Получение пользователей с ролями
```sql
SELECT 
    u.id,
    u.name,
    u.email,
    u.status,
    ARRAY_AGG(r.name) as roles
FROM users u
LEFT JOIN user_roles ur ON u.id = ur.user_id
LEFT JOIN roles r ON ur.role_id = r.id
WHERE u.status = 'active'
GROUP BY u.id, u.name, u.email, u.status;
```

### Мониторинг активности пользователей
```sql
SELECT 
    u.name,
    u.email,
    COUNT(ulh.id) as login_count,
    MAX(ulh.login_time) as last_login
FROM users u
LEFT JOIN user_login_history ulh ON u.id = ulh.user_id
WHERE ulh.login_time >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY u.id, u.name, u.email
ORDER BY login_count DESC;
```

---

## 🤖 Использование Context7

Context7 предоставляет актуальную документацию для работы с базами данных:

```
Создай модель базы данных для системы управления пользователями. use context7
```

```
Напиши SQL запросы для анализа продаж в PostgreSQL. use library /postgresql/postgresql
```

```
Спроектируй схему базы данных для интернет-магазина. use context7
```

### Популярные ID библиотек для баз данных:
- `/postgresql/postgresql` - PostgreSQL
- `/mongodb/mongodb` - MongoDB
- `/mysql/mysql` - MySQL
- `/sqlite/sqlite` - SQLite

---

## 📚 Ресурсы

1. [DBML Documentation](https://dbml.dbdiagram.io/docs/)
2. [Database Normalization](https://en.wikipedia.org/wiki/Database_normalization)
3. [SQL Style Guide](https://www.sqlstyle.guide/)
4. [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## 📁 Файлы в разделе

| Файл | Описание |
|------|----------|
| [`example-db.dbml`](./example-db.dbml) | Пример схемы микросервиса пользователей (учебный) |
| [`stores-db.dbml`](./stores-db.dbml) | Схема системы управления сетью магазинов |
| [`stores-db-documentation.md`](./stores-db-documentation.md) | Подробная документация схемы магазинов |
| [`Alfa.dbml`](./Alfa.dbml) | Схема Alfa |
| [`Alfa1.dbml`](./Alfa1.dbml) | Схема Alfa1 |

---

## 🔗 Связанные разделы

- [API — проектирование REST API](../API/README.md) — API работает поверх БД
- [Structurizr — C4-диаграммы архитектуры](../Structurizr/README.md) — контейнеры с БД
- [Sequence Plant UML — диаграммы последовательности](../Sequence%20Plant%20UML/README.md) — запросы к БД
- [Temporal — оркестрация workflow](../temporal/README.md) — долгоживущие транзакции
- [Гайд MCP — Context7 для БД](../Instructions/mcp-guide.md) — AI-агенты для БД

---

## 📬 Контакты

- **Автор:** Михаил Прасолов
- **Telegram:** [@MikhailPrasolov](https://t.me/MikhailPrasolov)
- **Канал:** [t.me/systemananalytics](https://t.me/systemananalytics)

---

*Последнее обновление: Июнь 2026*
