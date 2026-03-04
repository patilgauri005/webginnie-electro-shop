import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ArrowLeftIcon, EditIcon, SaveIcon, XIcon,
  UserIcon, MailIcon, PhoneIcon, MapPinIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';

export const ProfilePage: React.FC = () => {
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    shippingAddress: {
      address: '',
      city: '',
      postalCode: '',
      country: ''
    }
  });

  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone || '',
        shippingAddress: res.data.shippingAddress || {
          address: '',
          city: '',
          postalCode: '',
          country: ''
        }
      });
    } catch (err) {
      console.error('Failed to fetch user:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchUser();
  }, [token]);

  const handleSave = async () => {
    try {
      await axios.patch('/api/users/me', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const handleCancel = () => {
    fetchUser(); // Re-fetch original data
    setIsEditing(false);
  };

  if (loading) return <div className="p-8">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-2">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-gray-600">View and update your account details</p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
              <EditIcon className="w-4 h-4 mr-2" /> Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <SaveIcon className="w-4 h-4 mr-2" /> Save
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <XIcon className="w-4 h-4 mr-2" /> Cancel
              </Button>
            </div>
          )}
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-800">
                    <UserIcon className="w-5 h-5 text-gray-400" />
                    <span>{formData.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="flex items-center space-x-2 text-gray-800">
                  <MailIcon className="w-5 h-5 text-gray-400" />
                  <span>{formData.email}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-800">
                    <PhoneIcon className="w-5 h-5 text-gray-400" />
                    <span>{formData.phone || 'Not provided'}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MapPinIcon className="w-5 h-5 mr-2 text-gray-500" />
                Shipping Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-700 mb-1 block">Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.shippingAddress.address}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shippingAddress: { ...formData.shippingAddress, address: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-800">{formData.shippingAddress.address || '—'}</span>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-700 mb-1 block">City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.shippingAddress.city}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shippingAddress: { ...formData.shippingAddress, city: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-800">{formData.shippingAddress.city || '—'}</span>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-700 mb-1 block">Pincode</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.shippingAddress.postalCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shippingAddress: { ...formData.shippingAddress, postalCode: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-800">{formData.shippingAddress.postalCode || '—'}</span>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-700 mb-1 block">Country</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.shippingAddress.country}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shippingAddress: { ...formData.shippingAddress, country: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-800">{formData.shippingAddress.country || '—'}</span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
