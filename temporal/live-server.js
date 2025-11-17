const WebSocket = require('ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Создаем HTTP сервер для обслуживания HTML
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'live-demo.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading live-demo.html');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

// Создаем WebSocket сервер
const wss = new WebSocket.Server({ server });

// Хранилище подключенных клиентов
const clients = new Set();
let temporalProcess = null;

// Функция для отправки сообщений всем клиентам
function broadcast(message) {
    const data = JSON.stringify(message);
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}

// Функция для запуска Temporal клиента
function startTemporalClient() {
    console.log('🚀 Запуск Temporal клиента...');
    
    // Запускаем клиент через ts-node (решение для TypeScript)
    temporalProcess = spawn('npx', ['ts-node', 'src/client/order-client.ts'], {
        cwd: __dirname,
        stdio: ['pipe', 'pipe', 'pipe'],
        shell: true  // Добавляем shell для Windows совместимости
    });

    // Обработка вывода клиента
    temporalProcess.stdout.on('data', (data) => {
        const output = data.toString();
        console.log('Temporal Client:', output);
        
        // Парсим вывод и отправляем события в WebSocket
        parseTemporalOutput(output);
    });

    temporalProcess.stderr.on('data', (data) => {
        const error = data.toString();
        console.error('Temporal Client Error:', error);
        broadcast({
            type: 'error',
            message: error,
            timestamp: new Date().toISOString()
        });
    });

    temporalProcess.on('close', (code) => {
        console.log(`Temporal Client завершил работу с кодом: ${code}`);
        broadcast({
            type: 'status',
            status: 'COMPLETED',
            message: 'Workflow завершен',
            timestamp: new Date().toISOString()
        });
        temporalProcess = null;
    });
}

// Функция для парсинга вывода Temporal клиента
function parseTemporalOutput(output) {
    const lines = output.split('\n');
    
    lines.forEach(line => {
        line = line.trim();
        if (!line) return;

        // Определяем тип события по содержанию
        if (line.includes('Запуск нового workflow')) {
            broadcast({
                type: 'workflow_started',
                message: line,
                timestamp: new Date().toISOString()
            });
        } else if (line.includes('Workflow запущен')) {
            const workflowMatch = line.match(/workflowId: '([^']+)'/);
            if (workflowMatch) {
                broadcast({
                    type: 'workflow_created',
                    workflowId: workflowMatch[1],
                    message: line,
                    timestamp: new Date().toISOString()
                });
            }
        } else if (line.includes('Workflow завершен')) {
            broadcast({
                type: 'workflow_completed',
                message: line,
                timestamp: new Date().toISOString()
            });
        } else if (line.includes('Отмена workflow')) {
            broadcast({
                type: 'workflow_cancelled',
                message: line,
                timestamp: new Date().toISOString()
            });
        } else if (line.includes('Проверка запасов')) {
            broadcast({
                type: 'activity_started',
                activity: 'checkInventory',
                message: line,
                timestamp: new Date().toISOString()
            });
        } else if (line.includes('Обработка платежа')) {
            broadcast({
                type: 'activity_started',
                activity: 'processPayment',
                message: line,
                timestamp: new Date().toISOString()
            });
        } else if (line.includes('Подготовка заказа')) {
            broadcast({
                type: 'activity_started',
                activity: 'prepareOrderForShipment',
                message: line,
                timestamp: new Date().toISOString()
            });
        } else if (line.includes('Отправка заказа')) {
            broadcast({
                type: 'activity_started',
                activity: 'shipOrder',
                message: line,
                timestamp: new Date().toISOString()
            });
        } else if (line.includes('Уведомление клиента')) {
            broadcast({
                type: 'activity_started',
                activity: 'notifyCustomer',
                message: line,
                timestamp: new Date().toISOString()
            });
        } else if (line.includes('✅') || line.includes('Успешно')) {
            broadcast({
                type: 'activity_completed',
                message: line,
                timestamp: new Date().toISOString()
            });
        } else if (line.includes('❌') || line.includes('Ошибка')) {
            broadcast({
                type: 'activity_failed',
                message: line,
                timestamp: new Date().toISOString()
            });
        } else {
            // Отправляем все остальные сообщения как логи
            broadcast({
                type: 'log',
                level: 'info',
                message: line,
                timestamp: new Date().toISOString()
            });
        }
    });
}

// Обработка WebSocket соединений
wss.on('connection', (ws) => {
    console.log('🔗 Новый WebSocket клиент подключен');
    clients.add(ws);

    // Отправляем приветственное сообщение
    ws.send(JSON.stringify({
        type: 'welcome',
        message: 'Подключение к Temporal Live Demo установлено',
        timestamp: new Date().toISOString()
    }));

    // Обработка сообщений от клиента
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            
            switch (data.type) {
                case 'start_workflow':
                    console.log('🔄 Получен запрос на запуск workflow');
                    startTemporalClient();
                    break;
                    
                case 'cancel_workflow':
                    console.log('🛑 Получен запрос на отмену workflow');
                    if (temporalProcess) {
                        // Отправляем сигнал отмены (в реальной системе это был бы сигнал Temporal)
                        broadcast({
                            type: 'cancellation_sent',
                            message: 'Сигнал отмены отправлен в workflow',
                            timestamp: new Date().toISOString()
                        });
                    }
                    break;
                    
                case 'clear_logs':
                    console.log('🗑️ Очистка логов');
                    broadcast({
                        type: 'logs_cleared',
                        message: 'Логи очищены',
                        timestamp: new Date().toISOString()
                    });
                    break;
            }
        } catch (error) {
            console.error('Ошибка обработки сообщения:', error);
        }
    });

    // Обработка отключения клиента
    ws.on('close', () => {
        console.log('🔌 WebSocket клиент отключен');
        clients.delete(ws);
    });

    ws.on('error', (error) => {
        console.error('WebSocket ошибка:', error);
        clients.delete(ws);
    });
});

// Запуск сервера
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🎯 Temporal Live Demo Server запущен`);
    console.log(`📊 WebSocket сервер: ws://localhost:${PORT}`);
    console.log(`🌐 Веб-интерфейс: http://localhost:${PORT}`);
    console.log(`⏳ Ожидание подключений...`);
});

// Обработка завершения процесса
process.on('SIGINT', () => {
    console.log('\n🛑 Остановка сервера...');
    
    if (temporalProcess) {
        temporalProcess.kill();
    }
    
    wss.close(() => {
        server.close(() => {
            console.log('✅ Сервер остановлен');
            process.exit(0);
        });
    });
});