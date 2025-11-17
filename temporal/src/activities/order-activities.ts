import { Context } from '@temporalio/activity';
import { Order, OrderItem, PaymentInfo, OrderStatus } from '../types/order';

/**
 * Activity функции для бизнес-процессов заказа
 * Каждая функция представляет отдельную бизнес-операцию
 */

/**
 * Проверка наличия товаров на складе
 */
export async function checkInventory(items: OrderItem[]): Promise<{ available: boolean; unavailableItems: string[] }> {
  const context = Context.current();
  
  console.log('Проверка запасов для товаров:', { items });
  
  // Имитация проверки запасов
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // В реальной системе здесь был бы запрос к системе инвентаризации
  const unavailableItems: string[] = [];
  
  // Простая логика проверки - случайно делаем некоторые товары недоступными
  for (const item of items) {
    if (Math.random() < 0.1) { // 10% шанс что товар недоступен
      unavailableItems.push(item.productName);
    }
  }
  
  const result = {
    available: unavailableItems.length === 0,
    unavailableItems
  };
  
  console.log('Результат проверки запасов:', result);
  
  return result;
}

/**
 * Обработка платежа
 */
export async function processPayment(paymentInfo: PaymentInfo, amount: number): Promise<{ success: boolean; transactionId?: string; error?: string }> {
  const context = Context.current();
  
  console.log('Обработка платежа:', { paymentInfo, amount });
  
  // Имитация обработки платежа
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // В реальной системе здесь был бы запрос к платежному шлюзу
  const success = Math.random() < 0.95; // 95% успешных платежей
  
  if (success) {
    const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log('Платеж успешно обработан', { transactionId });
    
    return {
      success: true,
      transactionId
    };
  } else {
    const error = 'Недостаточно средств на карте';
    console.warn('Ошибка обработки платежа:', { error });
    
    return {
      success: false,
      error
    };
  }
}

/**
 * Подготовка заказа к отправке
 */
export async function prepareOrderForShipment(orderId: string, items: OrderItem[]): Promise<{ ready: boolean; packageId?: string }> {
  const context = Context.current();
  
  console.log('Подготовка заказа к отправке:', { orderId, items });
  
  // Имитация процесса подготовки
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const packageId = `PKG_${orderId}_${Date.now()}`;
  
  console.log('Заказ подготовлен к отправке', { packageId });
  
  return {
    ready: true,
    packageId
  };
}

/**
 * Отправка заказа
 */
export async function shipOrder(orderId: string, packageId: string, address: string): Promise<{ shipped: boolean; trackingNumber?: string; estimatedDelivery?: Date }> {
  const context = Context.current();
  
  console.log('Отправка заказа:', { orderId, packageId, address });
  
  // Имитация процесса отправки
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const trackingNumber = `TRK_${Math.random().toString(36).substr(2, 12).toUpperCase()}`;
  const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // +3 дня
  
  console.log('Заказ отправлен', { trackingNumber, estimatedDelivery });
  
  return {
    shipped: true,
    trackingNumber,
    estimatedDelivery
  };
}

/**
 * Уведомление клиента
 */
export async function notifyCustomer(email: string, message: string, orderId: string): Promise<{ notified: boolean }> {
  const context = Context.current();
  
  console.log('Отправка уведомления клиенту:', { email, message, orderId });
  
  // Имитация отправки email/SMS
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log('Уведомление отправлено клиенту', { email });
  
  return {
    notified: true
  };
}

/**
 * Отмена заказа
 */
export async function cancelOrder(orderId: string, reason: string): Promise<{ cancelled: boolean; refundAmount?: number }> {
  const context = Context.current();
  
  console.log('Отмена заказа:', { orderId, reason });
  
  // Имитация процесса отмены
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // В реальной системе здесь был бы процесс возврата средств
  const refundAmount = Math.random() * 100 + 50; // Случайная сумма возврата
  
  console.log('Заказ отменен', { orderId, refundAmount });
  
  return {
    cancelled: true,
    refundAmount
  };
}