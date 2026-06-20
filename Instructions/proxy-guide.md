# Прокси (SOCKS5) — обход блокировок

SOCKS5-прокси на локальном порту **10880**. Используется для доступа к заблокированным сайтам (PyPI, GitHub, HuggingFace и др.).

---

## Запуск

```powershell
# Запустить прокси (путь к вашему скрипту)
.\start-proxy.ps1

# Проверить статус
.\start-proxy.ps1 -Status

# Принудительно перезапустить
.\start-proxy.ps1 -Force
```

Прокси слушает на **socks5://127.0.0.1:10880**.

---

## Использование

### pip (Python)

```powershell
$env:ALL_PROXY = "socks5://127.0.0.1:10880"
python -m pip install <package>
```

> Если pip ругается на SOCKS — скачайте PySocks вручную:
> ```powershell
> curl.exe -x socks5://127.0.0.1:10880 -s -L -o "$env:TEMP\PySocks.whl" "https://files.pythonhosted.org/..."
> python -m pip install "$env:TEMP\PySocks.whl"
> ```

### curl

```powershell
curl.exe -x socks5://127.0.0.1:10880 -L -o "file" "https://url"
```

### cargo

```powershell
$env:http_proxy = "socks5://127.0.0.1:10880"
$env:https_proxy = "socks5://127.0.0.1:10880"
cargo build
```

### git

```powershell
git config --global http.proxy socks5://127.0.0.1:10880
git config --global https.proxy socks5://127.0.0.1:10880
```

### Только для текущей сессии

```powershell
$env:ALL_PROXY = "socks5://127.0.0.1:10880"
```

---

## Остановка

```powershell
Stop-Process -Name xray -Force
# или
Stop-Process -Name your-proxy -Force
```

---

## Проверка

```powershell
curl.exe -x socks5://127.0.0.1:10880 -s -o nul -w "%{http_code}" "https://pypi.org"
```

`200` — работает.

---

## Примечание по безопасности

**ВАЖНО:** После использования через `$env:ALL_PROXY` обязательно очистите переменную:

```powershell
Remove-Item Env:\ALL_PROXY
```

Не оставляйте прокси-переменные активными — они могут нарушить работу корпоративных сервисов (Jira, Confluence, GitLab).

---

*Создано: 2026-06-20*
