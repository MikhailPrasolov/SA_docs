# 📡 API - Проектирование и документация

> Полное руководство по созданию качественных REST/gRPC API для системных аналитиков с использованием Context7 для актуальной документации

## 📋 Содержание

1. [Базовые принципы](#-базовые-принципы)
2. [Структура REST API](#-структура-rest-api)
3. [Документирование](#-документирование)
4. [Примеры запросов](#-примеры-запросов)
5. [Инструменты](#-инструменты)
6. [Чек-лист](#-чек-лист)
7. [Использование Context7](#-использование-context7)

---

## 🔹 Базовые принципы

### 1. Стандарты проектирования

- **RESTful** подход (ресурсо-ориентированный)
- **Stateless** сервер
- **Кэширование** (Cache-Control)
- **Единый интерфейс** (HTTP-методы)

### 2. Критические параметры

| Параметр | Рекомендация |
|----------|--------------|
| Формат данных | JSON (application/json) |
| Кодировка | UTF-8 |
| Версионирование | URL-path (/v1/) или заголовок |
| Аутентификация | JWT/OAuth2 |

---

## 🏗 Структура REST API

### Эндпоинты

```http
GET    /api/v1/users          # Список пользователей
POST   /api/v1/users          # Создание пользователя
GET    /api/v1/users/{id}     # Детали пользователя
PUT    /api/v1/users/{id}     # Полное обновление
PATCH  /api/v1/users/{id}     # Частичное обновление
DELETE /api/v1/users/{id}     # Удаление пользователя
```

### Пример запроса с фильтрацией

```json
{
  "filter": {
    "status": "active",
    "role": "admin"
  },
  "pagination": {
    "limit": 10,
    "offset": 0
  },
  "sort": "-created_at"
}
```

---

## 📝 Документирование

### Обязательные разделы

1. **Базовый URL** (`https://api.service.com/v1`)
2. **Авторизация**
3. **Коды ошибок**
4. **Лимиты запросов**
5. **Примеры для всех эндпоинтов**

### Форматы

```markdown
[Swagger](https://swagger.io/) | [OpenAPI](https://www.openapis.org/)
[Postman](https://www.postman.com/) | [Redoc](https://redoc.ly/)
```

---

## 🧩 Примеры запросов

### 1. Создание пользователя

**Запрос:**
```http
POST /api/v1/users
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "Иван Иванов",
  "email": "ivan@example.com",
  "password": "secure_password123",
  "role": "user"
}
```

**Ответ:**
```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Иван Иванов",
    "email": "ivan@example.com",
    "role": "user",
    "created_at": "2024-11-17T12:00:00Z",
    "updated_at": "2024-11-17T12:00:00Z"
  },
  "meta": {
    "version": "1.0",
    "server_time": "2024-11-17T12:00:00Z"
  }
}
```

### 2. Получение списка пользователей

**Запрос:**
```http
GET /api/v1/users?status=active&role=admin&limit=10&offset=0&sort=-created_at
Authorization: Bearer {token}
```

**Ответ:**
```json
{
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Иван Иванов",
      "email": "ivan@example.com",
      "role": "admin",
      "status": "active",
      "created_at": "2024-11-17T12:00:00Z"
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 10,
    "offset": 0,
    "has_more": true
  }
}
```

### 3. Обновление пользователя

**Запрос:**
```http
PATCH /api/v1/users/123e4567-e89b-12d3-a456-426614174000
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "Иван Петров",
  "role": "moderator"
}
```

**Ответ:**
```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Иван Петров",
    "email": "ivan@example.com",
    "role": "moderator",
    "updated_at": "2024-11-17T12:05:00Z"
  }
}
```

### 4. Ошибка валидации

**Запрос:**
```http
POST /api/v1/users
Content-Type: application/json

{
  "name": "Иван",
  "email": "invalid-email",
  "password": "123"
}
```

**Ответ:**
```json
{
  "error": {
    "code": 422,
    "message": "Validation failed",
    "details": {
      "email": "Invalid email format",
      "password": "Password must be at least 8 characters"
    }
  }
}
```

### 5. Ошибка авторизации

**Ответ:**
```json
{
  "error": {
    "code": 401,
    "message": "Unauthorized",
    "details": "Invalid or expired token"
  }
}
```

---

## 🛠 Инструменты

| Инструмент | Назначение |
|------------|------------|
| [Swagger Editor](https://editor.swagger.io/) | Визуализация OpenAPI |
| [Postman](https://www.postman.com/) | Тестирование API |
| [JSON Schema](https://json-schema.org/) | Валидация структур |
| [Stoplight](https://stoplight.io/) | Документирование |
| [Insomnia](https://insomnia.rest/) | Альтернатива Postman |

---

## ✅ Чек-лист проектирования

- [ ] Версионирование API
- [ ] Статусы HTTP (200, 201, 400, 401, 403, 404, 500)
- [ ] Пагинация и фильтрация
- [ ] Rate-limiting
- [ ] Подробные ошибки
- [ ] Логирование запросов
- [ ] Тестовые данные
- [ ] Документация OpenAPI/Swagger
- [ ] Примеры запросов и ответов

---

## 🤖 Использование Context7

Context7 предоставляет актуальную документацию для библиотек и фреймворков прямо в контексте AI-ассистента.

### Примеры использования с API:

```
Создай REST API с Express.js и JWT аутентификацией. use context7
```

```
Настрой документацию Swagger для FastAPI. use library /fastapi/fastapi
```

```
Создай middleware для валидации запросов в Express.js. use context7
```

### Популярные ID библиотек для API:

- `/expressjs/express` - Express.js
- `/fastapi/fastapi` - FastAPI
- `/django/django` - Django
- `/flask/flask` - Flask
- `/nodejs/node` - Node.js
- `/mongodb/mongodb` - MongoDB
- `/postgresql/postgresql` - PostgreSQL

### Советы по использованию:

1. **Будьте конкретны** - указывайте версии библиотек если это важно
2. **Используйте ID библиотек** - это ускоряет получение документации
3. **Задавайте конкретные вопросы** - вместо "расскажи о Express.js" лучше "как настроить CORS в Express.js"

---

## 📚 Ресурсы

1. [REST API Tutorial](https://restfulapi.net/)
2. [Microsoft API Guidelines](https://github.com/microsoft/api-guidelines)
3. [Google API Design Guide](https://cloud.google.com/apis/design)
4. [OpenAPI Specification](https://swagger.io/specification/)
5. [JSON API Specification](https://jsonapi.org/)

---

## 📁 Файлы в разделе

- [`Шаблон OPENAPI 3.0.1.yaml`](./Шаблон%20OPENAPI%203.0.1.yaml) — шаблон для OpenAPI 3.0.1
- [`Шаблон Swagger 2.0.yaml`](./Шаблон%20Swagger%202.0.yaml) — шаблон для Swagger 2.0

---

## 📬 Контакты

- 🔗 **Контакты автора**  
  • TG: [@MikhailPrasolov](https://t.me/MikhailPrasolov)  
  • Канал: [t.me/systemananalytics](https://t.me/systemananalytics)

> Если заметили ошибку или хотите дополнить материалы — смело открывайте Issue или присылайте Pull Request!

---

*Последнее обновление: Ноябрь 2024*
