# 📘 SA_docs — База знаний по системной аналитике и архитектуре

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Активный](https://img.shields.io/badge/Status-Active-green.svg)]()
[![Updated: Июнь 2026](https://img.shields.io/badge/Updated-Июнь%202026-blue.svg)]()

> **SA_docs** — коллекция практических материалов для системных аналитиков, архитекторов и разработчиков: шаблоны API, модели БД, архитектурные диаграммы, инструкции по настройке инструментов, демо-проекты с оркестрацией процессов на Temporal и AI-агентами.

---

## 🆕 Что нового

| Дата | Изменение |
|------|-----------|
| 2026-06 | 📋 **ADR** — новый раздел с шаблоном и 3 учебными примерами |
| 2026-06 | 📊 **BPMN** — новый раздел с чек-листом моделирования |
| 2026-06 | 🏗 **Structurizr** — обновлён до полноценной модели интернет-магазина (C4) |
| 2026-06 | Прокачка всех README: единый стиль, статусная модель, learning paths |
| 2026-05 | Sequence Plant UML: обновление под практики 2025 |
| 2026-05 | Instructions: гайд MCP и Obsidian Second Brain Setup |
| 2026-04 | temporal: добавлены visual-demo и PowerShell версии |
| 2026-03 | Database: добавлены схемы Alfa, Alfa1 |

---

## 🧭 Навигация (MOC)

| # | Раздел | Статус | Уровень | Описание | 📁 |
|---|--------|--------|---------|----------|-----|
| 1 | 🛠 **API** | `evergreen` | ★☆☆ | Проектирование и документирование REST API | [`→`](API/README.md) |
| 2 | 🗄 **Database** | `evergreen` | ★★☆ | Моделирование БД, DBML, примеры схем | [`→`](Database/README.md) |
| 3 | 🤖 **AI Agents** | `growing` | ★★☆ | Настройка и использование LLM (DeepSeek) | [`→`](AI-Agents/README.md) |
| 4 | 📊 **Sequence** | `evergreen` | ★☆☆ | Sequence-диаграммы PlantUML | [`→`](Sequence%20Plant%20UML/README.md) |
| 5 | 🏗 **Structurizr** | `evergreen` | ★★☆ | C4-диаграммы и DSL | [`→`](Structurizr/README.md) |
| 6 | ⏱ **Temporal** | `evergreen` | ★★★ | Демо-проект оркестрации workflow | [`→`](temporal/README.md) |
| 7 | 📖 **Instructions** | `growing` | ★☆☆ | Инструкции по настройке инструментов | [`→`](Instructions/README.md) |
| 8 | 📋 **ADR** | `growing` | ★★☆ | Architecture Decision Records — шаблоны и примеры | [`→`](ADR/README.md) |
| 9 | 📊 **BPMN** | `seed` | ★☆☆ | BPMN-диаграммы, чек-лист моделирования | [`→`](BPMN/README.md) |
| 10 | 🤖 **Demo AI** | `seed` | ★★☆ | Демо-проекты AI-агентов | [`→`](demo-AI/README.md) |
| 11 | 🔍 **Obscene** | `seed` | ★★☆ | Анализ нецензурных выражений | [`→`](Project-Obscene/README.md) |

> **Легенда:** `seed` → `growing` → `evergreen` — зрелость материала. ★☆☆ — базовый, ★★☆ — средний, ★★★ — продвинутый.

---

## 📂 Структура репозитория

```text
SA_docs/
├── API/                        # 🛠 Шаблоны и рекомендации по REST API
│   ├── README.md
│   ├── api-openapi-template.yaml
│   └── api-swagger-template.yaml
│
├── Database/                   # 🗄 Модели БД (DBML) и документация
│   ├── README.md
│   ├── example-db.dbml         # Учебный пример микросервиса пользователей
│   ├── stores-db.dbml          # Схема розничной сети
│   ├── stores-db-documentation.md
│   ├── Alfa.dbml               # Схема Alfa
│   └── Alfa1.dbml              # Схема Alfa1
│
├── AI-Agents/                  # 🤖 Материалы по AI/LLM
│   ├── README.md
│   ├── deepseek-kilo-setup.md
│   ├── deepseek-comparison.md
│   └── deepseek-chat-vs-reasoner.md
│
├── Sequence Plant UML/         # 📊 Примеры и шаблоны Sequence-диаграмм
│   ├── README.md
│   ├── sequence-template.wsd
│   ├── sequence-example.wsd
│   ├── sequence-payment-example.wsd
│   └── sequence-async-integration.wsd
│
├── Structurizr/                # 🏗 C4/Structurizr DSL
│   ├── README.md
│   └── workspace.dsl           # Полная C4-модель интернет-магазина
│
├── temporal/                   # ⏱ Демо-проект Temporal OMS
│   ├── README.md
│   ├── CONCEPTS.md             # Концепции Temporal
│   ├── INSTALL.md              # Установка
│   ├── QUICK_RUN.md            # Быстрый старт
│   ├── DEMO_COMPARISON.md      # Сравнение вариантов демо
│   ├── src/                    # Исходный код (TypeScript)
│   └── *.html / *.ps1          # Визуальные демо + PowerShell
│
├── Instructions/               # 📖 Инструкции по настройке инструментов
│   ├── README.md
│   ├── mcp-guide.md            # MCP-серверы Kilo Code
│   └── obsidian-second-brain-setup.md
│
├── ADR/                        # 📋 Architecture Decision Records
│   ├── README.md
│   ├── TEMPLATE.md             # Шаблон для копирования
│   ├── ADR-0001-rest-vs-graphql.md
│   ├── ADR-0002-event-driven-vs-sync.md
│   └── ADR-0003-bpmn-vs-c4.md
│
├── BPMN/                       # 📊 BPMN-диаграммы
│   └── README.md
│
├── demo-AI/                    # 🤖 Демо-проекты AI-агентов
│   ├── README.md
│   ├── obscene_demo.html
│   ├── projects_presentation.html
│   └── presentation_plan.md
│
├── Project-Obscene/            # 🔍 Анализ нецензурных выражений
│   ├── README.md
│   ├── *.csv
│   └── *.py
│
├── .gitignore
└── README.md                    # Настоящий файл (MOC-навигация)
```

---

## 🧭 Детальная навигация по разделам

<details>
<summary><b>📋 ADR</b> — Architecture Decision Records <code>growing</code> • <code>средний</code></summary>

**Для кого:** архитекторы, tech-lead, системные аналитики

**Что внутри:** что такое ADR и зачем, структура (Nygard / MADR), статусная модель, пустой шаблон для копирования, 3 учебных примера (REST vs GraphQL, Event-Driven vs Sync, BPMN vs C4)

**Файлы:** README + TEMPLATE + 3 ADR-примера

➡️ [`ADR/README.md`](ADR/README.md)
</details>

<details>
<summary><b>📊 BPMN</b> — Диаграммы бизнес-процессов <code>seed</code> • <code>базовый</code></summary>

**Для кого:** системные аналитики, бизнес-аналитики

**Что внутри:** основы BPMN-нотации, когда использовать BPMN vs C4 vs PlantUML, чек-лист моделирования, инструменты (Camunda, Bizagi, Draw.io)

**Файлы:** README + чек-лист + шаблон (soon)

➡️ [`BPMN/README.md`](BPMN/README.md)
</details>

<details>
<summary><b>🛠 API</b> — Проектирование и документирование REST API <code>evergreen</code> • <code>базовый</code></summary>

**Для кого:** системные аналитики, разработчики

**Что внутри:** принципы RESTful, структура эндпоинтов, OpenAPI/Swagger шаблоны, чек-лист проектирования, примеры запросов/ответов, Context7-интеграция

**Файлы:** 2 шаблона (OpenAPI 3.0.1, Swagger 2.0)

➡️ [`API/README.md`](API/README.md)
</details>

<details>
<summary><b>🗄 Database</b> — Моделирование БД и DBML <code>evergreen</code> • <code>средний</code></summary>

**Для кого:** системные аналитики, архитекторы БД

**Что внутри:** примеры моделей (микросервис пользователей, сеть магазинов, Alfa), DBML-формат, SQL-запросы, best practices (нормализация, именование)

**Файлы:** 4 DBML-схемы + документация

➡️ [`Database/README.md`](Database/README.md)
</details>

<details>
<summary><b>🤖 AI Agents</b> — DeepSeek и LLM <code>growing</code> • <code>средний</code></summary>

**Для кого:** все, кто использует AI в работе

**Что внутри:** настройка DeepSeek Reasoner в Kilo Code, сравнение Chat vs Reasoner, оптимальные параметры для разных задач

**Файлы:** 3 гайда + сравнения

➡️ [`AI-Agents/README.md`](AI-Agents/README.md)
</details>

<details>
<summary><b>📊 Sequence Plant UML</b> — Sequence-диаграммы <code>evergreen</code> • <code>базовый</code></summary>

**Для кого:** системные аналитики, архитекторы

**Что внутри:** единый стиль, обработка ошибок, идемпотентность, async-сценарии (Kafka/outbox), промпты с Context7, шаблон + 3 примера

**Файлы:** шаблон + 3 примера .wsd

➡️ [`Sequence Plant UML/README.md`](Sequence%20Plant%20UML/README.md)
</details>

<details>
<summary><b>🏗 Structurizr</b> — C4-диаграммы и DSL <code>evergreen</code> • <code>средний</code></summary>

**Для кого:** архитекторы, системные аналитики

**Что внутри:** C4-модель (Context → Container → Component), синтаксис Structurizr DSL, best practices, полный пример интернет-магазина

**Файлы:** workspace.dsl

➡️ [`Structurizr/README.md`](Structurizr/README.md)
</details>

<details>
<summary><b>⏱ Temporal</b> — Оркестрация workflow <code>evergreen</code> • <code>продвинутый</code></summary>

**Для кого:** разработчики, архитекторы

**Что внутри:** полная документация Temporal, 3 варианта запуска (PowerShell, визуальный, полный с сервером), TypeScript-код OMS, архитектура workflow

**Файлы:** src/ + 3 демо + 4 гайда

➡️ [`temporal/README.md`](temporal/README.md)
</details>

<details>
<summary><b>📖 Instructions</b> — Настройка инструментов <code>growing</code> • <code>базовый</code></summary>

**Для кого:** все, кто настраивает рабочее окружение

**Что внутри:** гайд MCP-серверов Kilo Code (Context7, GitLab, Jira, Confluence), установка Obsidian Second Brain, интеграция с Kilo Code

**Файлы:** 2 гайда + README

➡️ [`Instructions/README.md`](Instructions/README.md)
</details>

<details>
<summary><b>🤖 Demo AI</b> — Демо AI-агентов <code>seed</code> • <code>средний</code></summary>

**Для кого:** разработчики, аналитики

**Что внутри:** HTML-демо детекции нецензурной лексики, презентация проектов, план презентации

**Файлы:** 2 HTML + 1 MD

➡️ [`demo-AI/README.md`](demo-AI/README.md)
</details>

<details>
<summary><b>🔍 Obscene</b> — Анализ нецензурных выражений <code>seed</code> • <code>средний</code></summary>

**Для кого:** аналитики данных, ML-инженеры

**Что внутри:** Python-скрипты, сравнение 3 моделей (GPT5, DeepSeek, AI Agent), статистика, отчёты

**Файлы:** 5 Python-скриптов + 3 CSV-набора + README

➡️ [`Project-Obscene/README.md`](Project-Obscene/README.md)
</details>

---

## 🧭 Как использовать: learning path

Выберите свой трек в зависимости от цели:

| Трек | Маршрут | Результат |
|------|---------|-----------|
| 🆕 **Новичок** | API → Database → Sequence | Освоите базовые артефакты аналитика |
| 🏗 **Архитектор** | Structurizr → Sequence → Temporal | Научитесь проектировать системы |
| 🤖 **AI-практик** | AI-Agents → Instructions → demo-AI | Настроите AI-агентов в работу |
| 📋 **Decision Maker** | ADR → BPMN → Structurizr | Научитесь фиксировать и визуализировать решения |
| ⚡ **Full Stack** | Весь путь по порядку (1→11) | Полный набор инструментов |

**Рекомендуемый порядок изучения:**
1. 🛠 **API** — основы проектирования
2. 🗄 **Database** — моделирование данных
3. 📋 **ADR** — учимся фиксировать архитектурные решения
4. 🏗 **Structurizr** — архитектурные диаграммы
5. 📊 **Sequence** — детализация сценариев
6. 📊 **BPMN** — бизнес-процессы
7. 🤖 **AI-Agents** — AI в помощь аналитику
8. 📖 **Instructions** — настройка окружения
9. ⏱ **Temporal** — оркестрация процессов
10. 🧪 **demo-AI + Project-Obscene** — практические кейсы

---

## 🚀 Быстрый старт

### 📖 Изучение материалов

Выберите трек в секции [learning path](#-как-использовать-learning-path) выше. Каждый раздел самодостаточен — начать можно с любого.

### ⏱ Запуск Temporal-демо

```bash
cd temporal
npm install
npm run worker
```

Для полного сценария: [`temporal/INSTALL.md`](temporal/INSTALL.md) • [`temporal/QUICK_RUN.md`](temporal/QUICK_RUN.md) • [`temporal/DEMO_COMPARISON.md`](temporal/DEMO_COMPARISON.md)

---

## 🤝 Внесение изменений

1. **Форкните** репозиторий
2. **Создайте ветку** с описанием изменения
3. **Обновите** README раздела и, если нужно, корневой README
4. **Создайте Pull Request** с описанием что и почему изменилось

**Правила:**
- Новый раздел → README.md внутри + ссылка в корневом README
- Переименование файла → проверьте ссылки во всех README
- Обновление практик → укажите дату в `# Что нового` раздела

---

## 📌 Дальнейшее развитие

Потенциальные направления:
- ✅ 📋 **ADR** — сделано: шаблон + 3 учебных примера
- ✅ 📊 **BPMN** — сделано: базовая структура и чек-лист
- 📋 шаблоны требований (BRD, SRS, User Story, Use Case)
- 🔄 раздел по интеграционным контрактам и событиям
- 🧪 расширение практических кейсов в `temporal/`
- 🔗 интеграция SA_docs с Obsidian Second Brain через MCP
- 🤖 автоматизация ревью артефактов через AI-агентов

---

## 📬 Контакты

- **Автор:** Михаил Прасолов
- **Telegram:** [@MikhailPrasolov](https://t.me/MikhailPrasolov)
- **Канал:** [t.me/systemananalytics](https://t.me/systemananalytics) — системная аналитика, архитектура, AI-агенты

---

> *Репозиторий развивается как публичная база знаний. Если нашли ошибку или хотите дополнить — открывайте Issue или PR!*

*Последнее обновление: Июнь 2026*
