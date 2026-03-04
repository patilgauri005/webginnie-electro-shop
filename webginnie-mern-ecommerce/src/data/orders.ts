import { Order } from '../types/order';

export const orders: Order[] = [
  {
    id: 'ORD-2024-001',
    customerId: '1',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+91 9876543210',
    items: [
      {
        id: 1,
        name: 'Zebronics Zeb-Rush Wired Gaming Headset',
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
        price: 1299,
        quantity: 1,
        category: 'Headphones'
      },
      {
        id: 2,
        name: 'Portronics Toad 23 Wireless Mouse',
        image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=500',
        price: 499,
        quantity: 2,
        category: 'Computer'
      }
    ],
    subtotal: 2297,
    deliveryFee: 0,
    total: 2297,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    shippingAddress: {
      fullName: 'John Doe',
      addressLine1: '123 Main Street',
      addressLine2: 'Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '+91 9876543210'
    },
    orderDate: '2024-01-15T10:30:00Z',
    estimatedDelivery: '2024-01-18T18:00:00Z',
    trackingNumber: 'TRK123456789',
    notes: 'Customer requested express delivery'
  },
  {
    id: 'ORD-2024-002',
    customerId: '2',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '+91 9876543211',
    items: [
      {
        id: 5,
        name: 'Apple iPhone 14 Pro Max',
        image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=500',
        price: 129900,
        quantity: 1,
        category: 'Phones'
      }
    ],
    subtotal: 129900,
    deliveryFee: 0,
    total: 129900,
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'upi',
    shippingAddress: {
      fullName: 'Jane Smith',
      addressLine1: '456 Park Avenue',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      phone: '+91 9876543211'
    },
    orderDate: '2024-01-16T14:20:00Z',
    estimatedDelivery: '2024-01-20T18:00:00Z',
    trackingNumber: 'TRK987654321'
  },
  {
    id: 'ORD-2024-003',
    customerId: '4',
    customerName: 'Mike Johnson',
    customerEmail: 'mike@example.com',
    customerPhone: '+91 9876543212',
    items: [
      {
        id: 6,
        name: 'Samsung Galaxy Watch 5',
        image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
        price: 24999,
        quantity: 1,
        category: 'SmartWatch'
      },
      {
        id: 3,
        name: 'Ambrane 20000mAh Powerbank',
        image: 'https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg?auto=compress&cs=tinysrgb&w=500',
        price: 1399,
        quantity: 1,
        category: 'Phones'
      }
    ],
    subtotal: 26398,
    deliveryFee: 0,
    total: 26398,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    shippingAddress: {
      fullName: 'Mike Johnson',
      addressLine1: '789 Tech Street',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      phone: '+91 9876543212'
    },
    orderDate: '2024-01-17T09:15:00Z',
    estimatedDelivery: '2024-01-22T18:00:00Z'
  },
  {
    id: 'ORD-2024-004',
    customerId: '5',
    customerName: 'Sarah Wilson',
    customerEmail: 'sarah@example.com',
    customerPhone: '+91 9876543213',
    items: [
      {
        id: 7,
        name: 'Sony WH-1000XM4 Headphones',
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
        price: 24990,
        quantity: 1,
        category: 'Headphones'
      }
    ],
    subtotal: 24990,
    deliveryFee: 0,
    total: 24990,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'cod',
    shippingAddress: {
      fullName: 'Sarah Wilson',
      addressLine1: '321 Music Lane',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600001',
      phone: '+91 9876543213'
    },
    orderDate: '2024-01-18T16:45:00Z',
    estimatedDelivery: '2024-01-23T18:00:00Z'
  },
  {
    id: 'ORD-2024-005',
    customerId: '1',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+91 9876543210',
    items: [
      {
        id: 8,
        name: 'Canon EOS R6 Mark II',
        image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500',
        price: 219999,
        quantity: 1,
        category: 'Camera'
      }
    ],
    subtotal: 219999,
    deliveryFee: 0,
    total: 219999,
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    shippingAddress: {
      fullName: 'John Doe',
      addressLine1: '123 Main Street',
      addressLine2: 'Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '+91 9876543210'
    },
    orderDate: '2024-01-19T11:30:00Z',
    estimatedDelivery: '2024-01-24T18:00:00Z'
  }
];