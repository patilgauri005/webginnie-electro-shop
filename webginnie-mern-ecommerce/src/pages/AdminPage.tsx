import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  UsersIcon,
  PackageIcon,
  BarChart3Icon,
  ShoppingCartIcon,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ProductManagement } from '../components/admin/ProductManagement';
import { UserManagement } from '../components/admin/UserManagement';
import { OrderManagement } from '../components/admin/OrderManagement';
import { AdminDashboard } from '../components/admin/AdminDashboard';

type AdminTab = 'dashboard' | 'products' | 'users' | 'orders';

export const AdminPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // 🔒 Check admin role (can be upgraded later)
  const isAdmin = user?.email === 'admin@electroshop.com' || user?.email?.includes('admin');

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="text-red-500 text-6xl mb-4">🚫</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-6">
              You don't have permission to access the admin panel.
            </p>
            <Button onClick={() => navigate('/')} className="w-full mb-2">
              Go to Homepage
            </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  const tabs: { id: AdminTab; name: string; icon: React.ElementType }[] = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3Icon },
    { id: 'orders', name: 'Orders', icon: ShoppingCartIcon },
    { id: 'products', name: 'Products', icon: PackageIcon },
    { id: 'users', name: 'Users', icon: UsersIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Store
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600">Manage your ecommerce store</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Welcome back,</p>
            <p className="font-semibold text-gray-900">{user?.name || 'Admin'}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex flex-wrap space-x-4">
            {tabs.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center py-2 px-3 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'dashboard' && <AdminDashboard />}
          {activeTab === 'orders' && <OrderManagement />}
          {activeTab === 'products' && <ProductManagement />}
          {activeTab === 'users' && <UserManagement />}
        </div>
      </div>
    </div>
  );
};
