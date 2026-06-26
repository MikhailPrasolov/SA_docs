# Развертывание кастомных агентов для Kilo Code

## Обзор

Кастомные агенты для Kilo Code — расширенная система оркестрации на базе OpenAgentsControl. Включает primary-агентов с делегированием, 22 суб-агента (15 общих + 7 Obsidian) и контекстную систему.

---

## 1. Структура агентов

### 1.1. Primary-агенты (`~/.config/kilo/agent/`)

| Агент | Файл | Назначение |
|-------|------|-----------|
| **OpenAgent** | `openagent.md` | Универсальный агент-оркестратор |
| **OpenCoder** | `opencoder.md` | Разработка кода, архитектура, рефакторинг |
| **Obsidian** | `obsidian.md` | Доступ к Obsidian vault + делегирование |
| **ObsidianSwarm** | `obsidian-swarm.md` | Оркестратор роя Obsidian-агентов |
| **PlantUML Architect** | `plantuml-architect.md` | PlantUML/C4-схемы |
| **ReviewManager** | `reviewmanager.md` | Оркестратор ревью кода |

### 1.2. Суб-агенты (`~/.config/kilo/agent/subagents/`)

**Общие (10 шт.):**

| Файл | Агент | Назначение |
|------|-------|-----------|
| `contextscout.md` | ContextScout | Поиск контекстных файлов в проекте |
| `externalscout.md` | ExternalScout | Документация внешних библиотек (Context7) |
| `task-manager.md` | TaskManager | Разбивка задач на подзадачи |
| `code-reviewer.md` | CodeReviewer | Детальное ревью кода |
| `batch-executor.md` | BatchExecutor | Параллельное выполнение задач |
| `stage-orchestrator.md` | StageOrchestrator | Многостадийная оркестрация с валидацией |
| `context-manager.md` | ContextManager | Управление жизненным циклом контекста |
| `context-retriever.md` | context-retriever | Единый контекстный поиск |
| `documentation.md` | DocWriter | Генерация документации |
| `web-scout.md` | web-scout | Веб-ресёрч: best practices, методологии |

**MCP-скауты (4 шт.):**

| Файл | Агент | Назначение |
|------|-------|-----------|
| `jira-scout.md` | jira-scout | Ресёрч в Jira: задачи, комментарии, ворклоги |
| `confluence-scout.md` | confluence-scout | Ресёрч в Confluence: страницы, CQL |
| `gitlab-scout.md` | gitlab-scout | Ресёрч в GitLab (multi-instance) |
| `github-scout.md` | github-scout | Ресёрч в GitHub |

**Obsidian-агенты (6 шт.):**

| Файл | Агент | Назначение |
|------|-------|-----------|
| `obsidian-context-retriever.md` | obsidian-context-retriever | Загрузка контекста из Obsidian vault |
| `obsidian-daily.md` | obsidian-daily | Daily Notes: создание, обновление статусов |
| `obsidian-decisions.md` | obsidian-decisions | Логирование архитектурных решений |
| `obsidian-moc.md` | obsidian-moc | Maps of Content: создание, обновление |
| `obsidian-insights.md` | obsidian-insights | Инсайты, паттерны, эвристики |
| `obsidian-tag-manager.md` | obsidian-tag-manager | Управление тегами |

### 1.3. Контекстная система (`~/.config/kilo/context/`)

```
context/
├── navigation.md                    # Навигация
├── context-system.md               # Система контекста
├── essential-patterns.md           # Базовые паттерны
├── visual-development.md           # Визуальная разработка
├── config/                         # Конфигурации
├── standards/                      # Стандарты (code-quality, test-coverage, и др.)
├── workflows/                      # Workflows (code-review, task-delegation, и др.)
├── guides/                         # Гайды
├── task-management/                # Управление задачами
└── context-system/                 # Управление контекстом
```

---

## 2. Предварительные требования

- Kilo Code установлен
- Node.js 18+ (для локальных MCP)
- Права на запись в `~/.config/kilo/`

---

## 3. Получение OpenAgentsControl

```powershell
cd ~/Desktop/GIT
git clone https://github.com/darrenhinde/OpenAgentsControl.git
```

