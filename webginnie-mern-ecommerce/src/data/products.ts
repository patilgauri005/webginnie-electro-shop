import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 1,
    name: "Zebronics Zeb-Rush Wired Gaming Headset",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500",
    currentPrice: 1299,
    originalPrice: 1599,
    discount: "-40%",
    rating: 4,
    reviews: 214,
    description: "Premium gaming headset with crystal clear audio and comfortable design for extended gaming sessions.",
    category: "Headphones",
    inStock: true,
    features: ["7.1 Surround Sound", "Noise Cancellation", "RGB Lighting", "Comfortable Padding"]
  },
  {
    id: 2,
    name: "Portronics Toad 23 Wireless Mouse",
    image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=500",
    currentPrice: 499,
    originalPrice: 799,
    discount: "-35%",
    rating: 4,
    reviews: 87,
    description: "Ergonomic wireless mouse with precision tracking and long battery life.",
    category: "Computer",
    inStock: true,
    features: ["Wireless Connectivity", "Ergonomic Design", "Long Battery Life", "Precision Tracking"]
  },
  {
    id: 3,
    name: "Ambrane 20000mAh Powerbank",
    image: "https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg?auto=compress&cs=tinysrgb&w=500",
    currentPrice: 1399,
    originalPrice: 2499,
    discount: "-30%",
    rating: 4,
    reviews: 110,
    description: "High-capacity power bank with fast charging technology and multiple ports.",
    category: "Phones",
    inStock: true,
    features: ["20000mAh Capacity", "Fast Charging", "Multiple Ports", "LED Display"]
  },
  {
    id: 4,
    name: "boAt WCD 500 Webcam Full HD",
    image: "https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=500",
    currentPrice: 1599,
    originalPrice: 2499,
    discount: "-40%",
    rating: 4,
    reviews: 76,
    description: "Full HD webcam with auto-focus and built-in microphone for professional video calls.",
    category: "Camera",
    inStock: true,
    features: ["Full HD 1080p", "Auto Focus", "Built-in Microphone", "Plug & Play"]
  },
  {
    id: 5,
    name: "Apple iPhone 14 Pro Max",
    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=500",
    currentPrice: 129900,
    originalPrice: 139900,
    discount: "-7%",
    rating: 5,
    reviews: 1250,
    description: "Latest iPhone with A16 Bionic chip, Pro camera system, and Dynamic Island.",
    category: "Phones",
    inStock: true,
    features: ["A16 Bionic Chip", "Pro Camera System", "Dynamic Island", "All-Day Battery"]
  },
  {
    id: 6,
    name: "Samsung Galaxy Watch 5",
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500",
    currentPrice: 24999,
    originalPrice: 29999,
    discount: "-17%",
    rating: 4,
    reviews: 892,
    description: "Advanced smartwatch with health monitoring and fitness tracking features.",
    category: "SmartWatch",
    inStock: true,
    features: ["Health Monitoring", "GPS Tracking", "Water Resistant", "Long Battery Life"]
  },
  {
    id: 7,
    name: "Sony WH-1000XM4 Headphones",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500",
    currentPrice: 24990,
    originalPrice: 29990,
    discount: "-17%",
    rating: 5,
    reviews: 2341,
    description: "Industry-leading noise canceling headphones with exceptional sound quality.",
    category: "Headphones",
    inStock: true,
    features: ["Noise Cancellation", "30-Hour Battery", "Touch Controls", "Quick Charge"]
  },
  {
    id: 8,
    name: "Canon EOS R6 Mark II",
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500",
    currentPrice: 219999,
    originalPrice: 239999,
    discount: "-8%",
    rating: 5,
    reviews: 156,
    description: "Professional mirrorless camera with advanced autofocus and 4K video recording.",
    category: "Camera",
    inStock: true,
    features: ["24.2MP Sensor", "4K Video", "In-Body Stabilization", "Dual Pixel AF"]
  }
];

export const categories = [
  { id: 1, name: "Phones", icon: "📱" },
  { id: 2, name: "SmartWatch", icon: "⌚" },
  { id: 3, name: "Headphones", icon: "🎧" },
  { id: 4, name: "Camera", icon: "📷" },
  { id: 5, name: "Computer", icon: "💻" },
];