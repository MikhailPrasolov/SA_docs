workspace "Интернет-магазин" "C4-модель интернет-магазина — учебный пример" {

    !identifiers hierarchical

    model {

        // === 1. PEOPLE (User Roles) ===
        customer = person "Клиент" "Покупатель товаров в интернет-магазине" {
            tags "Person"
        }

        admin = person "Администратор" "Управляет товарами, заказами, пользователями" {
            tags "Person"
        }

        // === 2. EXTERNAL SYSTEMS ===
        paymentGateway = softwareSystem "Платёжный шлюз" "Внешняя система обработки платежей (банк-эквайринг)" {
            tags "External"
        }

        emailService = softwareSystem "Email-сервис" "Отправка транзакционных писем (подтверждения, уведомления)" {
            tags "External"
        }

        smsService = softwareSystem "SMS-сервис" "Отправка SMS-уведомлений о статусе заказа" {
            tags "External"
        }

        // === 3. MAIN SOFTWARE SYSTEM ===
        eshop = softwareSystem "Интернет-магазин" "Продажа товаров онлайн: каталог, корзина, заказы, оплата" {

            tags "Core"

            // === 3.1 CONTAINERS ===
            webapp = container "Веб-приложение" "SPA-клиент для покупателей и админов" "React 18, TypeScript" {
                tags "Frontend"
            }

            mobileApp = container "Мобильное приложение" "iOS/Android приложение для покупателей" "React Native" {
                tags "Frontend"
            }

            apiGateway = container "API Gateway" "Единая точка входа, маршрутизация, авторизация, rate-limiting" "Kong / Spring Cloud Gateway" {
                tags "Middleware"
            }

            orderService = container "Сервис заказов" "CRUD заказов, статусная модель, Saga-координация" "Spring Boot, Java 17" {
                tags "Service"

                // === 3.2 COMPONENTS ===
                orderController = component "Order Controller" "REST-эндпоинты для заказов" "Spring REST"
                orderProcessor = component "Order Processor" "Бизнес-логика оформления заказа" "Spring Service"
                orderPublisher = component "Order Event Publisher" "Публикация событий заказа (order.created, order.paid)" "Spring Events + RabbitMQ"
                orderRepository = component "Order Repository" "Доступ к данным заказов" "Spring Data JPA"
            }

            catalogService = container "Сервис каталога" "Управление товарами, категориями, поиск" "Spring Boot, Java 17" {
                tags "Service"
            }

            paymentService = container "Сервис платежей" "Обработка платежей через внешний шлюз, статусы" "Spring Boot, Java 17" {
                tags "Service"
            }

            notificationService = container "Сервис уведомлений" "Email + SMS уведомления, шаблонизация" "Spring Boot, Java 17" {
                tags "Service"
            }

            inventoryService = container "Сервис склада" "Учёт товаров, резервирование, списание" "Spring Boot, Java 17" {
                tags "Service"
            }

            deliveryService = container "Сервис доставки" "Расчёт стоимости, сроки, отслеживание" "Spring Boot, Java 17" {
                tags "Service"
            }

            messageBroker = container "Message Broker" "Асинхронная шина событий между сервисами" "RabbitMQ" {
                tags "Infrastructure"
            }

            // === 3.3 DATABASES ===
            orderDb = container "База заказов" "Хранилище заказов, статусов, истории" "PostgreSQL 15" {
                tags "Database"
            }

            catalogDb = container "База каталога" "Товары, категории, цены, остатки" "PostgreSQL 15" {
                tags "Database"
            }

            paymentDb = container "База платежей" "Транзакции, чеки, статусы" "PostgreSQL 15" {
                tags "Database"
            }

            inventoryDb = container "База склада" "Остатки, резервы, движения" "PostgreSQL 15" {
                tags "Database"
            }
        }

        // ========== RELATIONSHIPS ==========

        // Users → Frontend
        customer -> webapp "Просматривает каталог, оформляет заказы" "HTTPS"
        customer -> mobileApp "Покупает через мобильное приложение" "HTTPS"
        admin -> webapp "Управляет товарами и заказами" "HTTPS"

        // Frontend → API Gateway
        webapp -> apiGateway "Все запросы через API Gateway" "HTTPS/REST"
        mobileApp -> apiGateway "Все запросы через API Gateway" "HTTPS/REST"

        // API Gateway → Services
        apiGateway -> orderService "Маршрутизация запросов заказов" "HTTPS/REST"
        apiGateway -> catalogService "Маршрутизация запросов каталога" "HTTPS/REST"
        apiGateway -> paymentService "Маршрутизация запросов платежей" "HTTPS/REST"
        apiGateway -> inventoryService "Маршрутизация запросов склада" "HTTPS/REST"
        apiGateway -> deliveryService "Маршрутизация запросов доставки" "HTTPS/REST"

        // Services → Message Broker (events)
        orderService -> messageBroker "Публикует: order.created, order.paid, order.cancelled" "AMQP"
        paymentService -> messageBroker "Публикует: payment.completed, payment.failed" "AMQP"
        inventoryService -> messageBroker "Публикует: stock.reserved, stock.insufficient" "AMQP"
        deliveryService -> messageBroker "Публикует: delivery.created, delivery.completed" "AMQP"

        // Message Broker → Subscribers
        messageBroker -> notificationService "Доставляет события для уведомлений" "AMQP"
        messageBroker -> inventoryService "Доставляет события заказов для резерва" "AMQP"
        messageBroker -> deliveryService "Доставляет события оплаты для запуска доставки" "AMQP"

        // Services → Databases
        orderService -> orderDb "Чтение/запись" "JDBC"
        catalogService -> catalogDb "Чтение/запись" "JDBC"
        paymentService -> paymentDb "Чтение/запись" "JDBC"
        inventoryService -> inventoryDb "Чтение/запись" "JDBC"

        // Internal → External
        paymentService -> paymentGateway "HTTP API"
        notificationService -> emailService "SMTP / HTTP API"
        notificationService -> smsService "HTTP API"

        // Component-level connections
        orderController -> orderProcessor "Делегирует обработку"
        orderProcessor -> orderRepository "CRUD заказов"
        orderProcessor -> orderPublisher "Публикует события"
        orderPublisher -> messageBroker "Отправляет события" "AMQP"
    }

    // ========== VIEWS ==========

    views {

        // Context view (Level 1)
        systemContext eshop "Context" "Контекстная диаграмма интернет-магазина" {
            include *
            autolayout lr
        }

        // Container view (Level 2)
        container eshop "Containers" "Диаграмма контейнеров интернет-магазина" {
            include *
            autolayout lr
        }

        // Component view (Level 3) — only for Order Service
        component orderService "Components-OrderService" "Компоненты сервиса заказов" {
            include *
            autolayout lr
        }

        // ========== STYLES ==========

        styles {
            element "Person" {
                shape person
                background #08427b
                color #ffffff
                stroke #052e56
            }

            element "Core" {
                background #1168bd
                color #ffffff
                stroke #0e4d89
            }

            element "External" {
                background #999999
                color #ffffff
                stroke #666666
            }

            element "Service" {
                background #438dd5
                color #ffffff
                stroke #2e6ba3
            }

            element "Frontend" {
                background #85bbf0
                color #000000
                stroke #5d8cc0
            }

            element "Middleware" {
                background #7b5ea7
                color #ffffff
                stroke #5a4280
            }

            element "Infrastructure" {
                background #f0ad4e
                color #000000
                stroke #c78c32
            }

            element "Database" {
                shape cylinder
                background #f4a582
                color #000000
                stroke #d4815a
            }

            element "Component" {
                shape roundedbox
                background #d4e6f1
                color #000000
                stroke #8bb8d3
            }

            relationship "Relationship" {
                thickness 2
                color #707070
                dashed false
                routing head_to_center
            }
        }

        theme default
    }
}
