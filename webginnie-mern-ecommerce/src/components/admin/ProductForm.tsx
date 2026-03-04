import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { Product } from '../../types/product';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import axios from 'axios';

interface ProductFormProps {
  product?: Product | null;
  onCancel: () => void;
  onSuccess?: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onCancel, onSuccess }) => {
  
  const categories = [
    'Smartphones',
    'Laptops',
    'Tablets',
    'Accessories',
    'Headphones',
    'Gaming',
    'Wearables',
    'Home Appliances',
  ];

  const [formData, setFormData] = useState({
    name: product?.name || '',
    image: product?.image || '',
    currentPrice: product?.currentPrice || 0,
    originalPrice: product?.originalPrice || 0,
    discount: product?.discount || '',
    rating: product?.rating || 5,
    reviews: product?.reviews || 0,
    description: product?.description || '',
    category: product?.category || categories[0],
    inStock: product?.inStock ?? true,
    features: product?.features?.join('\n') || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);


  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (formData.currentPrice <= 0) newErrors.currentPrice = 'Price must be greater than 0';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.rating < 1 || formData.rating > 5) newErrors.rating = 'Rating must be 1–5';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const productData: Omit<Product, 'id'> = {
      name: formData.name.trim(),
      image: formData.image.trim(),
      currentPrice: formData.currentPrice,
      originalPrice: formData.originalPrice || undefined,
      discount: formData.discount || undefined,
      rating: formData.rating,
      reviews: formData.reviews,
      description: formData.description.trim(),
      category: formData.category,
      inStock: formData.inStock,
      features: formData.features.trim()
        ? formData.features.split('\n').map(f => f.trim()).filter(Boolean)
        : undefined,
    };

    const token = localStorage.getItem('token');
    setSubmitting(true);
    try {
      if (product?.id) {
        await axios.put(`/api/products/${product.id}`, productData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('/api/products', productData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      onSuccess?.();
    } catch (err) {
      console.error('Product save failed:', err);
      alert('Something went wrong while saving the product.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? +value : value,
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onCancel}>
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <p className="text-gray-600">
            {product ? 'Update product information' : 'Fill in the details to add a product'}
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Price</label>
                <input
                  type="number"
                  name="currentPrice"
                  value={formData.currentPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {errors.currentPrice && <p className="text-red-500 text-sm">{errors.currentPrice}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Original Price</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Discount</label>
                <input
                  type="text"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <input
                  type="number"
                  name="rating"
                  min={1}
                  max={5}
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Reviews</label>
                <input
                  type="number"
                  name="reviews"
                  value={formData.reviews}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  {categories.map((c, idx) => (
                    <option key={idx} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                />
                <label className="text-sm font-medium text-gray-700">In Stock</label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Features (one per line)
              </label>
              <textarea
                name="features"
                rows={4}
                value={formData.features}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
