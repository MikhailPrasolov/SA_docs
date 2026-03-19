# 🤖 AI агенты — Материалы по AI/LLM

> Руководства и сравнения по использованию AI-агентов и LLM для задач системного анализа и разработки

## 📋 Содержание

1. [Описание материалов](#-описание-материалов)
2. [Файлы разделов](#-файлы-разделов)
3. [Использование с Kilo Code](#-использование-с-kilo-code)

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

## 📚 Ресурсы

1. [DeepSeek Platform](https://platform.deepseek.com/)
2. [Kilo Code Documentation](https://kilocode.dev/)
3. [DeepSeek Reasoning Models](https://platform.deepseek.com/docs/reasoning)

---

## 📬 Контакты

- 🔗 **Контакты автора**  
  • TG: [@MikhailPrasolov](https://t.me/MikhailPrasolov)  
  • Канал: [t.me/systemananalytics](https://t.me/systemananalytics)

> Если заметили ошибку или хотите дополнить материалы — смело открывайте Issue или присылайте Pull Request!

---

*Последнее обновление: Март 2026*
