# Kilo Code — инструкция по настройке конфигурации

> Конфигурация: **только глобальная** — `~/.config/kilo/kilo.jsonc`
> Локальные `kilo.json` в проектах **запрещены** (`KILO_DISABLE_PROJECT_CONFIG=true`)

---

## 1. Установка Kilo Code

| Способ | Команда |
|--------|---------|
| VS Code | `Ctrl+Shift+X` → "Kilo Code" → Install Pre-Release Version |
| CLI | `code --install-extension kilocode.kilo-code` |
| Open VSX | [kilocode/Kilo-Code](https://open-vsx.org/extension/kilocode/Kilo-Code) |
| GitHub | [Releases](https://github.com/Kilo-Org/kilocode/releases) → `.vsix` |

---

## 2. Структура конфигурации

```
~/.config/kilo/
├── kilo.jsonc              # Основной конфиг (MCP, провайдеры, разрешения, модель)
├── agent/                  # Кастомные агенты (6 primary + 20 суб-агентов)
│   ├── openagent.md        # v3.1.0
│   ├── opencoder.md        # v2.0.0
│   ├── obsidian.md         # v2.0.0
│   ├── obsidian-swarm.md   # v2.0.0
│   ├── plantuml-architect.md
│   ├── reviewmanager.md
│   └── subagents/          # 20 шт. (10 общих + 6 Obsidian + 4 MCP-scout)
├── context/                # Контекстная система (standards, workflows, guides)
├── instructions/           # Глобальные инструкции
├── skills/                 # Skills
├── mcp-jira-fixed/         # Фикшеная копия @guhcostan/jira-mcp (ADF + assignee баг)
└── node_modules/           # @bitbonsai/mcpvault и др.
```

---

## 3. Текущий kilo.jsonc

### 3.1. MCP-серверы

```jsonc
"mcp": {
  "context7": {
    "type": "remote",
    "url": "https://mcp.context7.com/mcp",
    "headers": { "CONTEXT7_API_KEY": "ВАШ_КЛЮЧ" },
    "enabled": true, "timeout": 15000
  },
  "gitlab-company": {
    "_comment": "Корпоративный GitLab. VPN может требоваться.",
    "type": "local",
    "command": ["npx", "-y", "@yoda.digital/gitlab-mcp-server"],
    "environment": {
      "GITLAB_API_URL": "https://gitlab.company.ru/api/v4",
      "GITLAB_PERSONAL_ACCESS_TOKEN": "ВАШ_PAT",
      "NODE_TLS_REJECT_UNAUTHORIZED": "0"
    },
    "enabled": true, "timeout": 30000
  },
  "gitlab-project": {
    "type": "local",
    "command": ["npx", "-y", "@yoda.digital/gitlab-mcp-server"],
    "environment": {
      "GITLAB_API_URL": "https://gitlab.project.ru/api/v4",
      "GITLAB_PERSONAL_ACCESS_TOKEN": "ВАШ_PAT",
      "NODE_TLS_REJECT_UNAUTHORIZED": "0"
    },
    "enabled": true, "timeout": 30000
  },
  "jira": {
    "_comment": "Jira Data Center. Используется фикс ADF-бага.",
    "type": "local",
    "command": ["node", "~/.config/kilo/mcp-jira-fixed/node_modules/@guhcostan/jira-mcp/build/index.js"],
    "environment": {
      "JIRA_URL": "https://jira.company.ru",
      "JIRA_ACCESS_TOKEN": "ВАШ_PAT"
    },
    "enabled": true, "timeout": 60000
  },
  "confluence": {
    "type": "local",
    "command": ["npx", "-y", "@atlassian-dc-mcp/confluence"],
    "environment": {
      "CONFLUENCE_HOST": "confluence.company.ru",
      "CONFLUENCE_API_TOKEN": "ВАШ_PAT",
      "NODE_TLS_REJECT_UNAUTHORIZED": "0"
    },
    "enabled": true, "timeout": 60000
  },
  "github": {
    "type": "local",
    "command": ["npx", "-y", "@modelcontextprotocol/server-github"],
    "environment": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ВАШ_PAT" },
    "enabled": true, "timeout": 30000
  },
  "obsidian": {
    "type": "local",
    "command": ["node", "~/.config/kilo/node_modules/@bitbonsai/mcpvault/dist/server.js", "~/Desktop/Obsidian/Database"],
    "enabled": true, "timeout": 30000
  },
  "mongodb": {
    "type": "local",
    "command": ["npx", "-y", "mongodb-mcp-server", "mongodb://host:27017", "--readOnly"],
    "enabled": true, "timeout": 60000
  },
  "postgres": {
    "_comment": "PostgreSQL — только чтение. Пароль URL-encode + PGPASSWORD.",
    "type": "local",
    "command": [
      "npx", "-y", "@modelcontextprotocol/server-postgres",
      "postgresql://USER:PASSWORD_URLENCODED@host:6432/dbname"
    ],
    "environment": {
      "PGPASSWORD": "YOUR_PASSWORD_RAW"
    },
    "enabled": true, "timeout": 60000
  }
}
```

### 3.2. Провайдеры моделей

```jsonc
"model": "deepseek/deepseek-chat",
"disabled_providers": ["deepseek_flash"],
"provider": {
  "lm-studio": {
    "name": "LM Studio",
    "npm": "@ai-sdk/openai-compatible",
    "models": {
      "qwen3.5-9b-local": { "options": { "maxTokens": 131072 } },
      "qwen3-4b-local": {}
    },
    "options": { "baseURL": "http://127.0.0.1:1234/v1" }
  }
}
```

| Провайдер | Модели | Назначение |
|-----------|--------|-----------|
| **DeepSeek** (default) | `deepseek/deepseek-chat` | Программирование, анализ |
| **Kimi / Moonshot** | `kimi-k2.6`, `kimi-k2.5`, `moonshot-v1-*` | Альтернатива |
| **LM Studio** (local) | Локальные GGUF-модели | Локальные через localhost:1234 |
| **Beeline AI** (корп.) | `GLM-5`, `Qwen3-*`, `gpt-oss-120b` и др. | Корпоративные LLM |

### 3.3. Разрешения

```jsonc
"permission": {
  "bash": "allow",
  "read": "allow", "glob": "allow", "grep": "allow", "list": "allow",
  "external_directory": {
    "*": "ask",
    "~/.config/kilo/agent/*": "allow",
    "~/.config/kilo/context/*": "allow",
    "~/.config/kilo/*": "allow"
  },
  "edit": { "*": "allow" },
  "skill": "allow", "task": "allow"
}
```

### 3.4. Инструкции и агенты

```jsonc
"instructions": [
  "~/Desktop/GIT/AGENTS.md",
  "~/.config/kilo/instructions/*.md"
],
"agent": { "OpenAgent": {} },
"skills": { "paths": ["~/.config/kilo/skills"] }
```

---

## 4. Beeline AI — подключение (опционально)

**Для пользователей Beeline/VimpelCom.** API-эндпоинты для доступа к корпоративным моделям.

### Получение API-ключа

1. Откройте корпоративный AI-портал (обычно `chat.ai.company.ru`)
2. Выберите тенант → вкладка **API Ключ** → скопируйте ключ
3. Срок жизни — 100 дней

### API-эндпоинты

| Эндпоинт | URL |
|----------|-----|
| Основной | `https://api.ai.company.ru/api/v3/` |
| Расширенный | `https://api-extended.company.ru/api/v1` |

### Добавление в kilo.jsonc

```jsonc
"provider": {
  "beeline-ai": {
    "options": { "apiKey": "ВАШ_КЛЮЧ", "baseURL": "https://api.ai.company.ru/api/v3/" },
    "models": {
      "llm-xlarge-moe-instruct": {}, "llm-medium-moe-instruct": {},
      "llm-medium-instruct": {}, "llm-medium-thinking": {},
      "gpt-oss-120b": {}, "GLM-5": {}, "GLM-5-instruct": {}, "GLM-5.1": {},
      "vlm-medium-instruct": {}
    }
  },
  "beeline-ai-extended": {
    "options": { "apiKey": "ВАШ_КЛЮЧ", "baseURL": "https://api-extended.company.ru/api/v1" },
    "models": {
      "Qwen3-235B-A22B-Instruct-2507": {}, "Qwen3-30B-A3B-Instruct-2507": {},
      "Qwen3.5-35B-A3B": {}, "Qwen3.5-35B-A3B-Instruct": {}
    }
  }
}
```

### Рекомендации по выбору модели

| Задача | Модель | Провайдер |
|--------|--------|-----------|
| Агентные задачи | `GLM-5.1` | beeline-ai |
| Качество текста | `Qwen3-235B-A22B` | beeline-ai-extended |
| Мультимодальность | `Qwen3.5-35B-A3B` | beeline-ai-extended |
| Кодинг | `gpt-oss-120b` | beeline-ai |
| Быстрые задачи | `llm-medium-moe-instruct` | beeline-ai |
| Reasoning | `llm-medium-thinking` | beeline-ai |

---

## 5. LM Studio — локальные модели

**Base URL:** `http://127.0.0.1:1234/v1`

Требует запущенного LM Studio с включённым Local Service. Context Length ≥ 128K для thinking mode.

Подробности: [lm-studio-guide.md](./lm-studio-guide.md)

---

## 6. Переключение моделей

- **TUI:** `Ctrl+X → M`
- **Команда:** `/models`
- Формат: `провайдер/модель` (напр. `beeline-ai/GLM-5.1`)

---

*Последнее обновление: 2026-06-20*
