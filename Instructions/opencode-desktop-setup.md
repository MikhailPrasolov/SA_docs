# OpenCode Desktop — развертывание и настройка

> **Версия**: 1.17.7
> **Конфигурация**: **только глобальная** — `~/.config/opencode/opencode.json`
> **Локальные конфиги** `.opencode/opencode.json` в проектах — удалены (запрещены)

---

## 1. Установка OpenCode Desktop

| Способ | Ссылка |
|--------|--------|
| Сайт | [opencode.ai](https://opencode.ai) — скачать дистрибутив |
| GitHub | [Releases](https://github.com/anomalyco/opencode/releases) |

После установки создаются:
- `~/.config/opencode/` — глобальная конфигурация
- `~/.local/share/opencode/` — auth, кэш

---

## 2. Структура конфигурации

```
~/.config/opencode/
├── opencode.json              # Главный конфиг (MCP, провайдеры, агенты, команды, плагины)
│
├── agent/                     # Агенты
│   ├── openagent.md           # Primary: универсальный оркестратор
│   ├── opencoder.md           # Primary: разработка кода
│   ├── obsidian.md            # Primary: Obsidian Second Brain
│   ├── reviewmanager.md       # Primary: ревью кода
│   ├── plantuml-architect.md  # Primary: PlantUML-схемы
│   ├── obsidian-swarm.md      # Primary: Obsidian swarm-операции
│   │
│   └── subagents/             # Суб-агенты (22 шт.)
│       ├── contextscout.md, externalscout.md, web-scout.md, task-manager.md
│       ├── code-reviewer.md, batch-executor.md, stage-orchestrator.md
│       ├── context-manager.md, context-retriever.md, documentation.md
│       ├── gitlab-scout.md, github-scout.md, jira-scout.md, confluence-scout.md
│       └── obsidian-*.md (7 шт.)
│
├── skills/                    # Скиллы (опционально)
│
~/.local/share/opencode/
└── auth.json                  # API-ключи провайдеров
```

OpenCode использует **контекстную систему Kilo** — стандарты, воркфлоу, гайды лежат в `~/.config/kilo/context/`.

---

## 3. Главный конфиг: `opencode.json`

### 3.1. Провайдеры

```json
"provider": {
  "deepseek": {
    "models": {
      "deepseek-v4-flash": { "name": "DeepSeek V4 Flash" },
      "deepseek-v4-pro": { "name": "DeepSeek V4 Pro" }
    }
  },
  "moonshot": {
    "name": "Moonshot / Kimi",
    "npm": "@ai-sdk/openai-compatible",
    "options": { "baseURL": "https://api.moonshot.cn/v1" },
    "models": {
      "kimi-k2.6": {}, "kimi-k2.5": {},
      "moonshot-v1-auto": {}, "moonshot-v1-128k": {},
      "moonshot-v1-32k": {}, "moonshot-v1-8k": {}
    }
  }
}
```

Ключи — в `auth.json`:

```json
{
  "deepseek": { "type": "api", "key": "sk-..." },
  "moonshot": { "type": "api", "key": "sk-..." }
}
```

### 3.2. MCP-серверы

| MCP | Тип | Назначение |
|-----|-----|-----------|
| **context7** | remote | Документация библиотек |
| **gitlab-*** | local | GitLab (multi-instance) |
| **jira** | local | Jira Data Center |
| **confluence** | local | Confluence Data Center |
| **github** | local | GitHub API |
| **obsidian** | local | Obsidian vault |
| **mongodb-*** | local | MongoDB (read-only) |
| **postgres** | local | PostgreSQL (read-only) |

**Типы:**
- `remote` — внешний SaaS (Context7)
- `local` — локальный процесс через `npx` или `node`

### 3.3. Плагины

```json
"plugin": [
  "opencode-helicone-session",
  "opencode-wakatime",
  "opencode-firecrawl",
  "opencode-notificator",
  "opencode-supermemory",
  "opencode-websearch-cited",
  "opencode-vibeguard",
  "opencode-dynamic-context-pruning",
  "opencode-shell-strategy",
  "opencode-skillful",
  "opencode-scheduler",
  "opencode-conductor"
]
```

| Плагин | Назначение |
|--------|-----------|
| `helicone-session` | Мониторинг сессий |
| `wakatime` | Трекинг времени |
| `firecrawl` | Веб-скрапинг |
| `notificator` | Системные уведомления |
| `supermemory` | Персистентная память |
| `websearch-cited` | Веб-поиск с источниками |
| `vibeguard` | Content guardrails |
| `dynamic-context-pruning` | Автообрезка контекста |
| `shell-strategy` | Стратегия shell-команд |
| `skillful` | Поддержка скиллов |
| `scheduler` | Cron-планировщик |
| `conductor` | Оркестрация |

### 3.4. Агенты

**Primary-агенты** (с кастомным промптом): OpenAgent, OpenCoder, Obsidian, ReviewManager, PlantUMLArchitect, ObsidianSwarm.

**Дополнительные агенты** (без кастомного промпта):
- `SecurityAuditor` — аудит безопасности
- `DBAnalyst` — исследование БД
- `GitLabAssistant` — GitLab MR, issues, CI/CD
- `APIDesigner` — REST/GraphQL API дизайн

### 3.5. Команды

```json
"command": {
  "review":    { "agent": "ReviewManager",    "description": "Code review" },
  "deploy":    {                              "description": "Pre-deployment checklist" },
  "db-query":  { "agent": "DBAnalyst",        "description": "Database exploration" },
  "security":  { "agent": "SecurityAuditor",  "description": "Security audit" },
  "api-design":{"agent": "APIDesigner",        "description": "API design" },
  "mr-review": { "agent": "GitLabAssistant",  "description": "GitLab MR review" },
  "save":      {                              "description": "Save session to Obsidian" }
}
```

---

## 4. Primary-агенты

### 4.1. OpenAgent

**Роль**: универсальный оркестратор — начинает любую задачу, маршрутизирует суб-агентам.

**Ключевые паттерны:**
- **Context Offloading** — НЕ делать поиск контекста самому, делегировать суб-агентам
- **Context Loading Modes**: `none`, `light`, `full`
- **Batch Accumulator**: накапливать changes → писать в Obsidian один раз
- **Auto-Save Session**: в конце сессии — полный save

**Permission model:**
```yaml
permission:
  bash: allow
  edit: { "*": "allow" }
  task: allow
  obsidian_*: allow
  obsidian_delete_note: ask
```

### 4.2. OpenCoder

**Роль**: разработка кода, архитектура, рефакторинг.

**Workflow:**
- Новая фича: контекст → анализ → план → реализация → тесты → линтер → ревью → changelog
- Рефакторинг: анализ → план → шаги с тестами → решение в Decisions
- Bug fix: воспроизвести → причина → фикс → тест → инсайт

### 4.3. Obsidian

**Роль**: работа с Obsidian vault через mcpvault.

**PARA-структура:** Inbox → Projects → Areas → Resources → AI-Sessions → Content → MOC → Templates → Archive → System

### 4.4. ReviewManager

**Роль**: оркестратор ревью кода через `code-reviewer`.

**Формат отчёта:** Critical → Warning → Info → Positive

### 4.5. PlantUMLArchitect

**Роль**: PlantUML/C4-схемы через Context7 + Obsidian.

**Типы диаграмм:** классов, последовательностей, компонентов, активностей, развертывания, состояний, use case

### 4.6. ObsidianSwarm

**Роль**: оркестратор роя Obsidian-агентов для auto-save-session.

**Процедура:**
1. Conversation (write_note → валидация read_note)
2. Decisions (делегирование obsidian-decisions)
3. Insights (делегирование obsidian-insights)
4. MOC update
5. Tags
6. Daily note

**Failover**: при недоступности суб-агента — запись напрямую через obsidian_* инструменты.

---

## 5. Суб-агенты: 22 шт.

### 5.1. Контекстные (5 шт.)
- `obsidian-context-retriever` — контекст из Obsidian (light mode)
- `context-retriever` — Obsidian + проект + стандарты (full mode)
- `externalscout` — документация библиотек через Context7
- `web-scout` — интернет-поиск
- `contextscout` — файлы контекста

### 5.2. MCP-скауты (4 шт.)
- `jira-scout` — Jira: задачи, JQL, метрики
- `confluence-scout` — Confluence: страницы, CQL
- `gitlab-scout` — GitLab: репозитории, MR, код
- `github-scout` — GitHub: репозитории, PR, issues

### 5.3. Исполнительные (6 шт.)
- `planner` — стратегическое планирование перед сложными задачами
- `task-manager` — разбивка задач
- `code-reviewer` — ревью кода
- `batch-executor` — параллельное выполнение
- `stage-orchestrator` — оркестрация с валидацией
- `documentation` — генерация документации

### 5.4. Управление контекстом (2 шт.)
- `context-manager` — жизненный цикл контекста
- `context-retriever` — единый контекстный поиск

### 5.5. Obsidian (7 шт.)
- `obsidian-context-retriever`, `obsidian-daily`, `obsidian-decisions`
- `obsidian-moc`, `obsidian-insights`, `obsidian-tag-manager`, `obsidian-telegram`

---

## 6. Auto-Changelog и Auto-Save Session

### Auto-Changelog

НАКАПЛИВАЙ записи об изменениях в памяти, пиши в Obsidian ОДИН РАЗ за сессию.

**Формат:**
```
- `HH:MM` **Action**: created/modified/deleted | **File**: `путь/к/файлу` | **Summary**: 1 предложение
```

**Триггеры записи:**
1. Конец сессии
2. Контекст ~80%
3. Явный запрос пользователя

### Auto-Save Session

В конце сессии — ОБЯЗАТЕЛЬНО полное сохранение через ObsidianSwarm:

1. Conversation → `40_AI-Sessions/Conversations/YYYY-MM-DD-*.md`
2. Decisions → `30_Resources/Decisions/ADR-*.md`
3. Insights → `30_Resources/Insights/*.md`
4. MOC → обновление карт
5. Tags → реорганизация
6. Daily → обновление

**Failover**: при недоступности ObsidianSwarm — запись напрямую через write_note.

---

## 7. Безопасность

### Что НЕЛЬЗЯ коммитить
- `auth.json` — API-ключи провайдеров
- Токены в `opencode.json`
- Personal Access Tokens (GitLab, GitHub, Jira, Confluence)
- Connection strings с паролями

### Рекомендации
- Для публикации примера — вынести секреты в `{env:VAR}`
- `opencode.json` и `auth.json` добавить в `.gitignore` глобально
- Использовать разные токены для разных сервисов

---

*Документация подготовлена на основе реальной конфигурации OpenCode Desktop v1.17.7*
*Контекстная система: Kilo Context v2.0*
*Последнее обновление: 2026-06-20*
