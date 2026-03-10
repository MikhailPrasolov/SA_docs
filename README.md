# 📘 SA_docs – Документация по системной аналитике и архитектуре

Добро пожаловать в репозиторий **SA_docs** – централизованное хранилище документации, шаблонов и руководств для системных аналитиков, архитекторов и разработчиков.

> 📌 Этот репозиторий создан для обмена знаниями и лучшими практиками в области проектирования IT-систем, документирования требований и архитектурных решений.

---

## 🗂 Структура репозитория

```
SA_docs/
├── 📡 API/                          # Документация и шаблоны для API
│   ├── Шаблон OPENAPI 3.0.1.yaml
│   ├── Шаблон Swagger 2.0.yaml
│   ├── README.md
│   └── Мои примеры/
│
├── 🗄️ Database/                     # Модели баз данных и документация
│   ├── Магазины_БД_документация.md
│   ├── Магазины_БД.dbml
│   ├── Пример БД.dbml
│   └── README.md
│
├── 🤖 AI агенты/                    # Материалы по AI агентам и LLM
│   ├── deepseek_chat_vs_reasoner_comparison.md
│   ├── deepseek_reasoner_kilocode_setup.md
│   └── README.md
│
├── 🧪 Project_obscence/             # Проект по анализу нецензурных выражений
│   ├── README.md
│   ├── add_column.py
│   ├── add_column_modify.py
│   ├── add_column_modify with_AI.py
│   ├── check_output.py
│   ├── comparison_report.txt
│   ├── model_comparison.csv
│   ├── obscene.csv
│   ├── obscene_with_flag.csv
│   ├── obscene_with_flag_AI.csv
│   └── obscene_with_flag_old.csv
│
├── 📊 Sequence Plant UML/           # Диаграммы последовательности
│   ├── Пример Sequence.wsd
│   ├── Шаблон Sequence .wsd
│   └── README.md
│
├── 🏗️ Structurizr/                  # C4-диаграммы архитектуры
│   ├── README.md
│   └── workspace.dsl
│
├── ⏱️ temporal/                     # Демо-проект Temporal для оркестрации workflow
│   ├── README.md
│   ├── CONCEPTS.md
│   ├── INSTALL.md
│   ├── LIVE_DEMO.md
│   ├── QUICK_START.md
│   ├── powershell-demo.ps1
│   ├── visual-demo.html
│   ├── browser-demo.html
│   ├── live-demo.html
│   ├── live-server.js
│   ├── simple-demo.js
│   ├── docker-compose.yml
│   ├── dynamicconfig/
│   └── src/
│
└── README.md
```

---

## 🎯 Навигация по разделам

### 📡 [API](./API/)
**Описание:** Полное руководство по проектированию и документированию REST API
- **📖 Основной гайд:** [`README.md`](./API/README.md) – рекомендации и best-practice по описанию REST API
- **🎨 Шаблоны:** 
  - [`Шаблон OPENAPI 3.0.1.yaml`](./API/Шаблон%20OPENAPI%203.0.1.yaml) – каркас для новых API контрактов
  - [`Шаблон Swagger 2.0.yaml`](./API/Шаблон%20Swagger%202.0.yaml) – шаблон для Swagger 2.0
- **💡 Примеры:** [`Мои примеры/`](./API/Мои%20примеры/) – реальные примеры API спецификаций

### 🗄️ [Database](./Database/)
**Описание:** Моделирование баз данных и документация схем
- **📖 Основной гайд:** [`README.md`](./Database/README.md) – как описывать схемы, naming conventions
- **🎯 Примеры моделей:**
  - [`Пример БД.dbml`](./Database/Пример%20БД.dbml) – пример диаграммы для dbdiagram.io
  - [`Магазины_БД.dbml`](./Database/Магазины_БД.dbml) – реальная модель базы данных магазинов
- **📋 Документация:** [`Магазины_БД_документация.md`](./Database/Магазины_БД_документация.md) – подробное описание схемы

### 🤖 [AI агенты](./AI%20агенты/)
**Описание:** Материалы по AI агентам и LLM, сравнение моделей DeepSeek Chat vs Reasoner, настройка Kilo Code
- **📖 Сравнение моделей:** [`deepseek_chat_vs_reasoner_comparison.md`](./AI%20агенты/deepseek_chat_vs_reasoner_comparison.md) – сравнение возможностей DeepSeek Chat и Reasoner
- **⚙️ Настройка Kilo Code:** [`deepseek_reasoner_kilocode_setup.md`](./AI%20агенты/deepseek_reasoner_kilocode_setup.md) – инструкция по настройке Kilo Code с DeepSeek Reasoner

### 🧪 [Project_obscence](./Project_obscence/)
**Описание:** Проект по анализу нецензурных выражений в текстах с использованием AI и классических методов
- **📖 Основной гайд:** [`README.md`](./Project_obscence/README.md) – описание проекта, цели, методика
- **🧩 Скрипты обработки:**
  - [`add_column.py`](./Project_obscence/add_column.py) – добавление колонки с флагом нецензурности
  - [`add_column_modify.py`](./Project_obscence/add_column_modify.py) – модифицированная версия
  - [`add_column_modify with_AI.py`](./Project_obscence/add_column_modify%20with_AI.py) – версия с использованием AI
  - [`check_output.py`](./Project_obscence/check_output.py) – проверка результатов
- **📊 Данные и отчёты:** [`comparison_report.txt`](./Project_obscence/comparison_report.txt), [`model_comparison.csv`](./Project_obscence/model_comparison.csv), [`obscene.csv`](./Project_obscence/obscene.csv) и другие

