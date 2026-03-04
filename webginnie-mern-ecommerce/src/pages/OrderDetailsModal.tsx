import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Order } from '../types/order';

interface Props {
  order: Order | null;
  onClose: () => void;
}

export const OrderDetailsModal: React.FC<Props> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm text-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>Order ID:</strong> <div>{order.id}</div>
            </div>
            <div>
              <strong>Date:</strong> <div>{new Date(order.orderDate).toLocaleString()}</div>
            </div>
            <div>
              <strong>Customer:</strong>
              <div>
                {order.customerName} <br />
                {order.customerEmail} <br />
                {order.customerPhone || '—'}
              </div>
            </div>
            <div>
              <strong>Shipping Address:</strong>
              <div>
                {order.shippingAddress.address}, {order.shippingAddress.city},<br />
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </div>
            </div>
            <div>
              <strong>Status:</strong> <div className="capitalize">{order.status}</div>
            </div>
            <div>
              <strong>Payment:</strong>
              <div>
                {order.paymentStatus} ({order.paymentMethod.toUpperCase()})
              </div>
            </div>
            {order.trackingNumber && (
              <div>
                <strong>Tracking Number:</strong>
                <div>{order.trackingNumber}</div>
              </div>
            )}
            {order.estimatedDelivery && (
              <div>
                <strong>Estimated Delivery:</strong>
                <div>{order.estimatedDelivery}</div>
              </div>
            )}
          </div>

          <div>
            <strong>Items:</strong>
            <ul className="list-disc ml-6 space-y-1 mt-2">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.name} × {item.quantity} – ₹{(item.price * item.quantity).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t pt-4 space-y-1">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span>
                {order.deliveryFee === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  `₹${order.deliveryFee}`
                )}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹{order.total.toLocaleString()}</span>
            </div>
          </div>

          {order.notes && (
            <div className="pt-4">
              <strong>Notes:</strong>
              <p>{order.notes}</p>
            </div>
          )}

          <div className="pt-4 text-right">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
