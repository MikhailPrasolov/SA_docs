# Unified MCP Guide for Kilo Code (Context7, GitLab, Jira, Confluence)

## 1. Общий обзор

**MCP (Model Context Protocol)** в **Kilo Code** позволяет подключать внешние сервисы как инструменты для ИИ-агента:

- **Context7** — актуальная документация и примеры кода по библиотекам и фреймворкам.
- **GitLab MCP** — работа с репозиториями, MR, issues и CI/CD в корпоративном GitLab.
- **Jira MCP** — поиск, чтение и управление задачами в Jira, включая работу со спринтами и логирование времени.
- **Confluence MCP** — поиск, чтение и управление страницами корпоративного Confluence.

Все MCP-сервера настраиваются в файле конфигурации Kilo Code:

```text
Windows: C:\Users\<user>\.config\kilo\kilo.jsonc
Linux/Mac: ~/.config/kilo/kilo.jsonc
```

### Полная глобальная конфигурация MCP:

```jsonc
{
  "mcp": {
    "context7": {
      "type": "remote",
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "ВАШ_API_КЛЮЧ_ЗДЕСЬ"
      },
      "enabled": true,
      "timeout": 15000
    },
    "gitlab": {
      "type": "remote",
      "url": "https://git.example.com/api/v4/mcp",
      "headers": {
        "Authorization": "Bearer ВАШ_GITLAB_TOKEN_ЗДЕСЬ"
      },
      "enabled": true,
      "timeout": 15000
    },
    "jira": {
      "type": "local",
      "command": [
        "node",
        "node_modules/mcp-jira-server/build/index.js"
      ],
      "environment": {
        "JIRA_BASE_URL": "https://jira.example.com",
        "JIRA_PAT": "ВАШ_JIRA_TOKEN_ЗДЕСЬ"
      },
      "enabled": true,
      "timeout": 30000
    },
    "confluence": {
      "type": "local",
      "command": [
        "node",
        "node_modules/@atlassian-dc-mcp/confluence/build/index.js"
      ],
      "environment": {
        "CONFLUENCE_HOST": "confluence.example.com",
        "CONFLUENCE_API_TOKEN": "ВАШ_CONFLUENCE_TOKEN_ЗДЕСЬ"
      },
      "enabled": true,
      "timeout": 30000
    }
  }
}
```

---

## 2. Общие принципы настройки MCP в Kilo Code

В секции `"mcp"` файла `kilo.jsonc` каждый сервер описывается объектом:

```jsonc
{
  "mcp": {
    "имя_сервера": {
      "type": "remote" | "local",
      "url": "https://... (для remote)",
      "command": ["node", "путь_к_скрипту.js"],   // для local
      "headers": { "...": "..." },                // для remote
      "environment": { "...": "..." },            // для local
      "enabled": true,
      "timeout": 15000
    }
  }
}
```

### Важное примечание: Только глобальная конфигурация

Kilo Code должен использовать **ТОЛЬКО глобальную конфигурацию** из `~/.config/kilo/kilo.jsonc`.

**Правила:**
1. **Запрещены локальные конфигурации** в проекте:
   - Не создавать `.vscode/mcp.json`
   - Не создавать `.kilo/` директории
   - Не создавать `.kilocode/` директории
   - Не создавать `.opencode/` директории
   - Не создавать `kilo.json` или `kilo.jsonc` в корне проекта

2. **Все настройки MCP** берутся из глобальной конфигурации:
   - context7 - документация библиотек
   - gitlab - GitLab API
   - jira - Jira API
   - confluence - Confluence API

3. **Переменные окружения** для принудительного использования глобальной конфигурации:
   ```
   KILO_DISABLE_PROJECT_CONFIG=true
   ```

**Рекомендации:**
- Токены и секреты хранить только в `headers`/`environment`, не коммитить в Git.
- Файл `kilo.jsonc` не должен попадать в публичные репозитории.
- Регулярно ротировать токены (Context7, Confluence, Jira, GitLab).

