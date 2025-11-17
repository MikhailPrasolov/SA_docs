import { proxyActivities, sleep, defineSignal, setHandler, condition } from '@temporalio/workflow';
import type * as activities from '../activities/order-activities';
import { Order, OrderResult, OrderStatus } from '../types/order';

// Подключение activity функций
const {
  checkInventory,
  processPayment,
  prepareOrderForShipment,
  shipOrder,
  notifyCustomer,
  cancelOrder
} = proxyActivities<typeof activities>({
  startToCloseTimeout: '30 seconds',
  retry: {
    maximumAttempts: 3
  }
});

// Сигналы для взаимодействия с workflow
export const cancelOrderSignal = defineSignal<[string]>('cancelOrder');

/**
 * Workflow процесса обработки заказа
 * Демонстрирует долгоживущий бизнес-процесс с Temporal
 */
export async function orderWorkflow(order: Order): Promise<OrderResult> {
  let currentStatus: OrderStatus = 'CREATED';
  let cancellationReason: string | undefined;
  
  // Обработчик сигнала отмены заказа
  setHandler(cancelOrderSignal, (reason: string) => {
    cancellationReason = reason;
  });

  const result: OrderResult = {
    orderId: order.orderId,
    status: currentStatus,
    message: 'Заказ создан'
  };

  try {
    // Шаг 1: Проверка запасов
    console.log(`[Workflow] Проверка запасов для заказа ${order.orderId}`);
    const inventoryResult = await checkInventory(order.items);
    
    if (!inventoryResult.available) {
      currentStatus = 'CANCELLED';
      result.status = currentStatus;
      result.message = `Товары недоступны: ${inventoryResult.unavailableItems.join(', ')}`;
      
      await notifyCustomer(
        order.customer.email,
        `Ваш заказ ${order.orderId} отменен: ${result.message}`,
        order.orderId
      );
      
      return result;
    }
    
    currentStatus = 'INVENTORY_CHECKED';
    result.status = currentStatus;
    result.message = 'Запасы проверены, товары доступны';
    console.log(`[Workflow] ${result.message}`);

    // Проверка на отмену после каждого шага
    if (cancellationReason) {
      return await handleCancellation(order, cancellationReason, result);
    }

    // Шаг 2: Обработка платежа
    console.log(`[Workflow] Обработка платежа для заказа ${order.orderId}`);
    const paymentResult = await processPayment(order.payment, order.totalAmount);
    
    if (!paymentResult.success) {
      currentStatus = 'CANCELLED';
      result.status = currentStatus;
      result.message = `Ошибка обработки платежа: ${paymentResult.error}`;
      
      await notifyCustomer(
        order.customer.email,
        `Ваш заказ ${order.orderId} отменен: ${result.message}`,
        order.orderId
      );
      
      return result;
    }
    
    currentStatus = 'PAYMENT_PROCESSED';
    result.status = currentStatus;
    result.message = `Платеж успешно обработан. Транзакция: ${paymentResult.transactionId}`;
    console.log(`[Workflow] ${result.message}`);

    if (cancellationReason) {
      return await handleCancellation(order, cancellationReason, result);
    }

    // Шаг 3: Подготовка к отправке
    console.log(`[Workflow] Подготовка заказа ${order.orderId} к отправке`);
    const preparationResult = await prepareOrderForShipment(order.orderId, order.items);
    
    if (!preparationResult.ready) {
      currentStatus = 'CANCELLED';
      result.status = currentStatus;
      result.message = 'Ошибка подготовки заказа к отправке';
      
      await notifyCustomer(
        order.customer.email,
        `Ваш заказ ${order.orderId} отменен: ${result.message}`,
        order.orderId
      );
      
      return result;
    }
    
    currentStatus = 'PREPARING_FOR_SHIPMENT';
    result.status = currentStatus;
    result.message = `Заказ подготовлен к отправке. ID упаковки: ${preparationResult.packageId}`;
    console.log(`[Workflow] ${result.message}`);

    if (cancellationReason) {
      return await handleCancellation(order, cancellationReason, result);
    }

    // Шаг 4: Отправка заказа
    console.log(`[Workflow] Отправка заказа ${order.orderId}`);
    const shippingResult = await shipOrder(order.orderId, preparationResult.packageId!, order.customer.address);
    
    if (!shippingResult.shipped) {
      currentStatus = 'CANCELLED';
      result.status = currentStatus;
      result.message = 'Ошибка отправки заказа';
      
      await notifyCustomer(
        order.customer.email,
        `Ваш заказ ${order.orderId} отменен: ${result.message}`,
        order.orderId
      );
      
      return result;
    }
    
    currentStatus = 'SHIPPED';
    result.status = currentStatus;
    result.trackingNumber = shippingResult.trackingNumber;
    result.estimatedDelivery = shippingResult.estimatedDelivery;
    result.message = `Заказ отправлен. Трек-номер: ${shippingResult.trackingNumber}`;
    console.log(`[Workflow] ${result.message}`);

    // Шаг 5: Уведомление клиента об отправке
    const deliveryDate = shippingResult.estimatedDelivery ?
      new Date(shippingResult.estimatedDelivery).toLocaleDateString('ru-RU') :
      'не указана';
    
    await notifyCustomer(
      order.customer.email,
      `Ваш заказ ${order.orderId} отправлен! Трек-номер: ${shippingResult.trackingNumber}. Ожидаемая доставка: ${deliveryDate}`,
      order.orderId
    );

    // Имитация процесса доставки (можно заменить на реальные activity)
    console.log(`[Workflow] Ожидание доставки заказа ${order.orderId}`);
    await sleep('1 minute'); // В реальной системе это могло бы быть ожидание события доставки
    
    currentStatus = 'DELIVERED';
    result.status = currentStatus;
    result.message = 'Заказ доставлен';
    console.log(`[Workflow] ${result.message}`);

    // Финальное уведомление клиента
    await notifyCustomer(
      order.customer.email,
      `Ваш заказ ${order.orderId} доставлен! Спасибо за покупку.`,
      order.orderId
    );

    return result;

  } catch (error) {
    console.error(`[Workflow] Ошибка в workflow заказа ${order.orderId}:`, error);
    
    currentStatus = 'CANCELLED';
    result.status = currentStatus;
    result.message = `Системная ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`;
    
    // Уведомление клиента об ошибке
    await notifyCustomer(
      order.customer.email,
      `Произошла ошибка при обработке вашего заказа ${order.orderId}. Мы свяжемся с вами для решения проблемы.`,
      order.orderId
    );
    
    return result;
  }
}

/**
 * Обработка отмены заказа
 */
async function handleCancellation(order: Order, reason: string, currentResult: OrderResult): Promise<OrderResult> {
  console.log(`[Workflow] Отмена заказа ${order.orderId}: ${reason}`);
  
  const cancellationResult = await cancelOrder(order.orderId, reason);
  
  currentResult.status = 'CANCELLED';
  currentResult.message = `Заказ отменен: ${reason}`;
  
  if (cancellationResult.refundAmount) {
    currentResult.message += `. Сумма возврата: ${cancellationResult.refundAmount.toFixed(2)}`;
  }
  
  await notifyCustomer(
    order.customer.email,
    `Ваш заказ ${order.orderId} отменен: ${reason}`,
    order.orderId
  );
  
  return currentResult;
}