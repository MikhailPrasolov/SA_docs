# 🏗️ C4-диаграммы архитектуры — Structurizr

> **Статус:** `evergreen` • **Уровень:** `средний` • **Для:** архитекторов, аналитиков
>
> Полное руководство по созданию C4-диаграмм для документирования архитектуры программных систем с использованием Structurizr DSL

## 🆕 Что нового

| Дата | Изменение |
|------|-----------|
| 2026-06 | Добавлены метаданные; стандартизация футера; усилены cross-refs |

## 📋 Содержание

1. [Что такое C4-модель](#-что-такое-c4-модель)
2. [Структура проекта](#-структура-проекта)
3. [Синтаксис DSL](#-синтаксис-dsl)
4. [Типы диаграмм](#-типы-диаграмм)
5. [Лучшие практики](#-лучшие-практики)
6. [Инструменты](#-инструменты)
7. [Примеры кода](#-примеры-кода)

---

## 🎯 Что такое C4-модель

C4-модель — это подход к визуализации архитектуры программного обеспечения через четыре уровня абстракции:

### Уровни C4-модели:

1. **Контекст (Context)** — высокоуровневое представление системы
2. **Контейнеры (Containers)** — основные компоненты системы
3. **Компоненты (Components)** — внутренняя структура контейнеров
4. **Код (Code)** — детальная реализация компонентов

### Преимущества C4-модели:
- **Масштабируемость** — подходит для систем любого размера
- **Согласованность** — единый подход к документированию
- **Понятность** — разные уровни для разных аудиторий
- **Автоматизация** — генерация диаграмм из кода

---

## 📁 Структура проекта

Рекомендуемая структура для C4-проекта:

```
c4-architecture/
├── workspace.dsl          # Основной файл рабочего пространства
├── model/                 # Модели системы
│   ├── people.dsl         # Пользователи и внешние системы
│   ├── software-systems.dsl # Программные системы
│   └── containers.dsl     # Контейнеры системы
├── views/                 # Диаграммы
│   ├── context.dsl        # Контекстные диаграммы
│   ├── containers.dsl     # Диаграммы контейнеров
│   └── components.dsl     # Диаграммы компонентов
└── styles/                # Стили оформления
    └── theme.dsl          # Тема оформления
```

---

## 📝 Синтаксис DSL

### Базовые элементы

```dsl
workspace {
    
    model {
        // Определение пользователей
        customer = person "Клиент" "Покупатель интернет-магазина"
        
        // Определение систем
        ecommerce = softwareSystem "Интернет-магазин" "Продажа товаров онлайн" {
            webapp = container "Веб-приложение" "React SPA" "react"
            api = container "API" "REST API" "spring boot"
            database = container "База данных" "Хранилище данных" "postgresql"
        }
        
        // Связи
        customer -> webapp "Просматривает товары, оформляет заказы"
        webapp -> api "Вызывает API" "https"
        api -> database "Читает и записывает данные" "jdbc"
    }
    
    views {
        // Контекстная диаграмма
        systemContext ecommerce {
            include *
            autolayout
        }
        
        // Диаграмма контейнеров
        container ecommerce {
            include *
            autolayout
        }
        
        theme default
    }
    
}
```

### Основные конструкции

| Конструкция | Назначение |
|-------------|------------|
| `person` | Пользователь или внешняя система |
| `softwareSystem` | Программная система |
| `container` | Контейнер (приложение, БД, и т.д.) |
| `component` | Компонент внутри контейнера |
| `->` | Связь/взаимодействие |
| `autolayout` | Автоматическое расположение |

---

## 🎨 Типы диаграмм

### 1. Контекстная диаграмма
**Цель:** Показать систему в контексте внешних пользователей и систем
**Аудитория:** Бизнес-пользователи, стейкхолдеры

```dsl
systemContext ecommerce {
    include *
    autolayout
}
```

### 2. Диаграмма контейнеров
**Цель:** Показать высокоуровневую архитектуру системы
**Аудитория:** Технические руководители, архитекторы

```dsl
container ecommerce {
    include *
    autolayout
}
```

### 3. Диаграмма компонентов
**Цель:** Показать внутреннюю структуру контейнеров
**Аудитория:** Разработчики, тестировщики

```dsl
component api {
    include *
    autolayout
}
```

---

## 🏗 Лучшие практики

### 1. Именование
- **Пользователи** — роли (`Клиент`, `Администратор`)
- **Системы** — бизнес-назначение (`Интернет-магазин`, `Платежный шлюз`)
- **Контейнеры** — технология + назначение (`React SPA`, `Spring Boot API`)

### 2. Организация кода
- **Разделяйте на файлы** — по типам элементов
- **Используйте `!include`** — для модульности
- **Определяйте стили** — для единообразия

### 3. Документирование
- **Добавляйте описания** — для каждого элемента
- **Указывайте технологии** — для контейнеров и компонентов
- **Описывайте взаимодействия** — протоколы и данные

---

## 🛠 Инструменты

| Инструмент | Назначение |
|------------|------------|
| [Structurizr DSL](https://structurizr.com/dsl) | Онлайн редактор и визуализатор |
| [Structurizr CLI](https://github.com/structurizr/cli) | Командная строка для экспорта |
| [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=structurizr.structurizr) | Интеграция с VS Code |
| [PlantUML Export](https://structurizr.com/help/plantuml) | Экспорт в PlantUML формат |

---

## 💻 Примеры кода

### Полный пример системы
```dsl
workspace "Интернет-магазин" "Система онлайн-продаж" {
    
    model {
        // Пользователи
        customer = person "Клиент" "Покупатель товаров"
        admin = person "Администратор" "Управление магазином"
        
        // Внешние системы
        paymentGateway = softwareSystem "Платежный шлюз" "Обработка платежей" "External"
        emailService = softwareSystem "Email сервис" "Отправка уведомлений" "External"
        
        // Основная система
        ecommerce = softwareSystem "Интернет-магазин" "Продажа товаров онлайн" {
            
            // Контейнеры
            webapp = container "Веб-приложение" "Пользовательский интерфейс" "React"
            mobileApp = container "Мобильное приложение" "iOS/Android приложение" "React Native"
            api = container "API Gateway" "Единая точка входа" "Spring Boot"
            
            // Сервисы
            catalogService = container "Сервис каталога" "Управление товарами" "Spring Boot"
            orderService = container "Сервис заказов" "Обработка заказов" "Spring Boot"
            userService = container "Сервис пользователей" "Управление пользователями" "Spring Boot"
            
            // Базы данных
            catalogDb = container "База каталога" "Хранилище товаров" "PostgreSQL"
            orderDb = container "База заказов" "Хранилище заказов" "PostgreSQL"
            userDb = container "База пользователей" "Хранилище пользователей" "PostgreSQL"
        }
        
        // Связи пользователей
        customer -> webapp "Просматривает товары, оформляет заказы"
        customer -> mobileApp "Покупает через мобильное приложение"
        admin -> webapp "Управляет товарами и заказами"
        
        // Связи между контейнерами
        webapp -> api "Вызывает API" "HTTPS/REST"
        mobileApp -> api "Вызывает API" "HTTPS/REST"
        
        api -> catalogService "Запросы товаров" "HTTP"
        api -> orderService "Создание заказов" "HTTP"
        api -> userService "Аутентификация" "HTTP"
        
        catalogService -> catalogDb "Чтение/запись" "JDBC"
        orderService -> orderDb "Чтение/запись" "JDBC"
        userService -> userDb "Чтение/запись" "JDBC"
        
        // Связи с внешними системами
        orderService -> paymentGateway "Обработка платежей" "HTTPS/API"
        orderService -> emailService "Отправка уведомлений" "HTTPS/API"
    }
    
    views {
        // Контекстная диаграмма
        systemContext ecommerce {
            include *
            autolayout
        }
        
        // Диаграмма контейнеров
        container ecommerce {
            include *
            autolayout
        }
        
        // Стиль оформления
        styles {
            element "External" {
                background #cccccc
                color #000000
            }
            element "Database" {
                shape Database
            }
        }
        
        theme default
    }
    
}
```

---

## 🤖 Использование Context7

Context7 предоставляет актуальную документацию для работы с архитектурой:

```
Создай C4-диаграмму для микросервисной архитектуры. use context7
```

```
Опиши архитектуру интернет-магазина используя Structurizr. use context7
```

```
Настрой экспорт диаграмм в PlantUML формат. use context7
```

### Популярные ID библиотек:
- `/structurizr/structurizr` - Structurizr
- `/software-architecture/software-architecture` - Архитектура ПО
- `/microservices/microservices` - Микросервисная архитектура

---

## 📚 Ресурсы

1. [C4 Model Official Site](https://c4model.com/)
2. [Structurizr DSL Documentation](https://github.com/structurizr/dsl)
3. [Structurizr Help](https://structurizr.com/help)
4. [Software Architecture Patterns](https://martinfowler.com/architecture/)

---

## 📁 Файлы в разделе

- [`workspace.dsl`](./workspace.dsl) — основной файл рабочего пространства

---

## 🔗 Связанные разделы

- [Sequence Plant UML — диаграммы последовательности](../Sequence%20Plant%20UML/README.md) — детализация сценариев
- [API — проектирование REST API](../API/README.md) — API в архитектуре
- [Database — моделирование БД](../Database/README.md) — БД как контейнеры
- [Temporal — оркестрация workflow](../temporal/README.md) — архитектура процессов
- [Гайд MCP — Context7 для Structurizr](../Instructions/mcp-guide.md) — AI для C4

---

## 📬 Контакты

- **Автор:** Михаил Прасолов
- **Telegram:** [@MikhailPrasolov](https://t.me/MikhailPrasolov)
- **Канал:** [t.me/systemananalytics](https://t.me/systemananalytics)

---

*Последнее обновление: Июнь 2026*