### 📊 [Sequence Plant UML](./Sequence%20Plant%20UML/)
**Описание:** Диаграммы последовательности для визуализации бизнес-процессов
- **📖 Основной гайд:** [`README.md`](./Sequence%20Plant%20UML/README.md) – конвенции, подсказки и сниппеты
- **🎨 Шаблоны:**
  - [`Шаблон Sequence .wsd`](./Sequence%20Plant%20UML/Шаблон%20Sequence%20.wsd) – минимальный boilerplate
  - [`Пример Sequence.wsd`](./Sequence%20Plant%20UML/Пример%20Sequence.wsd) – реальная диаграмма для reference

### 🏗️ [Structurizr](./Structurizr/)
**Описание:** C4-диаграммы для описания архитектуры систем
- **📖 Основной гайд:** [`README.md`](./Structurizr/README.md) – инструкция по работе с C4-диаграммами
- **💼 Рабочее пространство:** [`workspace.dsl`](./Structurizr/workspace.dsl) – основная конфигурация архитектуры

### ⏱️ [temporal](./temporal/)
**Описание:** Демо-проект для изучения Temporal – платформы оркестрации workflow на примере системы управления заказами (OMS)
- **📖 Основной гайд:** [`README.md`](./temporal/README.md) – полное руководство по запуску и изучению Temporal
- **📚 Дополнительная документация:**
  - [`CONCEPTS.md`](./temporal/CONCEPTS.md) – ключевые концепции Temporal
  - [`INSTALL.md`](./temporal/INSTALL.md) – инструкция по установке и настройке
  - [`LIVE_DEMO.md`](./temporal/LIVE_DEMO.md) – руководство по live-демонстрации
  - [`QUICK_START.md`](./temporal/QUICK_START.md) – быстрое начало работы
- **🚀 Демо-версии:**
  - [`powershell-demo.ps1`](./temporal/powershell-demo.ps1) – PowerShell версия (работает без Node.js)
  - [`visual-demo.html`](./temporal/visual-demo.html) – визуальная версия с анимацией
  - [`browser-demo.html`](./temporal/browser-demo.html) – браузерная демо-версия
  - [`live-demo.html`](./temporal/live-demo.html) – интерактивная live-демонстрация
  - [`live-server.js`](./temporal/live-server.js) – сервер для live-демо
  - [`simple-demo.js`](./temporal/simple-demo.js) – минималистичная демо-версия на Node.js
- **💻 Полная реализация:** [`src/`](./temporal/src/) – TypeScript реализация workflow и activity

---

## 🚀 Как использовать этот репозиторий

### Для начинающих системных аналитиков
1. Начните с изучения [`API/README.md`](./API/README.md) для понимания основ документирования API
2. Ознакомьтесь с [`Database/README.md`](./Database/README.md) для работы с моделями данных
3. Используйте шаблоны в качестве отправной точки для своих проектов
4. Изучите [`temporal/README.md`](./temporal/README.md) для понимания оркестрации бизнес-процессов

### Для опытных специалистов
1. Используйте готовые шаблоны для ускорения работы
2. Делитесь своими примерами через Pull Request
3. Совершенствуйте существующие руководства на основе своего опыта
4. Изучайте продвинутые концепции через демо-проект Temporal

### Для командной работы
1. Клонируйте репозиторий как основу для документации проекта
2. Адаптируйте шаблоны под специфику вашего проекта
3. Используйте единые стандарты документирования во всей команде
4. Внедряйте лучшие практики оркестрации workflow из раздела Temporal

---

## 🛠 Рекомендации по работе

### 📝 Документирование
- Соблюдайте единый стиль документации во всех разделах
- Используйте диаграммы (PlantUML, Mermaid) для визуализации сложных процессов
- Поддерживайте актуальность ссылок на артефакты

### 🔧 Инструменты
- **API:** Swagger Editor, Postman, Stoplight
- **Базы данных:** dbdiagram.io, QuickDBD, DataGrip
- **Диаграммы:** PlantUML, Structurizr Online
- **Архитектура:** Structurizr DSL, C4 Model
- **Оркестрация:** Temporal, Camunda, Airflow

### 📚 Лучшие практики
- Версионируйте API с самого начала проекта
- Используйте DBML для документирования схем баз данных
- Применяйте C4-модель для описания архитектуры систем
- Создавайте диаграммы последовательности для ключевых бизнес-процессов
- Рассматривайте оркестрацию workflow для сложных бизнес-процессов

---

## 🤝 Как внести вклад

Мы приветствуем ваши улучшения и дополнения! 

1. **Сообщить об ошибке:** Откройте Issue с описанием проблемы
2. **Предложить улучшение:** Создайте Pull Request с вашими изменениями
3. **Добавить примеры:** Поделитесь реальными кейсами из вашего опыта

---

## 📌 Планы развития

- [ ] Добавить раздел по бизнес-аналитике и требованиям
- [ ] Создать шаблоны пользовательских историй и use cases
- [ ] Добавить примеры интеграционных диаграмм
- [ ] Создать руководство по документированию микросервисной архитектуры
- [ ] Добавить раздел по метрикам и мониторингу
- [ ] Интегрировать больше примеров реальных проектов
- [ ] Расширить демо-проект Temporal дополнительными сценариями

---

## 📬 Контакты

- 🔗 **Автор:** Михаил Прасолов
- 💬 **Telegram:** [@MikhailPrasolov](https://t.me/MikhailPrasolov)
- 📢 **Канал:** [t.me/systemananalytics](https://t.me/systemananalytics)

> Если заметили ошибку или хотите дополнить материалы — смело открывайте Issue или присылайте Pull Request!
>
> Сделано с ❤️ для системных аналитиков, архитекторов и всех, кто проектирует сложные системы.

---

*Последнее обновление: Февраль 2026*
