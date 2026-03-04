export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'card' | 'upi' | 'cod' | 'wallet';
  shippingAddress: ShippingAddress;
  orderDate: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  notes?: string;
}

export interface OrderItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  category: string;
}

export interface ShippingAddress {
  address: string;
  city: string;
  country:string;
  postalCode: string;
  phone: string;
}

export type OrderStatus = Order['status'];
export type PaymentStatus = Order['paymentStatus'];