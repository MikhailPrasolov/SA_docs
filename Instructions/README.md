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
| [`Гайд MCP.md`](./Гайд%20MCP.md) | Настройка MCP-серверов Kilo Code (580 строк) |
| [`Obsidian Second Brain Setup.md`](./Obsidian%20Second%20Brain%20Setup.md) | Настройка Второго Мозга в Obsidian (600+ строк) |

---

## 🚀 Быстрый старт

### 1) Настройка MCP-серверов

```powershell
cd "$env:USERPROFILE\.config\kilo"
npm install mcp-jira-server
npm install @atlassian-dc-mcp/confluence
```

Подробнее: [`Гайд MCP.md`](./Гайд%20MCP.md)

### 2) Настройка Obsidian Second Brain

1. Установить Obsidian с [obsidian.md](https://obsidian.md)
2. Создать vault в `C:\Users\user\Desktop\Obsidian\Database`
3. Установить плагины: Dataview, Templater, Smart Connections
4. Настроить MCP-сервер mcpvault

Подробнее: [`Obsidian Second Brain Setup.md`](./Obsidian%20Second%20Brain%20Setup.md)

---

## 📬 Контакты

- 🔗 **Контакты автора**
  • TG: [@MikhailPrasolov](https://t.me/MikhailPrasolov)
  • Канал: [t.me/systemananalytics](https://t.me/systemananalytics)

---

*Последнее обновление: Май 2026*