---

## 3. Context7 MCP (актуальная документация по библиотекам)

### 3.1. Назначение

**Context7** — MCP-сервер, который подтягивает актуальную документацию и примеры кода по библиотекам и фреймворкам прямо из источников.  
Основные плюсы:

- актуальные версии API;
- меньше галлюцинаций;
- поддержка конкретных версий библиотек;
- быстрый доступ к доке прямо из промпта.

### 3.2. Получение API-ключа

1. Зайти на: https://context7.com/dashboard  
2. Зарегистрироваться/войти.
3. Сгенерировать API-ключ в формате `ctx7sk-...`.
4. Сохранить ключ локально (менеджер паролей, env-переменные).

**Пример API ключа:** `ctx7sk-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

### 3.3. Конфигурация Context7

#### Вариант 1. Удалённый MCP-сервер (рекомендуется)

```jsonc
{
  "mcp": {
    "context7": {
      "type": "remote",
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "ВАШ_API_КЛЮЧ"
      },
      "enabled": true,
      "timeout": 15000
    }
  }
}
```

#### Вариант 2. Локальный MCP-сервер

```jsonc
{
  "mcp": {
    "context7": {
      "type": "local",
      "command": [
        "npx",
        "-y",
        "@upstash/context7-mcp",
        "--api-key",
        "ВАШ_API_КЛЮЧ"
      ],
      "enabled": true,
      "timeout": 10000
    }
  }
}
```

### 3.4. Инструменты Context7

1. **resolve-library-id**
   - Поиск библиотеки по названию.
   - Вход:
     - `query` — текст задачи/контекста;
     - `libraryName` — имя библиотеки.

2. **query-docs**
   - Получение документации/примеров кода.
   - Вход:
     - `libraryId` — ID библиотеки (например, `/vercel/next.js`, `/supabase/supabase`);
     - `query` — конкретный вопрос/задача.

### 3.5. Примеры промптов

```text
Как настроить middleware в Next.js 14? use context7
```

```text
Реализуй базовую аутентификацию с Supabase.
use library /supabase/supabase for API and docs.
```

```text
Покажи Supabase auth API для регистрации по email/password. use context7
```

```text
Создай Next.js middleware, который проверяет валидный JWT в cookies
и перенаправляет неаутентифицированных пользователей на /login. use context7
```

### 3.6. Проверка подключения

```bash
curl -X POST "https://mcp.context7.com/mcp" \
  -H "Content-Type: application/json" \
  -H "CONTEXT7_API_KEY: ВАШ_API_КЛЮЧ" \
  -d '{
    "jsonrpc": "2.0",
    "method": "initialize",
    "params": {
      "protocolVersion": "2024-11-05",
      "capabilities": {},
      "clientInfo": {
        "name": "test",
        "version": "1.0.0"
      }
    },
    "id": 1
  }'
