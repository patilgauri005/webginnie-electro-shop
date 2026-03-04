export interface Product {
  id: number;
  name: string;
  image: string;
  currentPrice: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
  reviews: number;
  description: string;
  category: string;
  inStock: boolean;
  features?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}