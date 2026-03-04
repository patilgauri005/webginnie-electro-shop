// src/context/WishlistContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { Product } from '../types/product';

interface WishlistContextType {
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: number) => void;
    isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { token, isAuthenticated } = useAuth();
    const [wishlist, setWishlist] = useState<Product[]>([]);

    useEffect(() => {
        const fetchWishlist = async () => {
            if (!token) return;
            try {
                const res = await axios.get('/api/wishlist', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setWishlist(res.data);
            } catch (error) {
                console.error('Failed to fetch wishlist:', error);
            }
        };

        if (isAuthenticated) {
            fetchWishlist();
        }
    }, [token, isAuthenticated]);

    const addToWishlist = async (product: Product) => {
        try {
            const alreadyInWishlist = wishlist.some(item => item.id === product.id);
            if (alreadyInWishlist) return;

            // Optimistic update
            setWishlist(prev => [...prev, product]);

            const res = await axios.post('/api/wishlist', product, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setWishlist(res.data); // Update with response data to stay in sync
        } catch (err) {
            console.error('Failed to add to wishlist:', err);
        }
    };

    const removeFromWishlist = async (productId: number) => {
        try {
            // Optimistic update
            setWishlist(prev => prev.filter(item => item.id !== productId));

            const res = await axios.delete(`/api/wishlist/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setWishlist(res.data); // Update with response data to stay in sync
        } catch (err) {
            console.error('Failed to remove from wishlist:', err);
        }
    };

    const isInWishlist = (productId: number) => wishlist.some(item => item.id === productId);

    return (
        <WishlistContext.Provider
            value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = (): WishlistContextType => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
