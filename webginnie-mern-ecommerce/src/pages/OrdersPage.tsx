import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Order } from '../types/order';

export const OrdersPage: React.FC = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders/my', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  if (loading) {
    return <div className="p-8 text-center text-lg text-gray-600">Loading your orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600">
        <h1 className="text-2xl font-bold mb-2">No orders found</h1>
        <p>You haven’t placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="border border-gray-200 shadow-sm hover:shadow-md transition">
            <CardContent className="p-5 space-y-3">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Order ID: <span className="font-medium text-gray-800">{order.id}</span></div>
                  <div>Date: {new Date(order.orderDate).toLocaleString()}</div>
                </div>
                <Button variant="outline" onClick={() => setSelectedOrder(order)}>
                  View Details
                </Button>
              </div>

              <div className="flex flex-wrap justify-between gap-4 text-sm text-gray-700 pt-2 border-t mt-3 pt-3">
                <span>
                  Status:{' '}
                  <span className={`capitalize px-2 py-1 rounded text-xs font-medium text-white ${
                    order.status === 'delivered'
                      ? 'bg-green-600'
                      : order.status === 'processing'
                      ? 'bg-yellow-500'
                      : 'bg-gray-600'
                  }`}>
                    {order.status}
                  </span>
                </span>

                <span>
                  Payment:{' '}
                  <span className={`capitalize px-2 py-1 rounded text-xs font-medium text-white ${
                    order.paymentStatus === 'paid' ? 'bg-green-600' : 'bg-red-600'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </span>

                <span>Total: <strong>₹{order.total.toLocaleString()}</strong></span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <Dialog open={true} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-gray-900">Order Summary</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 text-sm text-gray-800">
              {/* Grid Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Info label="Order ID" value={selectedOrder.id} />
                <Info label="Date" value={new Date(selectedOrder.orderDate).toLocaleString()} />
                <Info
                  label="Customer"
                  value={
                    <>
                      {selectedOrder.customerName}<br />
                      {selectedOrder.customerEmail}<br />
                      {selectedOrder.customerPhone || '—'}
                    </>
                  }
                />
                <Info
                  label="Shipping Address"
                  value={
                    <>
                      {selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.city}<br />
                      {selectedOrder.shippingAddress.postalCode}, {selectedOrder.shippingAddress.country}
                    </>
                  }
                />
                <Info
                  label="Status"
                  value={
                    <span className={`capitalize px-2 py-1 rounded text-white text-xs font-medium ${
                      selectedOrder.status === 'delivered'
                        ? 'bg-green-600'
                        : selectedOrder.status === 'processing'
                        ? 'bg-yellow-500'
                        : 'bg-gray-600'
                    }`}>
                      {selectedOrder.status}
                    </span>
                  }
                />
                <Info
                  label="Payment"
                  value={
                    <>
                      <span className={`capitalize px-2 py-1 rounded text-white text-xs font-medium ${
                        selectedOrder.paymentStatus === 'paid' ? 'bg-green-600' : 'bg-red-600'
                      }`}>
                        {selectedOrder.paymentStatus}
                      </span>{' '}
                      ({selectedOrder.paymentMethod.toUpperCase()})
                    </>
                  }
                />
                {selectedOrder.trackingNumber && (
                  <Info label="Tracking Number" value={selectedOrder.trackingNumber} />
                )}
                {selectedOrder.estimatedDelivery && (
                  <Info label="Estimated Delivery" value={selectedOrder.estimatedDelivery} />
                )}
              </div>

              {/* Items List */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Items</h3>
                <ul className="divide-y rounded-lg border overflow-hidden">
                  {selectedOrder.items.map((item, i) => (
                    <li key={i} className="flex justify-between items-center p-3 bg-white hover:bg-gray-50">
                      <span>{item.name} × {item.quantity}</span>
                      <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Summary */}
              <div className="border-t pt-4 space-y-2">
                <SummaryRow label="Subtotal" value={`₹${selectedOrder.subtotal.toLocaleString()}`} />
                <SummaryRow
                  label="Delivery Fee"
                  value={
                    selectedOrder.deliveryFee === 0
                      ? <span className="text-green-600 font-medium">Free</span>
                      : `₹${selectedOrder.deliveryFee}`
                  }
                />
                <SummaryRow label="Total" value={`₹${selectedOrder.total.toLocaleString()}`} bold large />
              </div>

              {selectedOrder.notes && (
                <div className="pt-4">
                  <h4 className="font-medium text-gray-900 mb-1">Notes</h4>
                  <p>{selectedOrder.notes}</p>
                </div>
              )}

              <div className="pt-4 text-right">
                <Button onClick={() => setSelectedOrder(null)} variant="outline">
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

// 🔹 Helper Components

const Info = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div>
    <div className="text-sm text-gray-500 font-medium mb-1">{label}</div>
    <div className="text-gray-800">{value}</div>
  </div>
);

const SummaryRow = ({
  label,
  value,
  bold = false,
  large = false,
}: {
  label: string;
  value: React.ReactNode;
  bold?: boolean;
  large?: boolean;
}) => (
  <div className="flex justify-between">
    <span className={`${bold ? 'font-semibold' : 'text-gray-600'} ${large ? 'text-lg' : ''}`}>
      {label}
    </span>
    <span className={`${bold ? 'font-semibold' : 'text-gray-700'} ${large ? 'text-lg' : ''}`}>
      {value}
    </span>
  </div>
);
