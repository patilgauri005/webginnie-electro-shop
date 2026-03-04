import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MinusIcon,
  PlusIcon,
  TrashIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import axios from 'axios';
import { toast } from 'react-toastify';

export const CartPage: React.FC = () => {
  const { items, total, itemCount, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const deliveryFee = total > 999 ? 0 : 99;
  const finalTotal = total + deliveryFee;

  const [shippingAddress, setShippingAddress] = React.useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [paymentMethod, setPaymentMethod] = React.useState<'cod' | 'online'>('cod');

  React.useEffect(() => {
    if (!token) return;
    const fetchUserAddress = async () => {
      try {
        const res = await axios.get('/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.shippingAddress) {
          setShippingAddress(res.data.shippingAddress);
        }
      } catch (err) {
        console.error('Failed to load user address:', err);
      }
    };
    fetchUserAddress();
  }, [token]);

  const handlePlaceOrder = async () => {
    if (!isAuthenticated || !token) {
      navigate('/login');
      return;
    }

    const { address, city, postalCode, country } = shippingAddress;
    if (!address || !city || !postalCode || !country) {
      toast.error('Please fill in all shipping address fields.');
      return;
    }

    try {
      await axios.post(
        '/api/orders',
        {
          items,
          total: finalTotal,
          shippingAddress,
          paymentMethod,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      console.error('Failed to place order:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
    toast.info('Item removed from cart.');
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    updateQuantity(id, quantity);
    toast.success('Quantity updated.');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center flex-col text-center px-4 py-16">
        <div className="text-gray-400 text-6xl mb-4">🛒</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
        <Link to="/products">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/products" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600">{itemCount} item{itemCount !== 1 ? 's' : ''} in your cart</p>
          </div>
          <Button
            onClick={() => {
              clearCart();
              toast.info('Cart cleared.');
            }}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link
                            to={`/product/${item.id}`}
                            className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-gray-900">
                            ₹{item.currentPrice.toLocaleString()}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ₹{item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-600">Qty:</span>
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100 transition-colors"
                            >
                              <MinusIcon className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100 transition-colors"
                            >
                              <PlusIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ₹{(item.currentPrice * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Shipping Address</h2>
                <input
                  className="w-full border rounded px-3 py-2"
                  placeholder="Address"
                  value={shippingAddress.address}
                  onChange={e => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    className="w-full border rounded px-3 py-2"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={e => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  />
                  <input
                    className="w-full border rounded px-3 py-2"
                    placeholder="Postal Code"
                    value={shippingAddress.postalCode}
                    onChange={e => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                  />
                </div>
                <input
                  className="w-full border rounded px-3 py-2"
                  placeholder="Country"
                  value={shippingAddress.country}
                  onChange={e => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                />

                <h2 className="text-lg font-semibold text-gray-800 mt-6">Payment Method</h2>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    Cash on Delivery
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                      disabled
                    />
                    Online (coming soon)
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                    <span className="font-medium">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">
                      {deliveryFee === 0 ? <span className="text-green-600">FREE</span> : `₹${deliveryFee}`}
                    </span>
                  </div>
                  {total <= 999 && (
                    <p className="text-sm text-blue-600">
                      Add ₹{(1000 - total).toLocaleString()} more for free delivery!
                    </p>
                  )}
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>₹{finalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handlePlaceOrder}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                    size="lg"
                  >
                    Place Order
                  </Button>
                  <Button variant="outline" className="w-full py-3" size="lg">
                    Save for Later
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t text-sm text-gray-600 flex items-center gap-2">
                  <ShieldCheckIcon className="w-5 h-5 text-green-500" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
