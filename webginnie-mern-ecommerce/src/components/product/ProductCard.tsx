import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartIcon, ShoppingCartIcon, TagIcon } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return navigate('/login');
    isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
    ));

  return (
    <div
      className={`group relative bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square bg-gray-100 overflow-hidden rounded-t-2xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {product.discount && (
            <Badge className="absolute top-3 left-3 bg-red-600 text-white">
              {product.discount}
            </Badge>
          )}

          <button
            onClick={toggleWishlist}
            aria-label="Toggle Wishlist"
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-opacity opacity-100"
          >
            <HeartIcon
              className={`w-5 h-5 transition-colors ${
                isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-600'
              }`}
            />
          </button>

          <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <ShoppingCartIcon className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.currentPrice.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center text-sm text-gray-500">
            {renderStars(product.rating)}
            <span className="ml-2">({product.reviews})</span>
          </div>

          <div className="flex justify-between items-center text-xs text-gray-600 mt-1">
            <span
              className={`px-2 py-1 rounded-full font-medium ${
                product.inStock
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
            <div className="flex items-center gap-1">
              <TagIcon className="w-4 h-4 text-gray-400" />
              <span className="capitalize">{product.category}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
