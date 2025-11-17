import { Worker } from '@temporalio/worker';
import * as activities from '../activities/order-activities';
import { orderWorkflow } from '../workflows/order-workflow';

/**
 * Worker для выполнения workflow заказа
 * Worker подключается к Temporal серверу и выполняет workflow и activity
 */
async function run() {
  console.log('🚀 Запуск Temporal Worker для системы OMS...');

  try {
    // Создание worker с регистрацией workflow и activity
    const worker = await Worker.create({
      workflowsPath: require.resolve('../workflows/order-workflow'),
      activities,
      taskQueue: 'order-processing',
    });

    console.log('✅ Worker создан и готов к работе');
    console.log('📋 Зарегистрированные workflow: orderWorkflow');
    console.log('🔧 Зарегистрированные activities:', Object.keys(activities));
    console.log('⏳ Ожидание задач в очереди: order-processing...');

    // Запуск worker (блокирующий вызов)
    await worker.run();

  } catch (error) {
    console.error('❌ Ошибка при запуске worker:', error);
    process.exit(1);
  }
}

// Обработка graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Получен SIGINT, завершение worker...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Получен SIGTERM, завершение worker...');
  process.exit(0);
});

// Запуск worker
run().catch((error) => {
  console.error('❌ Непредвиденная ошибка:', error);
  process.exit(1);
});