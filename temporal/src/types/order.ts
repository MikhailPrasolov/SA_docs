// Типы данных для системы управления заказами

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface CustomerInfo {
  customerId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface PaymentInfo {
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  paymentAmount: number;
}

export interface Order {
  orderId: string;
  customer: CustomerInfo;
  items: OrderItem[];
  payment: PaymentInfo;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  totalAmount: number;
}

export type OrderStatus = 
  | 'CREATED'
  | 'INVENTORY_CHECKED'
  | 'PAYMENT_PROCESSED'
  | 'PREPARING_FOR_SHIPMENT'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderResult {
  orderId: string;
  status: OrderStatus;
  message: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
}