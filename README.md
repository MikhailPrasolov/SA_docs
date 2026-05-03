# 📘 SA_docs — база знаний по системной аналитике и архитектуре

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Активный](https://img.shields.io/badge/Status-Активный-green.svg)](https://github.com)

Репозиторий **SA_docs** содержит практические материалы для системных аналитиков, архитекторов и разработчиков: шаблоны API, модели БД, архитектурные диаграммы, инструкции по настройке инструментов, а также демо-проекты с оркестрацией процессов на Temporal и AI-агентами.

---

## 🚀 Быстрый переход

| Раздел | Описание | 📁 Путь |
|--------|----------|---------|
| 🛠 **API** | Проектирование и документирование REST API | [`API/README.md`](API/README.md) |
| 🗄 **Database** | Моделирование БД, DBML, примеры схем | [`Database/README.md`](Database/README.md) |
| 🤖 **AI агенты** | Настройка и использование LLM (DeepSeek) | [`AI агенты/README.md`](AI%20агенты/README.md) |
| 📊 **Sequence** | Sequence-диаграммы (PlantUML) | [`Sequence Plant UML/README.md`](Sequence%20Plant%20UML/README.md) |
| 🏗 **Structurizr** | C4-диаграммы и DSL | [`Structurizr/README.md`](Structurizr/README.md) |
| ⏱ **Temporal** | Демо-проект оркестрации workflow | [`temporal/README.md`](temporal/README.md) |
| 📖 **Instructions** | Инструкции по настройке инструментов | [`Instructions/README.md`](Instructions/README.md) |
| 🤖 **demo_AI** | Демо-проекты AI-агентов | [`demo_AI/README.md`](demo_AI/README.md) |
| 🔍 **Project_obscence** | Анализ нецензурных выражений | [`Project_obscence/README.md`](Project_obscence/README.md) |

---

## 📂 Структура репозитория

```text
SA_docs/
├── API/                        # 🛠 Шаблоны и рекомендации по API
│   ├── README.md               # Гайд по проектированию API
│   ├── Шаблон OPENAPI 3.0.1.yaml
│   └── Шаблон Swagger 2.0.yaml
│
├── Database/                   # 🗄 Модели БД (DBML) и документация
│   ├── README.md               # Рекомендации по документированию БД
│   ├── Пример БД.dbml          # Учебный пример схемы
│   ├── Магазины_БД.dbml
│   └── Магазины_БД_документация.md
│
├── AI агенты/                  # 🤖 Материалы по AI/LLM
│   ├── README.md               # Обзор материалов
│   ├── deepseek_reasoner_kilocode_setup.md
│   ├── deepseek_comparison.md
│   └── deepseek_chat_vs_reasoner_comparison.md
│
├── Sequence Plant UML/         # 📊 Примеры и шаблоны Sequence-диаграмм
│   ├── README.md               # Актуализированные регламенты
│   ├── Шаблон Sequence .wsd
│   ├── Пример Sequence.wsd
│   ├── Пример Sequence - Оплата заказа.wsd
│   └── Пример Sequence - Асинхронная интеграция.wsd
│
├── Structurizr/                # 🏗 C4/Structurizr DSL
│   ├── README.md               # Основы C4/Structurizr
│   └── workspace.dsl           # Рабочий пример
│
├── temporal/                   # ⏱ Демо-проект Temporal
│   ├── README.md               # Описание проекта
│   ├── CONCEPTS.md             # Концепции Temporal
│   ├── INSTALL.md              # Установка
│   ├── QUICK_START.md          # Быстрый старт
│   ├── src/                    # Исходный код
│   └── *.html                  # Визуальные демо
│
├── Instructions/               # 📖 Инструкции по настройке инструментов
│   ├── README.md               # Обзор инструкций
│   ├── Гайд MCP.md             # Настройка MCP-серверов Kilo Code
│   └── Obsidian Second Brain Setup.md  # Настройка Второго Мозга в Obsidian
│
├── demo_AI/                    # 🤖 Демо-проекты AI-агентов
│   ├── README.md               # Обзор демо
│   ├── obscene_demo.html       # Демо детекции нецензурной лексики
│   ├── projects_presentation.html  # Презентация проектов
│   └── presentation_plan.md    # План презентации
│
├── Project_obscence/           # 🔍 Анализ нецензурных выражений
│   ├── README.md               # Описание проекта
│   └── *.py                    # Скрипты анализа
│
├── .gitignore                  # Исключения для Git
└── README.md                    # Этот файл
```

---

## 🧭 Навигация по разделам

### 🛠 API — Проектирование и документация

> Полное руководство по созданию качественных REST/gRPC API

**Для кого:** системные аналитики, разработчики

**Что внутри:**
- Базовые принципы RESTful API
- Структура эндпоинтов и примеры запросов
- Документирование (OpenAPI, Swagger)
- Чек-лист проектирования
- Использование Context7 для актуальной документации

**Начать изучение:** [`API/README.md`](API/README.md)

---

### 🗄 Database — Моделирование и документация

> Проектирование и документирование схем баз данных

**Для кого:** системные аналитики, архитекторы БД

**Что внутри:**
- Примеры моделей (микросервис пользователей, сеть магазинов)
- Форматы докутирования (DBML)
- Лучшие практики (нормализация, именование)
- Примеры SQL-запросов

**Начать изучение:** [`Database/README.md`](Database/README.md)

---

### 🤖 AI агенты — AI/LLM для системного анализа

> Настройка и использование AI-агентов в работе

**Для кого:** все, кто использует AI в работе

**Что внутри:**
- Настройка DeepSeek Reasoner в Kilo Code
- Сравнение моделей Chat vs Reasoner
- Оптимальные настройки для разных задач

**Начать изучение:** [`AI агенты/README.md`](AI%20агенты/README.md)

---

### 📊 Sequence Plant UML — Диаграммы последовательности

> Актуализированные регламенты по Sequence-диаграммам

**Для кого:** системные аналитики, архитекторы

**Что внутри:**
- Единый стиль диаграмм
- Обработка ошибок, идемпотентность
- Async-сценарии (Kafka/outbox)
- Примеры промптов с Context7

**Начать изучение:** [`Sequence Plant UML/README.md`](Sequence%20Plant%20UML/README.md)

---

### 🏗 Structurizr — C4-диаграммы

> C4-модель и Structurizr DSL для документирования архитектуры

**Для кого:** архитекторы, системные аналитики

**Что внутри:**
- Что такое C4-модель
- Синтаксис DSL
- Типы диаграмм (Context, Container, Component)
- Рабочие примеры

**Начать изучение:** [`Structurizr/README.md`](Structurizr/README.md)

---

### ⏱ Temporal — Оркестрация процессов

> Демо-проект для изучения Temporal (OMS пример)

**Для кого:** разработчики, архитекторы

**Что внутри:**
- Полная документация по Temporal
- Несколько вариантов запуска демо
- Исходный код на TypeScript
- Визуальные демо в браузере

**Начать изучение:** [`temporal/README.md`](temporal/README.md)

---

### 📖 Instructions — Инструкции по настройке

> Пошаговые руководства по настройке инструментов и окружения

**Для кого:** все, кто настраивает рабочее окружение

**Что внутри:**
- Настройка MCP-серверов для Kilo Code (Context7, GitLab, Jira, Confluence)
- Установка и настройка Obsidian Second Brain
- Интеграция Obsidian с Kilo Code через MCP

**Начать изучение:** [`Instructions/README.md`](Instructions/README.md)

---

### 🤖 demo_AI — Демо-проекты AI-агентов

> Примеры использования AI-агентов для решения практических задач

**Для кого:** разработчики, аналитики

**Что внутри:**
- Демо детекции нецензурной лексики
- Презентация проектов
- Планы презентаций

**Начать изучение:** [`demo_AI/README.md`](demo_AI/README.md)

---

### 🔍 Project_obscence — Анализ нецензурных выражений

> Сравнение моделей детекции нецензурной лексики (GPT5, DeepSeek, AI Agent)

**Для кого:** аналитики данных, ML-инженеры

**Что внутри:**
- Скрипты анализа на Python
- Сравнение трёх моделей детекции
- Статистика и отчёты

**Начать изучение:** [`Project_obscence/README.md`](Project_obscence/README.md)

---

## 🚀 Быстрый старт

### 1) Изучение материалов (без запуска кода)

| Порядок | Раздел | Файл |
|---------|--------|------|
| 1 | API | [`API/README.md`](API/README.md) |
| 2 | Database | [`Database/README.md`](Database/README.md) |
| 3 | Архитектура | [`Structurizr/README.md`](Structurizr/README.md) |
| 4 | Sequence | [`Sequence Plant UML/README.md`](Sequence%20Plant%20UML/README.md) |
| 5 | AI агенты | [`AI агенты/README.md`](AI%20агенты/README.md) |
| 6 | Инструкции | [`Instructions/README.md`](Instructions/README.md) |

### 2) Запуск Temporal-демо

```bash
cd temporal
npm install
npm run worker
```

Для полного сценария с локальным сервером Temporal используйте инструкции в [`temporal/INSTALL.md`](temporal/INSTALL.md) и [`temporal/QUICK_START.md`](temporal/QUICK_START.md).

---

## 🤝 Как вносить изменения

- Обновляйте разделы и шаблоны через Pull Request
- Если добавляете новый раздел, сразу добавьте:
  1. `README.md` внутри раздела
  2. краткое описание в этом корневом `README.md`
- Проверяйте актуальность ссылок и названий файлов после переименований

---

## 📌 Дальнейшее развитие

Потенциальные направления:
- шаблоны по требованиям (BRD/SRS/User Story/Use Case)
- раздел по интеграционным контрактам и событиям
- примеры BPMN/UML activity/state-диаграмм
- расширение практических кейсов в `temporal/`
- интеграция SA_docs с Obsidian Second Brain через MCP

---

## 📬 Контакты

- Автор: Михаил Прасолов
- Telegram: [@MikhailPrasolov](https://t.me/MikhailPrasolov)
- Канал: [t.me/systemananalytics](https://t.me/systemananalytics)

---

*Последнее обновление: Май 2026*