```

Если всё ок — придёт JSON с `serverInfo.name = "Context7"`.

---

## 4. Confluence MCP

### 4.1. Назначение

**Confluence MCP** даёт агенту доступ к корпоративному Confluence:

- поиск страниц через CQL;
- чтение содержимого страниц;
- создание и обновление страниц;
- поиск и просмотр пространств.

### 4.2. Конфигурация

```jsonc
"confluence": {
  "type": "local",
  "command": [
    "node",
    "node_modules/@atlassian-dc-mcp/confluence/build/index.js"
  ],
  "environment": {
    "CONFLUENCE_HOST": "confluence.example.com",
    "CONFLUENCE_API_TOKEN": "ВАШ_CONFLUENCE_TOKEN_ЗДЕСЬ"
  },
  "enabled": true,
  "timeout": 30000
}
```

**Пример токена:** `ATATT3xFfGF0...` (Personal Access Token для Confluence Data Center)

Особенности:

- используется **Bearer Token** (Personal Access Token, PAT);
- PAT должен иметь права на нужные пространства (чтение/запись).

### 4.3. Основные команды

#### 4.3.1. Получение содержимого страницы

```text
/confluence_getContent CONTENT-ID
```

Параметры:

- `contentId` — ID страницы (обязателен);
- `expand` — например, `body.storage,version,space`;
- `bodyMode` — `storage` | `text` | `none`;
- `maxBodyChars` — ограничение текста при `text`.

Примеры:

```text
/confluence_getContent 1820360957
/confluence_getContent 1820360957 expand=body.storage,version,space
```

#### 4.3.2. Поиск контента (CQL)

```text
/confluence_searchContent "CQL запрос" limit=50
```

Примеры:

```text
/confluence_searchContent "space = 'DOCS' AND type = 'page'" limit=50
/confluence_searchContent "text ~ 'API' AND space = 'DEVELOPMENT'" limit=20
/confluence_searchContent "space = 'PROJECTS' AND created >= startOfMonth()" limit=30
```

#### 4.3.3. Создание и обновление страниц

Создание:

```text
/confluence_createContent
title: "Новая страница"
spaceKey: "DOCS"
type: "page"
content: "<тело в Confluence Storage Format>"
parentId: 123456789
output: "ack"
```

Обновление:

```text
/confluence_updateContent 1820360957
title: "Обновлённый заголовок"
content: "<новое тело>"
version: 5
versionComment: "Обновление документации"
output: "full"
```

---

## 5. GitLab MCP

### 5.1. Назначение

**GitLab MCP** предоставляет доступ к корпоративному GitLab для работы с репозиториями, MR, issues и CI/CD.

### 5.2. Конфигурация

```jsonc
"gitlab": {
  "type": "remote",
  "url": "https://git.example.com/api/v4/mcp",
  "headers": {
    "Authorization": "Bearer glpat-xxxxxxxxxxxxxxxxxx"
  },
  "enabled": true,
  "timeout": 15000
}
```

**Пример токена:** `glpat-xxxxxxxxxxxxxxxxxx` (GitLab Personal Access Token)

### 5.3. Основные возможности

- Работа с репозиториями (поиск, просмотр, создание)
- Управление Merge Requests (создание, просмотр, аппрув)
- Работа с Issues
- Мониторинг CI/CD пайплайнов
- Управление проектами и группами

## 6. Jira MCP

### 5.1. Назначение

**Jira MCP** даёт возможность из Kilo Code:

- искать задачи по JQL;
- получать детали задач;
- создавать и обновлять задачи;
- добавлять комментарии и вложения;
- работать с досками, спринтами;
- логировать время.

### 5.2. Конфигурация

```jsonc
"jira": {
  "type": "local",
  "command": [
    "node",
    "node_modules/mcp-jira-server/build/index.js"
  ],
  "environment": {
    "JIRA_BASE_URL": "https://jira.example.com",
    "JIRA_PAT": "ATATT3xFfGF0..."
  },
  "enabled": true,
  "timeout": 30000
}
```

**Пример токена:** `ATATT3xFfGF0...` (Jira Personal Access Token)

Особенности:

- используется **Bearer Token** (Jira PAT);
- переменная `JIRA_PAT` хранит токен.

### 5.3. Основные команды

#### 5.3.1. Поиск задач

```text
/search_issues JQL_ЗАПРОС
```

Примеры:

```text
/search_issues project = PROJ AND priority = High
/search_issues assignee = currentUser() AND status != "Closed" ORDER BY priority DESC, created DESC
/search_issues created >= -7d ORDER BY created DESC
```

#### 5.3.2. Получение задачи

```text
/get_issue PROJ-456
```

#### 5.3.3. Создание задачи

```text
/create_issue
project: PROJ
summary: "Ошибка при загрузке страницы профиля"
description: "При переходе на страницу профиля возникает ошибка 500."
issuetype: Bug
priority: High
assignee: developer@example.com
```

#### 5.3.4. Обновление, комментарии, вложения

```text
/update_issue PROJ-789
status: "In Progress"
```

```text
/add_comment PROJ-456 "Исправил ошибку валидации. Добавил проверку на null."
```

```text
/add_attachment PROJ-123 "/path/to/error.log"
```

#### 5.3.5. Проекты, доски, спринты, лог времени

```text
/list_projects
/list_boards
/list_sprints BOARD-ID
/log_work PROJ-123 "3h" "Разработка API эндпоинта для экспорта отчетов"
```

---

## 7. Мини‑шпаргалка по CQL и JQL

### 7.1. CQL (Confluence)

Операторы: `=`, `!=`, `>`, `<`, `>=`, `<=`, `IN`, `NOT IN`, `~`, `!~`, `AND`, `OR`, `NOT`.  

Примеры:

```text
space = "DOCS" AND type = "page"
space = "DOCS" AND label = "documentation"
space = "DOCS" AND created >= -30d
space = "DOCS" AND lastModified >= startOfDay()
```

### 7.2. JQL (Jira)

Операторы: `=`, `!=`, `>`, `<`, `>=`, `<=`, `IN`, `NOT IN`, `~`, `!~`, `IS`, `IS NOT`.  

Функции: `currentUser()`, `membersOf()`, `now()`, `startOfDay()`, `startOfWeek()`, `startOfMonth()`.

Примеры:

```text
project = PROJ AND priority = High
assignee = currentUser() AND status = "In Progress"
labels in (bug, critical, production)
updated >= startOfDay()
```

---

## 8. Комбинирование MCP

Примеры сценариев:

- **Jira + Confluence**: найти задачу → найти связанные страницы по ключу задачи в Confluence.
- **Context7 + Jira**: прочитать описание задачи и сгенерировать реализацию, подтягивая актуальную доку по библиотекам.
- **LLM + Confluence**: собрать best practices и положить их в Confluence через MCP.

---

*Рекомендуется держать этот файл как «единый вход» по MCP для Kilo Code и при необходимости добавлять свои конкретные сценарии по проектам.*

---

**Последнее обновление:** 2026-04-17  
**Конфигурация:** Только глобальная (`~/.config/kilo/kilo.jsonc`)  
**Статус:** Все MCP сервера готовы к настройке

---

**⚠️ ВНИМАНИЕ:** Этот гайд содержит примеры конфигурации. Замените все значения `example.com`, `ВАШ_..._ЗДЕСЬ` и примеры токенов на реальные данные ваших сервисов.

---

### Jira Data Center — известные баги

Пакет `@guhcostan/jira-mcp` v2.5.0 содержит **два бага** при работе с Jira Data Center:

**Баг 1 — ADF формат:** Отправляет текстовые поля (`body`, `description`) в формате Atlassian Document Format (ADF: `{type: "doc", ...}`), который поддерживается только в Jira Cloud. Jira Data Center ожидает plain string.

**Баг 2 — Assignee формат:** Отправляет assignee через `{ accountId: "..." }`, что работает только в Jira Cloud. Jira Data Center ожидает `{ name: "username" }`.

**Решение:** Используйте фикшеную локальную копию пакета вместо `npx`:

```jsonc
"jira": {
  "type": "local",
  "command": [
    "node",
    "~/.config/kilo/mcp-jira-fixed/node_modules/@guhcostan/jira-mcp/build/index.js"
  ],
  "environment": {
    "JIRA_URL": "https://jira.example.com",
    "JIRA_ACCESS_TOKEN": "ВАШ_PAT"
  },
  "enabled": true,
  "timeout": 60000
}
```

### GitLab Multi-Instance

Kilo Code автоматически добавляет префикс из ключа конфигурации ко всем инструментам MCP-сервера. Это позволяет запускать несколько инстансов GitLab:

| Ключ | URL | Префикс инструментов |
|------|-----|---------------------|
| `gitlab-company` | `https://gitlab.company.ru/api/v4` | `gitlab-company_*` |
| `gitlab-project` | `https://gitlab.project.ru/api/v4` | `gitlab-project_*` |

