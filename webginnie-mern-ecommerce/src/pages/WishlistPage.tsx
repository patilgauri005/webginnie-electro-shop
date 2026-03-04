import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, HeartIcon, ShoppingCartIcon, TrashIcon, ShareIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { products } from '../data/products'; // used only for fallback suggestions

export const WishlistPage: React.FC = () => {
  const { addToCart } = useCart();
  const { wishlist, removeFromWishlist } = useWishlist();

  const addToCartAndRemove = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <HeartIcon className="w-8 h-8 mr-3 text-red-500" />
                My Wishlist
              </h1>
              <p className="text-gray-600">
                {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved for later
              </p>
            </div>
            {wishlist.length > 0 && (
              <div className="flex space-x-3">
                <Button variant="outline">
                  <ShareIcon className="w-4 h-4 mr-2" />
                  Share Wishlist
                </Button>
                <Button 
                  onClick={() => {
                    wishlist.forEach(item => addToCart(item));
                    wishlist.forEach(item => removeFromWishlist(item.id));
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <ShoppingCartIcon className="w-4 h-4 mr-2" />
                  Add All to Cart
                </Button>
              </div>
            )}
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-6">💝</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Save items you love by clicking the heart icon. We'll keep them safe here for you.
            </p>
            <Link to="/products">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <Card key={item.id} className="group relative overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {item.discount && (
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                      {item.discount}
                    </Badge>
                  )}

                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors group"
                  >
                    <HeartIcon className="w-5 h-5 text-red-500 fill-current" />
                  </button>

                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="space-y-2">
                      <Link to={`/product/${item.id}`}>
                        <Button variant="outline" className="w-full bg-white" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <div className="flex text-sm">{renderStars(item.rating)}</div>
                      <span className="text-sm text-gray-500">({item.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{item.currentPrice.toLocaleString()}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">{item.category}</span>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button
                        onClick={() => addToCartAndRemove(item)}
                        disabled={!item.inStock}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        size="sm"
                      >
                        <ShoppingCartIcon className="w-4 h-4 mr-1" />
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() => removeFromWishlist(item.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
