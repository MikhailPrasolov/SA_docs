// Упрощенная демонстрация концепций Temporal для OMS
// Этот файл можно запустить после установки Node.js

console.log('🎬 ДЕМО КОНЦЕПЦИЙ TEMPORAL ДЛЯ OMS');
console.log('='.repeat(50));

// Имитация Workflow процесса заказа
class OrderWorkflow {
  constructor(order) {
    this.order = order;
    this.status = 'CREATED';
    this.history = [];
  }

  async execute() {
    console.log(`\n📦 Запуск обработки заказа: ${this.order.id}`);
    
    try {
      // Шаг 1: Проверка запасов
      this.status = 'INVENTORY_CHECKED';
      this.history.push('Проверка запасов завершена');
      console.log('✅ Проверка запасов: Товары доступны');
      
      await this.delay(1000);

      // Шаг 2: Обработка платежа
      this.status = 'PAYMENT_PROCESSED';
      this.history.push('Платеж обработан успешно');
      console.log('✅ Обработка платежа: Успешно');
      
      await this.delay(1500);

      // Шаг 3: Подготовка к отправке
      this.status = 'PREPARING_FOR_SHIPMENT';
      this.history.push('Заказ подготовлен к отправке');
      console.log('✅ Подготовка к отправке: Заказ упакован');
      
      await this.delay(1000);

      // Шаг 4: Отправка заказа
      this.status = 'SHIPPED';
      this.history.push('Заказ отправлен');
      console.log('✅ Отправка заказа: Трек-номер TRK123456789');
      
      await this.delay(2000);

      // Шаг 5: Доставка
      this.status = 'DELIVERED';
      this.history.push('Заказ доставлен');
      console.log('✅ Доставка заказа: Заказ получен клиентом');

      return {
        success: true,
        orderId: this.order.id,
        status: this.status,
        trackingNumber: 'TRK123456789',
        history: this.history
      };

    } catch (error) {
      console.error('❌ Ошибка в workflow:', error);
      return {
        success: false,
        orderId: this.order.id,
        status: 'CANCELLED',
        error: error.message
      };
    }
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  cancel(reason) {
    this.status = 'CANCELLED';
    this.history.push(`Заказ отменен: ${reason}`);
    console.log(`🛑 Отмена заказа: ${reason}`);
  }
}

// Имитация Activity функций
class OrderActivities {
  static async checkInventory(items) {
    console.log('🔍 Проверка запасов...');
    await new Promise(resolve => setTimeout(resolve, 500));
    return { available: true, unavailableItems: [] };
  }

  static async processPayment(paymentInfo, amount) {
    console.log('💳 Обработка платежа...');
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, transactionId: 'TXN_' + Date.now() };
  }

  static async prepareForShipment(orderId, items) {
    console.log('📦 Подготовка к отправке...');
    await new Promise(resolve => setTimeout(resolve, 600));
    return { ready: true, packageId: 'PKG_' + orderId };
  }

  static async shipOrder(orderId, packageId, address) {
    console.log('🚚 Отправка заказа...');
    await new Promise(resolve => setTimeout(resolve, 700));
    return { 
      shipped: true, 
      trackingNumber: 'TRK_' + Math.random().toString(36).substr(2, 9).toUpperCase()
    };
  }
}

// Демонстрация
async function runDemo() {
  console.log('\n🎯 ДЕМО 1: Успешная обработка заказа');
  console.log('-'.repeat(40));
  
  const order1 = {
    id: 'ORD_001',
    customer: { name: 'Иван Петров', email: 'ivan@example.com' },
    items: [
      { product: 'Смартфон', quantity: 1, price: 50000 },
      { product: 'Чехол', quantity: 1, price: 2000 }
    ],
    totalAmount: 52000
  };

  const workflow1 = new OrderWorkflow(order1);
  const result1 = await workflow1.execute();
  
  console.log('\n📊 Результат заказа 1:');
  console.log(JSON.stringify(result1, null, 2));

  console.log('\n🎯 ДЕМО 2: Отмена заказа в процессе');
  console.log('-'.repeat(40));
  
  const order2 = {
    id: 'ORD_002', 
    customer: { name: 'Мария Сидорова', email: 'maria@example.com' },
    items: [{ product: 'Ноутбук', quantity: 1, price: 80000 }],
    totalAmount: 80000
  };

  const workflow2 = new OrderWorkflow(order2);
  
  // Запускаем workflow и через некоторое время отменяем
  const workflowPromise = workflow2.execute();
  
  // Имитируем отмену через 2 секунды
  setTimeout(() => {
    workflow2.cancel('Клиент передумал');
  }, 2000);

  const result2 = await workflowPromise;
  
  console.log('\n📊 Результат заказа 2:');
  console.log(JSON.stringify(result2, null, 2));

  console.log('\n🎯 ДЕМО 3: Activity функции');
  console.log('-'.repeat(40));
  
  // Демонстрация отдельных activity
  const inventoryResult = await OrderActivities.checkInventory([]);
  console.log('Результат проверки запасов:', inventoryResult);
  
  const paymentResult = await OrderActivities.processPayment({}, 1000);
  console.log('Результат обработки платежа:', paymentResult);

  console.log('\n' + '='.repeat(50));
  console.log('🎉 ДЕМО ЗАВЕРШЕНО!');
  console.log('='.repeat(50));
  
  console.log('\n💡 Ключевые концепции Temporal:');
  console.log('1. Workflow - долгоживущий бизнес-процесс (обработка заказа)');
  console.log('2. Activity - отдельные бизнес-операции (проверка запасов, платеж)');
  console.log('3. Надежность - продолжение после сбоев');
  console.log('4. Отслеживаемость - полная история выполнения');
  console.log('5. Гибкость - легко добавлять новые этапы');
  
  console.log('\n📚 Для полной демонстрации с Temporal сервером:');
  console.log('1. Установите Node.js с https://nodejs.org/');
  console.log('2. Запустите: cd SA_docs/temporal && npm install');
  console.log('3. Запустите Temporal: docker-compose up -d');
  console.log('4. Запустите worker: npm run worker');
  console.log('5. Запустите клиент: npm run client');
}

// Запуск демо
runDemo().catch(console.error);