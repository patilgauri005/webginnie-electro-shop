import React, { useState } from 'react';
import {
  XIcon, SaveIcon, Loader2Icon
} from 'lucide-react';
import { Order, OrderStatus, PaymentStatus } from '../../types/order';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import axios from 'axios';
import { toast } from 'react-toastify';

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
  onStatusUpdate: (orderId: string, newStatus: OrderStatus) => void;
  onPaymentStatusUpdate: (orderId: string, newStatus: PaymentStatus) => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
  onStatusUpdate,
  onPaymentStatusUpdate
}) => {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(order.paymentStatus);
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber || '');
  const [notes, setNotes] = useState(order.notes || '');
  const [loading, setLoading] = useState(false);

  const handleUpdateOrder = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem('token');
    await axios.put(
      `/api/orders/${order.id}`,
      { status, paymentStatus, trackingNumber, notes },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update parent state
    onStatusUpdate(order.id, status);
    onPaymentStatusUpdate(order.id, paymentStatus);

    // ✅ Show toast
    toast.success('Order updated successfully');

    // ✅ Close modal
    onClose();
  } catch (error) {
    console.error('Failed to update order:', error);
    toast.error('Failed to update order');
  } finally {
    setLoading(false);
  }
};


  const statusOptions: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
  const paymentOptions: PaymentStatus[] = ['paid', 'pending', 'failed', 'refunded'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
            <p className="text-gray-600">{order.id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Order Status */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <h3 className="font-semibold text-gray-900">Order Status</h3>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as OrderStatus)}
                className="w-full border rounded px-3 py-2"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </CardContent>
          </Card>

          {/* Payment Status */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <h3 className="font-semibold text-gray-900">Payment Status</h3>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
                className="w-full border rounded px-3 py-2"
              >
                {paymentOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </CardContent>
          </Card>

          {/* Tracking Number */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Tracking Number</h3>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </CardContent>
          </Card>

          {/* Order Notes */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Order Notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="text-right">
            <Button onClick={handleUpdateOrder} disabled={loading}>
              {loading ? (
                <>
                  <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <SaveIcon className="w-4 h-4 mr-2" />
                  Update Order
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