Для GitLab версий <18 (без native MCP) используется `@yoda.digital/gitlab-mcp-server`:

```jsonc
"gitlab": {
  "type": "local",
  "command": ["npx", "-y", "@yoda.digital/gitlab-mcp-server"],
  "environment": {
    "GITLAB_API_URL": "https://gitlab.company.ru/api/v4",
    "GITLAB_PERSONAL_ACCESS_TOKEN": "ВАШ_PAT",
    "NODE_TLS_REJECT_UNAUTHORIZED": "0"
  },
  "enabled": true,
  "timeout": 30000
}
```

### MongoDB MCP

```jsonc
"mongodb": {
  "type": "local",
  "command": ["npx", "-y", "mongodb-mcp-server", "mongodb://host:27017", "--readOnly"],
  "enabled": true,
  "timeout": 60000
}
```

**Особенности:**
- Всегда используйте `--readOnly` для безопасности
- Для аналитических реплик: `directConnection=true` + `readPreference=nearest`

### PostgreSQL MCP

```jsonc
"postgres": {
  "type": "local",
  "command": [
    "npx", "-y", "@modelcontextprotocol/server-postgres",
    "postgresql://USER:PASSWORD_URLENCODED@host:6432/dbname"
  ],
  "environment": {
    "PGPASSWORD": "YOUR_PASSWORD_RAW"
  },
  "enabled": true,
  "timeout": 60000
}
```

