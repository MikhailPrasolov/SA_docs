# 📘 SA_docs — база знаний по системной аналитике и архитектуре

Репозиторий **SA_docs** содержит практические материалы для системных аналитиков, архитекторов и разработчиков: шаблоны API, модели БД, архитектурные диаграммы, а также демо-проект с оркестрацией процессов на Temporal.

---

## 📂 Актуальная структура репозитория

```text
SA_docs/
├── API/                  # Шаблоны и рекомендации по API
├── Database/             # Модели БД (DBML) и документация
├── AI агенты/            # Материалы по AI/LLM
├── Project_obscence/     # Учебный проект по анализу нецензурной лексики
├── Sequence Plant UML/   # Примеры/шаблоны диаграмм последовательности
├── Structurizr/          # C4/Structurizr DSL
├── temporal/             # Демо-проект Temporal (TypeScript + HTML demo)
└── README.md
```

---

## 🧭 Что где находится

### `API/`
- `README.md` — гайд по проектированию и документированию API.
- `Шаблон OPENAPI 3.0.1.yaml` — базовый шаблон спецификации OpenAPI.
- `Шаблон Swagger 2.0.yaml` — шаблон для Swagger 2.0.

### `Database/`
- `README.md` — рекомендации по документированию БД.
- `Пример БД.dbml` — учебный пример схемы.
- `Магазины_БД.dbml` и `Магазины_БД_документация.md` — пример реальной предметной модели.

### `AI агенты/`
- `deepseek_chat_vs_reasoner_comparison.md` — сравнение режимов/моделей.
- `deepseek_comparison.md` — дополнительное сравнение.
- `deepseek_reasoner_kilocode_setup.md` — настройка окружения Kilo Code.

### `Project_obscence/`
- `README.md` — описание проекта.
- Набор Python-скриптов и CSV-файлов для сравнения подходов маркировки текста:
  - `add_column.py`
  - `add_column_modify.py`
  - `add_column_modify with_AI.py`
  - `check_output.py`
  - `*.csv`, `comparison_report.txt`

### `Sequence Plant UML/`
- `README.md` — правила и подходы к Sequence-диаграммам.
- `Пример Sequence.wsd` — пример диаграммы.
- `Шаблон Sequence .wsd` — шаблон для старта.

### `Structurizr/`
- `README.md` — основы C4/Structurizr DSL.
- `workspace.dsl` — рабочий пример DSL-модели.

### `temporal/`
Демо-раздел по Temporal для оркестрации workflow:
- Документация: `README.md`, `CONCEPTS.md`, `INSTALL.md`, `QUICK_START.md`, `QUICK_RUN.md`, `RUN_DEMO.md`, `LIVE_DEMO.md`, `DEMO_COMPARISON.md`, `PROJECT_REVIEW.md`.
- Запуск и конфигурация: `package.json`, `docker-compose.yml`, `dynamicconfig/development.yaml`.
- Демо-артефакты: `visual-demo.html`, `browser-demo.html`, `live-demo.html`, `live-server.js`, `simple-demo.js`, `powershell-demo.ps1`.

> ℹ️ В `temporal/` также присутствует `node_modules/` (зависимости уже установлены локально в рабочей копии).

---

## 🚀 Быстрый старт

### 1) Изучение материалов (без запуска кода)
1. Начните с `API/README.md` и `Database/README.md`.
2. Для архитектуры откройте `Structurizr/README.md` и `Sequence Plant UML/README.md`.
3. Для AI-материалов перейдите в `AI агенты/`.

### 2) Запуск Temporal-демо
```bash
cd temporal
npm install
npm run worker
```

Для полного сценария с локальным сервером Temporal используйте инструкции в `temporal/INSTALL.md` и `temporal/QUICK_START.md`.

---

## 🤝 Как вносить изменения

- Обновляйте разделы и шаблоны через Pull Request.
- Если добавляете новый раздел, сразу добавьте:
  1. `README.md` внутри раздела,
  2. краткое описание в этом корневом `README.md`.
- Проверяйте актуальность ссылок и названий файлов после переименований.

---

## 📌 Дальнейшее развитие

Потенциальные направления:
- шаблоны по требованиям (BRD/SRS/User Story/Use Case);
- раздел по интеграционным контрактам и событиям;
- примеры BPMN/UML activity/state-диаграмм;
- расширение практических кейсов в `temporal/`.

---

## 📬 Контакты

- Автор: Михаил Прасолов
- Telegram: [@MikhailPrasolov](https://t.me/MikhailPrasolov)
- Канал: [t.me/systemananalytics](https://t.me/systemananalytics)

