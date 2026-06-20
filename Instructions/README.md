# 📖 Инструкции по настройке инструментов

> Пошаговые руководства по настройке рабочего окружения: MCP-серверы для Kilo Code, Obsidian Second Brain и интеграция между ними.

## 📋 Содержание

1. [Описание раздела](#-описание-раздела)
2. [Файлы](#-файлы)
3. [Быстрый старт](#-быстрый-старт)

---

## 📖 Описание раздела

Раздел содержит практические инструкции для настройки инструментов, используемых в повседневной работе:

### Гайд MCP

**Файл:** [`Гайд MCP.md`](./Гайд%20MCP.md)

Полное руководство по настройке MCP-серверов для Kilo Code:

- **Context7** — актуальная документация библиотек и фреймворков
- **GitLab MCP** — работа с репозиториями, MR, issues, CI/CD
- **Jira MCP** — поиск, чтение, создание и управление задачами
- **Confluence MCP** — поиск, чтение, создание страниц Confluence
- CQL и JQL шпаргалки
- Комбинирование MCP-серверов

### Obsidian Second Brain Setup

**Файл:** [`Obsidian Second Brain Setup.md`](./Obsidian%20Second%20Brain%20Setup.md)

Пошаговая инструкция по настройке системы «Второй Мозг»:

- Установка Obsidian
- Создание и структура vault
- Настройка Obsidian (core-плагины)
- Установка community-плагинов (Dataview, Templater, Smart Connections)
- Шаблоны заметок (conversation, decision, insight, source)
- Интеграция с Kilo Code через MCP (mcpvault)
- Auto-Changelog — автоматическая запись изменений в Obsidian
- Фронтметтер, теги, статусная модель
- Устранение проблем

---

## 📁 Файлы

| Файл | Описание |
|------|----------|
| [`Гайд MCP.md`](./Гайд%20MCP.md) | Настройка MCP-серверов для Kilo Code |
| [`Obsidian Second Brain Setup.md`](./Obsidian%20Second%20Brain%20Setup.md) | Настройка Второго Мозга в Obsidian |
| [`AI_Kilo_Code_Setup.md`](./AI_Kilo_Code_Setup.md) | Полная конфигурация Kilo Code: MCP, провайдеры, разрешения |
| [`Развертывание агентов для Kilo Code.md`](./Развертывание%20агентов%20для%20Kilo%20Code.md) | Агенты: primary + суб-агенты, контекстная система |
| [`OpenCode Desktop Setup.md`](./OpenCode%20Desktop%20Setup.md) | Развертывание OpenCode Desktop |
| [`handy-guide.md`](./handy-guide.md) | Локальная транскрипция речи Handy |
| [`lm-studio-guide.md`](./lm-studio-guide.md) | Локальные LLM модели через LM Studio |
| [`proxy-guide.md`](./proxy-guide.md) | SOCKS5-прокси для обхода блокировок |
| [`transcribe-video-script.md`](./transcribe-video-script.md) | Транскрипция видео/аудио через faster-whisper |
| [`transcribe-test-models.md`](./transcribe-test-models.md) | Сравнение моделей транскрипции |

---

## 🚀 Быстрый старт

### 1) Установка Kilo Code

```powershell
# VS Code: Ctrl+Shift+X → "Kilo Code" → Install Pre-Release Version
```

Подробнее: [`AI_Kilo_Code_Setup.md`](./AI_Kilo_Code_Setup.md)

### 2) Настройка MCP-серверов

```powershell
npm install @bitbonsai/mcpvault
```

Подробнее: [`Гайд MCP.md`](./Гайд%20MCP.md)

### 3) Развертывание агентов

```powershell
git clone https://github.com/darrenhinde/OpenAgentsControl.git
```

Подробнее: [`Развертывание агентов для Kilo Code.md`](./Развертывание%20агентов%20для%20Kilo%20Code.md)

### 4) Настройка Obsidian Second Brain

1. Установить Obsidian с [obsidian.md](https://obsidian.md)
2. Создать vault
3. Установить плагины: Dataview, Templater, Smart Connections
4. Настроить MCP-сервер mcpvault

Подробнее: [`Obsidian Second Brain Setup.md`](./Obsidian%20Second%20Brain%20Setup.md)

### 5) Установка OpenCode Desktop

Скачать с [opencode.ai](https://opencode.ai)

Подробнее: [`OpenCode Desktop Setup.md`](./OpenCode%20Desktop%20Setup.md)

---

*Последнее обновление: 2026-06-20*
