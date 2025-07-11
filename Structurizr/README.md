
---

# Инструкция по работе с C4-диаграммами в формате `.dsl`

## 📁 1. Структура проекта

Рекомендуемая структура папки:

```
c4-diagrams/
├── people.dsl
├── systems.dsl
├── containers.dsl
├── components.dsl
├── views.dsl
└── workspace.dsl
```

Файл `workspace.dsl` подключает остальные с помощью `!include`.

## 🛠 2. Редактирование диаграмм в VS Code

1. Установите плагин **Structurizr DSL** (если нужен синтаксис).
2. Все `.dsl` файлы редактируются как обычный текст.
3. Структура DSL:

   * `workspace` — определение пространства.
   * `model` — сущности и связи.
   * `views` — визуальное представление.

Пример минимального DSL-файла:

```dsl
workspace {

    model {
        user = person "User"
        softwareSystem = softwareSystem "My System" {
            webapp = container "Web Application"
            database = container "Database"
        }
        user -> webapp "Uses"
        webapp -> database "Reads from and writes to"
    }

    views {
        systemContext softwareSystem {
            include *
            autolayout lr
        }
        container softwareSystem {
            include *
            autolayout lr
        }

        theme default
    }

}
```

## 🌐 3. Визуализация через Structurizr Online

> Structurizr DSL не визуализируется напрямую в VS Code, поэтому используем онлайн-редактор.

### Шаги:

1. Перейдите на сайт: [https://structurizr.com/dsl](https://structurizr.com/dsl)
2. Вставьте содержимое `.dsl` файла или `workspace.dsl`, если используете `!include`.
3. Нажмите **"Render"** или `Ctrl + Enter`.
4. Просматривайте и экспортируйте диаграммы (PNG/SVG/PDF).

### Альтернатива (опционально):

* Вы можете установить CLI [Structurizr CLI](https://github.com/structurizr/cli) для генерации изображений локально.

  ```bash
  structurizr.sh export -workspace workspace.dsl -format png
  ```

## 📌 4. Советы

* Используйте `!include` для модульности.
* Следите за форматами идентификаторов: `camelCase` или `snake_case`.
* Добавляйте `autolayout` для автоматического выравнивания.
* Проверяйте, что все используемые элементы определены в `model`.

---

## 🔗 Полезные ссылки

* 📘 Документация DSL: [https://github.com/structurizr/dsl](https://github.com/structurizr/dsl)
* 🛠 Онлайн редактор: [https://structurizr.com/dsl](https://structurizr.com/dsl)
* 💻 Structurizr CLI (для экспорта): [https://github.com/structurizr/cli](https://github.com/structurizr/cli)

---