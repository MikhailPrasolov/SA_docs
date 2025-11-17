import { Connection, Client } from '@temporalio/client';
import { orderWorkflow, cancelOrderSignal } from '../workflows/order-workflow';
import { Order, OrderItem, CustomerInfo, PaymentInfo } from '../types/order';
import { nanoid } from 'nanoid';

/**
 * Клиент для запуска и управления workflow заказа
 * Демонстрирует как клиентское приложение взаимодействует с Temporal
 */

// Генерация тестовых данных
function createSampleOrder(): Order {
  const orderId = `ORD_${nanoid(8)}`;
  
  const customer: CustomerInfo = {
    customerId: `CUST_${nanoid(6)}`,
    name: 'Иван Петров',
    email: 'ivan.petrov@example.com',
    phone: '+7 (999) 123-45-67',
    address: 'г. Москва, ул. Примерная, д. 123, кв. 45'
  };

  const items: OrderItem[] = [
    {
      productId: 'PROD_001',
      productName: 'Смартфон Samsung Galaxy S23',
      quantity: 1,
      price: 79999
    },
    {
      productId: 'PROD_002',
      productName: 'Чехол для смартфона',
      quantity: 1,
      price: 1999
    },
    {
      productId: 'PROD_003',
      productName: 'Защитное стекло',
      quantity: 2,
      price: 899
    }
  ];

  const payment: PaymentInfo = {
    paymentMethod: 'credit_card',
    cardNumber: '**** **** **** 1234',
    expiryDate: '12/25',
    cvv: '***',
    paymentAmount: items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  };

  return {
    orderId,
    customer,
    items,
    payment,
    status: 'CREATED',
    createdAt: new Date(),
    updatedAt: new Date(),
    totalAmount: payment.paymentAmount
  };
}

/**
 * Запуск нового workflow заказа
 */
async function startOrderWorkflow() {
  console.log('🚀 Запуск нового workflow заказа...');

  try {
    // Подключение к Temporal серверу
    const connection = await Connection.connect({
      address: 'localhost:7233'
    });

    const client = new Client({
      connection,
      namespace: 'default'
    });

    // Создание тестового заказа
    const order = createSampleOrder();
    
    console.log('📦 Создан заказ:', {
      orderId: order.orderId,
      customer: order.customer.name,
      items: order.items.map(item => `${item.productName} x${item.quantity}`),
      totalAmount: order.totalAmount
    });

    // Запуск workflow
    const handle = await client.workflow.start(orderWorkflow, {
      taskQueue: 'order-processing',
      workflowId: `order-${order.orderId}`,
      args: [order]
    });

    console.log('✅ Workflow запущен:', {
      workflowId: handle.workflowId,
      runId: handle.firstExecutionRunId
    });

    // Получение результата workflow
    console.log('⏳ Ожидание завершения workflow...');
    const result = await handle.result();
    
    console.log('🎉 Workflow завершен:', {
      orderId: result.orderId,
      status: result.status,
      message: result.message,
      trackingNumber: result.trackingNumber,
      estimatedDelivery: result.estimatedDelivery
    });

    return { handle, result };

  } catch (error) {
    console.error('❌ Ошибка при запуске workflow:', error);
    throw error;
  }
}

/**
 * Отмена запущенного workflow
 */
async function cancelOrderWorkflow(workflowId: string, reason: string) {
  console.log(`🛑 Отмена workflow ${workflowId}...`);

  try {
    const connection = await Connection.connect({
      address: 'localhost:7233'
    });

    const client = new Client({
      connection,
      namespace: 'default'
    });

    const handle = client.workflow.getHandle(workflowId);
    
    // Отправка сигнала отмены
    await handle.signal(cancelOrderSignal, reason);
    
    console.log(`✅ Сигнал отмены отправлен в workflow ${workflowId}`);

  } catch (error) {
    console.error('❌ Ошибка при отмене workflow:', error);
    throw error;
  }
}

/**
 * Получение статуса workflow
 */
async function getWorkflowStatus(workflowId: string) {
  try {
    const connection = await Connection.connect({
      address: 'localhost:7233'
    });

    const client = new Client({
      connection,
      namespace: 'default'
    });

    const handle = client.workflow.getHandle(workflowId);
    const description = await handle.describe();
    
    console.log('📊 Статус workflow:', {
      workflowId: description.workflowId,
      status: description.status.name,
      startTime: description.startTime,
      closeTime: description.closeTime,
      executionTime: description.executionTime
    });

    return description;

  } catch (error) {
    console.error('❌ Ошибка при получении статуса workflow:', error);
    throw error;
  }
}

/**
 * Основная функция демо
 */
async function runDemo() {
  console.log('🎬 Запуск демо Temporal OMS...\n');

  // Демонстрация 1: Успешный заказ
  console.log('='.repeat(50));
  console.log('📦 ДЕМО 1: Успешная обработка заказа');
  console.log('='.repeat(50));
  
  const { handle: successfulOrderHandle } = await startOrderWorkflow();
  
  // Ждем немного перед следующим демо
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('\n' + '='.repeat(50));
  console.log('🛑 ДЕМО 2: Отмена заказа');
  console.log('='.repeat(50));
  
  // Демонстрация 2: Отмена заказа
  const cancelOrder = createSampleOrder();
  cancelOrder.orderId = `ORD_CANCEL_${nanoid(6)}`;
  
  const connection = await Connection.connect({ address: 'localhost:7233' });
  const client = new Client({ connection, namespace: 'default' });
  
  const cancelHandle = await client.workflow.start(orderWorkflow, {
    taskQueue: 'order-processing',
    workflowId: `order-${cancelOrder.orderId}`,
    args: [cancelOrder]
  });
  
  console.log(`✅ Workflow для отмены запущен: ${cancelHandle.workflowId}`);
  
  // Ждем немного и отменяем
  await new Promise(resolve => setTimeout(resolve, 3000));
  await cancelOrderWorkflow(cancelHandle.workflowId, 'Клиент передумал');
  
  // Получаем статус отмененного workflow
  await new Promise(resolve => setTimeout(resolve, 2000));
  await getWorkflowStatus(cancelHandle.workflowId);

  console.log('\n' + '='.repeat(50));
  console.log('🎉 ДЕМО ЗАВЕРШЕНО!');
  console.log('='.repeat(50));
  console.log('\n💡 Что произошло:');
  console.log('• Workflow успешно обработал заказ через все этапы');
  console.log('• Workflow был отменен по сигналу клиента');
  console.log('• Все изменения состояния сохраняются Temporal');
  console.log('• Worker продолжал бы работу даже после перезапуска');
}

// Запуск демо
runDemo().catch((error) => {
  console.error('❌ Ошибка в демо:', error);
  process.exit(1);
});