**Особенности:**
- Пароль со спецсимволами требует URL-encoding в connection string
- Raw-пароль дублируется в `PGPASSWORD` environment
- Для Yandex Cloud используется порт 6432

### SSL-сертификаты в корпоративной сети

Корпоративные серверы часто используют SSL-сертификаты, подписанные внутренним CA. Node.js не доверяет им по умолчанию:

```
Error: unable to verify the first certificate
Error: unable to get local issuer certificate
```

**Решения (по приоритету):**

1. **`NODE_TLS_REJECT_UNAUTHORIZED=0`** — отключает проверку SSL для конкретного MCP-сервера
2. **`NODE_EXTRA_CA_CERTS`** — указывает путь к PEM-файлу с корневым сертификатом
3. **Системное доверие** — добавление корневого CA в хранилище ОС

### REST API через PowerShell (фоллбэк)

Если MCP-сервер недоступен, можно использовать REST API напрямую:

```powershell
# Jira
function Invoke-JiraApi {
    param([string]$Method = "GET", [string]$Endpoint, [object]$Body = $null)
    [Console]::OutputEncoding = [System.Text.Encoding]::UTF8
    $headers = @{
        "Authorization" = "Bearer $env:JIRA_API_TOKEN"
        "Content-Type"  = "application/json; charset=utf-8"
    }
    $uri = "https://jira.example.com/rest/api/2$Endpoint"
    if ($Body) {
        $jsonBody  = $Body | ConvertTo-Json -Depth 10 -Compress
        $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($jsonBody)
        $response  = Invoke-WebRequest -Uri $uri -Headers $headers -Method $Method -Body $bodyBytes -ErrorAction Stop
    } else {
        $response = Invoke-WebRequest -Uri $uri -Headers $headers -Method $Method -ErrorAction Stop
    }
    return $response.Content | ConvertFrom-Json
}
```

```powershell
# Confluence
$headers = @{
    "Authorization" = "Bearer $env:CONFLUENCE_API_TOKEN"
    "Accept"        = "application/json"
}
Invoke-RestMethod -Uri "https://confluence.example.com/rest/api/space?limit=1" -Headers $headers
```

---

**Последнее обновление:** 2026-06-20  
**Конфигурация:** Только глобальная (`~/.config/kilo/kilo.jsonc`)  
**Статус:** Актуально