# Концепции Temporal на примере OMS демо

## Что такое Temporal?

Temporal - это платформа для оркестрации workflow, которая обеспечивает надежное выполнение долгоживущих бизнес-процессов. В отличие от традиционных систем, Temporal гарантирует, что workflow продолжат выполнение даже после сбоев серверов или перезапусков приложений.

## Ключевые концепции

### 1. Workflow (Бизнес-процесс)

**Workflow** - это долгоживущий бизнес-процесс, который описывает последовательность шагов. В нашем демо это процесс обработки заказа.

**Пример из демо:**
```typescript
export async function orderWorkflow(order: Order): Promise<OrderResult> {
  // 1. Проверка запасов
  const inventoryResult = await checkInventory(order.items);
  
  // 2. Обработка платежа
  const paymentResult = await processPayment(order.payment, order.totalAmount);
  
  // 3. Подготовка к отправке
  const preparationResult = await prepareOrderForShipment(order.orderId, order.items);
  
  // 4. Отправка заказа
  const shippingResult = await shipOrder(order.orderId, preparationResult.packageId!, order.customer.address);
  
  // 5. Уведомление клиента
  await notifyCustomer(order.customer.email, message, order.orderId);
}
```

**Особенности Workflow:**
- Детерминированный код (нельзя использовать случайные функции, Date.now() и т.д.)
- Сохраняет состояние между перезапусками
- Может выполняться дни, недели или даже месяцы

### 2. Activity (Бизнес-операция)

**Activity** - это отдельная бизнес-операция, которая может содержать недетерминированный код (API вызовы, работа с БД, внешние сервисы).

**Пример из демо:**
```typescript
export async function processPayment(paymentInfo: PaymentInfo, amount: number) {
  // Имитация API вызова к платежному шлюзу
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Здесь может быть реальный вызов Stripe, PayPal и т.д.
  const success = Math.random() < 0.95;
  
  return { success, transactionId: `TXN_${Date.now()}` };
}
```

**Особенности Activity:**
- Могут содержать любой код (включая случайные функции, API вызовы)
- Имеют таймауты и политики повторных попыток
- Выполняются изолированно от workflow

### 3. Worker (Исполнитель)

**Worker** - это процесс, который подключается к Temporal серверу и выполняет workflow и activity.

**Пример из демо:**
```typescript
const worker = await Worker.create({
  workflowsPath: require.resolve('../workflows/order-workflow'),
  activities,
  taskQueue: 'order-processing',
});
```

**Особенности Worker:**
- Может быть масштабирован горизонтально
- Автоматически распределяет задачи
- Может быть перезапущен без потери состояния workflow

### 4. Client (Клиент)

**Client** - запускает workflow и взаимодействует с ними (отправка сигналов, запрос статуса).

**Пример из демо:**
```typescript
const handle = await client.workflow.start(orderWorkflow, {
  taskQueue: 'order-processing',
  workflowId: `order-${order.orderId}`,
  args: [order]
});
```

### 5. Signals (Сигналы)

**Signals** - способ взаимодействия с запущенным workflow извне.

**Пример из демо - отмена заказа:**
```typescript
// Определение сигнала
export const cancelOrderSignal = defineSignal<[string]>('cancelOrder');

// Обработчик в workflow
setHandler(cancelOrderSignal, (reason: string) => {
  cancellationReason = reason;
});

// Отправка сигнала из клиента
await handle.signal(cancelOrderSignal, 'Клиент передумал');
```

## Преимущества Temporal

### 1. Надежность
- Workflow продолжают выполнение после сбоев
- Состояние автоматически сохраняется
- Гарантированное выполнение до завершения

### 2. Отслеживаемость
- Полная история выполнения каждого workflow
- Визуализация в Temporal UI
- Легкая отладка проблем

### 3. Гибкость
- Легко изменять бизнес-логику
- Просто добавлять новые шаги
- Поддержка сложных сценариев (компенсирующие транзакции, саги)

### 4. Масштабируемость
- Горизонтальное масштабирование workers
- Распределенная архитектура
- Поддержка высоких нагрузок

## Как это работает в OMS демо

### Нормальный сценарий:
```
Client → Start Workflow → Worker → Activity → Activity → ... → Complete
```

### Сценарий с отменой:
```
Client → Start Workflow → Worker → Activity → Signal Cancel → Activity Cancel → Complete
```

### Сценарий со сбоем:
```
Client → Start Workflow → Worker Crash → Temporal сохраняет состояние → Новый Worker → Продолжает с места сбоя
```

## Практическое применение в OMS

### Бизнес-процессы, идеальные для Temporal:

1. **Обработка заказов** - как в нашем демо
2. **Управление подписками** - продление, отмена, изменения
3. **Обработка возвратов** - сложные процессы с проверками
4. **Интеграция с поставщиками** - асинхронные API вызовы
5. **Нотингификации** - последовательные уведомления клиентов

### Преимущества для OMS:

- **Снижение сложности** - вместо распределенных транзакций один workflow
- **Улучшенная наблюдаемость** - видим полный путь заказа
- **Отказоустойчивость** - заказы не теряются при сбоях
- **Гибкость** - легко добавлять новые этапы обработки

## Заключение

Temporal решает сложные проблемы оркестрации бизнес-процессов, предоставляя надежную платформу для долгоживущих операций. Демо OMS показывает, как Temporal может упростить сложные процессы управления заказами, обеспечивая при этом надежность и отслеживаемость.

Для глубокого изучения рекомендуется:
1. Поэкспериментировать с демо - изменять activity, добавлять новые шаги
2. Изучить Temporal UI для мониторинга выполнения
3. Прочитать официальную документацию Temporal
4. Попробовать реализовать собственные бизнес-процессы