Или скачать архив с [GitHub](https://github.com/darrenhinde/OpenAgentsControl) и распаковать.

---

## 4. Подготовка структуры директорий

```powershell
New-Item -ItemType Directory -Path "$env:USERPROFILE\.config\kilo\agent" -Force
New-Item -ItemType Directory -Path "$env:USERPROFILE\.config\kilo\agent\subagents" -Force
New-Item -ItemType Directory -Path "$env:USERPROFILE\.config\kilo\context" -Force
```

---

## 5. Копирование файлов

### 5.1. Primary-агенты (из OAC + кастомные)

```powershell
# Из OAC (базовые: OpenAgent, OpenCoder)
Copy-Item -Path "~/Desktop/GIT/OpenAgentsControl/.opencode/agent/core/*" `
          -Destination "$env:USERPROFILE\.config\kilo\agent\" -Recurse -Force
```

### 5.2. Суб-агенты

```powershell
Copy-Item -Path "~/Desktop/GIT/OpenAgentsControl/.opencode/agent/subagents/core/*" `
          -Destination "$env:USERPROFILE\.config\kilo\agent\subagents\" -Recurse -Force
```

### 5.3. Контекстные файлы

```powershell
Copy-Item -Path "~/Desktop/GIT/OpenAgentsControl/.opencode/context/core/*" `
          -Destination "$env:USERPROFILE\.config\kilo\context\" -Recurse -Force
```

---

## 6. Настройка путей и разрешений

### 6.1. OpenAgent — task-разрешения

В `openagent.md` frontmatter содержит разрешения для делегирования:

```yaml
task:
  "obsidian": "allow"
  "obsidian-context-retriever": "allow"
  "obsidian-daily": "allow"
  "obsidian-decisions": "allow"
  "obsidian-moc": "allow"
  "obsidian-insights": "allow"
  "obsidian-tag-manager": "allow"
  "obsidian-swarm": "allow"
  "contextscout": "allow"
  "externalscout": "allow"
  "task-manager": "allow"
  "code-reviewer": "allow"
  "documentation": "allow"
  "plantuml-architect": "ask"
  "*": "ask"
```

### 6.2. Context Loading Modes

| Mode | Когда | Действие |
|------|-------|----------|
| `none` | приветствие, простой вопрос | не загружать Obsidian |
| `light` | вопрос связан с проектом/знаниями | `obsidian-context-retriever` |
| `full` | bash/write/edit/task, код | Obsidian + standards/workflows |

### 6.3. Workflow: полный цикл сессии

```
Stage 1: Загрузка контекста (ОБЯЗАТЕЛЬНО)
  1. Определи тему/репозиторий
  2. Вызови obsidian-context-retriever
  3. Если нужно — ContextScout для файлов проекта
  4. Если внешние библиотеки — ExternalScout

Stage 2: Анализ и маршрутизация
  - Вопрос/анализ → ответь напрямую
  - Работа с Obsidian → делегируй obsidian-swarm
  - Код/разработка → ContextScout → TaskManager
  - Ревью → CodeReviewer
  - Документация → DocWriter

Stage 3: Выполнение + Auto-Changelog
  - write/edit/bash → СРАЗУ changelog в daily note

Stage 4: Auto-Save Session (В КОНЦЕ СЕССИИ)
  - Session digest → Conversations/
  - Decisions → obsidian-decisions
  - Insights → obsidian-insights
  - MOC update → obsidian-moc
  - Daily note → obsidian-daily
```

### 6.4. Правила делегирования

| Условие | Действие |
|---------|----------|
| Сложная задача (4+ файлов, >60 мин) | TaskManager |
| Внешняя библиотека | ExternalScout / Context7 |
| Контекст проекта | ContextScout |
| Ревью кода | CodeReviewer |
| PlantUML/C4 схема | plantuml-architect |
| Obsidian операции | obsidian-* суб-агенты |
| Jira ресёрч | jira-scout |
| Confluence ресёрч | confluence-scout |
| GitLab ресёрч | gitlab-scout (multi-instance) |
| GitHub ресёрч | github-scout |
| Веб-ресёрч | web-scout |

---

## 7. Интеграция с MCP серверами

| MCP-сервер | Ключ в kilo.jsonc | Тип | Назначение |
|------------|-------------------|-----|-----------|
| **Context7** | `context7` | remote | Документация библиотек |
| **GitLab** | `gitlab-*` | local | GitLab API |
| **Jira** | `jira` | local | Jira Data Center |
| **Confluence** | `confluence` | local | Confluence Data Center |
| **GitHub** | `github` | local | GitHub API |
| **Obsidian** | `obsidian` | local | Obsidian Second Brain |
| **MongoDB** | `mongodb` | local | MongoDB аналитика (read-only) |

---

## 8. Проверка установки

```powershell
# Primary-агенты (6 шт.)
dir "$env:USERPROFILE\.config\kilo\agent\*.md"

# Суб-агенты (20 шт.)
dir "$env:USERPROFILE\.config\kilo\agent\subagents\*.md"

# Контекст
dir "$env:USERPROFILE\.config\kilo\context"
```

---

## 9. Версионирование агентов

Все агенты имеют frontmatter с версией:

```yaml
---
name: OpenAgent
version: 3.1.0
updated: 2026-06-02
---
```

Проверка версий:

```powershell
Select-String -Path "$env:USERPROFILE\.config\kilo\agent\*.md","$env:USERPROFILE\.config\kilo\agent\subagents\*.md" -Pattern "version:|updated:" | Select-Object Filename, Line
```

---

## 10. Устранение неполадок

### Агенты не загружают контекст
1. Проверить существование: `dir "$env:USERPROFILE\.config\kilo\context\navigation.md"`
2. Проверить пути в `contextscout.md`
3. Проверить права доступа

### Obsidian-агенты не работают
1. Проверить MCP-сервер: `/mcps`
2. Проверить `@bitbonsai/mcpvault` установлен
3. Проверить task-разрешения в `openagent.md`

### MCP-scout не работают
1. Проверить соответствующий MCP-сервер в `/mcps`
2. jira-scout → `jira`, confluence-scout → `confluence`
3. gitlab-scout → `gitlab-*`
4. github-scout → `github`

---

## 11. Ресурсы

- [OpenAgentsControl GitHub](https://github.com/darrenhinde/OpenAgentsControl)
- [Kilo Code Documentation](https://kilo.ai/docs)
- [MCP инструкция](Гайд%20MCP.md)
- [Obsidian Second Brain Setup](Obsidian%20Second%20Brain%20Setup.md)

---

*Дата развертывания: 2026-04-17*
*Последнее обновление: 2026-06-20*
*Конфигурация: Глобальная (`~/.config/kilo/kilo.jsonc`)*
