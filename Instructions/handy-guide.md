# Handy — локальная транскрипция речи в текст (Tauri-приложение)

**Handy** — десктопное приложение для транскрипции речи в текст. Работает полностью офлайн, висит в трее и активируется горячей клавишей. Использует Whisper + Silero VAD.

- **Репозиторий (исходный код):** https://github.com/cjpais/Handy
- **Сборка:** Rust + Bun + Tauri 2.x
- **Установить Git (если ещё нет):** `winget install Git.Git`

### Клонирование репозитория

```powershell
cd C:\Users\<username>\Desktop\GIT
git clone https://github.com/cjpais/Handy.git
cd Handy
```

После клонирования — выполнить настройку окружения (ниже) и сборку.

---

## ✅ Если всё уже настроено (быстрый запуск)

Просто открыть **новый PowerShell** и выполнить:

```powershell
Set-Location C:\Users\<username>\Desktop\GIT\Handy; bun run tauri dev
```

> Если `cargo` не найден — сначала подгрузить PATH одной командой:
> `$env:Path = "$env:Path;$env:USERPROFILE\.cargo\bin"`

---

## ⚙️ Сборка из исходников (Windows)

### Предварительная настройка системы

Перед первой сборкой необходимо установить компоненты в указанном порядке:

1. **Git** — `winget install Git.Git` (перезагрузить PowerShell)
2. **Rust** — скачать и запустить `rustup-init.exe` с [rustup.rs](https://rustup.rs/), выбрать stable
3. **Bun** — `npm install -g bun` (если Node.js уже есть) или `winget install OpenJS.Bun`
4. **Node.js** — `winget install OpenJS.NodeJS` или с nodejs.org
5. **MSVC Build Tools 2022** — [visualstudio.microsoft.com](https://visualstudio.microsoft.com/visual-cpp-build-tools/), при установке выбрать **"Desktop development with C++"** + **Windows 10/11 SDK**
6. **LLVM/Clang** — `winget install LLVM.LLVM` (нужен для bindgen)
7. **CMake** — `winget install Kitware.CMake`
8. **Vulkan SDK** (опционально, для GPU) — [vulkan.lunarg.com](https://vulkan.lunarg.com/) (если GitHub доступен)

### Предварительные требования

| Компонент | Где взять | Проверка |
|-----------|-----------|----------|
| **Rust** (stable) | `rustup-init.exe` с rustup.rs | `rustc --version && cargo --version` |
| **Bun** | `npm install -g bun` | `bun --version` |
| **Node.js** | nodejs.org | `node --version` |
| **MSVC Build Tools 2022** | visualstudio.microsoft.com | `cl.exe` |
| **Windows SDK 10+** | Вместе с MSVC Build Tools | — |
| **LLVM/Clang** (для bindgen) | `winget install LLVM.LLVM` | `clang --version` |
| **CMake** (для whisper.cpp) | `winget install Kitware.CMake` | `cmake --version` |
| **Vulkan SDK 1.4+** (опционально) | vulkan.lunarg.com | `vulkaninfo` |

### Настройка окружения (каждый новый сеанс PowerShell)

```powershell
$env:Path = "$env:Path;C:\Users\<username>\.rustup\toolchains\stable-x86_64-pc-windows-msvc\bin"
$env:Path = "$env:Path;C:\Users\<username>\.cargo\bin"
$env:Path = "$env:Path;C:\Program Files\Microsoft Visual Studio\2022\BuildTools\VC\Tools\Llvm\x64\bin"
$env:Path = "$env:Path;C:\Program Files\CMake\bin"
$env:LIBCLANG_PATH = "C:\Program Files\LLVM\bin"
$env:VULKAN_SDK = "C:\VulkanSDK\1.4.341.1"
$env:WEBKIT_DISABLE_COMPOSITING_MODE = "1"
```

### Установка зависимостей и сборка

```powershell
cd C:\Users\<username>\Desktop\GIT\Handy
bun install                   # Установка npm-зависимостей
bun run tauri dev             # Режим разработки (сборка + запуск)
bun run tauri build           # Production-сборка в src-tauri/target/release/
```

### Быстрый запуск (одна строка)

Скопировать и выполнить в любом PowerShell:

```powershell
$env:Path = "$env:Path;C:\Users\<username>\.cargo\bin;C:\Program Files\CMake\bin"; $env:LIBCLANG_PATH = "C:\Program Files\LLVM\bin"; $env:VULKAN_SDK = "C:\VulkanSDK\1.4.341.1"; $env:WEBKIT_DISABLE_COMPOSITING_MODE = "1"; Set-Location C:\Users\<username>\Desktop\GIT\Handy; bun run tauri dev
```

### Варианты бэкенда

В `Cargo.toml` строка 91 выбирается тип Whisper-бэкенда:

| Фича | Когда использовать | Минусы |
|------|-------------------|--------|
| `whisper-vulkan` | Есть Vulkan SDK, быстрый GPU | Требует доступ к GitHub (скачивает шейдеры через CMake) |
| `whisper-cpp` | Нет доступа к GitHub / нет Vulkan-SDK | Чистый CPU, медленнее |

Если GitHub недоступен — отключить `whisper-vulkan`, включить `whisper-cpp`:

```toml
transcribe-rs = { version = "0.3.3", features = ["whisper-cpp", "ort-directml"] }
```

---

## 🧠 Модели

На компьютере установлены две модели для разных сценариев:

### Модель для Handy (микрофон)

| Параметр | Значение |
|----------|----------|
| **Файл** | `ggml-large-v3-q5_0.bin` (~3 GB) |
| **Формат** | GGML (whisper.cpp) |
| **Путь** | `C:\Users\<username>\AppData\Roaming\com.pais.handy\models\ggml-large-v3-q5_0.bin` |
| **Источник** | https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-large-v3-q5_0.bin |
| **Назначение** | Транскрипция с микрофона через горячую клавишу |
| **Бэкенд** | `whisper-cpp` (CPU), Vulkan отключён |

### Модель для скрипта (файлы)

| Параметр | Значение |
|----------|----------|
| **Модель** | `Systran/faster-whisper-large-v3` (~3 GB) |
| **Формат** | CTranslate2 |
| **Путь** | `C:\Users\<username>\.cache\huggingface\hub\models--Systran--faster-whisper-large-v3` |
| **Источник** | Hugging Face (авто-скачивание через `faster-whisper`) |
| **Назначение** | Транскрипция видео/аудиофайлов через PowerShell |
| **Бэкенд** | CPU, compute_type=`int8` |

> ⚠️ Форматы **не взаимозаменяемы**: Handy использует GGML, скрипт — CTranslate2.

---

## 🚀 Первый запуск

1. После сборки `bun run tauri dev` откроется окно приложения
2. При первом запуске Handy попытается скачать модель **parakeet-tdt-0.6b-v3** (~2 GB) с `https://blob.handy.computer/`
3. Если `blob.handy.computer` недоступен — скачать `ggml-large-v3-q5_0.bin` вручную с Hugging Face и положить в папку моделей (см. раздел "Модели")
4. После загрузки модели приложение готово к работе — иконка в трее

---

## 🎤 Использование

### Базовый сценарий

## 🎤 Использование

### Базовый сценарий

1. Открыть любое приложение, куда нужно ввести текст (блокнот, браузер, Telegram, VS Code)
2. Нажать горячую клавишу (по умолчанию — `Alt+Shift+R`) — начнётся запись с микрофона
3. Говорить в микрофон
4. Повторно нажать горячую клавишу — запись остановится, текст распознается и автоматически вставится в активное окно

### Горячие клавиши

| Действие | Клавиша |
|----------|---------|
| Начать/остановить запись | `Alt+Shift+R` |
| Открыть настройки | Через иконку в трее → настройки |

### Режимы работы

- **Push-to-Talk** — удерживать клавишу во время записи, отпустить — транскрибация
- **Toggle** — нажать для старта, нажать ещё раз для остановки

Настраивается в настройках приложения.

---

## ⚙️ Настройки

Открываются через иконку в трее (правый клик) → *Settings*.

Основные параметры:

| Параметр | Описание |
|----------|----------|
| **Microphone** | Выбор устройства ввода |
| **Output Device** | Вывод звука (для feedback-сигнала) |
| **Transcription Model** | Загруженная модель Whisper/Parakeet |
| **Language** | Язык распознавания (или auto) |
| **Shortcut** | Горячая клавиша (изменяется кликом и нажатием новой комбинации) |
| **Post-processing** | Автоматическая вставка текста + нажатие Enter |
| **Audio Feedback** | Звуковой сигнал начала/конца записи |

---

## 🔧 CLI-флаги

```powershell
handy.exe --start-hidden          # Запуск свёрнутым в трей
handy.exe --debug                 # Режим отладки (логи Trace)
handy.exe --no-tray               # Без иконки в трее (закрытие окна = выход)
handy.exe --toggle-transcription  # Переключить запись на уже запущенном экземпляре
```

---

## ❗ Частые проблемы

**Сборка падает на `whisper-rs-sys` / Vulkan / CMake**
→ Проверить, установлен ли CMake (`cmake --version`)
→ Если GitHub недоступен — переключить `whisper-vulkan` на `whisper-cpp` в `Cargo.toml`
→ Очистить кэш сборки: удалить `src-tauri/target/`

**Ошибка "Unable to find libclang"**
→ Проверить `$env:LIBCLANG_PATH = "C:\Program Files\LLVM\bin"`

**Программа не запускается (не та иконка в трее)**
→ Проверить `$env:WEBKIT_DISABLE_COMPOSITING_MODE = "1"`

**Модель не скачивается**
→ Убедиться, что `https://blob.handy.computer` доступен
→ Можно вручную скачать модель и положить в `src-tauri/resources/models/`

**Транскрипция не вставляется в активное окно**
→ Проверить права приложения
→ Windows: убедиться, что Handy не заблокирован антивирусом

**Низкое качество распознавания русского языка**
→ Попробовать другую модель (Large — лучше)
→ Убедиться, что микрофон настроен правильно
→ Говорить чётко, без фонового шума

---

## 🔧 Внесённые изменения в исходный код Handy

### 1. Вывод по строкам (segment-per-line)

**Файл:** `src-tauri/src/managers/transcription.rs`

Вместо сплошного текста из `result.text` теперь каждый речевой сегмент выводится на отдельной строке.

```rust
// segments.iter().map(...).join("\n")
```

### 2. Сохранение TXT-расшифровок

**Файл:** `src-tauri/src/actions.rs`

Рядом с каждым WAV-файлом автоматически сохраняется TXT-файл с расшифровкой:

```
recordings/
├── handy-1718000000.wav     # аудиозапись
└── handy-1718000000.txt     # расшифровка (один сегмент на строку)
```

---

## 📁 Структура файлов

| Путь | Назначение |
|------|------------|
| `%APPDATA%\com.pais.handy\recordings\` | WAV-записи + TXT-расшифровки |
| `%APPDATA%\com.pais.handy\history.db` | История транскрипций (SQLite) |
| `Handy\src-tauri\resources\models\` | Папка с моделями (VAD, Whisper) |
| `Handy\src-tauri\target\` | Результаты сборки |
| `scripts\` | Скрипты транскрипции файлов |

---

## 📜 Скрипты транскрипции файлов

| Скрипт | Назначение |
|--------|------------|
| `transcribe_video.ps1` / `.bat` | Расшифровать один файл |
| `transcribe_test.ps1` / `.bat` | Сравнить несколько моделей на одном файле |

Подробнее: [transcribe-video-script.md](./transcribe-video-script.md), [transcribe-test-models.md](./transcribe-test-models.md)

---

## 📝 Результаты тестов моделей

Вывод: **faster-whisper large-v3** лучше для игрового/разговорного русского контента (правильные имена, пунктуация). GigaAM чуть хуже (нет пунктуации, путает имена).

---

## 🚀 Быстрый запуск после сборки

```powershell
# Быстрая пересборка (если код уже менялся)
cd Handy
cargo build --manifest-path src-tauri\Cargo.toml

# Или через Tauri (дольше, пересобирает и фронтенд)
cd Handy
bun run tauri dev
```

---

*Создано: 2026-05-03 | Обновлено: 2026-06-20*
