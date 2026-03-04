import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRightIcon,
  TruckIcon,
  ShieldCheckIcon,
  HeadphonesIcon,
  Smartphone,
  Tv,
  Watch,
  Camera,
  Laptop,
  Tablet,
} from 'lucide-react';
import axios from 'axios';
import { Product } from '../types/product';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const categoryIcons: Record<string, JSX.Element> = {
  smartphones: <Smartphone className="w-8 h-8 text-blue-600" />,
  phones: <Smartphone className="w-8 h-8 text-blue-600" />,
  tvs: <Tv className="w-8 h-8 text-blue-600" />,
  watches: <Watch className="w-8 h-8 text-blue-600" />,
  cameras: <Camera className="w-8 h-8 text-blue-600" />,
  laptops: <Laptop className="w-8 h-8 text-blue-600" />,
  tablets: <Tablet className="w-8 h-8 text-blue-600" />,
};

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<Product[]>('/api/products');
        setProducts(res.data);
        const shuffled = [...res.data].sort(() => 0.5 - Math.random());
        setFeaturedProducts(shuffled.slice(0, 4));
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getIconForCategory = (category: string) =>
    categoryIcons[category.toLowerCase()] ?? (
      <ShieldCheckIcon className="w-8 h-8 text-blue-600" />
    );

  const uniqueCategories = Array.from(new Set(products.map(p => p.category.toLowerCase())));
  const flashSaleProducts = products.slice(0, 4);

  const serviceFeatures = [
    {
      icon: TruckIcon,
      title: 'FREE AND FAST DELIVERY',
      description: 'Free delivery on orders above ₹999',
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 CUSTOMER SUPPORT',
      description: 'Instant assistance anytime you need it',
    },
    {
      icon: ShieldCheckIcon,
      title: 'SECURE PAYMENTS',
      description: '100% secure payments with data protection',
    },
  ];

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-blue-200 uppercase tracking-wide text-sm font-semibold mb-3">iPhone 14 Series</p>
            <h1 className="text-5xl font-bold mb-4 leading-tight">Get up to <span className="text-yellow-400">10% off</span> Today</h1>
            <p className="text-blue-100 text-lg mb-6">Top-quality gadgets and unbeatable prices. Don’t miss out!</p>
            <Link to="/products">
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold">
                Shop Now <ArrowRightIcon className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="iPhone 14"
              className="rounded-2xl shadow-xl w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Flash Sales */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Flash Sales</h2>
              <p className="text-gray-500">Limited-time offers just for you</p>
            </div>
            <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-semibold shadow-sm">
              Ends in: 15d : 18h : 49m : 47s
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {uniqueCategories.map((category) => (
              <Link key={category} to={`/products?category=${category}`}>
                <Card className="transition-all transform hover:scale-105 hover:border-blue-500 border-2 text-center cursor-pointer">
                  <CardContent className="flex flex-col items-center justify-center py-6">
                    {getIconForCategory(category)}
                    <p className="mt-2 capitalize font-medium text-gray-700">{category}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Featured Products</h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
            A curated selection of our most loved tech products picked just for you.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {serviceFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
