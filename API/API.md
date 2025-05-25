# 📡 Гайд по проектированию API

![API Design](https://img.icons8.com/color/96/000000/api-settings.png)

> Полное руководство по созданию качественных REST/gRPC API для системных аналитиков

## 📋 Содержание

1. [Базовые принципы](#-базовые-принципы)
2. [Структура REST API](#-структура-rest-api)
3. [Документирование](#-документирование)
4. [Примеры](#-примеры)
5. [Инструменты](#-инструменты)
6. [Чек-лист](#-чек-лист)

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
GET    /api/v1/users          # Список
POST   /api/v1/users          # Создание
GET    /api/v1/users/{id}     # Детали
PUT    /api/v1/users/{id}     # Полное обновление
PATCH  /api/v1/users/{id}     # Частичное обновление
DELETE /api/v1/users/{id}     # Удаление
```

### Пример запроса

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

## 🧩 Примеры

### 1. Успешный ответ

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Example User",
    "email": "user@example.com"
  },
  "meta": {
    "version": "1.0",
    "server_time": "2024-03-20T12:00:00Z"
  }
}
```

### 2. Ошибка валидации

```json
{
  "error": {
    "code": 422,
    "message": "Validation failed",
    "details": {
      "email": "Invalid format"
    }
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

---

## ✅ Чек-лист проектирования

- [ ] Версионирование API
- [ ] Статусы HTTP (200, 201, 400, 401, 403, 404, 500)
- [ ] Пагинация и фильтрация
- [ ] Rate-limiting
- [ ] Подробные ошибки
- [ ] Логирование запросов
- [ ] Тестовые данные

---

## 📚 Ресурсы

1. [REST API Tutorial](https://restfulapi.net/)
2. [Microsoft API Guidelines](https://github.com/microsoft/api-guidelines)
3. [Google API Design Guide](https://cloud.google.com/apis/design)

## 📬 Контакты

- 🔗 **Контакты автора**  
  • TG: [@MikhailPrasolov](https://t.me/MikhailPrasolov)  
  • Канал: [t.me/systemananalytics](https://t.me/systemananalytics)

> Если заметили ошибку или хотите дополнить материалы — смело открывайте Issue или присылайте Pull Request!
