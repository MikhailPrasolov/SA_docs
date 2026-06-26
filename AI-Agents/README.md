# 🤖 AI агенты — Материалы по AI/LLM

> **Статус:** `growing` • **Уровень:** `средний` • **Для:** всех, кто использует AI в работе
>
> Руководства и сравнения по использованию AI-агентов и LLM для задач системного анализа и разработки

## 📋 Содержание

1. [Описание материалов](#-описание-материалов)
2. [Файлы разделов](#-файлы-разделов)
3. [Использование с Kilo Code](#-использование-с-kilo-code)

---

## 🆕 Что нового

| Дата | Изменение |
|------|-----------|
| 2026-06 | Добавлены метаданные, контекст agent workflow, cross-refs с demo_AI |

---

## 📖 Описание материалов

### DeepSeek Reasoner

**Файл:** [`deepseek_reasoner_kilocode_setup.md`](./deepseek_reasoner_kilocode_setup.md)

Полное руководство по настройке и использованию модели **DeepSeek Reasoner** в Kilo Code:

- Получение API ключа DeepSeek
- Настройка Kilo Code для работы с DeepSeek Reasoner
- Проверка подключения и верификация работы
- Переключение между моделями (Chat vs Reasoner)
- Оптимальные настройки для разных задач
- Устранение неполадок

### Сравнение моделей

**Файлы:**
- [`deepseek_comparison.md`](./deepseek_comparison.md)
- [`deepseek_chat_vs_reasoner_comparison.md`](./deepseek_chat_vs_reasoner_comparison.md)

Сравнительный анализ режимов и моделей DeepSeek:
- DeepSeek Chat vs DeepSeek Reasoner
- Практические рекомендации по выбору модели
- Сценарии использования

---

## 📁 Файлы в разделе

| Файл | Описание |
|------|----------|
| [`deepseek_reasoner_kilocode_setup.md`](./deepseek_reasoner_kilocode_setup.md) | Инструкция по настройке DeepSeek Reasoner в Kilo Code |
| [`deepseek_comparison.md`](./deepseek_comparison.md) | Сравнение моделей DeepSeek |
| [`deepseek_chat_vs_reasoner_comparison.md`](./deepseek_chat_vs_reasoner_comparison.md) | Сравнение Chat и Reasoner режимов |

---

## 🤖 Использование с Kilo Code

### Быстрый старт с DeepSeek Reasoner

1. Зарегистрируйтесь на [platform.deepseek.com](https://platform.deepseek.com/)
2. Получите API ключ в личном кабинете
3. Откройте настройки Kilo Code (шестерёнка в панели)
4. Выберите провайдера **DeepSeek**
5. Введите API ключ
6. Выберите модель **`deepseek-reasoner`**

### Рекомендуемые настройки

| Задача | Модель | Temperature | Max Tokens |
|--------|--------|-------------|------------|
| Математика и логика | deepseek-reasoner | 0.3 | 2048 |
| Программирование и отладка | deepseek-reasoner | 0.5 | 4096 |
| Творческие задачи | deepseek-chat | 0.8 | 2048 |
| Повседневные задачи | deepseek-chat | 0.7 | 2048 |

---

## 🤖 Agent Workflow: как AI встроен в работу

На основе практического опыта (Obsidian Second Brain + OpenCode/Kilo агенты) выработаны следующие паттерны:

| Паттерн | Описание | Инструменты |
|---------|----------|-------------|
| **Оркестратор + суб-агенты** | Primary-агент координирует, суб-агенты выполняют специализированные задачи | OpenAgent + 7+ суб-агентов |
| **Context-first** | Перед задачей — загрузка контекста из Obsidian/project | context-retriever, obsidian-context-retriever |
| **MCP-интеграция** | Доступ к БД, GitLab, Jira, Confluence через MCP-серверы | mongodb, postgres, gitlab, jira, confluence |
| **Changelog в реальном времени** | Каждое изменение → запись в Daily Note | obsidian-daily |
| **Auto-Save Session** | Конец сессии → полное сохранение в Obsidian | obsidian-swarm + 6 суб-агентов |

> Подробнее: [`Instructions/Гайд MCP.md`](../Instructions/Гайд%20MCP.md) • [`Instructions/Obsidian Second Brain Setup.md`](../Instructions/Obsidian%20Second%20Brain%20Setup.md)

---

## 🔗 Связанные разделы

- [demo-AI — демо-проекты AI-агентов](../demo-AI/README.md) — практические кейсы
- [Project-Obscene — анализ нецензурной лексики](../Project-Obscene/README.md) — сравнение моделей
- [Instructions — настройка MCP, Obsidian](../Instructions/README.md) — инфраструктура для агентов
- [Гайд MCP — Context7 для AI](../Instructions/Гайд%20MCP.md) — MCP-серверы Kilo Code

## 📚 Ресурсы

1. [DeepSeek Platform](https://platform.deepseek.com/)
2. [Kilo Code Documentation](https://kilocode.dev/)
3. [DeepSeek Reasoning Models](https://platform.deepseek.com/docs/reasoning)

---

## 📬 Контакты

- **Автор:** Михаил Прасолов
- **Telegram:** [@MikhailPrasolov](https://t.me/MikhailPrasolov)
- **Канал:** [t.me/systemananalytics](https://t.me/systemananalytics)

---

*Последнее обновление: Июнь 2026*
