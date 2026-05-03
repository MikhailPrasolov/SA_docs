# Инструкция по настройке «Второго Мозга» в Obsidian

## Содержание

1. [Установка Obsidian](#1-установка-obsidian)
2. [Создание и структура vault](#2-создание-и-структура-vault)
3. [Настройка Obsidian](#3-настройка-obsidian)
4. [Установка плагинов](#4-установка-плагинов)
5. [Шаблоны заметок](#5-шаблоны-заметок)
6. [Интеграция с Kilo Code через MCP](#6-интеграция-с-kilo-code-через-mcp)
7. [Рой Obsidian-агентов Kilo Code](#7-рой-obsidian-агентов-kilo-code)
8. [Auto-Changelog — запись изменений в Obsidian](#8-auto-changelog--запись-изменений-в-obsidian)
9. [Auto-Save Session — полное сохранение сессии](#9-auto-save-session--полное-сохранение-сессии)
10. [Фронтметтер и теги](#10-фронтметтер-и-теги)
11. [Устранение проблем](#11-устранение-проблем)

---

## 1. Установка Obsidian

### 1.1. Скачивание

1. Перейти на **https://obsidian.md/download**
2. Скачать установщик для Windows (`Obsidian X.X.X.exe`)
3. Запустить установщик, следовать инструкциям

### 1.2. Первый запуск

1. После установки Obsidian предложит:
   - **Create new vault** — создать новый vault
   - **Open existing vault** — открыть существующий
2. Выбрать **Open existing vault** → указать путь к уже созданной структуре (см. раздел 2) или создать новый

### 1.3. Важно: отключение прокси

Корпоративный прокси может блокировать загрузку community-плагинов. Если список плагинов не загружается:

```powershell
# Отключить прокси временно (требует прав администратора)
Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" -Name ProxyEnable -Value 0

# После установки плагинов — включить обратно
Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" -Name ProxyEnable -Value 1
```

---

## 2. Создание и структура vault

### 2.1. Создание vault

1. **Запустить Obsidian** → **Create new vault**
2. **Vault name**: `Database` (или любое другое имя)
3. **Location**: `C:\Users\user\Desktop\Obsidian\`
4. Нажать **Create**

### 2.2. Структура директорий

Внутри vault создать следующие папки (через файловый менеджер Obsidian или проводник Windows):

```
Database/
├── Templates/          # Шаблоны для новых заметок
├── Conversations/      # Записи из сессий Kilo (с дата-префиксом)
├── Decisions/          # Архитектурные и технические решения
├── Insights/           # Инсайты, паттерны, эвристики
├── Sources/            # Внешние источники (статьи, доки, книги)
├── Projects/           # Заметки по активным проектам
├── References/         # Справочная информация, шпаргалки
├── Daily/              # Daily notes
├── MOC/                # Maps of Content — навигационные хабы
└── Archive/            # Архивированные заметки (не удалять!)
```

### 2.3. Правила именования файлов

| Тип заметки | Формат имени | Пример |
|-------------|-------------|--------|
| Conversations | `YYYY-MM-DD-kebab-case-title.md` | `2026-05-04-workflow-setup.md` |
| Decisions | `YYYY-MM-DD-kebab-case-title.md` | `2026-05-04-obsidian-swarm-architecture.md` |
| Insights | `kebab-case-title.md` | `cognitive-load-theory.md` |
| Sources | `kebab-case-author-topic.md` | `Reference-mlops.md` |
| Projects | `kebab-case-project-name.md` | `my-app.md` |
| Daily | `YYYY-MM-DD.md` | `2026-05-04.md` |
| MOC | `MOC-kebab-case-topic.md` | `MOC-obsidian.md`, `MOC-mlops.md` |
| Templates | `kebab-case-template-name.md` | `conversation.md`, `decision.md` |

---

## 3. Настройка Obsidian

### 3.1. Базовые настройки

После создания vault настроить основные параметры:

1. **Settings** (шестерёнка слева внизу) → **Editor**
   - `Spell check`: включить
   - `Spell check languages`: `Russian`, `English`
   - `Default editing mode`: `Live Preview` или `Source`

2. **Settings** → **Files & Links**
   - `Automatically update internal links`: включить
   - `New link format`: `Shortest path when possible`
   - `Use [[Wikilinks]]`: включить
   - `Detect all file extensions`: включить

3. **Settings** → **Hotkeys** (опционально)
   - Настроить горячие клавиши для часто используемых команд

### 3.2. Core-плагины (включены по умолчанию)

Obsidian поставляется со встроенными плагинами. Рекомендуемые к включению:

| Плагин | Назначение |
|--------|-----------|
| File explorer | Файловый менеджер |
| Graph view | Граф связей между заметками |
| Backlinks | Обратные ссылки |
| Outgoing links | Исходящие ссылки |
| Tag pane | Панель тегов |
| Daily notes | Ежедневные заметки |
| Templates | Вставка шаблонов (базовый) |
| Command palette | Палитра команд (Ctrl+P) |
| Properties | Свойства (фронтметтер) |
| Page preview | Предпросмотр страниц |
| Canvas | Холсты для ментальных карт |
| Note composer | Компоновка заметок |
| Bookmarks | Закладки |
| File recovery | Восстановление файлов |
| Sync | Синхронизация (Obsidian Sync) |

---

## 4. Установка плагинов

### 4.1. Включение Community Plugins

1. **Settings** → **Community plugins**
2. Нажать **Turn on community plugins** (подтвердить)
3. Если плагины не загружаются — см. [п. 1.3](#13-важно-отключение-прокси)

### 4.2. Dataview

SQL-подобные запросы по фронтметтеру.

**Установка:**
1. `Settings` → `Community plugins` → `Browse`
2. Поиск `Dataview`
3. `Install` → `Enable`

**Примеры запросов:**
```dataview
TABLE summary, status, created
FROM "Conversations"
SORT created DESC
```

```dataview
TABLE title, created
FROM "Decisions"
WHERE status != "archived"
SORT created DESC
```

### 4.3. Templater (рекомендован вместо Core Templates)

Продвинутые шаблоны с динамическими полями.

**Установка:**
1. `Settings` → `Community plugins` → `Browse`
2. Поиск `Templater`
3. `Install` → `Enable`

**Настройка:**
1. `Settings` → `Templater`
2. `Template folder location`: `Templates/`
3. `Trigger Templater on new file creation`: включить
4. `Automatic jump to cursor`: включить

**Использование:**
- Создать новую заметку → вставить шаблон через палитру команд (`Ctrl+P` → `Templater: Insert template`)
- Или настроить горячую клавишу на `Alt+T`

### 4.4. Smart Connections

Семантический AI-поиск по заметкам.

**Установка:**
1. `Settings` → `Community plugins` → `Browse`
2. Поиск `Smart Connections`
3. `Install` → `Enable`

**Настройка:**
1. `Settings` → `Smart Connections`
2. **Provider**: `OpenAI` (облачный) или `Local + Ollama` (локальный)
3. **API Key**: ваш OpenAI API-ключ (если используете OpenAI)
4. **Vault Name**: `Database`

**После настройки** плагин проиндексирует все заметки. Предоставляет:
- Semantic search (похожие заметки по смыслу)
- AI-рекомендации связей
- Автоматическая классификация

### 4.5. Итоговый список установленных community-плагинов

После установки в `.obsidian/community-plugins.json` будет:

```json
[
  "dataview",
  "templater-obsidian",
  "smart-connections"
]
```

---

## 5. Шаблоны заметок

### 5.1. conversation.md — для записи сессий Kilo

Путь: `Templates/conversation.md`

```markdown
---
title: "{{title}}"
type: conversation
status: seed
created: {{date}}
updated: {{date}}
tags:
  - topic/
  - source/claude
  - status/seed
source: "Claude Code session"
summary: ""
related:
  - ""
---

# {{title}}

## Context
<!-- В каком контексте проходила сессия? -->

## Key Decisions
<!-- Какие решения были приняты? Ссылки на заметки решений -->
-

## Insights
<!-- Какие инсайты появились? Ссылки на заметки инсайтов -->
-

## Action Items
<!-- Что нужно сделать дальше? -->
- [ ]

## Code Patterns
<!-- Заметные паттерны кода, архитектуры, техники -->
```

### 5.2. decision.md — для архитектурных решений

Путь: `Templates/decision.md`

```markdown
---
title: "{{title}}"
type: decision
status: seed
created: {{date}}
updated: {{date}}
tags:
  - topic/
  - decision/
  - status/seed
source: ""
summary: ""
related:
  - ""
---

# {{title}}

## Decision
<!-- Что было решено? Одно чёткое предложение -->

## Options Considered
<!-- Какие альтернативы рассматривались? -->

### Option 1:
- Pros:
- Cons:

### Option 2:
- Pros:
- Cons:

## Rationale
<!-- Почему выбран этот вариант? -->

## Consequences
<!-- Последствия решения -->
- Positive:
- Negative:

## Review Date
<!-- Когда пересмотреть решение? -->
{{date + 90d}}
```

### 5.3. insight.md — для инсайтов

Путь: `Templates/insight.md`

```markdown
---
title: "{{title}}"
type: insight
status: seed
created: {{date}}
updated: {{date}}
tags:
  - topic/
  - insight/
  - status/seed
source: ""
summary: ""
related:
  - ""
---

# {{title}}

## Insight
<!-- Суть инсайта в 1-2 предложениях -->

## Evidence
<!-- Подтверждающие данные, примеры, опыт -->

## Application
<!-- Как применить на практике? -->

## Exceptions
<!-- Когда это НЕ работает? Edge cases -->

## Links
<!-- Связанные заметки, источники -->
-
```

### 5.4. source.md — для источников

Путь: `Templates/source.md`

```markdown
---
title: "{{title}}"
type: source
status: seed
created: {{date}}
updated: {{date}}
tags:
  - topic/
  - source/
  - status/seed
source: ""
url: ""
author: ""
summary: ""
related:
  - ""
---

# {{title}}

## Metadata
- **Author:**
- **URL:**
- **Published:**
- **Read:** {{date}}

## Summary
<!-- 2-3 абзаца содержания источника -->

## Key Takeaways
<!-- Ключевые выводы по пунктам -->
-

## Quotes
<!-- Важные цитаты -->
>

## Connections
<!-- Связи с другими заметками -->
-
```

---

## 6. Интеграция с Kilo Code через MCP

### 6.1. Установка MCP-сервера mcpvault

MCP-сервер `@bitbonsai/mcpvault` позволяет Kilo Code читать и писать заметки напрямую в файловую систему vault.

```powershell
# Перейти в директорию глобальной конфигурации Kilo
cd "$env:USERPROFILE\.config\kilo"

# Установить mcpvault
npm install @bitbonsai/mcpvault
```

### 6.2. Конфигурация в kilo.jsonc

Добавить секцию `obsidian` в `"mcp"`:

```jsonc
{
  "mcp": {
    "obsidian": {
      "type": "local",
      "command": [
        "node",
        "node_modules/@bitbonsai/mcpvault/dist/server.js",
        "C:\\Users\\user\\Desktop\\Obsidian\\Database"
      ],
      "enabled": true,
      "timeout": 30000
    }
    // ... другие MCP-сервера (context7, gitlab, jira, confluence)
  }
}
```

### 6.3. Проверка работы MCP

```powershell
node "$env:USERPROFILE\.config\kilo\node_modules\@bitbonsai\mcpvault\dist\server.js" "C:\Users\user\Desktop\Obsidian\Database"
```

Ожидаемый вывод: `mcpvault v0.11.0` (сервер ожидает STDIO).

### 6.4. Доступные инструменты mcpvault

| Инструмент | Назначение |
|-----------|-----------|
| `read_note` | Прочитать заметку |
| `write_note` | Создать/перезаписать/дописать |
| `patch_note` | Замена части текста |
| `list_directory` | Список файлов и папок |
| `delete_note` | Удалить (с подтверждением) |
| `search_notes` | BM25 полнотекстовый поиск |
| `move_note` | Переместить/переименовать |
| `move_file` | Переместить любой файл |
| `read_multiple_notes` | Batch чтение (до 10) |
| `update_frontmatter` | Обновить frontmatter |
| `get_notes_info` | Метаданные |
| `get_frontmatter` | Извлечь frontmatter |
| `manage_tags` | Управление тегами |
| `get_vault_stats` | Статистика vault |
| `list_all_tags` | Все теги с частотой |

### 6.5. Рабочий процесс с Kilo

1. **Перед началом работы** — Kilo ищет релевантные заметки по теме
2. **В процессе** — сохраняет ключевые решения в `Decisions/`
3. **После сессии** — создаёт запись в `Conversations/` с summary
4. **Инсайты** — сохраняет в `Insights/` с указанием контекста
5. **Cross-links** — добавляет `[[wikilinks]]` и заполняет `related`

### 6.6. Агентские инструкции для Kilo

Файл `C:\Users\user\.config\kilo\agent\obsidian.md` содержит инструкции для Kilo по работе с vault:

- Правила создания заметок
- Формат frontmatter
- Статусная модель
- Tag taxonomy
- Правила именования файлов

---

## 7. Рой Obsidian-агентов Kilo Code

Система расширена до **роя специализированных AI-агентов**, которые автоматизируют работу с vault.

### 7.1. Архитектура роя

```
OpenAgent (универсальный оркестратор)
  │
  ├── Obsidian (primary-агент) — прямой доступ к vault + делегирование
  │     ├── obsidian-context-retriever — загрузка контекста
  │     ├── obsidian-daily — Daily Notes
  │     ├── obsidian-decisions — логирование решений
  │     ├── obsidian-moc — Maps of Content
  │     ├── obsidian-insights — инсайты и паттерны
  │     └── obsidian-tag-manager — управление тегами
  │
  └── ObsidianSwarm (primary-агент-оркестратор) — для сложных многошаговых операций
        └── делегирует тем же суб-агентам
```

### 7.2. Primary-агенты

| Агент | Файл | Назначение |
|-------|------|-----------|
| **Obsidian** | `agent/obsidian.md` | Прямой доступ к vault через mcpvault + делегирование суб-агентам |
| **ObsidianSwarm** | `agent/obsidian-swarm.md` | Оркестратор для сложных многошаговых операций (auto-save-session) |

### 7.3. Суб-агенты Obsidian

| Суб-агент | Назначение | Когда вызывается |
|-----------|-----------|-----------------|
| `obsidian-context-retriever` | Загрузка контекста (MOC, Reference, поиск) | В начале каждой сессии |
| `obsidian-daily` | Daily Notes — создание, обновление статусов | Ежедневно, при changelog |
| `obsidian-decisions` | Логирование архитектурных решений | Когда принято решение |
| `obsidian-moc` | Управление Maps of Content | Создание/обновление MOC |
| `obsidian-insights` | Инсайты, паттерны, эвристики | Когда найден ценный инсайт |
| `obsidian-tag-manager` | Управление тегами | Добавление/удаление/реорганизация |

### 7.4. Принципы работы

1. **Суб-агенты read-only** — не имеют прав на bash/write/edit, работают только через инструменты mcpvault
2. **OpenAgent может вызывать суб-агентов напрямую** — без посредников
3. **ObsidianSwarm** — для комбинированных запросов (например, "сохрани сессию" → решения + инсайты + MOC + теги + daily)
4. **Делегирование приоритетнее ручного выполнения** — используй суб-агентов

### 7.5. Пути к файлам агентов

```
C:\Users\user\.config\kilo\agent\
├── obsidian.md                    # Primary-агент Obsidian
├── obsidian-swarm.md              # Primary-агент ObsidianSwarm
└── subagents\
    ├── obsidian-context-retriever.md
    ├── obsidian-daily.md
    ├── obsidian-decisions.md
    ├── obsidian-moc.md
    ├── obsidian-insights.md
    └── obsidian-tag-manager.md
```

---

## 8. Auto-Changelog — запись изменений в Obsidian

**Auto-Changelog** — механизм, при котором Kilo Code автоматически записывает в Obsidian daily note информацию о всех изменениях, сделанных в файлах проекта (код, документация, конфиги).

### 7.1. Как это работает

После каждого изменения файлов (создание, модификация, переименование, удаление) Kilo выполняет:

1. Определяет тип изменения (created/modified/renamed/deleted)
2. Определяет проект по пути (My-work, SA_docs, .config/kilo и т.д.)
3. Открывает daily note за сегодня (`Daily/YYYY-MM-DD.md`)
4. Добавляет запись в секцию `## Changes` (режим append)
5. Обновляет `updated` в frontmatter daily note

### 7.2. Формат записи

```
### Changes: YYYY-MM-DD HH:MM
**File**: `путь/к/файлу`
**Action**: created | modified | renamed | deleted
**Project**: <название проекта>
**Summary**: Что именно сделано (1-2 предложения)
```

### 7.3. Примеры

```
### Changes: 2026-05-04 14:30
**File**: `SA_docs/Instructions/Obsidian Second Brain Setup.md`
**Action**: created
**Project**: SA_docs
**Summary**: Создана инструкция по настройке Второго Мозга в Obsidian

### Changes: 2026-05-04 15:00
**File**: `.config/kilo/agent/openagent.md`
**Action**: modified
**Project**: .config/kilo
**Summary**: Добавлен auto-changelog — запись изменений в Obsidian
```

### 7.4. Когда выполняется

**Всегда** после:
- Создания нового файла (кода, документации, конфига)
- Изменения существующего файла
- Рефакторинга, переименования, удаления
- Обновления зависимостей, настроек MCP

**Исключения** (не записывать):
- Тривиальные изменения (опечатки, форматирование)
- Пользователь явно сказал "не записывай в Obsidian"

### 7.5. Конфигурация агентов

Auto-Changelog настроен в двух агентах Kilo:

| Агент | Файл | Роль |
|-------|------|------|
| `openagent.md` | `C:\Users\user\.config\kilo\agent\openagent.md` | Stage 5: Auto-Changelog — запись изменений |
| `obsidian.md` | `C:\Users\user\.config\kilo\agent\obsidian.md` | Раздел Auto-Changelog с процедурой |
| `obsidian-daily.md` | `C:\Users\user\.config\kilo\agent\subagents\obsidian-daily.md` | Daily note содержит секцию `## Changes` |

### 7.6. Преимущества

- **Полная история изменений** — что, когда и где было изменено
- **Контекст для следующих сессий** — Kilo видит историю изменений при загрузке контекста
- **Связь изменений с решениями** — в daily note можно сразу указывать, какое решение привело к изменению
- **Автоматизация** — не нужно вручную вести лог изменений

---

## 9. Auto-Save Session — полное сохранение сессии

**Auto-Save Session** — механизм, при котором Kilo Code в конце сессии выполняет полное сохранение всей информации в Obsidian vault через ObsidianSwarm.

### 9.1. Как это работает

В конце сессии OpenAgent вызывает `obsidian-swarm` с запросом "auto-save-session". ObsidianSwarm выполняет последовательно:

```
1. Conversation — запись разговора в Conversations/
2. Decisions — если были архитектурные решения → obsidian-decisions
3. Insights — если были инсайты → obsidian-insights
4. MOC — если появились новые темы → obsidian-moc
5. Tags — если появились новые теги → obsidian-tag-manager
6. Daily — обновление daily note → obsidian-daily
```

### 9.2. Триггеры выполнения

- Пользователь говорит "сохрани сессию", "закончили", "всё", "пока"
- Сессия естественным образом завершается (нет новых запросов)
- Пользователь переключается на другую задачу

### 9.3. Отличие от Auto-Changelog

| Характеристика | Auto-Changelog | Auto-Save Session |
|---------------|---------------|-------------------|
| **Когда** | После каждого write/edit | В конце сессии |
| **Что записывает** | Изменения файлов (1 запись) | Полный контекст сессии |
| **Куда** | Daily/YYYY-MM-DD.md (секция Changes) | Conversations/ + Decisions/ + Insights/ + MOC/ + Daily/ |
| **Кто выполняет** | OpenAgent напрямую (mcpvault) | ObsidianSwarm (через суб-агентов) |
| **Обязательность** | Всегда, кроме тривиальных | Всегда в конце сессии |

### 9.4. Пример conversation

Файл `Conversations/2026-05-04-kebab-case-title.md`:

```markdown
---
title: "2026-05-04 — Настройка синхронизации"
type: conversation
status: seed
created: 2026-05-04
updated: 2026-05-04
tags:
  - topic/kilo-config
  - topic/session-sync
  - status/seed
summary: "Настроена двухуровневая синхронизация: Auto-Changelog + Auto-Save Session"
related:
  - "[[2026-05-04-session-sync-architecture]]"
  - "[[2026-05-04]]"
---

# 2026-05-04 — Настройка синхронизации

## Context
Настройка автоматической синхронизации изменений сессии с Obsidian vault.

## Key Decisions
- Выбрана двухуровневая архитектура: Level 1 (immediate) + Level 2 (end-of-session)
- [[2026-05-04-session-sync-architecture]]

## Changed Files
- `.config/kilo/agent/openagent.md` — modified
- `.config/kilo/agent/obsidian.md` — modified
- `.config/kilo/agent/obsidian-swarm.md` — modified
```

---

## 10. Фронтметтер и теги

### 7.1. Обязательный frontmatter

Каждая заметка должна содержать YAML frontmatter:

```yaml
---
title: "Название заметки"
type: conversation | decision | insight | source | project | reference | daily | moc
status: seed | growing | evergreen | archived
created: 2026-05-04
updated: 2026-05-04
tags:
  - topic/<тема>
  - project/<проект>
  - source/<источник>
  - decision/<решение>
  - insight/<инсайт>
  - status/<статус>
source: "откуда информация"
summary: "Краткое описание (1-2 предложения)"
related:
  - "[[Связанная заметка 1]]"
  - "[[Связанная заметка 2]]"
---
```

### 7.2. Статусная модель

```
seed → growing → evergreen → archived
```

| Статус | Значение |
|--------|----------|
| `seed` | Только что создана, сырая идея |
| `growing` | Развивается, добавляются связи |
| `evergreen` | Зрелая, проверенная, стабильная |
| `archived` | Устарела, но не удалена (в `Archive/`) |

### 7.3. Tag taxonomy

| Префикс | Назначение | Примеры |
|---------|-----------|---------|
| `topic/` | Предметная область | `topic/architecture`, `topic/python` |
| `project/` | Проект | `project/second-brain` |
| `source/` | Источник | `source/claude`, `source/github` |
| `decision/` | Тип решения | `decision/architecture`, `decision/tooling` |
| `insight/` | Тип инсайта | `insight/pattern`, `insight/lesson` |
| `status/` | Статус | `status/seed`, `status/growing` |

### 7.4. Практика использования

- **Каждая заметка** должна содержать хотя бы один `topic/` тег
- **Каждая заметка** должна содержать `status/` тег, соответствующий её статусу
- **Conversations** и **Decisions** должны содержать `source/` тег
- **MOC-заметки** могут не иметь `topic/` (они сами являются навигационной структурой)

---

## 11. Устранение проблем

### 11.1. Прокси блокирует community-плагины

```powershell
# Временно отключить
Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" -Name ProxyEnable -Value 0
# Перезагрузить Obsidian (Ctrl+R), установить плагины
# Включить обратно
Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" -Name ProxyEnable -Value 1
```

### 11.2. MCP-сервер не отвечает

```powershell
# Проверить, что сервер запускается
node "$env:USERPROFILE\.config\kilo\node_modules\@bitbonsai\mcpvault\dist\server.js" "C:\Users\user\Desktop\Obsidian\Database"
# Должен вывести "mcpvault v0.11.0" и ждать STDIO
```

### 11.3. Templater не вставляет шаблон

1. Проверить `Template folder location` в настройках Templater
2. Убедиться, что шаблон существует в `Templates/`
3. Использовать `Ctrl+P` → `Templater: Insert template` вручную

### 11.4. Smart Connections не индексирует

1. Проверить API-ключ в настройках плагина
2. Выполнить `Smart Connections: Rebuild index` через палитру команд
3. Если используется локальный провайдер — проверить, запущен ли Ollama

### 11.5. Кириллица в заметках (кракозябры)

При тестировании MCP через PowerShell pipe возможна проблема с кодировкой. **В реальной работе через Kilo Code кириллица сохраняется корректно**, т.к. Kilo отправляет JSON через Node.js STDIO напрямую (UTF-8).

### 11.6. Obsidian зависает на большом vault

1. Отключить неиспользуемые core-плагины
2. В Smart Connections уменьшить `Max notes for semantic search`
3. Закрыть панели, которые не используются (Graph view для больших vault)

---

## Ссылки

| Ресурс | URL/Путь |
|--------|---------|
| Obsidian | https://obsidian.md |
| Vault | `C:\Users\user\Desktop\Obsidian\Database` |
| MCP-сервер | `C:\Users\user\.config\kilo\node_modules\@bitbonsai\mcpvault` |
| Агентская инструкция | `C:\Users\user\.config\kilo\agent\obsidian.md` |
| Конфигурация Kilo | `C:\Users\user\.config\kilo\kilo.jsonc` |
| MCPvault GitHub | https://github.com/bitbonsai/mcpvault |
| Dataview | https://github.com/blacksmithgu/obsidian-dataview |
| Templater | https://github.com/SilentVoid13/Templater |
| Smart Connections | https://github.com/brianpetro/obsidian-smart-connections |

---

**Последнее обновление:** 2026-05-04  
**Версия:** 2.0  
**Статус:** Актуально  
**Изменения в v2.0:** Добавлен раздел "Рой Obsidian-агентов Kilo Code" (архитектура, primary-агенты, суб-агенты, принципы работы). Добавлен раздел "Auto-Save Session" (полное сохранение сессии, триггеры, отличие от Auto-Changelog, пример conversation). Обновлена нумерация разделов.
